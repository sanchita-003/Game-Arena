import { Link } from 'react-router-dom'
import ConceptTags from '../components/ConceptTags.jsx'

const tools = [
  { path: '/sudoku', icon: '🧩', title: 'Sudoku Solver', desc: 'Backtracking algorithm solves any valid puzzle instantly.' },
  { path: '/coin-toss', icon: '🪙', title: 'Coin Toss', desc: 'Flip a real 3D coin and track your heads/tails streaks.' },
  { path: '/dice-roller', icon: '🎲', title: 'Dice Roller', desc: 'Roll one or two dice with real Unicode dice faces.' },
  { path: '/rps', icon: '✊', title: 'Rock Paper Scissors', desc: 'Play against the computer and track your score.' },
  { path: '/calculator', icon: '🧮', title: 'Calculator', desc: 'Full-expression calculator with functions and switch logic.' },
  { path: '/ajax-demo', icon: '📡', title: 'AJAX Demo', desc: 'Loads local JSON data using raw XMLHttpRequest.' },
  { path: '/stats', icon: '📊', title: 'Stats & Facts', desc: 'Fetches a random post via the Fetch API.' },
  { path: '/feedback', icon: '💬', title: 'Feedback', desc: 'Send feedback using a validated controlled form.' },
]

export default function Home() {
  const username = JSON.parse(localStorage.getItem('arena_user') || '{}').username
  return (
    <div>
      <h1>Welcome, {username}</h1>
      <p className="subtitle">Pick a tool to play with.</p>
      <ConceptTags items={['React Router (Links)', 'Component Composition']} />
      
      <div className="grid">
        {tools.map(t => (
          <Link to={t.path} key={t.path} className="card">
            <span className="card-icon">{t.icon}</span>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}