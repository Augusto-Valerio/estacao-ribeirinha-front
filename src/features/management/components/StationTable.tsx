import { PencilSimple } from '@phosphor-icons/react/PencilSimple'
import { Trash } from '@phosphor-icons/react/Trash'
import type { Station, StationStatus } from '../../../types/station'
import styles from './StationManagement.module.css'

const statusLabels: Record<StationStatus, string> = {
  ATIVA: 'Ativa',
  MANUTENCAO: 'Em manutenção',
  INATIVA: 'Inativa',
}

type StationTableProps = {
  stations: Station[]
  disabled: boolean
  onEdit: (station: Station) => void
  onDelete: (station: Station) => void
}

export function StationTable({ stations, disabled, onEdit, onDelete }: StationTableProps) {
  if (stations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <strong>Nenhuma estação cadastrada</strong>
        <p>Use o formulário para incluir a primeira estação de monitoramento.</p>
      </div>
    )
  }

  return (
    <div className={styles.tableWrapper}>
      <table>
        <caption>Estações cadastradas na API</caption>
        <thead>
          <tr>
            <th scope="col">Estação</th>
            <th scope="col">Localidade</th>
            <th scope="col">Situação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.idEstacao}>
              <td data-label="Estação">
                <strong>{station.nome}</strong>
                <span>#{station.idEstacao}</span>
              </td>
              <td data-label="Localidade">
                {station.comunidade}
                <span>
                  {station.municipio}/{station.uf}
                </span>
              </td>
              <td data-label="Situação">
                <span className={`${styles.status} ${styles[`status${station.status}`]}`}>
                  {statusLabels[station.status]}
                </span>
              </td>
              <td data-label="Ações">
                <div className={styles.rowActions}>
                  <button type="button" disabled={disabled} onClick={() => onEdit(station)}>
                    <PencilSimple aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    className={styles.deleteAction}
                    type="button"
                    disabled={disabled}
                    onClick={() => onDelete(station)}
                  >
                    <Trash aria-hidden="true" />
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
