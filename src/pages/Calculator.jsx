import { useState } from 'react'
import ConceptTags from '../components/ConceptTags.jsx'

const isOperator = (ch) => ['+', '-', '*', '/'].includes(ch)

export default function Calculator() {
  const [expression, setExpression] = useState('')
  const [justEvaluated, setJustEvaluated] = useState(false)

  function pressValue(value) {
    if (justEvaluated) {
      setJustEvaluated(false)
      if (isOperator(value)) {
        setExpression(prev => prev + value)
      } else {
        setExpression(value === '.' ? '0.' : value)
      }
      return
    }

    setExpression(prev => {
      if (isOperator(value)) {
        if (prev === '' && value !== '-') return prev
        if (prev.length > 0 && isOperator(prev[prev.length - 1])) {
          return prev.slice(0, -1) + value
        }
        return prev + value
      }
      if (value === '.') {
        const segments = prev.split(/[+\-*/]/)
        const currentSegment = segments[segments.length - 1]
        if (currentSegment.includes('.')) return prev
        return prev + (currentSegment === '' ? '0.' : '.')
      }
      return prev + value
    })
  }

  function handleClear() {
    setExpression('')
    setJustEvaluated(false)
  }

  function handleBackspace() {
    if (justEvaluated) {
      handleClear()
      return
    }
    setExpression(prev => prev.slice(0, -1))
  }

  function handleEquals() {
    if (!expression || isOperator(expression[expression.length - 1])) return
    try {
      if (!/^[0-9+\-*/.%]+$/.test(expression)) throw new Error('invalid')
      // eslint-disable-next-line no-new-func
      const result = Function('"use strict"; return (' + expression.replace(/%/g, '/100') + ')')()
      if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
        setExpression('Error')
      } else {
        setExpression(String(Math.round(result * 1e10) / 1e10))
      }
    } catch {
      setExpression('Error')
    }
    setJustEvaluated(true)
  }

  const rows = [
    ['C', '⌫', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
  ]

  return (
    <div className="page-center">
      <h1>Calculator</h1>
      <ConceptTags items={['Functions', 'Switch Statement', 'useState']} />
      <div className="calculator">
        <div className="calc-display">{expression || '0'}</div>
        <div className="calc-grid">
          {rows.flat().map(btn => (
            <button
              key={btn}
              className={`calc-btn ${isOperator(btn) ? 'op' : ''} ${btn === 'C' ? 'danger' : ''}`}
              onClick={() => {
                if (btn === 'C') handleClear()
                else if (btn === '⌫') handleBackspace()
                else if (btn === '%') pressValue('%')
                else pressValue(btn)
              }}
            >
              {btn}
            </button>
          ))}
          <button className="calc-btn wide-2" onClick={() => pressValue('0')}>0</button>
          <button className="calc-btn" onClick={() => pressValue('.')}>.</button>
          <button className="calc-btn equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}