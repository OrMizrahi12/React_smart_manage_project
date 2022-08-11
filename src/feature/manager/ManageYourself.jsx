import IdeasList from "../idea/ideasList"
import MeetingList from "../meeting/meetingList"
import RemainderList from "../remainder/remainderList"
import Organizations from "./organizations"
import ProjectTable from "./ProjectTable"
import WorkerTable from "./WorkerTable"
import { useNavigate } from "react-router-dom"

const ManageYourself = () => {
 
  const navigate = useNavigate()

  return (
    <div className="container">
      <Organizations />
      <hr />
      <WorkerTable />
      <hr />
      <ProjectTable />
      <hr />
      <IdeasList />
      <hr />
      <MeetingList />
      <hr />
      <RemainderList />
      <hr/>
      <button className="btn btn-dark" onClick={()=> navigate(-1)} >back</button>
    </div>

  )
}

export default ManageYourself