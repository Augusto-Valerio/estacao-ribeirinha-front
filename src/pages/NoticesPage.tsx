import { NoticeArchive } from '../features/notices/components/NoticeArchive'
import { useNoticesPage } from '../features/notices/hooks/useNoticesPage'
import { RequestStateMessage } from '../features/stations/components/RequestStateMessage'
import { StationSelector } from '../features/stations/components/StationSelector'
import stationStyles from '../features/stations/stationOverview.module.css'
import styles from './noticesPage.module.css'

export function NoticesPage() {
  const {
    stations,
    selectedStation,
    selectedStationId,
    stationsStatus,
    notices,
    noticesStatus,
    selectStation,
    retryStations,
    retryNotices,
  } = useNoticesPage()

  const isStationsLoading = stationsStatus === 'loading'

  return (
    <section className={styles.page} aria-labelledby="page-title">
      <header className={styles.pageHeading}>
        <div>
          <h1 id="page-title">Avisos da comunidade</h1>
          <p>Consulte comunicados ativos e encerrados de cada estação.</p>
        </div>
        <StationSelector
          stations={stations}
          selectedStationId={selectedStationId}
          disabled={isStationsLoading}
          onChange={selectStation}
        />
      </header>

      {isStationsLoading ? (
        <div className={stationStyles.readingState} role="status">
          <strong>Carregando estações...</strong>
          <p>O serviço do Render pode levar alguns segundos para iniciar.</p>
        </div>
      ) : null}

      {stationsStatus === 'error' ? (
        <RequestStateMessage
          title="Não foi possível carregar as estações"
          description="Verifique sua conexão e tente novamente em alguns instantes."
          onRetry={retryStations}
        />
      ) : null}

      {stationsStatus === 'success' && stations.length === 0 ? (
        <RequestStateMessage
          title="Nenhuma estação cadastrada"
          description="A API ainda não possui estações disponíveis para consulta."
        />
      ) : null}

      {selectedStation ? (
        <NoticeArchive
          stationName={`${selectedStation.nome} — ${selectedStation.comunidade}, ${selectedStation.municipio}/${selectedStation.uf}`}
          notices={notices}
          status={noticesStatus}
          onRetry={retryNotices}
        />
      ) : null}
    </section>
  )
}
