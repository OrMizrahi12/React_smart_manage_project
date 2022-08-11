import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_IDEAS = "https://serverprojec.herokuapp.com/ideas"

export const getIdeas = createAsyncThunk(
    'ideas,getIdeas',
    async (id) => {
        let respons = await axios.get(URL_IDEAS + '/user/' + id)
        return [...respons.data]
    })

export const deleteIdeas= createAsyncThunk(
    'ideas,deleteIdeas',
    async (obj) => {
        let respons = await axios.delete(URL_IDEAS + '/' + obj._id)
        return obj._id
    }
)

export const addNewIdeas = createAsyncThunk(
    "ideas,addIdeas",
    async (obj) => {
        let {data} = await axios.post(URL_IDEAS, obj);
        return data;
    }
)


const ideasSlice = createSlice({
    name: 'ideas',
    initialState: {
        ideas: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder

            // GET -->
            .addCase(getIdeas.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getIdeas.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.ideas = [...action.payload];
            })
            .addCase(getIdeas.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            //   DELET -->
            .addCase(deleteIdeas.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteIdeas.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.ideas = state.ideas.filter(x => x._id !== action.payload)
            })
            .addCase(deleteIdeas.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // POST --> 

            .addCase(addNewIdeas.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewIdeas.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.ideas.push(action.payload)
            })
            .addCase(addNewIdeas.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // put --> 


    }

})

export default ideasSlice.reducer;