import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { aideApiAxios } from '../../axios/axios'

const weatherActionPlanSlice = createSlice({
    name: 'weather-action-plan',
    initialState: {
        status: null,
        error: null,
        period: {
            tomorrow: true,
            tomorrowDate: '',
            afterTomorrow: true,
        },
        lowPrecipitationOnionCodes: [],
        mediumPrecipitationOnionCodes: [],
    },
    reducers: {},
})

export const {} = weatherActionPlanSlice.actions

export default weatherActionPlanSlice.reducer
