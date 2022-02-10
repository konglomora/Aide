import dayjs from 'dayjs'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MyKnownError } from 'store/slices/saturation/types'
import { RootState } from 'store'
import { getValidSlotFormat } from 'pages/onions/slots/cards/SlotsUpdate'
import { alertService } from 'services'
import { StateStatus, TStateStatus } from 'store/helpers/Status'
import {
    ErrorCaseRecommendations,
    Errors,
    requests,
} from 'store/helpers/Requests'

import {
    IOnionScheduleSlots,
    IOnionScheduleSlotsResponse,
    ISlotForUpdate,
    IUpdateManySlots,
    PropsGetOnionScheduleSlots,
} from './types'
import { BonusReasons } from 'store/helpers/Bonus'
import { aideApiAxios } from 'api'
import { IDataForScheduleActionLog } from 'store/slices/sheets/types'
import { logScheduleAction } from 'store/slices/sheets/logsSlice'

export const axiosGetOnionWorkingSlotsInfo = createAsyncThunk<
    IOnionScheduleSlotsResponse[],
    PropsGetOnionScheduleSlots,
    {
        rejectValue: MyKnownError
    }
>(
    'onionsSlots/axiosGetOnionWorkingSlotsInfo',
    async function ({ onionCode, date }, { rejectWithValue }) {
        try {
            const config = {
                params: {
                    cityCode: onionCode,
                    date: date,
                },
            }

            // ? Glovo api config
            // const onionScheduleSlotsResponse: AxiosResponse<
            //     IOnionScheduleSlotsResponse[]
            // > = await adminApiGlovoappAxios.get(
            //     '/admin/scheduling/slots',
            //     config
            // )

            const onionScheduleSlotsResponse: AxiosResponse<
                IOnionScheduleSlotsResponse[]
            > = await aideApiAxios.get('admin/scheduling/slots/', config)

            console.log(
                'onionScheduleSlotsResponse',
                onionScheduleSlotsResponse
            )

            if (onionScheduleSlotsResponse.status !== 200) {
                alertService.error(onionScheduleSlotsResponse.statusText)
                console.log('Error!!!!', onionScheduleSlotsResponse)
                throw new Error(onionScheduleSlotsResponse.statusText)
            }
            const workingSlots = onionScheduleSlotsResponse.data.filter(
                (slot) => slot.bonusReasons.length > 0
            )

            return workingSlots
        } catch (error: Error | any) {
            console.log(
                '[onionsSlots/axiosGetOnionScheduleActiveDates] error',
                error
            )
            if (error.message === Errors.expiredGlovoAdminApiToken_401) {
                alertService.error(
                    ErrorCaseRecommendations.expiredGlovoAdminApiToken_401
                )
            } else {
                alertService.error(error.message)
            }
            return rejectWithValue(error as MyKnownError)
        }
    }
)

export const axiosGetOnionScheduleSlots = createAsyncThunk<
    IOnionScheduleSlots,
    PropsGetOnionScheduleSlots,
    {
        rejectValue: MyKnownError
    }
>(
    'onionsSlots/axiosGetOnionScheduleSlots',
    async function (
        { onionCode, date },
        { dispatch, rejectWithValue, getState }
    ) {
        try {
            const config: AxiosRequestConfig = {
                params: {
                    cityCode: onionCode,
                    date: date,
                },
            }
            // const onionScheduleSlotsResponse: AxiosResponse<
            //     IOnionScheduleSlotsResponse[]
            // > = await adminApiGlovoappAxios.get(
            //     '/admin/scheduling/slots',
            //     config
            // )

            const onionScheduleSlotsResponse: AxiosResponse<
                IOnionScheduleSlotsResponse[]
            > = await aideApiAxios.get('/admin/scheduling/slots/', config)

            console.log(
                'onionScheduleSlotsResponse',
                onionScheduleSlotsResponse
            )
            if (onionScheduleSlotsResponse.status !== 200) {
                alertService.error(onionScheduleSlotsResponse.statusText)
                throw new Error(onionScheduleSlotsResponse.statusText)
            }
            const workingSlots = onionScheduleSlotsResponse.data.filter(
                (slot) => slot.bonusReasons.length > 0
            )
            const onionScheduleStartSlots = workingSlots.map(
                (slot) => slot.startTime
            )
            const onionScheduleFinishSlots = workingSlots.map(
                (slot) => slot.finishTime
            )
            dispatch(
                updatePeriodStartTime({
                    startTimeOfPeriod: onionScheduleStartSlots[0],
                })
            )
            dispatch(
                updatePeriodEndTime({
                    endTimeOfPeriod: onionScheduleFinishSlots[0],
                })
            )
            return {
                allOnionSlots: onionScheduleSlotsResponse.data,
                workingSlots,
                onionScheduleStartSlots,
                onionScheduleFinishSlots,
            }
        } catch (error: Error | any) {
            console.log(error)
            if (error.message === Errors.expiredGlovoAdminApiToken_401) {
                alertService.error(
                    ErrorCaseRecommendations.expiredGlovoAdminApiToken_401
                )
            } else {
                alertService.error(error.message)
            }

            return rejectWithValue(error as MyKnownError)
        }
    }
)

