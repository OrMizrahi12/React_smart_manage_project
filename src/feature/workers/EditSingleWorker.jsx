import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ShowAndAddTask from "./workerTodo/showAndAddTask";
import { selectCurrentId } from "../auth/authSlice";
import { editOneWorker, getWorkers } from "./WorkerSlice";


const EditSingleWorker = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const _id = useSelector(selectCurrentId)
    const workers = useSelector(state => state.workerData.workers);
    const [hideForm, setHideForm] = useState(false)
    const [obj, setobj] = useState({
        firstname: null,
        lastname: null,
        email: null,
        role: null,
        userId: _id,
        seniority: null,
        idWorker: params._id
    })

    useEffect(() => {
        dispatch(getWorkers(_id));
    }, [dispatch])

    const sendEtitWorker = (e) => {
        e.preventDefault()
        dispatch(editOneWorker(obj))
    }

    return (
        <div className="container">
            <br />
            {
                workers.map(item => item._id === params._id &&
                    <h1
                        key={item._id}
                        className='display-5 m-3 border-bottom text-light '>
                        youe worker, {item.firstname}
                    </h1>
                )
            }
            <br />
            <br />
            <div>
                <h1 className="display-5 m-3 border-ligth">ditails:</h1>
                {
                    workers.map(item => {
                        return item._id === params._id && <section key={item._id}>
                            <section
                                style={{ backgroundColor: 'silver', color: 'black' }}
                                className='card shadow p-3 m-2 col-md-6 mx-auto'
                            >
                                <h3>
                                    <span style={{ color: 'blue' }} >first name: </span>
                                    {item.firstname}
                                </h3>
                                <h3>
                                    <span style={{ color: "blue" }} >last name: </span>
                                    {item.lastname}
                                </h3>
                                <h3>
                                    <span style={{ color: "blue" }} >role: </span>
                                    {item.role}
                                </h3>
                                <h3>
                                    <span style={{ color: "blue" }} >email: </span>
                                    {item.email}
                                </h3>
                                <h3>
                                    <span style={{ color: "blue" }} >seniority: </span>
                                    {item.seniority}
                                </h3>
                                <hr />
                                <br />
                                <button
                                    onClick={() => setHideForm(!hideForm)}
                                    className="btn btn-outline-dark">Edit user
                                </button>
                                {
                                    hideForm && <form className='form-control shadow p-3 col-md-12  mx-auto m-3'>

                                        <div className="alert alert-primary" role="alert">
                                            <p><strong>Dont worry</strong> <br />
                                                Even if you change only one value -
                                                everything else will be preserved</p>
                                        </div>
                                        <div >first name</div>
                                        <input
                                            className='form-control'
                                            type={Text}
                                            placeholder={item.firstname}
                                            onChange={e => setobj({ ...obj, firstname: e.target.value })}
                                        />
                                        <div>last name</div>
                                        <input
                                            className='form-control'
                                            type={Text}
                                            placeholder={item.lastname}
                                            onChange={e => setobj({ ...obj, lastname: e.target.value })}
                                        />
                                        <div>email:</div>
                                        <input
                                            className='form-control'
                                            placeholder={item.email}
                                            type={Text}
                                            onChange={e => setobj({ ...obj, email: e.target.value })}
                                        />
                                        <div htmlFor="postContent">role:</div>
                                        <input
                                            className='form-control'
                                            placeholder={item.role}
                                            type={Text}
                                            onChange={e => setobj({ ...obj, role: e.target.value })}
                                        />
                                        <div htmlFor="postContent">seniority:</div>
                                        <input
                                            className='form-control'
                                            placeholder={item.seniority}
                                            type="number"
                                            onChange={e => setobj({ ...obj, seniority: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            className='btn btn-outline-success m-3'
                                            onClick={sendEtitWorker}
                                        >
                                            update Worker
                                        </button>
                                    </form>
                                }
                            </section>
                            <hr />
                            <section className="col-md-6 mx-auto ">
                                <ShowAndAddTask _id={item._id} />
                            </section>
                            <hr />
                        </section>
                    })
                }
            </div>

            <button onClick={()=> navigate(-1)} className='btn btn-dark m-3'>back</button>
        </div>
    )
}

export default EditSingleWorker