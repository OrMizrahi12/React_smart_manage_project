import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory'

const URL_Todos = "https://serverprojec.herokuapp.com/todos"

export const getWorkersTodos = createAsyncThunk(
    'todos,getTodos',
    async () => {
        let respons = await axios.get(URL_Todos)
        return [...respons.data]
    }
)

export const addNewTodo = createAsyncThunk(
    "todos,addTodo",
    async (obj) => {
        let {data} = await axios.post(
            URL_Todos,
            {
                todo: obj.todo,
                Completed: obj.Completed,
                userId: obj.userId
            }
        );
        return data
    }
)

export const deleteTodo = createAsyncThunk(
    "todos,deleteTodo",
    async (_id) => {
        let respons = await axios.delete(URL_Todos + "/" + _id);
        return _id;
    }
)

export const changeStatusTodo = createAsyncThunk(
    "todos,changeStatusTodo",
    async (obj, { dispatch }) => {
        let respons = await axios.put(URL_Todos + "/" + obj._id, {
            Completed: obj.Completed ? "false" : "true"
        });
        dispatch(getWorkersTodos());
        return obj 
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
            .addCase(getWorkersTodos.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getWorkersTodos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.todos = [...action.payload];
            })
            .addCase(getWorkersTodos.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // POST --> 
            .addCase(addNewTodo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.todos.push(action.payload)
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
                state.todos = state.todos.filter(x => x._id !== action.payload)
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
            })
            .addCase(changeStatusTodo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default todoSlice.reducer;