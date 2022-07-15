import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {

  const [users,setUsers] = useState({})

  const[obj,setObj]=useState({})

  const [id,setId]= useState(null)


  const getUsers = async()=> {
    let url = `https://jsonplaceholder.typicode.com/users/${id}`
    let respons = await axios.get(url)
    setUsers(respons.data)
  }
  const putUsers = async()=> {
    let url = `https://jsonplaceholder.typicode.com/users/${id}`
    let respons = await axios.put(url,obj)
    console.log(respons.data)
  }
  

  useEffect(()=> {
    getUsers()
  },[id])
  return (
    
    <div>
      <h1 className='display-1' >get name</h1>
      <input
      onChange={e=> setId(e.target.value)} 
         type={Text}>
      </input>
      <h1 key={users.id}>{users.name}</h1>

      <br />
      <br />
      <br />

      <label> New name:</label>
      <input
      onChange={e=> setObj({...users,email:e.target.value})} 
         type={Text}>
      </input>

      <button onClick={putUsers} >update</button>
  
       
    
    </div>
  )
}

export default Home