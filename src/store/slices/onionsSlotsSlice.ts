import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MyKnownError } from 'store/helpers/reports/types'
import { adminApiGlovoappAxios, aideApiAxios } from 'axios/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { RootState } from 'store'

export interface IGlovoAdminHeaders {
    id: number
    user_agent: string
    accept: string
    authorization: string
    content_type: string
}

export const axiosGetGlovoApiRefreshToken = createAsyncThunk<
    IGlovoAdminHeaders[],
    string,
    {
        rejectValue: MyKnownError
    }
>(
    'onionsSlots/axiosGetGlovoApiRefreshToken',
    async function (_, { rejectWithValue }) {
        try {
            const saturatedOnions: AxiosResponse<IGlovoAdminHeaders[]> =
                await aideApiAxios.get(`/refresh_token/`)
            if (saturatedOnions.statusText !== 'OK') {
                throw new Error(saturatedOnions.statusText)
            }
            return saturatedOnions.data as IGlovoAdminHeaders[]
        } catch (error) {
            console.log(
                '[onionsSlots/axiosGetGlovoApiRefreshToken] error',
                error
            )

            return rejectWithValue(error as MyKnownError)
        }
    }
)

export interface IOnionScheduleSlotsResponse {
    bonus: number
    bonusReasons: string[]
    capacity: number
    couriers: number
    dedicatedCapacity: null | any
    enabled: boolean
    excellence: boolean
    finishTime: string
    guarantee: number
    id: number
    reducedByNoShow: boolean
    standbyCouriersCapacity: null | any
    startTime: string
}

export interface PropsGetOnionScheduleSlots {
    onionCode: string
    date: string
}

export interface IOnionScheduleSlots {
    allOnionSlots: IOnionScheduleSlotsResponse[]
    workingSlots: IOnionScheduleSlotsResponse[]
    onionScheduleStartSlots: string[]
    onionScheduleFinishSlots: string[]
}

export const axiosGetOnionWorkingSlotsInfo = createAsyncThunk<
    IOnionScheduleSlotsResponse[],
    PropsGetOnionScheduleSlots,
    {
        rejectValue: MyKnownError
    }
