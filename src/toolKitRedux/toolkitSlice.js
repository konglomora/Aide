import { createSlice } from '@reduxjs/toolkit'

export const addAsyncTodo = () => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch(addTodo('ASYNC TODO'))
        }, 2000)
    }
}

const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        count: 21,
        todos: ['Умыться', 'Покушать', 'Уснуть'],
    },
    reducers: {
        increment(state) {
            console.log(state.count)
            state.count = state.count + 1
        },
        decrement(state) {
            state.count = state.count - 1
        },
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeLastTodo(state) {
            state.todos.pop()
        },
    },
})

export const { increment, decrement, addTodo, removeLastTodo } =
    toolkitSlice.actions
export default toolkitSlice.reducer
