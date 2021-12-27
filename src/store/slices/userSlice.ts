import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    status: string | null
    id: string | null
    email: string | null
    token: string | null
    role: string | null
}

const initialState: UserState = {
    status: null,
    id: null,
    email: null,
    token: null,
    role: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { email, token, id, role } = action.payload
            state.id = id
            state.email = email
            state.token = token
            state.role = role
        },
        removeUser(state) {
            state.id = null
            state.email = null
            state.token = null
            state.role = null
        },
    },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
