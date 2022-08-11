import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPosts } from './WorkerPostSlice'

const AddPostForm = ({ _id }) => {

    const dispatch = useDispatch();
    const [newPost, setNewPost] = useState({ title: "", body: "", userId: _id, like: 0, unlike: 0 })

    const addNewPost = (e) => {
        e.preventDefault();
        dispatch(addNewPosts(newPost))
    }

    return (
        <div>
            <form
                style={{ backgroundColor: 'silver' }}
                className='form-control shadow p-3 col-md-6 mx-auto m-3'>
                <div>Title</div>
                <input
                    className='form-control'
                    type={Text}
                    placeholder="title"
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                />
                <div>Body:</div>
                <textarea
                    className='form-control'
                    type={Text}
                    onChange={e => setNewPost({ ...newPost, body: e.target.value })}
                />
                <button
                    type="button"
                    className='btn btn-outline-success m-3'
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