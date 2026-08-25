import Modal from './Modal.jsx'
import './ConfirmDialog.css'

function ConfirmDialog({ title, message, confirmLabel = 'Confirmar', onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="confirm-dialog__message">{message}</p>
      <div className="confirm-dialog__actions">
        <button type="button" className="button button--secondary" onClick={onCancel} autoFocus>
          Cancelar
        </button>
        <button type="button" className="button button--danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
