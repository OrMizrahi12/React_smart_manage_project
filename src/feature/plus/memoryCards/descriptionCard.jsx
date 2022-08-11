import React, { useState } from 'react'


const DescriptionCard = () => {

    const [show1, setShoe1] = useState(false)
    const [show2, setShoe2] = useState(false)

    return (
        <div className='container'>
            <div className="btn-group btn-group-toggle p-3 col-md-6 mx-auto" data-toggle="buttons">
                <label className="btn btn-secondary">
                    <input
                        onClick={() => {
                            setShoe1(!show1)
                            setShoe2(false)
                        }}
                        type="radio"
                        name="options"
                        id="option1"
                        autoComplete="off"
                    />Description
                </label>
                <label className="btn btn-secondary">
                    <input
                        onClick={() => {
                            setShoe2(!show2)
                            setShoe1(false)

                        }}
                        type="radio"
                        name="options"
                        id="option2"
                        autoComplete="off"
                    />how to play
                </label>



            </div>
            <section>
                {
                    show1 && <section className='border border-soild rounded p-3 col-md-6 mx-auto'>
                        <h5 className='display-6 text-info'>Description</h5>
                        Card memory game
                    </section>
                }
                {
                    show2 && <section className='border border-soild rounded p-3 col-md-6 mx-auto'>
                        <h5 className='display-6 text-info'>how to play</h5>
                        1. Click on <strong className='text-dark'> play</strong> <br />
                        2. <strong className='text-warning'> try</strong> to match the cards according to the colors <br />
                       
                    </section>
                }

            </section>
        </div>
    )
}

export default DescriptionCard