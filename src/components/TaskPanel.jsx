import { useEffect } from 'react'
import TaskForm from './TaskForm.jsx'
import './TaskPanel.css'

const DATE_FORMAT = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' })

function formatDate(isoDate) {
  return DATE_FORMAT.format(new Date(isoDate))
}

function TaskPanel({ task, categories, onSave, onDelete, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="task-panel-backdrop" onClick={onClose}>
      <aside
        className="task-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-panel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="task-panel__header">
          <h2 id="task-panel-title" className="task-panel__title">
            Detalle de tarea
          </h2>
          <button type="button" className="task-panel__close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
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

        <dl className="task-panel__meta">
          <div className="task-panel__meta-item">
            <dt>Creada</dt>
            <dd>{formatDate(task.createdAt)}</dd>
          </div>
          <div className="task-panel__meta-item">
            <dt>Actualizada</dt>
            <dd>{formatDate(task.updatedAt)}</dd>
          </div>
        </dl>

        <footer className="task-panel__footer">
          <button type="button" className="button button--danger" onClick={onDelete}>
            Eliminar tarea
          </button>
        </footer>
      </aside>
    </div>
  )
}

export default TaskPanel