export const updateOnionSlots = createAsyncThunk<
    void,
    void,
    {
        rejectValue: MyKnownError
    }
>(
    'onionsSlots/updateOnionSlots',
    async function (_, { dispatch, rejectWithValue, getState }) {
        try {
            const state = getState() as RootState

            const {
                date,
                selectedOnionCode,
                startTimeOfPeriod,
                endTimeOfPeriod,
                bonusReason,
                bonusSize,
                capacityPercentage,
                workingSlots,
            } = state.onionsSlots
            console.log('workingSlots', workingSlots)
            console.log('startTimeOfPeriod', startTimeOfPeriod)

            console.log('endTimeOfPeriod', endTimeOfPeriod)

            const startSlot = workingSlots.filter(
                (slot) => slot.startTime === startTimeOfPeriod
            )[0]
            const indexOfStartSlot = workingSlots.indexOf(startSlot)

            console.log('[onionsSlots/updateOnionSlots] startSlot', startSlot)
            console.log(
                '[onionsSlots/updateOnionSlots] indexOfStartSlot',
                indexOfStartSlot
            )

            const finishSlot = workingSlots.filter(
                (slot) => slot.finishTime === endTimeOfPeriod
            )[0]
            const indexOfFinishSlot = workingSlots.indexOf(finishSlot)

            console.log('[onionsSlots/updateOnionSlots] finishSlot', finishSlot)
            console.log(
                '[onionsSlots/updateOnionSlots] indexOfFinishSlot',
                indexOfFinishSlot
            )

            const slotsOfPeriodToUpdate = workingSlots.slice(
                indexOfStartSlot,
                indexOfFinishSlot + 1
            )

            console.log(
                '[onionsSlots/updateOnionSlots] periodToUpdate',
                slotsOfPeriodToUpdate
            )

            const dataForUpdate: ISlotForUpdate[] = slotsOfPeriodToUpdate.map(
                (slot) => {
                    const newBonus = slot.bonus + bonusSize
                    const newCapacity =
                        slot.capacity +
                        slot.capacity * (capacityPercentage / 100)

                    return {
                        id: slot.id,
                        bonus: newBonus,
                        bonusReasons: [bonusReason],
                        capacity: newCapacity,
                        excellence: slot.excellence,
                        guarantee: slot.guarantee,
                    }
                }
            )
            console.log(
                '[onionsSlots/updateOnionSlots] dataForUpdate',
                dataForUpdate
            )
            const data: IUpdateManySlots = {
                notifyCouriers: false,
                slots: dataForUpdate,
            }

            // const onionScheduleSlotsResponse: AxiosResponse =
            //     await adminApiGlovoappAxios.post(
            //         '/admin/scheduling/slots/updateMany',
            //         data
            //     )
            const onionScheduleSlotsResponse: AxiosResponse<
                IOnionScheduleSlotsResponse[]
            > = await aideApiAxios.post(
                'admin/scheduling/slots/updateMany/',
                data
            )

            console.log(
                'onionScheduleSlotsResponse',
                onionScheduleSlotsResponse
            )

            if (onionScheduleSlotsResponse.status === 200) {
                const currentMoment = dayjs().format('HH:mm:ss DD.MM.YYYY')
                const state = getState() as RootState
                const {
                    date,
                    selectedOnionCode,
                    startTimeOfPeriod,
                    endTimeOfPeriod,
                    bonusReason,
                    bonusSize,
                } = state.onionsSlots
                const { name, surname } = state.user
                const startPeriodSlot = getValidSlotFormat(startTimeOfPeriod)
                const endPeriodSlot = getValidSlotFormat(endTimeOfPeriod)

                const logData: IDataForScheduleActionLog = {
                    actionTime: currentMoment,
                    userName: `${name} ${surname}`,
                    onionCode: selectedOnionCode,
                    period: `${startPeriodSlot} - ${endPeriodSlot}`,
                    bonusSize: bonusSize,
                    bonusType: BonusReasons[bonusReason],
                    capacityPercentage: capacityPercentage,
                    dateOfSchedule: date,
                }

                console.log('Starting log to sheet logData', logData)
                await dispatch(logScheduleAction(logData))
            }

            await dispatch(
                axiosGetOnionScheduleSlots({
                    onionCode: selectedOnionCode,
                    date,
                })
            )
            const { status, statusText } = onionScheduleSlotsResponse
            requests.processError(status, statusText)
        } catch (error: Error | any) {
            console.log(
                '[onionsSlots/axiosGetOnionScheduleActiveDates] error',
                error
            )
            if (error.message === Errors.expiredGlovoAdminApiToken_401) {
                alertService.error(
                    ErrorCaseRecommendations.expiredGlovoAdminApiToken_401
                )
            } else {
                alertService.error(
                    `[onionsSlots/axiosGetOnionScheduleActiveDates]: ${error.message}`
                )
            }
            return rejectWithValue(error as MyKnownError)
        }
    }
)

