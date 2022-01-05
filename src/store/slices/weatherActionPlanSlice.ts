import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { aideApiAxios } from '../../axios/axios'
import { setError, setLoading } from '../helpers/setStatusFunctions'
import { codes } from '../helpers/Codes'
import { MyKnownError } from 'store/helpers/reports/types'
import { RootState } from 'store'

export interface PropsGetPrecipitatedOnionsByDay {
    onionCode: string
    tomorrow: boolean
    afterTomorrow: boolean
}

export interface IOnionWeatherAnalysis {
    city: string
    date: string
    slots: string
    percent_capacity_slots: number
    precipitation: string
    last_time_update: string
}

export interface IOnionWeather {
    id: number
    date: string
    last_time_update: string
    city: string
    time: string
    precipitation: number
}

interface IPrecipitatedOnionsByDay {
    dataForTomorrow: IOnionWeather[]
    dataForAfterTomorrow: IOnionWeather[]
    tomorrow: boolean
    afterTomorrow: boolean
}

export const axiosGetPrecipitatedOnionsByDay = createAsyncThunk<
    IPrecipitatedOnionsByDay,
    Omit<PropsGetPrecipitatedOnionsByDay, 'onionCode'>,
    {
        rejectValue: MyKnownError
    }
>(
    'weather-action-plan/axiosGetPrecipitatedOnionsByDay',
    async function (
        {
            tomorrow,
            afterTomorrow,
        }: Omit<PropsGetPrecipitatedOnionsByDay, 'onionCode'>,
        { rejectWithValue }
    ) {
        try {
            const allWeatherDataResponse = await aideApiAxios.get<
                IOnionWeather[]
            >(`weather/data/`)
            const tomorrowDate = dayjs().add(1, 'days').format('DD.MM')
            const afterTomorrowDate = dayjs().add(2, 'days').format('DD.MM')
            const tomorrowPrecipitatedOnions =
                allWeatherDataResponse.data.filter((onion: IOnionWeather) => {
                    return (
                        onion.precipitation > 50 && onion.date === tomorrowDate
                    )
                })

            const afterTomorrowPrecipitatedOnions =
                allWeatherDataResponse.data.filter((onion: IOnionWeather) => {
                    return (
                        onion.precipitation > 50 &&
                        onion.date === afterTomorrowDate
                    )
                })

            if (allWeatherDataResponse.statusText !== 'OK') {
                throw new Error(allWeatherDataResponse.statusText)
            }
            return {
                dataForTomorrow: tomorrowPrecipitatedOnions,
                dataForAfterTomorrow: afterTomorrowPrecipitatedOnions,
                tomorrow: tomorrow,
                afterTomorrow: afterTomorrow,
            }
        } catch (error) {
            console.error('[weatherActionPlanSlice] Error', error)
            return rejectWithValue(error as MyKnownError)
        }
    }
)

export interface IGetPrecipitatedOnionPlanResponse {
    precipitatedOnionPlan: IOnionWeatherAnalysis
    tomorrow: boolean
    afterTomorrow: boolean
}

export const axiosGetPrecipitatedOnionPlanObject = createAsyncThunk<
    IGetPrecipitatedOnionPlanResponse,
    PropsGetPrecipitatedOnionsByDay,
    {
        rejectValue: MyKnownError
    }
>(
    'weather-action-plan/axiosGetPrecipitatedOnionPlanObject',
    async function (
        { onionCode, tomorrow, afterTomorrow }: PropsGetPrecipitatedOnionsByDay,
        { rejectWithValue }
    ) {
        console.log(
            '[axiosGetPrecipitatedOnionPlanObject] tomorrow: ',
            tomorrow,
            'afterTomorrow',
            afterTomorrow
        )
        try {
            const precipitatedOnionResponse =
                await aideApiAxios.get<IOnionWeatherAnalysis>(
                    `weather/data/analysis/${onionCode}/?tomorrow=${tomorrow}`
                )

            if (precipitatedOnionResponse.statusText !== 'OK') {
                throw new Error(precipitatedOnionResponse.statusText)
            }

            console.log(
                '[axiosGetPrecipitatedOnionPlanObject] precipitatedOnionPlan: ',
                precipitatedOnionResponse.data
            )
            return {
                precipitatedOnionPlan: precipitatedOnionResponse.data,
                tomorrow: tomorrow,
                afterTomorrow: afterTomorrow,
            }
        } catch (error) {
            return rejectWithValue(error as MyKnownError)
        }
    }
)

