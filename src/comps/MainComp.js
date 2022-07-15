import React from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import EditSingleUser from '../feature/users/EditSingleUser'
import UserMain from '../feature/users/UserMain'
import EditPost from '../feature/users/userPost/EditPost'
import AppWorker from '../feature/workers/appWorker'
import EditSingleWorker from '../feature/workers/editSingleWorker'
import Home from './Home'

const MainComp = () => {
  const navigate = useNavigate()
  return (
    <div className=''>
      <header className='navbar navbar bg-dark justify-content-around'>
        <button
          className='btn btn-outline-info'
          onClick={() => navigate('/')}
        >hone
        </button>


        <button
          className='btn btn-outline-info'
          onClick={() => navigate('/users')}
        >
          users
        </button>

      </header>
      <Routes>
        <Route path='/' element={<Home />} />
      
        <Route path='/users' element={<UserMain />} />
        <Route path='/users/:_id' element={<EditSingleUser />} />
        <Route path='/users/post/:_id' element={<EditPost />} />


      </Routes>
    </div>
  )
}

export default MainComp