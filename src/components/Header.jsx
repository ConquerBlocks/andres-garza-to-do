import Button from './Button.jsx'
import ThemeSwitch from './ThemeSwitch.jsx'

function Header({
  categories,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  onNewTask,
  theme,
  onToggleTheme,
}) {
  const filterOptions = [{ id: 'all', name: 'Todas', color: null }, ...categories]

  return (
    <header className="mb-4 flex flex-col gap-4 sm:mb-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="inline-flex items-center gap-2 text-[28px] leading-tight sm:text-[32px] lg:text-[40px]">
          <span>
            <span className="text-brand-gradient">Blocks</span> To-Do
          </span>
          {/* Pixel-block motif from the site, as a small accent. */}
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 4 4" className="shrink-0">
            <rect x="0" y="0" width="1" height="1" fill="#ffbf00" />
            <rect x="1" y="0" width="1" height="1" fill="#ff7700" />
            <rect x="1" y="1" width="1" height="1" fill="#ff7700" />
            <rect x="2" y="1" width="1" height="1" fill="#ff4000" />
            <rect x="0" y="2" width="1" height="1" fill="#ff7700" />
            <rect x="3" y="3" width="1" height="1" fill="#ff4000" />
            <rect x="2" y="3" width="1" height="1" fill="#ff7700" />
          </svg>
        </h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
          {/* On phones the header button is replaced by the floating action button. */}
          <div className="hidden sm:block">
            <Button onClick={onNewTask}>Nueva tarea</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="block sm:shrink sm:grow-0 sm:basis-80">
          <span className="sr-only">Buscar por título</span>
          <input
            type="search"
            className="min-h-11 w-full rounded-sm border border-line bg-surface-raised px-4 py-2 font-body text-base text-title transition placeholder:text-muted hover:border-orange"
            placeholder="Buscar tareas…"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            autoComplete="off"
          />
        </label>

        {/* Negative margin + padding leave room for the focus outline inside the scroll container. */}
        <div
          className="-m-0.5 flex gap-2 overflow-x-auto p-0.5"
          role="group"
          aria-label="Filtrar por categoría"
        >
          {filterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm border border-line bg-surface-raised px-4 font-body text-sm font-medium whitespace-nowrap text-body transition hover:-translate-y-px hover:border-orange hover:text-orange active:scale-98 aria-pressed:border-orange aria-pressed:bg-surface aria-pressed:text-title"
              aria-pressed={option.id === categoryFilter}
              style={option.color ? { '--chip-color': option.color } : undefined}
              onClick={() => onCategoryFilterChange(option.id)}
            >
              {/* Category color only as a small dot, never as a background. */}
              {option.color && (
                <span className="size-2 rounded-full bg-(--chip-color)" aria-hidden="true" />
              )}
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
