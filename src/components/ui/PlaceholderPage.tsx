import styles from './PlaceholderPage.module.css'

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className={styles.page} aria-labelledby="page-title">
      <header className={styles.pageHeader}>
        <h1 id="page-title">{title}</h1>
      </header>
      <div className={styles.content}>
        <p>{description}</p>
      </div>
    </section>
  )
}
