import { useState, useEffect } from 'react'
import ConceptTags from '../components/ConceptTags.jsx'

const API_URL = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en'

export default function Stats() {
  const [fact, setFact] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function fetchFact() {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('bad response')
      const data = await res.json()
      setFact(data.text)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchFact() }, [])

  return (
    <div className="page-center">
      <h1>Stats</h1>
      <p className="subtitle">A random real fact fetched live from a public API using the Fetch API.</p>
      <ConceptTags items={['Fetch API', 'Async/Await', 'useEffect']} />
      
      <button onClick={fetchFact} disabled={loading}>{loading ? 'Loading...' : 'Fetch New Fact'}</button>

      {error && <p className="error" style={{ marginTop: 16 }}>Couldn't reach the facts API — check your internet connection.</p>}

      {fact && !error && (
        <div className="quote-card" style={{ marginTop: 20, maxWidth: 500 }}>
          <p style={{ margin: 0 }}>{fact}</p>
        </div>
      )}
    </div>
  )
}