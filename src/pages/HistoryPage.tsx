import { lazy, Suspense } from 'react'
import { ReadingHistoryTable } from '../features/readings/components/ReadingHistoryTable'
import { useHistoryPage } from '../features/readings/hooks/useHistoryPage'
import { RequestStateMessage } from '../features/stations/components/RequestStateMessage'
import { StationSelector } from '../features/stations/components/StationSelector'
import { StationSummary } from '../features/stations/components/StationSummary'
import stationStyles from '../features/stations/stationOverview.module.css'
import styles from './historyPage.module.css'

const WaterLevelChart = lazy(() =>
  import('../features/readings/components/WaterLevelChart').then((module) => ({
    default: module.WaterLevelChart,
  })),
)

export function HistoryPage() {
  const {
    stations,
    selectedStation,
    selectedStationId,
    stationsStatus,
    readings,
    readingsStatus,
    selectStation,
    retryStations,
    retryReadings,
  } = useHistoryPage()

  const latestReading = readings.at(-1) ?? null
  const isStationsLoading = stationsStatus === 'loading'

  return (
    <section className={styles.page} aria-labelledby="page-title">
      <header className={styles.pageHeading}>
        <div>
          <h1 id="page-title">Histórico de leituras</h1>
          <p>Acompanhe os registros enviados pela estação selecionada.</p>
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
        <>
          <StationSummary
            station={selectedStation}
            latestReading={latestReading}
            isReadingLoading={readingsStatus === 'loading'}
          />

          <Suspense
            fallback={
              <div className={stationStyles.readingState} role="status">
                <strong>Preparando o gráfico...</strong>
                <p>Carregando a visualização do histórico.</p>
              </div>
            }
          >
            <WaterLevelChart
              readings={readings}
              status={readingsStatus}
              onRetry={retryReadings}
              scope="all"
              wide
            />
          </Suspense>

          {readingsStatus === 'success' ? <ReadingHistoryTable readings={readings} /> : null}
        </>
      ) : null}
    </section>
  )
}
