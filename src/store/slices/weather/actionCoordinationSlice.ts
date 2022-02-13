import {
    ActionReasons,
    logScheduleActions,
    markCoordinationAsApplied,
} from './../sheets/logsSlice'
import { alertService, coordinationService, onionService } from 'services'
import { requests } from 'store/helpers/Requests'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { aideApiAxios } from 'api'
import { codes } from '../../helpers/Codes'
import { MyKnownError } from 'store/slices/saturation/types'
import { RootState } from 'store'

import { AxiosResponse } from 'axios'
import {
    IPrecipitatedOnionPlanResponse,
    IOnionWeather,
    IOnionWeatherAnalysis,
    IPrecipitatedUniqueCodes,
    IUniqueCodesData,
    PropsGetPrecipitatedOnionsByDay,
    IOnionWeatherAnalysisResponse,
} from './types'
import { StateStatus, TError, TStateStatus } from 'store/helpers/Status'
import { dates } from 'helpers/Dates'
import {
    IOnionScheduleSlotsResponse,
    IUpdateManySlots,
} from '../onions/slots/types'
import {
    getConfirmedOnionsCoordination,
    IConfirmedCoordinationRow,
    IPropsGetConfirmedOnionCoordination,
} from '../sheets/logsSlice'
import { axiosGetOnionScheduleSlots } from '../onions/slots/onionsSlotsSlice'
import { IDataForScheduleActionLog } from '../sheets/types'

export const getPrecipitatedOnionCodes = createAsyncThunk<
    IPrecipitatedUniqueCodes,
    void,
    {
        rejectValue: MyKnownError
    }
