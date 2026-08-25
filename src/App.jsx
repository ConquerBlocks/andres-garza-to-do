import { useState } from 'react'
import Board from './components/Board.jsx'
import Modal from './components/Modal.jsx'
import TaskForm from './components/TaskForm.jsx'
import { sampleBoard, createTask } from './data.js'
import './App.css'

function App() {
  const [board, setBoard] = useState(sampleBoard)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  function openTaskForm() {
    setIsTaskFormOpen(true)
  }

  function closeTaskForm() {
    setIsTaskFormOpen(false)
  }

  function handleCreateTask(taskData) {
    const newTask = createTask({ ...taskData, status: 'todo' })
    setBoard((current) => ({ ...current, tasks: [...current.tasks, newTask] }))
    closeTaskForm()
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">TaskBoard</h1>
        <button type="button" className="button button--primary" onClick={openTaskForm}>
          Nueva tarea
        </button>
      </header>
      <main>
        <Board tasks={board.tasks} categories={board.categories} />
      </main>
      {isTaskFormOpen && (
        <Modal title="Nueva tarea" onClose={closeTaskForm}>
          <TaskForm categories={board.categories} onSubmit={handleCreateTask} onCancel={closeTaskForm} />
        </Modal>
      )}
    </div>
  )
}

export default App
