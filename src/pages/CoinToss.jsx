import { useState } from 'react'
import ConceptTags from '../components/ConceptTags.jsx'

export default function CoinToss() {
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState(null)
  const [heads, setHeads] = useState(0)
  const [tails, setTails] = useState(0)
  const [flipping, setFlipping] = useState(false)

  function toss() {
    if (flipping) return
    setFlipping(true)
    const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails'
    const extraSpins = 5 + Math.floor(Math.random() * 3) // 5-7 full spins for drama
    const targetRotation = rotation + extraSpins * 360 + (outcome === 'Tails' ? 180 : 0)
    setRotation(targetRotation)
    setTimeout(() => {
      setResult(outcome)
      if (outcome === 'Heads') setHeads(h => h + 1)
      else setTails(t => t + 1)
      setFlipping(false)
    }, 900)
  }

  function reset() {
    setHeads(0)
    setTails(0)
    setResult(null)
    setRotation(0)
  }

  const total = heads + tails

  return (
    <div className="coin-page">
      <h1>Coin Toss</h1>
      <p className="subtitle">Click the coin (or the button) to flip it.</p>
      <ConceptTags items={['useState Counter', 'CSS 3D Transforms', 'Randomization']} />

      <div className="coin-wrapper">
        <div
          className="coin-3d"
          style={{ transform: `rotateY(${rotation}deg)` }}
          onClick={toss}
        >
          <div className="coin-face heads">H</div>
          <div className="coin-face tails">T</div>
        </div>
      </div>
      <div className="coin-shadow"></div>

      <h2 className="coin-result">{flipping ? 'Flipping...' : result || 'Tap the coin to toss'}</h2>

      <div className="btn-row center">
        <button onClick={toss} disabled={flipping}>Toss Coin</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="stats-row center">
        <div className="stat-box"><strong>{heads}</strong><span>Heads</span></div>
        <div className="stat-box"><strong>{tails}</strong><span>Tails</span></div>
        <div className="stat-box"><strong>{total}</strong><span>Total Tosses</span></div>
        <div className="stat-box"><strong>{total ? Math.round((heads / total) * 100) : 0}%</strong><span>Heads Rate</span></div>
      </div>
    </div>
  )
}