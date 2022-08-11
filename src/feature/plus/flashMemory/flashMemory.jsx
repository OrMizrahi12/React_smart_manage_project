import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'
import DescriptionFlash from "./descriptionFlash";
import './game.css'

const FlashMemory = () => {

    let arrColor = ['red', 'blue', 'green', 'yellow', 'silver', 'orange']
   
    
    let count = -1;
    let timer;

    const navigate = useNavigate()
    const [arColor, setArColor] = useState([])
    const [asd, setAsd] = useState([])
    const [controllSpeed, setControllSpeed] = useState(1000)
    const [wins,setWins] = useState(0)
    const [losses,setLosses] = useState(0)
  

    const colorControll = (x) => {
     
        if(x ===1){
            if(arrColor.length >2){
                arrColor.pop()
                console.log('-->',arrColor)
            }
        }
        if(x === 0){
             arrColor = ['red', 'blue', 'green', 'yellow', 'silver', 'orange']
             console.log('-->',arrColor)      
        }
        
        
    }

    const play = () => {
        document.querySelector("#id_h1").innerHTML = ''
        numUp = 0;
        setArColor(shuffle(arrColor))
        setAsd(arColor)
        console.log(arColor)
        clearInterval(timer)
        timer = setInterval(runOnColor, controllSpeed)
    }

    useEffect(() => {
        clearInterval(timer)
        play()
    }, [])

    const runOnColor = () => {
        count++
        document.querySelector("#div1").style.backgroundColor = arColor[count]
        if (count == arColor.length) {
            count = 0
            clearInterval(timer)
            document.querySelector("#div1").style.backgroundColor = 'black'
        }
    }
    let sum = 0;
    let numUp = -1;
    const checkResult = (color) => {
        numUp += 1

        if (color == asd[numUp]) {
            sum += 1
            console.log("yes")
            document.querySelector("#id_h1").innerHTML += '✅'
        }
        else {
            console.log("no")
            document.querySelector("#id_h1").innerHTML += '❌'
        }
        if (sum === asd.length && numUp + 1 === asd.length) {

            document.querySelector("#id_h1").innerHTML = 'ⓦⓘⓝ'
            document.querySelector("#id_h1").style.color = 'green'
            document.querySelector("#id_h1").style.backgroundColor = 'black'
            sum = 0
            setWins(wins+1)
        }
        else {
            if (numUp + 1 === asd.length) {

                document.querySelector("#id_h1").innerHTML = 'ⓛⓞⓢⓢ'
                document.querySelector("#id_h1").style.color = 'red'
                document.querySelector("#id_h1").style.backgroundColor = 'black'
                setLosses(losses+1)
            }
        }

        console.log(numUp)
        if (numUp == arColor.length) {
            numUp = 0

        }
    }


    return (
        <div className="body rounded col-md-6 col-lg-12 mx-auto container border border-soild border-danger p-2">
            <h1 className="h1 m-3">flash memory</h1>
            <DescriptionFlash />
            <div id="div1" className="mx-auto rounded-circle border border-soild border" style={{ width: 250, height: 250, backgroundColor: 'black' }}>
            </div>
            <h1 className="display-3" id="id_h1" ></h1>
             <br />
                <strong style={{color:'green', backgroundColor:'black'}} >wins: { wins}</strong>_ 
               
               <strong style={{color:'red', backgroundColor:'black'}} >losses: {losses}</strong>
            <div>
                <button className="m-2 rounded border border-soild border-primary"
                    style={{ backgroundColor: 'red' }} onClick={play}>
                    play
                </button> 
                <hr />
            <div>
                <button
                    className="btn btn rounded-circle"
                    onClick={() => checkResult('red')}
                    style={{
                        backgroundColor: 'red',
                        width: 40,
                        height: 40
                    }}>
                </button>
                <button
                    className="btn btn rounded-circle"
                    onClick={() => checkResult('green')}
                    style={{
                        backgroundColor: 'green',
                        width: 40,
                        height: 40
                    }}>
                </button>
                <button
                    className="btn btn rounded-circle"
                    onClick={() => checkResult('blue')}
                    style={{
                        backgroundColor: 'blue',
                        width: 40,
                        height: 40
                    }}>
                </button>
                <button
                    className="btn btn rounded-circle"
                    onClick={() => checkResult('orange')}
                    style={{
                        backgroundColor: 'orange',
                        width: 40,
                        height: 40
                    }}>
                </button>
                <button
                    className="btn btn rounded-circle"
                    onClick={() => checkResult('yellow')}
                    style={{
                        backgroundColor: 'yellow',
                        width: 40,
                        height: 40
                    }}>
                </button>
                <button
                    className="btn btn rounded-circle"
                    onClick={() => checkResult('silver')}
                    style={{
                        backgroundColor: 'silver',
                        width: 40,
                        height: 40
                    }}>
                </button>
            </div>
            <hr />
        

                <div className="border border-soild border rounded col-md-2 mx-auto p-1 m-1">
                    <h5>colors</h5>
                    <button
                        onClick={() => colorControll(1)}
                        style={{ backgroundColor: 'red', color: 'blue' }}
                        className='rounded shadow' >
                        les
                    </button>
                    <button
                        onClick={() => colorControll(0)}
                        style={{ backgroundColor: 'blue', color: 'red' }}
                        className='rounded shadow'>
                        reset color
                    </button>
                    <hr />
                    <h5>speed difficulty</h5>
                    <button
                        onClick={() => setControllSpeed(controllSpeed + 100)}
                        style={{ backgroundColor: 'red', color: 'blue' }}
                        className='rounded shadow' >
                        Easier
                    </button>
                    <button
                        onClick={() => setControllSpeed(controllSpeed > 1000 ? controllSpeed - 100 : 1000)}
                        style={{ backgroundColor: 'blue', color: 'red' }}
                        className='rounded shadow'>
                        Harder
                    </button>
                    <p>Speed: {controllSpeed / 1000}</p>
                </div>
                <button className='btn btn-dark m-3' onClick={()=> navigate(-1)}>back</button>
            </div>
           
        </div>
    )
}

export default FlashMemory