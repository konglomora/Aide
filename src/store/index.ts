import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit'
import storageSession from 'redux-persist/lib/storage/session'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import saturationSelectedOnionsSlice from './slices/saturation/saturationSelectedOnionsSlice'
import saturationPeriodReportSlice from './slices/saturation/saturationPeriodReportSlice'
import weatherActionPlanSlice from './slices/weather/weatherActionPlanSlice'
import userSlice from './slices/user/userSlice'
import scheduleSlice from './slices/onions/schedule/scheduleSlice'
import onionsSlotsSlice from './slices/onions/slots/onionsSlotsSlice'
import themeSlice from './slices/theme/themeSlice'

const authPersistConfig = { key: 'user', storage: storageSession }
const themePersistConfig = { key: 'theme', storage: storage }

const rootReducer = combineReducers({
    user: persistReducer(authPersistConfig, userSlice),
    theme: persistReducer(themePersistConfig, themeSlice),
    saturationPeriodReport: saturationPeriodReportSlice,
    selectedOnionsReport: saturationSelectedOnionsSlice,
    weatherActionPlan: weatherActionPlanSlice,
    schedule: scheduleSlice,
    onionsSlots: onionsSlotsSlice,
})

// Disabling logs
// if (process.env.NODE_ENV === 'development') console.log = () => {}

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
