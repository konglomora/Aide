// Helper for handling errors from rejectWithValue
const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const setLoading = (state) => {
    state.status = 'loading'
    state.error = null
}

export { setError, setLoading }
