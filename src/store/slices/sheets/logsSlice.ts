import { StateStatus } from './../../helpers/Status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MyKnownError } from 'store/slices/saturation/types'
import { alertService } from 'services'
import { IDataForScheduleActionLog, ILogsState } from './types'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import dayjs from 'dayjs'
import { IStateActionPlan } from '../weather/actionCoordinationSlice'
import { RootState } from 'store'

export enum ActionReasons {
    coordination = 'Coordination apply',
    manual = 'Manual apply',
}

export const logScheduleActions = createAsyncThunk<
    void,
    IDataForScheduleActionLog[],
    {
        rejectValue: MyKnownError
    }
>('logs/logScheduleActions', async function (scheduleActions) {
    try {
        const doc = new GoogleSpreadsheet(
            process.env.REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_SHEET_ID
        )

        await doc.useServiceAccountAuth({
            client_email:
                process.env.REACT_APP_AIDE_SHEETS_SERVICE_CLIENT_EMAIL!,
            private_key:
                process.env.REACT_APP_AIDE_SHEETS_SERVICE_PRIVATE_KEY!.replace(
                    /\\n/g,
                    '\n'
                ),
        })
        const todayDate = dayjs().format('DD.MM.YYYY')
        await doc.loadInfo()
        const todayActionScheduleLog = doc.sheetsByTitle[todayDate]

        if (!todayActionScheduleLog) {
            console.log(
                '[logsSlice/logScheduleActions] No sheet for today. Creating...'
            )

            const templateSheet = doc.sheetsByTitle['Template']
            await templateSheet.copyToSpreadsheet(
                process.env
                    .REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_SHEET_ID!
            )

            await doc.loadInfo()
            const copyOfTemplate = doc.sheetsByTitle['Copy of Template']
            await copyOfTemplate.updateProperties({
                title: todayDate,
            })

            console.log('Created sheet for today')
        }

        const logRows = scheduleActions.map((action) => {
            const {
                actionTime,
                userName,
                onionCode,
                period,
                bonusSize,
                bonusType,
                capacityPercentage,
                dateOfSchedule,
                actionReason,
            } = action
            const logRow = {
                'Action time': actionTime,
                'Action reason': actionReason,
                Name: userName,
                Onion: onionCode,
                Slots: period,
                'Bonus size': bonusSize,
                'Bonus type': bonusType,
                'Capacity +%': capacityPercentage,
                'Date of schedule': dateOfSchedule,
            }

            return logRow
        })

        const todaySheet = doc.sheetsByTitle[todayDate]
        await todaySheet.addRows(logRows)
    } catch (error: any) {
        console.log('Error', error)
        alertService.error(`[logScheduleActions] \n ${error.message}`)
    }
})
interface ICoordinationRow {
    Time: string
    Applied: boolean
    Confirmed: boolean
    Name: string
    Onion: string
    Slots: string
    'Bonus +%': number
    'Bonus reason': string
    'Capacity +%': number
    Challenges: string
    'Saturation bot': string
    Mode: string
    'OM/GS': string
    Date: string
}

type TRow = (
    | (string | number | boolean)[]
    | { [header: string]: string | number | boolean }
)[]

export const logCoordination = createAsyncThunk<
    void,
    IStateActionPlan,
    {
        rejectValue: MyKnownError
    }
