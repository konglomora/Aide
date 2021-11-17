import {
    createAsyncThunk,
    createSlice,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import { aideApiAxios } from '../../axios/axios'
import { setError, setLoading } from '../setStatusFunctions'
import dayjs from 'dayjs'
import * as _ from 'lodash'

export const axiosGetPrecipitatedOnionsByDay = createAsyncThunk(
    'weather-action-plan/axiosGetPrecipitatedOnionsByDay',
    async function ({ tomorrow, afterTomorrow }, { rejectWithValue }) {
        try {
            const tomorrowPrecipitatedOnions = await aideApiAxios.get(
                `weather/filter?tomorrow=yes&prep=low`
            )
            const afterTomorrowPrecipitatedOnions = await aideApiAxios.get(
                `weather/filter?nex_day=yes&prep=low`
            )
            if (
                tomorrowPrecipitatedOnions.statusText !== 'OK' ||
                afterTomorrowPrecipitatedOnions.statusText !== 'OK'
            ) {
                throw new Error('Error from server came up!')
            }
            return {
                dataForTomorrow: tomorrowPrecipitatedOnions.data,
                dataForAfterTomorrow: afterTomorrowPrecipitatedOnions.data,
                tomorrow: tomorrow,
                afterTomorrow: afterTomorrow,
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const axiosGetPrecipitatedOnionPlanObject = createAsyncThunk(
    'weather-action-plan/axiosGetPrecipitatedOnionPlanObject',
    async function (
        { onionCode, tomorrow, afterTomorrow },
        { rejectWithValue }
    ) {
        console.log(
            '[axiosGetPrecipitatedOnionPlanObject] tomorrow: ',
            tomorrow,
            'afterTomorrow',
            afterTomorrow
        )
        if (tomorrow) {
            try {
                const precipitatedOnionData = await aideApiAxios.get(
                    `weather/report/${onionCode}`
                )
                if (precipitatedOnionData.statusText !== 'OK') {
                    throw new Error('Error from server came up!')
                }
                const data = await JSON.parse(precipitatedOnionData.data)
                data['city'] = onionCode
                console.log('axiosGetPrecipitatedOnionPlanObject data: ', data)
                return {
                    precipitatedOnionData: data,
                    tomorrow: tomorrow,
                    afterTomorrow: afterTomorrow,
                }
            } catch (error) {
                return rejectWithValue(error)
            }
        } else if (afterTomorrow) {
            try {
                const precipitatedOnionData = await aideApiAxios.get(
                    `weather/report/${onionCode}?next_day=yes`
                )
                if (precipitatedOnionData.statusText !== 'OK') {
                    throw new Error('Error from server came up!')
                }
                const data = await JSON.parse(precipitatedOnionData.data)
                data['city'] = onionCode

                return {
                    precipitatedOnionData: data,
                    tomorrow: tomorrow,
                    afterTomorrow: afterTomorrow,
                }
            } catch (error) {
                return rejectWithValue(error)
            }
        }
    }
)

export const getWeatherActionPlan = createAsyncThunk(
    'weather-action-plan/getWeatherActionPlan',
    async function ({ tomorrow, afterTomorrow }, { dispatch, getState }) {
        console.log('====================================')
        console.log('getWeatherActionPlan RUN')
        console.log('====================================')
        await dispatch(clearPlan())

        await dispatch(
            axiosGetPrecipitatedOnionsByDay({ tomorrow, afterTomorrow })
        )
        await dispatch(getUniquePrecipitatedOnionCodes())
        console.log(
            'getWeatherActionPlan : getState().uniquePrecipitatedPercentageCodes ',
            getState().weatherActionPlan.uniquePrecipitatedPercentageCodes
        )
        const { tomorrowUniqueCodes, afterTomorrowUniqueCodes } =
            getState().weatherActionPlan.uniquePrecipitatedPercentageCodes

        console.log(
            'getWeatherActionPlan : afterTomorrowUniqueCodes ',
            afterTomorrowUniqueCodes
        )
        if (tomorrowUniqueCodes.length > 0) {
            const getActionPlanForTomorrowCodes = await Promise.all(
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
            const getActionPlanForAfterTomorrowCodes = await Promise.all(
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
        console.log(getState().weatherActionPlan)
        console.log('====================================')
        console.log('getWeatherActionPlan STOP')
        console.log('====================================')
    }
)

const weatherActionPlanSlice = createSlice({
    name: 'weather-action-plan',
    initialState: {
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
        precipitatedOnionsObjects: {
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
    },
    reducers: {
        clearPlan(state) {
            state.precipitatedOnionsObjects.tomorrow =
                state.precipitatedOnionsObjects.afterTomorrow = []
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
            const { tomorrow, afterTomorrow } = state.precipitatedOnionsObjects

            if (tomorrow.length > 0 && afterTomorrow.length > 0) {
                const tomorrowAllPrecipitatedOnionCodes =
                    state.precipitatedOnionsObjects.tomorrow.reduce(
                        (accum, onion) => {
                            if (!accum.some((obj) => obj.city === onion.city)) {
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
                // console.log({ uniqueTomorrowPrecipitatedOnionCodes })
            }

            if (afterTomorrow.length > 0) {
                const afterTomorrowAllPrecipitatedOnionCodes =
                    state.precipitatedOnionsObjects.afterTomorrow.reduce(
                        (accum, onion) => {
                            if (!accum.some((obj) => obj.city === onion.city)) {
                                accum.push(onion.city)
                            }
                            return accum
                        },
                        []
                    )
                const uniqueAfterTomorrowPrecipitatedOnionCodes =
                    afterTomorrowAllPrecipitatedOnionCodes.filter(
                        (code, index, codes) => {
                            return codes.indexOf(code) === index
                        }
                    )

                state.uniquePrecipitatedPercentageCodes.afterTomorrowUniqueCodes =
                    uniqueAfterTomorrowPrecipitatedOnionCodes.sort()
                // console.log({ uniqueAfterTomorrowPrecipitatedOnionCodes })
            }
        },
    },
    extraReducers: {
        [axiosGetPrecipitatedOnionsByDay.fulfilled]: (state, action) => {
            const { dataForTomorrow, dataForAfterTomorrow } = action.payload

            state.precipitatedOnionsObjects.tomorrow = dataForTomorrow

            state.precipitatedOnionsObjects.afterTomorrow = dataForAfterTomorrow
            console.log(
                '[axiosGetPrecipitatedOnionsByDay] dataForTomorrow: ',
                dataForTomorrow
            )
            console.log(
                '[axiosGetPrecipitatedOnionsByDay] dataForAfterTomorrow: ',
                dataForAfterTomorrow
            )
        },
        [axiosGetPrecipitatedOnionsByDay.rejected]: setError,
        [axiosGetPrecipitatedOnionPlanObject.fulfilled]: (state, action) => {
            const { tomorrow, afterTomorrow, precipitatedOnionData } =
                action.payload
            const { city } = precipitatedOnionData
            console.log(
                '[axiosGetPrecipitatedOnionPlanObject.fulfilled] action.payload',
                action.payload
            )
            if (tomorrow) {
                state.period.lastTimeUpdateOfTomorrow =
                    precipitatedOnionData.last_time_update
                if (city === 'KIE' || city === 'KYI') {
                    state.actionPlans.tomorrowPlan.kyiv_plan.push(
                        precipitatedOnionData
                    )
                } else if (
                    city === 'DNP' ||
                    city === 'KHA' ||
                    city === 'LVI' ||
                    city === 'ODS'
                ) {
                    state.actionPlans.tomorrowPlan.mio_plan.push(
                        precipitatedOnionData
                    )
                } else {
                    state.actionPlans.tomorrowPlan.small_plan.push(
                        precipitatedOnionData
                    )
                }
            }
            if (afterTomorrow) {
                state.period.lastTimeUpdateOfAfterTomorrow =
                    precipitatedOnionData.last_time_update
                if (city === 'KIE' || city === 'KYI') {
                    state.actionPlans.afterTomorrowPlan.kyiv_plan.push(
                        precipitatedOnionData
                    )
                } else if (
                    city === 'DNP' ||
                    city === 'KHA' ||
                    city === 'LVI' ||
                    city === 'ODS'
                ) {
                    state.actionPlans.afterTomorrowPlan.mio_plan.push(
                        precipitatedOnionData
                    )
                } else {
                    state.actionPlans.afterTomorrowPlan.small_plan.push(
                        precipitatedOnionData
                    )
                }
            }
        },
        [axiosGetPrecipitatedOnionPlanObject.rejected]: setError,
        [getWeatherActionPlan.pending]: setLoading,
        [getWeatherActionPlan.fulfilled]: (state) => {
            state.status = 'resolved'
            // console.log('getWeatherActionPlan.fulfilled')
        },
        [getWeatherActionPlan.rejected]: setError,
    },
})

export const { setDaysOfPlan, clearPlan, getUniquePrecipitatedOnionCodes } =
    weatherActionPlanSlice.actions

export default weatherActionPlanSlice.reducer
