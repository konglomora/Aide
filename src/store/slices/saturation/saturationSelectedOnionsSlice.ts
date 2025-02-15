import { RootState } from '../../index'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { OnionCodes } from '../../../helpers/onionCodes'
import { codes } from '../../helpers/Codes'
import {
    ISaturatedOnionAnalysis,
    MyKnownError,
    PropsAxiosGetSaturatedOnionAnalyseObject,
    PropsGetSaturationReport,
} from './types'

import { saturationService } from 'services'
import { StateStatus, TStateStatus } from 'store/helpers/Status'
import { aideApiAxios } from 'api'

export const axiosGetSaturatedOnionAnalyseObject = createAsyncThunk<
    ISaturatedOnionAnalysis,
    PropsAxiosGetSaturatedOnionAnalyseObject,
    {
        rejectValue: MyKnownError
    }
>(
    'selected-onions/axiosGetSaturatedOnionObject',
    async function (
        { onionCode, periodStart, periodEnd },
        { rejectWithValue }
    ) {
        try {
            const saturatedOnionResponse =
                await aideApiAxios.get<ISaturatedOnionAnalysis>(
                    `/state/data/analysis/${onionCode}/${periodStart}/${periodEnd}/`
                )
            if (saturatedOnionResponse.statusText !== 'OK') {
                throw new Error(saturatedOnionResponse.statusText)
            }
            const { compared_couriers, compared_orders } =
                saturatedOnionResponse.data

            const slotFilledStr =
                saturationService.getExpansionResult(compared_couriers)

            const diffStr = saturationService.getIndicatorsDiff(
                compared_couriers,
                compared_orders
            )
            const analysis: ISaturatedOnionAnalysis = {
                ...saturatedOnionResponse.data,
                forAutoReport: true,
                slotFilledStr: slotFilledStr,
                diffStr: diffStr,
            }
            return analysis
        } catch (error) {
            return rejectWithValue(error as MyKnownError)
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
        const state = getState() as RootState
        const { saturatedUniqueSortedOnionCodesArray } =
            state.selectedOnionsReport
        await Promise.all(
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
        console.log(
            '[Selected onion saturation slice] getSaturationReport ended'
        )
    }
)

interface SaturationSelectedOnionState {
    status: TStateStatus
    error: null | undefined | string | MyKnownError
    periodStart: string
    periodEnd: string
    areaCodes: string[][]
    selectedOnionCodes: string[]
    kyiv_report: ISaturatedOnionAnalysis[]
    mio_report: ISaturatedOnionAnalysis[]
    small_report: ISaturatedOnionAnalysis[]
    selectedOnionsByUser: string[]
    saturatedUniqueSortedOnionCodesArray: string[]
    periodReport: ISaturatedOnionAnalysis[]
}

const initialState: SaturationSelectedOnionState = {
    status: null,
    error: null,
    periodStart: '12',
    periodEnd: '13',
    areaCodes: [
        [...OnionCodes.kyiv],
        [...OnionCodes.mio],
        [...OnionCodes.small],
        [...OnionCodes.outside],
    ],
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

            if (OnionCodes.kyiv.includes(onionCode)) {
                const indexOfCodeAtInitialArray =
                    OnionCodes.kyiv.indexOf(onionCode)
                state.areaCodes[0].splice(
                    indexOfCodeAtInitialArray,
                    0,
                    onionCode
                )
            } else if (OnionCodes.mio.includes(onionCode)) {
                const indexOfCodeAtInitialArray =
                    OnionCodes.mio.indexOf(onionCode)
                state.areaCodes[1].splice(
                    indexOfCodeAtInitialArray,
                    0,
                    onionCode
                )
            } else {
                const indexOfCodeAtInitialArray =
                    OnionCodes.small.indexOf(onionCode)
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
        builder.addCase(
            axiosGetSaturatedOnionAnalyseObject.pending,
            (state) => {
                state.status = StateStatus.loading
                state.error = null
            }
        )
        builder.addCase(
            axiosGetSaturatedOnionAnalyseObject.rejected,
            (state, action) => {
                state.status = StateStatus.error
                state.error = action.payload
            }
        )
        builder.addCase(getSaturationReport.fulfilled, (state) => {
            state.periodReport = [
                ...state.kyiv_report,
                ...state.mio_report,
                ...state.small_report,
            ]
            state.status = StateStatus.success
        })
        builder.addCase(getSaturationReport.pending, (state) => {
            state.status = StateStatus.loading
            state.error = null
        })
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
