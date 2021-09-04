import {createStore, combineReducers, applyMiddleware} from "redux";
import {cashReducer} from "./reducers/cashReducer";
import {customerReducer} from "./reducers/customerReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers(

    {
        cashReducer,
        customerReducer
    })

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))