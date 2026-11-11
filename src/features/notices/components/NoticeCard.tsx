import { Info } from '@phosphor-icons/react/Info'
import { Warning } from '@phosphor-icons/react/Warning'
import { WarningOctagon } from '@phosphor-icons/react/WarningOctagon'
import type { Notice, NoticeLevel, NoticeStatus } from '../../../types/notice'
import styles from './NoticeCard.module.css'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const noticeLevelLabels: Record<NoticeLevel, string> = {
  INFORMATIVO: 'Informativo',
  ATENCAO: 'Atenção',
  CRITICO: 'Crítico',
}

const noticeStatusLabels: Record<NoticeStatus, string> = {
  ATIVO: 'Ativo',
  ENCERRADO: 'Encerrado',
}

function NoticeLevelIcon({ level }: { level: NoticeLevel }) {
  if (level === 'CRITICO') {
    return <WarningOctagon aria-hidden="true" weight="regular" />
  }

  if (level === 'ATENCAO') {
    return <Warning aria-hidden="true" weight="regular" />
  }

  return <Info aria-hidden="true" weight="regular" />
}

type NoticeCardProps = {
  notice: Notice
}

export function NoticeCard({ notice }: NoticeCardProps) {
  const isClosed = notice.status === 'ENCERRADO'

  return (
    <article
      className={`${styles.noticeCard} ${styles[`notice${notice.nivel}`]} ${isClosed ? styles.closed : ''}`}
    >
      <div className={styles.noticeMeta}>
        <div className={styles.noticeLevel}>
          <NoticeLevelIcon level={notice.nivel} />
          <span>{noticeLevelLabels[notice.nivel]}</span>
        </div>
        <span className={`${styles.noticeStatus} ${styles[`status${notice.status}`]}`}>
          {noticeStatusLabels[notice.status]}
        </span>
      </div>

      <h3>{notice.titulo}</h3>
      <p>{notice.mensagem}</p>
      <p className={styles.publishedAt}>
        Publicado em{' '}
        <time dateTime={notice.dataHora}>{dateFormatter.format(new Date(notice.dataHora))}</time>
      </p>
    </article>
  )
}
