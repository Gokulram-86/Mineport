import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react'
import { navItems } from '../../constants/navigation'
import ResumeModal from './ResumeModal'

interface NavbarProps {
  activeSection: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  navigate: (id: string) => void
}

export default function Navbar({ activeSection, menuOpen, setMenuOpen, navigate }: NavbarProps) {
  const [resumeOpen, setResumeOpen] = useState(false)
  const closeResume = useCallback(() => setResumeOpen(false), [])
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  // Slide the navbar up when scrolling down, and back down when scrolling up.
  useEffect(() => {
    lastY.current = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const delta = y - lastY.current
      setScrolled(y > 10)
      if (y < 80) setHidden(false)
      else if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
      else return // ignore tiny jitters
      lastY.current = y
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const isHidden = hidden && !menuOpen

  return (
    <>
      <ResumeModal open={resumeOpen} onClose={closeResume} />
      <header
        className={['topbar', isHidden && 'topbar-hidden', scrolled && 'topbar-scrolled'].filter(Boolean).join(' ')}
      >
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
        <div className="topbar-actions">
          <button className="topbar-resume" type="button" onClick={() => setResumeOpen(true)}>
            Resume <ArrowDown size={14} />
          </button>
          <a
            className="topbar-cta"
            href="#contact"
            onClick={(e) => { e.preventDefault(); navigate('contact') }}
          >
            <span className="status-dot" /> Let's Talk <ArrowUpRight size={14} />
          </a>
        </div>
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
