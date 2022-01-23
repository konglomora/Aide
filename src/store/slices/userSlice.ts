import { Roles } from './../../components/Pages/Auth/helpers'
import { createSlice } from '@reduxjs/toolkit'

interface IUserState {
    status: string | null
    id: string | null
    email: string | null
    token: string | null
    name: string | null
    surname: string | null
    role:
        | Roles.admin
        | Roles.dash
        | Roles.fleet
        | Roles.guest
        | Roles.lead
        | Roles.manager
        | null
}

const initialState: IUserState = {
    status: null,
    id: null,
    email: null,
    token: null,
    role: null,
    name: null,
    surname: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { email, name, surname, token, id, role } = action.payload
            state.id = id
            state.email = email
            state.name = name
            state.surname = surname
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
