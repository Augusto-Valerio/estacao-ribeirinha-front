import { ArrowClockwise } from '@phosphor-icons/react/ArrowClockwise'
import { WarningCircle } from '@phosphor-icons/react/WarningCircle'
import styles from '../stationOverview.module.css'

type RequestStateMessageProps = {
  title: string
  description: string
  onRetry?: () => void
}

export function RequestStateMessage({
  title,
  description,
  onRetry,
}: RequestStateMessageProps) {
  return (
    <div className={styles.requestMessage} role={onRetry ? 'alert' : 'status'}>
      <WarningCircle aria-hidden="true" weight="regular" />
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
        {onRetry ? (
          <button type="button" onClick={onRetry}>
            <ArrowClockwise aria-hidden="true" />
            Tentar novamente
          </button>
        ) : null}
      </div>
    </div>
  )
}
