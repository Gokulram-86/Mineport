import { motion } from 'framer-motion'
import { timeline } from '../../data/portfolio'
import SectionHeading from '../shared/SectionHeading'

export default function ExperienceSection() {
  return (
    <section className="experience-section section-pad" id="experience">
      <div className="page-width experience-grid">
        <div>
          <SectionHeading
            eyebrow="04 / QUEST LOG"
            title="The journey so far."
            subtitle="Progress isn't always a straight line. Every quest teaches you something."
          />
          <div className="quest-progress">
            <div className="quest-progress-top">
              <span>MAIN QUEST</span>
              <span>IN PROGRESS</span>
            </div>
            <div className="quest-track"><span /></div>
            <small>THE DEVELOPER JOURNEY CONTINUES...</small>
          </div>
        </div>

        <div className="timeline-scroll">
        <div className="timeline">
          {timeline.map((item, index) => (
            <motion.div
              className="timeline-item"
              key={item.title}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <div className="timeline-marker">{item.icon}</div>
              <div className="timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <strong>{item.organization}</strong>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}

