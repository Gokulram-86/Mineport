import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Layers3, ShieldCheck } from 'lucide-react'
import { skills } from '../../data/portfolio'
import SectionHeading from '../shared/SectionHeading'

type Category = 'Languages' | 'Frontend' | 'Data' | 'Tools'

const categories: { label: string; value: Category; icon: React.ReactNode }[] = [
  { label: 'LANGUAGES', value: 'Languages', icon: <Code2 size={13} /> },
  { label: 'FRAMEWORKS & DATA', value: 'Data', icon: <Layers3 size={13} /> },
  { label: 'TOOLS & WORKFLOW', value: 'Tools', icon: <ShieldCheck size={13} /> },
  { label: 'FRONTEND', value: 'Frontend', icon: <Layers3 size={13} /> },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Languages')

  const filtered = skills.filter((s) => s.category === activeCategory)

  return (
    <section className="skills-section section-pad" id="skills">
      <div className="page-width">
        <SectionHeading
          eyebrow="02 / INVENTORY"
          title="Tools in my hotbar."
          subtitle="Every tool has a purpose. These are the ones I'm learning to use well."
        />
        <div className="inventory-shell pixel-panel">
          <div className="inventory-top">
            <span><Layers3 size={15} /> INVENTORY</span>
            <span className="inventory-count">{filtered.length} ITEMS</span>
          </div>
          <div className="inventory-body">
            <div className="inventory-character">
              <img
                className="inventory-gif"
                src="/images/player.gif"
                alt="Minecraft-style avatar of Gokul"
              />
              <span>PLAYER LOADOUT</span>
            </div>
            <div className="inventory-items">
              <AnimatePresence mode="popLayout">
                {filtered.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="inventory-item"
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.75, y: -6 }}
                    transition={{ delay: index * 0.04, duration: 0.2 }}
                    layout
                  >
                    <div className="item-art">
                      {skill.icon.startsWith('/')
                        ? <img src={skill.icon} alt="" />
                        : skill.icon}
                    </div>
                    <div className="item-tooltip">
                      <b>{skill.name}</b>
                      <span>{skill.level}</span>
                    </div>
                    <span className="item-name">{skill.name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="inventory-footer">
            <span><span className="tiny-square green" /> All skills are a work in progress</span>
            <span>CRAFTED WITH CURIOSITY</span>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="skill-categories">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`skill-cat-btn${activeCategory === cat.value ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
