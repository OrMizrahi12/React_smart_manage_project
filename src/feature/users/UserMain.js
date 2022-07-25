import React from 'react'
import AddNewUser from './AddNewUser'
import UserList from './UserList'

const UserMain = () => {
  return (
    <div>
      <div>
        <div style={{ width: "50%", float: 'right' }}>
          <AddNewUser />
        </div>/
        <div style={{ width: "50%", float: 'left' }}>
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default UserMain