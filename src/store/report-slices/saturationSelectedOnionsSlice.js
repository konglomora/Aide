import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { aideApiAxios } from '../../axios/axios'
import {
    kyivCodes,
    mioCodes,
    smallCodes,
} from '../../components/Pages/Reports/OnionCodes'
import { setError, setLoading } from '../setStatusFunctions'

export const axiosGetSaturatedOnionAnalyseObject = createAsyncThunk(
    'selected-onions/axiosGetSaturatedOnionObject',
    async function (
        { onionCode, periodStart, periodEnd },
        { rejectWithValue }
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
    'selected-onions/getSaturationReport',
    async function (
        { onionCodesArray, periodStart, periodEnd },
        { dispatch, getState }
    ) {
        await dispatch(clearReport())
        await dispatch(getUniqueSaturatedOnionCodes(onionCodesArray))
        const saturatedUniqueSortedOnionCodesArray =
            getState().selectedOnionsReport.saturatedUniqueSortedOnionCodesArray
        const getAllAnaluzeObjectsAction = await Promise.all(
            saturatedUniqueSortedOnionCodesArray.map(async (onionCode) => {
                await dispatch(
                    axiosGetSaturatedOnionAnalyseObject({
                        onionCode,
                        periodStart,
                        periodEnd,
                    })
                )
            })
        )
    }
)

const selectedOnionsReportSlice = createSlice({
    name: 'selected-onions',
    initialState: {
        status: null,
        error: null,
        periodStart: '16',
        periodEnd: '18',
        areaCodes: [[...kyivCodes], [...mioCodes], [...smallCodes]],
        selectedOnionCodes: [],
        kyiv_report: [],
        mio_report: [],
        small_report: [],
        selectedOnionsByUser: [],
        saturatedUniqueSortedOnionCodesArray: [],
        periodReport: [],
    },
    reducers: {
        setPeriodOfReport(state, action) {
            state.periodStart = action.payload.periodStart
            state.periodEnd = action.payload.periodEnd
        },
        // Получаем уникальные имена онионов в которых была сатурация за выбраный период
        getUniqueSaturatedOnionCodes(state, action) {
            const { payload } = action
            const uniqueOnionCodes = payload.filter(
                (onionCode, index) => payload.indexOf(onionCode) === index
            )
            state.saturatedUniqueSortedOnionCodesArray = uniqueOnionCodes.sort()
        },
        addOnionObjToPeriodReport(state, action) {
            state.periodReport.push(action.payload)
        },
        selectOnion(state, action) {
            // Удаляем из списка онионов выбранный онион и добавляем в массив который потом передаем для получения репорта
            state.areaCodes = state.areaCodes.map((codesArray) =>
                codesArray.filter((code) => code !== action.payload)
            )
            state.selectedOnionCodes.push(action.payload)
        },
        deselectOnion(state, action) {
            const onionCode = action.payload
            state.selectedOnionCodes = state.selectedOnionCodes.filter(
                (code) => code !== onionCode
            )

            if (kyivCodes.includes(onionCode)) {
                const indexOfCodeAtInitialArray = kyivCodes.indexOf(onionCode)
                state.areaCodes[0].splice(
                    indexOfCodeAtInitialArray,
                    0,
                    onionCode
                )
            } else if (mioCodes.includes(onionCode)) {
                const indexOfCodeAtInitialArray = mioCodes.indexOf(onionCode)
                state.areaCodes[1].splice(
                    indexOfCodeAtInitialArray,
                    0,
                    onionCode
                )
            } else {
                const indexOfCodeAtInitialArray = smallCodes.indexOf(onionCode)
                state.areaCodes[2].splice(
                    indexOfCodeAtInitialArray,
                    0,
                    onionCode
                )
            }
        },
        clearReport(state) {
            state.kyiv_report = state.mio_report = state.small_report = []
        },
    },
    extraReducers: {
        [axiosGetSaturatedOnionAnalyseObject.fulfilled]: (state, action) => {
            // Сортируем обьекты репортов по соответствующих массивах
            const { payload } = action
            const isKyiv = payload.city === 'KIE' || payload.city === 'KYI'
            const isMio =
                payload.city === 'DNP' ||
                payload.city === 'KHA' ||
                payload.city === 'LVI' ||
                payload.city === 'ODS'
            if (isKyiv) {
                state.kyiv_report.push(payload)
            } else if (isMio) {
                state.mio_report.push(payload)
            } else {
                state.small_report.push(payload)
            }
        },
        [axiosGetSaturatedOnionAnalyseObject.pending]: setLoading,
        [axiosGetSaturatedOnionAnalyseObject.rejected]: setError,
        [getSaturationReport.fulfilled]: (state) => {
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

export const {
    setPeriodOfReport,
    getUniqueSaturatedOnionCodes,
    selectOnion,
    deselectOnion,
    clearReport,
} = selectedOnionsReportSlice.actions

export default selectedOnionsReportSlice.reducer
