import { combineReducers, configureStore } from '@reduxjs/toolkit'
import toolKitReducer from './toolKitReducer'

const rootReducer = combineReducers({
    toolkit: toolKitReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})
