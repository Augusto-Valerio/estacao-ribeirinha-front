import { useState } from 'react'
import type { Notice, NoticeInput } from '../../../types/notice'
import { RequestStateMessage } from '../../stations/components/RequestStateMessage'
import { StationSelector } from '../../stations/components/StationSelector'
import { useNoticeManagement } from '../hooks/useNoticeManagement'
import { DeleteNoticeDialog } from './DeleteNoticeDialog'
import { NoticeForm } from './NoticeForm'
import { NoticeTable } from './NoticeTable'
import styles from './StationManagement.module.css'

export function NoticeManagement() {
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null)
  const {
    stations,
    selectedStationId,
    notices,
    stationsStatus,
    noticesStatus,
    mutationStatus,
    feedback,
    retryStations,
    retryNotices,
    selectStation,
    submitNotice,
    removeNotice,
    clearFeedback,
  } = useNoticeManagement()

  const isSubmitting = mutationStatus === 'submitting'

  function handleStationChange(stationId: number) {
    setEditingNotice(null)
    setNoticeToDelete(null)
    selectStation(stationId)
  }

  async function handleSubmit(notice: NoticeInput, noticeId?: number) {
    const succeeded = await submitNotice(notice, noticeId)

    if (succeeded) {
      setEditingNotice(null)
    }

    return succeeded
  }

  async function handleDelete() {
    if (!noticeToDelete) {
      return
    }

    const succeeded = await removeNotice(noticeToDelete.idAviso)

    if (succeeded) {
      if (editingNotice?.idAviso === noticeToDelete.idAviso) {
        setEditingNotice(null)
      }
      setNoticeToDelete(null)
    }
  }

  function handleEdit(notice: Notice) {
    clearFeedback()
    setEditingNotice(notice)
    document.getElementById('notice-form-title')?.scrollIntoView({ block: 'start' })
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
    <section className={styles.management} aria-labelledby="notice-management-title">
      <header className={styles.sectionHeading}>
        <div>
          <h2 id="notice-management-title">Avisos</h2>
          <p>Publique e mantenha as orientações destinadas à comunidade.</p>
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
          <p>Cadastre uma estação antes de publicar avisos.</p>
        </div>
      ) : null}

      {stationsStatus === 'success' && selectedStationId !== null ? (
        <div className={styles.workspace}>
          <NoticeForm
            key={editingNotice?.idAviso ?? `new-notice-${selectedStationId}`}
            notice={editingNotice}
            stations={stations}
            selectedStationId={selectedStationId}
            submitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingNotice(null)}
          />

          <section className={styles.listRegion} aria-labelledby="notice-list-title">
            <header>
              <h3 id="notice-list-title">Avisos registrados</h3>
              <p>
                {noticesStatus === 'success'
                  ? `${notices.length} ${notices.length === 1 ? 'aviso encontrado' : 'avisos encontrados'}.`
                  : 'Consultando os avisos da estação.'}
              </p>
            </header>

            {noticesStatus === 'loading' ? (
              <div className={styles.loadingState} role="status">
                <strong>Carregando avisos...</strong>
                <p>Buscando as orientações da estação selecionada.</p>
              </div>
            ) : null}

            {noticesStatus === 'error' ? (
              <RequestStateMessage
                title="Não foi possível carregar os avisos"
                description="Verifique sua conexão e tente novamente."
                onRetry={retryNotices}
              />
            ) : null}

            {noticesStatus === 'success' ? (
              <NoticeTable
                notices={notices}
                disabled={isSubmitting}
                onEdit={handleEdit}
                onDelete={setNoticeToDelete}
              />
            ) : null}
          </section>
        </div>
      ) : null}

      {noticeToDelete ? (
        <DeleteNoticeDialog
          notice={noticeToDelete}
          submitting={isSubmitting}
          onCancel={() => setNoticeToDelete(null)}
          onConfirm={handleDelete}
        />
      ) : null}
    </section>
  )
}
