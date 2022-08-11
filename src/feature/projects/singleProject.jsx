import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { editProject, getProjects } from './projectSlice'
import { selectCurrentId } from '../auth/authSlice'
import { useParams, useNavigate } from 'react-router-dom'

const SingleProject = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const _id = useSelector(selectCurrentId)
    const projectsList = useSelector(state => state.projectsData.projects)
    const projectById = projectsList.filter(item => _id === item.idManager && item._id === params._id)
    const [showFd, setShowFd] = useState(false)
    const [showFb, setShowFb] = useState(false)
    const [showAddE, setShowAddE] = useState(false)
    const [showAddW, setShowAddW] = useState(false)
    const [date, setDate] = useState(null)
    const [budget, setBudget] = useState(null)
    const [addE, setAddE] = useState({ equipmentName: "", price: 100, id: null })
    const [addW, setAddW] = useState({ name: "", id: "" })




    useEffect(() => {
        dispatch(getProjects(_id))
    }, [dispatch])

    const changeProject = (data) => {
        dispatch(editProject({ data, id: params._id,_id }))
    }

    const deleteEquipments = (dataDel) => {

        let temp_ar = projectById.map(item => item.equipment.map(item => item))
        let arr = temp_ar[0]
        let ar = arr.filter(x => x.id !== dataDel.id)
        let data = {
            equipment: ar,
        }
        dispatch(editProject({ data, id: params._id ,_id}))
    }

    const deleteWorker = (dataDel) => {
        let temp_ar = projectById.map(item => item.workers.map(item => item))
        let arr = temp_ar[0]
        let ar = arr.filter(x => x.id !== dataDel.id)
        let data = { workers: ar }
        dispatch(editProject({ data, id: params._id,_id }))
    }

    const addMoreitem = () => {
        let obj = {
            equipmentName: addE.equipmentName,
            price: addE.price,
            id: nanoid()
        }
        let temp_ar = projectById.map(item => item.equipment.map(item => item))
        let arr = temp_ar[0]
        arr.push(obj)
        let data = { equipment: arr }
        dispatch(editProject({ data, id: params._id,_id}))
        obj = {}
    }

    const addMoreWorker = () => {
        let obj = {
            name: addW.name,
            id: nanoid()
        }
        let temp_ar = projectById.map(item => item.workers.map(item => item))
        let arr1 = temp_ar[0]
        arr1.push(obj)
        let data = { workers: arr1 }
        dispatch(editProject({ data, id: params._id, _id }))
        obj = {}
    }

    return (
        <div className='container col-md-6'>
           
            <button className='btn btn-outline-ligth text-light m-3 '
                onClick={() => navigate(-1)}>Go back
            </button>
            <h1 className='display-3 p-4 m-4'>single project</h1>
            {
                projectById.map((item) => {
                    return <div key={item._id}>
                        <div className='shadow m-3 col-md-12 p-3 mx-auto bg-secondary rounded'>
                            <h4 className='display-4' >- {item.projectName} -</h4>
                            <hr />
                            <div>
                                <button
                                    className='btn btn-outline-dark float-end'
                                    onClick={() => setShowFb(!showFb)}>
                                    ⚙️
                                </button>
                                <h4>
                                    Budget:
                                    <span
                                        style={{ color: 'brown' }}>
                                        {item.projectBudget}$
                                    </span>
                                </h4>
                                <br />
                                {
                                    showFb &&
                                    <section className='float border border-soild mx-auto p-3 rounded'>
                                        <input
                                            onChange={e => setBudget(e.target.value)}
                                            type='number'
                                            className='form-control w-75 mx-auto'
                                        />
                                        <button
                                            onClick={() => changeProject({ projectBudget: budget })}
                                            className='btn btn-outline-dark m-2'>
                                            change
                                        </button>
                                    </section>
                                }
                            </div>
                            <hr />
                            <div>
                                <button
                                    className='btn btn-outline-dark float-end'
                                    onClick={() => setShowFd(!showFd)}>
                                    ⚙️
                                </button>
                                <h4>
                                    End date:
                                    <span
                                        style={{ color: 'brown' }}>
                                        {item.endDate}
                                    </span>
                                </h4>
                                <br />
                                {
                                    showFd &&
                                    <section className='float border border-soild col-md-12 mx-auto p-3 rounded'>
                                        <input
                                            onChange={e => setDate(e.target.value)}
                                            type='date'
                                            className='form-control w-75 mx-auto'
                                        />
                                        <button
                                            onClick={() => changeProject({ endDate: date })}
                                            className='btn btn-outline-dark m-2'>
                                            change
                                        </button>
                                    </section>
                                }
                            </div>
                        </div>
                        <div className='shadow m-3 p-3 col-md-12 mx-auto bg-secondary rounded'>
                            <h6 className='display-6 m-3 p-3'>project worker</h6>
                            <button
                                onClick={() => setShowAddW(!showAddW)}
                                className='btn btn-outline-dark mx-auto m-3'>
                                +
                            </button>
                            {
                                showAddW &&
                                <section className='float border border-soild m-3 col-md-12 mx-auto p-3 rounded'>
                                    <input
                                        placeholder='name'
                                        onChange={e => setAddW({ ...addW, name: e.target.value })}
                                        type='text'
                                        className='form-control w-75 mx-auto m-2'
                                    />
                                    <button
                                        onClick={() => addMoreWorker()}
                                        className='btn btn-outline-dark m-2'>
                                        add
                                    </button>
                                </section>
                            }
                            <table className='table table-sm table-dark col-md-12 mx-auto rounded shadow'>
                                <thead>
                                    <tr>
                                        <th scope="col">worker name</th>
                                        <th scope="col">delete</th>
                                    </tr>
                                </thead>
                                {
                                    item.workers.map(
                                        item =>
                                            <tbody key={item._id}>
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => deleteWorker(item)}
                                                            className='btn btn-outline-danger float-end me-5'>
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                    )
                                }
                            </table>
                        </div>
                        <div className='shadow m-3 p-3 col-md-12 mx-auto bg-secondary rounded'>
                            <h6 className='display-6 m-3 p-3'>equipments</h6>
                            <button
                                onClick={() => setShowAddE(!showAddE)}
                                className='btn btn-outline-dark mx-auto m-3'>
                                +
                            </button>
                            {
                                showAddE &&
                                <section className='float border border-soild m-3 col-md-12 mx-auto p-3 rounded'>
                                    <input
                                        placeholder='name'
                                        onChange={e => setAddE({ ...addE, equipmentName: e.target.value })}
                                        type='text'
                                        className='form-control w-75 mx-auto m-2'
                                    />
                                    <input
                                        placeholder='$'
                                        onChange={e => setAddE({ ...addE, price: e.target.value })}
                                        type='number'
                                        className='form-control w-75 mx-auto m-2'
                                    />
                                    <button
                                        onClick={() => addMoreitem()}
                                        className='btn btn-outline-dark m-2'>
                                        add
                                    </button>
                                </section>
                            }
                            <table className='table table-sm table-dark col-md-12 mx-auto rounded shadow'>
                                <thead>
                                    <tr>
                                        <th scope="col">name</th>
                                        <th scope="col">price $</th>
                                        <th scope="col">delete</th>
                                    </tr>
                                </thead>
                                {
                                    item.equipment.map(
                                        item =>
                                            <tbody key={item.id}>
                                                <tr>
                                                    <td>{item.equipmentName}</td>
                                                    <td>{item.price}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => deleteEquipments(item)}
                                                            className='btn btn-outline-danger float-left'>
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                    )
                                }
                            </table>
                        </div>
                        <div>
                        </div>
                    </div>
                }
                )
            }
            <button className="btn btn-dark m-3" onClick={() => navigate(-1)} >back</button>
        </div>
    )
}

export default SingleProject