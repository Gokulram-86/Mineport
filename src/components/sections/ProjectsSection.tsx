import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { projects } from '../../data/portfolio'
import SectionHeading from '../shared/SectionHeading'
import ProjectModal from './ProjectModal'

type Project = (typeof projects)[number]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section className="projects-section section-pad" id="projects">
        <div className="page-width">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="03 / CRAFTING TABLE"
              title="Things I've crafted."
              subtitle="A collection of experiments, builds and problem-solving."
            />
            <div className="crafting-badge">
              <span>3 × 3</span>
              <small>CRAFTING GRID</small>
            </div>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-card pixel-panel"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="project-card-top">
                  <span className="project-index">{project.id.toUpperCase()}</span>
                  <span className="project-status"><span /> {project.status}</span>
                </div>
                <div className={`project-art project-art-${index + 1}`}>
                  <div className="craft-grid">
                    <span>{project.icon}</span><span>✦</span><span>▧</span>
                    <span>⌘</span><span>{project.icon}</span><span>◈</span>
                    <span>▤</span><span>✧</span><span>⚙</span>
                  </div>
                  <div className="craft-arrow">➜</div>
                  <div className="crafted-item">{project.icon}</div>
                </div>
                <div className="project-type">{project.type}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <button className="project-open" onClick={() => setSelectedProject(project)}>
                  Inspect build <ArrowUpRight size={15} />
                </button>
              </motion.article>
            ))}
          </div>
          <div className="projects-note">
            <Sparkles size={16} /> Project cards are starter content. Replace them with your real builds before publishing.
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

