import { motion, MotionValue, useTransform } from 'framer-motion'

interface AnimatedLetterProps {
  char: string
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}

export function AnimatedLetter({ char, scrollYProgress, index, total }: AnimatedLetterProps) {
  const charProgress = index / total
  const start = Math.max(0, charProgress - 0.1)
  const end = Math.min(1, charProgress + 0.05)
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])

  if (char === ' ') {
    return <span style={{ whiteSpace: 'pre' }}> </span>
  }

  return <motion.span style={{ opacity }}>{char}</motion.span>
}
