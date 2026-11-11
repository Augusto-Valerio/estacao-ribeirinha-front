import { useState, type FormEvent } from 'react'
import type {
  Notice,
  NoticeInput,
  NoticeLevel,
  NoticeStatus,
} from '../../../types/notice'
import type { Station } from '../../../types/station'
import styles from './StationManagement.module.css'

type NoticeFormValues = {
  idEstacao: string
  titulo: string
  mensagem: string
  nivel: NoticeLevel
  status: NoticeStatus
  dataHora: string
}

function toLocalDateTimeInput(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

function initialValues(notice: Notice | null, selectedStationId: number | null) {
  if (notice) {
    return {
      idEstacao: String(notice.idEstacao),
      titulo: notice.titulo,
      mensagem: notice.mensagem,
      nivel: notice.nivel,
      status: notice.status,
      dataHora: notice.dataHora.slice(0, 16),
    }
  }

  return {
    idEstacao: selectedStationId === null ? '' : String(selectedStationId),
    titulo: '',
    mensagem: '',
    nivel: 'INFORMATIVO' as const,
    status: 'ATIVO' as const,
    dataHora: toLocalDateTimeInput(new Date()),
  }
}

type NoticeFormProps = {
  notice: Notice | null
  stations: Station[]
  selectedStationId: number | null
  submitting: boolean
  onSubmit: (notice: NoticeInput, noticeId?: number) => Promise<boolean>
  onCancelEdit: () => void
}

export function NoticeForm({
  notice,
  stations,
  selectedStationId,
  submitting,
  onSubmit,
  onCancelEdit,
}: NoticeFormProps) {
  const [values, setValues] = useState<NoticeFormValues>(() =>
    initialValues(notice, selectedStationId),
  )
  const [maximumDateTime] = useState(() => toLocalDateTimeInput(new Date()))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const succeeded = await onSubmit(
      {
        idEstacao: Number(values.idEstacao),
        titulo: values.titulo,
        mensagem: values.mensagem,
        nivel: values.nivel,
        status: values.status,
        dataHora: values.dataHora.length === 16 ? `${values.dataHora}:00` : values.dataHora,
      },
      notice?.idAviso,
    )

    if (succeeded && notice === null) {
      setValues(initialValues(null, Number(values.idEstacao)))
    }
  }

  return (
    <section className={styles.formRegion} aria-labelledby="notice-form-title">
      <header>
        <h3 id="notice-form-title">{notice ? 'Editar aviso' : 'Cadastrar aviso'}</h3>
        <p>
          {notice
            ? `Atualizando o aviso #${notice.idAviso}.`
            : 'Publique uma orientação vinculada a uma estação.'}
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldWide}>
          <label htmlFor="notice-station">Estação vinculada</label>
          <select
            id="notice-station"
            value={values.idEstacao}
            required
            disabled={submitting || stations.length === 0}
            onChange={(event) => setValues({ ...values, idEstacao: event.target.value })}
          >
            {stations.map((station) => (
              <option key={station.idEstacao} value={station.idEstacao}>
                {station.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldWide}>
          <label htmlFor="notice-title">Título</label>
          <input
            id="notice-title"
            type="text"
            value={values.titulo}
            maxLength={100}
            required
            disabled={submitting}
            onChange={(event) => setValues({ ...values, titulo: event.target.value })}
          />
          <span>{values.titulo.length}/100 caracteres</span>
        </div>

        <div className={styles.fieldWide}>
          <label htmlFor="notice-message">Mensagem</label>
          <textarea
            id="notice-message"
            value={values.mensagem}
            maxLength={500}
            rows={5}
            required
            disabled={submitting}
            onChange={(event) => setValues({ ...values, mensagem: event.target.value })}
          />
          <span>{values.mensagem.length}/500 caracteres</span>
        </div>

        <div className={styles.noticeChoiceField}>
          <label htmlFor="notice-level">Nível</label>
          <select
            id="notice-level"
            value={values.nivel}
            disabled={submitting}
            onChange={(event) =>
              setValues({ ...values, nivel: event.target.value as NoticeLevel })
            }
          >
            <option value="INFORMATIVO">Informativo</option>
            <option value="ATENCAO">Atenção</option>
            <option value="CRITICO">Crítico</option>
          </select>
        </div>

        <div className={styles.noticeChoiceField}>
          <label htmlFor="notice-status">Status</label>
          <select
            id="notice-status"
            value={values.status}
            disabled={submitting}
            onChange={(event) =>
              setValues({ ...values, status: event.target.value as NoticeStatus })
            }
          >
            <option value="ATIVO">Ativo</option>
            <option value="ENCERRADO">Encerrado</option>
          </select>
        </div>

        <div className={styles.fieldWide}>
          <label htmlFor="notice-date-time">Data e hora</label>
          <input
            id="notice-date-time"
            type="datetime-local"
            value={values.dataHora}
            max={maximumDateTime}
            required
            disabled={submitting}
            onChange={(event) => setValues({ ...values, dataHora: event.target.value })}
          />
        </div>

        <div className={styles.formActions}>
          <button className={styles.primaryButton} type="submit" disabled={submitting}>
            {submitting ? 'Salvando...' : notice ? 'Salvar alterações' : 'Cadastrar aviso'}
          </button>
          {notice ? (
            <button
              className={styles.secondaryButton}
              type="button"
              disabled={submitting}
              onClick={onCancelEdit}
            >
              Cancelar edição
            </button>
          ) : null}
        </div>
      </form>
    </section>
  )
}
