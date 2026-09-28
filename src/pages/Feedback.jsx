import { useState } from 'react'
import ConceptTags from '../components/ConceptTags.jsx'

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3500)
    }
  }

  return (
    <div className="page-center">
      <h1>Feedback</h1>
      <p className="subtitle">We'd love to hear your thoughts.</p>
      <ConceptTags items={['Controlled Components', 'Form Validation', 'Conditional Rendering']} />

      <div className="feedback-card">
        <form onSubmit={handleSubmit} className="feedback-form" noValidate>
          <label>Your Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Sanchita Rathod" />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Email Address</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Your Message</label>
          <textarea name="message" rows="6" value={form.message} onChange={handleChange} placeholder="Tell us what you think..."></textarea>
          {errors.message && <p className="error">{errors.message}</p>}

          <button type="submit" className="feedback-submit">Send Feedback</button>
        </form>

        {submitted && (
          <div className="alert-toast">
            <span className="alert-icon">✅</span>
            <div>
              <strong>Thank you!</strong>
              <div>Your feedback has been submitted successfully.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}