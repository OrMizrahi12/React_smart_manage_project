import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWorkers, deleteworker } from './WorkerSlice';
import { selectCurrentId, selectCurrentUser } from '../auth/authSlice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const WorkerList = () => {


    const [result, setResult] = useState("")
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
        <div className='container'>
            <br />
            <br />
            <input
                type={Text}
                onChange={e => setResult(e.target.value)}
                placeholder='search by name...'
                className='form-control w-50 mx-auto  border border-dark  '
            />
            <br />

            <div className='col-md-6 mx-auto m-5'>
                <div className='row mx-auto'>
                    {
                        workers && workers.map(
                            (item) => {
                                if (item.firstname.includes(result))
                                    return <Card
                                        className='mx-auto shadow m-3 p-3 mx-auto rounded'
                                        key={item._id}
                                        style={{ width: '18rem', backgroundColor: 'silver' }}>
                                        <Card.Img variant="top" src="https://www.dgdigitaldesigner.com/wp-content/uploads/2022/05/shutterstock_1841357653-Converted-01-2048x2048.png" />
                                        <Card.Body>
                                            <Card.Title className='text-dark'>{item.firstname}</Card.Title>
                                            <Button
                                                onClick={() => navigate(`/workers/${item._id}`)}
                                                variant="dark">
                                                see more & edit
                                            </Button>
                                            <button
                                                className='btn btn-danger m-1'
                                                onClick={() => deleteNow(item)}
                                            >X
                                            </button>
                                        </Card.Body>
                                    </Card>
                            })}
                </div>
                {
                    workers.length < 1 && <h1
                        className='display-3 font-weight-light'>
                        You haven't added employees yet
                    </h1>
                }
            </div>
            <button onClick={() => navigate(-1)} className='btn btn-dark m-3'>back</button>
        </div>
    )
}

export default WorkerList