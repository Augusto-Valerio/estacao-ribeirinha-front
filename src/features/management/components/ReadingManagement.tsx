import { useState } from 'react'
import type { Reading, ReadingInput } from '../../../types/reading'
import { RequestStateMessage } from '../../stations/components/RequestStateMessage'
import { StationSelector } from '../../stations/components/StationSelector'
import { useReadingManagement } from '../hooks/useReadingManagement'
import { DeleteReadingDialog } from './DeleteReadingDialog'
import { ReadingForm } from './ReadingForm'
import { ReadingTable } from './ReadingTable'
import styles from './StationManagement.module.css'

export function ReadingManagement() {
  const [editingReading, setEditingReading] = useState<Reading | null>(null)
  const [readingToDelete, setReadingToDelete] = useState<Reading | null>(null)
  const {
    stations,
    selectedStationId,
    readings,
    stationsStatus,
    readingsStatus,
    mutationStatus,
    feedback,
    retryStations,
    retryReadings,
    selectStation,
    submitReading,
    removeReading,
    clearFeedback,
  } = useReadingManagement()

  const isSubmitting = mutationStatus === 'submitting'

  function handleStationChange(stationId: number) {
    setEditingReading(null)
    setReadingToDelete(null)
    selectStation(stationId)
  }

  async function handleSubmit(reading: ReadingInput, readingId?: number) {
    const succeeded = await submitReading(reading, readingId)

    if (succeeded) {
      setEditingReading(null)
    }

    return succeeded
  }

  async function handleDelete() {
    if (!readingToDelete) {
      return
    }

    const succeeded = await removeReading(readingToDelete.idLeitura)

    if (succeeded) {
      if (editingReading?.idLeitura === readingToDelete.idLeitura) {
        setEditingReading(null)
      }
      setReadingToDelete(null)
    }
  }

  function handleEdit(reading: Reading) {
    clearFeedback()
    setEditingReading(reading)
    document.getElementById('reading-form-title')?.scrollIntoView({ block: 'start' })
  }

  if (stationsStatus === 'error') {
    return (
      <RequestStateMessage
        title="Não foi possível carregar as estações"
        description="Verifique sua conexão e tente novamente."
        onRetry={retryStations}
      />
    )
  }

  return (
    <section className={styles.management} aria-labelledby="reading-management-title">
      <header className={styles.sectionHeading}>
        <div>
          <h2 id="reading-management-title">Leituras</h2>
          <p>Registre as medições de nível e bateria enviadas pelas estações.</p>
        </div>
        <StationSelector
          stations={stations}
          selectedStationId={selectedStationId}
          disabled={stationsStatus === 'loading' || isSubmitting}
          onChange={handleStationChange}
        />
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

      {stationsStatus === 'loading' ? (
        <div className={styles.loadingState} role="status">
          <strong>Carregando estações...</strong>
          <p>Consultando os pontos de monitoramento disponíveis.</p>
        </div>
      ) : null}

      {stationsStatus === 'success' && stations.length === 0 ? (
        <div className={styles.emptyState}>
          <strong>Nenhuma estação cadastrada</strong>
          <p>Cadastre uma estação antes de registrar leituras.</p>
        </div>
      ) : null}

      {stationsStatus === 'success' && selectedStationId !== null ? (
        <div className={styles.workspace}>
          <ReadingForm
            key={editingReading?.idLeitura ?? `new-reading-${selectedStationId}`}
            reading={editingReading}
            stations={stations}
            selectedStationId={selectedStationId}
            submitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingReading(null)}
          />

          <section className={styles.listRegion} aria-labelledby="reading-list-title">
            <header>
              <h3 id="reading-list-title">Leituras registradas</h3>
              <p>
                {readingsStatus === 'success'
                  ? `${readings.length} ${readings.length === 1 ? 'registro encontrado' : 'registros encontrados'}.`
                  : 'Consultando os registros da estação.'}
              </p>
            </header>

            {readingsStatus === 'loading' ? (
              <div className={styles.loadingState} role="status">
                <strong>Carregando leituras...</strong>
                <p>Buscando as medições da estação selecionada.</p>
              </div>
            ) : null}

            {readingsStatus === 'error' ? (
              <RequestStateMessage
                title="Não foi possível carregar as leituras"
                description="Verifique sua conexão e tente novamente."
                onRetry={retryReadings}
              />
            ) : null}

            {readingsStatus === 'success' ? (
              <ReadingTable
                readings={readings}
                disabled={isSubmitting}
                onEdit={handleEdit}
                onDelete={setReadingToDelete}
              />
            ) : null}
          </section>
        </div>
      ) : null}

      {readingToDelete ? (
        <DeleteReadingDialog
          reading={readingToDelete}
          submitting={isSubmitting}
          onCancel={() => setReadingToDelete(null)}
          onConfirm={handleDelete}
        />
      ) : null}
    </section>
  )
}
