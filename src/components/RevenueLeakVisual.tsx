import { motion } from 'framer-motion'
import { AlertTriangle, CalendarCheck, CheckCircle2, MessageSquare, Zap } from 'lucide-react'
import type { ReactNode } from 'react'

const LEAKS = ['Slow response', 'No qualification', 'Manual chase']
const FIXES = ['Instant routing', 'AI scored lead', 'Booked call']

export function RevenueLeakVisual() {
  return (
    <section className="ambient-section px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-medium mb-3" style={{ color: '#00b4ff' }}>
              Revenue leak visual
            </p>
            <h2 className="font-headline text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight">
              See where leads{' '}
              <span className="gradient-text">fall out</span> before they book.
            </h2>
            <p className="text-hero-sub text-lg mt-4 opacity-80 leading-8">
              The system catches the quiet operational gaps: slow first replies,
              unclear qualification, missed follow-ups, and handoffs that depend
              on someone remembering.
            </p>
          </motion.div>

          <motion.div
            className="interactive-card liquid-glass rounded-2xl p-5 md:p-7"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-4 mb-7">
              <div>
                <p className="text-foreground text-sm font-semibold">Lead flow simulation</p>
                <p className="text-hero-sub text-xs mt-1 opacity-70">Before and after LeadForm</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#7dd3fc' }}>
                <Zap className="w-4 h-4" />
                Live recovery
              </div>
            </div>

            <div className="space-y-5">
              <FlowLane
                label="Manual funnel"
                tone="danger"
                start="New lead"
                middle="Inbox queue"
                end="Cold lead"
                chips={LEAKS}
              />
              <FlowLane
                label="LeadForm system"
                tone="success"
                start="New lead"
                middle="AI qualified"
                end="Booked call"
                chips={FIXES}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface FlowLaneProps {
  label: string
  tone: 'danger' | 'success'
  start: string
  middle: string
  end: string
  chips: string[]
}

function FlowLane({ label, tone, start, middle, end, chips }: FlowLaneProps) {
  const isSuccess = tone === 'success'
  const accent = isSuccess ? '#10b981' : '#ef4444'
  const softAccent = isSuccess ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.10)'
  const Icon = isSuccess ? CheckCircle2 : AlertTriangle

  return (
    <div
      className="rounded-2xl p-4 md:p-5"
      style={{ background: isSuccess ? 'rgba(0,180,255,0.045)' : 'rgba(255,255,255,0.025)' }}
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: softAccent, color: accent }}
          >
            <Icon className="w-4 h-4" />
          </span>
          <span className="text-foreground text-sm font-semibold">{label}</span>
        </div>
        <span className="text-hero-sub text-xs opacity-65">{isSuccess ? 'Recovered' : 'At risk'}</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 md:gap-3 items-center">
        <FlowNode icon={<MessageSquare className="w-4 h-4" />} label={start} />
        <AnimatedLine tone={tone} delay={0} />
        <FlowNode icon={<Zap className="w-4 h-4" />} label={middle} active={isSuccess} />
        <AnimatedLine tone={tone} delay={0.55} />
        <FlowNode icon={<CalendarCheck className="w-4 h-4" />} label={end} active={isSuccess} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
        {chips.map((chip, index) => (
          <motion.div
            key={chip}
            className="rounded-xl px-3 py-2 text-xs font-medium"
            style={{
              color: isSuccess ? '#86efac' : 'rgba(252,165,165,0.9)',
              background: isSuccess ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.45 }}
          >
            {chip}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FlowNode({
  icon,
  label,
  active = false,
}: {
  icon: ReactNode
  label: string
  active?: boolean
}) {
  return (
    <div
      className="min-h-[82px] rounded-xl flex flex-col items-center justify-center text-center gap-2 px-2"
      style={{
        background: active ? 'rgba(0,180,255,0.10)' : 'rgba(255,255,255,0.035)',
        color: active ? '#7dd3fc' : 'rgba(255,255,255,0.76)',
      }}
    >
      {icon}
      <span className="text-[11px] sm:text-xs font-medium leading-4">{label}</span>
    </div>
  )
}

function AnimatedLine({ tone, delay }: { tone: 'danger' | 'success'; delay: number }) {
  const isSuccess = tone === 'success'
  return (
    <div className="relative w-8 sm:w-12 md:w-16 h-px overflow-hidden bg-white/10">
      <motion.span
        className="absolute inset-y-0 left-0 w-8 rounded-full"
        style={{
          background: isSuccess
            ? 'linear-gradient(90deg, transparent, #38bdf8, #10b981)'
            : 'linear-gradient(90deg, transparent, #f87171, transparent)',
        }}
        animate={{ x: ['-100%', '220%'], opacity: [0, 1, 0] }}
        transition={{
          duration: isSuccess ? 1.6 : 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      />
    </div>
  )
}
