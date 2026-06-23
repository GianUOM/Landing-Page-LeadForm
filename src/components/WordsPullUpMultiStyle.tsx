import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  containerClassName?: string
}

export function WordsPullUpMultiStyle({ segments, containerClassName = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const allWords: { word: string; className: string; index: number }[] = []
  let wordIndex = 0

  segments.forEach((segment) => {
    const words = segment.text.split(' ').filter(Boolean)
    words.forEach((word) => {
      allWords.push({ word, className: segment.className ?? '', index: wordIndex })
      wordIndex++
    })
  })

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${containerClassName}`}
      style={{ gap: '0 0.22em' }}
    >
      {allWords.map(({ word, className, index }) => (
        <span key={index} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              delay: index * 0.06,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
