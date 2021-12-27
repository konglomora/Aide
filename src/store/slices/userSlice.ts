import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    status: string | null
    id: string | null
    email: string | null
    token: string | null
    isAdmin: boolean
}

const initialState: UserState = {
    status: null,
    id: null,
    email: null,
    token: null,
    isAdmin: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { email, token, id, isAdmin } = action.payload
            state.id = id
            state.email = email
            state.token = token
            state.isAdmin = isAdmin
        },
        removeUser(state) {
            state.id = null
            state.email = null
            state.token = null
            state.isAdmin = false
        },
    },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
