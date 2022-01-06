import { RootState } from '../index'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { aideApiAxios } from '../../axios/axios'
import { SaturationReasons } from '../../helpers/saturationReasons'
import { codes } from '../helpers/Codes'
import {
    PropsAxiosGetSaturatedOnionAnalyseObject,
    PropsGetSaturationReport,
} from './sliceTypes'
import { AxiosResponse } from 'axios'
import { getExpansionResult } from 'store/helpers/getExpansionResult'
import {
    ISaturatedOnionAnalysis,
    ISaturatedOnionBySlot,
    MyKnownError,
} from 'store/helpers/reports/types'

export const axiosGetSaturatedOnionsByPeriod = createAsyncThunk<
    ISaturatedOnionBySlot[],
    Omit<PropsGetSaturationReport, 'onionCodesArray'>,
    {
        rejectValue: MyKnownError
    }
>(
    'saturation-period/axiosGetSaturatedOnionsByPeriod',
    async function ({ periodStart, periodEnd }, { rejectWithValue }) {
        try {
            const saturatedOnions: AxiosResponse<ISaturatedOnionBySlot[]> =
                await aideApiAxios.get(
                    `state/data/filters/?sat=true&slot_start=${periodStart}&slot_finish=${periodEnd}&today=true`
                )
            if (saturatedOnions.statusText !== 'OK') {
                throw new Error(saturatedOnions.statusText)
            }
            return saturatedOnions.data as ISaturatedOnionBySlot[]
        } catch (error) {
            return rejectWithValue(error as MyKnownError)
        }
    }
)

export const axiosGetSaturatedOnionAnalyseObject = createAsyncThunk<
    ISaturatedOnionAnalysis,
    PropsAxiosGetSaturatedOnionAnalyseObject,
    {
        rejectValue: MyKnownError
    }
>(
    'saturation-period/axiosGetSaturatedOnionObject',
    async function (
        { onionCode, periodStart, periodEnd },
        { rejectWithValue }
    ) {
        try {
            const saturatedOnionResponse: AxiosResponse<ISaturatedOnionAnalysis> =
                await aideApiAxios.get(
                    `/state/data/analysis/${onionCode}/${periodStart}/${periodEnd}/`
                )

            if (saturatedOnionResponse.statusText !== 'OK') {
                throw new Error(saturatedOnionResponse.statusText)
            }
            console.log('saturatedOnionData.data', saturatedOnionResponse.data)

            saturatedOnionResponse.data.forAutoReport = true
            saturatedOnionResponse.data.slotFilledStr = getExpansionResult(
                saturatedOnionResponse.data.difference
            )

            return saturatedOnionResponse.data
        } catch (error) {
            console.log('[saturationPeriodReportSlice] error', error)
            return rejectWithValue(error as MyKnownError)
        }
    }
)

