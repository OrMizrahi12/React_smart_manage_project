import { useSelector } from 'react-redux';
import WorkerItem from './workerItem';

const WorkerList = () => {
    const workers = useSelector(state => state.workerData.workers);

  return (
    <ul>
      {workers.map((worker) => (
        <WorkerItem
          key={worker.id}
          {...worker}
        />
       
      ))}
    </ul>
  );
};

export default WorkerList;