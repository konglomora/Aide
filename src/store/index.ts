import { combineReducers, configureStore } from '@reduxjs/toolkit'
import saturationPeriodReportSlice from './slices/saturationPeriodReportSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import saturationSelectedOnionsSlice from './slices/saturationSelectedOnionsSlice'
import weatherActionPlanSlice from './slices/weatherActionPlanSlice'
import userSlice from './slices/userSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [''],
}

const rootReducer = combineReducers({
    user: userSlice,
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
