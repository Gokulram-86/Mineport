import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, X } from 'lucide-react'
import { projects } from '../../data/portfolio'

type Project = (typeof projects)[number]

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal pixel-panel"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
            <div className="eyebrow">
              <span className="eyebrow-dot" /> CRAFTING TABLE / INSPECT ITEM
            </div>
            <div className="modal-icon">{project.icon}</div>
            <span className="project-type">{project.type}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="modal-links">
              <a href={project.github} target="_blank" rel="noreferrer">
                <Github size={16} /> Source code <ArrowUpRight size={14} />
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Live demo <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

