import { useState } from 'react'
import TaskCard from './TaskCard.jsx'

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
    'min-h-40 rounded-lg border p-4 transition sm:block',
    // Phones: only the active column is visible; tabs switch between them.
    isActive ? 'block' : 'hidden',
    isDragOver ? 'border-orange bg-orange/8' : 'border-line bg-surface',
  ].join(' ')

  return (
    <section
      id={`column-${status}`}
      className={className}
      aria-labelledby={`column-title-${status}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 id={`column-title-${status}`} className="text-lg font-semibold">
          {title}
        </h2>
        <span
          className="inline-flex h-6 min-w-6 items-center justify-center rounded-sm border border-line-subtle bg-surface-raised px-2 font-display text-sm font-semibold text-secondary"
          aria-label={`${tasks.length} tareas`}
        >
          {tasks.length}
        </span>
      </header>
      {tasks.length === 0 ? (
        <p className="rounded-sm border border-dashed border-neutral-light px-4 py-6 text-center text-sm leading-normal text-muted">
          {isFiltering ? 'Ninguna tarea coincide con los filtros.' : EMPTY_MESSAGES[status]}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
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
