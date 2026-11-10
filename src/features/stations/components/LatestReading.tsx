import { ArrowDownRight } from '@phosphor-icons/react/ArrowDownRight'
import { ArrowRight } from '@phosphor-icons/react/ArrowRight'
import { ArrowUpRight } from '@phosphor-icons/react/ArrowUpRight'
import type { Reading, ReadingTrend } from '../../../types/reading'
import { RequestStateMessage } from './RequestStateMessage'
import styles from '../stationOverview.module.css'

const levelFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const monthFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
})

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

const trendLabels: Record<ReadingTrend, string> = {
  SUBINDO: 'Subindo',
  ESTAVEL: 'Estável',
  DESCENDO: 'Descendo',
}

function formatReadingDate(value: string) {
  const date = new Date(value)
  const day = String(date.getDate()).padStart(2, '0')
  const month = monthFormatter.format(date).replace('.', '')

  return `${day} ${month} ${date.getFullYear()}, ${timeFormatter.format(date)}`
}

function TrendIcon({ trend }: { trend: ReadingTrend }) {
  if (trend === 'SUBINDO') {
    return <ArrowUpRight aria-hidden="true" weight="bold" />
  }

  if (trend === 'DESCENDO') {
    return <ArrowDownRight aria-hidden="true" weight="bold" />
  }

  return <ArrowRight aria-hidden="true" weight="bold" />
}

type LatestReadingProps = {
  reading: Reading | null
  status: 'idle' | 'loading' | 'success' | 'error'
  onRetry: () => void
}

export function LatestReading({ reading, status, onRetry }: LatestReadingProps) {
  if (status === 'loading' || status === 'idle') {
    return (
      <div className={styles.readingState} role="status">
        <strong>Carregando última leitura...</strong>
        <p>O serviço do Render pode levar alguns segundos para iniciar.</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <RequestStateMessage
        title="Não foi possível carregar a última leitura"
        description="A estação continua selecionada. Tente novamente em alguns instantes."
        onRetry={onRetry}
      />
    )
  }

  if (!reading) {
    return (
      <RequestStateMessage
        title="Nenhuma leitura disponível"
        description="Esta estação ainda não possui uma leitura registrada."
      />
    )
  }

  return (
    <section className={styles.latestReading} aria-label="Última leitura da estação">
      <div className={styles.levelReading}>
        <p>
          <strong>Nível do rio</strong> <span>(última leitura)</span>
        </p>
        <div>
          {levelFormatter.format(reading.nivelAguaCm)} <span>cm</span>
        </div>
      </div>

      <div className={`${styles.trend} ${styles[`trend${reading.tendencia}`]}`}>
        <div className={styles.trendValue}>
          <TrendIcon trend={reading.tendencia} />
          <strong>{trendLabels[reading.tendencia]}</strong>
        </div>
        <p>
          Atualizado em <time dateTime={reading.dataHora}>{formatReadingDate(reading.dataHora)}</time>
        </p>
      </div>
    </section>
  )
}
