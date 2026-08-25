import './TaskCard.css'

const PRIORITY_LABELS = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

function TaskCard({ title, category, priority }) {
  return (
    <article className="task-card">
      <h3 className="task-card__title">{title}</h3>
      <div className="task-card__meta">
        <span className="task-card__category" style={{ '--category-color': category.color }}>
          {category.name}
        </span>
        <span className={`task-card__priority task-card__priority--${priority}`}>
          {PRIORITY_LABELS[priority]}
        </span>
      </div>
    </article>
  )
}

export default TaskCard
