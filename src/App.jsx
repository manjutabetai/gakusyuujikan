import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [isInput, setIsInput] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [inputText, setInputText] = useState("")
  const [inputTime, setInputTime] = useState(0)
  const [records, setRecords] = useState([
    { title: "勉強の記録1", time: 1 },
    { title: "勉強の記録2", time: 3 },
    { title: "勉強の記録3", time: 5 }
  ]);

  const changeText = (event) => setInputText(event.target.value)
  const changeTime = (event) => setInputTime(Number(event.target.value))

  const handleFocus = () => {
    if (inputTime === 0) {
      setInputTime('')
    }
  }

  const handleBlur = () => {
    if (inputTime === '') {
      setInputTime(0)
    }
  }

  const addItem = () => {
    if (inputText.length > 0 && inputTime > 0) {
      const newItem = { title: inputText, time: inputTime }
      const newRecords = [...records, newItem]

      setRecords(newRecords)
      setInputText("")
      setInputTime(0)
    } else {
      setIsInput(true)
    }
  }

  useEffect(() => {
    let newTotalTime = 0
    records.forEach((item) => {
      newTotalTime += item.time
    })
    setTotalTime(newTotalTime)
  }, [records])

  return (
    <>
      <div>
        <p>学習内容</p>
        <input type="text" value={inputText} onChange={changeText} />
      </div>
      <div>
        <p>学習時間</p>
        <input
          type="number"
          value={inputTime}
          onChange={changeTime}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <p>時間</p>
      </div>

      <p>学習記録一覧</p>
      <ul>
        {records.map((record, index) => (
          <li key={record.title}>
            <div>
              <p>{record.title}　　学習時間は{record.time}時間</p>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>登録</button>
      {isInput ? <p>入力されていない項目があります。</p> : null}
      <p>合計時間: {totalTime}/1000(h) </p>
    </>
  )
}

export default App
