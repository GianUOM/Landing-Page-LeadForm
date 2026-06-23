import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'

const GOOD_FIT = [
  'Marketing, digital marketing, SEO, PPC, social media, web design, lead gen, paid ads, or appointment setting agency',
  'Generating £80,000+ per month in revenue',
  '10–50 staff with an established service and client base',
  'Receiving 50+ leads per month and booking 20+ sales calls',
  'Based in UK, USA, Canada, Australia or Europe',
  'Ready to invest in systems, not just ad spend or more hires',
]

const NOT_FIT = [
  "Just starting out with no repeatable source of leads",
  'Booking fewer than 20 sales calls per month',
  'Want a one-off tool — not a long-term systems partner',
  'Not open to AI or unwilling to change internal processes',
  'Expect results without any operational changes',
  'Looking for a low-cost or cheap automation solution',
]

const STEPS = [
  {
    num: '1',
    title: 'You book a slot',
    desc: 'Pick a 30-minute window that works. No forms, no sales sequence — just grab a time on the calendar.',
  },
  {
    num: '2',
    title: 'We jump on a call',
    desc: 'We walk through your funnel, talk through your numbers, and show the system running live.',
  },
  {
    num: '3',
    title: 'You decide',
    desc: "If it's a fit, we scope next steps together. If not, you leave with notes you can use.",
  },
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
            Built for agencies <span className="gradient-text">serious about</span> scaling.
          </h2>
          <p className="text-hero-sub text-lg mt-4 opacity-80 leading-8">
            Check fit before you book. The strongest matches already have lead flow,
            sales calls, and a real process worth improving.
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
  const [revenue, setRevenue] = useState(50)
  const [leads, setLeads] = useState(80)
  const [calls, setCalls] = useState(28)
  const [agencyType, setAgencyType] = useState(true)
  const [market, setMarket] = useState(true)
  const [systemsMindset, setSystemsMindset] = useState(true)

  const score = useMemo(() => {
    return [
      agencyType,
      market,
      systemsMindset,
      revenue >= 30,
      leads >= 50,
      calls >= 20,
    ].filter(Boolean).length
  }, [agencyType, calls, leads, market, revenue, systemsMindset])

  const scoreRatio = score / 6
  const result =
    score >= 5
      ? { label: 'Strong fit', note: 'You likely have enough lead flow for the system to compound.', color: '#10b981' }
      : score >= 3
        ? { label: 'Worth a look', note: 'There may be leverage, but the audit should confirm the numbers.', color: '#38bdf8' }
        : { label: 'Not ready yet', note: 'Build more predictable demand before investing in automation.', color: '#f87171' }

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
            Agency fit checker
          </p>
          <p className="text-hero-sub text-xs mt-1 opacity-70">Live score from your current numbers</p>
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
        <SliderRow label="Monthly revenue" value={revenue} suffix="k" min={0} max={120} onChange={setRevenue} />
        <SliderRow label="Leads per month" value={leads} min={0} max={180} onChange={setLeads} />
        <SliderRow label="Sales calls per month" value={calls} min={0} max={80} onChange={setCalls} />

        <ToggleRow label="Agency category" active={agencyType} setActive={setAgencyType} left="Marketing / lead gen" right="Other" />
        <ToggleRow label="Primary market" active={market} setActive={setMarket} left="UK / US / CA / AU/ Europe" right="Other" />

        <label className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.035] px-4 py-3 cursor-pointer">
          <span className="text-sm text-hero-sub opacity-85">Ready to improve process, not just add tools</span>
          <input
            type="checkbox"
            checked={systemsMindset}
            onChange={(event) => setSystemsMindset(event.target.checked)}
            className="h-4 w-4 accent-sky-400"
          />
        </label>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between text-xs text-hero-sub/70 mb-2">
          <span>Fit score</span>
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
        <span>Pick a time</span>
        <ArrowRight className="w-4 h-4 relative z-[1]" />
      </a>
    </motion.div>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  suffix = '',
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  suffix?: string
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="text-sm text-hero-sub opacity-85">{label}</span>
        <span className="text-sm font-semibold text-foreground">
          {label.includes('Revenue') ? '£' : ''}
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-sky-400"
      />
    </label>
  )
}

function ToggleRow({
  label,
  active,
  setActive,
  left,
  right,
}: {
  label: string
  active: boolean
  setActive: (active: boolean) => void
  left: string
  right: string
}) {
  return (
    <div>
      <p className="text-sm text-hero-sub opacity-85 mb-2">{label}</p>
      <div className="grid grid-cols-2 rounded-xl bg-white/[0.035] p-1">
        {[{ label: left, value: true }, { label: right, value: false }].map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => setActive(option.value)}
            className="relative rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-150"
            style={{ color: active === option.value ? '#fff' : 'rgba(210,220,230,0.62)' }}
          >
            {active === option.value && (
              <motion.span
                layoutId={`${label}-active`}
                className="absolute inset-0 rounded-lg"
                style={{ background: 'rgba(0,180,255,0.16)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              />
            )}
            <span className="relative z-[1]">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
