import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser, selectCurrentToken, selectCurrentId } from "../feature/auth/authSlice"
const Home = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  const navigate = useNavigate()
  return (
    <div>
      <h1 className='display-4 m-3 p-2' >{token ? `hello again ${user}!` : "hello, manager! Let's get to know you better"}</h1>
      <br />
      <br />
      <br />
      <br />
      <section>
        <p>Being a manager is not that easy. It's hard and stressful.<br />
          There are so many tasks and chores - especially when your employees are out of order.<br />
          Upgrade your management one step further and register now - it's free!</p>
      </section>
      <br />
      <br />
      <br />
      {
        !token && <div>
          <button
            onClick={() => navigate('/login')}
            className='btn btn-outline-primary bg-dark m-3'>login
          </button>
          <button
            onClick={() => navigate('/register')}
            className='btn btn-outline-primary bg-dark'>register
          </button>
        </div>
      }
      {
        token && <div> 
         <p className='display-6 m-3'>feeling bored?</p>    
       <button
        style={{color:'white'}}
       onClick={() => navigate("/plus")} 
       className='btn btn-outline-primary bg-dark ' ><span className='text-danger'>Plus</span> 
      </button> 
      </div>
      }

    </div>
  )
}
export default Home