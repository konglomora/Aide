import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </Router>,
    document.getElementById('root')
)
