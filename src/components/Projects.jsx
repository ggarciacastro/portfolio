import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return isMobile
}

function SvgYGame() {
  const size = 5
  const r = 14
  const hexW = r * Math.sqrt(3)
  const hexH = r * 2
  const cells = []

  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= row; col++) {
      const cx = (col - row / 2) * hexW + (size * hexW) / 2
      const cy = row * hexH * 0.75 + r
      cells.push({ cx, cy })
    }
  }

  const svgW = size * hexW
  const svgH = (size - 1) * hexH * 0.75 + hexH

  const hexPath = (cx, cy) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6
      return `${cx + r * 0.88 * Math.cos(a)},${cy + r * 0.88 * Math.sin(a)}`
    })
    return `M${pts.join('L')}Z`
  }

  const colors = [
    '#1d4ed8', '#991b1b', null,
    '#1d4ed8', null, null,
    null, '#991b1b', null, null,
    null, null, null, null, null,
  ]

  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: 'block', opacity: 0.85 }}>
      {cells.map(({ cx, cy }, i) => (
        <path
          key={i}
          d={hexPath(cx, cy)}
          fill={colors[i] ?? 'rgba(255,255,255,0.04)'}
          stroke={colors[i] ? 'rgba(255,255,255,0.2)' : 'rgba(167,139,250,0.25)'}
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}

function SvgCompiler() {
  const stages = ['Lexical', 'Syntax', 'Semantic', 'Codegen']
  const boxH = 20
  const gap = 6
  const totalW = 140
  const totalH = 110

  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} style={{ display: 'block', opacity: 0.9 }}>
      <rect x={20} y={0} width={100} height={18} rx="2"
        fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.4)" strokeWidth="1" />
      <text x={70} y={12} textAnchor="middle" fontSize="7.5" fill="rgba(167,139,250,0.8)" fontFamily="monospace">
        Python-- input
      </text>
      <line x1={70} y1={18} x2={70} y2={26} stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
      <polygon points="67,26 73,26 70,30" fill="rgba(167,139,250,0.3)" />
      {stages.map((label, i) => {
        const y = 30 + i * (boxH + gap)
        return (
          <g key={label}>
            <rect x={20} y={y} width={100} height={boxH} rx="2"
              fill="rgba(255,255,255,0.04)" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
            <text x={70} y={y + 13} textAnchor="middle" fontSize="7.5"
              fill="rgba(228,240,236,0.6)" fontFamily="monospace">{label}</text>
            {i < stages.length - 1 && (
              <>
                <line x1={70} y1={y + boxH} x2={70} y2={y + boxH + gap - 2} stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
                <polygon points={`67,${y + boxH + gap - 2} 73,${y + boxH + gap - 2} 70,${y + boxH + gap + 2}`} fill="rgba(167,139,250,0.25)" />
              </>
            )}
          </g>
        )
      })}
      <line x1={70} y1={30 + stages.length * (boxH + gap) - gap} x2={70} y2={30 + stages.length * (boxH + gap) - gap + 6} stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
      <polygon points={`67,${30 + stages.length * (boxH + gap) - gap + 6} 73,${30 + stages.length * (boxH + gap) - gap + 6} 70,${30 + stages.length * (boxH + gap) - gap + 10}`} fill="rgba(167,139,250,0.3)" />
      <rect x={20} y={30 + stages.length * (boxH + gap) - gap + 10} width={100} height={18} rx="2"
        fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.5)" strokeWidth="1" />
      <text x={70} y={30 + stages.length * (boxH + gap) - gap + 22} textAnchor="middle" fontSize="7.5"
        fill="rgba(167,139,250,0.9)" fontFamily="monospace">MAPL output</text>
    </svg>
  )
}

