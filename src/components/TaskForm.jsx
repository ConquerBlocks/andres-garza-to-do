import { useState } from 'react'
import { PRIORITIES, STATUSES } from '../data.js'
import Button from './Button.jsx'

const PRIORITY_LABELS = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

const FIELD_CLASSES = 'flex min-w-0 flex-col gap-2'
const LABEL_CLASSES = 'text-sm font-medium text-secondary'
// 16px prevents iOS from zooming into focused inputs; 44px is the minimum touch target.
const INPUT_CLASSES =
  'min-h-11 w-full rounded-sm border border-line bg-bg px-3 py-2 font-body text-base text-title transition hover:border-orange'

// `task` is optional: when present the form edits it (and exposes the status field).
function TaskForm({ task, categories, onSubmit, onCancel, submitLabel = 'Guardar' }) {
  const isEditing = Boolean(task)
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [category, setCategory] = useState(task?.category ?? categories[0]?.id ?? '')
  const [priority, setPriority] = useState(task?.priority ?? 'medium')
  const [status, setStatus] = useState(task?.status ?? 'todo')
  const [titleError, setTitleError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setTitleError('El título es obligatorio')
      return
    }
    const values = { title: trimmedTitle, description: description.trim(), category, priority }
    onSubmit(isEditing ? { ...values, status } : values)
  }

  function handleTitleChange(event) {
    setTitle(event.target.value)
    if (titleError) setTitleError('')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div className={FIELD_CLASSES}>
        <label className={LABEL_CLASSES} htmlFor="task-title">
          Título
        </label>
        <input
          id="task-title"
          className={`${INPUT_CLASSES}${titleError ? ' border-terra' : ''}`}
          type="text"
          value={title}
          onChange={handleTitleChange}
          aria-invalid={Boolean(titleError)}
          aria-describedby={titleError ? 'task-title-error' : undefined}
          autoFocus
        />
        {titleError && (
          <p id="task-title-error" className="text-[13px] text-terra" role="alert">
            {titleError}
          </p>
        )}
      </div>

      <div className={FIELD_CLASSES}>
        <label className={LABEL_CLASSES} htmlFor="task-description">
          Descripción
        </label>
        <textarea
          id="task-description"
          className={`${INPUT_CLASSES} min-h-22 resize-y`}
          rows="3"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={FIELD_CLASSES}>
          <label className={LABEL_CLASSES} htmlFor="task-category">
            Categoría
          </label>
          <select
            id="task-category"
            className={INPUT_CLASSES}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className={FIELD_CLASSES}>
          <label className={LABEL_CLASSES} htmlFor="task-priority">
            Prioridad
          </label>
          <select
            id="task-priority"
            className={INPUT_CLASSES}
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {PRIORITY_LABELS[item]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isEditing && (
        <div className={FIELD_CLASSES}>
          <label className={LABEL_CLASSES} htmlFor="task-status">
            Estado
          </label>
          <select
            id="task-status"
            className={INPUT_CLASSES}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {STATUSES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}

export default TaskForm
