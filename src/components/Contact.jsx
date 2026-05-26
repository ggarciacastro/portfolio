import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

function SocialLink({ href, label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: hovered ? 'var(--rose)' : 'var(--fg-muted)',
        fontSize: '0.85rem', letterSpacing: '0.1em',
        textDecoration: 'none', transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  )
}

export default function Contact() {
  const containerRef = useRef(null)

  const socials = [
    { label: 'GitHub',   href: 'https://github.com/ggarciacastro' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/tuusuario' },
    { label: 'Twitter/X',href: 'https://twitter.com/tuusuario' },
  ]

  useGSAP(() => {
    gsap.from('.contact-animate', {
      opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
    })
  }, { scope: containerRef })

  return (
    <section
      id="contact"
      ref={containerRef}
      style={{
        padding: '8rem 2.5rem',
        background: 'var(--bg-dark)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <p className="contact-animate" style={{
          color: 'var(--amber)', letterSpacing: '0.2em',
          textTransform: 'uppercase', fontSize: '0.8rem',
          marginBottom: '1rem', fontWeight: 500,
        }}>
          Contacto
        </p>

        <h2 className="contact-animate" style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          lineHeight: 1.05, marginBottom: '1.5rem', color: 'var(--fg)',
        }}>
          ¿Hablamos?
        </h2>

        <p className="contact-animate" style={{
          color: 'var(--fg-muted)', fontSize: '1.05rem',
          lineHeight: 1.9, marginBottom: '3rem',
        }}>
          Estoy abierto a nuevas oportunidades o colaboraciones.
        </p>

        <a
          className="contact-animate"
          href="mailto:gonzalogarciacas@gmail.com"
          style={{
            display: 'inline-block', padding: '1rem 3rem',
            background: 'var(--accent)', color: 'var(--bg)',
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: '1rem', borderRadius: '2px',
            textDecoration: 'none', transition: 'opacity 0.2s',
            marginBottom: '4rem',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Envíame un email
        </a>

        <div className="contact-animate" style={{
          display: 'flex', justifyContent: 'center', gap: '2.5rem',
          borderTop: '1px solid var(--border)', paddingTop: '2.5rem',
        }}>
          {socials.map(({ label, href }) => (
            <SocialLink key={label} href={href} label={label} />
          ))}
        </div>

        <p className="contact-animate" style={{
          color: 'var(--fg-subtle)', fontSize: '0.8rem',
          marginTop: '3rem', letterSpacing: '0.05em',
        }}>
          © 2025 Gonzalo García Castro — Hecho con React + Vite
        </p>
      </div>
    </section>
  )
}
