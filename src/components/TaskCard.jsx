import { useState } from 'react'
import './TaskCard.css'

const PRIORITY_LABELS = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

function TaskCard({ task, category, onSelect }) {
  const [isDragging, setIsDragging] = useState(false)

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
    </article>
  )
}

export default TaskCard
