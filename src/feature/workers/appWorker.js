import {useState,use, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getWorkers } from './workerSlice';
import NewWorkerForm from './newWorkerForm';
import WorkerList from './workerList';
import { addworker } from './workerSlice';


function AppWorker() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAction = () => {
    if(text.trim().length) {
      dispatch(addworker({text}));
      setText('');
    }
  }
  useEffect(()=>{
    dispatch(getWorkers())
  },[dispatch])

  return (
    <div className='App'>
      <NewWorkerForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      <WorkerList />
    </div>
  );
}

export default AppWorker