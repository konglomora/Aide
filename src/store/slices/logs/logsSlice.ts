import { StateStatus } from './../../helpers/Status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MyKnownError } from 'store/helpers/reports/types'

import { alertService } from 'services'

import { IDataForScheduleActionLog, ILogsState } from './types'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { logs } from 'store/helpers/Logs'
import dayjs from 'dayjs'

const initialState: ILogsState = {
    status: null,
    error: null,
}

export const logScheduleActionToSheet = createAsyncThunk<
    void,
    IDataForScheduleActionLog,
    {
        rejectValue: MyKnownError
    }
>(
    'logs/logScheduleActionToSheet',
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
                    process.env
                        .REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_CLIENT_EMAIL!,
                private_key:
                    process.env.REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_PRIVATE_KEY!.replace(
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
                console.log('Created sheet for today')
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

            await logs.updateRangeFormatting(todaySheet, lastRow)
        } catch (error: any) {
            console.log('Error', error)
            alertService.error(`[logScheduleActionToSheet] \n ${error.message}`)
        }
    }
)

const logsSlice = createSlice({
    name: 'onionsSlots',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logScheduleActionToSheet.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(logScheduleActionToSheet.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(logScheduleActionToSheet.fulfilled, (state) => {
            state.status = StateStatus.success
        })
    },
})

// export const {} = glovoappApiSlice.actions

export default logsSlice.reducer
