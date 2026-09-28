import { useState } from 'react'
import ConceptTags from '../components/ConceptTags.jsx'

const EMPTY_GRID = () => Array.from({ length: 9 }, () => Array(9).fill(0))

const SAMPLE_PUZZLE = [
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],

  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],

  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9],
]

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false
    if (board[i][col] === num) return false
  }
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === num) return false
    }
  }
  return true
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num
            if (solve(board)) return true
            board[row][col] = 0
          }
        }
        return false
      }
    }
  }
  return true
}

export default function Sudoku() {
  const [grid, setGrid] = useState(EMPTY_GRID())
  const [beforeGrid, setBeforeGrid] = useState(null)
  const [solvedGrid, setSolvedGrid] = useState(null)
  const [message, setMessage] = useState('')

  function handleCellChange(row, col, value) {
    const num = value.replace(/[^1-9]/g, '').slice(0, 1)
    const newGrid = grid.map(r => [...r])
    newGrid[row][col] = num ? parseInt(num, 10) : 0
    setGrid(newGrid)
    setMessage('')
    setSolvedGrid(null)
    setBeforeGrid(null)
  }

  function handleSolve() {
    const original = grid.map(r => [...r])
    const boardCopy = grid.map(r => [...r])
    const solved = solve(boardCopy)
    if (solved) {
      setBeforeGrid(original)
      setSolvedGrid(boardCopy)
      setMessage('Solved!')
    } else {
      setSolvedGrid(null)
      setBeforeGrid(null)
      setMessage('No solution exists for this puzzle.')
    }
  }

  function loadSample() {
    setGrid(SAMPLE_PUZZLE.map(r => [...r]))
    setMessage('Sample puzzle loaded.')
    setSolvedGrid(null)
    setBeforeGrid(null)
  }

  function clearGrid() {
    setGrid(EMPTY_GRID())
    setMessage('')
    setSolvedGrid(null)
    setBeforeGrid(null)
  }

  return (
    <div className="page-center">
      <h1>Sudoku Solver</h1>
      <p className="subtitle">Enter a puzzle (blank cells = empty) and let backtracking solve it.</p>
      <ConceptTags items={['Backtracking Algorithm (DSA)', 'Recursion', '2D Arrays', 'useState']} />

      <p className="grid-heading">Before Solving (your input)</p>
      <div className="sudoku-grid">
        {grid.map((row, r) => (
          <div className="sudoku-row" key={r}>
            {row.map((cell, c) => (
              <input
                key={c}
                className="sudoku-cell"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleCellChange(r, c, e.target.value)}
                maxLength={1}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="btn-row center">
        <button onClick={handleSolve}>Solve</button>
        <button onClick={loadSample}>Load Sample</button>
        <button onClick={clearGrid}>Clear</button>
      </div>
      {message && <p className="status-msg">{message}</p>}

      {solvedGrid && beforeGrid && (
        <>
          <p className="grid-heading" style={{ marginTop: 28 }}>After Solving (result)</p>
          <div className="sudoku-grid readonly">
            {solvedGrid.map((row, r) => (
              <div className="sudoku-row" key={r}>
                {row.map((cell, c) => (
                  <div
                    key={c}
                    className={`sudoku-cell readonly ${beforeGrid[r][c] === 0 ? 'solved-cell' : 'given-cell'}`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="subtitle" style={{ marginTop: 10 }}>
            <span className="legend-dot given-dot"></span> Numbers you entered &nbsp;&nbsp;
            <span className="legend-dot solved-dot"></span> Numbers filled by the algorithm
          </p>
        </>
      )}
    </div>
  )
}