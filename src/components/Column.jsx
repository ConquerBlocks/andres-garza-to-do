import TaskCard from './TaskCard.jsx'
import './Column.css'

function Column({ title, tasks, categories }) {
  return (
    <section className="column">
      <header className="column__header">
        <h2 className="column__title">{title}</h2>
        <span className="column__count" aria-label={`${tasks.length} tareas`}>
          {tasks.length}
        </span>
      </header>
      <ul className="column__list">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard
              task={task}
              category={categories.find((category) => category.id === task.category)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Column
