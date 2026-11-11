import { PencilSimple } from '@phosphor-icons/react/PencilSimple'
import { Trash } from '@phosphor-icons/react/Trash'
import type { Notice, NoticeLevel, NoticeStatus } from '../../../types/notice'
import styles from './StationManagement.module.css'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const levelLabels: Record<NoticeLevel, string> = {
  INFORMATIVO: 'Informativo',
  ATENCAO: 'Atenção',
  CRITICO: 'Crítico',
}

const statusLabels: Record<NoticeStatus, string> = {
  ATIVO: 'Ativo',
  ENCERRADO: 'Encerrado',
}

type NoticeTableProps = {
  notices: Notice[]
  disabled: boolean
  onEdit: (notice: Notice) => void
  onDelete: (notice: Notice) => void
}

export function NoticeTable({ notices, disabled, onEdit, onDelete }: NoticeTableProps) {
  if (notices.length === 0) {
    return (
      <div className={styles.emptyState}>
        <strong>Nenhum aviso registrado</strong>
        <p>Use o formulário para publicar a primeira orientação desta estação.</p>
      </div>
    )
  }

  return (
    <div className={styles.tableWrapper}>
      <table>
        <caption>Avisos da estação selecionada</caption>
        <thead>
          <tr>
            <th scope="col">Aviso</th>
            <th scope="col">Data e hora</th>
            <th scope="col">Nível</th>
            <th scope="col">Status</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.idAviso}>
              <td data-label="Aviso">
                <strong>{notice.titulo}</strong>
                <span>#{notice.idAviso}</span>
              </td>
              <td data-label="Data e hora">
                <time dateTime={notice.dataHora}>
                  {dateFormatter.format(new Date(notice.dataHora))}
                </time>
              </td>
              <td data-label="Nível">
                <span className={`${styles.status} ${styles[`level${notice.nivel}`]}`}>
                  {levelLabels[notice.nivel]}
                </span>
              </td>
              <td data-label="Status">
                <span className={`${styles.status} ${styles[`notice${notice.status}`]}`}>
                  {statusLabels[notice.status]}
                </span>
              </td>
              <td data-label="Ações">
                <div className={styles.rowActions}>
                  <button type="button" disabled={disabled} onClick={() => onEdit(notice)}>
                    <PencilSimple aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    className={styles.deleteAction}
                    type="button"
                    disabled={disabled}
                    onClick={() => onDelete(notice)}
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
