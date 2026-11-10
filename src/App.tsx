import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import BottomHotbar from './components/layout/BottomHotbar'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ContactSection from './components/sections/ContactSection'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (id: string) => {
    setActiveSection(id)
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const topbarHeight = (document.querySelector('.topbar') as HTMLElement)?.offsetHeight ?? 76
    const offset = id === 'home' ? 0 : topbarHeight
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
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
  )
}

export default App
