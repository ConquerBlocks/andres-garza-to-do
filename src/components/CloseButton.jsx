// 44px square close control used by the modal and the detail panel.
function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Cerrar"
      className="inline-flex size-11 items-center justify-center rounded-sm border border-line bg-transparent text-2xl leading-none text-secondary transition hover:-translate-y-px hover:border-orange hover:text-orange active:scale-98"
    >
      ×
    </button>
  )
}

export default CloseButton
