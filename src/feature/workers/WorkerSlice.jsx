import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_Workers = "https://serverprojec.herokuapp.com/workers"
export const getWorkers = createAsyncThunk(
  'workers,getWorkers',
  async (_id) => {
    let respons = await axios.get(URL_Workers + '/user/' + _id)
    return [...respons.data]
  })

export const deleteworker = createAsyncThunk(
  'workers,deleteWorker',
  async (obj) => {
    let respons = await axios.delete(URL_Workers + '/' + obj._id)
    return obj._id
  }
)

export const editOneWorker = createAsyncThunk(
  "workers/editWorker",
  async (obj, { dispatch }) => {
    let respons = await axios.put('https://serverprojec.herokuapp.com/workers/' + obj.idWorker,obj)
    dispatch(getWorkers(obj.userId))
  }
)

export const addNewWorker = createAsyncThunk(
  "workers,addWorker",
  async (obj) => {
    let {data} = await axios.post(URL_Workers, obj);
    return data
  }
)

const workerSlice = createSlice({
  name: 'workers',
  initialState: {
    workers: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder

      // GET -->
      .addCase(getWorkers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getWorkers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.workers = [...action.payload];
      })
      .addCase(getWorkers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      //   DELET -->
      .addCase(deleteworker.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(deleteworker.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.workers = state.workers.filter(x => x._id !== action.payload)
      })
      .addCase(deleteworker.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // PUT -->
      .addCase(editOneWorker.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(editOneWorker.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(editOneWorker.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // POST --> 

      .addCase(addNewWorker.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addNewWorker.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.workers.push(action.payload)
      })
      .addCase(addNewWorker.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }

})

export default workerSlice.reducer;


