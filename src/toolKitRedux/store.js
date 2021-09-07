import { combineReducers, configureStore } from '@reduxjs/toolkit'
import toolkitSlice from './toolkitSlice'
import saturationPeriodReportSlice from './saturationPeriodReportSlice'

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    saturationPeriodReport: saturationPeriodReportSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})