function SvgReservas() {
  const w = 140
  const h = 130
  const days = [
    { x: 10,  y: 20, status: 'free' },
    { x: 38,  y: 20, status: 'taken' },
    { x: 66,  y: 20, status: 'free' },
    { x: 10,  y: 48, status: 'taken' },
    { x: 38,  y: 48, status: 'mine' },
    { x: 66,  y: 48, status: 'free' },
    { x: 10,  y: 76, status: 'free' },
    { x: 38,  y: 76, status: 'free' },
    { x: 66,  y: 76, status: 'taken' },
  ]
  const colorMap = {
    free:  { fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(167,139,250,0.15)' },
    taken: { fill: 'rgba(228,240,236,0.07)', stroke: 'rgba(228,240,236,0.2)' },
    mine:  { fill: 'rgba(167,139,250,0.18)',   stroke: 'rgba(167,139,250,0.6)' },
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', opacity: 0.9 }}>
      <rect x={4} y={0} width={88} height={14} rx="2"
        fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.35)" strokeWidth="1" />
      <text x={48} y={10} textAnchor="middle" fontSize="7" fill="rgba(167,139,250,0.8)" fontFamily="monospace">Reservas</text>
      {days.map((d, i) => (
        <g key={i}>
          <rect x={d.x} y={d.y} width={22} height={20} rx="2"
            fill={colorMap[d.status].fill} stroke={colorMap[d.status].stroke} strokeWidth="1" />
          {d.status === 'mine' && (
            <text x={d.x + 11} y={d.y + 13} textAnchor="middle" fontSize="8"
              fill="rgba(167,139,250,0.9)" fontFamily="monospace">✓</text>
          )}
          {d.status === 'taken' && (
            <line x1={d.x + 4} y1={d.y + 10} x2={d.x + 18} y2={d.y + 10}
              stroke="rgba(228,240,236,0.2)" strokeWidth="1.5" />
          )}
        </g>
      ))}
      <rect x={100} y={20} width={36} height={76} rx="2"
        fill="rgba(255,255,255,0.03)" stroke="rgba(167,139,250,0.15)" strokeWidth="1" />
      <circle cx={118} cy={34} r={8}
        fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
      <text x={118} y={38} textAnchor="middle" fontSize="8"
        fill="rgba(167,139,250,0.6)" fontFamily="monospace">U</text>
      {[52, 62, 72, 82].map((y, i) => (
        <rect key={i} x={104} y={y} width={i % 2 === 0 ? 28 : 20} height={3} rx="1.5"
          fill="rgba(228,240,236,0.1)" />
      ))}
      <circle cx={8}  cy={112} r={3} fill="rgba(167,139,250,0.18)" stroke="rgba(167,139,250,0.6)" strokeWidth="1" />
      <text x={14} y={115} fontSize="6.5" fill="rgba(228,240,236,0.4)" fontFamily="monospace">Mi reserva</text>
      <circle cx={70} cy={112} r={3} fill="rgba(228,240,236,0.07)" stroke="rgba(228,240,236,0.2)" strokeWidth="1" />
      <text x={76} y={115} fontSize="6.5" fill="rgba(228,240,236,0.4)" fontFamily="monospace">Ocupado</text>
    </svg>
  )
}

function SvgMotoGP() {
  const w = 130
  const h = 80
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', opacity: 0.85 }}>
      <circle cx="30" cy="58" r="16" fill="none" stroke="rgba(167,139,250,0.45)" strokeWidth="1.5" />
      <circle cx="30" cy="58" r="6"  fill="none" stroke="rgba(167,139,250,0.2)"  strokeWidth="1" />
      <circle cx="100" cy="58" r="16" fill="none" stroke="rgba(167,139,250,0.45)" strokeWidth="1.5" />
      <circle cx="100" cy="58" r="6"  fill="none" stroke="rgba(167,139,250,0.2)"  strokeWidth="1" />
      <path d="M30 58 L48 34 L88 28 L100 58" fill="none" stroke="rgba(228,240,236,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 30 Q80 18 96 34" fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="68" cy="27" rx="10" ry="7" fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
      <line x1="4" y1="58" x2="18" y2="58" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  )
}

