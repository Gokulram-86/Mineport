import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Heart, Pickaxe } from 'lucide-react'
import { profile } from '../../data/portfolio'

interface HeroSectionProps {
  navigate: (id: string) => void
}

export default function HeroSection({ navigate }: HeroSectionProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-sky" />
      <div className="sun" />
      <div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="cloud cloud-three" />
      <div className="mountain mountain-back" /><div className="mountain mountain-mid" /><div className="mountain mountain-front" />
      <div className="tree tree-one"><i /><b /><span /></div>
      <div className="tree tree-two"><i /><b /><span /></div>
      <div className="tree tree-three"><i /><b /><span /></div>
      <div className="hero-ground"><div className="grass-edge" /></div>
      <div className="hero-grain" />

      <div className="hero-content page-width">
        <motion.div
          className="world-label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="world-pulse" /> WORLD 01 <span className="world-divider">/</span> OVERWORLD{' '}
          <span className="world-seed">SEED: 086GOKUL</span>
        </motion.div>

        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          HELLO, WORLD. I'M
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {profile.name}<span className="hero-period">.</span>
        </motion.h1>

        <motion.div
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42 }}
        >
          <span className="role-cursor" /> SOFTWARE ENGINEER{' '}
          <span className="role-separator">·</span> BUILDER{' '}
          <span className="role-separator">·</span> LIFELONG LEARNER
        </motion.div>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52 }}
        >
          {profile.intro}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62 }}
        >
          <button className="button button-primary" onClick={() => navigate('projects')}>
            <Pickaxe size={17} /> Explore my builds <ArrowUpRight size={16} />
          </button>
          <button className="button button-ghost" onClick={() => navigate('about')}>
            Meet the player <ArrowDown size={16} />
          </button>
        </motion.div>

        <div className="hero-meta">
          <span><span className="tiny-square" /> {profile.location}</span>
          <span><span className="tiny-square green" /> Currently leveling up</span>
        </div>
      </div>

      <div className="hud page-width">
        <div className="hud-player">
          <div className="avatar-pixel">G</div>
          <div>
            <span className="hud-label">PLAYER</span>
            <strong>Gokulram</strong>
          </div>
        </div>
        <div className="hud-vitals">
          <div className="hud-label">HEALTH</div>
          <div className="hearts">
            {Array.from({ length: 10 }).map((_, i) => (
              <Heart key={i} size={16} fill="#e75b59" strokeWidth={1.8} />
            ))}
          </div>
        </div>
        <div className="hud-xp">
          <div className="hud-label">EXPERIENCE</div>
          <div className="xp-track"><span /></div>
          <b>LVL. 01</b>
        </div>
        <div className="hotbar-mini">
          <div className="hotbar-slot selected">⌘</div>
          <div className="hotbar-slot">▤</div>
          <div className="hotbar-slot">⚒</div>
          <div className="hotbar-slot">◇</div>
        </div>
      </div>

      <div className="scroll-cue"><span /> SCROLL TO EXPLORE</div>
    </section>
  )
}

