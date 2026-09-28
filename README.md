# 🎮 Game Arena — Mini Project (Advance JavaScript Programming with Framework Lab)

A multi-tool React arcade built to integrate every concept covered in the Advance JavaScript Programming with Framework Lab (BTITPE06IT5P) into one cohesive app.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Feature → Practical Mapping

| Feature in app                     | Practical it demonstrates                                                              |
|------------------------------------|--------------------------------------------------------------------------|
| Login / Register (localStorage)    | Additional Practical 1 — Registration & Login with Local Storage                              |
| Feedback page                      | Additional Practical 2 — Contact form with controlled components                           |
| Calculator page                    | Practical 1 — JS calculator (functions, if-else, switch)                              |
| Login form validation              | Practical 2 — Form validation with dynamic error messages                             |
| AJAX Demo page                     | Practical 3 — XMLHttpRequest with local JSON                                 |
| Stats page                         | Practical 4 — Fetch API for external data                                 |
| Coin Toss page                     | Practical 5 — useState counter (increment/reset)                               |
| Navbar + React Router pages        | Practical 6 — Multi-page React app with React Router                               |
| Whole app                          | Practical 8 — Mini project integrating routing, forms, API, state                                |
| Sudoku Solver page                 | Bonus — backtracking algorithm, standout/unique feature                              |

## Folder Structure

```
game-arena/
├── public/facts.json        # local JSON used by the AJAX (XMLHttpRequest) demo
├── src/
│   ├── components/Navbar.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── Calculator.jsx
│   │   ├── Sudoku.jsx
│   │   ├── CoinToss.jsx
│   │   ├── Stats.jsx
│   │   ├── Feedback.jsx
│   │   └── AjaxDemo.jsx
│   ├── App.jsx               # routes + protected route logic
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Why this stands out

Most mini projects in this lab are simple CRUD forms. This project's centerpiece — a **Sudoku solver using a backtracking algorithm** — is a genuine algorithmic showcase, wrapped in a small arcade of tools (coin toss, calculator, AJAX/Fetch demos) so every syllabus topic is still covered. It's demo-friendly (type a puzzle, hit Solve, watch it fill in instantly) and resume-worthy ("built a Sudoku-solving algorithm in JavaScript using backtracking, inside a full React app with routing, auth, and API integration").

## Tech Stack
- React 18 + Vite
- React Router v6
- Fetch API + XMLHttpRequest
- localStorage (auth + persistence)