>(
    'weather-coordination/getPrecipitatedOnionCodes',
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

export const axiosGetPrecipitatedOnionPlanObject = createAsyncThunk<
    IPrecipitatedOnionPlanResponse,
    PropsGetPrecipitatedOnionsByDay,
    {
        rejectValue: MyKnownError
    }
>(
    'weather-coordination/axiosGetPrecipitatedOnionPlanObject',
    async function (
        { onionCode, tomorrow, afterTomorrow }: PropsGetPrecipitatedOnionsByDay,
        { rejectWithValue, dispatch, getState }
    ) {
        console.log(
            '[axiosGetPrecipitatedOnionPlanObject] tomorrow: ',
            tomorrow,
            'afterTomorrow',
            afterTomorrow
        )

        const config = {
            params: {
                cityCode: onionCode,
                date: dates.tomorrow('YYYY-MM-DD'),
            },
        }
        try {
            const precipitatedOnionResponse =
                await aideApiAxios.get<IOnionWeatherAnalysisResponse>(
                    `weather/data/analysis/${onionCode}/?tomorrow=${tomorrow}`
                )

            // const onionScheduleSlotsResponse: AxiosResponse<
            //     IOnionScheduleSlotsResponse[]
            // > = await adminApiGlovoappAxios.get(
            //     '/admin/scheduling/slots',
            //     config
            // )
            const onionScheduleSlotsResponse: AxiosResponse<
                IOnionScheduleSlotsResponse[]
            > = await aideApiAxios.get('/admin/scheduling/slots/', config)

            requests.processError(
                precipitatedOnionResponse.status,
                precipitatedOnionResponse.statusText
            )
            requests.processError(
                onionScheduleSlotsResponse.status,
                onionScheduleSlotsResponse.statusText
            )

            const coordination = coordinationService.getOnionCoordination(
                precipitatedOnionResponse.data,
                onionScheduleSlotsResponse.data
            )

            return {
                coordination: coordination,
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
    'weather-coordination/getWeatherActionPlan',
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
            (await Promise.all(
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
            ))

        console.timeEnd('[getWeatherActionPlan]')
    }
)

interface IGetWetSchedulePeriod {
    date: string
    city: string
}

export const getWetSchedulePeriod = createAsyncThunk<
    void,
    IGetWetSchedulePeriod
>(
    'weather-coordination/getWetSchedulePeriod',
    async function ({ date, city }, { dispatch, getState }) {}
)

export const applyConfirmedCoordination = createAsyncThunk<
    void,
    IPropsGetConfirmedOnionCoordination
>(
    'weather-coordination/applyCoordination',
    async function ({ date }, { dispatch, getState }) {
        console.time('[applyCoordination]')

        await dispatch(getConfirmedOnionsCoordination({ date: date }))

        const confirmedCoordinations = (getState() as RootState).logs
            .coordination.confirmedCoordinations

        const appliedScheduleActions = await Promise.all(
            confirmedCoordinations.map(
                async (coordination: IConfirmedCoordinationRow) => {
                    await dispatch(
                        axiosGetOnionScheduleSlots({
                            onionCode: coordination.Onion,
                            date: coordination.Date,
                        })
                    )

                    const workingSlots = (getState() as RootState).onionsSlots
                        .workingSlots

                    const slots = onionService.getUpdatedSlotsBYCoordinationRow(
                        coordination,
                        workingSlots
                    )
                    const data: IUpdateManySlots = {
                        notifyCouriers: false,
                        slots: slots,
                    }

                    console.log('data', data)
                    const onionScheduleSlotsResponse: AxiosResponse<
                        IOnionScheduleSlotsResponse[]
                    > = await aideApiAxios.post(
                        'admin/scheduling/slots/updateMany/',
                        data
                    )
                    console.log(
                        `onionScheduleSlotsResponse ${onionScheduleSlotsResponse}`
                    )

                    if (onionScheduleSlotsResponse.status === 200) {
                        dispatch(markCoordinationAsApplied(coordination))
                    }
                    const actionTime = dayjs().format('HH:mm:ss DD.MM.YYYY')
                    const userName = coordination.Name
                    const city = coordination.Onion
                    const bonusSize = coordination['Bonus +%']
                    const bonusReason = coordination['Bonus reason']
                    const capacity = coordination['Capacity +%']
                    const period = coordination.Slots
                    const date = coordination.Date

                    const scheduleAction: IDataForScheduleActionLog = {
                        actionTime: actionTime,
                        actionReason: ActionReasons.coordination,
                        userName: userName,
                        onionCode: city,
                        period: period,
                        bonusSize: +bonusSize,
                        bonusType: bonusReason,
                        capacityPercentage: +capacity,
                        dateOfSchedule: date,
                    }

                    const action = `apply ${bonusSize} ${bonusReason} and ${capacity}% capacity for  ${period}  of  ${city}.`

                    alertService.actionStatus(
                        action,
                        onionScheduleSlotsResponse.status
                    )

                    return scheduleAction
                }
            )
        )

        await dispatch(logScheduleActions(appliedScheduleActions))

        console.timeEnd('[applyCoordination]')
    }
)

export interface IStateActionPlan {
    kyiv_plan: IOnionWeatherAnalysis[]
    mio_plan: IOnionWeatherAnalysis[]
    small_plan: IOnionWeatherAnalysis[]
}

export interface IWeatherSliceInitState {
    status: TStateStatus
    error: TError
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
        tomorrowPlan: IStateActionPlan
        afterTomorrowPlan: IStateActionPlan
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
    name: 'weather-coordination',
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
                const { tomorrow, afterTomorrow, coordination } = action.payload
                const { city, wetFinishSlot, wetStartSlot } = coordination
                const isKyiv = codes.kyiv.includes(city)
                const isMio = codes.mio.includes(city)
                const workingSlotsIsWet = wetStartSlot && wetFinishSlot
                console.log(
                    '[axiosGetPrecipitatedOnionPlanObject.fulfilled] action.payload',
                    action.payload
                )
                if (tomorrow && workingSlotsIsWet) {
                    state.period.lastTimeUpdateOfTomorrow =
                        coordination.last_time_update
                    if (isKyiv) {
                        state.actionPlans.tomorrowPlan.kyiv_plan.push(
                            coordination
                        )
                    } else if (isMio) {
                        state.actionPlans.tomorrowPlan.mio_plan.push(
                            coordination
                        )
                    } else {
                        state.actionPlans.tomorrowPlan.small_plan.push(
                            coordination
                        )
                    }
                }
                if (afterTomorrow && workingSlotsIsWet) {
                    state.period.lastTimeUpdateOfAfterTomorrow =
                        coordination.last_time_update
                    if (isKyiv) {
                        state.actionPlans.afterTomorrowPlan.kyiv_plan.push(
                            coordination
                        )
                    } else if (isMio) {
                        state.actionPlans.afterTomorrowPlan.mio_plan.push(
                            coordination
                        )
                    } else {
                        state.actionPlans.afterTomorrowPlan.small_plan.push(
                            coordination
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
        builder.addCase(applyConfirmedCoordination.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(
            applyConfirmedCoordination.rejected,
            (state, action) => {
                state.status = StateStatus.error
                state.error = action.payload
            }
        )
        builder.addCase(applyConfirmedCoordination.fulfilled, (state) => {
            state.status = StateStatus.success
        })
    },
})

export const { clearPlan } = weatherActionPlanSlice.actions

export default weatherActionPlanSlice.reducer
