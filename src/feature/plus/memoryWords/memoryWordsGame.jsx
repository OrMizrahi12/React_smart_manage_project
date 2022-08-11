import { useEffect, useState } from "react"
import { arr } from "./words"
import { shuffle } from "lodash"
import { useNavigate } from 'react-router-dom'
import DescriptionsWord from "./descriptionWord"
const MemoryWordsGame = () => {
  const navigate = useNavigate()

  let lengthAr = arr.length

  const [result, setResult] = useState("")
  const [inputResult, setInputResult] = useState([])
  const [word, setWord] = useState()
  const [inputWord, setInputWord] = useState()
  const [win, setWin] = useState(null)
  const [changeWord, setChangeWord] = useState(5)
  const [canPlay, setCanPlay] = useState(true)
  const [level, setLevel] = useState(1)
  const [losses, setLosses] = useState(0)
  const [canCheck, setCanCheck] = useState(false)

  const outputWord = () => {
    setCanCheck(true)
    setCanPlay(false)
    let run = Math.floor(Math.random() * lengthAr)
    setWord(arr[run])
    setInputResult(shuffle([...arr[run]]))
    setWin(null)
  }

  const checkResult = () => {
    setCanCheck(false)
    setCanPlay(true)
    setInputWord(result)
    if (result === word) {
      setWin(true)
      setLevel(level + 1)
    }
    else {
      setWin(false)
      setLosses(losses + 1)
      if (level > 1) {
        setLevel(level - 1)
      }
    }
  }

  const reset = () => {
    setChangeWord(5)
    setCanPlay(true)
    setWin(null)
    setLevel(1)
    setLosses(0)
    setInputResult([])
  }

  const switchWord = () => {
    outputWord()
    setChangeWord(changeWord - 1)

  }

  return (
    <div className=" body rounded col-md-6 col-lg-12 mx-auto container border border-soild border-danger p-2 ">
      <h1 className='display-4 bg-danger p-3 mt-3 rounded'>find the word</h1>
      <br />
      <DescriptionsWord />
      <hr />
      <div className="col-md-6 mx-auto border border-soild border-dark rounded ">
        <h6 className="display-6 text-warning" >Word replacement: {changeWord}</h6>
        <h6 className="display-6 text-warning" >level: {level}</h6>
        <h6 className="display-6 text-warning" >losses: {losses}</h6>
      </div>
      <hr />
      <h1
        className=" h2 display-5 col-md-6 mx-auto p-2 rounded">
        <strong
          style={{ backgroundColor: 'balck' }}>
          {inputResult.map(x => x + " ")}
        </strong>
      </h1>
      {

        win === true && <div className="col-md-4 mx-auto">
          <h3
            className="display-5 mx-auto p-2 bg-light rounded"
          ><span className="text-success">✅{inputWord}---{word}✅</span></h3>
        </div>

      }

      {
        win === false && <div className="col-md-4 mx-auto">
          <h3
            className="display-5  mx-auto p-2 bg-light rounded"
          ><span className="text-danger">❌{inputWord}</span><span className="text-success" >---{word}✅</span></h3>
        </div>

      }
      <div className="col-md-6 mx-auto border border-soild border-primary rounded">
        <div className="col-md-6 mx-auto rounded m-4">
          <button
            disabled={!canPlay}
            onClick={outputWord}
            className="btn btn-success m-2 p-3">
            Play
          </button>
          <br />
          <button
            disabled={canCheck === false}
            onClick={checkResult}
            className="btn btn-warning m-2">
            Check
          </button>

          <button
            disabled={changeWord === 0 || canPlay}
            onClick={switchWord}
            className="btn btn-primary m-2">
            Switch
          </button>

          <button

            onClick={reset}
            className="btn btn-secondary m-2">
            reste
          </button>
        </div>
        <br />
        <div className='col-md-4 mx-auto'>
          <input
            className="form-control border border-soild border-danger w-75 mx-auto mb-5"
            onChange={e => {
              setResult(e.target.value)
              console.log(result)
            }}
            type={Text}
          />
        </div>


        <button className='btn btn-dark m-3' onClick={() => navigate(-1)}>back</button>
      </div>
    </div>
  )
}

export default MemoryWordsGame