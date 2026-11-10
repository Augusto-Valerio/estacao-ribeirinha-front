import { ArrowClockwise } from '@phosphor-icons/react/ArrowClockwise'
import { Info } from '@phosphor-icons/react/Info'
import { Warning } from '@phosphor-icons/react/Warning'
import { WarningOctagon } from '@phosphor-icons/react/WarningOctagon'
import type { Notice, NoticeLevel } from '../../../types/notice'
import type { ActiveNoticesStatus } from '../hooks/useActiveNotices'
import styles from './CommunityNotices.module.css'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
})

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

const noticeLevelLabels: Record<NoticeLevel, string> = {
  INFORMATIVO: 'Informativo',
  ATENCAO: 'Atenção',
  CRITICO: 'Crítico',
}

type CommunityNoticesProps = {
  notices: Notice[]
  status: ActiveNoticesStatus
  onRetry: () => void
}

function formatNoticeDate(value: string) {
  const date = new Date(value)
  const day = String(date.getDate()).padStart(2, '0')
  const month = monthFormatter.format(date).replace('.', '')

  return `${day} ${month} ${date.getFullYear()}, ${timeFormatter.format(date)}`
}

function NoticeIcon({ level }: { level: NoticeLevel }) {
  if (level === 'CRITICO') {
    return <WarningOctagon aria-hidden="true" weight="regular" />
  }

  if (level === 'ATENCAO') {
    return <Warning aria-hidden="true" weight="regular" />
  }

  return <Info aria-hidden="true" weight="regular" />
}

function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <article className={`${styles.noticeCard} ${styles[`notice${notice.nivel}`]}`}>
      <div className={styles.noticeMeta}>
        <div className={styles.noticeLevel}>
          <NoticeIcon level={notice.nivel} />
          <span>{noticeLevelLabels[notice.nivel]}</span>
        </div>
        <span className={styles.noticeStatus}>{notice.status}</span>
      </div>

      <h3>{notice.titulo}</h3>
      <p>{notice.mensagem}</p>
      <p className={styles.publishedAt}>
        Publicado em{' '}
        <time dateTime={notice.dataHora}>{formatNoticeDate(notice.dataHora)}</time>
      </p>
    </article>
  )
}

export function CommunityNotices({ notices, status, onRetry }: CommunityNoticesProps) {
  return (
    <section className={styles.notices} aria-labelledby="community-notices-title">
      <header className={styles.heading}>
        <h2 id="community-notices-title">Avisos da comunidade</h2>
        <p>Avisos relacionados à estação selecionada.</p>
      </header>

      {status === 'idle' || status === 'loading' ? (
        <div className={styles.stateMessage} role="status">
          <strong>Carregando avisos...</strong>
          <p>Buscando os comunicados ativos desta estação.</p>
        </div>
      ) : null}

      {status === 'error' ? (
        <div className={styles.stateMessage} role="alert">
          <strong>Não foi possível carregar os avisos</strong>
          <p>Verifique sua conexão e tente novamente.</p>
          <button type="button" onClick={onRetry}>
            <ArrowClockwise aria-hidden="true" />
            Tentar novamente
          </button>
        </div>
      ) : null}

      {status === 'success' && notices.length === 0 ? (
        <div className={styles.stateMessage}>
          <strong>Nenhum aviso ativo</strong>
          <p>Esta estação não possui comunicados ativos no momento.</p>
        </div>
      ) : null}

      {status === 'success' && notices.length > 0 ? (
        <ul className={styles.noticeList}>
          {notices.map((notice) => (
            <li key={notice.idAviso}>
              <NoticeCard notice={notice} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
