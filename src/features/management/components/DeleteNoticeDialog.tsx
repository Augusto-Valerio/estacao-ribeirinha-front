import { useEffect, useRef } from 'react'
import type { Notice } from '../../../types/notice'
import styles from './StationManagement.module.css'

type DeleteNoticeDialogProps = {
  notice: Notice
  submitting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteNoticeDialog({
  notice,
  submitting,
  onCancel,
  onConfirm,
}: DeleteNoticeDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => cancelButtonRef.current?.focus(), [])

  return (
    <div className={styles.dialogBackdrop}>
      <section
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-notice-title"
        aria-describedby="delete-notice-description"
      >
        <h3 id="delete-notice-title">Excluir aviso?</h3>
        <p id="delete-notice-description">
          O aviso <strong>#{notice.idAviso}</strong>, “<strong>{notice.titulo}</strong>”, será
          removido.
        </p>
        <p>Esta ação não poderá ser desfeita.</p>
        <div className={styles.dialogActions}>
          <button
            ref={cancelButtonRef}
            className={styles.secondaryButton}
            type="button"
            disabled={submitting}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className={styles.dangerButton}
            type="button"
            disabled={submitting}
            onClick={onConfirm}
          >
            {submitting ? 'Excluindo...' : 'Confirmar exclusão'}
          </button>
        </div>
      </section>
    </div>
  )
}
