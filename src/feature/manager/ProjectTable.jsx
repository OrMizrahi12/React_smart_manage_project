import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProjects, deleteProject } from '../projects/projectSlice';
import { useNavigate } from 'react-router-dom';
import { selectCurrentId } from '../auth/authSlice';

const ProjectTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const _id = useSelector(selectCurrentId)
    const projectsList = useSelector(state => state.projectsData.projects)

    useEffect(() => {
        dispatch(getProjects(_id))
    }, [dispatch])

    const deleteNow = (item) => {
        dispatch(deleteProject(item))
    }

    return (
        <div>
            <h3 className='display-5' >Your projects</h3>
            <br />
            <div className='col-md-6 mx-auto m-3'>
                <table className="table table-sm table-dark ">
                    <thead>
                        <tr>
                            <th scope="col">projectName</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    {
                        projectsList.map((item) => {
                            
                                return <tbody key={item._id}>
                                    <tr >
                                        <td>{item.projectName}</td>
                                        <td>
                                            <button
                                                onClick={() => deleteNow(item)}
                                                className='btn btn-outline-danger'>X
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => navigate(`/singleProject/${item._id}`)}
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

export default ProjectTable