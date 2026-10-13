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
  { icon: ClipboardList, title: 'Targeting & prospect research', description: 'We refine your ideal customer profile and find relevant decision-makers on LinkedIn, based on your offer and agreed qualification criteria.', outcome: 'A clear picture of who to approach' },
  { icon: LayoutGrid, title: 'Profile & content strategy', description: 'We optimise your LinkedIn profile and review your content strategy during onboarding, with themes that build trust. You handle content creation and publishing.', outcome: 'Positioning that supports outreach' },
  { icon: Mail, title: 'Personalised outreach', description: 'We start relevant conversations through your LinkedIn account, with messaging grounded in prospect research and your offer.', outcome: 'Conversations with the right people' },
  { icon: Sparkles, title: 'Conversation management & qualification', description: 'We manage replies, explore business challenges and assess buying interest against six agreed criteria before arranging a meeting.', outcome: 'Qualification before booking' },
  { icon: CalendarDays, title: 'Booking & no-show follow-up', description: 'We book qualified prospects directly into your calendar, provide context for the call and follow up with no-shows. You lead the sales conversations.', outcome: 'Know who you are meeting and why' },
  { icon: TrendingUp, title: 'Tracking & optimisation', description: 'After each appointment, we ask whether the prospect was qualified and whether a real opportunity emerged. Your feedback shapes targeting and messaging.', outcome: 'A documented process that improves' },
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
            From first contact.{' '}
            <span className="gradient-text">To a qualified</span> sales conversation.
          </h2>
          <p className="text-hero-sub text-lg mt-4 max-w-xl mx-auto opacity-80 leading-8">
            We manage prospecting, conversations and qualification so you can
            focus on relevant sales calls and client delivery.
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
