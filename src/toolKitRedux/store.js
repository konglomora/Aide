import { combineReducers, configureStore } from '@reduxjs/toolkit'
import toolkitSlice from './toolkitSlice'
import saturationPeriodReportSlice from './report-slices/saturationPeriodReportSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import saturationSelectedOnionsSlice from './report-slices/saturationSelectedOnionsSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    saturationPeriodReport: saturationPeriodReportSlice,
    selectedOnionsReport: saturationSelectedOnionsSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)

export default { store, persistor }
