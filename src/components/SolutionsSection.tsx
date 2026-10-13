import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'

interface Phase {
  number: string
  title: string
  tag: string
  description: string
  retainer?: boolean
}

const PHASES: Phase[] = [
  { number: '01', title: 'Build the foundation', tag: 'Days 1–7', description: 'We refine your ICP, optimise your profile, research prospects and agree messaging and qualification criteria. You receive onboarding content strategy guidance.' },
  { number: '02', title: 'Start the conversations', tag: 'Weeks 2–4', description: 'We begin personalised outreach, manage replies, uncover challenges and qualify prospects. Relevant meetings go into your calendar while we track market feedback.' },
  { number: '03', title: 'Review the evidence', tag: 'Day 30', description: 'We review responses, conversation quality and booked meetings together, then agree what needs improving.' },
  { number: '04', title: 'Refine the approach', tag: 'Month 2', description: 'We use real conversation data and your appointment feedback to improve targeting, messaging, qualification and booking.' },
  { number: '05', title: 'Strengthen what works', tag: 'Month 3', description: 'We focus on the approaches producing the strongest results, evaluate overall performance and discuss ongoing management.' },
  { number: '06', title: 'Keep the process documented', tag: 'Throughout', description: 'We document the acquisition process as we work, so you have a clear view of the approach and can eventually take it over if you choose.', retainer: true },
]

export function SolutionsSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.72', 'end 0.38'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section className="ambient-section py-28 px-8" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-28" />
      </div>

      <div
        ref={timelineRef}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-16"
      >
        <motion.div
          className="lg:sticky lg:top-24 self-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium mb-3" style={{ color: '#00b4ff' }}>
            How it works
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight">
            90 days. <span className="gradient-text">A clear</span> process.
          </h2>
          <p className="text-hero-sub text-lg mt-4 opacity-80 leading-8">
            Build, test and refine your LinkedIn acquisition using real conversations and your feedback.
          </p>

          <div className="liquid-glass rounded-2xl p-5 mt-8">
            <div className="flex items-center justify-between text-xs text-hero-sub/70 mb-3">
              <span>Engagement structure</span>
              <span>Review at day 30</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  scaleX: progress,
                  transformOrigin: 'left',
                  background: 'linear-gradient(90deg, #0ea5e9, #00d4ff, #10b981)',
                }}
              />
            </div>
          </div>
        </motion.div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="absolute inset-x-0 top-0 origin-top rounded-full"
              style={{
                height: '100%',
                scaleY: progress,
                background: 'linear-gradient(180deg, #38bdf8, #00d4ff, #10b981)',
              }}
            />
          </div>

          <div className="space-y-5">
            {PHASES.map((phase, index) => (
              <PhaseCard key={phase.number} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-38% 0px -38% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute -left-[35px] md:-left-[43px] top-7 w-6 h-6 rounded-full border border-white/10"
        animate={{
          background: isInView
            ? phase.retainer
              ? 'rgba(16,185,129,0.95)'
              : 'rgba(0,180,255,0.95)'
            : 'rgba(255,255,255,0.08)',
          boxShadow: isInView
            ? phase.retainer
              ? '0 0 28px rgba(16,185,129,0.5)'
              : '0 0 28px rgba(0,180,255,0.5)'
            : '0 0 0 rgba(0,0,0,0)',
          scale: isInView ? 1.12 : 1,
        }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        className="interactive-card liquid-glass rounded-2xl p-6"
        animate={{
          background: isInView
            ? phase.retainer
              ? 'rgba(16, 185, 129, 0.065)'
              : 'rgba(0, 180, 255, 0.055)'
            : phase.retainer
              ? 'rgba(16, 185, 129, 0.035)'
              : 'rgba(255, 255, 255, 0.012)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-headline font-semibold text-sm"
            animate={{
              background: phase.retainer ? 'rgba(16,185,129,0.12)' : 'rgba(0,180,255,0.10)',
              color: phase.retainer ? '#10b981' : '#38bdf8',
              scale: isInView ? 1.05 : 1,
            }}
          >
            {phase.number}
          </motion.div>
          <span
            className="text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full"
            style={
              phase.retainer
                ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' }
                : { background: 'rgba(0,180,255,0.08)', color: '#38bdf8' }
            }
          >
            {phase.tag}
          </span>
        </div>

        <h3 className="font-headline text-foreground text-lg font-semibold mb-2">
          {phase.title}
        </h3>
        <p className="text-hero-sub text-sm leading-6 opacity-90">
          {phase.description}
        </p>

        {phase.retainer && (
          <p
            className="text-xs mt-4 pt-4 leading-5 opacity-80"
            style={{
              borderTop: '1px solid rgba(16,185,129,0.15)',
              color: '#10b981',
            }}
          >
            Built to be understood, reviewed and improved together.
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
