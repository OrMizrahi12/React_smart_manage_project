
import { useRef, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from "axios";
import Loading from "../../matirials/spinner";




const Register = () => {

    
    const [spinner,setSpinner] = useState()
    const [checkName, setCheckName] = useState(" ")
    const [checkPwd, setCheckPwd] = useState(" ")
    const passs = useRef()
    const [confirmMassage, setConfirmMassage] = useState(" ")
    const [checkEmail, setCheckEmail] = useState(" ")
    const [err1, setErr1] = useState(" ")
    const navigate = useNavigate()
    const [person, setPerson] = useState({ user: "", pwd: "", email: "" });
    const [blockMassage, setBlockMassage] = useState()
    const unSub = person.pwd.length < 5 ||
        person.user.length < 2 ||
        !person.email.includes('@' && '.com') ||
        person.pwd !== passs.current.value

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

    const hendleEmail = (e) => {
        setPerson({ ...person, email: e.target.value })
        if (!e.target.value.includes('@' && 'com')) {
            setCheckEmail(<p style={{ color: 'red' }}>email not vaild</p>)
        }
        else {
            setCheckEmail(<p style={{ color: 'green' }}>good ✅</p>)
        }
    }

    const confirmPwd = () => {
        if (passs.current.value !== person.pwd) {
            setConfirmMassage(<p style={{ color: 'red' }}>password not much</p>)
        }
        else {
            setConfirmMassage(<p style={{ color: 'green' }}>password much ✅</p>)
        }
    }

    const handleSubmit = async (e) => {
        setSpinner(<Loading />)
        e.preventDefault();
        try {
            const response = await axios.post("https://serverprojec.herokuapp.com/register", person)
            setPerson('')
            navigate('/login')
        } catch (err) {
            setBlockMassage(
                <p style={{ color: 'red' }}>
                    the user is exsist! <br />
                    try another email and username.
                </p>
            )
        }
    }

    return (
        <div className='bg-ligth bd-placeholder-img'>
            <div className='col-md-6 mx-auto m-5 container'>
                <main className="form-signin col-md-6 mx-auto">
                    <form
                        style={{ backgroundColor: 'silver' }}
                        className='p-3 border border-dark rounded col-sm p-3'>

                        <h1 className="h3 mb-3 fw-normal">{!unSub ? "great ✔️" : "Complete all steps"}</h1>
                        <div style={{color:'black'}} >user name </div>
                        <div className="form-floating">
                            <input
                                onChange={e => hendleName(e)}
                                type="email"
                                className="form-control"
                                placeholder="email"
                            />
                            
                            <p>{checkName}</p>
                        </div>
                        <div style={{color:'black'}}>email</div>
                        <div className="form-floating">
                            <input
                                onChange={e => hendleEmail(e)}
                                type="email"
                                className="form-control"
                                placeholder="email"
                            />

                            <p>{checkEmail}</p>
                        </div>
                        <div style={{color:'black'}}>Password</div>
                        <div
                            className="form-floating">
                            <input
                                onChange={e => hendlePwd(e)}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                            <p>{checkPwd}</p>
                        </div>
                        <div style={{color:'black'}}>confirm Password</div>
                        <div
                            className="form-floating ">
                            <input
                                ref={passs}
                                onChange={confirmPwd}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                            <p>{confirmMassage}</p>
                        </div>

                        <button
                            disabled={unSub}
                            className="w-100 btn btn-lg btn-primary m"
                            onClick={handleSubmit}>Register
                        </button>
                        <p className='m-3' style={{ color: 'red' }}>{err1}</p>
                        {blockMassage}
                        <p><Link to={'/login'}>have an accunt? log in</Link></p>
                        {spinner}
                    </form>
                </main>
                {err1}
            </div>
        </div>
    )
}

export default Register