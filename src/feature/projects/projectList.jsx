import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject, getProjects } from './projectSlice'
import { selectCurrentId } from '../auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProjectList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const _id = useSelector(selectCurrentId)
    const projectsList = useSelector(state => state.projectsData.projects)
    const [result, setResult] = useState("")

    useEffect(() => {
        dispatch(getProjects(_id))
    }, [dispatch])


    return (
        <div className='container'>
            <h1 className='display-4 p-3 m-2'>Your projects are right here .</h1>
            <input
                type={Text}
                onChange={e => setResult(e.target.value)}
                placeholder='search by name...'
                className='form-control col-md-6 w-50 m-5 mx-auto border border-dark  '
        />
            
            <br />
            <div className='col-md-6 mx-auto m-5'>
                <div className='row mx-auto'>
                    {
                        projectsList.map((item) => {
                            if (item.projectName.includes(result))
                                return <Card
                                    className='mx-auto shadow m-3 p-3 mx-auto rounded'
                                    key={item._id}
                                    style={{ width: '18rem', backgroundColor: 'silver' }}>
                                    <Card.Img variant="top" src="https://www.hon.co.il/wp-content/uploads/2019/04/%D7%A2%D7%A1%D7%A7%D7%99%D7%9D-480x320.png" />
                                    <Card.Body>
                                        <Card.Title className='text-dark'>{item.firstname}</Card.Title>
                                        <Button
                                            onClick={() => navigate(`/singleProject/${item._id}`)}
                                            variant="dark">
                                            see more & edit
                                        </Button>
                                        <button
                                            className='btn btn-danger m-1'
                                            onClick={() => dispatch(deleteProject(item))}
                                        >X
                                        </button>
                                    </Card.Body>
                                </Card>
                        }
                        )
                    }
                </div>
                {
                    projectsList.length < 1 && <h1
                     className='display-3 font-weight-light'>
                      You have no projects yet
                    </h1>
                }
                <button className="btn btn-dark m-3" onClick={() => navigate(-1)} >back</button>
            </div>
        </div>
    )
}

export default ProjectList