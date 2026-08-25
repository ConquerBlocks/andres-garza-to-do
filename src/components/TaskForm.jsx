import { useState } from 'react'
import { PRIORITIES, STATUSES } from '../data.js'
import './TaskForm.css'

const PRIORITY_LABELS = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

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
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__field">
        <label className="task-form__label" htmlFor="task-title">
          Título
        </label>
        <input
          id="task-title"
          className={`task-form__input${titleError ? ' task-form__input--invalid' : ''}`}
          type="text"
          value={title}
          onChange={handleTitleChange}
          aria-invalid={Boolean(titleError)}
          aria-describedby={titleError ? 'task-title-error' : undefined}
          autoFocus
        />
        {titleError && (
          <p id="task-title-error" className="task-form__error" role="alert">
            {titleError}
          </p>
        )}
      </div>

      <div className="task-form__field">
        <label className="task-form__label" htmlFor="task-description">
          Descripción
        </label>
        <textarea
          id="task-description"
          className="task-form__input task-form__textarea"
          rows="3"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="task-form__row">
        <div className="task-form__field">
          <label className="task-form__label" htmlFor="task-category">
            Categoría
          </label>
          <select
            id="task-category"
            className="task-form__input"
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

        <div className="task-form__field">
          <label className="task-form__label" htmlFor="task-priority">
            Prioridad
          </label>
          <select
            id="task-priority"
            className="task-form__input"
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
        <div className="task-form__field">
          <label className="task-form__label" htmlFor="task-status">
            Estado
          </label>
          <select
            id="task-status"
            className="task-form__input"
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

      <div className="task-form__actions">
        <button type="button" className="button button--secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="button button--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
