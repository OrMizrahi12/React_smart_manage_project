import React, { useEffect, useState } from 'react';
import { deletePosts, getUsersPosts, likeToPost, unlikeToPost } from './userPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddPostForm from './addPostForm';
import { useNavigate } from 'react-router-dom'


const PostsList = ( { _id } ) => {

    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const dispatch = useDispatch();
    const posts = useSelector(state => state.userPostsData.posts)
    const postsById = posts.filter(item => item.userId === _id)
    useEffect(() => {
        dispatch(getUsersPosts())
    }, [dispatch])

    return (
        <div>
            <br />
            <br />
            <h1 className='display-4 bg-primary rounded shadow p-5 border border-dark border border-dark' >Blog</h1>
            <br />
            <br />
            {
                postsById.length === 0 && <h5 className='display-5'>there ar no posts.. <br />what is your mind ?</h5>
            }
            <button
                className='btn btn-outline-dark m-5'
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
                        className='shadow m-2 p-2 border border-dark rounded'
                    >
                        <button
                            onClick={() => dispatch(deletePosts(item._id))}
                            className='float-end btn btn-outline-danger'
                        >
                            X
                        </button>
                        <button
                            onClick={() => navigate(`/users/post/${item._id}`)}
                            className='float-start btn btn-outline-warning'

                        >
                            Edit
                        </button>
                        <h5 className='display-6'>Title</h5>
                        <p>{item.title}</p>
                        <h5 className='display-6'>body</h5>
                        <p>{item.body}</p>
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