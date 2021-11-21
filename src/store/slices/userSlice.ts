import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    status: string | null
    id: string | null
    email: string | null
    token: string | null
}

const initialState: UserState = {
    status: null,
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
