import React, { useState } from 'react'
import CreateProject from '../projects/createProject'
import AddIdeas from '../idea/addIdeas'
import AddMeeting from '../meeting/addMeeting'
import AddReminder from '../remainder/addReminder'

const Organizations = () => {

    const [show1, setShoe1] = useState(false)
    const [show2, setShoe2] = useState(false)
    const [show3, setShoe3] = useState(false)
    const [show4, setShoe4] = useState(false)


    return (
        <div className='container'>
            <div className="btn-group btn-group-toggle m-5 p-3 col-md-6 mx-auto" data-toggle="buttons">
                <label className="btn btn-secondary">
                    <input
                        onClick={() => {
                            setShoe1(!show1)
                            setShoe2(false)
                            setShoe3(false)
                            setShoe4(false)
                        }}
                        type="radio"
                        name="options"
                        id="option1"
                        autoComplete="off"
                    />meeting +
                </label>
                <label className="btn btn-secondary">
                    <input
                        onClick={() => {
                            setShoe2(!show2)
                            setShoe3(false)
                            setShoe1(false)
                            setShoe4(false)
                        }} 
                        type="radio"
                        name="options"
                        id="option2"
                        autoComplete="off"
                    />ideas +
                </label>
                <label className="btn btn-secondary">
                    <input
                        onClick={() => {
                            setShoe3(!show3)
                            setShoe2(false)
                            setShoe1(false)
                            setShoe4(false)
                        }}
                        type="radio"
                        name="options"
                        id="option3"
                        autoComplete="off"
                    />reminder +
                </label>
                <label className="btn btn-secondary">
                    <input
                        onClick={() => {
                            setShoe4(!show4)
                            setShoe3(false)
                            setShoe1(false)
                            setShoe2(false)
                        }} 
                        type="radio"
                        name="options"
                        id="option2"
                        autoComplete="off"
                    />project +
                </label>

                
            </div>
            <section>
                {show1 && <AddMeeting />}
                {show2 && <AddIdeas />}
                {show3 && <AddReminder />}
                {show4 && <CreateProject />}
          
            </section>
        </div>
    )
}

export default Organizations