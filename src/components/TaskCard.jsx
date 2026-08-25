import { useState } from 'react'
import { STATUSES } from '../data.js'
import './TaskCard.css'

const PRIORITY_LABELS = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

function TaskCard({ task, category, onSelect, onMove }) {
  const [isDragging, setIsDragging] = useState(false)

  const statusIndex = STATUSES.findIndex((status) => status.id === task.status)
  const previousStatus = STATUSES[statusIndex - 1] ?? null
  const nextStatus = STATUSES[statusIndex + 1] ?? null

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(task.id)
    }
  }

  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', task.id)
    event.dataTransfer.effectAllowed = 'move'
    setIsDragging(true)
  }

  function handleMove(event, status) {
    // Keep the click from also opening the task detail.
    event.stopPropagation()
    onMove(task.id, status.id)
  }

  return (
    <article
      className={`task-card${isDragging ? ' task-card--dragging' : ''}`}
      role="button"
      tabIndex={0}
      draggable
      onClick={() => onSelect(task.id)}
      onKeyDown={handleKeyDown}
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
    >
      <h3 className="task-card__title">{task.title}</h3>
      <div className="task-card__meta">
        {category && (
          <span className="task-card__category" style={{ '--category-color': category.color }}>
            {category.name}
          </span>
        )}
        <span className={`task-card__priority task-card__priority--${task.priority}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      {/* Touch alternative to drag and drop; only visible on small screens. */}
      <div className="task-card__actions">
        <button
          type="button"
          className="task-card__move"
          disabled={!previousStatus}
          aria-label={previousStatus ? `Mover a ${previousStatus.title}` : 'No se puede retroceder'}
          onClick={(event) => handleMove(event, previousStatus)}
          onKeyDown={(event) => event.stopPropagation()}
        >
          ←
        </button>
        <button
          type="button"
          className="task-card__move"
          disabled={!nextStatus}
          aria-label={nextStatus ? `Mover a ${nextStatus.title}` : 'No se puede avanzar'}
          onClick={(event) => handleMove(event, nextStatus)}
          onKeyDown={(event) => event.stopPropagation()}
        >
          →
        </button>
      </div>
    </article>
  )
}

export default TaskCard
