import { ArrowClockwise } from '@phosphor-icons/react/ArrowClockwise'
import type { Notice } from '../../../types/notice'
import type { ActiveNoticesStatus } from '../hooks/useActiveNotices'
import { NoticeCard } from './NoticeCard'
import styles from './CommunityNotices.module.css'

type CommunityNoticesProps = {
  notices: Notice[]
  status: ActiveNoticesStatus
  onRetry: () => void
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
