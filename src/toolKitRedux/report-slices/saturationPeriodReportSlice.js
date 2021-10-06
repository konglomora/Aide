import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { aideApiAxios } from '../../axios/axios'
import {
    hasSaturationButBetterThanD7,
    lessCouriers,
    lessCouriersAndMoreOrders,
    moreOrders,
} from '../../components/Reports/saturationReasons'
import { setError, setLoading } from '../setStatusFunctions'

export const axiosGetSaturatedOnionsByPeriod = createAsyncThunk(
    'saturation-period/axiosGetSaturatedOnionsByPeriod',
    async function ({ periodStart, periodEnd }, { rejectWithValue }) {
        try {
            const saturatedOnions = await aideApiAxios.get(
                `/data/filter/?sat=low&start=${periodStart}&end=${periodEnd}&today=yes`
            )
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

            onionReportObject['forAutoReport'] = true

            if (onionReportObject.difference.charAt(19) === '+') {
                onionReportObject['slotFilledStr'] =
                    'Заранее расширяли слоты - постепенно заполнялись.'
            } else if (onionReportObject.difference.charAt(19) === '-') {
                onionReportObject['slotFilledStr'] =
                    'Заранее расширяли слоты - слабо заполнялись.'
            }
            // console.log(onionReportObject.reason_saturation)
            if (
                onionReportObject.reason_saturation ===
                'Причина сатурации - уменьшилось количество активных курьеров в разрезе с прошлой неделей. '
            ) {
                onionReportObject['saturationReason'] = lessCouriers
            } else if (
                onionReportObject.reason_saturation ===
                'Причина сатурации -  прирост количества заказов в разрезе с прошлой неделей.'
            ) {
                onionReportObject['saturationReason'] = moreOrders
            } else if (
                onionReportObject.reason_saturation ===
                'Причина сатурации - прирост заказов и уменьшилось количество активных курьеров в сравнении с прошлой неделей. '
            ) {
                onionReportObject['saturationReason'] =
                    lessCouriersAndMoreOrders
            } else {
                onionReportObject['saturationReason'] =
                    hasSaturationButBetterThanD7
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
        const getAllAnalyseObjectsAction = await Promise.all(
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

        const saturationReport = [
            ...getState().saturationPeriodReport.kyiv_report,
            ...getState().saturationPeriodReport.mio_report,
            ...getState().saturationPeriodReport.small_report,
        ]
        await dispatch(
            sortReportBySaturationReasons({
                saturationReport,
            })
        )
    }
)

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
        sortedReportBySaturationReason: {
            lessCouriersSaturatedOnions: [],
            moreOrdersSaturatedOnions: [],
            lessCouriersAndMoreOrdersSaturatedOnions: [],
            hasSaturationButBetterThanD7: [],
        },
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
            state.status = 'loading'
        },
        addOnionObjToPeriodReport(state, action) {
            state.periodReport.push(action.payload)
        },
        sortReportBySaturationReasons(state, action) {
            const { saturationReport } = action.payload

            saturationReport.map((onion) => {
                if (onion.saturationReason === lessCouriers) {
                    state.sortedReportBySaturationReason.lessCouriersSaturatedOnions.push(
                        onion
                    )
                } else if (onion.saturationReason === moreOrders) {
                    state.sortedReportBySaturationReason.moreOrdersSaturatedOnions.push(
                        onion
                    )
                } else if (
                    onion.saturationReason === lessCouriersAndMoreOrders
                ) {
                    state.sortedReportBySaturationReason.lessCouriersAndMoreOrdersSaturatedOnions.push(
                        onion
                    )
                } else if (
                    onion.saturationReason === hasSaturationButBetterThanD7
                ) {
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
        [getSaturationReport.fulfilled]: (state) => {
            state.status = 'resolved'
        },
        [getSaturationReport.pending]: setLoading,
    },
})

export const {
    setPeriodOfReport,
    getUniqueSaturatedOnionCodes,
    sortReportBySaturationReasons,
    clearReport,
} = saturationPeriodReportSlice.actions

export default saturationPeriodReportSlice.reducer
