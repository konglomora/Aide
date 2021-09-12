import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { aideApiAxios } from '../axios/axios'

export const axiosGetSaturatedOnionsByPeriod = createAsyncThunk(
    'saturation-period/axiosGetSaturatedOnionsByPeriod',
    async function ({ periodStart, periodEnd }, { rejectWithValue }) {
        try {
            const saturatedOnions = await aideApiAxios.get(
                `/data/filter/?sat=low&start=${periodStart}&end=${periodEnd}&yesterday=yes`
            )
            console.log({ saturatedOnions })
            if (saturatedOnions.statusText !== 'OK') {
                throw new Error('Error братан из сервачка прилетел')
            }
            return saturatedOnions.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const axiosGetSaturatedOnionAnalyseObject = createAsyncThunk(
    'saturation-period/axiosGetSaturatedOnionObject',
    async function (
        { onionCode, periodStart, periodEnd },
        { rejectWithValue, dispatch }
    ) {
        try {
            const saturatedOnionData = await aideApiAxios.get(
                `/analysis/${onionCode}/${periodStart}/${periodEnd}`
            )

            if (saturatedOnionData.statusText !== 'OK') {
                throw new Error('Error братан из сервачка прилетел')
            }
            const onionReportObject = await JSON.parse(saturatedOnionData.data)
            return onionReportObject
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getSaturationReport = createAsyncThunk(
    'saturation-period/getSaturationReport',
    async function ({ periodStart, periodEnd }, { dispatch, getState }) {
        await dispatch(clearReport())
        await dispatch(
            axiosGetSaturatedOnionsByPeriod({ periodStart, periodEnd })
        )
        await dispatch(getUniqueSaturatedOnionCodes())

        const saturatedUniqueOnionCodesArray =
            getState().saturationPeriodReport.saturatedUniqueOnionCodesArray

        console.log(saturatedUniqueOnionCodesArray)

        saturatedUniqueOnionCodesArray.forEach((onionCode) => {
            dispatch(
                axiosGetSaturatedOnionAnalyseObject({
                    onionCode,
                    periodStart,
                    periodEnd,
                })
            )
        })
        console.log(getState().saturationPeriodReport.periodReport)
    }
)
// Helper for handling errors from rejectWithValue
const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const setLoading = (state) => {
    state.status = 'loading'
    state.error = null
}

const saturationPeriodReportSlice = createSlice({
    name: 'saturation-period',
    initialState: {
        status: null,
        error: null,
        periodStart: '09',
        periodEnd: '10',
        saturatedOnionsObjectsArray: [],
        saturatedUniqueOnionCodesArray: [],
        periodReport: [],
    },
    reducers: {
        setPeriodOfReport(state, action) {
            console.log(action.payload)
            state.periodStart = action.payload.periodStart
            state.periodEnd = action.payload.periodEnd
        },
        // Получаем уникальные имена онионов в которых была сатурация за выбраный период
        getUniqueSaturatedOnionCodes(state) {
            const allSaturatedOnionCodes =
                state.saturatedOnionsObjectsArray.reduce((accum, onion) => {
                    if (!accum.some((obj) => obj.city === onion.city)) {
                        accum.push(onion.city)
                    }
                    return accum
                }, [])

            state.saturatedUniqueOnionCodesArray =
                allSaturatedOnionCodes.filter(
                    (onionCode, index) =>
                        allSaturatedOnionCodes.indexOf(onionCode) === index
                )
        },
        addOnionObjToPeriodReport(state, action) {
            state.periodReport.push(action.payload)
        },
        clearReport(state) {
            state.periodReport = []
        },
    },
    extraReducers: {
        [axiosGetSaturatedOnionsByPeriod.fulfilled]: (state, action) => {
            state.saturatedOnionsObjectsArray = action.payload
        },
        [axiosGetSaturatedOnionsByPeriod.rejected]: setError,
        [axiosGetSaturatedOnionAnalyseObject.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.periodReport.push(action.payload)
        },
        [axiosGetSaturatedOnionAnalyseObject.rejected]: setError,
        [getSaturationReport.fulfilled]: (state, action) => {
            state.status = 'resolved'
        },
        [getSaturationReport.pending]: setLoading,
    },
})

export const { setPeriodOfReport, getUniqueSaturatedOnionCodes, clearReport } =
    saturationPeriodReportSlice.actions

export default saturationPeriodReportSlice.reducer
