const skillGroups = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'HTML/CSS', 'Next.js', 'Tailwind'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Python', 'Java', 'FastAPI', 'Spring Boot'],
  },
  {
    category: 'Bases de datos',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
  },
  {
    category: 'Herramientas',
    skills: ['Git', 'Docker', 'Linux', 'AWS', 'Figma'],
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{
      padding: '8rem 2.5rem',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <div style={{ marginBottom: '4rem' }}>
        <p style={{
          color: 'var(--text-muted)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          marginBottom: '1rem',
        }}>
          Tecnologías
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          lineHeight: 1.1,
        }}>
          Mi stack.
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
      }}>
        {skillGroups.map(group => (
          <div key={group.category} style={{
            borderTop: '1px solid var(--accent-border)',
            paddingTop: '1.5rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '1.2rem',
            }}>
              {group.category}
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {group.skills.map(skill => (
                <li key={skill} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  fontSize: '1.05rem',
                }}>
                  <span style={{
                    width: '5px',
                    height: '5px',
                    background: 'var(--fg)',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }} />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}