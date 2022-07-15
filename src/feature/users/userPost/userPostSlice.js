import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL_Posts = "http://localhost:3000/posts"

export const getUsersPosts = createAsyncThunk(
    'posts,getPosts',
    async () => {
        let respons = await axios.get(URL_Posts)
        return respons.data;
    }
)
export const addNewPosts = createAsyncThunk(
    "posts,addPosts",
    async (obj, { dispatch }) => {
        let respons = await axios.post(URL_Posts, obj);
        dispatch(getUsersPosts());
        return respons.data

    }
)
export const deletePosts = createAsyncThunk(
    "posts,deletePosts",
    async (_id, { dispatch }) => {
        let respons = await axios.delete(URL_Posts + "/" + _id);
        dispatch(getUsersPosts());

    }
)
export const editPost = createAsyncThunk(
    "posts,editPost",
    async ({postById,postEdit,idPost}, { dispatch }) => {
        let respons = await axios.put(URL_Posts + "/" + idPost[0], {...postById,title:postEdit.title,body:postEdit.body});
        dispatch(getUsersPosts());
        return respons.data;
    
    }
)
export const likeToPost = createAsyncThunk(
    "posts,likeToPost",
    async (obj, { dispatch }) => {
        let respons = await axios.put(URL_Posts + "/" + obj._id, { ...obj, like: obj.like + 1 });
        dispatch(getUsersPosts());

    }
)
export const unlikeToPost = createAsyncThunk(
    "posts,unlikeToPost",
    async (obj, { dispatch }) => {
        let respons = await axios.put(URL_Posts + "/" + obj._id, { ...obj, unlike: obj.unlike + 1 });
        dispatch(getUsersPosts());

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
            .addCase(getUsersPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getUsersPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = [...action.payload];

            })
            .addCase(getUsersPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // POST --> 
            .addCase(addNewPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = [...action.payload];
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
                // Add any fetched posts to the array
                state.posts = [...action.payload];
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
                // Add any fetched posts to the array
                state.posts = [...action.payload];
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
                // Add any fetched posts to the array
                state.posts = [...action.payload];
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
                // Add any fetched posts to the array
                state.posts = [...action.payload];
            })
            .addCase(unlikeToPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export default Postslice.reducer;