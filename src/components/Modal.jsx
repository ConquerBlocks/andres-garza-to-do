import { useEffect } from 'react'
import CloseButton from './CloseButton.jsx'

// Phones: bottom sheet. Tablet and up: centered dialog.
function Modal({ title, onClose, children }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center bg-overlay sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-lg border border-b-0 border-line bg-surface-raised px-4 pt-2 pb-[calc(24px_+_env(safe-area-inset-bottom))] shadow-elevation sm:max-h-[calc(100vh_-_64px)] sm:max-w-[480px] sm:rounded-lg sm:border-b sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Visual grab handle of the bottom sheet. */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-[2px] bg-neutral-light sm:hidden" aria-hidden="true" />
        <header className="mb-4 flex items-center justify-between sm:mb-6">
          <h2 id="modal-title" className="text-[22px]">
            {title}
          </h2>
          <CloseButton onClick={onClose} />
        </header>
        {children}
      </div>
    </div>
  )
}

export default Modal
