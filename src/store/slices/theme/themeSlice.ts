import { createSlice } from '@reduxjs/toolkit'
import { Theme } from 'components/themes'

interface IThemeState {
    theme: Theme
}

const initialState: IThemeState = {
    theme: Theme.aide,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme(state) {
            if (state.theme === Theme.aide) {
                state.theme = Theme.glovo
            } else {
                state.theme = Theme.aide
            }
        },
    },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
