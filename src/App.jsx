import { useState } from 'react'
import Board from './components/Board.jsx'
import { sampleBoard } from './data.js'
import './App.css'

function App() {
  const [board] = useState(sampleBoard)

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">TaskBoard</h1>
      </header>
      <main>
        <Board tasks={board.tasks} categories={board.categories} />
      </main>
    </div>
  )
}

export default App
