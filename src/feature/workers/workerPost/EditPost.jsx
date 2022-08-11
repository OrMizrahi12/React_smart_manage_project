import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPost, getWorkersPosts } from './WorkerPostSlice'
import { useParams, useNavigate } from 'react-router-dom'

const EditPost = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams()
    const posts = useSelector(state => state.workerPostsData.posts)
    const postById = posts.filter(item => item._id === params._id)
    const userPerson = postById.map(item => item.userId)
    const idPost = postById.map(item => item._id)
    const [postEdit, setpostEdit] = useState({
        title: null,
        body: null,
        userId: userPerson[0]
    })

    useEffect(() => {
        dispatch(getWorkersPosts())
    }, [dispatch])

    const sendPostUpdate = (e) => {
        e.preventDefault();
        dispatch(editPost({ postEdit, idPost }))
    }


    return (
        <div className='container col-md-6'>
            <h1 className='display-5 m-4' >Edit your post</h1>
            {
                postById.map(item => <form
                    key={item._id}
                    className='form-control shadow p-3 col-md-6 mx-auto m-5'>
                    <div>
                        <h5>title</h5>
                        <p>{item.title}</p>
                        <h5>body</h5>
                        <p>{item.body}</p>
                        <hr />
                        <br />
                    </div>
                    <div>title</div>
                    <input
                        className='form-control'
                        type={Text}
                        placeholder={item.title}
                        onChange={e => setpostEdit({ ...postEdit, title: e.target.value })}
                    />
                    <div>body:</div>
                    <textarea
                        className='form-control'
                        placeholder={item.body}
                        type={Text}
                        onChange={e => setpostEdit({ ...postEdit, body: e.target.value })}
                    />
                    <button
                        type="button"
                        className='btn btn-outline-success m-3'
                        onClick={sendPostUpdate}>
                        Edit Post
                    </button>
                    <button
                        className='btn btn-outline-dark'
                        onClick={() => navigate(`/workers/` + item.userId)}
                    >
                        Back
                    </button>
                </form>
                )}
        </div>
    )
}

export default EditPost