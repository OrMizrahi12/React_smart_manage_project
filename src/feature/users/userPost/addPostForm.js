import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPosts } from './userPostSlice'

const AddPostForm = ({ _id }) => {

    const [newPost, setNewPost] = useState({ title: "", body: "", userId: _id, like: 0, unlike: 0 })
    const dispatch = useDispatch();

    const addNewPost = (e) => {
        e.preventDefault();
        dispatch(addNewPosts(newPost))
    }

    return (
        <div>
            <form
                className='form-control shadow p-3 w-50 mx-auto m-5'>
                <label htmlFor="postTitle">title</label>
                <input
                    className='form-control'
                    type={Text}
                    placeholder="title"
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                />
                <label htmlFor="postContent">body:</label>
                <textarea
                    className='form-control'
                    type={Text}
                    onChange={e => setNewPost({ ...newPost, body: e.target.value })}
                />
                <button
                    type="button"
                    className='btn btn-success m-3'
                    onClick={addNewPost}
                    disabled={!newPost.body || !newPost.title}
                >
                    Add Post
                </button>
            </form>
        </div>
    )
}

export default AddPostForm