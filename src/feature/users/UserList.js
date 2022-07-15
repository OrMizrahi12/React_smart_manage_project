import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from './UserSlice';

const UserList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.userData.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div>
            {
                users.map
                    (item => <div
                        className='shadow p-4 m-3 w-25 mx-auto'>
                        <button
                            className='btn btn-danger float-end'
                            onClick={() => dispatch(deleteUser(item.id))}
                        >X
                        </button>
                        <h4> {item.name}</h4>
                        <button
                            onClick={() => navigate(`/users/${item._id}`)}
                            className='btn btn-warning'
                        >See more & Edit
                        </button>
                    </div>
                    )
            }
        </div>
    )
}

export default UserList