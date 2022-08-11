import { useSelector } from "react-redux"
import {
  selectCurrentUser,
  selectCurrentEmail,
  selectCurrentRegisterDate
} from "../feature/auth/authSlice"

const Definitions = () => {

  const user = useSelector(selectCurrentUser)
  const email = useSelector(selectCurrentEmail)
  const date = useSelector(selectCurrentRegisterDate)

  return (
    <div className="container">
      <div className="col-md-6">
        <h1 className="display-6 p-3 m-3">Definitions ⚙️</h1>
        <table className="table table-dark rounded p-2 m-3 mx-auto">
          <thead>
            <tr>
              <th scope="col">user name</th>
              <th scope="col">email</th>
              <th scope="col">register date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user}</td>
              <td>{email}</td>
              <td>{date}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Definitions