>(
    'logs/logCoordination',
    async function ({ kyiv_plan, mio_plan, small_plan }, { getState }) {
        try {
            const doc = new GoogleSpreadsheet(
                process.env.REACT_APP_GOOGLE_SPREADSHEET_ACTIONS_COORDINATION_SHEET_ID
            )

            await doc.useServiceAccountAuth({
                client_email:
                    process.env.REACT_APP_AIDE_SHEETS_SERVICE_CLIENT_EMAIL!,
                private_key:
                    process.env.REACT_APP_AIDE_SHEETS_SERVICE_PRIVATE_KEY!.replace(
                        /\\n/g,
                        '\n'
                    ),
            })

            await doc.loadInfo()
            const tomorrowDate = dayjs().add(1, 'days').format('DD.MM.YYYY')
            const oldTomorrowSheet = doc.sheetsByTitle[tomorrowDate]
            oldTomorrowSheet &&
                (await doc.deleteSheet(oldTomorrowSheet.sheetId))
            await doc.loadInfo()

            console.log('[logs/logCoordination] Creating sheet...')

            const templateSheet = doc.sheetsByTitle['Template']
            await templateSheet.copyToSpreadsheet(
                process.env
                    .REACT_APP_GOOGLE_SPREADSHEET_ACTIONS_COORDINATION_SHEET_ID!
            )

            await doc.loadInfo()
            const copyOfTemplate = doc.sheetsByTitle['Copy of Template']
            await copyOfTemplate.updateProperties({
                title: tomorrowDate,
            })

            console.log('Created sheet for Tomorrow')
            await doc.loadInfo()

            const tomorrowCoordinationSheet = doc.sheetsByTitle[tomorrowDate]
            const plans = [...kyiv_plan, ...mio_plan, ...small_plan]

            const coordinationTime = dayjs().format('HH:mm:ss DD.MM.YYYY')
            const { name, surname } = (getState() as RootState).user

            const rows: ICoordinationRow[] = plans.map((plan) => {
                const doteForLink =
                    dayjs().format('YYYY') +
                    '-' +
                    plan.date.split('.').reverse().join('-')

                const row: ICoordinationRow = {
                    Time: coordinationTime,
                    Applied: false,
                    Confirmed: false,
                    Name: `${name} ${surname}`,
                    Onion: plan.city,
                    Slots: `${plan.wetStartSlot} - ${plan.wetFinishSlot}`,
                    'Bonus +%': plan.bonusSizeIncrease,
                    'Bonus reason': plan.bonusReason,
                    'Capacity +%': plan.capacitySizeIncrease,
                    Challenges: plan.challenges,
                    'Saturation bot': plan.saturationBotMode,
                    Mode: plan.mode,
                    'OM/GS': plan.responsibleStaffTGNick,
                    Date: doteForLink,
                }

                return row
            })

            await tomorrowCoordinationSheet.addRows(rows as unknown as TRow)
        } catch (error: any) {
            console.log('Error', error)
            alertService.error(`[logScheduleActions] \n ${error.message}`)
        }
    }
)

export interface IPropsGetConfirmedOnionCoordination {
    date: string
}

export const getConfirmedOnionsCoordination = createAsyncThunk<
    IConfirmedCoordinationRow[],
    IPropsGetConfirmedOnionCoordination,
    {
        rejectValue: MyKnownError
    }
>(
    'logs/getConfirmedOnionsCoordination',
    async function ({ date }, { getState }) {
        try {
            const doc = new GoogleSpreadsheet(
                process.env.REACT_APP_GOOGLE_SPREADSHEET_ACTIONS_COORDINATION_SHEET_ID
            )

            await doc.useServiceAccountAuth({
                client_email:
                    process.env.REACT_APP_AIDE_SHEETS_SERVICE_CLIENT_EMAIL!,
                private_key:
                    process.env.REACT_APP_AIDE_SHEETS_SERVICE_PRIVATE_KEY!.replace(
                        /\\n/g,
                        '\n'
                    ),
            })

            await doc.loadInfo()
            const coordinationSheet = doc.sheetsByTitle[date]
            const rows = await coordinationSheet.getRows()

            const confirmedCoordinations = rows.filter((coordination) => {
                return (
                    coordination['Confirmed'] === 'TRUE' &&
                    coordination['Applied'] === 'FALSE'
                )
            })

            confirmedCoordinations.forEach((coordination) => {
                coordination['sheetRowIndex'] = coordination.rowIndex
            })

            // console.log('ConfirmedCoordinations', confirmedCoordinations)
            return confirmedCoordinations as unknown as IConfirmedCoordinationRow[]
        } catch (error: any) {
            console.log('Error', error)
            alertService.error(`[logScheduleActions] \n ${error.message}`)
            throw new Error(error.message)
        }
    }
)

export interface IConfirmedCoordinationRow {
    Time: string
    Applied: string
    Confirmed: string
    Name: string
    Onion: string
    Slots: string
    'Bonus +%': string
    'Bonus reason': string
    'Capacity +%': string
    Challenges: string
    'Saturation bot': string
    Mode: string
    Date: string
    sheetRowIndex: number
}

export const testSheetFunc = createAsyncThunk<
    void,
    void,
    {
        rejectValue: MyKnownError
    }
