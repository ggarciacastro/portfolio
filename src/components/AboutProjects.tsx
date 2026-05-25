import { useState, useEffect } from 'react'
import About from './About'
import Projects from './Projects'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

export default function AboutProjectsLayout() {
  const isMobile = useIsMobile()

  return (
    <section id="about" style={{ padding: '8rem 2.5rem', background: 'var(--bg)' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
        gap: isMobile ? '3rem' : '7rem',
        alignItems: 'start',
      }}>

        {/* Sidebar — sticky solo en desktop */}
        <div style={isMobile
          ? { borderBottom: '1px solid var(--accent-border)', paddingBottom: '3rem' }
          : { position: 'sticky', top: '5rem', borderRight: '1px solid var(--accent-border)', paddingRight: '4rem' }
        }>
          <About compact />
        </div>

        {/* Columna de proyectos */}
        <div id="projects">
          <Projects compact />
        </div>

      </div>
    </section>
  )
}