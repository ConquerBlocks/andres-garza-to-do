// Accessible switch (44px touch target) that toggles between dark and light themes.
function ThemeSwitch({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Modo oscuro"
      onClick={onToggle}
      className="group inline-flex min-h-11 items-center gap-2 rounded-sm px-2 text-secondary transition hover:-translate-y-px hover:text-orange active:scale-98"
    >
      {/* Moon outline; the switch itself carries the accessible name. */}
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition ${
          isDark ? 'border-orange bg-orange' : 'border-line bg-surface-raised'
        }`}
      >
        <span
          className={`absolute left-0.5 size-4.5 rounded-full transition ${
            isDark ? 'translate-x-5 bg-title' : 'translate-x-0 bg-neutral'
          }`}
        />
      </span>
    </button>
  )
}

export default ThemeSwitch
