import { motion } from 'framer-motion'
import { ClipboardList, LayoutGrid, Sparkles, Mail, CalendarDays, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
  outcome: string
}

const SERVICES: Service[] = [
  {
    icon: ClipboardList,
    title: 'Sales Operations Audit',
    description:
      'We map your full lead-to-client journey and identify exactly where leads are being lost, delayed, or mismanaged — before a single automation is built.',
    outcome: 'Leak map in week one',
  },
  {
    icon: LayoutGrid,
    title: 'System Design & Architecture',
    description:
      'A tailored sales infrastructure blueprint — CRM structure, qualification framework, follow-up workflows, and a complete automation roadmap.',
    outcome: 'One connected blueprint',
  },
  {
    icon: Sparkles,
    title: 'AI Lead Qualification',
    description:
      'An AI system that qualifies every new lead within minutes — scoring, routing, and only surfacing the right prospects to your sales team.',
    outcome: 'Scored before your team opens Slack',
  },
  {
    icon: Mail,
    title: 'Follow-Up Automation',
    description:
      'Multi-touch sequences across SMS, WhatsApp, and email — running 24/7, varied by angle and timing, with up to five automated follow-up attempts.',
    outcome: 'Five touchpoints without chasing',
  },
  {
    icon: CalendarDays,
    title: 'Appointment Booking System',
    description:
      'Qualified leads get offered live calendar slots and book themselves in. Reminders, reschedules, and no-show recovery handled automatically.',
    outcome: 'Booked calls, not inbox threads',
  },
  {
    icon: TrendingUp,
    title: 'Ongoing Optimisation',
    description:
      'Monthly monitoring, maintenance, and continuous improvement — fixing issues, refining sequences, adding automations. The system compounds over time.',
    outcome: 'Monthly compounding gains',
  },
]

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

export function FeaturesSection() {
  return (
    <section className="ambient-section py-28 px-8" id="services">
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium mb-3" style={{ color: '#00b4ff' }}>
            What's included
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight">
            Six components.{' '}
            <span className="gradient-text">One complete</span> sales system.
          </h2>
          <p className="text-hero-sub text-lg mt-4 max-w-xl mx-auto opacity-80 leading-8">
            Every deliverable is designed to work together. Nothing is standalone,
            nothing is templated.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className="interactive-card liquid-glass rounded-2xl p-6 min-h-[280px] flex flex-col"
                variants={item}
                initial="rest"
                whileHover="hover"
              >
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0, 180, 255, 0.10)' }}
                  variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: { rotate: -5, scale: 1.08 },
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#00b4ff' }} />
                </motion.div>
                <h3 className="font-headline text-foreground text-base font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-hero-sub text-sm leading-6 opacity-90">
                  {service.description}
                </p>
                <motion.div
                  className="mt-auto pt-5 text-xs font-medium"
                  style={{ color: '#7dd3fc' }}
                  variants={{
                    rest: { opacity: 0.62, y: 8 },
                    hover: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.22 }}
                >
                  {service.outcome}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
