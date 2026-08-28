import Column from './Column.jsx'
import { STATUSES } from '../data.js'

function Board({
  tasks,
  categories,
  isFiltering,
  activeStatus,
  onChangeActiveStatus,
  onSelectTask,
  onMoveTask,
}) {
  const tasksByStatus = Object.fromEntries(
    STATUSES.map((status) => [status.id, tasks.filter((task) => task.status === status.id)]),
  )

  return (
    <section aria-label="Tablero de tareas">
      {/* Tabs are only visible on small screens, where a single column is shown at a time. */}
      <div
        className="mb-4 flex gap-2 overflow-x-auto rounded-lg border border-line bg-surface p-1 sm:hidden"
        role="tablist"
        aria-label="Estado"
      >
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
              className="group inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-[12px] border border-transparent bg-transparent px-1 font-body text-[13px] font-medium whitespace-nowrap text-secondary transition hover:text-orange aria-selected:border-orange aria-selected:bg-surface-raised aria-selected:text-title"
              onClick={() => onChangeActiveStatus(status.id)}
            >
              <span>{status.title}</span>
              <span className="font-display text-[13px] font-medium text-muted group-aria-selected:text-orange">
                {tasksByStatus[status.id].length}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tablet and up: all columns side by side. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-start lg:gap-6">
        {STATUSES.map((status) => (
          <Column
            key={status.id}
            status={status.id}
            title={status.title}
            tasks={tasksByStatus[status.id]}
            categories={categories}
            isActive={status.id === activeStatus}
            isFiltering={isFiltering}
            onSelectTask={onSelectTask}
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
    </section>
  )
}

export default Board