>('logs/testSheetFunc', async function (_) {
    try {
        const doc = new GoogleSpreadsheet(
            process.env.REACT_APP_GOOGLE_SPREADSHEET_ACTIONS_COORDINATION_SHEET_ID
        )

        await doc.useServiceAccountAuth({
            client_email:
                process.env.REACT_APP_AIDE_SHEETS_SERVICE_CLIENT_EMAIL!,
            private_key:
                process.env.REACT_APP_AIDE_SHEETS_SERVICE_PRIVATE_KEY!.replace(
                    /\\n/g,
                    '\n'
                ),
        })

        await doc.loadInfo() // loads document properties and worksheets
        const tomorrowDate = dayjs().add(1, 'days').format('DD.MM.YYYY')
        const oldTomorrowCoordinationSheet = doc.sheetsByTitle[tomorrowDate]
        oldTomorrowCoordinationSheet &&
            (await doc.deleteSheet(oldTomorrowCoordinationSheet.sheetId))

        console.log('Creating sheet...')

        await doc.loadInfo() // loads document properties and worksheets
        const templateSheet = doc.sheetsByTitle['Template']
        await templateSheet.copyToSpreadsheet(
            process.env
                .REACT_APP_GOOGLE_SPREADSHEET_ACTIONS_COORDINATION_SHEET_ID!
        )

        await doc.loadInfo()
        const copyOfTemplate = doc.sheetsByTitle['Copy of Template']
        await copyOfTemplate.updateProperties({
            title: tomorrowDate,
        })

        console.log('Created sheet for today')
        await doc.loadInfo()

        const tomorrowCoordinationSheet = doc.sheetsByTitle[tomorrowDate]

        const logRow1: ICoordinationRow = {
            Time: '13:13;13 13.13.2013',
            Applied: false,
            Confirmed: true,
            Name: `${'name'} ${'surname'}`,
            Onion: 'ZHY',
            Slots: `${'10:00'} - ${'11:00'}`,
            'Bonus +%': 1,
            'Bonus reason': 'BW',
            'Capacity +%': 0,
            Challenges: '-',
            'Saturation bot': 'NORMAL',
            Mode: 'Normal',
            'OM/GS': '@arsenii',
            Date: '2022-02-13',
        }
        const rows = [logRow1, logRow1, logRow1, logRow1]

        await tomorrowCoordinationSheet.addRows(rows as unknown as TRow)
    } catch (error: any) {
        console.log('Error', error)
        alertService.error(`[logScheduleActions] \n ${error.message}`)
        throw new Error(error.message)
    }
})

export interface IPropsGetConfirmedOnionCoordination {
    date: string
}

export const markCoordinationAsApplied = createAsyncThunk<
    void,
    IConfirmedCoordinationRow,
    {
        rejectValue: MyKnownError
    }
>(
    'logs/markCoordinationsAsApplied',
    async function (confirmedCoordinationRow, { getState }) {
        try {
            const doc = new GoogleSpreadsheet(
                process.env.REACT_APP_GOOGLE_SPREADSHEET_ACTIONS_COORDINATION_SHEET_ID
            )

            await doc.useServiceAccountAuth({
                client_email:
                    process.env.REACT_APP_AIDE_SHEETS_SERVICE_CLIENT_EMAIL!,
                private_key:
                    process.env.REACT_APP_AIDE_SHEETS_SERVICE_PRIVATE_KEY!.replace(
                        /\\n/g,
                        '\n'
                    ),
            })
            const tomorrowDate = dayjs().add(1, 'days').format('DD.MM.YYYY')
            await doc.loadInfo()
            const coordinationSheet = doc.sheetsByTitle[tomorrowDate]

            const rows = await coordinationSheet.getRows()

            rows.forEach((row) => {
                const coordinationIsApplied =
                    row.rowIndex === +confirmedCoordinationRow.sheetRowIndex
                coordinationIsApplied && (row['Applied'] = 'TRUE') && row.save()
            })
        } catch (error: any) {
            console.log('Error', error)
            alertService.error(`[logScheduleActions] \n ${error.message}`)
            throw new Error(error.message)
        }
    }
)

const initialState: ILogsState = {
    status: null,
    error: null,
    coordination: {
        hasOnionsToApplyBonus: false,
        confirmedCoordinations: [],
    },
}

const logsSlice = createSlice({
    name: 'onionsSlots',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logScheduleActions.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(logScheduleActions.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(logScheduleActions.fulfilled, (state) => {
            state.status = StateStatus.success
        })
        builder.addCase(logCoordination.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(logCoordination.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(logCoordination.fulfilled, (state) => {
            state.status = StateStatus.success
        })
        builder.addCase(testSheetFunc.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(testSheetFunc.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(testSheetFunc.fulfilled, (state) => {
            state.status = StateStatus.success
        })
        builder.addCase(getConfirmedOnionsCoordination.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(getConfirmedOnionsCoordination.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(
            getConfirmedOnionsCoordination.fulfilled,
            (state, action) => {
                state.coordination.confirmedCoordinations = action.payload
                state.status = StateStatus.success
            }
        )
    },
})

// export const {} = glovoappApiSlice.actions

export default logsSlice.reducer
