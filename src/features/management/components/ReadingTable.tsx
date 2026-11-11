import { PencilSimple } from '@phosphor-icons/react/PencilSimple'
import { Trash } from '@phosphor-icons/react/Trash'
import type { Reading, ReadingTrend } from '../../../types/reading'
import styles from './StationManagement.module.css'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const trendLabels: Record<ReadingTrend, string> = {
  SUBINDO: 'Subindo',
  ESTAVEL: 'Estável',
  DESCENDO: 'Descendo',
}

type ReadingTableProps = {
  readings: Reading[]
  disabled: boolean
  onEdit: (reading: Reading) => void
  onDelete: (reading: Reading) => void
}

export function ReadingTable({ readings, disabled, onEdit, onDelete }: ReadingTableProps) {
  if (readings.length === 0) {
    return (
      <div className={styles.emptyState}>
        <strong>Nenhuma leitura registrada</strong>
        <p>Use o formulário para incluir a primeira medição desta estação.</p>
      </div>
    )
  }

  return (
    <div className={styles.tableWrapper}>
      <table>
        <caption>Leituras da estação selecionada</caption>
        <thead>
          <tr>
            <th scope="col">Data e hora</th>
            <th scope="col">Nível</th>
            <th scope="col">Bateria</th>
            <th scope="col">Tendência</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((reading) => (
            <tr key={reading.idLeitura}>
              <td data-label="Data e hora">
                <time dateTime={reading.dataHora}>
                  {dateFormatter.format(new Date(reading.dataHora))}
                </time>
                <span>#{reading.idLeitura}</span>
              </td>
              <td data-label="Nível">
                <strong>{reading.nivelAguaCm.toLocaleString('pt-BR')} cm</strong>
              </td>
              <td data-label="Bateria">{reading.percentualBateria}%</td>
              <td data-label="Tendência">
                <span className={`${styles.status} ${styles[`trend${reading.tendencia}`]}`}>
                  {trendLabels[reading.tendencia]}
                </span>
              </td>
              <td data-label="Ações">
                <div className={styles.rowActions}>
                  <button type="button" disabled={disabled} onClick={() => onEdit(reading)}>
                    <PencilSimple aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    className={styles.deleteAction}
                    type="button"
                    disabled={disabled}
                    onClick={() => onDelete(reading)}
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
