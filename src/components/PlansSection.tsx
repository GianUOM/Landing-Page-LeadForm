import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'

const GOOD_FIT = [
  'US-based B2B business coaching or consulting company with 1–25 employees',
  'Proven services worth $5,000+ per engagement, with paying clients and evidence of outcomes',
  'A defined target market with decision-makers identifiable on LinkedIn',
  'Reliant on referrals, networking or inconsistent outbound',
  'Capacity for new clients, sales calls and follow-up',
  'Ready to invest in managed LinkedIn acquisition',
]

const NOT_FIT = [
  'Low-ticket services below $5,000 per engagement',
  'An unproven offer without paying clients or evidence of outcomes',
  'No defined target market',
  'Buyers who cannot be identified on LinkedIn',
  'No capacity to take on clients or handle sales follow-up',
  'Unable to convert qualified opportunities into customers',
]

const STEPS = [
  { num: '1', title: 'Book a strategy call', desc: 'Choose a time to talk about your offer, ideal buyers and current approach to winning clients.' },
  { num: '2', title: 'Check the fit together', desc: 'We discuss whether your buyers are reachable on LinkedIn and what a qualified opportunity means for you.' },
  { num: '3', title: 'Agree the next steps', desc: 'If there is a fit, we agree scope, responsibilities and the 90-day engagement before onboarding.' },
]

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const listItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.42 } },
}

export function PlansSection() {
  return (
    <section className="ambient-section py-28 px-8" id="whos-it-for">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-28" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium mb-3" style={{ color: '#00b4ff' }}>
            Who it's for
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight">
            Built for established <span className="gradient-text">B2B coaches</span> and consultants.
          </h2>
          <p className="text-hero-sub text-lg mt-4 opacity-80 leading-8">
            You have a proven offer. You want a more repeatable way to meet
            relevant buyers beyond your existing network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.2fr_0.9fr] gap-4 items-start">
          <ListCard title="You're a great fit if..." items={GOOD_FIT} good />
          <FitChecker />
          <ListCard title="This isn't for you if..." items={NOT_FIT} />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5"
          variants={listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              className="interactive-card liquid-glass rounded-2xl p-5 flex gap-3"
              variants={listItem}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-headline font-semibold text-sm"
                style={{ background: 'rgba(0,180,255,0.12)', color: '#38bdf8' }}
              >
                {step.num}
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold mb-1">{step.title}</p>
                <p className="text-hero-sub text-xs leading-5 opacity-80">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ListCard({ title, items, good = false }: { title: string; items: string[]; good?: boolean }) {
  return (
    <motion.div
      className="interactive-card liquid-glass rounded-2xl p-7"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-headline text-foreground font-semibold text-base mb-5">{title}</p>
      <motion.ul
        className="flex flex-col gap-3"
        variants={listContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((item) => {
          const Icon = good ? Check : X
          return (
            <motion.li key={item} className="flex items-start gap-2.5" variants={listItem}>
              <Icon
                className="w-4 h-4 flex-shrink-0 mt-px"
                style={{ color: good ? '#10b981' : 'rgba(239,68,68,0.65)' }}
              />
              <span className={`text-hero-sub text-sm leading-5 ${good ? 'opacity-90' : 'opacity-70'}`}>
                {item}
              </span>
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.div>
  )
}

function FitChecker() {
  const criteria = [
    'US-based B2B coach or consultant, with 1–25 employees',
    'Proven $5,000+ offer, paying clients and evidence of outcomes',
    'Defined buyers identifiable on LinkedIn',
    'Capacity for more clients and sales follow-up',
    'Able to convert qualified opportunities into clients',
    'Ready to invest in managed LinkedIn acquisition',
  ]
  const [answers, setAnswers] = useState<boolean[]>(criteria.map(() => false))
  const score = answers.filter(Boolean).length
  const scoreRatio = score / criteria.length
  const result = score === 6
    ? { label: 'Potential fit', note: 'Your answers match the core criteria. A strategy call will confirm whether the service is right for you.', color: '#10b981' }
    : { label: 'Check your fit', note: 'Select each statement that applies. This service is designed for businesses that meet all six criteria.', color: '#38bdf8' }

  return (
    <motion.div
      className="interactive-card liquid-glass rounded-2xl p-7"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="font-headline text-foreground font-semibold text-lg leading-tight">
            Is this right for you?
          </p>
          <p className="text-hero-sub text-xs mt-1 opacity-70">Check the core offer criteria</p>
        </div>
        <motion.div
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: 'rgba(255,255,255,0.06)', color: result.color }}
          key={result.label}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {result.label}
        </motion.div>
      </div>

      <div className="space-y-5">
        {criteria.map((criterion, index) => (
          <label key={criterion} className="flex items-start justify-between gap-4 rounded-xl bg-white/[0.035] px-4 py-3 cursor-pointer">
            <span className="text-sm text-hero-sub opacity-85">{criterion}</span>
            <input type="checkbox" checked={answers[index]}
              onChange={(event) => setAnswers(answers.map((answer, i) => i === index ? event.target.checked : answer))}
              className="h-4 w-4 mt-1 shrink-0 accent-sky-400" />
          </label>
        ))}
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between text-xs text-hero-sub/70 mb-2">
          <span>Criteria met</span>
          <span>{score}/6</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{ scaleX: scoreRatio }}
            style={{
              transformOrigin: 'left',
              background: `linear-gradient(90deg, #0ea5e9, ${result.color})`,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
        </div>
        <motion.p
          key={result.note}
          className="text-hero-sub text-sm leading-6 mt-4 opacity-85"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {result.note}
        </motion.p>
      </div>

      <a
        href="book.html"
        className="motion-button liquid-glass rounded-xl py-3 px-4 text-sm font-medium text-foreground/90 hover:text-foreground transition-colors duration-150 text-center mt-6 flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(to right, rgba(14,165,233,0.20), rgba(0,212,255,0.20))' }}
      >
        <span>Book a strategy call</span>
        <ArrowRight className="w-4 h-4 relative z-[1]" />
      </a>
    </motion.div>
  )
}
