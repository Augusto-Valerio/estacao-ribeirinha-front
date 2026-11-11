import { useState } from 'react'
import { ChartLineUp } from '@phosphor-icons/react/ChartLineUp'
import { GearSix } from '@phosphor-icons/react/GearSix'
import { House } from '@phosphor-icons/react/House'
import { List } from '@phosphor-icons/react/List'
import { Megaphone } from '@phosphor-icons/react/Megaphone'
import { X } from '@phosphor-icons/react/X'
import { Link, NavLink } from 'react-router-dom'
import styles from './AppHeader.module.css'

const navigationItems = [
  { to: '/', label: 'Visão geral', icon: House, end: true },
  { to: '/historico', label: 'Histórico', icon: ChartLineUp },
  { to: '/avisos', label: 'Avisos', icon: Megaphone },
  { to: '/gestao', label: 'Gestão', icon: GearSix },
]

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} to="/" onClick={closeMenu}>
          <span className={styles.productName}>Estação Ribeirinha</span>
          <span className={styles.brandDivider} aria-hidden="true" />
          <span className={styles.productArea}>Painel de Situação</span>
        </Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>

        <nav
          aria-label="Navegação principal"
          className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}
          id="primary-navigation"
        >
          {navigationItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              className={({ isActive }) =>
                `${styles.navigationLink} ${isActive ? styles.navigationLinkActive : ''}`
              }
              end={end}
              key={to}
              to={to}
              onClick={closeMenu}
            >
              {({ isActive }) => (
                <>
                  <Icon aria-hidden="true" weight={isActive ? 'fill' : 'regular'} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
