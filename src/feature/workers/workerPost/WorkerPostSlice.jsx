import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_Posts = "https://serverprojec.herokuapp.com/posts"

export const getWorkersPosts = createAsyncThunk(
    'posts,getPosts',
    async () => {
        let respons = await axios.get(URL_Posts)
        return [...respons.data]
    }
)

export const addNewPosts = createAsyncThunk(
    "posts,addPosts",
    async (newPost, { dispatch }) => {
        let {data} = await axios.post(URL_Posts, {
            title: newPost.title,
            body: newPost.body,
            userId: newPost.userId,
            like: 0,
            unlike: 0
        });
       return data;
    }
)

export const deletePosts = createAsyncThunk(
    "posts,deletePosts",
    async (_id) => {
        let respons = await axios.delete(URL_Posts + "/" + _id);
        return _id
    }
)

export const editPost = createAsyncThunk(
    "posts,editPost",
    async ({ postEdit, idPost }, { dispatch }) => {
        let respons = await axios.put(URL_Posts + "/" + idPost, postEdit);
        dispatch(getWorkersPosts());
    }
)

export const likeToPost = createAsyncThunk(
    "posts,likeToPost",
    async (obj, { dispatch }) => {
        let respons = await axios.put(URL_Posts + "/" + obj._id, {
            like: JSON.stringify(obj.like + 1),
        });
        dispatch(getWorkersPosts());
    }
)

export const unlikeToPost = createAsyncThunk(
    "posts,unlikeToPost",
    async (obj, { dispatch }) => {
        let respons = await axios.put(URL_Posts + "/" + obj._id, {
            unlike: JSON.stringify(obj.unlike + 1),
        });
        dispatch(getWorkersPosts());
    }
)

const Postslice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder

            // GET -->
            .addCase(getWorkersPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getWorkersPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = [...action.payload];

            })
            .addCase(getWorkersPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // POST --> 
            .addCase(addNewPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts.push(action.payload)
            })
            .addCase(addNewPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // DELETE --> 
            .addCase(deletePosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deletePosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.filter(x => x._id !== action.payload)
            })
            .addCase(deletePosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // PUT --> 
            .addCase(editPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(editPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // PUT like -->
            .addCase(likeToPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(likeToPost.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(likeToPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // PUT unlike --->
            .addCase(unlikeToPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(unlikeToPost.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(unlikeToPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default Postslice.reducer;