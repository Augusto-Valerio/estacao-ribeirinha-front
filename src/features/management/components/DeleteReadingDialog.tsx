import { useEffect, useRef } from 'react'
import type { Reading } from '../../../types/reading'
import styles from './StationManagement.module.css'

type DeleteReadingDialogProps = {
  reading: Reading
  submitting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteReadingDialog({
  reading,
  submitting,
  onCancel,
  onConfirm,
}: DeleteReadingDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => cancelButtonRef.current?.focus(), [])

  return (
    <div className={styles.dialogBackdrop}>
      <section
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-reading-title"
        aria-describedby="delete-reading-description"
      >
        <h3 id="delete-reading-title">Excluir leitura?</h3>
        <p id="delete-reading-description">
          O registro <strong>#{reading.idLeitura}</strong>, com nível de{' '}
          <strong>{reading.nivelAguaCm.toLocaleString('pt-BR')} cm</strong>, será removido.
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
