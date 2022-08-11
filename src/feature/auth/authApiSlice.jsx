import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                // url: '/auth',
                url: 'https://serverprojec.herokuapp.com/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    
    })
})

export const {
    useLoginMutation
} = authApiSlice

