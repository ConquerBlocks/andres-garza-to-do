import './Header.css'

function Header({
  categories,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  onNewTask,
}) {
  const filterOptions = [{ id: 'all', name: 'Todas', color: null }, ...categories]

  return (
    <header className="header">
      <div className="header__top">
        <h1 className="header__title">TaskBoard</h1>
        <button type="button" className="button button--primary header__new-task" onClick={onNewTask}>
          Nueva tarea
        </button>
      </div>

      <div className="header__filters">
        <label className="header__search">
          <span className="visually-hidden">Buscar por título</span>
          <input
            type="search"
            className="header__search-input"
            placeholder="Buscar tareas…"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            autoComplete="off"
          />
        </label>

        <div className="header__chips" role="group" aria-label="Filtrar por categoría">
          {filterOptions.map((option) => {
            const isActive = option.id === categoryFilter
            return (
              <button
                key={option.id}
                type="button"
                className={`chip${isActive ? ' chip--active' : ''}`}
                aria-pressed={isActive}
                style={option.color ? { '--chip-color': option.color } : undefined}
                onClick={() => onCategoryFilterChange(option.id)}
              >
                {option.color && <span className="chip__dot" aria-hidden="true" />}
                {option.name}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}

export default Header
