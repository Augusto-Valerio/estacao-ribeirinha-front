import { useRef, useState, type KeyboardEvent } from 'react'
import { NoticeManagement } from '../features/management/components/NoticeManagement'
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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % sections.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + sections.length) % sections.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = sections.length - 1
    } else {
      return
    }

    event.preventDefault()
    setActiveSection(sections[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section className={styles.page} aria-labelledby="page-title">
      <header className={styles.pageHeading}>
        <div>
          <h1 id="page-title">Gestão do monitoramento</h1>
          <p>Cadastre e mantenha os dados demonstrativos disponíveis na API.</p>
        </div>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Tipos de dados">
        {sections.map((section, index) => (
          <button
            key={section.id}
            id={`${section.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeSection === section.id}
            aria-controls={`${section.id}-panel`}
            tabIndex={activeSection === section.id ? 0 : -1}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            onClick={() => setActiveSection(section.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
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
        {activeSection === 'notices' ? <NoticeManagement /> : null}
      </div>
    </section>
  )
}
