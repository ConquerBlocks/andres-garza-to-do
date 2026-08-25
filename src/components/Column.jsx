import TaskCard from './TaskCard.jsx'
import './Column.css'

function Column({ title, tasks }) {
  return (
    <section className="column">
      <header className="column__header">
        <h2 className="column__title">{title}</h2>
        <span className="column__count">{tasks.length}</span>
      </header>
      <ul className="column__list">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard title={task.title} category={task.category} priority={task.priority} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Column
