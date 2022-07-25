import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from './UserSlice';

const UserList = () => {

    const users = useSelector(state => state.userData.users)
    
    const [searchResult, setSearchResult] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())

    }, [dispatch])

    const deleteNow = (del) => {
        dispatch(deleteUser(del))
    }
    // timer = setTimeout(()=>{
    //   console.log(Math.floor(Math.random() * 10))
    // },[2000])


    return (
        <div>
            <input
                type={Text}
                onChange={e => setSearchResult(e.target.value)}
                placeholder='search by name,email,role...'
                className='form-control w-25 mx-auto border border-dark m-5'>
            </input>

            {
                users.map(
                    (item, index) => {
                        if (item.name.includes(searchResult)) return  <section
                            key={item._id}
                            className='shadow p-4 m-3 w-75 mx-auto rounded border border-dark'>
                            <button
                                className='btn btn-danger float-end'
                                onClick={() => deleteNow(item._id)}
                            >X
                            </button>
                            <h4> {item.name}</h4>
                            <button
                                onClick={() => navigate(`/users/${item._id}`)}
                                className='btn btn-warning'
                            >See more & Edit
                            </button>
                        </section>
            })}
        </div>
    )
}

export default UserList