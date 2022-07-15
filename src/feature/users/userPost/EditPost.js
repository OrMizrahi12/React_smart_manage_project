import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { editPost, getUsersPosts } from './userPostSlice'
import {useParams} from 'react-router-dom'

const EditPost = ({ _id }) => {

    const params = useParams()
    const [postEdit,setpostEdit]=useState({title: "" , body: "" ,userId: _id })
    const dispatch = useDispatch();
    const posts = useSelector(state => state.userPostsData.posts)
    const postById = posts.filter(item => item._id === params._id)
   
    const sendPostUpdate = (e) => {
      e.preventDefault();
     let idPost = postById.map(item => item._id)
     console.log(idPost[0])
        dispatch(editPost({postById,postEdit,idPost}))
    }

    useEffect(() => {
        dispatch(getUsersPosts())
    }, [dispatch])

    return (
        <div>
        
          {
           postById.map(item => <form
                className='form-control shadow p-3 w-50 mx-auto m-5'>
                <label htmlFor="postTitle">title</label>
                <input
                    className='form-control'
                    type={Text}
                    placeholder={item.title}
                    onChange={e => setpostEdit({ ...postEdit, title: e.target.value })}
                />
                <label htmlFor="postContent">body:</label>
                <textarea
                    className='form-control'
                    placeholder={item.body}
                    type={Text}
                    onChange={e => setpostEdit({ ...postEdit, body: e.target.value })}
                />
                <button
                    type="button"
                    className='btn btn-success m-3'
                    onClick={sendPostUpdate}
                    disabled={!postEdit.body || !postEdit.title}
                >
                    Edit Post
                </button>
            </form>
            )}
        </div>
    )
}

export default EditPost