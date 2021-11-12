import {
    createAsyncThunk,
    createSlice,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import { aideApiAxios } from '../../axios/axios'
import { setError, setLoading } from '../setStatusFunctions'
import moment from 'moment'
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
            console.log(
                'data about prep for tomorrow:',
                tomorrowPrecipitatedOnions.data
            )
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
        console.log({ onionCode })
        if (tomorrow) {
            try {
                console.log({ onionCode })
                const precipitatedOnionData = await aideApiAxios.get(
                    `weather/report/${onionCode}`
                )
                if (precipitatedOnionData.statusText !== 'OK') {
                    throw new Error('Error from server came up!')
                }
                const data = await JSON.parse(precipitatedOnionData.data)
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
        const currentState = getState().weatherActionPlan
        await dispatch(clearPlan())

        await dispatch(
            axiosGetPrecipitatedOnionsByDay({ tomorrow, afterTomorrow })
        )
        await dispatch(getUniquePrecipitatedOnionCodes())

        const { tomorrowUniqueCodes, afterTomorrowUniqueCodes } =
            currentState.uniquePrecipitatedPercentageCodes

        if (tomorrowUniqueCodes.length > 0) {
            const getActionPlanForAllCodes = await Promise.all(
                tomorrowUniqueCodes.map(async (onionCode) => {
                    const afterTomorrowReport = false
                    await dispatch(
                        axiosGetPrecipitatedOnionPlanObject({
                            onionCode,
                            tomorrow,
                            afterTomorrowReport,
                        })
                    )
                })
            )
        }

        if (afterTomorrowUniqueCodes.length > 0) {
            const getActionPlanForAllCodes = await Promise.all(
                afterTomorrowUniqueCodes.map(async (onionCode) => {
                    const tomorrowReport = false
                    await dispatch(
                        axiosGetPrecipitatedOnionPlanObject({
                            onionCode,
                            tomorrowReport,
                            afterTomorrow,
                        })
                    )
                })
            )
        }
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
            tomorrowDate: moment().add(1, 'days').format('DD.MM.YYYY'),
            afterTomorrowDate: moment().add(2, 'days').format('DD.MM.YYYY'),
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
                console.log({ uniqueTomorrowPrecipitatedOnionCodes })
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
                console.log({ uniqueAfterTomorrowPrecipitatedOnionCodes })
            }
        },
    },
    extraReducers: {
        [axiosGetPrecipitatedOnionsByDay.fulfilled]: (state, action) => {
            const { tomorrow, afterTomorrow } = action.payload

            if (tomorrow && afterTomorrow) {
                state.precipitatedOnionsObjects.tomorrow =
                    action.payload.dataForTomorrow

                state.precipitatedOnionsObjects.afterTomorrow =
                    action.payload.dataForAfterTomorrow
                console.log('payload:', action.payload)
            } else if (tomorrow && !afterTomorrow) {
                state.precipitatedOnionsObjects.tomorrow = action.payload.data
            } else if (afterTomorrow && !tomorrow) {
                state.precipitatedOnionsObjects.afterTomorrow =
                    action.payload.data
            } else if (!tomorrow && !afterTomorrow) {
                state.precipitatedOnionsObjects.tomorrow = []
                state.precipitatedOnionsObjects.afterTomorrow = []
            }
        },
        [axiosGetPrecipitatedOnionsByDay.rejected]: setError,
        [axiosGetPrecipitatedOnionPlanObject.fulfilled]: (state, action) => {
            const { tomorrow, afterTomorrow } = action.payload
            const { city } = action.payload.precipitatedOnionData
            const { precipitatedOnionData } = action.payload
            if (tomorrow) {
                state.period.lastTimeUpdateOfTomorrow =
                    precipitatedOnionData.last_time_update
                if (city === 'KIE' || city === 'KYI') {
                    state.actionPlan.tomorrowPlan.kyiv_plan.push(
                        precipitatedOnionData
                    )
                } else if (
                    city === 'DNP' ||
                    city === 'KHA' ||
                    city === 'LVI' ||
                    city === 'ODS'
                ) {
                    state.actionPlan.tomorrowPlan.mio_plan.push(
                        precipitatedOnionData
                    )
                } else {
                    state.actionPlan.tomorrowPlan.small_plan.push(
                        precipitatedOnionData
                    )
                }
            } else if (afterTomorrow) {
                state.period.lastTimeUpdateOfAfterTomorrow =
                    precipitatedOnionData.last_time_update
                if (city === 'KIE' || city === 'KYI') {
                    state.actionPlan.afterTomorrowPlan.kyiv_plan.push(
                        precipitatedOnionData
                    )
                } else if (
                    city === 'DNP' ||
                    city === 'KHA' ||
                    city === 'LVI' ||
                    city === 'ODS'
                ) {
                    state.actionPlan.afterTomorrowPlan.mio_plan.push(
                        precipitatedOnionData
                    )
                } else {
                    state.actionPlan.afterTomorrowPlan.small_plan.push(
                        precipitatedOnionData
                    )
                }
            }
        },
        [axiosGetPrecipitatedOnionPlanObject.rejected]: setError,
        [getWeatherActionPlan.pending]: setLoading,
        [getWeatherActionPlan.fulfilled]: (state) => {
            state.status = 'resolved'
        },
        [getWeatherActionPlan.rejected]: setError,
    },
})

export const { setDaysOfPlan, clearPlan, getUniquePrecipitatedOnionCodes } =
    weatherActionPlanSlice.actions

export default weatherActionPlanSlice.reducer