>(
    'onionsSlots/axiosGetOnionWorkingSlotsInfo',
    async function (
        { onionCode, date },
        { dispatch, rejectWithValue, getState }
    ) {
        try {
            await dispatch(axiosGetGlovoApiRefreshToken('_'))
            const state = getState() as RootState

            const { user_agent, accept, authorization, content_type } =
                state.onionsSlots.glovoAdminHeaders[0]

            const config = {
                headers: {
                    'user-agent': user_agent,
                    accept: accept,
                    authorization: authorization,
                    'content-type': content_type,
                },
                params: {
                    cityCode: onionCode,
                    date: date,
                },
            }
            const onionScheduleSlotsResponse: AxiosResponse<
                IOnionScheduleSlotsResponse[]
            > = await adminApiGlovoappAxios.get(
                '/admin/scheduling/slots',
                config
            )

            console.log(
                'onionScheduleSlotsResponse',
                onionScheduleSlotsResponse
            )
            if (onionScheduleSlotsResponse.status !== 200) {
                throw new Error(onionScheduleSlotsResponse.statusText)
            }
            const workingSlots = onionScheduleSlotsResponse.data.filter(
                (slot) => slot.bonusReasons.length > 0
            )

            return workingSlots
        } catch (error) {
            console.log(
                '[onionsSlots/axiosGetOnionScheduleActiveDates] error',
                error
            )

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
            await dispatch(axiosGetGlovoApiRefreshToken('_'))
            const state = getState() as RootState

            const { user_agent, accept, authorization, content_type } =
                state.onionsSlots.glovoAdminHeaders[0]

            const config = {
                headers: {
                    'user-agent': user_agent,
                    accept: accept,
                    authorization: authorization,
                    'content-type': content_type,
                },
                params: {
                    cityCode: onionCode,
                    date: date,
                },
            }
            const onionScheduleSlotsResponse: AxiosResponse<
                IOnionScheduleSlotsResponse[]
            > = await adminApiGlovoappAxios.get(
                '/admin/scheduling/slots',
                config
            )
            // https://adminapi.glovoapp.com/admin/scheduling/slots?cityCode=KIE&date=2022-01-23
            console.log(
                'onionScheduleSlotsResponse',
                onionScheduleSlotsResponse
            )
            if (onionScheduleSlotsResponse.status !== 200) {
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
        } catch (error) {
            console.log(
                '[onionsSlots/axiosGetOnionScheduleActiveDates] error',
                error
            )

            return rejectWithValue(error as MyKnownError)
        }
    }
)

export interface ISlotForUpdate {
    bonus: number
    bonusReasons: string[]
    capacity: number
    excellence: boolean
    guarantee: number
    id: number
}
export interface IUpdateManySlots {
    notifyCouriers: boolean
    slots: ISlotForUpdate[]
}

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
            await dispatch(axiosGetGlovoApiRefreshToken('_'))
            const state = getState() as RootState

            const { user_agent, accept, authorization, content_type } =
                state.onionsSlots.glovoAdminHeaders[0]
            const {
                date,
                selectedOnionCode,
                startTimeOfPeriod,
                endTimeOfPeriod,
                bonusReason,
                bonusSize,
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
                    return {
                        id: slot.id,
                        bonus: slot.bonus + bonusSize,
                        bonusReasons: [bonusReason],
                        capacity: slot.capacity,
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
            const config: AxiosRequestConfig = {
                headers: {
                    'user-agent': user_agent,
                    accept: accept,
                    authorization: authorization,
                    'content-type': content_type,
                },
            }
            // https://adminapi.glovoapp.com/admin/scheduling/slots/updateMany
            const onionScheduleSlotsResponse: AxiosResponse =
                await adminApiGlovoappAxios.post(
                    '/admin/scheduling/slots/updateMany',
                    data,
                    config
                )

            console.log(
                'onionScheduleSlotsResponse',
                onionScheduleSlotsResponse
            )
            await dispatch(
                axiosGetOnionScheduleSlots({
                    onionCode: selectedOnionCode,
                    date,
                })
            )
            if (onionScheduleSlotsResponse.status !== 200) {
                throw new Error(onionScheduleSlotsResponse.statusText)
            }
        } catch (error) {
            console.log(
                '[onionsSlots/axiosGetOnionScheduleActiveDates] error',
                error
            )

            return rejectWithValue(error as MyKnownError)
        }
    }
)

export enum StateStatus {
    success = 'success',
    error = 'error',
    loading = 'loading',
}

export enum BonusReasons {
    BW = 'bad_weather',
    RUSH = 'rush',
    bad_weather = 'BW',
    rush = 'RUSH',
}

interface IOnionSlotsState {
    status: StateStatus.success | StateStatus.loading | StateStatus.error | null
    error: null | undefined | string | MyKnownError
    glovoAdminHeaders: IGlovoAdminHeaders[]
    date: string
    selectedOnionCode: string
    startTimeOfPeriod: string
    endTimeOfPeriod: string
    bonusReason: BonusReasons.BW | BonusReasons.RUSH
    bonusSize: number
    activeScheduleDates: string[]
    onionScheduleStartSlots: string[]
    onionScheduleFinishSlots: string[]
    allOnionSlots: IOnionScheduleSlotsResponse[]
    workingSlots: IOnionScheduleSlotsResponse[]
}

const initialState: IOnionSlotsState = {
    status: null,
    error: null,
    glovoAdminHeaders: [],
    date: dayjs().format('YYYY-MM-DD'),
    selectedOnionCode: 'VNT',
    startTimeOfPeriod: '',
    endTimeOfPeriod: '',
    bonusReason: BonusReasons.BW,
    bonusSize: 1,
    activeScheduleDates: [dayjs().format('YYYY-MM-DD')],
    onionScheduleStartSlots: [],
    onionScheduleFinishSlots: [],
    allOnionSlots: [],
    workingSlots: [],
}

const userSlice = createSlice({
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
    },
    extraReducers: (builder) => {
        builder.addCase(axiosGetGlovoApiRefreshToken.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(axiosGetGlovoApiRefreshToken.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(
            axiosGetGlovoApiRefreshToken.fulfilled,
            (state, action) => {
                state.glovoAdminHeaders = action.payload
                state.status = StateStatus.success
            }
        )
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
} = userSlice.actions

export default userSlice.reducer
