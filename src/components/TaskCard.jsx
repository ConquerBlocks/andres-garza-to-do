import './TaskCard.css'

const PRIORITY_LABELS = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

function TaskCard({ task, category, onSelect }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(task.id)
    }
  }

  return (
    <article
      className="task-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(task.id)}
      onKeyDown={handleKeyDown}
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
