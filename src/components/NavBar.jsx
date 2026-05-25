import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const links = [
  { label: 'Sobre mí',  href: '#about',   section: 'about' },
  { label: 'Proyectos', href: '#projects', section: 'projects' },
  { label: 'Skills',    href: '#skills',   section: 'skills' },
  { label: 'Contacto',  href: '#contact',  section: 'contact' },
]

export default function Navbar() {
  const navRef    = useRef(null)
  const linkRefs  = useRef({})
  const lineRefs  = useRef({})
  const activeRef = useRef(null)

  const activateSection = (sectionId) => {
    if (activeRef.current === sectionId) return
    activeRef.current = sectionId

    links.forEach(({ section }) => {
      const link = linkRefs.current[section]
      const line = lineRefs.current[section]
      if (!link || !line) return

      if (section === sectionId) {
        link.classList.add('is-active')
        gsap.to(line, { scaleX: 1, transformOrigin: 'left center', duration: 0.4, ease: 'power3.out' })
      } else {
        link.classList.remove('is-active')
        gsap.to(line, { scaleX: 0, transformOrigin: 'right center', duration: 0.25, ease: 'power2.in' })
      }
    })
  }

  useGSAP(() => {
    // Fondo navbar via CSS class — sin re-render de React
    ScrollTrigger.create({
      start: 'top -60',
      onEnter:     () => navRef.current.classList.add('nav--scrolled'),
      onLeaveBack: () => navRef.current.classList.remove('nav--scrolled'),
    })

    // Scrollspy
    links.forEach(({ section }) => {
      const el = document.getElementById(section)
      if (!el) return
      ScrollTrigger.create({
        trigger:     el,
        start:       'top 50%',
        end:         'bottom 50%',
        onEnter:     () => activateSection(section),
        onEnterBack: () => activateSection(section),
      })
    })

    // Entrada staggerada
    gsap.set(['.nav-logo', '.nav-link-item'], { opacity: 0, y: -10 })
    gsap.to('.nav-logo',      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.8 })
    gsap.to('.nav-link-item', { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.9 })
  }, { scope: navRef })

  const onHoverEnter = (section) => {
    if (activeRef.current === section) return
    gsap.fromTo(lineRefs.current[section],
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.25, ease: 'power2.out' }
    )
  }

  const onHoverLeave = (section) => {
    if (activeRef.current === section) return
    gsap.to(lineRefs.current[section], {
      scaleX: 0, transformOrigin: 'right center', duration: 0.2, ease: 'power2.in',
    })
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        padding: '1.2rem 2.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'transparent',
        backdropFilter: 'none',
        borderBottom: '1px solid transparent',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
      }}
    >
      <a
        className="nav-logo"
        href="#home"
        style={{
          fontFamily: 'var(--font-display)', fontSize: '1.4rem',
          fontWeight: 900, color: 'var(--fg)', letterSpacing: '0.02em',
        }}
      >
        ggarciacastro
      </a>

      <ul style={{ display: 'flex', gap: '2.5rem', margin: 0, padding: 0, listStyle: 'none' }}>
        {links.map(({ label, href, section }) => (
          <li key={section} className="nav-link-item" style={{ position: 'relative', opacity: 0 }}>
            <a
              ref={el => linkRefs.current[section] = el}
              href={href}
              onMouseEnter={() => onHoverEnter(section)}
              onMouseLeave={() => onHoverLeave(section)}
              style={{
                color: 'var(--fg-muted)', fontSize: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', display: 'block', paddingBottom: '3px',
              }}
            >
              {label}
            </a>
            <span
              ref={el => lineRefs.current[section] = el}
              style={{
                position: 'absolute', bottom: 0, left: 0,
                width: '100%', height: '1px',
                background: 'var(--accent)',
                transform: 'scaleX(0)', transformOrigin: 'left center',
                willChange: 'transform',
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
