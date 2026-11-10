import { motion } from 'framer-motion'
import { Code2, Layers3, ShieldCheck } from 'lucide-react'
import { skills } from '../../data/portfolio'
import SectionHeading from '../shared/SectionHeading'

export default function SkillsSection() {
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
            <span className="inventory-count">{skills.length} ITEMS</span>
          </div>
          <div className="inventory-body">
            <div className="inventory-character">
              <div className="inventory-player">
                <div className="inv-head"><i /><i /></div>
                <div className="inv-body" />
                <div className="inv-arm left" /><div className="inv-arm right" />
                <div className="inv-leg left" /><div className="inv-leg right" />
              </div>
              <span>PLAYER LOADOUT</span>
            </div>
            <div className="inventory-items">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="inventory-item"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.045 }}
                >
                  <div className="item-art">{skill.icon}</div>
                  <div className="item-tooltip">
                    <b>{skill.name}</b>
                    <span>{skill.level}</span>
                  </div>
                  <span className="item-name">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="inventory-footer">
            <span><span className="tiny-square green" /> All skills are a work in progress</span>
            <span>CRAFTED WITH CURIOSITY</span>
          </div>
        </div>
        <div className="skill-categories">
          <span><Code2 size={15} /> LANGUAGES</span>
          <span><Layers3 size={15} /> FRAMEWORKS &amp; DATA</span>
          <span><ShieldCheck size={15} /> TOOLS &amp; WORKFLOW</span>
        </div>
      </div>
    </section>
  )
}

