import { useState, type FormEvent } from 'react'
import type { Reading, ReadingInput, ReadingTrend } from '../../../types/reading'
import type { Station } from '../../../types/station'
import styles from './StationManagement.module.css'

type ReadingFormValues = {
  idEstacao: string
  nivelAguaCm: string
  percentualBateria: string
  dataHora: string
  tendencia: ReadingTrend
}

function toLocalDateTimeInput(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

function initialValues(reading: Reading | null, selectedStationId: number | null) {
  if (reading) {
    return {
      idEstacao: String(reading.idEstacao),
      nivelAguaCm: String(reading.nivelAguaCm),
      percentualBateria: String(reading.percentualBateria),
      dataHora: reading.dataHora.slice(0, 16),
      tendencia: reading.tendencia,
    }
  }

  return {
    idEstacao: selectedStationId === null ? '' : String(selectedStationId),
    nivelAguaCm: '',
    percentualBateria: '',
    dataHora: toLocalDateTimeInput(new Date()),
    tendencia: 'ESTAVEL' as const,
  }
}

type ReadingFormProps = {
  reading: Reading | null
  stations: Station[]
  selectedStationId: number | null
  submitting: boolean
  onSubmit: (reading: ReadingInput, readingId?: number) => Promise<boolean>
  onCancelEdit: () => void
}

export function ReadingForm({
  reading,
  stations,
  selectedStationId,
  submitting,
  onSubmit,
  onCancelEdit,
}: ReadingFormProps) {
  const [values, setValues] = useState<ReadingFormValues>(() =>
    initialValues(reading, selectedStationId),
  )
  const [maximumDateTime] = useState(() => toLocalDateTimeInput(new Date()))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const succeeded = await onSubmit(
      {
        idEstacao: Number(values.idEstacao),
        nivelAguaCm: Number(values.nivelAguaCm),
        percentualBateria: Number(values.percentualBateria),
        dataHora: values.dataHora.length === 16 ? `${values.dataHora}:00` : values.dataHora,
        tendencia: values.tendencia,
      },
      reading?.idLeitura,
    )

    if (succeeded && reading === null) {
      setValues(initialValues(null, Number(values.idEstacao)))
    }
  }

  return (
    <section className={styles.formRegion} aria-labelledby="reading-form-title">
      <header>
        <h3 id="reading-form-title">
          {reading ? 'Editar leitura' : 'Cadastrar leitura'}
        </h3>
        <p>
          {reading
            ? `Atualizando o registro #${reading.idLeitura}.`
            : 'Registre uma medição enviada por uma estação.'}
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldWide}>
          <label htmlFor="reading-station">Estação vinculada</label>
          <select
            id="reading-station"
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

        <div>
          <label htmlFor="water-level">Nível da água (cm)</label>
          <input
            id="water-level"
            type="number"
            value={values.nivelAguaCm}
            min="0"
            step="0.1"
            required
            disabled={submitting}
            onChange={(event) => setValues({ ...values, nivelAguaCm: event.target.value })}
          />
        </div>

        <div>
          <label htmlFor="battery-percentage">Bateria da estação (%)</label>
          <input
            id="battery-percentage"
            type="number"
            value={values.percentualBateria}
            min="0"
            max="100"
            step="1"
            required
            disabled={submitting}
            onChange={(event) =>
              setValues({ ...values, percentualBateria: event.target.value })
            }
          />
        </div>

        <div className={styles.fieldWide}>
          <label htmlFor="reading-date-time">Data e hora</label>
          <input
            id="reading-date-time"
            type="datetime-local"
            value={values.dataHora}
            max={maximumDateTime}
            required
            disabled={submitting}
            onChange={(event) => setValues({ ...values, dataHora: event.target.value })}
          />
        </div>

        {reading ? (
          <div className={styles.fieldWide}>
            <label htmlFor="reading-trend">Tendência</label>
            <select
              id="reading-trend"
              value={values.tendencia}
              disabled={submitting}
              onChange={(event) =>
                setValues({ ...values, tendencia: event.target.value as ReadingTrend })
              }
            >
              <option value="SUBINDO">Subindo</option>
              <option value="ESTAVEL">Estável</option>
              <option value="DESCENDO">Descendo</option>
            </select>
          </div>
        ) : (
          <p className={`${styles.fieldWide} ${styles.formHint}`}>
            A tendência será calculada automaticamente pela API.
          </p>
        )}

        <div className={styles.formActions}>
          <button className={styles.primaryButton} type="submit" disabled={submitting}>
            {submitting ? 'Salvando...' : reading ? 'Salvar alterações' : 'Cadastrar leitura'}
          </button>
          {reading ? (
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
