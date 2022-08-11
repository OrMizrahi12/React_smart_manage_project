import { addNewMeetings } from "./meetingSlice"
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentId } from "../auth/authSlice"
import { useState } from "react"

const AddMeeting = () => {


  const dispatch = useDispatch()
  const userId = useSelector(selectCurrentId)
  const [meeting, setMeeting] = useState({
    place: "",
    time: "",
    date: "",
    userId: userId
  })
  const [showAlert, setShoeAlert] = useState(false)

  const sendData = (e) => {
    e.preventDefault()
    dispatch(addNewMeetings(meeting))
    setShoeAlert(true)

  }

  return (
    <div>
      <form className="mb-2 col-md-6 mx-auto shadow p-3 bg-secondary rounded">
        <div>place</div>
        <input
          onChange={e => {
            setMeeting({ ...meeting, place: e.target.value })
            setShoeAlert(false)
          }}
          type="text"
          className='form-control m-2'
        />
        <div>Date</div>
        <input
          onChange={e => {
            setMeeting({ ...meeting, date: e.target.value })
            setShoeAlert(false)
          }}
          type="date"
          className='form-control m-2'
        />
        <div>Time</div>
        <input
          onChange={e => {
            setMeeting({ ...meeting, time: e.target.value })
            setShoeAlert(false)
          }}
          type="time"
          className='form-control m-2'
        />

        <button
          className='btn btn-outline-dark m-3'
          onClick={sendData}>
          submit
        </button>
        {
          showAlert && <div className="alert alert-success" role="alert">
            the new meeting has been successfully added
          </div>

        }
      </form>
    </div>
  )
}

export default AddMeeting