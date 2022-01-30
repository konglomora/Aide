import { createSlice } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs'

interface ScheduleState {
    day: Dayjs
}

const initialState: ScheduleState = {
    day: dayjs(),
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setToday(state) {
            state.day = dayjs()
        },
        setNextDay(state, action) {
            state.day = action.payload.add(1, 'day')
        },
        setPrevDay(state, action) {
            state.day = action.payload.add(-1, 'day')
        },
    },
})

export const { setToday, setNextDay, setPrevDay } = scheduleSlice.actions

export default scheduleSlice.reducer
