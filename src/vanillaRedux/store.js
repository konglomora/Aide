import {createStore, combineReducers, applyMiddleware} from "redux";
import {mainReducer} from "./reducers/mainReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers(
    {
        main: mainReducer,
    })

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))