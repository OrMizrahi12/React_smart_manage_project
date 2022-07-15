import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { editOneUser, getUsers } from "./UserSlice";
import ShowAndAddTask from "./userTodo/showAndAddTask";

const EditSingleUser = () => {

    const [_id, setId] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(state => state.userData.users);
    const params = useParams()
    const [obj, setobj] = useState({ name: "", email: "", role: "", id: params.id })

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const sendEtitUser = (e) => {
        e.preventDefault()
        dispatch(editOneUser(obj))
    }


    return (
        <div className="m-5">
            <br />
            <br />
            <div>
                {
                    users.map(item => {
                        return item._id == params._id &&
                            <section key={item._id}
                                className='card shadow p-3 m-2 w-50 mx-auto'
                            >
                                <h1 className="display-4 bg-info">ditails:</h1>
                                <h3>
                                    <span style={{ color: "blue" }} >name: </span>
                                    {item.name}
                                </h3>

                                <h3>
                                    <span style={{ color: "blue" }} >email: </span>
                                    {item.email}
                                </h3>

                                <h3>
                                    <span style={{ color: "blue" }} >Role: </span>
                                    {item.role}
                                </h3>
                                <hr />
                                <ShowAndAddTask _id={item._id} />

                            </section>
                    })
                }
            </div>


            <form className='form-control shadow p-3 w-50 mx-auto m-5'>
                <h1 className='display-3 bg-info'>Edit your User</h1>
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
                    onClick={sendEtitUser}
                    disabled={!obj.email || !obj.name || !obj.role}
                >
                    update User
                </button>
            </form>
            <button
                className="btn btn-dark m-3"
                onClick={() => navigate('/users/')}
            >back
            </button>
        </div>
    )
}

export default EditSingleUser