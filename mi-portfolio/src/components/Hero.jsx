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
      <div
        style={{
          position: 'absolute',
          top: '-10rem',
          right: '-10rem',
          width: '40rem',
          height: '40rem',
          borderRadius: '50%',
          border: '1px solid var(--accent-border)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-5rem',
          right: '-5rem',
          width: '25rem',
          height: '25rem',
          borderRadius: '50%',
          border: '1px solid var(--accent-border)',
          pointerEvents: 'none',
        }}
      />

      <div ref={titleRef} style={{ maxWidth: '900px' }}>
        <p
          style={{
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            marginBottom: '1rem',
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
          }}
        >
          Tu Nombre
        </h1>

        <h2
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
          }}
        >
          Ingeniero Informático de Software
        </h2>

        <p
          style={{
            maxWidth: '540px',
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            marginBottom: '3rem',
            lineHeight: 1.8,
          }}
        >
          Apasionado por construir software limpio, escalable y con propósito.
          Especializado en desarrollo web y aplicaciones de escritorio.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              padding: '0.85rem 2.2rem',
              background: 'var(--fg)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              opacity: primaryHover ? 0.85 : 1,
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
              border: '1px solid var(--accent-border)',
              color: 'var(--fg)',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'background 0.2s',
              background: secondaryHover ? 'var(--accent-dim)' : 'transparent',
            }}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
          >
            Contactar
          </a>
        </div>
      </div>

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
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: '1px',
            height: '50px',
            background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
          }}
        />
      </div>
    </section>
  )
}