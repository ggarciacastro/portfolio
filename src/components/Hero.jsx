import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const titleRef = useRef(null)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    const timer = setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
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
      <div
        style={{
          position: 'absolute',
          top: '-12rem',
          right: '-12rem',
          width: '45rem',
          height: '45rem',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-6rem',
          right: '-6rem',
          width: '28rem',
          height: '28rem',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          pointerEvents: 'none',
        }}
      />
      {/* Punto de acento */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
        }}
      />

      <div ref={titleRef} style={{ maxWidth: '900px' }}>
        <p
          style={{
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            marginBottom: '1.2rem',
            fontWeight: 500,
          }}
        >
          👋 Hola, soy
        </p>

        <h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            fontWeight: 900,
            color: 'var(--fg)',
          }}
        >
          Gonzalo García Castro
        </h1>

        <h2
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            color: 'var(--fg-muted)',
            marginBottom: '2.5rem',
          }}
        >
          Ingeniero Informático de Software
        </h2>

        <p
          style={{
            maxWidth: '540px',
            color: 'var(--fg-muted)',
            fontSize: '1.05rem',
            marginBottom: '3rem',
            lineHeight: 1.9,
          }}
        >
            Ingeniero de software con base sólida en arquitectura de sistemas y desarrollo fullstack, especializándome en análisis de datos masivos e inteligencia artificial.        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              padding: '0.85rem 2.2rem',
              background: primaryHover ? '#d4541f' : 'var(--accent)',
              color: 'var(--fg)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              borderRadius: '2px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            style={{
              padding: '0.85rem 2.2rem',
              border: '1px solid var(--border-hover)',
              color: 'var(--fg)',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              borderRadius: '2px',
              transition: 'background 0.2s, border-color 0.2s',
              background: secondaryHover ? 'var(--bg-card)' : 'transparent',
              borderColor: secondaryHover ? 'var(--accent-border)' : 'var(--border-hover)',
            }}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
          >
            Contactar
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--fg-muted)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: '1px',
            height: '50px',
            background: 'linear-gradient(to bottom, var(--fg-muted), transparent)',
          }}
        />
      </div>
    </section>
  )
}