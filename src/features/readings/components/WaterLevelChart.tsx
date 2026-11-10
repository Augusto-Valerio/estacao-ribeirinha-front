import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts'
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import type { Reading } from '../../../types/reading'
import type { ReadingHistoryStatus } from '../hooks/useReadingHistory'
import styles from './WaterLevelChart.module.css'

const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

const axisFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 1,
})

type ChartPoint = Reading & {
  timestamp: number
  fullLabel: string
}

type WaterLevelChartProps = {
  readings: Reading[]
  status: ReadingHistoryStatus
  onRetry: () => void
}

function getLast24Hours(readings: Reading[]) {
  const latestReading = readings.at(-1)
  const latestTimestamp = latestReading ? new Date(latestReading.dataHora).getTime() : Number.NaN

  if (!Number.isFinite(latestTimestamp)) {
    return []
  }

  const periodStart = latestTimestamp - 24 * 60 * 60 * 1000

  return readings.filter((reading) => new Date(reading.dataHora).getTime() >= periodStart)
}

function toChartPoint(reading: Reading): ChartPoint {
  const date = new Date(reading.dataHora)

  return {
    ...reading,
    timestamp: date.getTime(),
    fullLabel: dateTimeFormatter.format(date).replace('.', ''),
  }
}

function ChartTooltip({ active, payload }: TooltipContentProps<ValueType, NameType>) {
  const point = payload?.[0]?.payload as ChartPoint | undefined

  if (!active || !point) {
    return null
  }

  return (
    <div className={styles.tooltip}>
      <strong>{numberFormatter.format(point.nivelAguaCm)} cm</strong>
      <span>{point.fullLabel}</span>
    </div>
  )
}

export function WaterLevelChart({ readings, status, onRetry }: WaterLevelChartProps) {
  const recentReadings = getLast24Hours(readings)
  const chartData = recentReadings.map(toChartPoint)
  const hasSingleReading = chartData.length === 1

  return (
    <section className={styles.historySection} aria-labelledby="water-level-history-title">
      <header className={styles.heading}>
        <h2 id="water-level-history-title">Histórico do nível do rio</h2>
        <p>Últimas 24 horas</p>
      </header>

      {status === 'idle' || status === 'loading' ? (
        <div className={styles.stateMessage} role="status">
          <strong>Carregando histórico...</strong>
          <p>Buscando as leituras registradas para esta estação.</p>
        </div>
      ) : null}

      {status === 'error' ? (
        <div className={styles.stateMessage} role="alert">
          <strong>Não foi possível carregar o histórico</strong>
          <p>Verifique sua conexão e tente novamente.</p>
          <button type="button" onClick={onRetry}>
            Tentar novamente
          </button>
        </div>
      ) : null}

      {status === 'success' && chartData.length === 0 ? (
        <div className={styles.stateMessage}>
          <strong>Nenhuma leitura nas últimas 24 horas</strong>
          <p>O gráfico será exibido quando a estação receber uma nova leitura.</p>
        </div>
      ) : null}

      {status === 'success' && chartData.length > 0 ? (
        <>
          {hasSingleReading ? (
            <p className={styles.dataNotice}>
              Há uma leitura registrada neste período. Novos pontos formarão a linha de evolução.
            </p>
          ) : null}

          <div className={styles.chartWrapper}>
            <LineChart
              accessibilityLayer
              responsive
              data={chartData}
              margin={{ top: 12, right: 18, bottom: 8, left: 8 }}
              role="img"
              aria-label={`Gráfico com ${chartData.length} ${chartData.length === 1 ? 'leitura' : 'leituras'} do nível do rio nas últimas 24 horas`}
              style={{ width: '100%', height: '100%' }}
            >
              <CartesianGrid stroke="#d8dee7" strokeDasharray="2 2" vertical={false} />
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(timestamp: number) => axisFormatter.format(new Date(timestamp))}
                tick={{ fill: '#526071', fontSize: 14 }}
                tickLine={false}
                axisLine={{ stroke: '#aeb8c5' }}
                minTickGap={28}
              />
              <YAxis
                dataKey="nivelAguaCm"
                type="number"
                domain={[
                  (minimum: number) => Math.max(0, Math.floor(minimum - 5)),
                  (maximum: number) => Math.ceil(maximum + 5),
                ]}
                tickFormatter={(value: number) => numberFormatter.format(value)}
                tick={{ fill: '#526071', fontSize: 14 }}
                tickLine={false}
                axisLine={{ stroke: '#aeb8c5' }}
                width={54}
                label={{
                  value: 'Nível (cm)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#152033',
                  fontSize: 14,
                }}
              />
              <Tooltip content={ChartTooltip} cursor={{ stroke: '#aeb8c5' }} />
              <Line
                dataKey="nivelAguaCm"
                name="Nível do rio"
                type="monotone"
                stroke="#155b96"
                strokeWidth={3}
                dot={{ r: 5, fill: '#155b96', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#0a3764', stroke: '#ffffff', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </LineChart>
          </div>

          <table className={styles.accessibleTable}>
            <caption>Leituras do nível do rio nas últimas 24 horas</caption>
            <thead>
              <tr>
                <th scope="col">Data e hora</th>
                <th scope="col">Nível do rio</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((point) => (
                <tr key={point.idLeitura}>
                  <td>{point.fullLabel}</td>
                  <td>{numberFormatter.format(point.nivelAguaCm)} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </section>
  )
}
