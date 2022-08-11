import React, { useState } from 'react'
import Descriptions from './descriptions'
import {useNavigate} from 'react-router-dom'
import './game.css'

const MemoryGameNum = () => {

    const navigate = useNavigate()
    const [canStart, setCanStart] = useState(null);
    const [win, setWin] = useState(null);
    const [showResult, setShowResult] = useState(null);
    const [hideNum, setHideNum] = useState(false);
    const [canContinu, setCanContinu] = useState(false);
    const [showAfterSend, setShowAfterSend] = useState(true);
    const [level, setLevel] = useState(5);
    const [random, stRandom] = useState([]);
    const [inputNum, setInputNum] = useState([]);
    const [record,setRecord] = useState(0)
    const [result,setResult] = useState(0)
    const [time,setTime] = useState(0)

    let timer;
    let arrGetRandom = [];
    let count = 0;
    let arrMistake = [];
    let x = 6


    const play = () => {
        setResult(0)
        setShowAfterSend(true)
        setShowResult(false)
        setCanStart(false)
        setCanContinu(true)
        getRandom()
    }

    const getRandom =() => {
        count=0
        arrMistake = []
        stRandom([])
        for (let i = 0; i < level; i++) {
            arrGetRandom.push(Math.floor(Math.random() * 10))
        }
        stRandom(arrGetRandom)
        arrGetRandom = []
        clearTimeout(timer)
        playTimer()
    }

    const playTimer = () => {
       
        clearTimeout(timer)
        timer = setInterval(() => {
            count += 1
            setTime(count)
            setHideNum(true)
            if (count == 6) {
                setHideNum(false)
                clearTimeout(timer)
                count = 0
                setTime()
                x =6
            } 
        }, 1000)
        
        
    }



    const checkRound = () => {
        count=0
        clearTimeout(timer)
        
        setShowAfterSend(false)
        setShowResult(true)
        setCanContinu(false)
        setCanStart(true)
        setInputNum([])
        let count1 = 0

        for (let i = 0; i < level; i++) {
            if (parseInt(inputNum[i]) == random[i] && inputNum.length > 1 ) {
                count1++
            }
            else {
                if(inputNum.length > 1 ){
                    arrMistake.push(parseInt(i))
                    setWin(false)
                }

            }
        }
        if (count1 == inputNum.length) {
            setLevel(count1 + 1)
            setWin(true)
            if(level > record ){
                setRecord(level)
                setResult(0)
            }
        }
        else {
            if (level > 5) {
                if(inputNum.length > 1 ){
                    setLevel(level - 1)    
                }
                
            }
            setResult(arrMistake.length)
        }
        stRandom([])
    }



    let arrRandom = random.map(x => x + " ")

     
    return (
        <div className=' body rounded col-md-6 col-lg-12 mx-auto container border border-soild border-danger p-2'>
            <h1 className='display-4 bg-danger p-3 mt-3 rounded'>memory number game</h1>
            <Descriptions />
            <hr />
            <h6
                className='display-6'>
                <strong>level <span className='text-warning'>{level - 4}</span></strong> 
            </h6>
            <h6
                className='display-6'>
                <strong>record <span className='text-warning'>{record} digits</span></strong> 
            </h6>
            <br />
            {hideNum && showAfterSend === true && <h1 className='m-2 display-2'> {arrRandom}</h1>}
            { hideNum === true && x - time}
            {showResult === true && win === true && <h1 className='h1'>win!</h1>}
            {showResult === true && win === false && <h1 className='lose'>lose</h1>}
            {result > 0 && <strong className='text-danger' >You guessed {result} digits wrong</strong>}
            <hr />
            <button
                className='btn btn-success m-4'
                disabled={canStart === false}
                onClick={play}>
                <strong>start</strong>
            </button>
            <button
                className='btn btn-warning m-3'
                disabled={canContinu === false || inputNum.length ==0}
                onClick={checkRound}>
                get result
            </button>
            <br />
            <div className='col-md-4 mx-auto mb-5'>
                <input
                    className='form-control mx-auto shadow'
                    type='number'
                    onChange={e => {
                        setInputNum([...e.target.value])
                    }}
                    disable={inputNum.length > level}
                />
            </div>
            <button className='btn btn-dark m-3' onClick={()=> navigate(-1)}>back</button>
        </div>
    )
}

export default MemoryGameNum