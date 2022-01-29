import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MyKnownError } from 'store/helpers/reports/types'

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { RootState } from 'store'
import {
    GoogleSpreadsheet,
    GoogleSpreadsheetWorksheet,
    WorksheetGridRange,
} from 'google-spreadsheet'
import {
    REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_CLIENT_EMAIL,
    REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_PRIVATE_KEY,
    REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_SHEET_ID,
} from 'api/env'
import { toast } from 'react-toastify'
import { getValidSlotFormat } from 'pages/onions/slots/cards/SlotsUpdate'
import { aideApiAxios, adminApiGlovoappAxios } from 'api/api'
import { alertService } from 'services/AlertService'

export enum Errors {
    expiredGlovoAdminApiToken_401 = 'Request failed with status code 401',
    invalidToken = 'Invalid access token',
}

export enum Recommendations {
    expiredGlovoAdminApiToken_401 = 'Token for adminapi.glovoapp expired! Drink some coffee and come back! :)',
}

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
export interface IGlovoAdminHeaders {
    id: number
    user_agent: string
    accept: string
    authorization: string
    content_type: string
}

export const alertError = (msg: string) => {
    toast.error(msg, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    })
}

export const alertSuccess = (msg: string) => {
    toast.success(msg, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    })
}

export interface IDataForScheduleActionLog {
    actionTime: string
    userName: string
    onionCode: string
    period: string
    bonusSize: number
    bonusType: string
    capacityPercentage: number
    dateOfSchedule: string
}

export const logScheduleActionToSheet = createAsyncThunk<
    void,
    IDataForScheduleActionLog,
    {
        rejectValue: MyKnownError
    }
>(
    'onionsSlots/logScheduleActionToSheet',
    async function (
        {
            actionTime,
            userName,
            onionCode,
            period,
            bonusSize,
            bonusType,
            capacityPercentage,
            dateOfSchedule,
        },
        { rejectWithValue, dispatch }
    ) {
        const updateRangeFormatting = async (
            sheet: GoogleSpreadsheetWorksheet,
            range: string | WorksheetGridRange | string[] | WorksheetGridRange[]
        ): Promise<void> => {
            await sheet.loadCells(range)
            const lastRowIndex = (await sheet.getRows()).length
            const columnCount = sheet.columnCount

            console.log('last row: ', lastRowIndex)
            console.log('columnCount: ', columnCount)

            for (let i = 0; i < columnCount; i++) {
                console.log(
                    `Updating style of column ${i} and row ${lastRowIndex}`
                )
                const cell = sheet.getCell(lastRowIndex, i)
                cell.horizontalAlignment = 'CENTER'
                cell.textFormat = {
                    fontSize: 11,
                }
            }
            await sheet.saveUpdatedCells()
        }

        try {
            const doc = new GoogleSpreadsheet(
                REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_SHEET_ID
            )

            await doc.useServiceAccountAuth({
                client_email:
                    REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_CLIENT_EMAIL,
                private_key:
                    REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_PRIVATE_KEY,
            })

            await doc.loadInfo() // loads document properties and worksheets

            const logRow = {
                'Action time': actionTime,
                Name: userName,
                Onion: onionCode,
                Slots: period,
                'Bonus size': bonusSize,
                'Bonus type': bonusType,
                'Capacity +%': capacityPercentage,
                'Date of schedule': dateOfSchedule,
            }

            if (!doc.sheetsByTitle[dayjs().format('DD.MM.YYYY')]) {
                const todaySheet = await doc.addSheet({
                    title: dayjs().format('DD.MM.YYYY'),
                    headerValues: [
                        'Action time',
                        'Name',
                        'Onion',
                        'Slots',
                        'Bonus size',
                        'Bonus type',
                        'Capacity +%',
                        'Date of schedule',
                    ],
                    gridProperties: {
                        frozenRowCount: 1,
                        rowCount: 300,
                        columnCount: 8,
                    },
                })

                await todaySheet.loadCells('A1:H1')

                const columnCount = todaySheet.columnCount
                for (let i = 0; i < columnCount; i++) {
                    const cell = todaySheet.getCell(0, i)
                    cell.backgroundColor = {
                        red: 0.3,
                        green: 0.4,
                        blue: 0.8,
                        alpha: 0.5,
                    }
                    cell.horizontalAlignment = 'CENTER'
                    cell.textFormat = {
                        fontSize: 11,
                        bold: true,
                    }
                    await todaySheet.saveUpdatedCells()
                }
                todaySheet.updateDimensionProperties(
                    'COLUMNS',
                    {
                        pixelSize: 160,
                        hiddenByUser: false,
                        hiddenByFilter: false,
                        developerMetadata: [],
                    },
                    {
                        startIndex: 0,
                        endIndex: 2,
                    }
                )
                todaySheet.updateDimensionProperties(
                    'COLUMNS',
                    {
                        pixelSize: 90,
                        hiddenByUser: false,
                        hiddenByFilter: false,
                        developerMetadata: [],
                    },
                    {
                        startIndex: 3,
                        endIndex: 7,
                    }
                )
                todaySheet.updateDimensionProperties(
                    'COLUMNS',
                    {
                        pixelSize: 160,
                        hiddenByUser: false,
                        hiddenByFilter: false,
                        developerMetadata: [],
                    },
                    {
                        startIndex: 7,
                        endIndex: 8,
                    }
                )
            }
            const todaySheet = doc.sheetsByTitle[dayjs().format('DD.MM.YYYY')]
            const row = await todaySheet.addRow(logRow)
            const columnCount = todaySheet.columnCount

            console.log(
                '[logScheduleActionToSheet] Row for updating formatting:',
                row.rowIndex
            )
            const lastRow = {
                startRowIndex: row.rowIndex - 1,
                endRowIndex: row.rowIndex,
                startColumnIndex: 0,
                endColumnIndex: columnCount,
            }
            console.log('property', lastRow)
            await todaySheet.loadCells(lastRow)

            await updateRangeFormatting(todaySheet, lastRow)
        } catch (error: any) {
            console.log('Error', error)
            alertError(`[logScheduleActionToSheet] \n ${error.message}`)
        }
    }
)

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
            const glovoAdminHeaders: AxiosResponse<IGlovoAdminHeaders[]> =
                await aideApiAxios.get(`/refresh_token/`)
            if (glovoAdminHeaders.statusText !== 'OK') {
                alertError(glovoAdminHeaders.statusText)
                throw new Error(glovoAdminHeaders.statusText)
            }
            return glovoAdminHeaders.data as IGlovoAdminHeaders[]
        } catch (error: Error | any) {
            console.log(
                '[onionsSlots/axiosGetGlovoApiRefreshToken] error',
                error
            )
            alertError(error.message)
            return rejectWithValue(error as MyKnownError)
        }
    }
)

