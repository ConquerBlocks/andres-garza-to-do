import Board from './components/Board.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">TaskBoard</h1>
      </header>
      <main>
        <Board />
      </main>
    </div>
  )
}

export default App
