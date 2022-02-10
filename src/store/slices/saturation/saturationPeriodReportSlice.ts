import { onionService } from 'services'
import { RootState } from '../../index'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { aideApiAxios } from 'api'
import { SaturationReasons } from '../../../helpers/saturationReasons'
import {
    PropsAxiosGetSaturatedOnionAnalyseObject,
    PropsGetSaturationReport,
} from './types'
import { AxiosResponse } from 'axios'
import {
    ISaturatedOnionAnalysis,
    ISaturatedOnionBySlot,
    MyKnownError,
} from 'store/slices/saturation/types'
import { saturationService } from 'services'
import { StateStatus, TStateStatus } from 'store/helpers/Status'

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
                    'state/data/filters/',
                    {
                        params: {
                            sat: true,
                            slot_start: periodStart,
                            slot_finish: periodEnd,
                            today: true,
                        },
                    }
                    // `state/data/filters/?sat=true&slot_start=${periodStart}&slot_finish=${periodEnd}&today=true`
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

            const { compared_couriers, compared_orders } =
                saturatedOnionResponse.data

            const slotFilledStr =
                saturationService.getExpansionResult(compared_couriers)

            const diffStr = saturationService.getIndicatorsDiff(
                compared_orders,
                compared_couriers
            )

            const analysis: ISaturatedOnionAnalysis = {
                ...saturatedOnionResponse.data,
                forAutoReport: true,
                slotFilledStr: slotFilledStr,
                diffStr: diffStr,
            }
            return analysis
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
        const { saturatedOnionCodes } = state.saturationPeriodReport
        await Promise.all(
            saturatedOnionCodes.map(async (onionCode) => {
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

        dispatch(
            checkReportEmptiness(
                saturationService.isReportEmpty(saturationReport)
            )
        )

        await dispatch(
            sortReportBySaturationReasons({
                saturationReport,
            })
        )
    }
)

interface ISaturationSelectedOnionState {
    status: TStateStatus
    error: null | undefined | string | MyKnownError
    periodStart: string
    periodEnd: string
    kyiv_report: ISaturatedOnionAnalysis[]
    mio_report: ISaturatedOnionAnalysis[]
    small_report: ISaturatedOnionAnalysis[]
    sortedReportBySaturationReason: {
        lessCouriers: ISaturatedOnionAnalysis[]
        moreOrders: ISaturatedOnionAnalysis[]
        lessCouriersAndMoreOrders: ISaturatedOnionAnalysis[]
        betterThanD7: ISaturatedOnionAnalysis[]
        outside: ISaturatedOnionAnalysis[]
    }
    saturatedOnionsObjectsArray: ISaturatedOnionBySlot[]
    saturatedOnionCodes: string[]
    reportIsEmpty: boolean | null
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
        lessCouriers: [],
        moreOrders: [],
        lessCouriersAndMoreOrders: [],
        betterThanD7: [],
        outside: [],
    },
    saturatedOnionsObjectsArray: [],
    saturatedOnionCodes: [],
    reportIsEmpty: null,
}

const saturationPeriodReportSlice = createSlice({
    name: 'saturation-period',
    initialState,
    reducers: {
        setPeriodOfReport(state, action) {
            state.periodStart = action.payload.periodStart
            state.periodEnd = action.payload.periodEnd
        },

        getUniqueSaturatedOnionCodes(state) {
            state.saturatedOnionCodes = saturationService.getUniqueOnionCodes(
                state.saturatedOnionsObjectsArray
            )
            state.status = StateStatus.loading
        },
        sortReportBySaturationReasons(state, action) {
            const { saturationReport } = action.payload

            saturationReport.forEach((onion: ISaturatedOnionAnalysis) => {
                if (onion.area === '#Outside') {
                    state.sortedReportBySaturationReason.outside.push(onion)
                } else if (
                    onion.reason_saturation === SaturationReasons.lessCouriers
                ) {
                    state.sortedReportBySaturationReason.lessCouriers.push(
                        onion
                    )
                } else if (
                    onion.reason_saturation === SaturationReasons.moreOrders
                ) {
                    state.sortedReportBySaturationReason.moreOrders.push(onion)
                } else if (
                    onion.reason_saturation ===
                    SaturationReasons.lessCouriersAndMoreOrders
                ) {
                    state.sortedReportBySaturationReason.lessCouriersAndMoreOrders.push(
                        onion
                    )
                } else {
                    state.sortedReportBySaturationReason.betterThanD7.push(
                        onion
                    )
                }
            })
        },
        clearReport(state) {
            state.kyiv_report = state.mio_report = state.small_report = []
            state.sortedReportBySaturationReason.lessCouriers =
                state.sortedReportBySaturationReason.moreOrders =
                state.sortedReportBySaturationReason.lessCouriersAndMoreOrders =
                state.sortedReportBySaturationReason.betterThanD7 =
                    []
        },
        checkReportEmptiness(state, action) {
            state.reportIsEmpty = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            axiosGetSaturatedOnionsByPeriod.fulfilled,
            (state, action) => {
                state.saturatedOnionsObjectsArray = action.payload
            }
        )
        builder.addCase(
            axiosGetSaturatedOnionsByPeriod.rejected,
            (state, action) => {
                state.status = StateStatus.error
                state.error = action.payload
            }
        )
        builder.addCase(
            axiosGetSaturatedOnionAnalyseObject.fulfilled,
            (state, action) => {
                if (onionService.onionIsKyiv(action.payload.city)) {
                    state.kyiv_report.push(action.payload)
                } else if (onionService.onionIsMio(action.payload.city)) {
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
        builder.addCase(getSaturationReport.pending, (state) => {
            state.status = StateStatus.loading
            state.error = null
        })
        builder.addCase(getSaturationReport.fulfilled, (state) => {
            state.status = StateStatus.success
        })
    },
})

export const {
    setPeriodOfReport,
    getUniqueSaturatedOnionCodes,
    sortReportBySaturationReasons,
    clearReport,
    checkReportEmptiness,
} = saturationPeriodReportSlice.actions

export default saturationPeriodReportSlice.reducer
