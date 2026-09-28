import { useState, useEffect } from 'react'
import ConceptTags from '../components/ConceptTags.jsx'

export default function AjaxDemo() {
  const [facts, setFacts] = useState([])
  const [status, setStatus] = useState('idle')

  function loadWithXHR() {
    setStatus('loading')
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/facts.json', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          setFacts(JSON.parse(xhr.responseText))
          setStatus('done')
        } else {
          setStatus('error')
        }
      }
    }
    xhr.onerror = function () {
      setStatus('error')
    }
    xhr.send()
  }

  useEffect(() => { loadWithXHR() }, [])

  return (
    <div className="page-center">
      <h1>AJAX Demo (XMLHttpRequest)</h1>
      <p className="subtitle">Loads facts from a local JSON file using the raw XMLHttpRequest object.</p>
      <ConceptTags items={['XMLHttpRequest (AJAX)', 'Local JSON File', 'useEffect']} />
      
      <button onClick={loadWithXHR} disabled={status === 'loading'}>
        {status === 'loading' ? 'Loading...' : 'Reload Data'}
      </button>
      {status === 'error' && <p className="error" style={{ marginTop: 16 }}>Failed to load local data.</p>}
      <ul className="fact-list" style={{ marginTop: 20, textAlign: 'left', maxWidth: 500 }}>
        {facts.map(f => <li key={f.id}>{f.fact}</li>)}
      </ul>
    </div>
  )
}