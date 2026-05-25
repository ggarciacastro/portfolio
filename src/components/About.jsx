import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function About({ compact = false }) {
  const containerRef = useRef(null)

  const info = [
    { label: 'Ubicación',      value: 'España' },
    { label: 'Disponibilidad', value: 'Abierto a ofertas' },
    { label: 'Enfoque',        value: 'Fullstack + Data' },
    { label: 'GitHub',         value: '@ggarciacastro' },
  ]

  useGSAP(() => {
    if (compact) return
    const els = containerRef.current.querySelectorAll('.about-animate')
    gsap.from(els, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id={compact ? undefined : 'about'}
      style={compact ? {} : { padding: '8rem 2.5rem', maxWidth: '1100px', margin: '0 auto' }}
    >
      <p className="about-animate" style={{
        color: 'var(--accent)', letterSpacing: '0.2em',
        textTransform: 'uppercase', fontSize: '0.78rem',
        marginBottom: '1rem', fontWeight: 500,
      }}>
        Sobre mí
      </p>

      <h2 className="about-animate" style={{
        fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
        lineHeight: 1.1, marginBottom: '1.8rem',
        color: 'var(--fg)',
      }}>
        Del código<br />al dato.
      </h2>

      {/* Foto placeholder */}
      <div className="about-animate" style={{
        width: '100%', aspectRatio: '4/3',
        background: 'var(--bg-card)', border: '1px solid var(--accent-border)',
        borderRadius: '4px', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.8rem', position: 'relative', overflow: 'hidden',
      }}>
        <span style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          Tu foto aquí
        </span>
        <div style={{
          position: 'absolute', bottom: '-0.8rem', right: '-0.8rem',
          width: '50%', height: '50%',
          border: '1px solid var(--accent-border)', borderRadius: '2px',
        }} />
      </div>

      <p className="about-animate" style={{ color: 'var(--fg-muted)', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '1rem' }}>
        Ingeniero de software fullstack con base sólida en arquitectura y adaptación rápida a nuevos lenguajes y tecnologías.
      </p>
      <p className="about-animate" style={{ color: 'var(--fg-muted)', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '2rem' }}>
        Especializándome en big data e IA aplicada al análisis de datos biomédicos, con el objetivo de crear soluciones con impacto real en la salud.
      </p>

      <div className="about-animate" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '1.2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem',
      }}>
        {info.map(item => (
          <div key={item.label}>
            <p style={{
              fontSize: '0.68rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.3rem',
            }}>
              {item.label}
            </p>
            <p style={{ fontWeight: 500, fontSize: '0.88rem', color: 'var(--fg)' }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
