import { useSelector } from "react-redux"
import { selectCurrentUser } from "./authSlice"
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

    const navigate = useNavigate()
    const user = useSelector(selectCurrentUser)
    const content = (

        <section className="container col-md-6">
            <h1 className="display-3 m-5 p-5">Hello, {user}! </h1>
            <h3 className="display-5">nice to see you</h3>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button
                className="btn btn-outline-primary bg-dark "
                onClick={() => navigate('/manageyourself')}
            >Manager, manage yourself
            </button>
        </section>
    )

    return content
}
export default Welcome