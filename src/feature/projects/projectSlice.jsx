import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_PROJECTS = "https://serverprojec.herokuapp.com/projects"

export const getProjects = createAsyncThunk(
    'projects,getProjects',
    async (_id) => {
        let respons = await axios.get(URL_PROJECTS + "/user/" + _id)
        return [...respons.data]
    })

export const deleteProject = createAsyncThunk(
    'projects,deleteProject',
    async (obj) => {
        let respons = await axios.delete(URL_PROJECTS + '/' + obj._id)
        return obj._id
    }
)


export const addNewProject = createAsyncThunk(
    "projects,addProject",
    async (obj) => {
        let {data} = await axios.post(URL_PROJECTS, obj);
        return data
    }
)

export const editProject = createAsyncThunk(
    "projects,editProject",
    async ({data, id,_id}, { dispatch }) => {
        let respons = await axios.put(URL_PROJECTS + '/' + id, data);
        dispatch(getProjects(_id))
    }
)

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder

            // GET -->
            .addCase(getProjects.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projects = [...action.payload];
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            //   DELET -->
            .addCase(deleteProject.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projects = state.projects.filter(x => x._id !== action.payload)
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // POST --> 

            .addCase(addNewProject.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewProject.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projects.push(action.payload)
            })
            .addCase(addNewProject.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // put --> 

            .addCase(editProject.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(editProject.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(editProject.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default projectSlice.reducer;