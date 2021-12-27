import { RootState } from './../index'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { aideApiAxios } from '../../axios/axios'
import {
    kyivCodes,
    mioCodes,
    smallCodes,
} from '../../components/Pages/Reports/OnionCodes'
import { setError, setLoading } from '../helpers/setStatusFunctions'
import { codes } from '../helpers/Codes'

interface PropsAxiosGetSaturatedOnionAnalyseObject {
    onionCode: string
    periodStart: string
    periodEnd: string
}

interface PropsGetSaturationReport {
    onionCodesArray: string[]
    periodStart: string
    periodEnd: string
}

export const axiosGetSaturatedOnionAnalyseObject = createAsyncThunk(
    'selected-onions/axiosGetSaturatedOnionObject',
    async function (
        {
            onionCode,
            periodStart,
            periodEnd,
        }: PropsAxiosGetSaturatedOnionAnalyseObject,
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
            return rejectWithValue(error)
        }
    }
)

export const getSaturationReport = createAsyncThunk(
    'selected-onions/getSaturationReport',
    async function (
        { onionCodesArray, periodStart, periodEnd }: PropsGetSaturationReport,
        { dispatch, getState }
    ) {
        await dispatch(clearReport())
        await dispatch(getUniqueSaturatedOnionCodes(onionCodesArray))
        const state = getState() as SaturationSelectedOnionState

        const { saturatedUniqueSortedOnionCodesArray } = state
        const getAllAnaluzeObjectsAction = await Promise.all(
            saturatedUniqueSortedOnionCodesArray.map(
                async (onionCode: string) => {
                    await dispatch(
                        axiosGetSaturatedOnionAnalyseObject({
                            onionCode,
                            periodStart,
                            periodEnd,
                        })
                    )
                }
            )
        )
    }
)

interface SaturationSelectedOnionState {
    status: null | 'resolved' | 'loading' | 'error'
    error: null | string
    periodStart: string
    periodEnd: string
    areaCodes: string[][]
    selectedOnionCodes: string[]
    kyiv_report: Object[]
    mio_report: Object[]
    small_report: Object[]
    selectedOnionsByUser: string[]
    saturatedUniqueSortedOnionCodesArray: string[]
    periodReport: Object[]
}

const initialState: SaturationSelectedOnionState = {
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
}

const selectedOnionsReportSlice = createSlice({
    name: 'selected-onions',
    initialState,
    reducers: {
        setPeriodOfReport(state, action) {
            state.periodStart = action.payload.periodStart
            state.periodEnd = action.payload.periodEnd
        },

        getUniqueSaturatedOnionCodes(state, action) {
            const { payload } = action
            const uniqueOnionCodes = payload.filter(
                (onionCode: string, index: number) =>
                    payload.indexOf(onionCode) === index
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
    extraReducers: (builder) => {
        builder.addCase(
            axiosGetSaturatedOnionAnalyseObject.fulfilled,
            (state, action) => {
                // Sorting report objects by corresponding arrays
                const { city } = action.payload
                const isKyiv = codes.kyiv.includes(city)
                const isMio = codes.mio.includes(city)
                if (isKyiv) {
                    state.kyiv_report.push(action.payload)
                } else if (isMio) {
                    state.mio_report.push(action.payload)
                } else {
                    state.small_report.push(action.payload)
                }
            }
        )
        builder.addCase(axiosGetSaturatedOnionAnalyseObject.pending, setLoading)
        builder.addCase(axiosGetSaturatedOnionAnalyseObject.rejected, setError)
        builder.addCase(getSaturationReport.fulfilled, (state) => {
            state.periodReport = [
                ...state.kyiv_report,
                ...state.mio_report,
                ...state.small_report,
            ]
            state.status = 'resolved'
        })
        builder.addCase(getSaturationReport.pending, setLoading)
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
