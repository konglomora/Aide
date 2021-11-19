import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    email: null,
    token: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { email, token, id } = action.payload
            state.id = id
            state.email = email
            state.token = token
        },
        removeUser(state) {
            state.id = null
            state.email = null
            state.token = null
        },
    },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
