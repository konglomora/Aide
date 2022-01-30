import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { aideApiAxios } from '../../../api/api'
import { codes } from '../../helpers/Codes'
import { MyKnownError } from 'store/helpers/reports/types'
import { RootState } from 'store'
import { StateStatus } from '../onions/onionsSlotsSlice'
import { AxiosResponse } from 'axios'
import {
    IOnionWeather,
    IOnionWeatherAnalysis,
    IPrecipitatedUniqueCodes,
    IUniqueCodesData,
    PropsGetPrecipitatedOnionsByDay,
} from './types'

export const getPrecipitatedOnionCodes = createAsyncThunk<
    IPrecipitatedUniqueCodes,
    void,
    {
        rejectValue: MyKnownError
    }
>(
    'weather-action-plan/getPrecipitatedOnionCodes',
    async function (_, { rejectWithValue }) {
        try {
            const allDaysUniqueCodesResponse: AxiosResponse<IUniqueCodesData> =
                await aideApiAxios.get<IUniqueCodesData>(
                    `weather/data/filters/`,
                    {
                        params: {
                            prep: 50,
                        },
                    }
                )

            console.log(
                'allDaysUniqueCodesResponse',
                allDaysUniqueCodesResponse
            )

            if (allDaysUniqueCodesResponse.statusText !== 'OK') {
                throw new Error(allDaysUniqueCodesResponse.statusText)
            }

            return {
                tomorrowUniqueCodes:
                    allDaysUniqueCodesResponse.data.tomorrow_prep.unique_codes,
                afterTomorrowUniqueCodes:
                    allDaysUniqueCodesResponse.data.after_tomorrow_prep
                        .unique_codes,
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

export const getWeatherActionPlan = createAsyncThunk<
    void,
    Omit<PropsGetPrecipitatedOnionsByDay, 'onionCode'>
>(
    'weather-action-plan/getWeatherActionPlan',
    async function ({ tomorrow, afterTomorrow }, { dispatch, getState }) {
        console.time('[getWeatherActionPlan]')

        await dispatch(clearPlan())
        await dispatch(getPrecipitatedOnionCodes())
        const state = getState() as RootState
        const { tomorrowUniqueCodes, afterTomorrowUniqueCodes } =
            state.weatherActionPlan.uniquePrecipitatedPercentageCodes

        tomorrowUniqueCodes.length > 0 &&
            (await Promise.all(
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
            ))

        afterTomorrowUniqueCodes.length > 0 &&
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

        console.timeEnd('[getWeatherActionPlan]')
    }
)

export interface IWeatherSliceInitState {
    status: StateStatus.success | StateStatus.loading | StateStatus.error | null
    error: null | undefined | string | MyKnownError | unknown
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
    },
    extraReducers: (builder) => {
        builder.addCase(
            getPrecipitatedOnionCodes.fulfilled,

            (state, action) => {
                const { tomorrowUniqueCodes, afterTomorrowUniqueCodes } =
                    action.payload

                state.uniquePrecipitatedPercentageCodes.tomorrowUniqueCodes =
                    tomorrowUniqueCodes

                state.uniquePrecipitatedPercentageCodes.afterTomorrowUniqueCodes =
                    afterTomorrowUniqueCodes
                console.log(
                    '[getPrecipitatedOnionCodes] tomorrowUniqueCodes: ',
                    tomorrowUniqueCodes
                )
                console.log(
                    '[getPrecipitatedOnionCodes] afterTomorrowUniqueCodes: ',
                    afterTomorrowUniqueCodes
                )
            }
        )
        builder.addCase(getPrecipitatedOnionCodes.rejected, (state, action) => {
            state.status = StateStatus.error
            state.error = action.payload
        })
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
        builder.addCase(
            axiosGetPrecipitatedOnionPlanObject.rejected,
            (state, action) => {
                state.status = StateStatus.error
                state.error = action.payload
            }
        )
        builder.addCase(getWeatherActionPlan.pending, (state) => {
            state.status = StateStatus.loading
            state.error = null
        })
        builder.addCase(getWeatherActionPlan.rejected, (state, action) => {
            state.status = StateStatus.error
            state.error = action.payload
        })
        builder.addCase(getWeatherActionPlan.fulfilled, (state) => {
            state.status = StateStatus.success
        })
    },
})

export const { clearPlan } = weatherActionPlanSlice.actions

export default weatherActionPlanSlice.reducer
