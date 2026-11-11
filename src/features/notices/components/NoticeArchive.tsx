import { ArrowClockwise } from '@phosphor-icons/react/ArrowClockwise'
import { useMemo, useState } from 'react'
import type { Notice, NoticeLevel, NoticeStatus } from '../../../types/notice'
import type { NoticesStatus } from '../hooks/useStationNotices'
import { NoticeCard } from './NoticeCard'
import styles from './NoticeArchive.module.css'

type StatusFilter = 'TODOS' | NoticeStatus
type LevelFilter = 'TODOS' | NoticeLevel

type NoticeArchiveProps = {
  stationName: string
  notices: Notice[]
  status: NoticesStatus
  onRetry: () => void
}

export function NoticeArchive({ stationName, notices, status, onRetry }: NoticeArchiveProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('TODOS')
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('TODOS')

  const activeCount = notices.filter((notice) => notice.status === 'ATIVO').length
  const closedCount = notices.length - activeCount
  const filteredNotices = useMemo(
    () =>
      notices.filter(
        (notice) =>
          (statusFilter === 'TODOS' || notice.status === statusFilter) &&
          (levelFilter === 'TODOS' || notice.nivel === levelFilter),
      ),
    [levelFilter, notices, statusFilter],
  )

  function clearFilters() {
    setStatusFilter('TODOS')
    setLevelFilter('TODOS')
  }

  return (
    <section className={styles.archive} aria-labelledby="notice-archive-title">
      <header className={styles.heading}>
        <div>
          <h2 id="notice-archive-title">Comunicados da estação</h2>
          <p>{stationName}</p>
        </div>

        {status === 'success' && notices.length > 0 ? (
          <dl className={styles.summary} aria-label="Resumo dos avisos">
            <div>
              <dt>Ativos</dt>
              <dd>{activeCount}</dd>
            </div>
            <div>
              <dt>Encerrados</dt>
              <dd>{closedCount}</dd>
            </div>
          </dl>
        ) : null}
      </header>

      {status === 'idle' || status === 'loading' ? (
        <div className={styles.stateMessage} role="status">
          <strong>Carregando avisos...</strong>
          <p>Buscando os comunicados desta estação.</p>
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
          <strong>Nenhum aviso registrado</strong>
          <p>Esta estação ainda não possui comunicados ativos ou encerrados.</p>
        </div>
      ) : null}

      {status === 'success' && notices.length > 0 ? (
        <>
          <div className={styles.filters} aria-label="Filtros dos avisos">
            <div>
              <label htmlFor="notice-status-filter">Situação</label>
              <select
                id="notice-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              >
                <option value="TODOS">Todos</option>
                <option value="ATIVO">Ativos</option>
                <option value="ENCERRADO">Encerrados</option>
              </select>
            </div>

            <div>
              <label htmlFor="notice-level-filter">Nível</label>
              <select
                id="notice-level-filter"
                value={levelFilter}
                onChange={(event) => setLevelFilter(event.target.value as LevelFilter)}
              >
                <option value="TODOS">Todos</option>
                <option value="INFORMATIVO">Informativo</option>
                <option value="ATENCAO">Atenção</option>
                <option value="CRITICO">Crítico</option>
              </select>
            </div>
          </div>

          <div className={styles.resultsHeading} aria-live="polite">
            <strong>
              {filteredNotices.length}{' '}
              {filteredNotices.length === 1 ? 'comunicado encontrado' : 'comunicados encontrados'}
            </strong>
            <span>Mais recentes primeiro</span>
          </div>

          {filteredNotices.length > 0 ? (
            <ul className={styles.noticeList}>
              {filteredNotices.map((notice) => (
                <li key={notice.idAviso}>
                  <NoticeCard notice={notice} />
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.filteredEmpty}>
              <strong>Nenhum comunicado corresponde aos filtros</strong>
              <p>Altere os critérios para consultar outros registros.</p>
              <button type="button" onClick={clearFilters}>
                Limpar filtros
              </button>
            </div>
          )}
        </>
      ) : null}
    </section>
  )
}
