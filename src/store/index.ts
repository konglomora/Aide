import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit'
import storageSession from 'redux-persist/lib/storage/session'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import saturationSelectedOnionsSlice from './slices/saturationSelectedOnionsSlice'
import saturationPeriodReportSlice from './slices/saturationPeriodReportSlice'
import weatherActionPlanSlice from './slices/weatherActionPlanSlice'
import userSlice from './slices/userSlice'
import scheduleSlice from './slices/scheduleSlice'

const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: [''],
}

const authPersistConfig = { key: 'user', storage: storageSession }

const rootReducer = combineReducers({
    user: persistReducer(authPersistConfig, userSlice),
    saturationPeriodReport: saturationPeriodReportSlice,
    selectedOnionsReport: saturationSelectedOnionsSlice,
    weatherActionPlan: weatherActionPlanSlice,
    schedule: scheduleSlice,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
