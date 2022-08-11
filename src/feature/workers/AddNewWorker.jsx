import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentId, selectCurrentUser } from '../auth/authSlice';
import { addNewWorker } from './WorkerSlice';


const AddNewWorker = () => {

  const dispatch = useDispatch();
  const _id = useSelector(selectCurrentId)
  const [showForm, setShowForm] = useState(false)
  const [obj, setobj] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    userId: _id,
    seniority: 0
  })

  const addNewWorkerOne = (e) => {
    e.preventDefault();

    dispatch(addNewWorker(obj))

  }

  
  return (
    <div className='col-md-6 mx-auto container'>
      <br />
      <br />
      <button
        onClick={() => setShowForm(!showForm)}
        className='btn btn-outline-warning m-4'>
        add new worker
      </button>
      {

        showForm &&
        <form
          style={{ backgroundColor: 'silver' }}
          className='form-control shadow p-3 col-md-12 mx-auto m-5 border border-dark'>
          <div>first nama</div>
          <input
            className='form-control'
            type={Text}
            placeholder="first nama"
            onChange={e => setobj({ ...obj, firstname: e.target.value })}
          />
          <div >last name:</div>
          <input

            className='form-control'
            type={Text}
            onChange={e => setobj({ ...obj, lastname: e.target.value })}
          />
          <div >email:</div>
          <input
            className='form-control'
            type={Text}
            onChange={e => setobj({ ...obj, email: e.target.value })}
          />
          <div >role:</div>
          <input
            className='form-control'
            type={Text}
            onChange={e => setobj({ ...obj, role: e.target.value })}
          />
          <div >seniority:</div>
          <input
            className='form-control'
            type='number'
            onChange={e => setobj({ ...obj, seniority: e.target.value })}
          />
          <button
            type="button"
            className='btn btn-outline-success m-3'
            onClick={addNewWorkerOne}
            disabled={
              !obj.email ||
              !obj.firstname ||
              !obj.role ||
              !obj.lastname ||
              !obj.seniority
            }
          >
            Add New Worker
          </button>
        </form>
      }
    </div>
  );
};

export default AddNewWorker;