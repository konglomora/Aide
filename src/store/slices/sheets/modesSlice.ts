import { TError } from 'store/helpers/Status'
import { StateStatus } from './../../helpers/Status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MyKnownError } from 'store/slices/saturation/types'
import { alertService } from 'services'
import { GoogleSpreadsheet } from 'google-spreadsheet'

export enum SaturationBotModes {
    NORMAL = 'NORMAL',
    LIGHT = 'LIGHT',
    HEAVY = 'HEAVY',
    EXTREME = 'EXTREME',
}

enum ModesRowHeader {
    onion = 'Onion',
    mode = 'Current mode',
}

export interface IOnionsByMode {
    NORMAL: string[]
    LIGHT: string[]
    HEAVY: string[]
    EXTREME: string[]
}

export const getSaturationModes = createAsyncThunk<
    IOnionsByMode,
    void,
    {
        rejectValue: MyKnownError
    }
>('modes/getSaturationModes', async function (_, { getState }) {
    try {
        const doc = new GoogleSpreadsheet(
            process.env.REACT_APP_GOOGLE_SPREADSHEET_AIDE_ONION_SATURATION_MODES_SHEET_ID
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
        const modesSheet = doc.sheetsByTitle['Modes']

        const onions = await modesSheet.getRows()

        const onionsByMode: IOnionsByMode = {
            NORMAL: [],
            LIGHT: [],
            HEAVY: [],
            EXTREME: [],
        }

        for (const onion of onions) {
            onionsByMode[
                onion[ModesRowHeader.mode] as keyof IOnionsByMode
            ]?.push(onion[ModesRowHeader.onion])
        }
        console.log('onionsByMode', onionsByMode)

        return onionsByMode
    } catch (error: any) {
        console.log('Error', error)
        alertService.error(`[logScheduleActions] \n ${error.message}`)
        throw new Error(error.message)
    }
})

interface IModesState {
    status: StateStatus | null
    error: TError
    onionsByMode: IOnionsByMode
}

const initialState: IModesState = {
    status: null,
    error: null,
    onionsByMode: {
        NORMAL: [],
        LIGHT: [],
        HEAVY: [],
        EXTREME: [],
    },
}

const modesSlice = createSlice({
    name: 'modes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSaturationModes.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(getSaturationModes.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(getSaturationModes.fulfilled, (state, action) => {
            state.onionsByMode = action.payload
            state.status = StateStatus.success
        })
    },
})

// export const {} = glovoappApiSlice.actions

export default modesSlice.reducer
