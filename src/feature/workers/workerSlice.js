import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_WORKERS = "http://localhost:3000/workers"
export const getWorkers = createAsyncThunk(
    'workers,getWorkers',
    async () => {
        let respons = await axios.get(URL_WORKERS)
        return respons.data;
    })

export const deleteWorker = createAsyncThunk(
    'workers,deleteWorkers',
    async (id, { dispatch }) => {
        let respons = await axios.delete(URL_WORKERS + '/' + id)

        // dispatch(removeworker({id}))
        dispatch(getWorkers())

    }
)
export const editOneWorker = createAsyncThunk(
    "workers/editWorkers",
    async (obj, { dispatch }) => {
        let respons = await axios.put(URL_WORKERS + '/' + obj.id, obj)
        // return respons.data
        dispatch(getWorkers())
    }

)

export const addNewWorker = createAsyncThunk(
    "workers,addWorkers",
    async (obj, { dispatch }) => {
        let respons = await axios.post(URL_WORKERS, obj);
        dispatch(getWorkers())

    }
)



const workerSlice = createSlice({
    name: 'workers',
    initialState: {
        workers: [],
        status: null,
        error: null
    },
    reducers: {
        // addworker(state, action) {
        //     state.workers.push({
        //         id: new Date().toISOString(),
        //         text: action.payload.text,
        //         completed: false,
        //     });
        // },
        // editWorker: (state, action) => {
        //     //  let id = state.workers.findIndex(item => item.id == action.payload.id);
        //     //  state.workers = state.workers.map(...state.workers,action.payload[id])
        //     state.workers = state.workers.filter(worker => worker.id !== action.payload.id);

        // },
        // removeworker(state, action) {
        //     state.workers = state.workers.filter(worker => worker.id !== action.payload.id);
        // }
    },
    extraReducers: {

        [getWorkers.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null
        },
        [getWorkers.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.workers = action.payload;
        },
        [getWorkers.rejected]: (state, action) => {
            state.status = 'erorr';
            state.workers = "error";
        },

        // Add worker -->
        [addNewWorker.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null
        },
        [addNewWorker.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.workers = [...action.payload];

        },
        [addNewWorker.rejected]: (state, action) => {
            state.status = 'erorr';
            state.workers = "error";
        },

        // Edit worker --> 

        [editOneWorker.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null
        },
        [editOneWorker.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.workers = [...action.payload];

        },
        [editOneWorker.rejected]: (state, action) => {
            state.status = 'erorr';
            state.workers = "error";
        },

        // Delete worker --> 

        [deleteWorker.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null
        },
        [deleteWorker.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.workers = state.workers.filter(worker => worker.id !== action.payload.id);
        },
        [deleteWorker.rejected]: (state, action) => {
            state.status = 'erorr';
            state.workers = "error";
        },
    },
});

export const { addworker, removeworker } = workerSlice.actions;

export default workerSlice.reducer;