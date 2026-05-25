import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const containerRef = useRef(null)
  const scrollLineRef = useRef(null)

  useGSAP(() => {
    gsap.set('.hero-eyebrow', { opacity: 0, y: 16 })
    gsap.set('.hero-title',   { opacity: 0, y: 40 })
    gsap.set('.hero-subtitle',{ opacity: 0, y: 24 })
    gsap.set('.hero-body',    { opacity: 0, y: 20 })
    gsap.set('.hero-cta a',   { opacity: 0, y: 16 })
    gsap.set('.hero-scroll',  { opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })

    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6 })
      .to('.hero-title',   { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .to('.hero-subtitle',{ opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to('.hero-body',    { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to('.hero-cta a',   { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, '-=0.3')
      .to('.hero-scroll',  { opacity: 1, duration: 0.4 }, '-=0.1')

    gsap.to(scrollLineRef.current, {
      scaleY: 0.2,
      transformOrigin: 'top center',
      duration: 0.9,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, { scope: containerRef })

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Círculos decorativos */}
      <div style={{
        position: 'absolute', top: '-12rem', right: '-12rem',
        width: '45rem', height: '45rem',
        borderRadius: '50%', border: '1px solid var(--border)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-6rem', right: '-6rem',
        width: '28rem', height: '28rem',
        borderRadius: '50%', border: '1px solid var(--border)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '5%',
        width: '6px', height: '6px',
        borderRadius: '50%', background: 'var(--accent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px' }}>
        <p className="hero-eyebrow" style={{
          color: 'var(--accent)', letterSpacing: '0.2em',
          textTransform: 'uppercase', fontSize: '0.8rem',
          marginBottom: '1.2rem', fontWeight: 500,
        }}>
          Hola, soy
        </p>

        <h1 className="hero-title" style={{
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 1.05, marginBottom: '1.5rem',
          fontWeight: 900, color: 'var(--fg)',
        }}>
          Gonzalo García Castro
        </h1>

        <h2 className="hero-subtitle" style={{
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          fontFamily: 'var(--font-body)', fontWeight: 300,
          color: 'var(--fg-muted)', marginBottom: '2.5rem',
        }}>
          Ingeniero Informático de Software
        </h2>

        <p className="hero-body" style={{
          maxWidth: '540px', color: 'var(--fg-muted)',
          fontSize: '1.05rem', marginBottom: '3rem', lineHeight: 1.9,
        }}>
          Ingeniero de software con base sólida en arquitectura de sistemas y desarrollo fullstack,
          especializándome en análisis de datos masivos e inteligencia artificial.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              padding: '0.85rem 2.2rem',
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-body)', fontWeight: 500,
              fontSize: '0.9rem', letterSpacing: '0.05em',
              borderRadius: '2px', transition: 'background 0.2s, opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            style={{
              padding: '0.85rem 2.2rem',
              border: '1px solid var(--border-hover)',
              color: 'var(--fg)', fontFamily: 'var(--font-body)',
              fontWeight: 300, fontSize: '0.9rem', letterSpacing: '0.05em',
              borderRadius: '2px', transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg-card)'
              e.currentTarget.style.borderColor = 'var(--accent-border)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'var(--border-hover)'
            }}
          >
            Contactar
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll" style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem',
        color: 'var(--fg-muted)', fontSize: '0.7rem',
        letterSpacing: '0.2em', textTransform: 'uppercase',
      }}>
        <span>Scroll</span>
        <div
          ref={scrollLineRef}
          style={{
            width: '1px', height: '50px',
            background: 'linear-gradient(to bottom, var(--fg-muted), transparent)',
          }}
        />
      </div>
    </section>
  )
}
