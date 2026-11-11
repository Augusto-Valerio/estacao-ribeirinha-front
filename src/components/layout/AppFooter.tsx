import { Info } from '@phosphor-icons/react/Info'
import styles from './AppFooter.module.css'

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Info aria-hidden="true" weight="bold" />
        <p>
          <strong>Monitoramento local demonstrativo.</strong>{' '}
          Em situações de emergência, consulte os canais oficiais do município.
        </p>
      </div>
    </footer>
  )
}
