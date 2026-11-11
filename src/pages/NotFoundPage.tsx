import { ArrowLeft } from '@phosphor-icons/react/ArrowLeft'
import { Link } from 'react-router-dom'
import styles from './notFoundPage.module.css'

export function NotFoundPage() {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <p className={styles.code}>Erro 404</p>
      <h1 id="not-found-title">Página não encontrada</h1>
      <p>
        O endereço informado não existe ou foi alterado. Volte para a visão geral do
        monitoramento.
      </p>
      <Link to="/">
        <ArrowLeft aria-hidden="true" />
        Ir para a visão geral
      </Link>
    </section>
  )
}
