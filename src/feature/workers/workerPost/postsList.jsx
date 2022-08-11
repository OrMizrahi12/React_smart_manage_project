import React, { useEffect, useState } from 'react';
import { deletePosts, getWorkersPosts, likeToPost, unlikeToPost } from './WorkerPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddPostForm from './addPostForm';
import { useNavigate } from 'react-router-dom'

const PostsList = ({ _id }) => {


    const navigate = useNavigate()
    const dispatch = useDispatch();
    const posts = useSelector(state => state.workerPostsData.posts)
    const postsById = posts.filter(item => item.userId === _id)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(getWorkersPosts())
    }, [dispatch])

    return (
        <div>
            <br />
            <h1 className="display-5 border-ligth" >Blog</h1>
            {
                postsById.length === 0 && <h5 className='display-5'>there ar no posts..
                    <br />what is your mind ? </h5>
            }
            <button
                className='btn btn-outline-primary bg-dark m-1'
                onClick={() => setShowForm(!showForm)}
            >
                Add new post
            </button>
            {
                showForm && <AddPostForm _id={_id} />
            }
            {
                postsById.map(item => <section key={item._id}>
                    <section
                        style={{ backgroundColor: 'silver' }}
                        className='shadow m-2 p-2 border col-md-12 border-dark rounded'
                    >
                        <button
                            onClick={() => dispatch(deletePosts(item._id))}
                            className='float-end btn btn-outline-danger'
                        >
                            X
                        </button>
                        <button
                            onClick={() => navigate(`/workers/post/${item._id}`)}
                            className='float-start btn btn-outline-dark'
                        >
                            Edit
                        </button>
                        <h5 className='display-6'>Title</h5>
                        <p style={{ color: 'black' }}>{item.title}</p>
                        <h5 className='display-6'>body</h5>
                        <p style={{ color: 'black' }}> {item.body}</p>
                        <div className='col'>
                            <button
                                className='btn btn'
                                onClick={() => dispatch(likeToPost(item))}
                            >
                                👍🏼{item.like}
                            </button>
                            <button
                                className='btn btn'
                                onClick={() => dispatch(unlikeToPost(item))}
                            >
                                👎🏼{item.unlike}
                            </button>
                        </div>
                    </section>
                </section>
                )
            }
            

        </div>
    )
}

export default PostsList