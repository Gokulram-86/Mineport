import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, ChevronRight,
  Code2, Copy, ExternalLink, Github, Heart, Layers3, Mail, Menu, Pickaxe,
  ShieldCheck, Sparkles, X,
} from 'lucide-react'
import { profile, projects, skills, timeline } from './data/portfolio'

type Project = (typeof projects)[number]

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Inventory', id: 'skills' },
  { label: 'Crafting', id: 'projects' },
  { label: 'Quest log', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="section-heading">
      <div className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)

  const navigate = (id: string) => {
    setActiveSection(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); navigate('home') }}>
          <span className="brand-cube"><span /></span>
          <span>GOKUL<span className="brand-muted">.DEV</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.id} className={activeSection === item.id ? 'nav-link active' : 'nav-link'} onClick={() => navigate(item.id)}>{item.label}</button>
          ))}
        </nav>
        <a className="topbar-cta" href={`mailto:${profile.email}`}><span className="status-dot" /> Available to connect <ArrowUpRight size={14} /></a>
        <button className="mobile-menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {navItems.map((item) => <button key={item.id} onClick={() => navigate(item.id)}>{item.label}<ChevronRight size={16} /></button>)}
        </motion.nav>}
      </AnimatePresence>

      <main>
        <section className="hero" id="home">
          <div className="hero-sky" />
          <div className="sun" />
          <div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="cloud cloud-three" />
          <div className="mountain mountain-back" /><div className="mountain mountain-mid" /><div className="mountain mountain-front" />
          <div className="tree tree-one"><i /><b /><span /></div><div className="tree tree-two"><i /><b /><span /></div><div className="tree tree-three"><i /><b /><span /></div>
          <div className="hero-ground"><div className="grass-edge" /></div>
          <div className="hero-grain" />
          <div className="hero-content page-width">
            <motion.div className="world-label" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
              <span className="world-pulse" /> WORLD 01 <span className="world-divider">/</span> OVERWORLD <span className="world-seed">SEED: 086GOKUL</span>
            </motion.div>
            <motion.p className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }}>HELLO, WORLD. I'M</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .7 }}>{profile.name}<span className="hero-period">.</span></motion.h1>
            <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .42 }}><span className="role-cursor" /> SOFTWARE ENGINEER <span className="role-separator">·</span> BUILDER <span className="role-separator">·</span> LIFELONG LEARNER</motion.div>
            <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .52 }}>{profile.intro}</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .62 }}>
              <button className="button button-primary" onClick={() => navigate('projects')}><Pickaxe size={17} /> Explore my builds <ArrowUpRight size={16} /></button>
              <button className="button button-ghost" onClick={() => navigate('about')}>Meet the player <ArrowDown size={16} /></button>
            </motion.div>
            <div className="hero-meta"><span><span className="tiny-square" /> {profile.location}</span><span><span className="tiny-square green" /> Currently leveling up</span></div>
          </div>
          <div className="hud page-width">
            <div className="hud-player"><div className="avatar-pixel">G</div><div><span className="hud-label">PLAYER</span><strong>Gokulram</strong></div></div>
            <div className="hud-vitals"><div className="hud-label">HEALTH</div><div className="hearts">{Array.from({ length: 10 }).map((_, i) => <Heart key={i} size={16} fill="#e75b59" strokeWidth={1.8} />)}</div></div>
            <div className="hud-xp"><div className="hud-label">EXPERIENCE</div><div className="xp-track"><span /></div><b>LVL. 01</b></div>
            <div className="hotbar-mini"><div className="hotbar-slot selected">⌘</div><div className="hotbar-slot">▤</div><div className="hotbar-slot">⚒</div><div className="hotbar-slot">◇</div></div>
          </div>
          <div className="scroll-cue"><span /> SCROLL TO EXPLORE</div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="page-width about-grid">
            <div className="about-visual">
              <div className="profile-card pixel-panel">
                <div className="panel-top"><span>PLAYER PROFILE</span><span className="panel-dots">•••</span></div>
                <div className="profile-avatar-wrap"><div className="profile-avatar"><div className="avatar-hair"/><div className="avatar-face"><i/><i/><b/></div><div className="avatar-shirt"/></div><div className="avatar-level">LVL 01</div></div>
                <div className="profile-name">{profile.name}</div><div className="profile-title">{profile.role}</div>
                <div className="profile-stats"><div><span>CLASS</span><b>BUILDER</b></div><div><span>BIOME</span><b>INDIA</b></div><div><span>STATUS</span><b className="online-text">ONLINE</b></div></div>
                <div className="profile-quote">“Every expert was once a beginner.”</div>
              </div>
              <div className="floating-block block-grass"><span /></div><div className="floating-block block-diamond">◆</div>
            </div>
            <div className="about-copy">
              <SectionHeading eyebrow="01 / PLAYER PROFILE" title="The player behind the keyboard." subtitle="A little about my spawn point." />
              <p className="body-copy">{profile.about}</p>
              <p className="body-copy muted-copy">I believe good engineering is a mix of curiosity, fundamentals, thoughtful problem-solving and the patience to keep iterating until things work well.</p>
              <div className="about-facts"><div><span className="fact-icon"><BookOpen size={17}/></span><div><small>EDUCATION</small><strong>Software Engineering</strong></div></div><div><span className="fact-icon"><BriefcaseBusiness size={17}/></span><div><small>PROFESSIONAL QUEST</small><strong>Tech Services Analyst T2</strong></div></div></div>
              <button className="text-link" onClick={() => navigate('experience')}>View my journey <ArrowUpRight size={16}/></button>
            </div>
          </div>
        </section>

        <section className="skills-section section-pad" id="skills">
          <div className="page-width">
            <SectionHeading eyebrow="02 / INVENTORY" title="Tools in my hotbar." subtitle="Every tool has a purpose. These are the ones I'm learning to use well." />
            <div className="inventory-shell pixel-panel">
              <div className="inventory-top"><span><Layers3 size={15}/> INVENTORY</span><span className="inventory-count">{skills.length} ITEMS</span></div>
              <div className="inventory-body">
                <div className="inventory-character"><div className="inventory-player"><div className="inv-head"><i/><i/></div><div className="inv-body"/><div className="inv-arm left"/><div className="inv-arm right"/><div className="inv-leg left"/><div className="inv-leg right"/></div><span>PLAYER LOADOUT</span></div>
                <div className="inventory-items">{skills.map((skill, index) => <motion.div key={skill.name} className="inventory-item" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .045 }}><div className="item-art">{skill.icon}</div><div className="item-tooltip"><b>{skill.name}</b><span>{skill.level}</span></div><span className="item-name">{skill.name}</span></motion.div>)}</div>
              </div>
              <div className="inventory-footer"><span><span className="tiny-square green"/> All skills are a work in progress</span><span>CRAFTED WITH CURIOSITY</span></div>
            </div>
            <div className="skill-categories"><span><Code2 size={15}/> LANGUAGES</span><span><Layers3 size={15}/> FRAMEWORKS & DATA</span><span><ShieldCheck size={15}/> TOOLS & WORKFLOW</span></div>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="page-width">
            <div className="section-heading-row"><SectionHeading eyebrow="03 / CRAFTING TABLE" title="Things I've crafted." subtitle="A collection of experiments, builds and problem-solving."/><div className="crafting-badge"><span>3 × 3</span><small>CRAFTING GRID</small></div></div>
            <div className="projects-grid">{projects.map((project, index) => <motion.article key={project.id} className="project-card pixel-panel" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }}>
              <div className="project-card-top"><span className="project-index">{project.id.toUpperCase()}</span><span className="project-status"><span/> {project.status}</span></div>
              <div className={`project-art project-art-${index + 1}`}><div className="craft-grid"><span>{project.icon}</span><span>✦</span><span>▧</span><span>⌘</span><span>{project.icon}</span><span>◈</span><span>▤</span><span>✧</span><span>⚙</span></div><div className="craft-arrow">➜</div><div className="crafted-item">{project.icon}</div></div>
              <div className="project-type">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p>
              <div className="tech-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <button className="project-open" onClick={() => setSelectedProject(project)}>Inspect build <ArrowUpRight size={15}/></button>
            </motion.article>)}</div>
            <div className="projects-note"><Sparkles size={16}/> Project cards are starter content. Replace them with your real builds before publishing.</div>
          </div>
        </section>

        <section className="experience-section section-pad" id="experience">
          <div className="page-width experience-grid">
            <div><SectionHeading eyebrow="04 / QUEST LOG" title="The journey so far." subtitle="Progress isn't always a straight line. Every quest teaches you something."/><div className="quest-progress"><div className="quest-progress-top"><span>MAIN QUEST</span><span>IN PROGRESS</span></div><div className="quest-track"><span/></div><small>THE DEVELOPER JOURNEY CONTINUES...</small></div></div>
            <div className="timeline">{timeline.map((item, index) => <motion.div className="timeline-item" key={item.title} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .12 }}><div className="timeline-marker">{item.icon}</div><div className="timeline-content"><span className="timeline-date">{item.date}</span><h3>{item.title}</h3><strong>{item.organization}</strong><p>{item.description}</p></div></motion.div>)}</div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="page-width"><div className="contact-card pixel-panel"><div className="contact-stars">✦　·　✧　·　✦</div><div className="eyebrow"><span className="eyebrow-dot"/> 05 / MULTIPLAYER</div><h2>Have a quest<br/>we can take on?</h2><p>I'm always open to connecting, learning about interesting work, and collaborating on useful things.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}`}><Mail size={17}/> Send a message <ArrowUpRight size={16}/></a><button className="button button-ghost copy-button" onClick={copyEmail}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Email copied' : 'Copy email'}</button></div><div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ExternalLink size={12}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={16}/> LinkedIn <ExternalLink size={12}/></a></div><div className="contact-pixel-scene"><div className="mini-tree"><i/><b/></div><div className="mini-house"><span/><i/></div><div className="mini-tree second"><i/><b/></div></div></div><div className="footer"><a className="brand" href="#home" onClick={(e) => {e.preventDefault(); navigate('home')}}><span className="brand-cube"><span/></span><span>GOKUL<span className="brand-muted">.DEV</span></span></a><span>BUILT BLOCK BY BLOCK <span className="footer-heart">♥</span></span><span>© {new Date().getFullYear()} GOKULRAM</span></div></div>
        </section>
      </main>

      <div className="bottom-hotbar"><div className="hotbar-label">QUICK SLOTS</div>{navItems.slice(0, 4).map((item, index) => <button key={item.id} className={activeSection === item.id ? 'quick-slot active' : 'quick-slot'} onClick={() => navigate(item.id)} title={item.label}><span>{['⌂', '☺', '▦', '⚒'][index]}</span><small>{index + 1}</small></button>)}<button className="quick-slot" onClick={() => navigate('contact')} title="Contact"><span>✉</span><small>5</small></button></div>

      <AnimatePresence>{selectedProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}><motion.div className="project-modal pixel-panel" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close"><X size={18}/></button><div className="eyebrow"><span className="eyebrow-dot"/> CRAFTING TABLE / INSPECT ITEM</div><div className="modal-icon">{selectedProject.icon}</div><span className="project-type">{selectedProject.type}</span><h3>{selectedProject.title}</h3><p>{selectedProject.description}</p><div className="tech-tags">{selectedProject.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="modal-links"><a href={selectedProject.github} target="_blank" rel="noreferrer"><Github size={16}/> Source code <ArrowUpRight size={14}/></a>{selectedProject.demo && <a href={selectedProject.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14}/></a>}</div></motion.div></motion.div>}</AnimatePresence>
    </div>
  )
}

export default App
