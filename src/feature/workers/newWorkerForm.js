import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addNewWorker } from './workerSlice';

const NewWorkerForm = () => {
  const [obj, setobj] = useState({ name: "", role: "", email: "" })

  const dispatch = useDispatch();
  const sendWorker = (e) => {
    e.preventDefault();
    dispatch(addNewWorker(obj))
  }
  return (
    <div>

      <form className='form-control shadow p-3 w-50 mx-auto m-5'>
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
          onClick={sendWorker}
        >
          Add worker
        </button>

      </form>

    </div>
  );
};

export default NewWorkerForm;