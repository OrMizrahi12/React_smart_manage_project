import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentId } from "../auth/authSlice"
import { addNewIdeas } from './ideaSlice'

const AddIdeas = () => {

    const dispatch = useDispatch()
    const userId = useSelector(selectCurrentId)
    const [showAlert, setShoeAlert] = useState(false)
    const [idea, setIdea] = useState({
        idea: "",
        userId: userId
    })

    const sendData = (e) => {
        e.preventDefault()
        dispatch(addNewIdeas(idea))
        setShoeAlert(true)
    }
    return (
        <div>
            <div className="mb-2 col-md-6 mx-auto shadow p-3 bg-secondary rounded">
                <form>
                    <div className='m-3'>What is your mind?</div>
                    <textarea
                        onChange={e => {
                            setIdea({ ...idea, idea: e.target.value })
                            setShoeAlert(false)
                        }}
                        className="form-control">
                    </textarea>
                    <button
                        onClick={sendData}
                        className='btn btn-outline-dark m-3 p-3'>
                        add ideas
                    </button>
                    {
                        showAlert && <div class="alert alert-success" role="alert">
                            the new idea has been successfully added
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default AddIdeas