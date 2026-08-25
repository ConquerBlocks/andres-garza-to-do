import Column from './Column.jsx'
import { STATUSES } from '../data.js'
import './Board.css'

function Board({ tasks, categories, onSelectTask, onDropTask }) {
  return (
    <section className="board" aria-label="Tablero de tareas">
      {STATUSES.map((status) => (
        <Column
          key={status.id}
          status={status.id}
          title={status.title}
          tasks={tasks.filter((task) => task.status === status.id)}
          categories={categories}
          onSelectTask={onSelectTask}
          onDropTask={onDropTask}
        />
      ))}
    </section>
  )
}

export default Board
