import { useDispatch } from 'react-redux';
import workerSlice, { removeworker, deleteWorker } from './workerSlice';
import {useNavigate} from 'react-router-dom'

const WorkerItem = ({ id, name }) => {
    const dispatch = useDispatch();
     const navigate = useNavigate()

    return (
        <section className='shadow p-2 m-3'>
            <button
            className='btn btn-danger float-end'
                onClick={() => dispatch(deleteWorker( id ))}>
                X
            </button>
            <h3>{name}</h3>

            <button
             className='btn btn-warning'
              onClick={()=> navigate(`/workers/${id}`)}>
                see more & edit
            </button>

        </section>
    );
};

export default WorkerItem;