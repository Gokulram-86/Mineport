import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/layout/Navbar'
import BottomHotbar from './components/layout/BottomHotbar'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ContactSection from './components/sections/ContactSection'

function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll-spy: highlight the section that is currently in view.
  useEffect(() => {
    const ids = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
    let frame = 0

    const update = () => {
      frame = 0
      const marker = window.innerHeight * 0.4
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = ids[0]
      if (atBottom) {
        current = ids[ids.length - 1]
      } else {
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= marker) current = id
        }
      }
      setActiveSection(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const navigate = (id: string) => {
    setActiveSection(id)
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const topbarHeight = (document.querySelector('.topbar') as HTMLElement)?.offsetHeight ?? 76
    const target = el.getBoundingClientRect().top + window.scrollY
    // Scrolling down hides the navbar, so only leave room for it when scrolling up.
    const offset = id === 'home' || target > window.scrollY ? 0 : topbarHeight
    const top = target - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <div className="site-shell" style={loaded ? {} : { visibility: 'hidden' }}>
      <Navbar
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navigate={navigate}
      />

      <main>
        <HeroSection navigate={navigate} />
        <AboutSection navigate={navigate} />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection navigate={navigate} />
      </main>

      <BottomHotbar activeSection={activeSection} navigate={navigate} />
      </div>
    </>
  )
}

export default App
