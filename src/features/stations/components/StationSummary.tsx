import { BatteryHigh } from '@phosphor-icons/react/BatteryHigh'
import { MapPin } from '@phosphor-icons/react/MapPin'
import type { Reading, Station, StationStatus } from '../../../types/station'
import styles from '../stationOverview.module.css'

const statusLabels: Record<StationStatus, string> = {
  ATIVA: 'Ativa',
  MANUTENCAO: 'Em manutenção',
  INATIVA: 'Inativa',
}

type StationSummaryProps = {
  station: Station
  latestReading: Reading | null
  isReadingLoading: boolean
}

export function StationSummary({
  station,
  latestReading,
  isReadingLoading,
}: StationSummaryProps) {
  const statusClassName = styles[`status${station.status}`]

  return (
    <section className={styles.stationSummary} aria-label="Resumo da estação">
      <div className={styles.stationIdentity}>
        <MapPin aria-hidden="true" weight="fill" />
        <div>
          <h2>{station.nome}</h2>
          <p>
            {station.comunidade}
            <span aria-hidden="true"> • </span>
            {station.municipio} — {station.uf}
          </p>
        </div>
      </div>

      <div className={styles.stationStatus}>
        <span className={`${styles.statusDot} ${statusClassName}`} aria-hidden="true" />
        <span className={`${styles.statusLabel} ${statusClassName}`}>
          {statusLabels[station.status]}
        </span>
      </div>

      <div className={styles.batteryStatus}>
        <BatteryHigh aria-hidden="true" weight="regular" />
        <div>
          <span>Bateria</span>
          <strong>
            {isReadingLoading
              ? 'Carregando'
              : latestReading
                ? `${latestReading.percentualBateria}%`
                : 'Sem leitura'}
          </strong>
        </div>
      </div>
    </section>
  )
}
