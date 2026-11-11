import { useState } from 'react'
import type { Station, StationInput } from '../../../types/station'
import { RequestStateMessage } from '../../stations/components/RequestStateMessage'
import { useStationManagement } from '../hooks/useStationManagement'
import { DeleteStationDialog } from './DeleteStationDialog'
import { StationForm } from './StationForm'
import { StationTable } from './StationTable'
import styles from './StationManagement.module.css'

export function StationManagement() {
  const [editingStation, setEditingStation] = useState<Station | null>(null)
  const [stationToDelete, setStationToDelete] = useState<Station | null>(null)
  const {
    stations,
    status,
    mutationStatus,
    feedback,
    retry,
    submitStation,
    removeStation,
    clearFeedback,
  } = useStationManagement()

  const isSubmitting = mutationStatus === 'submitting'

  async function handleSubmit(station: StationInput, stationId?: number) {
    const succeeded = await submitStation(station, stationId)

    if (succeeded) {
      setEditingStation(null)
    }

    return succeeded
  }

  async function handleDelete() {
    if (!stationToDelete) {
      return
    }

    const succeeded = await removeStation(stationToDelete.idEstacao)

    if (succeeded) {
      if (editingStation?.idEstacao === stationToDelete.idEstacao) {
        setEditingStation(null)
      }
      setStationToDelete(null)
    }
  }

  function handleEdit(station: Station) {
    clearFeedback()
    setEditingStation(station)
    document.getElementById('station-form-title')?.scrollIntoView({ block: 'start' })
  }

  return (
    <section className={styles.management} aria-labelledby="station-management-title">
      <header className={styles.sectionHeading}>
        <div>
          <h2 id="station-management-title">Estações</h2>
          <p>Cadastre e mantenha os pontos de monitoramento disponíveis na API.</p>
        </div>
        {status === 'success' ? (
          <p className={styles.recordCount}>
            <strong>{stations.length}</strong>{' '}
            {stations.length === 1 ? 'estação cadastrada' : 'estações cadastradas'}
          </p>
        ) : null}
      </header>

      {feedback ? (
        <div
          className={`${styles.feedback} ${styles[`feedback${feedback.tone}`]}`}
          role={feedback.tone === 'error' ? 'alert' : 'status'}
        >
          <p>{feedback.message}</p>
          <button type="button" onClick={clearFeedback}>
            Fechar
          </button>
        </div>
      ) : null}

      {status === 'loading' ? (
        <div className={styles.loadingState} role="status">
          <strong>Carregando estações...</strong>
          <p>Consultando os registros disponíveis na API.</p>
        </div>
      ) : null}

      {status === 'error' ? (
        <RequestStateMessage
          title="Não foi possível carregar as estações"
          description="Verifique sua conexão e tente novamente."
          onRetry={retry}
        />
      ) : null}

      {status === 'success' ? (
        <div className={styles.workspace}>
          <StationForm
            key={editingStation?.idEstacao ?? 'new-station'}
            station={editingStation}
            submitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingStation(null)}
          />

          <section className={styles.listRegion} aria-labelledby="station-list-title">
            <header>
              <h3 id="station-list-title">Estações cadastradas</h3>
              <p>Selecione um registro para editar ou excluir.</p>
            </header>
            <StationTable
              stations={stations}
              disabled={isSubmitting}
              onEdit={handleEdit}
              onDelete={setStationToDelete}
            />
          </section>
        </div>
      ) : null}

      {stationToDelete ? (
        <DeleteStationDialog
          station={stationToDelete}
          submitting={isSubmitting}
          onCancel={() => setStationToDelete(null)}
          onConfirm={handleDelete}
        />
      ) : null}
    </section>
  )
}
