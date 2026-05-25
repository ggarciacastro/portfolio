const projects = [
  {
    title: 'Proyecto Uno',
    description: 'Descripción breve del proyecto. Qué problema resuelve y qué tecnologías usaste.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/tuusuario/proyecto-uno',
    demo: '#',
  },
  {
    title: 'Proyecto Dos',
    description: 'Descripción breve del proyecto. Qué problema resuelve y qué tecnologías usaste.',
    tags: ['Python', 'FastAPI', 'PostgreSQL'],
    github: 'https://github.com/tuusuario/proyecto-dos',
    demo: '#',
  },
  {
    title: 'Proyecto Tres',
    description: 'Descripción breve del proyecto. Qué problema resuelve y qué tecnologías usaste.',
    tags: ['TypeScript', 'Next.js', 'Prisma'],
    github: 'https://github.com/tuusuario/proyecto-tres',
    demo: '#',
  },
  {
    title: 'Proyecto Cuatro',
    description: 'Descripción breve del proyecto. Qué problema resuelve y qué tecnologías usaste.',
    tags: ['Java', 'Spring Boot', 'MySQL'],
    github: 'https://github.com/tuusuario/proyecto-cuatro',
    demo: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{
      padding: '8rem 2.5rem',
      background: 'var(--bg-dark)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            marginBottom: '1rem',
          }}>
            Portafolio
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            lineHeight: 1.1,
          }}>
            Proyectos destacados.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--accent-border)',
        borderRadius: '2px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'var(--fg)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'var(--accent-border)'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}>
          0{index + 1}
        </span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={project.github} target="_blank" rel="noreferrer"
            style={{ color: 'var(--text-muted)', fontSize: '0.85rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--fg)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >GitHub ↗</a>
          {project.demo !== '#' && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              style={{ color: 'var(--text-muted)', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--fg)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >Demo ↗</a>
          )}
        </div>
      </div>

      <h3 style={{ fontSize: '1.4rem', lineHeight: 1.2 }}>{project.title}</h3>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, flexGrow: 1 }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            padding: '0.3rem 0.8rem',
            border: '1px solid var(--accent-border)',
            borderRadius: '2px',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}