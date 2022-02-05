import { StateStatus, TStateStatus } from './../../helpers/Status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MyKnownError } from 'store/helpers/reports/types'
import { AxiosResponse } from 'axios'
import { aideApiAxios } from 'api'
import { alertService } from 'services/AlertService'
import { requests } from 'store/helpers/Requests'
import { IGlovoAdminHeaders } from './types'

interface IGlovoappApiState {
    status: TStateStatus
    error: null | undefined | string | MyKnownError
    glovoApiHeaders: IGlovoAdminHeaders[]
}

const initialState: IGlovoappApiState = {
    status: null,
    error: null,
    glovoApiHeaders: [],
}

export const axiosGetGlovoApiHeaders = createAsyncThunk<
    IGlovoAdminHeaders[],
    void,
    {
        rejectValue: MyKnownError
    }
>(
    'glovoappApi/axiosGetGlovoApiHeaders',
    async function (_, { rejectWithValue }) {
        try {
            const glovoAdminHeaders: AxiosResponse<IGlovoAdminHeaders[]> =
                await aideApiAxios.get(`/refresh_token/`)

            requests.processError(
                glovoAdminHeaders.status,
                glovoAdminHeaders.statusText
            )
            return glovoAdminHeaders.data as IGlovoAdminHeaders[]
        } catch (error: Error | any) {
            console.log('[onionsSlots/axiosGetGlovoApiHeaders] error', error)
            alertService.error(error.message)
            return rejectWithValue(error as MyKnownError)
        }
    }
)

export const updateGlovoApiToken = createAsyncThunk<
    void,
    void,
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
                alertService.error(response.statusText)
                throw new Error(response.statusText)
            } else if (response.statusText === 'OK') {
                alertService.loading(
                    dispatch(axiosGetGlovoApiRefreshToken()),
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
            alertService.error(error.message)
            return rejectWithValue(error as MyKnownError)
        }
    }
)

const glovoappApiSlice = createSlice({
    name: 'onionsSlots',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(axiosGetGlovoApiHeaders.rejected, (state) => {
            state.status = StateStatus.error
        })
        builder.addCase(axiosGetGlovoApiHeaders.pending, (state) => {
            state.status = StateStatus.loading
        })
        builder.addCase(axiosGetGlovoApiHeaders.fulfilled, (state, action) => {
            state.glovoApiHeaders = action.payload
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

// export const {} = glovoappApiSlice.actions

export default glovoappApiSlice.reducer
function axiosGetGlovoApiRefreshToken(): any {
    throw new Error('Function not implemented.')
}
