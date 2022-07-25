import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addNewUser } from './UserSlice';


const AddNewUser = () => {

  const [obj, setobj] = useState({ name: null, role: null, email: null })
  const dispatch = useDispatch();

  const addNewUserOne = (e) => {
    e.preventDefault();
    dispatch(addNewUser(obj))
  }

  return (
    <div>
      <h1 className='display-4 m-5 p-2'>add user</h1>
      <form
        className='form-control shadow p-3 w-75 mx-auto m-5 border border-dark'>
        <label htmlFor="postTitle">name</label>
        <input
          className='form-control'
          type={Text}
          placeholder="name"
          onChange={e => setobj({ ...obj, name: e.target.value })}
        />
        <label htmlFor="postContent">email:</label>
        <input
          className='form-control'
          type={Text}
          onChange={e => setobj({ ...obj, email: e.target.value })}
        />
        <label htmlFor="postContent">role:</label>
        <input
          className='form-control'
          type={Text}
          onChange={e => setobj({ ...obj, role: e.target.value })}
        />
        <button
          type="button"
          className='btn btn-success m-3'
          onClick={addNewUserOne}
          disabled={!obj.email || !obj.name || !obj.role}
        >
          Add New User
        </button>
      </form>
    </div>
  );
};

export default AddNewUser;