import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { aideApiAxios } from '../axios/axios'

export const axiosGetSaturatedOnionsByPeriod = createAsyncThunk(
    'saturation-period/axiosGetSaturatedOnionsByPeriod',
    async function ({ periodStart, periodEnd }, { rejectWithValue }) {
        try {
            const saturatedOnions = await aideApiAxios.get(
                `/data/filter/?sat=low&start=${periodStart}&end=${periodEnd}&today=yes`
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
            if (onionReportObject.difference.charAt(19) === '+') {
                onionReportObject['slotFilledStr'] =
                    'Заранее расширяли слоты - постепенно заполнялись.'
            } else if (onionReportObject.difference.charAt(19) === '-') {
                onionReportObject['slotFilledStr'] =
                    'Заранее расширяли слоты - слабо заполнялись.'
            }
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

        const saturatedUniqueSortedOnionCodesArray =
            getState().saturationPeriodReport
                .saturatedUniqueSortedOnionCodesArray
        saturatedUniqueSortedOnionCodesArray.forEach((onionCode) => {
            return dispatch(
                axiosGetSaturatedOnionAnalyseObject({
                    onionCode,
                    periodStart,
                    periodEnd,
                })
            )
        })
        console.log(getState())
        const reportArray = [...getState().saturationPeriodReport.kyiv_report]
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
        periodStart: '16',
        periodEnd: '18',
        kyiv_report: [],
        mio_report: [],
        small_report: [],
        saturatedOnionsObjectsArray: [],
        saturatedUniqueSortedOnionCodesArray: [],
        periodReport: [],
    },
    reducers: {
        setPeriodOfReport(state, action) {
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
            const uniqueOnionCodes = allSaturatedOnionCodes.filter(
                (onionCode, index) =>
                    allSaturatedOnionCodes.indexOf(onionCode) === index
            )
            state.saturatedUniqueSortedOnionCodesArray = uniqueOnionCodes.sort()
            console.log(state.saturatedUniqueSortedOnionCodesArray)
            state.status = 'loading'
        },
        addOnionObjToPeriodReport(state, action) {
            state.periodReport.push(action.payload)
        },
        clearReport(state) {
            state.kyiv_report = state.mio_report = state.small_report = []
        },
    },
    extraReducers: {
        [axiosGetSaturatedOnionsByPeriod.fulfilled]: (state, action) => {
            state.saturatedOnionsObjectsArray = action.payload
        },
        [axiosGetSaturatedOnionsByPeriod.rejected]: setError,
        [axiosGetSaturatedOnionAnalyseObject.fulfilled]: (state, action) => {
            // Сортируем обьекты репортов по соответствующих массивах
            const isKyiv =
                action.payload.city === 'KIE' || action.payload.city === 'KYI'
            const isMio =
                action.payload.city === 'DNP' ||
                action.payload.city === 'KHA' ||
                action.payload.city === 'LVI' ||
                action.payload.city === 'ODS'
            if (isKyiv) {
                state.kyiv_report.push(action.payload)
            } else if (isMio) {
                state.mio_report.push(action.payload)
            } else {
                state.small_report.push(action.payload)
            }
        },
        [axiosGetSaturatedOnionAnalyseObject.pending]: setLoading,
        [axiosGetSaturatedOnionAnalyseObject.rejected]: setError,
        [getSaturationReport.fulfilled]: (state, action) => {
            state.periodReport = [
                ...state.kyiv_report,
                ...state.mio_report,
                ...state.small_report,
            ]
            state.status = 'resolved'
        },
        [getSaturationReport.pending]: setLoading,
    },
})

export const { setPeriodOfReport, getUniqueSaturatedOnionCodes, clearReport } =
    saturationPeriodReportSlice.actions

export default saturationPeriodReportSlice.reducer
