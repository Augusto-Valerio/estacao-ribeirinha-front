import { useState, type FormEvent } from 'react'
import type { Station, StationInput, StationStatus } from '../../../types/station'
import styles from './StationManagement.module.css'

const emptyStation: StationInput = {
  nome: '',
  comunidade: '',
  municipio: '',
  uf: '',
  status: 'ATIVA',
}

function getInitialValues(station: Station | null): StationInput {
  return station
    ? {
        nome: station.nome,
        comunidade: station.comunidade,
        municipio: station.municipio,
        uf: station.uf,
        status: station.status,
      }
    : emptyStation
}

type StationFormProps = {
  station: Station | null
  submitting: boolean
  onSubmit: (station: StationInput, stationId?: number) => Promise<boolean>
  onCancelEdit: () => void
}

export function StationForm({
  station,
  submitting,
  onSubmit,
  onCancelEdit,
}: StationFormProps) {
  const [values, setValues] = useState<StationInput>(() => getInitialValues(station))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const succeeded = await onSubmit(
      {
        ...values,
        nome: values.nome.trim(),
        comunidade: values.comunidade.trim(),
        municipio: values.municipio.trim(),
        uf: values.uf.trim().toUpperCase(),
      },
      station?.idEstacao,
    )

    if (succeeded && station === null) {
      setValues(emptyStation)
    }
  }

  return (
    <section className={styles.formRegion} aria-labelledby="station-form-title">
      <header>
        <h3 id="station-form-title">
          {station ? 'Editar estação' : 'Cadastrar estação'}
        </h3>
        <p>
          {station
            ? `Atualizando o registro #${station.idEstacao}.`
            : 'Preencha os dados de identificação e operação.'}
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldWide}>
          <label htmlFor="station-name">Nome da estação</label>
          <input
            id="station-name"
            name="nome"
            value={values.nome}
            maxLength={80}
            required
            disabled={submitting}
            onChange={(event) => setValues({ ...values, nome: event.target.value })}
          />
          <span>Até 80 caracteres.</span>
        </div>

        <div className={styles.fieldWide}>
          <label htmlFor="station-community">Comunidade</label>
          <input
            id="station-community"
            name="comunidade"
            value={values.comunidade}
            maxLength={100}
            required
            disabled={submitting}
            onChange={(event) => setValues({ ...values, comunidade: event.target.value })}
          />
        </div>

        <div>
          <label htmlFor="station-city">Município</label>
          <input
            id="station-city"
            name="municipio"
            value={values.municipio}
            maxLength={100}
            required
            disabled={submitting}
            onChange={(event) => setValues({ ...values, municipio: event.target.value })}
          />
        </div>

        <div>
          <label htmlFor="station-state">UF</label>
          <input
            id="station-state"
            name="uf"
            value={values.uf}
            minLength={2}
            maxLength={2}
            pattern="[A-Za-z]{2}"
            title="Informe exatamente duas letras."
            required
            disabled={submitting}
            autoCapitalize="characters"
            onChange={(event) => setValues({ ...values, uf: event.target.value.toUpperCase() })}
          />
        </div>

        <div className={styles.fieldWide}>
          <label htmlFor="station-status">Situação operacional</label>
          <select
            id="station-status"
            name="status"
            value={values.status}
            disabled={submitting}
            onChange={(event) =>
              setValues({ ...values, status: event.target.value as StationStatus })
            }
          >
            <option value="ATIVA">Ativa</option>
            <option value="MANUTENCAO">Em manutenção</option>
            <option value="INATIVA">Inativa</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button className={styles.primaryButton} type="submit" disabled={submitting}>
            {submitting ? 'Salvando...' : station ? 'Salvar alterações' : 'Cadastrar estação'}
          </button>
          {station ? (
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
