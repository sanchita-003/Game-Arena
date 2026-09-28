import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConceptTags from '../components/ConceptTags.jsx'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const newErrors = {}
    if (!form.username.trim()) newErrors.username = 'Username is required'
    else if (form.username.length < 3) newErrors.username = 'Minimum 3 characters'
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 4) newErrors.password = 'Minimum 4 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const users = JSON.parse(localStorage.getItem('arena_users') || '{}')

    if (mode === 'register') {
      if (users[form.username]) {
        setErrors({ username: 'Username already taken' })
        return
      }
      users[form.username] = form.password
      localStorage.setItem('arena_users', JSON.stringify(users))
      localStorage.setItem('arena_user', JSON.stringify({ username: form.username }))
      navigate('/')
    } else {
      if (!users[form.username] || users[form.username] !== form.password) {
        setErrors({ password: 'Invalid username or password' })
        return
      }
      localStorage.setItem('arena_user', JSON.stringify({ username: form.username }))
      navigate('/')
    }
  }

  return (
    <div className="auth-card">
      <h1>Game Arena</h1>
      <p className="subtitle">{mode === 'login' ? 'Welcome back, player.' : 'Create your player profile.'}</p>
      <ConceptTags items={['Controlled Components', 'Form Validation', 'localStorage']} />
      
      <form onSubmit={handleSubmit} noValidate>
        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} placeholder="e.g. rahul_codes" />
        {errors.username && <p className="error">{errors.username}</p>}

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="******" />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <p className="switch-mode">
        {mode === 'login' ? 'New here? ' : 'Already have an account? '}
        <button type="button" className="link-btn" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrors({}) }}>
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  )
}
