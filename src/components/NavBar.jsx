import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const BREAKPOINT = 768

const links = [
  { label: 'Sobre mí',  href: '#about',   section: 'about' },
  { label: 'Proyectos', href: '#projects', section: 'projects' },
  { label: 'Skills',    href: '#skills',   section: 'skills' },
  { label: 'Contacto',  href: '#contact',  section: 'contact' },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < BREAKPOINT)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < BREAKPOINT)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return isMobile
}

export default function Navbar() {
  const isMobile   = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef     = useRef(null)
  const menuRef    = useRef(null)
  const barsRef    = useRef([])
  const linkRefs   = useRef({})
  const lineRefs   = useRef({})
  const activeRef  = useRef(null)

  /* ── Hamburger toggle ── */
  const openMenu = () => {
    setMenuOpen(true)
    gsap.to(menuRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', pointerEvents: 'auto' })
    gsap.to('.mobile-nav-link', { opacity: 1, y: 0, stagger: 0.07, duration: 0.35, ease: 'power3.out', delay: 0.05 })
    gsap.to(barsRef.current[0], { rotation: 45,  y: 7,  duration: 0.25 })
    gsap.to(barsRef.current[1], { opacity: 0,         duration: 0.15 })
    gsap.to(barsRef.current[2], { rotation: -45, y: -7, duration: 0.25 })
  }

  const closeMenu = () => {
    gsap.to(menuRef.current, { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in', pointerEvents: 'none',
      onComplete: () => setMenuOpen(false),
    })
    gsap.to(barsRef.current[0], { rotation: 0, y: 0, duration: 0.25 })
    gsap.to(barsRef.current[1], { opacity: 1,        duration: 0.15 })
    gsap.to(barsRef.current[2], { rotation: 0, y: 0, duration: 0.25 })
  }

  const toggleMenu = () => menuOpen ? closeMenu() : openMenu()

  /* ── Scrollspy & entrance (desktop only) ── */
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
    /* Navbar scrolled background */
    ScrollTrigger.create({
      start: 'top -60',
      onEnter:     () => navRef.current?.classList.add('nav--scrolled'),
      onLeaveBack: () => navRef.current?.classList.remove('nav--scrolled'),
    })

    if (isMobile) return

    /* Desktop entrance */
    gsap.set(['.nav-logo', '.nav-link-item'], { opacity: 0, y: -10 })
    gsap.to('.nav-logo',      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.8 })
    gsap.to('.nav-link-item', { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.9 })

    /* Scrollspy */
    links.forEach(({ section }) => {
      const el = document.getElementById(section)
      if (!el) return
      ScrollTrigger.create({
        trigger: el, start: 'top 50%', end: 'bottom 50%',
        onEnter:     () => activateSection(section),
        onEnterBack: () => activateSection(section),
      })
    })
  }, { scope: navRef, dependencies: [isMobile] })

  /* Hover (desktop) */
  const onHoverEnter = (section) => {
    if (activeRef.current === section) return
    gsap.fromTo(lineRefs.current[section],
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.25, ease: 'power2.out' }
    )
  }
  const onHoverLeave = (section) => {
    if (activeRef.current === section) return
    gsap.to(lineRefs.current[section], { scaleX: 0, transformOrigin: 'right center', duration: 0.2, ease: 'power2.in' })
  }

  /* Close menu on resize to desktop */
  useEffect(() => {
    if (!isMobile && menuOpen) closeMenu()
  }, [isMobile])

  const barStyle = {
    display: 'block', width: '22px', height: '2px',
    background: 'var(--fg)', borderRadius: '2px',
    transformOrigin: 'center',
  }

  return (
    <>
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      padding: '1.2rem 2.5rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'transparent', backdropFilter: 'none',
      borderBottom: '1px solid transparent',
      transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
    }}>
      <a className="nav-logo" href="#home" style={{
        fontFamily: 'var(--font-display)', fontSize: '1.4rem',
        fontWeight: 900, color: 'var(--fg)', letterSpacing: '0.02em',
      }}>
        ggarciacastro
      </a>

      {/* ── Desktop links ── */}
      {!isMobile && (
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
              <span ref={el => lineRefs.current[section] = el} style={{
                position: 'absolute', bottom: 0, left: 0,
                width: '100%', height: '1px', background: 'var(--accent)',
                transform: 'scaleX(0)', transformOrigin: 'left center', willChange: 'transform',
              }} />
            </li>
          ))}
        </ul>
      )}

      {/* ── Hamburger (mobile) ── */}
      {isMobile && (
        <button
          onClick={toggleMenu}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px',
            padding: '4px', zIndex: 110,
          }}
          aria-label="Menú"
        >
          {[0, 1, 2].map(i => (
            <span key={i} ref={el => barsRef.current[i] = el} style={barStyle} />
          ))}
        </button>
      )}

    </nav>

      {isMobile && createPortal(
        <div ref={menuRef} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(9,9,18,0.97)',
          backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '2.5rem', zIndex: 200,
          opacity: 0, pointerEvents: 'none',
        }}>
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="mobile-nav-link"
              onClick={closeMenu}
              style={{
                color: 'var(--fg)', fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.04em',
                opacity: 0, transform: 'translateY(12px)',
              }}
            >
              {label}
            </a>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}
