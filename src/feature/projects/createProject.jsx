import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { selectCurrentId, selectCurrentUser } from '../auth/authSlice';
import { addItem, deleteSingleItem } from '../manager/countPriceSlice';
import { addNewProject } from './projectSlice';


function CreateProject() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const _id = useSelector(selectCurrentId)
    const totlaPrice = useSelector(state => state.totalP)
    const workers = useSelector(state => state.workerData.workers)
    const [val, setVal] = useState([])
    const [person, setPerson] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [createPerson, setCreatePerson] = useState({})
    const [project, setProject] = useState({
        projectName: "",
        workers: [],
        projectExplain: "",
        projectBudget: 0,
        endDate: null,
        equipment: [],
        idManager: _id,
        correctBudget: null

    })

    const [equipment1, setEquipment1] = useState({
        equipmentName: "",
        price: 0,
        idUniq: 0
    })
    const canSave =
        !project.projectName ||
        !project.workers ||
        !project.projectExplain ||
        !project.projectBudget ||
        !project.equipment ||
        !project.endDate

    let overdraft;
    let overDraftMsg;
    let count = 0;

    useEffect(() => {
        totlaPrice.forEach(x => {
            if (totlaPrice) {
                count += parseInt(x.price)
            }
        });
        setVal(count)
        setProject({
            ...project,
            equipment: totlaPrice,
            correctBudget: count
        })

    }, [totlaPrice])



    const inputBudget = (e) => {
        setProject({
            ...project,
            projectBudget: e.target.value
        })
    }

    const getPerson = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCreatePerson({ name: value && value, id: nanoid() })
            setPerson([...person, createPerson])
            setProject({ ...project, workers: person })
        }
        else {
            let arr = person.filter(x => x.name != value)
            setPerson(arr)
            setProject({ ...project, workers: person })
        }
    }

    const addEquipment = () => {
        dispatch(addItem(equipment1.equipmentName, equipment1.price))
    }

    const sendProject = () => {
        dispatch(addNewProject(project))
        setShowAlert(!showAlert)
    }

    if (val > project.projectBudget) {
        overdraft = project.projectBudget - val;
        overDraftMsg =
            <div
                className="alert alert-danger"
                role="alert">
                (!) You exceed the budget by {overdraft} dollars
            </div>
    }

    return (
        <div className="">
            <h3 className='display-5 m-4' >Plan your next project</h3>
            <h3 className='display-6 m-4' >It takes exactly 6 easy steps.</h3>

            <div className='form-control col-md-6 m-5 mx-auto p-3' style={{ backgroundColor: 'silver' }}>
                <div className='shadow p-3 bg-secondary rounded m-3'>
                    <h2 className='display-6 m-3'>1) project name</h2>
                    <input
                        type='text'
                        className='form-control'
                        onChange={e => setProject({
                            ...project,
                            projectName: e.target.value
                        })}
                    />
                </div>

                <div className='shadow p-3 bg-secondary rounded m-3'>
                    <h2 className='display-6 m-3'>2)Please describe the project</h2>
                    <div className="input-group">
                        <span className="input-group-text">what your project?</span>
                        <textarea
                            placeholder='write here...'
                            onChange={e => setProject({
                                ...project,
                                projectExplain: e.target.value
                            })}
                            className="form-control"
                            aria-label="With textarea"
                        />
                    </div>
                </div>

                <div className='shadow p-3 bg-secondary rounded m-3' >
                    <h2 className='display-6 m-3'>3)What is the project budget?</h2>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <span style={{
                            backgroundColor:
                                project.projectBudget > 100 ? 'red' : 'green'
                        }} className="input-group-text">{project.projectBudget}
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            aria-label="Dollar amount (with dot and two decimal places)"
                            onChange={e => inputBudget(e)}
                        />
                    </div>
                </div>

                <div className='shadow p-3 bg-secondary rounded m-3' >
                    <h2 className='display-6 m-3'>4)What is the finale date?</h2>
                    <input
                        onChange={e => setProject({
                            ...project,
                            endDate: e.target.value
                        })}
                        className='form-control'
                        type="date"
                    />

                </div>

                <div className='shadow p-3 bg-secondary rounded m-3'>
                    <h2 className='display-6 m-3'>4) choose your workers</h2>
                    {
                        workers.map(x => {
                            if (_id === x.userId)
                                return <section className=' form-check m-2'
                                    key={x._id}>
                                    <input
                                        className="form-check-input p-3"
                                        type="checkbox"
                                        value={x.firstname}
                                        onChange={getPerson}
                                    />
                                    <hr />
                                    <h6 className="">{x.firstname}</h6>
                                </section>
                        })
                    }
                </div>
                <div className='shadow p-3 bg-secondary rounded m-3' >
                    <h2 className='display-6 m-3'>4)What is the equipment you meed?</h2>
                    <label>name</label>
                    <input
                        onChange={e => setEquipment1({
                            ...equipment1,
                            equipmentName: e.target.value
                        })}
                        className='form-control'
                        type="text"
                    />
                    <label>price</label>
                    <input
                        onChange={e => setEquipment1({
                            ...equipment1,
                            price: e.target.value
                        })}
                        className='form-control'
                        type="number"
                    />
                    <button
                        onClick={addEquipment}
                        className='btn btn-outline-dark m-3'>
                        add item
                    </button>
                    {overDraftMsg}
                    {
                        <table className='table table-sm table-dark' >
                            <tbody>
                                <tr>
                                    <td>name</td>
                                    <td>price</td>
                                    <td>delet</td>
                                </tr>
                                {
                                    totlaPrice.map((x) => <tr key={x.id}>
                                        <td>{x.equipmentName}</td>
                                        <td>{x.price}</td>
                                        <td>
                                            <button
                                                onClick={() => dispatch(deleteSingleItem({ idDel: x.id }))}
                                                className='btn btn-outline-danger'
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>

                                    )
                                }
                            </tbody>
                        </table>
                    }
                </div>
                {
                    showAlert && <div className="alert alert-success m-3" role="alert">
                        <h4 className="alert-heading">Well done!</h4>
                        <p>your new project is added!</p>
                        <button
                            onClick={() => navigate('/projectlist')}
                            className='btn btn-outline-dark m-3'>
                            go to your projects
                        </button>
                        <hr />
                        <p className="mb-0">Whenever you need to, be sure to use margin
                            utilities to keep things nice and tidy.
                        </p>
                    </div>
                }
                <button
                    disabled={canSave}
                    onClick={sendProject}
                    className='btn btn-success' >send project
                </button>
            </div>
        </div >
    );
}

export default CreateProject;