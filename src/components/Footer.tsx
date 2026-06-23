const FOOTER_LINKS = [
  {
    title: 'The System',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Services', href: '#services' },
      { label: "Who it's for", href: '#whos-it-for' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { label: 'Book a free audit', href: 'book.html' },
      { label: 'gianluca@leadformsystems.com', href: 'mailto:gianluca@leadformsystems.com' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="px-8 pb-12 pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-16" />

        {/* Outer Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-y-10 md:gap-x-12 mb-16">
          
          {/* Brand Column (Takes up 2 slots on desktop) */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="liquid-glass rounded-lg w-7 h-7 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 5h16l-6 8v5l-4-2V13L4 5z"
                    stroke="url(#footerGrad)"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="footerGrad" x1="4" y1="5" x2="20" y2="21">
                      <stop stopColor="#7dd3fc" />
                      <stop offset="0.5" stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-headline font-semibold text-foreground tracking-tight">
                LeadForm Systems
              </span>
            </div>
            <p className="text-hero-sub text-sm opacity-70 leading-6 max-w-[200px]">
              AI-powered sales systems for marketing agencies — from lead capture to
              booked sales call.
            </p>
          </div>

          {/* Link Columns Container (Takes up remaining 4 slots on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:col-span-4 gap-8">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="min-w-[140px]">
                <p className="text-foreground text-xs font-semibold uppercase tracking-widest mb-4 opacity-60">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-hero-sub text-sm opacity-70 hover:opacity-100 transition-opacity duration-150 break-all sm:break-normal"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-7" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-foreground/30 text-xs">
            © 2026 LeadForm Systems. All rights reserved.
          </p>
          <p className="text-foreground/20 text-xs">
            Spaces are limited — we work with a select number of agencies at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
