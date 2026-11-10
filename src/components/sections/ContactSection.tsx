import { useState } from 'react'
import { BriefcaseBusiness, Check, Copy, ExternalLink, Github } from 'lucide-react'
import { profile } from '../../data/portfolio'
import { FaWhatsapp } from 'react-icons/fa'

interface ContactSectionProps {
  navigate: (id: string) => void
}

export default function ContactSection({ navigate }: ContactSectionProps) {
  const [copied, setCopied] = useState(false)

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
    <section className="contact-section section-pad" id="contact">
      <div className="page-width">
        <div className="contact-card pixel-panel">
          <div className="contact-stars">✦　·　✧　·　✦</div>
          <div className="eyebrow"><span className="eyebrow-dot" /> 05 / MULTIPLAYER</div>
          <h2>Have a quest<br />we can take on?</h2>
          <p>I'm always open to connecting, learning about interesting work, and collaborating on useful things.</p>
          <div className="contact-actions">
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              <FaWhatsapp size={24}/> WhatsApp
            </a>
            <button className="button button-ghost copy-button" onClick={copyEmail}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Email copied' : 'Copy email'}
            </button>
          </div>
          <div className="contact-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub <ExternalLink size={12} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <BriefcaseBusiness size={16} /> LinkedIn <ExternalLink size={12} />
            </a>
          </div>
          <div className="contact-pixel-scene">
            <div className="mini-tree"><i /><b /></div>
            <div className="mini-house"><span /><i /></div>
            <div className="mini-tree second"><i /><b /></div>
          </div>
        </div>

        <div className="footer">
          <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); navigate('home') }}>
            <span className="brand-cube"><span /></span>
            <span>GOKUL<span className="brand-muted">.DEV</span></span>
          </a>
          <span>BUILT BLOCK BY BLOCK <span className="footer-heart">♥</span></span>
          <span>© {new Date().getFullYear()} GOKULRAM</span>
        </div>
      </div>
    </section>
  )
}

