import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_MEETINGS = "https://serverprojec.herokuapp.com/meetings"

export const getMeetings = createAsyncThunk(
    'meetings,getMeetings',
    async (userId) => {
        let respons = await axios.get(URL_MEETINGS + '/user/' +userId)
        return [...respons.data]
    })

export const deleteMeetings= createAsyncThunk(
    'meetings,deleteMeetings',
    async (obj) => {
        let {data} = await axios.delete(URL_MEETINGS + '/' + obj._id)
        return obj._id;
    }
)

export const addNewMeetings = createAsyncThunk(
    "meetings,addMeetings",
    async (obj) => {
        let {data} = await axios.post(URL_MEETINGS, obj);
        return data
    }
)


const meetingSlice = createSlice({
    name: 'meetings',
    initialState: {
        meetings: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder

            // GET -->
            .addCase(getMeetings.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getMeetings.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.meetings = [...action.payload];
            })
            .addCase(getMeetings.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            //   DELET -->
            .addCase(deleteMeetings.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteMeetings.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.meetings = state.meetings.filter(x => x._id !== action.payload)
            })
            .addCase(deleteMeetings.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // POST --> 

            .addCase(addNewMeetings.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewMeetings.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.meetings.push(action.payload)
            })
            .addCase(addNewMeetings.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // put --> 


    }

})

export default meetingSlice.reducer;