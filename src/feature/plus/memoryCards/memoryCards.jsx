import { arr_color } from './color_arr'
import { setWith, shuffle } from 'lodash'
import { useState } from 'react'
import DescriptionCard from './descriptionCard';
import './game.css'
import { useNavigate } from 'react-router-dom';


const MemoryCards = () => {

  let timer;
  let col;
  let arrInput = [];
  const navigate = useNavigate()
  const [sum,setSum]=useState(0)
  const [score,setScore] = useState(0)
  const [mistake,setMistake]=useState(0)
  const [arr, setArr] = useState([]);
  const [win,setWin]=useState(false)

  const shuffleColor = () => {
    setWin(false)
    setMistake(0)
    setScore(0)
    setSum(sum+1)
    clearInterval(timer)
    setArr(shuffle(arr_color))
    for (let i = 0; i < arr.length; i++) {
      document.querySelector(`#id_div${i}`).style.backgroundColor = 'black'
    }
  }


  const cheakResult = (color, index) => {

    arrInput.push({ color: color, index: index })
    document.querySelector(`#id_div${index}`).style.backgroundColor = color
    
    if (arrInput.length === 2) {
      col = arrInput
      if (arrInput[0].color !== arrInput[1].color || arrInput[0].index === arrInput[1].index) {
        if(arrInput[0].index !== arrInput[1].index){
          setMistake(mistake+1) 
        }  
        clearInterval(timer)
        timer = setInterval(showColor, 1000)
        arrInput = []
      }
      else {
        setScore(score+1)
        arrInput = []
        if (score === 7){
          setWin(true)
          
        }
      }
    }
  }
  let count = 0
  const showColor = () => {
    count++
    console.log(col)
    for (let i = 0; i < col.length; i++) {
      document.querySelector(`#id_div${col[i].index}`).style.backgroundColor = col[i].color
    }
    if (count == 1) {
      for (let i = 0; i < col.length; i++) {
        document.querySelector(`#id_div${col[i].index}`).style.backgroundColor = 'black'
      }
      count = 0
      clearInterval(timer)
    }
  }


  return (
    <div className="body rounded col-md-6 container border border-soild border-danger p-2">
      <button
       className='btn btn-outline-danger bg-warning'
        onClick={shuffleColor}>
          {sum === 0 ? "play" : "play again"}
      </button>
      <DescriptionCard />
      {
        win === true && <h1 className='h1' >win!</h1>
      }
      <hr />
      <div className='col-md-6 mx-auto' >
        <div className='row'>
          {
            arr.map((x, index) => <div
              key={index}
              id={`id_div${index}`}
              className='m-3 rounded shadow '
              onClick={() => cheakResult(x, index)}
              style={{ backgroundColor: 'black', width: 60, height: 60 }}>
            </div>)
          }
        </div>
        </div>
        <h6 className='display-5'>Score: {score}</h6>
        <h6 className='display-5'>Mistake: {mistake}</h6>
        <button className='btn btn-dark m-3' onClick={()=> navigate(-1)}>back</button>
      </div >
  
  )
}

export default MemoryCards