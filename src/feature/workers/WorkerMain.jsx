import React from 'react'
import AddNewWorker from './AddNewWorker'
import WorkerList from './WorkerList'

const WorkerMain = () => {
  return (
    <div>
      <div>
        <div>
          <AddNewWorker />
        </div>
        <br /> 
        <hr />
        <div>
          <WorkerList />
        </div>
      </div>
    </div>
  )
}

export default WorkerMain