import { lazy, Suspense } from 'react'
import { useReadingHistory } from '../features/readings/hooks/useReadingHistory'
import { LatestReading } from '../features/stations/components/LatestReading'
import { RequestStateMessage } from '../features/stations/components/RequestStateMessage'
import { StationSelector } from '../features/stations/components/StationSelector'
import { StationSummary } from '../features/stations/components/StationSummary'
import { useStationOverview } from '../features/stations/hooks/useStationOverview'
import styles from '../features/stations/stationOverview.module.css'

const WaterLevelChart = lazy(() =>
  import('../features/readings/components/WaterLevelChart').then((module) => ({
    default: module.WaterLevelChart,
  })),
)

export function OverviewPage() {
  const {
    stations,
    selectedStation,
    selectedStationId,
    latestReading,
    stationsStatus,
    readingStatus,
    selectStation,
    retryStations,
    retryReading,
  } = useStationOverview()
  const {
    readings: readingHistory,
    status: readingHistoryStatus,
    retry: retryReadingHistory,
  } = useReadingHistory(selectedStationId)

  const isStationsLoading = stationsStatus === 'idle' || stationsStatus === 'loading'

  return (
    <section className={styles.page} aria-labelledby="page-title">
      <header className={styles.pageHeading}>
        <h1 id="page-title">Situação da estação</h1>
        <StationSelector
          stations={stations}
          selectedStationId={selectedStationId}
          disabled={isStationsLoading}
          onChange={selectStation}
        />
      </header>

      {isStationsLoading ? (
        <div className={styles.readingState} role="status">
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
          description="A API ainda não possui estações disponíveis para monitoramento."
        />
      ) : null}

      {selectedStation ? (
        <>
          <StationSummary
            station={selectedStation}
            latestReading={latestReading}
            isReadingLoading={readingStatus === 'loading'}
          />
          <LatestReading
            reading={latestReading}
            status={readingStatus}
            onRetry={retryReading}
          />
          <Suspense
            fallback={
              <div className={styles.readingState} role="status">
                <strong>Preparando o gráfico...</strong>
                <p>Carregando a visualização do histórico.</p>
              </div>
            }
          >
            <WaterLevelChart
              readings={readingHistory}
              status={readingHistoryStatus}
              onRetry={retryReadingHistory}
            />
          </Suspense>
        </>
      ) : null}
    </section>
  )
}