export const getSaturationReport = createAsyncThunk(
    'saturation-period/getSaturationReport',
    async function (
        {
            periodStart,
            periodEnd,
        }: Omit<PropsGetSaturationReport, 'onionCodesArray'>,
        { dispatch, getState }
    ) {
        await dispatch(clearReport())
        await dispatch(
            axiosGetSaturatedOnionsByPeriod({ periodStart, periodEnd })
        )
        await dispatch(getUniqueSaturatedOnionCodes())
        const state = getState() as RootState
        const { saturatedUniqueSortedOnionCodesArray } =
            state.saturationPeriodReport
        await Promise.all(
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
        const stateAfterGettingAnalyseObjects = getState() as RootState
        const { kyiv_report, mio_report, small_report } =
            stateAfterGettingAnalyseObjects.saturationPeriodReport
        const saturationReport = [
            ...kyiv_report,
            ...mio_report,
            ...small_report,
        ]
        await dispatch(
            sortReportBySaturationReasons({
                saturationReport,
            })
        )
    }
)

interface ISaturationSelectedOnionState {
    status: null | 'resolved' | 'loading' | 'error'
    error: null | undefined | string | MyKnownError
    periodStart: string
    periodEnd: string
    kyiv_report: ISaturatedOnionAnalysis[]
    mio_report: ISaturatedOnionAnalysis[]
    small_report: ISaturatedOnionAnalysis[]
    sortedReportBySaturationReason: {
        lessCouriersSaturatedOnions: ISaturatedOnionAnalysis[]
        moreOrdersSaturatedOnions: ISaturatedOnionAnalysis[]
        lessCouriersAndMoreOrdersSaturatedOnions: ISaturatedOnionAnalysis[]
        hasSaturationButBetterThanD7: ISaturatedOnionAnalysis[]
    }
    saturatedOnionsObjectsArray: ISaturatedOnionBySlot[]
    saturatedUniqueSortedOnionCodesArray: string[]
}

const initialState: ISaturationSelectedOnionState = {
    status: null,
    error: null,
    periodStart: '12',
    periodEnd: '13',
    kyiv_report: [],
    mio_report: [],
    small_report: [],
    sortedReportBySaturationReason: {
        lessCouriersSaturatedOnions: [],
        moreOrdersSaturatedOnions: [],
        lessCouriersAndMoreOrdersSaturatedOnions: [],
        hasSaturationButBetterThanD7: [],
    },
    saturatedOnionsObjectsArray: [],
    saturatedUniqueSortedOnionCodesArray: [],
}

const saturationPeriodReportSlice = createSlice({
    name: 'saturation-period',
    initialState,
    reducers: {
        setPeriodOfReport(state, action) {
            state.periodStart = action.payload.periodStart
            state.periodEnd = action.payload.periodEnd
        },

        // ? Getting unique onion codes that had saturation at selected period
        getUniqueSaturatedOnionCodes(state) {
            const allSaturatedOnionCodes =
                state.saturatedOnionsObjectsArray.reduce(
                    (accum: string[], onion: ISaturatedOnionBySlot) => {
                        if (!accum.some((city) => city === onion.city)) {
                            accum.push(onion.city)
                        }
                        return accum
                    },
                    []
                )
            const uniqueOnionCodes = allSaturatedOnionCodes.filter(
                (city, index) => allSaturatedOnionCodes.indexOf(city) === index
            )
            state.saturatedUniqueSortedOnionCodesArray = uniqueOnionCodes.sort()
            state.status = 'loading'
        },
        sortReportBySaturationReasons(state, action) {
            const { saturationReport } = action.payload

            saturationReport.forEach((onion: ISaturatedOnionAnalysis) => {
                if (
                    onion.reason_saturation === SaturationReasons.lessCouriers
                ) {
                    state.sortedReportBySaturationReason.lessCouriersSaturatedOnions.push(
                        onion
                    )
                } else if (
                    onion.reason_saturation === SaturationReasons.moreOrders
                ) {
                    state.sortedReportBySaturationReason.moreOrdersSaturatedOnions.push(
                        onion
                    )
                } else if (
                    onion.reason_saturation ===
                    SaturationReasons.lessCouriersAndMoreOrders
                ) {
                    state.sortedReportBySaturationReason.lessCouriersAndMoreOrdersSaturatedOnions.push(
                        onion
                    )
                } else {
                    state.sortedReportBySaturationReason.hasSaturationButBetterThanD7.push(
                        onion
                    )
                }
            })
        },
        clearReport(state) {
            state.kyiv_report = state.mio_report = state.small_report = []
            state.sortedReportBySaturationReason.lessCouriersSaturatedOnions =
                state.sortedReportBySaturationReason.moreOrdersSaturatedOnions =
                state.sortedReportBySaturationReason.lessCouriersAndMoreOrdersSaturatedOnions =
                state.sortedReportBySaturationReason.hasSaturationButBetterThanD7 =
                    []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            axiosGetSaturatedOnionsByPeriod.fulfilled,
            (state, action) => {
                // Saving returned data from response when axiosGetSaturatedOnionsByPeriod done
                state.saturatedOnionsObjectsArray = action.payload
            }
        )
        builder.addCase(
            axiosGetSaturatedOnionsByPeriod.rejected,
            (state, action) => {
                state.status = 'error'
                state.error = action.payload
            }
        )
        builder.addCase(
            axiosGetSaturatedOnionAnalyseObject.fulfilled,
            (state, action) => {
                // Сортируем обьекты репортов по соответствующих массивах
                const isKyiv = codes.kyiv.includes(action.payload.city)
                const isMio = codes.mio.includes(action.payload.city)

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
                state.status = 'loading'
                state.error = null
            }
        )
        builder.addCase(
            axiosGetSaturatedOnionAnalyseObject.rejected,
            (state, action) => {
                state.status = 'error'
                state.error = action.payload
            }
        )
        builder.addCase(getSaturationReport.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(getSaturationReport.fulfilled, (state) => {
            state.status = 'resolved'
        })
    },
})

export const {
    setPeriodOfReport,
    getUniqueSaturatedOnionCodes,
    sortReportBySaturationReasons,
    clearReport,
} = saturationPeriodReportSlice.actions

export default saturationPeriodReportSlice.reducer
