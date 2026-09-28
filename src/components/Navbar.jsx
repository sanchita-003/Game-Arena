import { NavLink, useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

export default function Navbar() {
  const navigate = useNavigate()
  const username = JSON.parse(localStorage.getItem('arena_user') || '{}').username

  function logout() {
    localStorage.removeItem('arena_user')
    navigate('/login')
  }

  const linkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

  return (
    <nav className="navbar">
      <span className="brand">Game Arena</span>
      <div className="nav-links">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/sudoku" className={linkClass}>Sudoku</NavLink>
        <NavLink to="/coin-toss" className={linkClass}>Coin Toss</NavLink>
        <NavLink to="/dice-roller" className={linkClass}>Dice</NavLink>
        <NavLink to="/rps" className={linkClass}>RPS</NavLink>
        <NavLink to="/calculator" className={linkClass}>Calculator</NavLink>
        <NavLink to="/ajax-demo" className={linkClass}>AJAX Demo</NavLink>
        <NavLink to="/stats" className={linkClass}>Stats</NavLink>
        <NavLink to="/feedback" className={linkClass}>Feedback</NavLink>
      </div>
        <div className="user-box">
          <span>Hi, {username}</span>
          <ThemeToggle />
          <button onClick={logout}>Logout</button>
        </div>
    </nav>
  )
}