import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_Todos = "http://localhost:3000/todos"

export const getUsersTodos = createAsyncThunk(
    'todos,getTodos',
    async () => {
        let respons = await axios.get(URL_Todos)
        return [...respons.data]
    }
)
export const addNewTodo = createAsyncThunk(
    "todos,addTodo",
    async (obj, { dispatch }) => {
        let respons = await axios.post(URL_Todos, obj);
        dispatch(getUsersTodos());
        return [...respons.data]

    }
)
export const deleteTodo = createAsyncThunk(
    "todos,deleteTodo",
    async (_id, { dispatch }) => {
        let respons = await axios.delete(URL_Todos + "/" + _id);
        dispatch(getUsersTodos());
        return [...respons.data]

    }
)
export const changeStatusTodo = createAsyncThunk(
    "todos,changeStatusTodo",
    async (obj, { dispatch }) => {
        let respons = await axios.put(URL_Todos + "/" + obj._id, {
            ...obj,
            Completed: obj.Completed ? false : true
        });
        dispatch(getUsersTodos());
        return [...respons.data]


    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder

            // GET -->
            .addCase(getUsersTodos.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getUsersTodos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.todos = [...action.payload];
            })
            .addCase(getUsersTodos.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // POST --> 
            .addCase(addNewTodo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.todos = [...action.payload];
            })
            .addCase(addNewTodo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // DELETE --> 
            .addCase(deleteTodo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.todos = [...action.payload];
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // PUT --> 
            .addCase(changeStatusTodo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(changeStatusTodo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.todos = [...action.payload];
            })
            .addCase(changeStatusTodo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export default todoSlice.reducer;