interface IOnionSlotsState {
    status: TStateStatus
    error: null | undefined | string | MyKnownError
    date: string
    selectedOnionCode: string
    startTimeOfPeriod: string
    endTimeOfPeriod: string
    bonusReason: BonusReasons.BW | BonusReasons.RUSH
    bonusSize: number
    capacityPercentage: number
    activeScheduleDates: string[]
    onionScheduleStartSlots: string[]
    onionScheduleFinishSlots: string[]
    allOnionSlots: IOnionScheduleSlotsResponse[]
    workingSlots: IOnionScheduleSlotsResponse[]
}

const initialState: IOnionSlotsState = {
    status: null,
    error: null,
    date: dayjs().format('YYYY-MM-DD'),
    selectedOnionCode: 'KHM',
    startTimeOfPeriod: '',
    endTimeOfPeriod: '',
    bonusReason: BonusReasons.RUSH,
    bonusSize: 20,
    capacityPercentage: 0,
    activeScheduleDates: [dayjs().add(1, 'days').format('YYYY-MM-DD')],
    onionScheduleStartSlots: [],
    onionScheduleFinishSlots: [],
    allOnionSlots: [],
    workingSlots: [],
}

const onionsSlotsSlice = createSlice({
    name: 'onionsSlots',
    initialState,
    reducers: {
        getActiveScheduleDates(state) {
            const countOfDates: number = 5
            const activeScheduleDates: string[] = []
            for (let i = 0; i < countOfDates; i++) {
                const date = dayjs().add(i, 'days').format('YYYY-MM-DD')
                activeScheduleDates.push(date)
            }
            state.activeScheduleDates = activeScheduleDates
        },
        updateSelectedScheduleDate(state, action) {
            state.date = action.payload
        },
        updateSelectedOnionCode(state, action) {
            state.selectedOnionCode = action.payload
        },
        updateBonusReason(state, action) {
            state.bonusReason = action.payload
        },
        updatePeriodStartTime(state, action) {
            state.startTimeOfPeriod = action.payload.startTimeOfPeriod
        },
        updatePeriodEndTime(state, action) {
            state.endTimeOfPeriod = action.payload.endTimeOfPeriod
        },
        updateBonusSize(state, action) {
            state.bonusSize = action.payload
        },
        updateCapacityPercentage(state, action) {
            state.capacityPercentage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(axiosGetOnionScheduleSlots.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(axiosGetOnionScheduleSlots.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(
            axiosGetOnionScheduleSlots.fulfilled,
            (state, action) => {
                const {
                    allOnionSlots,
                    workingSlots,
                    onionScheduleStartSlots,
                    onionScheduleFinishSlots,
                } = action.payload
                state.allOnionSlots = allOnionSlots
                state.workingSlots = workingSlots
                state.onionScheduleStartSlots = onionScheduleStartSlots
                state.onionScheduleFinishSlots = onionScheduleFinishSlots
                state.status = StateStatus.success
            }
        )
    },
})

export const {
    getActiveScheduleDates,
    updateSelectedScheduleDate,
    updateSelectedOnionCode,
    updatePeriodStartTime,
    updatePeriodEndTime,
    updateBonusReason,
    updateBonusSize,
    updateCapacityPercentage,
} = onionsSlotsSlice.actions

export default onionsSlotsSlice.reducer
