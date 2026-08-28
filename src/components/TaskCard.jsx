import { useState } from 'react'
import { STATUSES } from '../data.js'

const PRIORITY_LABELS = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

const PRIORITY_DOT_CLASSES = {
  low: 'bg-neutral',
  medium: 'bg-amber',
  high: 'bg-terra',
}

const MOVE_BUTTON_CLASSES =
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-line bg-transparent text-xl leading-none text-body transition enabled:hover:border-orange enabled:hover:text-orange enabled:active:scale-98 disabled:cursor-default disabled:text-neutral disabled:opacity-50'

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
      className={`flex cursor-pointer flex-col gap-2 rounded-sm border border-line bg-surface-raised p-4 shadow-elevation transition hover:-translate-y-px hover:border-orange sm:cursor-grab${isDragging ? ' opacity-50' : ''}`}
      role="button"
      tabIndex={0}
      draggable
      onClick={() => onSelect(task.id)}
      onKeyDown={handleKeyDown}
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
    >
      <h3 className="text-base leading-[1.3] font-semibold">{task.title}</h3>
      <div className="flex items-center justify-between gap-2 text-xs font-medium">
        {/* Category color is used only as a small dot and text accent, never as a background. */}
        {category && (
          <span
            className="inline-flex items-center gap-2 text-(--category-color)"
            style={{ '--category-color': category.color }}
          >
            <span className="size-2 rounded-full bg-(--category-color)" aria-hidden="true" />
            {category.name}
          </span>
        )}
        <span className="inline-flex items-center gap-2 tracking-[0.04em] text-secondary uppercase">
          <span
            className={`size-2 rounded-[2px] ${PRIORITY_DOT_CLASSES[task.priority]}`}
            aria-hidden="true"
          />
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      {/* Touch alternative to drag and drop; only visible on small screens. */}
      <div className="mt-2 flex justify-between gap-2 border-t border-line-subtle pt-2 sm:hidden">
        <button
          type="button"
          className={MOVE_BUTTON_CLASSES}
          disabled={!previousStatus}
          aria-label={previousStatus ? `Mover a ${previousStatus.title}` : 'No se puede retroceder'}
          onClick={(event) => handleMove(event, previousStatus)}
          onKeyDown={(event) => event.stopPropagation()}
        >
          ←
        </button>
        <button
          type="button"
          className={MOVE_BUTTON_CLASSES}
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
