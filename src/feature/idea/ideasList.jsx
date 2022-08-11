import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentId } from '../auth/authSlice';
import { deleteIdeas, getIdeas } from './ideaSlice';

const IdeasList = () => {

  const dispatch = useDispatch();
  const _id = useSelector(selectCurrentId)
  const ideas = useSelector(state => state.ideaData.ideas)

  useEffect(() => {
    dispatch(getIdeas(_id))
  }, [dispatch])

  const deleteNow = (item) => {
    dispatch(deleteIdeas(item))
  }

  return (
    <div>

      <h3 className='display-5' >your ideas</h3>
      <br />
      <div className='col-md-6 mx-auto m-3'>
        <table className="table table-sm table-dark ">
          <thead>
            <tr>
              <th scope="col">your idea</th>
              <th scope="col">X</th>
            </tr>
          </thead>
          {
            ideas.map((item) => {

              return <tbody key={item._id}>
                <tr >
                  <td>{item.idea}</td>
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

export default IdeasList