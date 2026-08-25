import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Board from './components/Board.jsx'
import Modal from './components/Modal.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskPanel from './components/TaskPanel.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import { createTask, STATUSES } from './data.js'
import { loadBoard, saveBoard } from './storage.js'
import './App.css'

// Case- and accent-insensitive comparison so "cafe" matches "Café".
function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

function App() {
  const [board, setBoard] = useState(loadBoard)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  // Column shown on small screens, where only one column is visible at a time.
  const [activeStatus, setActiveStatus] = useState(STATUSES[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    saveBoard(board)
  }, [board])

  // Always resolve the selected task from state by id, so the panel never shows stale data.
  const selectedTask = board.tasks.find((task) => task.id === selectedTaskId) ?? null

  const normalizedQuery = normalizeText(searchQuery)
  const isFiltering = normalizedQuery !== '' || categoryFilter !== 'all'
  const visibleTasks = board.tasks.filter(
    (task) =>
      (categoryFilter === 'all' || task.category === categoryFilter) &&
      (normalizedQuery === '' || normalizeText(task.title).includes(normalizedQuery)),
  )

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

  function handleMoveTask(taskId, status) {
    const updatedAt = new Date().toISOString()
    setBoard((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId && task.status !== status ? { ...task, status, updatedAt } : task,
      ),
    }))
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
      <Header
        categories={board.categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        onNewTask={openTaskForm}
      />
      <main>
        <Board
          tasks={visibleTasks}
          categories={board.categories}
          isFiltering={isFiltering}
          activeStatus={activeStatus}
          onChangeActiveStatus={setActiveStatus}
          onSelectTask={setSelectedTaskId}
          onMoveTask={handleMoveTask}
        />
      </main>

      <button type="button" className="app__fab" onClick={openTaskForm} aria-label="Nueva tarea">
        +
      </button>

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
