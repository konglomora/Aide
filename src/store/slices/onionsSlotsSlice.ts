import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MyKnownError } from 'store/helpers/reports/types'
import { aideApiAxios } from 'axios/axios'
import { AxiosResponse } from 'axios'
import dayjs, { Dayjs } from 'dayjs'

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

export enum StateStatus {
    success = 'success',
    error = 'error',
    loading = 'loading',
}

interface IOnionsSlotsState {
    status: StateStatus.success | StateStatus.loading | StateStatus.error | null
    error: null | undefined | string | MyKnownError
    glovoAdminHeaders: IGlovoAdminHeaders[]
    date: Dayjs
    selectedOnions: string[]
    selectedSlots: string[]
    bonusReason: string | null
}

const initialState: IOnionsSlotsState = {
    status: null,
    error: null,
    glovoAdminHeaders: [],
    date: dayjs(),
    selectedOnions: [],
    selectedSlots: [],
    bonusReason: null,
}

const userSlice = createSlice({
    name: 'onionsSlots',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            axiosGetGlovoApiRefreshToken.rejected,
            (state, action) => {
                state.status = StateStatus.error
            }
        )
        builder.addCase(
            axiosGetGlovoApiRefreshToken.pending,
            (state, action) => {
                state.status = StateStatus.loading
            }
        )
        builder.addCase(
            axiosGetGlovoApiRefreshToken.fulfilled,
            (state, action) => {
                state.glovoAdminHeaders = action.payload
            }
        )
    },
})

export const {} = userSlice.actions

export default userSlice.reducer
