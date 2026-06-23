import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'
import { AnimatedLetter } from './AnimatedLetter'

const BODY_TEXT =
  'Over the last five years, we have partnered with marketing agencies across the UK, USA, Canada, and Australia — recovering millions in lost pipeline through AI lead qualification systems, automated follow-up sequences, and CRM infrastructure that compounds over time.'

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = BODY_TEXT.split('')

  return (
    <section className="bg-black py-24 px-6 md:px-12" id="about">
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-3xl p-10 md:p-16 lg:p-20 text-center"
          style={{ background: '#101010' }}
        >
          {/* Label */}
          <p
            className="text-primary text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-10"
          >
            AI Sales Systems
          </p>

          {/* Multi-style heading */}
          <div className="mb-14 max-w-3xl mx-auto">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'We are LeadForm Systems,', className: 'font-normal' },
                { text: 'a results-driven consultancy.', className: 'font-serif italic' },
                {
                  text: 'We build AI-powered revenue systems that transform how agencies close.',
                  className: 'font-normal',
                },
              ]}
              containerClassName="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9]"
            />
          </div>

          {/* Scroll-linked character reveal */}
          <div ref={containerRef} className="max-w-2xl mx-auto">
            <p
              className="text-xs sm:text-sm md:text-base leading-relaxed"
              style={{ color: '#DEDBC8' }}
            >
              {chars.map((char, i) => (
                <AnimatedLetter
                  key={i}
                  char={char}
                  scrollYProgress={scrollYProgress}
                  index={i}
                  total={chars.length}
                />
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
