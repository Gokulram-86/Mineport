import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const loadingMessages = [
  'Generating terrain...',
  'Placing dirt blocks...',
  'Growing grass...',
  'Spawning player...',
  'Loading chunks...',
  'Rendering world...',
]

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Drive progress from 0→100 over ~2.6s with eased steps
    const totalMs = 2600
    const intervalMs = 40
    const steps = totalMs / intervalMs

    let current = 0
    const timer = setInterval(() => {
      current += 1
      // Ease-out: fast start, slow near 100
      const eased = Math.round((1 - Math.pow(1 - current / steps, 2.4)) * 100)
      setProgress(Math.min(eased, 100))

      // Rotate messages evenly across the run
      setMsgIndex(Math.min(Math.floor((current / steps) * loadingMessages.length), loadingMessages.length - 1))

      if (current >= steps) {
        clearInterval(timer)
        setProgress(100)
        // Short pause at 100% before fading out
        setTimeout(() => setDone(true), 400)
        setTimeout(() => onDone(), 1000)
      }
    }, intervalMs)

    return () => clearInterval(timer)
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Dirt tile background is handled in CSS */}

          {/* Rotating 3D grass block */}
          <div className="loader-block-wrap">
            <div className="mc-block">
              <div className="mc-face mc-top" />
              <div className="mc-face mc-front" />
              <div className="mc-face mc-right" />
              <div className="mc-face mc-left" />
              <div className="mc-face mc-back" />
              <div className="mc-face mc-bottom" />
            </div>
          </div>

          {/* Title */}
          <div className="loader-title">Generating World</div>

          {/* Rotating status message */}
          <div className="loader-msg">{loadingMessages[msgIndex]}</div>

          {/* Progress bar */}
          <div className="loader-bar-wrap">
            <div className="loader-bar-track">
              <motion.div
                className="loader-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.04 }}
              />
            </div>
            <div className="loader-percent">{progress}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

