import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_REMAINDER = "https://serverprojec.herokuapp.com/remainders"

export const getReamainder = createAsyncThunk(
    'remainder,getReamainder',
    async (userId) => {
        let respons = await axios.get(URL_REMAINDER + '/user/' + userId)
        return [...respons.data]
    })

export const deleteRemainder= createAsyncThunk(
    'remainder,deleteRemainder',
    async (obj) => {
        let respons = await axios.delete(URL_REMAINDER + '/' + obj._id)
       
        return obj._id
    }
)

export const addNewRemainder = createAsyncThunk(
    "remainder,addRemainder",
    async (obj) => {
        let {data} = await axios.post(URL_REMAINDER, obj);
        return data
    }
)


const remainderSlice = createSlice({
    name: 'remainder',
    initialState: {
        remainder: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder

            // GET -->
            .addCase(getReamainder.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getReamainder.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.remainder = [...action.payload];
            })
            .addCase(getReamainder.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            //   DELET -->
            .addCase(deleteRemainder.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteRemainder.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.remainder = state.remainder.filter(x => x._id !== action.payload)
            })
            .addCase(deleteRemainder.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // POST --> 

            .addCase(addNewRemainder.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewRemainder.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.remainder.push(action.payload)
            })
            .addCase(addNewRemainder.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // put --> 


    }

})

export default remainderSlice.reducer;