function SvgGazaTrauma() {
  const w = 140, h = 100
  const bars = [38, 62, 45, 80, 55, 70, 48]
  const maxH = 54
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', opacity: 0.88 }}>
      {/* Eje X */}
      <line x1={10} y1={72} x2={130} y2={72} stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
      {/* Barras */}
      {bars.map((v, i) => {
        const bh = (v / 100) * maxH
        const x = 14 + i * 17
        return (
          <rect key={i} x={x} y={72 - bh} width={10} height={bh} rx="2"
            fill={i === 3 ? 'rgba(167,139,250,0.55)' : 'rgba(167,139,250,0.2)'}
            stroke="rgba(167,139,250,0.4)" strokeWidth="0.8" />
        )
      })}
      {/* Línea de tendencia */}
      <polyline
        points={bars.map((v, i) => `${14 + i * 17 + 5},${72 - (v / 100) * maxH}`).join(' ')}
        fill="none" stroke="rgba(244,114,182,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Etiqueta */}
      <rect x={30} y={4} width={80} height={14} rx="2"
        fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
      <text x={70} y={14} textAnchor="middle" fontSize="6.5" fill="rgba(167,139,250,0.8)" fontFamily="monospace">
        22-Month Analysis
      </text>
      {/* WHO badge */}
      <circle cx={118} cy={82} r={8} fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
      <text x={118} y={86} textAnchor="middle" fontSize="6" fill="rgba(167,139,250,0.7)" fontFamily="monospace">WHO</text>
    </svg>
  )
}

