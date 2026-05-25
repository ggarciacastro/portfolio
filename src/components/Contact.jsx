import { useState } from 'react'

function SocialLink({ href, label }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: hovered ? 'var(--fg)' : 'var(--fg-muted)',
        fontSize: '0.85rem',
        letterSpacing: '0.1em',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  )
}

export default function Contact() {
  const [btnHovered, setBtnHovered] = useState(false)

  const socials = [
    { label: 'GitHub', href: 'https://github.com/tuusuario' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/tuusuario' },
    { label: 'Twitter/X', href: 'https://twitter.com/tuusuario' },
  ]

  return (
    <section
      id="contact"
      style={{
        padding: '8rem 2.5rem',
        background: 'var(--bg-dark)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <p
          style={{
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            fontWeight: 500,
          }}
        >
          Contacto
        </p>

        <h2
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            color: 'var(--fg)',
          }}
        >
          ¿Hablamos?
        </h2>

        <p
          style={{
            color: 'var(--fg-muted)',
            fontSize: '1.05rem',
            lineHeight: 1.9,
            marginBottom: '3rem',
          }}
        >
          Estoy abierto a nuevas oportunidades, colaboraciones o simplemente
          a una buena conversación sobre tecnología.
        </p>

        <a
          href="mailto:tu@email.com"
          style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: btnHovered ? '#d4541f' : 'var(--accent)',
            color: 'var(--fg)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '1rem',
            borderRadius: '2px',
            textDecoration: 'none',
            transition: 'background 0.2s',
            marginBottom: '4rem',
          }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
        >
          Envíame un email
        </a>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2.5rem',
            borderTop: '1px solid var(--border)',
            paddingTop: '2.5rem',
          }}
        >
          {socials.map(({ label, href }) => (
            <SocialLink key={label} href={href} label={label} />
          ))}
        </div>

        <p
          style={{
            color: 'var(--fg-subtle)',
            fontSize: '0.8rem',
            marginTop: '3rem',
            letterSpacing: '0.05em',
          }}
        >
          © 2025 Tu Nombre — Hecho con React + Vite
        </p>
      </div>
    </section>
  )
}