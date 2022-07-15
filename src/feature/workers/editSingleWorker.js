import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {useParams,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { editOneWorker, getWorkers } from "./workerSlice";


const EditSingleWorker = () => {
    const dispatch =useDispatch()
    const navigate = useNavigate()
    
    const workers = useSelector(state => state.workerData.workers);

    useEffect(()=>{
        dispatch(getWorkers())
      },[dispatch])
    let params = useParams()
    const [obj, setobj] = useState({ name: "", email: "", role: "" ,id:params.id})

    const sendEtitWorker  = (e)=> {
        e.preventDefault()
        dispatch(editOneWorker(obj))
    }
   

    return (
        <div>

            <div>
                {
                    workers.map(item=>{
                     return item.id == params.id && <section>
                        Name:  {item.name} <br />
                        Email:  {item.email} <br />
                        Role:  {item.role} <br />
                        Uniq ID: {item._id}
                        </section>
                    })
                }
            </div>
            <h1 className='display-3'>Edit your worker</h1>
            <form className='form-control shadow p-3 w-50 mx-auto m-5'>
                <label htmlFor="postTitle">name</label>
                <input
                    className='form-control'
                    type={Text}
                    placeholder="name"
                    onChange={e => setobj({ ...obj, name: e.target.value })}
                />
                <label htmlFor="postContent">email:</label>
                <input
                    className='form-control'
                    type={Text}
                    onChange={e => setobj({ ...obj, email: e.target.value })}
                />
                <label htmlFor="postContent">role:</label>
                <input
                    className='form-control'
                    type={Text}
                    onChange={e => setobj({ ...obj, role: e.target.value })}
                />
                <button
                    type="button"
                    className='btn btn-success m-3'
                    onClick={sendEtitWorker}
                >
                    update worker
                </button>
               
            </form>

            <button
            onClick={()=> navigate('/workers/')} 
            >back
            </button>
        </div>
    )
}

export default EditSingleWorker