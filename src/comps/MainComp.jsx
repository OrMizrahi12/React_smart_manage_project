import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../feature/auth/Login'
import Register from '../feature/auth/Register'
import RequireAuth from '../feature/auth/RequireAuth'
import Welcome from '../feature/auth/Welcome'
import EditSingleWorker from '../feature/workers/EditSingleWorker'
import WorkerMain from '../feature/workers/WorkerMain'
import EditPost from '../feature/workers/workerPost/EditPost'
import Navbar1 from '../navbar/navbar'
import Definitions from './Definitions'
import Home from './Home'
import Layout from './Layout'
import ManageYourself from '../feature/manager/ManageYourself'
import ProjectList from '../feature/projects/projectList'
import SingleProject from '../feature/projects/singleProject'
import CreateProject from '../feature/projects/createProject'
import PlusMain from '../feature/plus/plusMain'
import MemoryGameNum from '../feature/plus/memoryNumGame/memoryGameNum'
import MemoryWordsGame from '../feature/plus/memoryWords/memoryWordsGame'
import FlashMemory from '../feature/plus/flashMemory/flashMemory'
import FlasjBox from '../feature/plus/flashBox/flasjBox'
import MemoryCards from '../feature/plus/memoryCards/memoryCards'


const MainComp = () => {
  return (
    <div>
      <Navbar1 />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          
          <Route element={<RequireAuth/>}>
            <Route path='/welcome' element={<Welcome/>}/>
            <Route path='/workers' element={<WorkerMain/>}/>
            <Route path='/workers/:_id' element={<EditSingleWorker/>}/>
            <Route path='/workers/post/:_id' element={<EditPost/>}/>
            <Route path='/definitions' element={<Definitions/>}/>
            <Route path='/manageyourself' element={<ManageYourself/>}/>
            <Route path='/projectlist' element={<ProjectList/>}/>
            <Route path='/createProject' element={<CreateProject/>}/>
            <Route path='/singleProject/:_id' element={<SingleProject/>}/>
            <Route path='/memoryNum' element={<MemoryGameNum/>}/>
            <Route path='/memoryWord' element={<MemoryWordsGame/>}/>
            <Route path='/flashMemory' element={<FlashMemory/>}/>
            <Route path='/FlashjBox' element={<FlasjBox/>}/>
            <Route path='/memoryCards' element={<MemoryCards/>}/>
            <Route path='/plus' element={<PlusMain/>}/>
          
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default MainComp