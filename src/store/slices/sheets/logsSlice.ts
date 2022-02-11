import { StateStatus } from './../../helpers/Status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MyKnownError } from 'store/slices/saturation/types'
import { alertService } from 'services'
import { IDataForScheduleActionLog, ILogsState } from './types'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { logs } from 'store/helpers/Logs'
import dayjs from 'dayjs'
import { IStateActionPlan } from '../weather/actionCoordinationSlice'
import { RootState } from 'store'

const initialState: ILogsState = {
    status: null,
    error: null,
}

export const logScheduleAction = createAsyncThunk<
    void,
    IDataForScheduleActionLog,
    {
        rejectValue: MyKnownError
    }
>(
    'logs/logScheduleAction',
    async function ({
        actionTime,
        userName,
        onionCode,
        period,
        bonusSize,
        bonusType,
        capacityPercentage,
        dateOfSchedule,
    }) {
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

            await doc.loadInfo() // loads document properties and worksheets
            console.log(`logsSlice doc`, doc)

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
                console.log('No sheet for today')
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
                        rowCount: 150,
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
                console.log('Created sheet for today')
            }
            const todaySheet = doc.sheetsByTitle[dayjs().format('DD.MM.YYYY')]
            const row = await todaySheet.addRow(logRow)
            const columnCount = todaySheet.columnCount

            console.log(
                '[logScheduleAction] Row for updating formatting:',
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
            await logs.updateRangeFormatting(todaySheet, lastRow)
        } catch (error: any) {
            console.log('Error', error)
            alertService.error(`[logScheduleAction] \n ${error.message}`)
        }
    }
)

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

            await doc.loadInfo() // loads document properties and worksheets

            if (!doc.sheetsByTitle[dayjs().format('DD.MM.YYYY')]) {
                console.log('No sheet for today')
                const todaySheet = await doc.addSheet({
                    title: dayjs().format('DD.MM.YYYY'),
                    headerValues: [
                        'Coordination time',
                        'Name',
                        'Onion',
                        'Slots',
                        'Bonus +%',
                        'Bonus reason',
                        'Capacity +%',
                        'Challenges',
                        'Saturation bot',
                        'Mode',
                        'Date of schedule',
                    ],
                    gridProperties: {
                        frozenRowCount: 1,
                        rowCount: 150,
                        columnCount: 11,
                    },
                })

                await todaySheet.loadCells('A1:K1')

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
                        pixelSize: 100,
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
                        endIndex: 10,
                    }
                )
                await todaySheet.saveUpdatedCells()
                console.log('Created sheet for today')
            }

            const todaySheet = doc.sheetsByTitle[dayjs().format('DD.MM.YYYY')]

            const plans = [...kyiv_plan, ...mio_plan, ...small_plan]

            const coordinationTime = dayjs().format('HH:mm:ss DD.MM.YYYY')
            const { name, surname } = (getState() as RootState).user

            for (const plan of plans) {
                const {
                    city,
                    bonusSizeIncrease,
                    capacitySizeIncrease,
                    bonusReason,
                    wetStartSlot,
                    wetFinishSlot,
                    challenges,
                    saturationBotMode,
                    mode,
                    date,
                } = plan

                const logRow = {
                    'Coordination time': coordinationTime,
                    Name: `${name} ${surname}`,
                    Onion: city,
                    Slots: `${wetStartSlot} - ${wetFinishSlot}`,
                    'Bonus +%': bonusSizeIncrease,
                    'Bonus reason': bonusReason,
                    'Capacity +%': capacitySizeIncrease,
                    Challenges: challenges,
                    'Saturation bot': saturationBotMode,
                    Mode: mode,
                    'Date of schedule': date,
                }
                const row = await todaySheet.addRow(logRow)
                const columnCount = todaySheet.columnCount

                // console.log(
                //     '[logScheduleAction] Row for updating formatting:',
                //     row.rowIndex
                // )
                const lastRow = {
                    startRowIndex: row.rowIndex - 1,
                    endRowIndex: row.rowIndex,
                    startColumnIndex: 0,
                    endColumnIndex: columnCount,
                }
                // console.log(
                //     '[logScheduleAction] Row for updating formatting:',
                //     row.rowIndex
                // )

                // console.log('property', lastRow)
                await todaySheet.loadCells(lastRow)
                await logs.updateRangeFormatting(todaySheet, lastRow)
            }
        } catch (error: any) {
            console.log('Error', error)
            alertService.error(`[logScheduleAction] \n ${error.message}`)
        }
    }
)

const logsSlice = createSlice({
    name: 'onionsSlots',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logScheduleAction.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(logScheduleAction.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(logScheduleAction.fulfilled, (state) => {
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
    },
})

// export const {} = glovoappApiSlice.actions

export default logsSlice.reducer
