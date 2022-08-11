import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWorkers, deleteworker } from '../workers/WorkerSlice';
import { useNavigate } from 'react-router-dom';
import { selectCurrentId } from '../auth/authSlice';

const WorkerTable = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const _id = useSelector(selectCurrentId)
    const workers = useSelector(state => state.workerData.workers)
    
    const deleteNow = (del) => {
        dispatch(deleteworker(del))
        
    }

    useEffect(() => {
        dispatch(getWorkers(_id))
    }, [dispatch])

    return (
        <div>
            <h3 className='display-5' >Your worker</h3>
            <br />
            <div className='col-md-6 mx-auto m-3'>
                <table className="table table-sm table-dark ">
                    <thead>
                        <tr>    
                            <th scope="col">first name</th>
                            <th scope="col">delete</th>
                            <th scope="col">edit</th>
                        </tr>
                    </thead>
                    {
                        workers.map((item) => {
                         
                                return <tbody key={item._id}>
                                    <tr >    
                                        <td>{item.firstname}</td>   
                                        <td>
                                            <button
                                                onClick={() => deleteNow(item)}
                                                className='btn btn-outline-danger'>X
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => navigate(`/workers/${item._id}`)}
                                                className='btn btn-outline-warning'>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default WorkerTable