export const updateGlovoApiToken = createAsyncThunk<
    void,
    string,
    {
        rejectValue: MyKnownError
    }
>(
    'onionsSlots/updateGlovoApiToken',
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const response: AxiosResponse = await aideApiAxios.options(
                `/refresh_token/`
            )

            if (response.statusText !== 'OK') {
                alertError(response.statusText)
                throw new Error(response.statusText)
            } else if (response.statusText === 'OK') {
                alertService.loading(
                    dispatch(axiosGetGlovoApiRefreshToken('_')),
                    {
                        pending: `Updating token...`,
                        success: `API token updated!`,
                        error: `Error while Updating token`,
                    },
                    {
                        autoClose: 1000,
                    }
                )
            }
        } catch (error: Error | any) {
            console.log('[onionsSlots/updateGlovoApiToken] error', error)
            alertError(error.message)
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
                alertError(onionScheduleSlotsResponse.statusText)
                console.log('Erro blyad!!!!', onionScheduleSlotsResponse)
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
                alertError(Recommendations.expiredGlovoAdminApiToken_401)
            } else {
                alertError(error.message)
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
            await dispatch(axiosGetGlovoApiRefreshToken('_'))
            const state = getState() as RootState

            const { user_agent, accept, authorization, content_type } =
                state.onionsSlots.glovoAdminHeaders[0]

            const config: AxiosRequestConfig = {
                headers: {
                    'user-agent': user_agent,
                    accept: accept,
                    authorization: 'authorization',
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
                alertError(onionScheduleSlotsResponse.statusText)
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
                alertError(Recommendations.expiredGlovoAdminApiToken_401)
                dispatch(updateGlovoApiToken('_'))
            } else {
                alertError(error.message)
            }

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
                await dispatch(logScheduleActionToSheet(logData))
            }

            await dispatch(
                axiosGetOnionScheduleSlots({
                    onionCode: selectedOnionCode,
                    date,
                })
            )
            if (onionScheduleSlotsResponse.status !== 200) {
                throw new Error(onionScheduleSlotsResponse.statusText)
            }
        } catch (error: Error | any) {
            console.log(
                '[onionsSlots/axiosGetOnionScheduleActiveDates] error',
                error
            )
            alertError(
                `[onionsSlots/axiosGetOnionScheduleActiveDates]: ${error.message}`
            )
            return rejectWithValue(error as MyKnownError)
        }
    }
)

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
    glovoAdminHeaders: [],
    date: dayjs().format('YYYY-MM-DD'),
    selectedOnionCode: 'VNT',
    startTimeOfPeriod: '',
    endTimeOfPeriod: '',
    bonusReason: BonusReasons.BW,
    bonusSize: 20,
    capacityPercentage: 10,
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
        updateCapacityPercentage(state, action) {
            state.capacityPercentage = action.payload
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
        builder.addCase(logScheduleActionToSheet.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(logScheduleActionToSheet.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(logScheduleActionToSheet.fulfilled, (state) => {
            state.status = StateStatus.success
        })
        builder.addCase(updateGlovoApiToken.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(updateGlovoApiToken.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(updateGlovoApiToken.fulfilled, (state) => {})
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
} = userSlice.actions

export default userSlice.reducer
