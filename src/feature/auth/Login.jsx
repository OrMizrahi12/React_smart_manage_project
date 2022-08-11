import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentId, setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import Loading from "../../matirials/spinner";


const Login = () => {

    const [checkName, setCheckName] = useState("")
    const [checkPwd, setCheckPwd] = useState("")
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation();
    const [err1, setErr1] = useState("")
    const navigate = useNavigate()
    const [person, setPerson] = useState({ user: "", pwd: "" });
    const unSub = person.pwd.length < 5 || person.user.length < 3
    const [spinner,setSpinner] = useState()

    const hendleName = (e) => {
        setPerson({ ...person, user: e.target.value })
        if (e.target.value.length < 3) {
            setCheckName(<p style={{ color: 'red' }} >name to short</p>)
        }
        else {
            setCheckName(<p style={{ color: 'green' }}>good ✅</p>)
        }
    }

    const hendlePwd = (e) => {
        setPerson({ ...person, pwd: e.target.value })
        if (e.target.value.length < 5) {
            setCheckPwd(<p style={{ color: 'red' }}>pass sort</p>)
        }
        else {
            setCheckPwd(<p style={{ color: 'green' }}>good ✅</p>)
        }
    }

    const handleSubmit = async (e) => {
        setSpinner(<Loading />)
        e.preventDefault();
        try {
            const userData = await login({ user: person.user, pwd: person.pwd }).unwrap()
            dispatch(setCredentials({
                ...userData, user: person.user,
                _id: userData.foundUser._id,
                email: userData.foundUser.email,
                date: userData.foundUser.date
            }))
            
            navigate('/welcome')
            setPerson('')
         
        } catch (err) {
            if (!err?.response) {
                setErr1('somting wrong - try again')
                setCheckName(<p>❌</p>)
                setCheckPwd(<p>❌</p>)
            }
        }
    }

    return (
        <div className='bg-ligth bd-placeholder-img '>
            <div className='col-md-6 mx-auto m-5 container'>
                <main className="form-signin col-md-6  mx-auto">
                    <form
                        style={{ backgroundColor: 'silver' }}
                        className='p-3 border border-dark rounded '>
                        <h1 className="h3 mb-3 fw-normal">Please sign in {!unSub && "✔️"}</h1>
                        <div style={{color:'black'}} >user name </div >
                        <div
                            className="form-floating m-1">
                            <input
                                onChange={e => hendleName(e)}
                                type="email"
                                className="form-control"
                                placeholder="email"
                            />
                            
                            <p>{checkName}</p>
                        </div>
                        <div style={{color:'black'}} >Password</div >
                        <div
                            className="form-floating m-1">
                            <input
                                onChange={e => hendlePwd(e)}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                            
                            <p>{checkPwd}</p>
                        </div>
                        <button
                            disabled={unSub}
                            className="w-100 btn btn-lg btn-primary m"
                            onClick={handleSubmit}>log in
                        </button>
                        <br />
                        <p className="m-3"> <Link to={'/register'}>new? register now </Link></p>
                        <p className='m-3' style={{ color: 'red' }}>{err1}</p>
                        {spinner}
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Login
