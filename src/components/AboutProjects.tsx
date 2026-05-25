import About from './About'
import Projects from './Projects'

export default function AboutProjectsLayout() {
  return (
    <section id="about" style={{ padding: '8rem 2.5rem', background: 'var(--bg)' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '5rem',
        alignItems: 'start',
      }}>

        {/* Sidebar sticky */}
        <div style={{ position: 'sticky', top: '6rem' }}>
          <About compact />
        </div>

        {/* Columna scrollable */}
        <div id="projects">
          <Projects compact />
        </div>

      </div>
    </section>
  )
}