import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface WordsPullUpProps {
  text: string
  className?: string
  showAsterisk?: boolean
  delay?: number
}

export function WordsPullUp({ text, className = '', showAsterisk = false, delay = 0 }: WordsPullUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ').filter(Boolean)

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block" style={{ marginRight: '0.2em' }}>
          <motion.span
            className="inline-block relative"
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{
              delay: delay + i * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {showAsterisk && i === words.length - 1 && (
              <span
                className="absolute font-normal"
                style={{ top: '0.65em', right: '-0.3em', fontSize: '0.31em' }}
              >
                *
              </span>
            )}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
