import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_Users = "http://localhost:3000/workers"
export const getUsers = createAsyncThunk(
  'users,getUsers',
  async () => {
    let respons = await axios.get(URL_Users)
    return [...respons.data]
  })

export const deleteUser = createAsyncThunk(
  'users,deleteUsers',
  async (_id ,{dispatch }) => {
    let respons = await axios.delete(URL_Users + '/' + _id)
    dispatch(getUsers())
    return [...respons.data]

  }
)
export const editOneUser = createAsyncThunk(
  "users/editUsers",
  async (obj ,{ dispatch }) => {
    let respons = await axios.put(URL_Users + '/' + obj._id, { name: obj.name, role: obj.role, email: obj.email })
    dispatch(getUsers())
    return [...respons.data]

  }
)

export const addNewUser = createAsyncThunk(
  "users,addUsers",
  async (obj, { dispatch }) => {
    let respons = await axios.post(URL_Users, obj);
    dispatch(getUsers())
    return [...respons.data]

  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder

    // GET -->
      .addCase(getUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = [...action.payload];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      //   DELET -->
      .addCase(deleteUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = [...action.payload];
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
       
      // PUT -->
      .addCase(editOneUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(editOneUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = [...action.payload];
      })
      .addCase(editOneUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // POST --> 

      .addCase(addNewUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = [...action.payload];
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }

})

export default userSlice.reducer;


