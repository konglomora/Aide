import { createReducer, createAction } from '@reduxjs/toolkit'

const initialState = {
    count: 0,
    todos: ['Умыться', 'Покушать', 'Поработать'],
}

// Эти константы уже по умолчанию экшн криэйторы
export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')

export default createReducer(initialState, {
    [increment]: function (state) {
        state.count = state.count + 1
    },
    [decrement]: function (state) {
        state.count = state.count - 1
    },
})
