import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react'
import { navItems } from '../../constants/navigation'
import { profile } from '../../data/portfolio'

interface NavbarProps {
  activeSection: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  navigate: (id: string) => void
}

export default function Navbar({ activeSection, menuOpen, setMenuOpen, navigate }: NavbarProps) {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); navigate('home') }}>
          <span className="brand-cube"><span /></span>
          <span>GOKUL<span className="brand-muted">.DEV</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <a className="topbar-cta" href={`mailto:${profile.email}`}>
          <span className="status-dot" /> Available to connect <ArrowUpRight size={14} />
        </a>
        <button
          className="mobile-menu-button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {navItems.map((item) => (
              <button key={item.id} onClick={() => navigate(item.id)}>
                {item.label}<ChevronRight size={16} />
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
