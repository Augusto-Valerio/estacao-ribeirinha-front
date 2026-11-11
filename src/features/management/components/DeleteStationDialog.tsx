import { useEffect, useRef } from 'react'
import type { Station } from '../../../types/station'
import styles from './StationManagement.module.css'

type DeleteStationDialogProps = {
  station: Station
  submitting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteStationDialog({
  station,
  submitting,
  onCancel,
  onConfirm,
}: DeleteStationDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelButtonRef.current?.focus()
  }, [])

  return (
    <div className={styles.dialogBackdrop}>
      <section
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-station-title"
        aria-describedby="delete-station-description"
      >
        <h3 id="delete-station-title">Excluir estação?</h3>
        <p id="delete-station-description">
          Você está prestes a excluir <strong>{station.nome}</strong>. A API não permite a
          exclusão quando existem leituras ou avisos vinculados.
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
