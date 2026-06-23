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
  {
    number: '01',
    title: 'Sales Operations Audit',
    tag: 'Foundation',
    description:
      'We map your full lead-to-client journey and identify exactly where leads are being lost, delayed, or mismanaged — before a single automation is built.',
  },
  {
    number: '02',
    title: 'System Strategy',
    tag: 'Design',
    description:
      'Once the problems are clear, we design a tailored sales infrastructure — qualification logic, follow-up workflows, CRM structure, and the full automation roadmap.',
  },
  {
    number: '03',
    title: 'Build & Implementation',
    tag: 'Core',
    description:
      'We build every component — AI lead qualification, automated follow-up, appointment booking, CRM automations, and a live reporting dashboard, fully connected.',
  },
  {
    number: '04',
    title: 'Testing & Optimisation',
    tag: 'QA',
    description:
      'Every workflow is stress-tested before go-live. Edge cases handled, errors fixed, performance optimised — no surprises after handover.',
  },
  {
    number: '05',
    title: 'Team Training & Handover',
    tag: 'Launch',
    description:
      'We walk your team through every system, train them on the CRM and sales process, and provide full SOP documentation so adoption happens from day one.',
  },
  {
    number: '06',
    title: 'Ongoing Optimisation',
    tag: 'Retainer',
    description:
      'After go-live, we monitor, maintain, and continuously improve the system every month — fixing issues, refining sequences, adding new automations. This is where compounding happens.',
    retainer: true,
  },
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
            Six phases. <span className="gradient-text">No leads</span> lost.
          </h2>
          <p className="text-hero-sub text-lg mt-4 opacity-80 leading-8">
            Every stage moves a lead forward without your team needing to touch it.
          </p>

          <div className="liquid-glass rounded-2xl p-5 mt-8">
            <div className="flex items-center justify-between text-xs text-hero-sub/70 mb-3">
              <span>Implementation path</span>
              <span>30 day go-live</span>
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
            This is where most agencies stop. We don't.
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
