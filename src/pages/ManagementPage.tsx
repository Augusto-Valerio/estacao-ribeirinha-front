import { useState } from 'react'
import { ReadingManagement } from '../features/management/components/ReadingManagement'
import { StationManagement } from '../features/management/components/StationManagement'
import styles from './managementPage.module.css'

type ManagementSection = 'stations' | 'readings' | 'notices'

const sections: Array<{ id: ManagementSection; label: string }> = [
  { id: 'stations', label: 'Estações' },
  { id: 'readings', label: 'Leituras' },
  { id: 'notices', label: 'Avisos' },
]

export function ManagementPage() {
  const [activeSection, setActiveSection] = useState<ManagementSection>('stations')

  return (
    <section className={styles.page} aria-labelledby="page-title">
      <header className={styles.pageHeading}>
        <div>
          <h1 id="page-title">Gestão do monitoramento</h1>
          <p>Cadastre e mantenha os dados demonstrativos disponíveis na API.</p>
        </div>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Tipos de dados">
        {sections.map((section) => (
          <button
            key={section.id}
            id={`${section.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeSection === section.id}
            aria-controls={`${section.id}-panel`}
            tabIndex={activeSection === section.id ? 0 : -1}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div
        id={`${activeSection}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeSection}-tab`}
      >
        {activeSection === 'stations' ? <StationManagement /> : null}
        {activeSection === 'readings' ? <ReadingManagement /> : null}
        {activeSection === 'notices' ? (
          <div className={styles.pendingSection}>
            <strong>Gestão de avisos</strong>
            <p>Este fluxo será conectado à API no checkpoint seguinte.</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
