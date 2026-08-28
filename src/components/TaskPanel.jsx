import { useEffect } from 'react'
import TaskForm from './TaskForm.jsx'
import Button from './Button.jsx'
import CloseButton from './CloseButton.jsx'

const DATE_FORMAT = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' })

function formatDate(isoDate) {
  return DATE_FORMAT.format(new Date(isoDate))
}

// Phones: bottom sheet. Tablet and up: side panel anchored to the right.
function TaskPanel({ task, categories, onSave, onDelete, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-10 flex items-end justify-center bg-overlay sm:items-stretch sm:justify-end"
      onClick={onClose}
    >
      <aside
        className="flex max-h-[90vh] w-full flex-col gap-4 overflow-y-auto rounded-t-lg border border-b-0 border-line bg-surface-raised px-4 pt-2 pb-[calc(24px_+_env(safe-area-inset-bottom))] shadow-elevation sm:h-full sm:max-h-none sm:w-[420px] sm:gap-6 sm:rounded-l-lg sm:rounded-r-none sm:border-0 sm:border-l sm:p-6 lg:px-6 lg:py-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-panel-title"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Visual grab handle of the bottom sheet. */}
        <div className="mx-auto h-1 w-10 shrink-0 rounded-[2px] bg-neutral-light sm:hidden" aria-hidden="true" />
        <header className="flex items-center justify-between">
          <h2 id="task-panel-title" className="text-[22px]">
            Detalle de tarea
          </h2>
          <CloseButton onClick={onClose} />
        </header>

        {/* key resets the form state when a different task is selected */}
        <TaskForm
          key={task.id}
          task={task}
          categories={categories}
          onSubmit={onSave}
          onCancel={onClose}
          submitLabel="Guardar cambios"
        />

        <dl className="flex flex-col gap-2 border-t border-line-subtle pt-4 text-[13px]">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Creada</dt>
            <dd className="text-secondary">{formatDate(task.createdAt)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Actualizada</dt>
            <dd className="text-secondary">{formatDate(task.updatedAt)}</dd>
          </div>
        </dl>

        <footer className="border-t border-line-subtle pt-4 sm:mt-auto">
          <Button variant="danger" className="w-full sm:w-auto" onClick={onDelete}>
            Eliminar tarea
          </Button>
        </footer>
      </aside>
    </div>
  )
}

export default TaskPanel
