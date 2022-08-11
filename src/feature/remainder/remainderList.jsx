import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentId } from '../auth/authSlice'
import { deleteRemainder, getReamainder } from './remainderSlice'

const RemainderList = () => {

    const dispatch = useDispatch()
    const userId = useSelector(selectCurrentId)
    const remainders = useSelector(state => state.remainderData.remainder)
    

    useEffect(() => {
        dispatch(getReamainder(userId))
    }, [dispatch])

    const deleteNow = (item) => {
        dispatch(deleteRemainder(item))
    }

  return (
    <div>
        <div>
         <h3 className='display-5' >your remainders</h3>
         <br />
         <div className='col-md-6 mx-auto m-3'>
             <table className="table table-sm table-dark ">
                 <thead>
                     <tr>
                         <th scope="col">remainder name</th>
                         <th scope="col">X</th>
                     </tr>
                 </thead>
                 {
                     remainders.map((item) => {

                         return <tbody key={item._id}>
                             <tr >
                                 <td>{item.remainder}</td>
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
    </div>
  )
}

export default RemainderList