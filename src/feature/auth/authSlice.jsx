import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, _id: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, _id ,email,date} = action.payload
            state.user = user
            state.token = accessToken
            state._id = _id
            state.email = email
            state.date = date
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state._id = null
        },
     
    },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentId = (state) => state.auth._id
export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentRegisterDate = (state) => state.auth.date


