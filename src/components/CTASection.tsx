import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock3, FileSearch, Mail, TriangleAlert } from 'lucide-react'

const REPORT_ROWS = [
  { label: 'Lead response time', value: '12m -> 54s', status: 'Recovered', icon: Clock3 },
  { label: 'Missed follow-ups', value: '37 open loops', status: 'Flagged', icon: TriangleAlert },
  { label: 'Qualification logic', value: '6 rules mapped', status: 'Scored', icon: CheckCircle2 },
  { label: 'Booking friction', value: '3 steps removed', status: 'Fixed', icon: FileSearch },
]

export function CTASection() {
  return (
    <section className="ambient-section py-28 px-8" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-28" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium mb-4" style={{ color: '#00b4ff' }}>
            Free Sales Operations Audit
          </p>

          <h2 className="font-headline text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-foreground">
            Stop losing deals that{' '}
            <span className="gradient-text">could win revenue back.</span>
          </h2>

          <p className="text-hero-sub text-lg mt-5 mb-10 opacity-80 leading-8">
            In a 45-minute Sales Operations Audit, we map your full lead-to-client
            journey, identify where leads are being lost, and give you a Revenue Leak
            Report — free, no obligation.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="book.html"
              className="motion-button liquid-glass text-foreground/90 font-medium text-sm rounded-xl hover:text-foreground transition-colors duration-150 inline-flex items-center gap-2"
              style={{
                paddingLeft: '29px',
                paddingRight: '25px',
                paddingTop: '18px',
                paddingBottom: '18px',
                background: 'linear-gradient(135deg, rgba(14,165,233,0.20), rgba(0,212,255,0.20))',
              }}
            >
              <span>Book your free audit</span>
              <ArrowRight className="w-4 h-4 relative z-[1]" />
            </a>

            <a
              href="mailto:gianluca@leadformsystems.com"
              className="motion-button liquid-glass text-foreground/80 font-medium text-sm rounded-xl hover:text-foreground transition-colors duration-150 px-8 py-[18px] inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4 relative z-[1]" />
              <span>Send a message</span>
            </a>
          </div>

          <p className="text-foreground/30 text-xs mt-6">
            We work with a limited number of agencies at any one time.
          </p>
        </motion.div>

        <AuditPreview />
      </div>
    </section>
  )
}

function AuditPreview() {
  return (
    <motion.div
      className="interactive-card liquid-glass rounded-2xl p-5 md:p-7"
      initial={{ opacity: 0, y: 32, scale: 0.96, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'rgba(255,255,255,0.035)' }}
    >
      <div className="flex items-center justify-between gap-4 mb-7">
        <div>
          <p className="text-foreground text-sm font-semibold">Revenue Leak Report</p>
          <p className="text-hero-sub text-xs mt-1 opacity-70">Example audit output</p>
        </div>
        <motion.div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(0,180,255,0.10)', color: '#38bdf8' }}
          animate={{ rotate: [0, -4, 4, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FileSearch className="w-5 h-5" />
        </motion.div>
      </div>

      <div className="space-y-3">
        {REPORT_ROWS.map((row, index) => {
          const Icon = row.icon
          const isWarning = row.status === 'Flagged'
          return (
            <motion.div
              key={row.label}
              className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.035)' }}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isWarning ? 'rgba(239,68,68,0.10)' : 'rgba(0,180,255,0.10)',
                      color: isWarning ? '#f87171' : '#38bdf8',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-foreground text-sm font-semibold truncate">{row.label}</p>
                    <p className="text-hero-sub text-xs mt-0.5 opacity-70">{row.value}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full"
                  style={{
                    background: isWarning ? 'rgba(239,68,68,0.10)' : 'rgba(16,185,129,0.10)',
                    color: isWarning ? '#f87171' : '#10b981',
                  }}
                >
                  {row.status}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: isWarning
                      ? 'linear-gradient(90deg, #f87171, #fbbf24)'
                      : 'linear-gradient(90deg, #0ea5e9, #00d4ff, #10b981)',
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: isWarning ? 0.58 : 0.9 - index * 0.08 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.12, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
