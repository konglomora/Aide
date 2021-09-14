import { combineReducers, configureStore } from '@reduxjs/toolkit'
import toolkitSlice from './toolkitSlice'
import saturationPeriodReportSlice from './saturationPeriodReportSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    saturationPeriodReport: saturationPeriodReportSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)

export default { store, persistor }
