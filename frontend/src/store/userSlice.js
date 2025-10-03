import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userId: null,
        isLoading: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.userId = action.payload._id
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export default userSlice.reducer
export const {
    setUser,
    setLoading
} = userSlice.actions
