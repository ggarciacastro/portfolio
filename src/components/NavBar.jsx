import { useState, useEffect } from 'react'

function NavLink({ href, label }) {
  const [hovered, setHovered] = useState(false)

  return (
    <li>
      <a
        href={href}
        style={{
          color: hovered ? 'var(--fg)' : 'var(--fg-muted)',
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </a>
    </li>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Sobre mí', href: '#about' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contacto', href: '#contact' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        padding: '1.2rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(9, 20, 34, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--accent-border)' : 'none',
      }}
    >
      <a
        href="#home"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 900,
          color: 'var(--fg)',
          letterSpacing: '0.02em',
        }}
      >
        Tu Nombre
      </a>

      <ul
        style={{
          display: 'flex',
          gap: '2.5rem',
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        {links.map(({ label, href }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </ul>
    </nav>
  )
}