function SvgGazaNCD() {
  const w = 140, h = 100
  const segments = [
    { pct: 0.35, color: 'rgba(167,139,250,0.6)',  label: 'CVD' },
    { pct: 0.25, color: 'rgba(244,114,182,0.55)', label: 'DM' },
    { pct: 0.22, color: 'rgba(251,191,36,0.5)',   label: 'HTN' },
    { pct: 0.18, color: 'rgba(167,139,250,0.25)', label: 'Otro' },
  ]
  const cx = 42, cy = 50, r = 32
  let angle = -Math.PI / 2
  const slices = segments.map(s => {
    const start = angle
    const end = angle + s.pct * 2 * Math.PI
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end)
    const large = s.pct > 0.5 ? 1 : 0
    angle = end
    return { ...s, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z` }
  })
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', opacity: 0.88 }}>
      {slices.map((s, i) => (
        <path key={i} d={s.d} fill={s.color} stroke="rgba(13,13,26,0.4)" strokeWidth="1" />
      ))}
      {/* Leyenda */}
      {segments.map((s, i) => (
        <g key={i}>
          <rect x={86} y={18 + i * 18} width={8} height={8} rx="1.5" fill={s.color} />
          <text x={98} y={26 + i * 18} fontSize="7" fill="rgba(237,233,255,0.65)" fontFamily="monospace">{s.label}</text>
        </g>
      ))}
      <text x={42} y={97} textAnchor="middle" fontSize="6" fill="rgba(167,139,250,0.5)" fontFamily="monospace">NCD · Gaza 2024–25</text>
    </svg>
  )
}

const projects = [
  {
    title: 'YGame',
    description: 'Aplicación web para jugar al juego de conectar 3 lados de un triángulo, con gestión de usuarios, rankings y diferentes modos de juego, ya sean contra diferentes bots o contra otro usuario local.',
    tags: ['React', 'Node.js', 'MongoDB', 'Rust'],
    github: 'https://github.com/Arquisoft/yovi_en3a',
    demo: '#',
    year: '2026',
    Svg: SvgYGame,
  },
  
  {
    title: 'Análisis estadístico — Trauma en Gaza',
    description: 'Validación del código Python para el análisis estadístico del proyecto "Longitudinal Analysis of Conflict-Related Traumatic Injuries in Gaza — A 22-Month Study of Emergency Medical Teams Data", liderado por la Universidad de Oviedo en colaboración con la OMS.',
    tags: ['Python', 'Estadística', 'OMS', 'Biomédico'],
    github: null,
    demo: '#',
    year: '2026',
    pending: true,
    Svg: SvgGazaTrauma,
  },
  {
    title: 'Análisis estadístico — ENT en Gaza',
    description: 'Validación del código Python para el análisis estadístico del proyecto "Non-Communicable Disease Care Delivered by Emergency Medical Teams during the Gaza Health Response in 2024–2025", en colaboración con la OMS.',
    tags: ['Python', 'Estadística', 'OMS', 'Biomédico'],
    github: null,
    demo: '#',
    year: '2026',
    pending: true,
    Svg: SvgGazaNCD,
  },
  {
    title: 'Compilador Python--',
    description: 'Compilador basado en Python, que convierte código Python-- a código máquina MAPL (stack machine). Soporta variables, funciones, estructuras de control y tipos básicos.',
    tags: ['Java', 'ANTLR', 'Compiladores'],
    github: 'https://github.com/ggarciacastro/DLP-Python--',
    demo: '#',
    year: '2026',
    Svg: SvgCompiler,
  },
  {
    title: 'Gestor de reservas',
    description: 'Aplicación web para gestionar diferentes reservas desarrollada con Node.js, Express y MongoDB. Permite a los usuarios crear, modificar y cancelar reservas, con autenticación y panel de administración.',
    tags: ['Node.js', 'Express', 'MongoDB', 'React', 'API REST'],
    github: 'https://github.com/ggarciacastro/sdi2526-entrega2-62',
    demo: '#',
    year: '2026',
    Svg: SvgReservas,
  },
  {
    title: 'MotoGP Desktop',
    description: 'Página web basada en estándares del W3C, accesible y responsive.',
    tags: ['HTML', 'JavaScript', 'PHP', 'MySQL', 'CSS'],
    github: 'https://github.com/ggarciacastro/SEW-MotoGP-Desktop',
    demo: '#',
    year: '2025',
    Svg: SvgMotoGP,
  }
]

const INITIAL_COUNT = 3

function ProjectCard({ project, index, visible, isMobile }) {
  const [hovered, setHovered] = useState(false)
  const [githubHovered, setGithubHovered] = useState(false)
  const [demoHovered, setDemoHovered] = useState(false)
  const { Svg } = project

  return (
    <div
      className="project-card-wrapper"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        maxHeight: visible ? '600px' : '0',
        overflow: visible ? 'visible' : 'hidden',
        pointerEvents: visible ? 'auto' : 'none',
        transition: `max-height 0.4s ease ${index * 0.08}s`,
      }}
    >
      {/* Año + punto — oculto en móvil */}
      {!isMobile && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', width: '80px',
          flexShrink: 0, paddingTop: '1.6rem',
        }}>
          <span style={{
            fontSize: '0.75rem', letterSpacing: '0.1em',
            color: 'var(--amber)', fontWeight: 500, marginBottom: '0.6rem',
          }}>
            {project.year}
          </span>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: hovered ? 'var(--accent)' : 'var(--bg-card)',
            border: '2px solid var(--accent)',
            transition: 'background 0.2s', flexShrink: 0, zIndex: 1,
          }} />
        </div>
      )}

      {/* Card */}
      <div
        onClick={() => project.github && window.open(project.github, '_blank', 'noreferrer')}
        style={{
          flex: 1,
          marginLeft: isMobile ? '0' : '2rem',
          marginBottom: '1.2rem',
          background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--accent-border)'}`,
          borderRadius: '4px', overflow: 'hidden',
          position: 'relative',
          display: 'flex', flexDirection: 'row',
          transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
          transform: hovered && !isMobile ? 'translateX(6px)' : 'translateX(0)',
          cursor: project.github ? 'pointer' : 'default',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Contenido */}
        <div style={{
          flex: 1, padding: '1.4rem 1.6rem',
          display: 'flex', flexDirection: 'column', gap: '0.8rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--fg-muted)' }}>
                0{index + 1}
              </span>
              {isMobile && (
                <span style={{
                  fontSize: '0.7rem', letterSpacing: '0.1em',
                  color: 'var(--amber)', fontWeight: 500,
                }}>
                  {project.year}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    color: githubHovered ? 'var(--accent)' : 'var(--fg-muted)',
                    fontSize: '0.82rem', transition: 'color 0.2s', textDecoration: 'none',
                  }}
                  onMouseEnter={() => setGithubHovered(true)}
                  onMouseLeave={() => setGithubHovered(false)}
                >
                  GitHub ↗
                </a>
              ) : project.pending && (
                <span style={{
                  fontSize: '0.72rem', letterSpacing: '0.08em',
                  color: 'var(--amber)', border: '1px solid var(--amber-border)',
                  borderRadius: '2px', padding: '0.15rem 0.5rem',
                }}>
                  Pendiente de publicación
                </span>
              )}
              {project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    color: demoHovered ? 'var(--accent)' : 'var(--fg-muted)',
                    fontSize: '0.82rem', transition: 'color 0.2s', textDecoration: 'none',
                  }}
                  onMouseEnter={() => setDemoHovered(true)}
                  onMouseLeave={() => setDemoHovered(false)}
                >
                  Demo ↗
                </a>
              )}
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', lineHeight: 1.2, color: 'var(--fg)' }}>
            {project.title}
          </h3>

          <p style={{ color: 'var(--fg-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '0.25rem 0.75rem',
                border: '1px solid var(--rose-border)',
                borderRadius: '2px', fontSize: '0.72rem',
                letterSpacing: '0.08em', color: 'var(--rose)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* SVG — panel completo en desktop, miniatura decorativa en móvil */}
        {!isMobile ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.2rem', borderLeft: '1px solid var(--accent-border)',
            background: 'rgba(0,0,0,0.1)', flexShrink: 0,
          }}>
            <Svg />
          </div>
        ) : (
          <div style={{
            position: 'absolute', bottom: '0.8rem', right: '0.8rem',
            opacity: 0.18, transform: 'scale(0.45)', transformOrigin: 'bottom right',
            pointerEvents: 'none',
          }}>
            <Svg />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Projects({ compact = false }) {
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef(null)
  const isMobile = useIsMobile()
  const hiddenCount = projects.length - INITIAL_COUNT

  useGSAP(() => {
    ScrollTrigger.batch('.project-card-wrapper', {
      onEnter: batch => gsap.from(batch, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power3.out',
      }),
      start: 'top 88%',
      once: true,
    })
  }, { scope: containerRef })

  return (
    <section
      id={compact ? undefined : 'projects'}
      style={compact ? {} : { padding: '8rem 2.5rem', background: 'var(--bg-dark)' }}
    >
      <div ref={containerRef} style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            color: 'var(--amber)', letterSpacing: '0.2em',
            textTransform: 'uppercase', fontSize: '0.8rem',
            marginBottom: '1rem', fontWeight: 500,
          }}>
            Portafolio
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, color: 'var(--fg)' }}>
            Proyectos destacados.
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {!isMobile && (
            <div style={{
              position: 'absolute', left: '84px', top: 0, bottom: 0,
              width: '1px', background: 'var(--accent-border)',
            }} />
          )}
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              visible={i < INITIAL_COUNT || expanded}
              isMobile={isMobile}
            />
          ))}
        </div>

        {hiddenCount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.75rem 2rem', background: 'transparent',
                border: '1px solid var(--accent-border)',
                borderRadius: '2px', color: 'var(--fg-muted)',
                fontSize: '0.85rem', letterSpacing: '0.08em',
                cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.borderColor = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--fg-muted)'
                e.currentTarget.style.borderColor = 'var(--accent-border)'
              }}
            >
              <span>{expanded ? 'Ver menos' : `Ver ${hiddenCount} proyecto${hiddenCount > 1 ? 's' : ''} más`}</span>
              <span style={{
                display: 'inline-block', transition: 'transform 0.3s ease',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
