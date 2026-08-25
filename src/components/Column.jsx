import { useState } from 'react'
import TaskCard from './TaskCard.jsx'
import './Column.css'

const EMPTY_MESSAGES = {
  todo: 'Nada pendiente. Crea una tarea nueva cuando quieras.',
  in_progress: 'Nada en marcha. Mueve aquí una tarea para empezar.',
  done: 'Aún no hay tareas terminadas. Todo llegará.',
}

function Column({
  status,
  title,
  tasks,
  categories,
  isActive,
  isFiltering,
  onSelectTask,
  onMoveTask,
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  function handleDragOver(event) {
    // preventDefault marks the column as a valid drop target.
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    if (!isDragOver) setIsDragOver(true)
  }

  function handleDragLeave(event) {
    // Ignore leave events fired when moving between the column's own children.
    if (event.currentTarget.contains(event.relatedTarget)) return
    setIsDragOver(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragOver(false)
    const taskId = event.dataTransfer.getData('text/plain')
    if (taskId) onMoveTask(taskId, status)
  }

  const className = [
    'column',
    isActive ? 'column--active' : '',
    isDragOver ? 'column--drag-over' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      id={`column-${status}`}
      className={className}
      aria-labelledby={`column-title-${status}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="column__header">
        <h2 id={`column-title-${status}`} className="column__title">
          {title}
        </h2>
        <span className="column__count" aria-label={`${tasks.length} tareas`}>
          {tasks.length}
        </span>
      </header>
      {tasks.length === 0 ? (
        <p className="column__empty">
          {isFiltering ? 'Ninguna tarea coincide con los filtros.' : EMPTY_MESSAGES[status]}
        </p>
      ) : (
        <ul className="column__list">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                category={categories.find((category) => category.id === task.category)}
                onSelect={onSelectTask}
                onMove={onMoveTask}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Column