export const getWeatherActionPlan = createAsyncThunk(
    'weather-action-plan/getWeatherActionPlan',
    async function (
        {
            tomorrow,
            afterTomorrow,
        }: Omit<PropsGetPrecipitatedOnionsByDay, 'onionCode'>,
        { dispatch, getState }
    ) {
        console.log('====================================')
        console.log('getWeatherActionPlan RUN')
        console.log('====================================')
        await dispatch(clearPlan())
        await dispatch(
            axiosGetPrecipitatedOnionsByDay({ tomorrow, afterTomorrow })
        )
        await dispatch(getUniquePrecipitatedOnionCodes())
        const state = getState() as RootState
        const { tomorrowUniqueCodes, afterTomorrowUniqueCodes } =
            state.weatherActionPlan.uniquePrecipitatedPercentageCodes

        console.log(
            'getWeatherActionPlan : afterTomorrowUniqueCodes ',
            afterTomorrowUniqueCodes
        )
        if (tomorrowUniqueCodes.length > 0) {
            await Promise.all(
                tomorrowUniqueCodes.map(async (onionCode) => {
                    const afterTomorrow = false
                    await dispatch(
                        axiosGetPrecipitatedOnionPlanObject({
                            onionCode,
                            tomorrow,
                            afterTomorrow,
                        })
                    )
                })
            )
        }

        if (afterTomorrowUniqueCodes.length > 0) {
            console.log(afterTomorrowUniqueCodes.length)
            await Promise.all(
                afterTomorrowUniqueCodes.map(async (onionCode) => {
                    const tomorrow = false
                    await dispatch(
                        axiosGetPrecipitatedOnionPlanObject({
                            onionCode,
                            tomorrow,
                            afterTomorrow,
                        })
                    )
                })
            )
        }
        const finalStateOfWeatherReport = getState() as RootState
        console.log(
            'finalStateOfWeatherReport',
            finalStateOfWeatherReport.weatherActionPlan
        )
        console.log('====================================')
        console.log('getWeatherActionPlan STOP')
        console.log('====================================')
    }
)

export interface IWeatherSliceInitState {
    status: null | 'resolved' | 'loading' | 'error'
    error: null | string
    period: {
        tomorrow: boolean
        afterTomorrow: boolean
        tomorrowDate: string
        afterTomorrowDate: string
        lastTimeUpdateOfTomorrow: string
        lastTimeUpdateOfAfterTomorrow: string
    }
    precipitatedOnions: {
        tomorrow: IOnionWeather[]
        afterTomorrow: IOnionWeather[]
    }
    uniquePrecipitatedPercentageCodes: {
        tomorrowUniqueCodes: string[]
        afterTomorrowUniqueCodes: string[]
    }
    actionPlans: {
        tomorrowPlan: {
            kyiv_plan: IOnionWeatherAnalysis[]
            mio_plan: IOnionWeatherAnalysis[]
            small_plan: IOnionWeatherAnalysis[]
        }
        afterTomorrowPlan: {
            kyiv_plan: IOnionWeatherAnalysis[]
            mio_plan: IOnionWeatherAnalysis[]
            small_plan: IOnionWeatherAnalysis[]
        }
    }
}

const initialState: IWeatherSliceInitState = {
    status: null,
    error: null,
    period: {
        tomorrow: true,
        afterTomorrow: true,
        tomorrowDate: dayjs().add(1, 'day').format('DD.MM.YYYY'),
        afterTomorrowDate: dayjs().add(2, 'day').format('DD.MM.YYYY'),
        lastTimeUpdateOfTomorrow: '',
        lastTimeUpdateOfAfterTomorrow: '',
    },
    precipitatedOnions: {
        tomorrow: [],
        afterTomorrow: [],
    },
    uniquePrecipitatedPercentageCodes: {
        tomorrowUniqueCodes: [],
        afterTomorrowUniqueCodes: [],
    },
    actionPlans: {
        tomorrowPlan: {
            kyiv_plan: [],
            mio_plan: [],
            small_plan: [],
        },
        afterTomorrowPlan: {
            kyiv_plan: [],
            mio_plan: [],
            small_plan: [],
        },
    },
}

