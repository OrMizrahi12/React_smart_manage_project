import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentId } from "../auth/authSlice"
import { addNewRemainder } from './remainderSlice'

const AddRemainder = () => {

  const dispatch = useDispatch()
  const userId = useSelector(selectCurrentId)
  const [showAlert, setShoeAlert] = useState(false)
  const [remainder, setRemainer] = useState({
    remainder: "",
    userId: userId
  })
  const sendData = (e) => {
    e.preventDefault()
    dispatch(addNewRemainder(remainder))
    setShoeAlert(true)
  }
  return (
    <div>
      <div className="mb-2 col-md-6 mx-auto shadow p-3 bg-secondary rounded">
        <form>
          <div className='m-3'>before you forgat..</div>
          <textarea
            onChange={e => {
              setRemainer({ ...remainder, remainder: e.target.value })
              setShoeAlert(false)
            }}
            className="form-control">

          </textarea>
          <div className="invalid-feedback">
            Please enter a message in the textarea.
          </div>
          <button
            onClick={sendData}
            className='btn btn-outline-dark m-3 p-3'>
            add remainder
          </button>
        </form>
        {
          showAlert && <div class="alert alert-success" role="alert">
            the new remainder has been successfully added
          </div>

        }
      </div>
    </div>
  )
}

export default AddRemainder