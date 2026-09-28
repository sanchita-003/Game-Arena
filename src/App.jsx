import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Calculator from './pages/Calculator.jsx'
import Sudoku from './pages/Sudoku.jsx'
import CoinToss from './pages/CoinToss.jsx'
import DiceRoller from './pages/DiceRoller.jsx'
import RockPaperScissors from './pages/RockPaperScissors.jsx'
import Stats from './pages/Stats.jsx'
import Feedback from './pages/Feedback.jsx'
import AjaxDemo from './pages/AjaxDemo.jsx'

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('arena_user')
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  const user = localStorage.getItem('arena_user')
  return (
    <div className="app-shell">
      <ThemeToggle />
      {user && <Navbar />}
      <main className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
          <Route path="/sudoku" element={<ProtectedRoute><Sudoku /></ProtectedRoute>} />
          <Route path="/coin-toss" element={<ProtectedRoute><CoinToss /></ProtectedRoute>} />
          <Route path="/dice-roller" element={<ProtectedRoute><DiceRoller /></ProtectedRoute>} />
          <Route path="/rps" element={<ProtectedRoute><RockPaperScissors /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          <Route path="/ajax-demo" element={<ProtectedRoute><AjaxDemo /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}