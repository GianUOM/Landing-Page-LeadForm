import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STATS = [
  { value: '30 Days', label: 'System go-live' },
  { value: '< 60 Sec', label: 'Lead response time' },
  { value: 'Results-based', label: 'Partnership model' },
]

const NAV_ITEMS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: "Who it's for", href: '#whos-it-for' },
  { label: 'Contact', href: '#contact' },
]

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()

  const contentY = useTransform(scrollY, [0, 600], [0, -110])
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0])
  const blobScale = useTransform(scrollY, [0, 600], [1, 1.18])
  const blobOpacity = useTransform(scrollY, [0, 500], [0.9, 0.5])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let raf: number

    const tick = () => {
      const t = video.currentTime
      const d = video.duration || 1

      if (t < 0.5) {
        video.style.opacity = String(t / 0.5)
      } else if (t > d - 0.5) {
        video.style.opacity = String(Math.max(0, 1 - (t - (d - 0.5)) / 0.5))
      } else {
        video.style.opacity = '1'
      }

      raf = requestAnimationFrame(tick)
    }

    const onEnded = () => {
      cancelAnimationFrame(raf)
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        raf = requestAnimationFrame(tick)
      }, 100)
    }

    video.style.opacity = '0'
    video.play().catch(() => {})
    raf = requestAnimationFrame(tick)
    video.addEventListener('ended', onEnded)

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('ended', onEnded)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col" style={{ overflow: 'visible' }}>
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'hue-rotate(-45deg) saturate(1.3) brightness(0.65)' }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
          muted
          playsInline
        />
      </div>

      {/* Blur blob — grows and fades as you scroll */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] blur-[82px] pointer-events-none"
        style={{
          zIndex: 2,
          background: 'hsl(215 70% 6%)',
          opacity: blobOpacity,
          scale: blobScale,
        }}
      />

      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 10 }}>

        {/* Navbar — stays fixed during scroll */}
        <nav className="flex items-center justify-between py-5 px-8">
          <div className="flex items-center gap-2.5">
            <div className="liquid-glass rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 5h16l-6 8v5l-4-2V13L4 5z"
                  stroke="url(#fg)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="fg" x1="4" y1="5" x2="20" y2="21">
                    <stop stopColor="#7dd3fc" />
                    <stop offset="0.5" stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-headline font-semibold text-foreground text-lg tracking-tight">
              LeadForm
            </span>
          </div>

          <div className="hidden md:flex items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-foreground/90 text-sm hover:text-foreground transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="motion-button liquid-glass rounded-full px-4 py-2 text-foreground/90 text-sm hover:text-foreground transition-colors duration-150"
          >
            <span>Free Audit</span>
          </a>
        </nav>

        {/* Divider */}
        <div className="h-px mx-8 mt-[3px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        {/* Hero content — parallax scrolls up and fades out */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-center"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <p className="text-sm font-medium mb-4 tracking-wide" style={{ color: '#00b4ff' }}>
            AI Sales Systems · Marketing Agencies
          </p>

          <h1
            className="font-headline font-normal leading-[0.93] tracking-[-0.028em]"
            style={{ fontSize: 'clamp(56px, 10vw, 148px)' }}
          >
            <span className="text-foreground block">Recover</span>
            <span className="gradient-text block">Revenue.</span>
          </h1>

          <p
            className="text-hero-sub text-lg leading-8 max-w-lg opacity-80"
            style={{ marginTop: '20px' }}
          >
            We audit your agency's sales operations, then build AI-powered systems
            that follow up faster, qualify better, and book more calls —
            without adding headcount.
          </p>

          <a
            href="#contact"
            className="motion-button liquid-glass text-foreground/90 text-sm font-medium rounded-xl hover:text-foreground transition-colors duration-150 inline-block"
            style={{
              paddingLeft: '29px',
              paddingRight: '29px',
              paddingTop: '20px',
              paddingBottom: '20px',
              marginTop: '28px',
            }}
          >
            <span>Book a free audit</span>
          </a>
        </motion.div>

        {/* Stats strip — pinned to bottom, also fades on scroll */}
        <motion.div
          className="pb-12 px-8"
          style={{ opacity: contentOpacity }}
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {STATS.map((stat, i) => (
              <div key={i} className="liquid-glass rounded-full px-6 py-3 flex items-center gap-3">
                <span className="font-headline font-semibold text-foreground text-sm">
                  {stat.value}
                </span>
                <span
                  className="w-px h-3.5 flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.18)' }}
                />
                <span className="text-hero-sub text-sm opacity-70">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
