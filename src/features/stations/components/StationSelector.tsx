import type { Station } from '../../../types/station'
import styles from '../stationOverview.module.css'

type StationSelectorProps = {
  stations: Station[]
  selectedStationId: number | null
  disabled?: boolean
  onChange: (stationId: number) => void
}

export function StationSelector({
  stations,
  selectedStationId,
  disabled = false,
  onChange,
}: StationSelectorProps) {
  return (
    <div className={styles.selectorGroup}>
      <label htmlFor="station-selector">Estação</label>
      <select
        id="station-selector"
        value={selectedStationId ?? ''}
        disabled={disabled || stations.length === 0}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {stations.length === 0 ? (
          <option value="">Nenhuma estação disponível</option>
        ) : null}
        {stations.map((station) => (
          <option key={station.idEstacao} value={station.idEstacao}>
            {station.nome}
          </option>
        ))}
      </select>
    </div>
  )
}
