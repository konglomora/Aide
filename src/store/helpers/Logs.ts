import {
    GoogleSpreadsheetWorksheet,
    WorksheetGridRange,
} from 'google-spreadsheet'

class Logs {
    updateRangeFormatting = async (
        sheet: GoogleSpreadsheetWorksheet,
        range: string | WorksheetGridRange | string[] | WorksheetGridRange[]
    ): Promise<void> => {
        await sheet.loadCells(range)
        const lastRowIndex = (await sheet.getRows()).length
        const columnCount = sheet.columnCount

        console.log('last row: ', lastRowIndex)
        console.log('columnCount: ', columnCount)

        for (let i = 0; i < columnCount; i++) {
            // console.log(`Updating style of column ${i} and row ${lastRowIndex}`)
            const cell = sheet.getCell(lastRowIndex, i)
            cell.horizontalAlignment = 'CENTER'
            cell.textFormat = {
                fontSize: 11,
            }
        }
        await sheet.saveUpdatedCells()
    }
}

const logs = new Logs()
export { logs }
