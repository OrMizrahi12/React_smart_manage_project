import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate,Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, logOut } from '../feature/auth/authSlice';

function Navbar1() {
   
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)
    const navigate = useNavigate()
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const exit = () => {
        dispatch(logOut({}))
        navigate('/')
    }
    
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand  onClick={() => navigate('/')} >Smart manage</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {
           token &&  <Nav.Link eventKey={2}>
             <button
              style={{color:'white'}}
              onClick={() => navigate("/workers")} 
              className='btn btn-outline ' >workers
              </button> 
          </Nav.Link>
          }
        {
          token &&   <Nav.Link eventKey={2}>
             <button
               style={{color:'white'}}
              onClick={() => navigate("/manageyourself")} 
              className='btn btn-outline ' >Manage yourself
             </button> 
            </Nav.Link>
        }
         {
           token &&  <Nav.Link eventKey={2}>
             <button
              style={{color:'white'}}
              onClick={() => navigate("/projectlist")} 
              className='btn btn-outline ' >Project
              </button> 
          </Nav.Link>
          }        
          </Nav>
          <Nav>
          {

           !token && <Nav.Link eventKey={2}>
            <button
            style={{color:'white'}}
            onClick={() => navigate("/login")} 
             className='btn btn-outline ' >Login
           </button> 
          </Nav.Link>
         }   
         {

           !token && <Nav.Link eventKey={2}>
          <button
             style={{color:'white'}}
             onClick={() => navigate("/register")} 
             className='btn btn-outline ' >Register
          </button> 
          </Nav.Link>
         }   

            {
               token && <Nav.Link eventKey={2} >
                <button
                    style={{color:'white'}}
                    onClick={exit} 
                    className='btn btn-outline ' >Log out
                    </button> 
                </Nav.Link>
            }
                
             {
               token && <Nav.Link eventKey={2} >
                <button
                    style={{color:'white'}}
                    onClick={() => navigate('/definitions')} 
                    className='btn btn-outline ' >definitions
                    </button> 
                </Nav.Link>
            }
             {
          token &&   <Nav.Link eventKey={2}>
             <button
               style={{color:'white'}}
              onClick={() => navigate("/plus")} 
              className='btn btn-outline-primary ' ><span className='text-danger'>Plus</span> 
             </button> 
            </Nav.Link>
        }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;






























// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCurrentToken, logOut } from '../feature/auth/authSlice';


// const Navbar = () => {
//     const dispatch = useDispatch()
//     const token = useSelector(selectCurrentToken)
//     const navigate = useNavigate()
//     const current = new Date();
//     const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
//     const exit = () => {
//         dispatch(logOut({}))
//         navigate('/home')
//     }
//     // projectlist
    // return (
       
    



        // <div>
        //     {/* navbar navbar-expand bg-dark shadow */}
        //     <nav class="navbar navbar-expand bg-dark shadow">
        //         {
        //             token && <button
        //                 style={{ color: 'white' }}
        //                 onClick={() => navigate('/definitions')}
        //                 className='btn btn-outline m-2'>⚙️
        //             </button>
        //         }
        //         <div className='container'>
        //             {
        //                 !token &&   <button
        //                     style={{ color: 'white' }}
        //                     onClick={() => navigate('/home')}
        //                     className='btn btn-outline m-2'>Home
        //                 </button>
        //             }


        //             <div class="collapse navbar-collapse" id="navbarNavDropdown">
        //                 <ul class="navbar-nav">
        //                     {
        //                         token && <li class="nav-item ">
        //                             <button
        //                                 style={{ color: 'white' }}
        //                                 onClick={() => navigate('/workers')}
        //                                 className='btn btn-outline  m-2'>Add workers
        //                             </button>
        //                         </li>
        //                     }
        //                 </ul>
        //                 {
        //                     token && <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/manageyourself')}
        //                         className='btn btn-outline  m-2'>Manage Yourself
        //                     </button>
        //                 }
        //                 {
        //                     token && <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/createProject')}
        //                         className='btn btn-outline  m-2'>Create project
        //                     </button>
        //                 }

        //                 {
        //                     token && <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/projectlist')}
        //                         className='btn btn-outline  m-2'>Your projects
        //                     </button>
        //                 }
        //             </div>




        //             {
        //                 !token && <li class="nav-item active">
        //                     <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/login')}
        //                         className='btn btn-outline float-end m-2'>Login
        //                     </button>
        //                 </li>
        //             }
        //             {
        //                 !token && <li class="nav-item ">
        //                     <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/register')}
        //                         className='btn btn-outline  m-2'>Register
        //                     </button>
        //                 </li>
        //             }
        //             {
        //                 token && <li class="nav-item ">
        //                     <button
        //                         onClick={exit}
        //                         style={{ color: 'white' }}
        //                         className='btn btn-outline-danger  m-2'>Logout
        //                     </button>
        //                 </li>
        //             }

        //         </div>
        //         <div className='m-2'>{date}</div>
        //     </nav>
        // </div>
    // )
// }

// export default Navbar