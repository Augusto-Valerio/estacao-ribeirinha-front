import { Outlet } from 'react-router-dom'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'
import styles from './AppLayout.module.css'

export function AppLayout() {
  return (
    <div className={styles.appShell}>
      <a className={styles.skipLink} href="#main-content">
        Ir para o conteúdo principal
      </a>
      <AppHeader />
      <main className={styles.mainContent} id="main-content">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}
