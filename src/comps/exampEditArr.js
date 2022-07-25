import React, { useState } from 'react'

const ExampEditArr = () => {

    let [taskArr,setTaskArr] = useState([
        {id:1,todo:"go",completed:false},
        {id:2,todo:"sleep",completed:false},
        {id:3,todo:"sleep",completed:false},
        {id:4,todo:"sleep",completed:false},
        {id:5,todo:"sleep",completed:false}
    
    ])

    const edit =(task)=>{
        
        taskArr[task.id-1] = { ...task, completed: task.completed ? false : true }
        setTaskArr([...taskArr])
     console.log(taskArr)
    }
  return (
    <div>
         {
            taskArr.map(item => <section key={item.id}>
                <button
                onClick={()=>{edit(item)}}
                >change</button>
                <p>{item.todo}</p>
                <p>{item.completed ? "true":"false"}</p>
            </section>
        )
         }
    </div>
  )
}

export default ExampEditArr