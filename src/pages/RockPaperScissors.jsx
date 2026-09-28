import { useState } from 'react'
import ConceptTags from '../components/ConceptTags.jsx'

const CHOICES = [
  { key: 'rock', icon: '✊', label: 'Rock' },
  { key: 'paper', icon: '✋', label: 'Paper' },
  { key: 'scissors', icon: '✌️', label: 'Scissors' },
]

function decideWinner(player, computer) {
  if (player === computer) return 'draw'
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win'
  }
  return 'lose'
}

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [resultText, setResultText] = useState('Make your move.')
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [draws, setDraws] = useState(0)
  const [playing, setPlaying] = useState(false)

  function play(choiceKey) {
    if (playing) return
    setPlaying(true)
    setPlayerChoice(choiceKey)
    setComputerChoice(null)
    setResultText('...')

    setTimeout(() => {
      const compChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)].key
      setComputerChoice(compChoice)
      const outcome = decideWinner(choiceKey, compChoice)

      switch (outcome) {
        case 'win':
          setWins(w => w + 1)
          setResultText('You win! 🎉')
          break
        case 'lose':
          setLosses(l => l + 1)
          setResultText('You lose. 😅')
          break
        default:
          setDraws(d => d + 1)
          setResultText("It's a draw.")
      }
      setPlaying(false)
    }, 600)
  }

  function reset() {
    setWins(0); setLosses(0); setDraws(0)
    setPlayerChoice(null); setComputerChoice(null)
    setResultText('Make your move.')
  }

  const getIcon = (key) => CHOICES.find(c => c.key === key)?.icon || '❔'

  return (
    <div className="page-center">
      <h1>Rock Paper Scissors</h1>
      <p className="subtitle">Pick your move against the computer.</p>
      <ConceptTags items={['Switch Statement', 'useState', 'Conditional Logic']} />

      <div className="rps-battle">
        <div className="rps-side">
          <span className="rps-emoji">{playerChoice ? getIcon(playerChoice) : '❔'}</span>
          <span className="rps-label">You</span>
        </div>
        <span className="rps-vs">VS</span>
        <div className="rps-side">
          <span className="rps-emoji">{computerChoice ? getIcon(computerChoice) : '❔'}</span>
          <span className="rps-label">Computer</span>
        </div>
      </div>

      <h2 className="coin-result">{resultText}</h2>

      <div className="btn-row center">
        {CHOICES.map(c => (
          <button key={c.key} className="rps-btn" onClick={() => play(c.key)} disabled={playing}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="btn-row center" style={{ marginTop: 12 }}>
        <button onClick={reset}>Reset Score</button>
      </div>

      <div className="stats-row center">
        <div className="stat-box"><strong>{wins}</strong><span>Wins</span></div>
        <div className="stat-box"><strong>{losses}</strong><span>Losses</span></div>
        <div className="stat-box"><strong>{draws}</strong><span>Draws</span></div>
      </div>
    </div>
  )
}