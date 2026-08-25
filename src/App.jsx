import { useEffect, useState } from 'react'
import Board from './components/Board.jsx'
import Modal from './components/Modal.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskPanel from './components/TaskPanel.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import { createTask } from './data.js'
import { loadBoard, saveBoard } from './storage.js'
import './App.css'

function App() {
  const [board, setBoard] = useState(loadBoard)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  useEffect(() => {
    saveBoard(board)
  }, [board])

  // Always resolve the selected task from state by id, so the panel never shows stale data.
  const selectedTask = board.tasks.find((task) => task.id === selectedTaskId) ?? null

  function openTaskForm() {
    setIsTaskFormOpen(true)
  }

  function closeTaskForm() {
    setIsTaskFormOpen(false)
  }

  function closeTaskPanel() {
    setSelectedTaskId(null)
    setIsDeleteConfirmOpen(false)
  }

  function handleCreateTask(taskData) {
    const newTask = createTask({ ...taskData, status: 'todo' })
    setBoard((current) => ({ ...current, tasks: [...current.tasks, newTask] }))
    closeTaskForm()
  }

  function handleUpdateTask(taskId, taskData) {
    const updatedAt = new Date().toISOString()
    setBoard((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId ? { ...task, ...taskData, updatedAt } : task,
      ),
    }))
    closeTaskPanel()
  }

  function handleDeleteTask(taskId) {
    setBoard((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== taskId),
    }))
    closeTaskPanel()
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
        <Board tasks={board.tasks} categories={board.categories} onSelectTask={setSelectedTaskId} />
      </main>

      {isTaskFormOpen && (
        <Modal title="Nueva tarea" onClose={closeTaskForm}>
          <TaskForm categories={board.categories} onSubmit={handleCreateTask} onCancel={closeTaskForm} />
        </Modal>
      )}

      {selectedTask && (
        <TaskPanel
          task={selectedTask}
          categories={board.categories}
          onSave={(taskData) => handleUpdateTask(selectedTask.id, taskData)}
          onDelete={() => setIsDeleteConfirmOpen(true)}
          onClose={closeTaskPanel}
        />
      )}

      {selectedTask && isDeleteConfirmOpen && (
        <ConfirmDialog
          title="Eliminar tarea"
          message="¿Eliminar esta tarea? Esta acción no se puede deshacer."
          confirmLabel="Eliminar"
          onConfirm={() => handleDeleteTask(selectedTask.id)}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </div>
  )
}

export default App
