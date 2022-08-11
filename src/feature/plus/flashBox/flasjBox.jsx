import {  uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import DescriptionBox from './descriptionBox';
import './game.css'

const FlasjBox = () => {

    let arrNum = []
    let arrColor = ['black', 'blue', 'black'];
    let timer;
    let count = 0;
    let number = 0
    let temp_ar = []
    
    const navigate = useNavigate()
    const [speed, setSpeed] = useState(3000)
    const [level, setLevel] = useState(1)
    const [can,setCan]=useState(true)

    const play = () => {

        setCan(true)
        temp_ar = []
        number = 0
        arrNum = []
        for (let i = 0; i < 16; i++) {
            let random = Math.floor(Math.random() * 15)
            arrNum.push(random)

        }
        for (let i = 0; i < 16; i++) {
            document.querySelector(`#btn${i}`).style.backgroundColor = 'black'
        }
        clearInterval(timer)
        timer = setInterval(runOnColor, speed)
    }

    const runOnColor = () => {
        count++
        
        for (let i = 0; i < arrNum.length; i++) {

            document.querySelector(`#btn${arrNum[i]}`).style.backgroundColor = arrColor[count]
            document.querySelector("#id_h1").innerHTML = ''
        }
        if (count == arrColor.length) {
            count = 0   
            clearInterval(timer)
            for (let i = 0; i < 16; i++) {

                document.querySelector(`#btn${i}`).style.backgroundColor = 'black'
            }
        }

    }


    const cheakResult = (num) => {

        let ar = uniq(arrNum)

        if (number === 0) {
            
            clearTimeout(timer)
        }
        number += 1

        let ok = false
        for (let i = 0; i < arrNum.length; i++) {
            if (num === ar[i]) {
                ok = true
                if(!temp_ar.includes(num)){
                    temp_ar.push(num)
                }
            }
        }
        if (ok === true) {
            document.querySelector(`#btn${num}`).style.backgroundColor = 'green'
            ok = false
        }
        else {
            if (temp_ar.length > 1) {
                document.querySelector(`#btn${num}`).style.backgroundColor = 'red'
                
                for (let i = 0; i < 16; i++) {
                     
                    document.querySelector(`#btn${i}`).style.backgroundColor = 'red'
                    document.querySelector(`#btn${0}`).style.backgroundColor = 'red'
                    document.querySelector(`#btn${1}`).style.backgroundColor = 'red'
                    if (i < 2) {
                        play();
                    }
                }
                document.querySelector("#id_h1").innerHTML = 'ⓛⓞⓢⓢ'
                document.querySelector("#id_h1").style.color = 'red'

                if (level > 1) {
                    setLevel(level - 1)
                }
                if (speed < 3000) {
                    setSpeed(speed + 250)
                }
            }
        }

        if (temp_ar.length === ar.length && temp_ar.length > 1) {
            document.querySelector("#id_h1").innerHTML = 'ⓦⓘⓝ'
            document.querySelector("#id_h1").style.color = 'green'

            setLevel(level + 1)
            if (speed > 1000) {
                setSpeed(speed - 250)
            }

            temp_ar = []
            for (let i = 0; i < 16; i++) {
                document.querySelector(`#btn${i}`).style.backgroundColor = 'black'
                if (i < 2) {
                    play();
                }
            }
        }


    }

    return (
        <div className="body rounded col-md-6 col-lg-12 mx-auto container border border-soild border-danger p-2">
            <br />
            <DescriptionBox />
            <h1 className="h1 m-3">flash memory</h1>
            <button
                disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(0)}
                id='btn0' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(1)}
                id='btn1' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(2)}
                id='btn2' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(3)}
                id='btn3' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <br />
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(4)}
                id='btn4' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(5)}
                id='btn5' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(6)}
                id='btn6' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(7)}
                id='btn7' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <br />
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(8)}
                id='btn8' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(9)}
                id='btn9' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(10)}
                id='btn10' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(11)}
                id='btn11' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <br />
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(12)}
                id='btn12' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(13)}
                id='btn13' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(14)}
                id='btn14' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <button
            disabled={can ===false}
                className='btn btn-outline border border'
                onClick={() => cheakResult(15)}
                id='btn15' style={{ width: 80, height: 80, backgroundColor: 'black' }} ></button>
            <br />
            <button className='p-2 m-3 btn btn-outline-danger bg-dark' onClick={play}>play</button>


            <div>
            <h1 className='h1 display-2' id='id_h1'></h1>
                <h6
                style={{ backgroundColor:'black'}}
                className='display-5 rounded'>
                    Speed:
                    <strong
                        style={{
                
                            color: speed >= 2500 && speed <= 3000 ? 'green' :
                                speed <= 2500 && speed >= 1500 ? 'orange' : 'red'
                        }}
                    >
                        {
                            speed >= 2500 && speed <= 3000 ? ' easy' :
                                speed <= 2500 && speed >= 1500 ? ' normal' : ' hard'
                        }
                    </strong>
                </h6>
               

                <h6
                   style={{ backgroundColor:'black'}}
                    className='display-5 rounded'>level:
                    <strong
                        style={{
                           
                            color: speed >= 2500 && speed <= 3000 ? 'green' :
                                speed <= 2500 && speed >= 1500 ? 'orange' : 'red'
                        }} >{level}
                    </strong>
                </h6>

                
            </div>
            <button className='btn btn-dark m-3' onClick={()=> navigate(-1)}>back</button>
        </div>
    )
}

export default FlasjBox