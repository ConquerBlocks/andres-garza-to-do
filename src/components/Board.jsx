import Column from './Column.jsx'
import { STATUSES } from '../data.js'
import './Board.css'

function Board({ tasks, categories, activeStatus, onChangeActiveStatus, onSelectTask, onMoveTask }) {
  const tasksByStatus = Object.fromEntries(
    STATUSES.map((status) => [status.id, tasks.filter((task) => task.status === status.id)]),
  )

  return (
    <section className="board" aria-label="Tablero de tareas">
      {/* Tabs are only visible on small screens, where a single column is shown at a time. */}
      <div className="board__tabs" role="tablist" aria-label="Estado">
        {STATUSES.map((status) => {
          const isActive = status.id === activeStatus
          return (
            <button
              key={status.id}
              type="button"
              role="tab"
              id={`tab-${status.id}`}
              aria-selected={isActive}
              aria-controls={`column-${status.id}`}
              className={`board__tab${isActive ? ' board__tab--active' : ''}`}
              onClick={() => onChangeActiveStatus(status.id)}
            >
              <span>{status.title}</span>
              <span className="board__tab-count">{tasksByStatus[status.id].length}</span>
            </button>
          )
        })}
      </div>

      <div className="board__columns">
        {STATUSES.map((status) => (
          <Column
            key={status.id}
            status={status.id}
            title={status.title}
            tasks={tasksByStatus[status.id]}
            categories={categories}
            isActive={status.id === activeStatus}
            onSelectTask={onSelectTask}
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
    </section>
  )
}

export default Board
