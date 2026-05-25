export default function About() {
  return (
    <section id="about" style={{
      padding: '8rem 2.5rem',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: '5rem',
        alignItems: 'center',
      }}>
        {/* Foto / placeholder */}
        <div style={{
          aspectRatio: '3/4',
          background: 'var(--bg-card)',
          border: '1px solid var(--accent-border)',
          borderRadius: '2px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
          }}>
            Tu foto aquí
          </span>
          {/* Línea decorativa */}
          <div style={{
            position: 'absolute',
            bottom: '-1rem',
            right: '-1rem',
            width: '60%',
            height: '60%',
            border: '1px solid var(--accent-border)',
            borderRadius: '2px',
          }} />
        </div>

        {/* Texto */}
        <div>
          <p style={{
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            marginBottom: '1rem',
          }}>
            Sobre mí
          </p>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            lineHeight: 1.1,
            marginBottom: '2rem',
          }}>
            Del código<br/>al dato.
          </h2>

          <p style={{
            color: 'var(--text-muted)',
            marginBottom: '1.2rem',
            lineHeight: 1.9,
          }}>
            Ingeniero de software fullstack con base sólida en arquitectura y adaptación rápida a nuevos lenguajes y tecnologías.
          </p>

          <p style={{
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
            lineHeight: 1.9,
          }}>
            Especializándome en big data e IA aplicada al análisis de datos biomédicos, con el objetivo de crear soluciones con impacto real en la salud.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}>
            {[
              { label: 'Ubicación', value: 'España' },
              { label: 'Disponibilidad', value: 'Abierto a ofertas' },
              { label: 'Enfoque', value: 'Fullstack' },
              { label: 'GitHub', value: '@tuusuario' },
            ].map(item => (
              <div key={item.label}>
                <p style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '0.3rem',
                }}>
                  {item.label}
                </p>
                <p style={{ fontWeight: 500 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}