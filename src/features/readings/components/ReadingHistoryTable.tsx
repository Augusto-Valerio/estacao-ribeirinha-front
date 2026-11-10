import type { Reading, ReadingTrend } from '../../../types/reading'
import styles from './ReadingHistoryTable.module.css'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const levelFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const trendLabels: Record<ReadingTrend, string> = {
  SUBINDO: 'Subindo',
  ESTAVEL: 'Estável',
  DESCENDO: 'Descendo',
}

type ReadingHistoryTableProps = {
  readings: Reading[]
}

export function ReadingHistoryTable({ readings }: ReadingHistoryTableProps) {
  const newestFirst = readings.toReversed()

  return (
    <section className={styles.tableSection} aria-labelledby="reading-list-title">
      <header className={styles.heading}>
        <div>
          <h2 id="reading-list-title">Leituras registradas</h2>
          <p>Dados completos enviados pela estação selecionada.</p>
        </div>
        <strong>
          {readings.length} {readings.length === 1 ? 'leitura' : 'leituras'}
        </strong>
      </header>

      {readings.length === 0 ? (
        <div className={styles.emptyState}>
          <strong>Nenhuma leitura registrada</strong>
          <p>Esta estação ainda não possui dados para exibir.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table>
            <caption>Histórico completo de leituras da estação selecionada</caption>
            <thead>
              <tr>
                <th scope="col">Data e hora</th>
                <th scope="col">Nível do rio</th>
                <th scope="col">Tendência</th>
                <th scope="col">Bateria</th>
              </tr>
            </thead>
            <tbody>
              {newestFirst.map((reading) => (
                <tr key={reading.idLeitura}>
                  <td data-label="Data e hora">
                    <time dateTime={reading.dataHora}>
                      {dateFormatter.format(new Date(reading.dataHora)).replace('.', '')}
                    </time>
                  </td>
                  <td data-label="Nível do rio">
                    <strong>{levelFormatter.format(reading.nivelAguaCm)} cm</strong>
                  </td>
                  <td data-label="Tendência">
                    <span className={styles[`trend${reading.tendencia}`]}>
                      {trendLabels[reading.tendencia]}
                    </span>
                  </td>
                  <td data-label="Bateria">{reading.percentualBateria}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
