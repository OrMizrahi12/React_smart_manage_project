import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteMeetings, getMeetings } from './meetingSlice'
import { selectCurrentId } from '../auth/authSlice'

const MeetingList = () => {

    const dispatch = useDispatch()
    const userId = useSelector(selectCurrentId)
    const meetings = useSelector(state => state.meetingData.meetings)

    useEffect(() => {
        dispatch(getMeetings(userId))
    }, [dispatch])

    const deleteNow = (item) => {
        dispatch(deleteMeetings(item))
    }

    return (
        <div>
         
            <h3 className='display-5' >your meeting</h3>
            <br />
            <div className='col-md-6 mx-auto m-3'>
                <table className="table table-sm table-dark ">
                    <thead>
                        <tr>
                            <th scope="col">meeting name</th>
                            <th scope="col">date</th>
                            <th scope="col">time</th>
                            <th scope="col">X</th>
                        </tr>
                    </thead>
                    {
                        meetings.map((item) => {

                            return <tbody key={item._id}>
                                <tr >
                                    <td>{item.place}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteNow(item)}
                                            className='btn btn-outline-danger'>X
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

export default MeetingList