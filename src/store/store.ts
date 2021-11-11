import { combineReducers, configureStore } from '@reduxjs/toolkit'
import saturationPeriodReportSlice from './report-slices/saturationPeriodReportSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import saturationSelectedOnionsSlice from './report-slices/saturationSelectedOnionsSlice'
import weatherActionPlanSlice from './report-slices/weatherActionPlanSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [''],
}

const rootReducer = combineReducers({
    saturationPeriodReport: saturationPeriodReportSlice,
    selectedOnionsReport: saturationSelectedOnionsSlice,
    weatherActionPlan: weatherActionPlanSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default { store, persistor }
