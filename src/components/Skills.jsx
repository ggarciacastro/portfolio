import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const skillGroups = [
  { category: 'Frontend',       skills: ['React', 'TypeScript', 'HTML/CSS', 'Thymeleaf', 'Tailwind', 'Twig'] },
  { category: 'Backend',        skills: ['Node.js', 'Python', 'Java', 'APIRest', 'Spring Boot', 'Rust'] },
  { category: 'Bases de datos', skills: ['HSQLDB', 'MongoDB', 'MySQL', 'MariaDB', 'Oracle SQL'] },
  { category: 'Herramientas',   skills: ['Git', 'Docker', 'Linux', 'CI/CD'] },
]

export default function Skills() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from('.skills-header', {
      opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-header', start: 'top 85%', once: true },
    })

    gsap.from(['.skill-group', '.skill-item'], {
      opacity: 0, y: 20, stagger: 0.06, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: '.skill-group', start: 'top 80%', once: true },
    })
  }, { scope: containerRef })

  return (
    <section id="skills" ref={containerRef} style={{
      padding: '8rem 2.5rem', maxWidth: '1100px', margin: '0 auto',
    }}>
      <div className="skills-header" style={{ marginBottom: '4rem' }}>
        <p style={{
          color: 'var(--amber)', letterSpacing: '0.2em',
          textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem',
        }}>
          Tecnologías
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1 }}>
          Mi stack.
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
      }}>
        {skillGroups.map(group => (
          <div key={group.category} className="skill-group" style={{
            borderTop: '1px solid var(--accent-border)', paddingTop: '1.5rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-body)', fontWeight: 500,
              fontSize: '0.8rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--fg-muted)',
              marginBottom: '1.2rem',
            }}>
              {group.category}
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {group.skills.map(skill => (
                <li key={skill} className="skill-item" style={{
                  display: 'flex', alignItems: 'center',
                  gap: '0.8rem', fontSize: '1.05rem',
                }}>
                  <span style={{
                    width: '5px', height: '5px',
                    background: 'var(--accent)', borderRadius: '50%', flexShrink: 0,
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
