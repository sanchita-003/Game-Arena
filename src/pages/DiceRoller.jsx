import { useState } from 'react'
import ConceptTags from '../components/ConceptTags.jsx'

const DICE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(1)
  const [values, setValues] = useState([1])
  const [rolling, setRolling] = useState(false)
  const [history, setHistory] = useState([])
  const [totalRolls, setTotalRolls] = useState(0)

  function roll() {
    if (rolling) return
    setRolling(true)
    setTimeout(() => {
      const newValues = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
      setValues(newValues)
      setTotalRolls(t => t + 1)
      const sum = newValues.reduce((a, b) => a + b, 0)
      setHistory(h => [sum, ...h].slice(0, 6))
      setRolling(false)
    }, 500)
  }

  function switchDiceCount(count) {
    setDiceCount(count)
    setValues(Array.from({ length: count }, () => 1))
  }

  function reset() {
    setHistory([])
    setTotalRolls(0)
    setValues(Array.from({ length: diceCount }, () => 1))
  }

  const sum = values.reduce((a, b) => a + b, 0)

  return (
    <div className="page-center">
      <h1>Dice Roller</h1>
      <p className="subtitle">Roll one or two dice — real Unicode dice faces.</p>
      <ConceptTags items={['useState', 'Array.map', 'Randomization']} />

      <div className="btn-row center" style={{ marginBottom: 20 }}>
        <button className={diceCount === 1 ? 'active-toggle' : ''} onClick={() => switchDiceCount(1)}>1 Dice</button>
        <button className={diceCount === 2 ? 'active-toggle' : ''} onClick={() => switchDiceCount(2)}>2 Dice</button>
      </div>

      <div className="dice-row">
        {values.map((v, i) => (
          <div key={i} className={`dice-face ${rolling ? 'rolling' : ''}`}>{DICE_FACES[v]}</div>
        ))}
      </div>

      {diceCount === 2 && !rolling && <p className="status-msg">Sum: {sum}</p>}

      <div className="btn-row center">
        <button onClick={roll} disabled={rolling}>{rolling ? 'Rolling...' : 'Roll'}</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="stats-row center">
        <div className="stat-box"><strong>{totalRolls}</strong><span>Total Rolls</span></div>
        <div className="stat-box"><strong>{history.length ? history[0] : '-'}</strong><span>Last Sum</span></div>
      </div>

      {history.length > 0 && (
        <p className="subtitle" style={{ marginTop: 16 }}>Recent sums: {history.join(', ')}</p>
      )}
    </div>
  )
}