const weatherActionPlanSlice = createSlice({
    name: 'weather-action-plan',
    initialState,
    reducers: {
        clearPlan(state) {
            state.precipitatedOnions.tomorrow =
                state.precipitatedOnions.afterTomorrow = []
            state.uniquePrecipitatedPercentageCodes.tomorrowUniqueCodes =
                state.uniquePrecipitatedPercentageCodes.afterTomorrowUniqueCodes =
                    []
            state.actionPlans = {
                tomorrowPlan: {
                    kyiv_plan: [],
                    mio_plan: [],
                    small_plan: [],
                },
                afterTomorrowPlan: {
                    kyiv_plan: [],
                    mio_plan: [],
                    small_plan: [],
                },
            }
        },
        getUniquePrecipitatedOnionCodes(state) {
            const { tomorrow, afterTomorrow } = state.precipitatedOnions
            console.log(
                '[getUniquePrecipitatedOnionCodes] state.precipitatedOnions',
                state.precipitatedOnions
            )
            if (tomorrow.length > 0) {
                const tomorrowAllPrecipitatedOnionCodes =
                    state.precipitatedOnions.tomorrow.reduce(
                        (accum: string[], onion: IOnionWeather) => {
                            if (!accum.some((city) => city === onion.city)) {
                                accum.push(onion.city)
                            }
                            return accum
                        },
                        []
                    )

                const uniqueTomorrowPrecipitatedOnionCodes =
                    tomorrowAllPrecipitatedOnionCodes.filter(
                        (code, index, codes) => {
                            return codes.indexOf(code) === index
                        }
                    )
                state.uniquePrecipitatedPercentageCodes.tomorrowUniqueCodes =
                    uniqueTomorrowPrecipitatedOnionCodes.sort()
            }

            if (afterTomorrow.length > 0) {
                const afterTomorrowAllPrecipitatedOnionCodes =
                    state.precipitatedOnions.afterTomorrow.reduce(
                        (accum: string[], onion: IOnionWeather) => {
                            if (!accum.some((city) => city === onion.city)) {
                                accum.push(onion.city)
                            }
                            return accum
                        },
                        []
                    )
                console.log(
                    'afterTomorrowAllPrecipitatedOnionCodes',
                    afterTomorrowAllPrecipitatedOnionCodes
                )
                const uniqueAfterTomorrowPrecipitatedOnionCodes =
                    afterTomorrowAllPrecipitatedOnionCodes.filter(
                        (code, index, codes) => {
                            return codes.indexOf(code) === index
                        }
                    )

                state.uniquePrecipitatedPercentageCodes.afterTomorrowUniqueCodes =
                    uniqueAfterTomorrowPrecipitatedOnionCodes.sort()
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            axiosGetPrecipitatedOnionsByDay.fulfilled,

            (state, action) => {
                const { dataForTomorrow, dataForAfterTomorrow } = action.payload

                state.precipitatedOnions.tomorrow = dataForTomorrow

                state.precipitatedOnions.afterTomorrow = dataForAfterTomorrow
                console.log(
                    '[axiosGetPrecipitatedOnionsByDay] dataForTomorrow: ',
                    dataForTomorrow
                )
                console.log(
                    '[axiosGetPrecipitatedOnionsByDay] dataForAfterTomorrow: ',
                    dataForAfterTomorrow
                )
            }
        )
        builder.addCase(axiosGetPrecipitatedOnionsByDay.rejected, setError)
        builder.addCase(
            axiosGetPrecipitatedOnionPlanObject.fulfilled,
            (state, action) => {
                const { tomorrow, afterTomorrow, precipitatedOnionPlan } =
                    action.payload
                const { city } = precipitatedOnionPlan
                const isKyiv = codes.kyiv.includes(city)
                const isMio = codes.mio.includes(city)

                console.log(
                    '[axiosGetPrecipitatedOnionPlanObject.fulfilled] action.payload',
                    action.payload
                )
                if (tomorrow) {
                    state.period.lastTimeUpdateOfTomorrow =
                        precipitatedOnionPlan.last_time_update
                    if (isKyiv) {
                        state.actionPlans.tomorrowPlan.kyiv_plan.push(
                            precipitatedOnionPlan
                        )
                    } else if (isMio) {
                        state.actionPlans.tomorrowPlan.mio_plan.push(
                            precipitatedOnionPlan
                        )
                    } else {
                        state.actionPlans.tomorrowPlan.small_plan.push(
                            precipitatedOnionPlan
                        )
                    }
                }
                if (afterTomorrow) {
                    state.period.lastTimeUpdateOfAfterTomorrow =
                        precipitatedOnionPlan.last_time_update
                    if (isKyiv) {
                        state.actionPlans.afterTomorrowPlan.kyiv_plan.push(
                            precipitatedOnionPlan
                        )
                    } else if (isMio) {
                        state.actionPlans.afterTomorrowPlan.mio_plan.push(
                            precipitatedOnionPlan
                        )
                    } else {
                        state.actionPlans.afterTomorrowPlan.small_plan.push(
                            precipitatedOnionPlan
                        )
                    }
                }
            }
        )
        builder.addCase(axiosGetPrecipitatedOnionPlanObject.rejected, setError)
        builder.addCase(getWeatherActionPlan.pending, setLoading)
        builder.addCase(getWeatherActionPlan.rejected, setError)
        builder.addCase(getWeatherActionPlan.fulfilled, (state) => {
            state.status = 'resolved'
        })
    },
})

export const { clearPlan, getUniquePrecipitatedOnionCodes } =
    weatherActionPlanSlice.actions

export default weatherActionPlanSlice.reducer

// import React from 'react'

// export default function weatherActionPlanSliceTS() {}
