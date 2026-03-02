import { useEffect, useRef, useState } from 'react'

type Kpi = { id: string; label: string; value: number; suffix?: string; icon: string; color: string; desc: string }

const kpis: Kpi[] = [
  { id: 'events', label: 'Supported Events', value: 70, suffix: '+', color: '#ff7900', desc: 'Workshops, hackathons & conferences backed by the partnership', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'participants', label: 'Participants Reached', value: 3000, suffix: '+', color: '#6c2bd9', desc: 'Engineers, students and professionals engaged across Tunisia', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'branches', label: 'Student Branches', value: 51, suffix: '+', color: '#10b981', desc: 'IEEE student branches supported through joint programming', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
  { id: 'years', label: 'Years of Collaboration', value: 3, color: '#3b82f6', desc: 'Long-term strategic commitment between IEEE Region 8 and ODC', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
]

function useCountUp(target: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) { setVal(0); return }
    let id: number
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [target, duration, active])
  return val
}

function KpiCard({ kpi, active }: { kpi: Kpi; active: boolean }) {
  const displayed = useCountUp(kpi.value, 2200, active)
  return (
    <article className="pub-kpi-card" style={{ '--kpi-color': kpi.color } as React.CSSProperties}>
      <div className="pub-kpi-icon" style={{ background: `${kpi.color}1a`, color: kpi.color }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d={kpi.icon} />
        </svg>
      </div>
      <div className="pub-kpi-value">
        {displayed.toLocaleString()}{kpi.suffix ?? ''}
      </div>
      <div className="pub-kpi-label">{kpi.label}</div>
      <p className="pub-kpi-desc">{kpi.desc}</p>
      <div className="pub-kpi-accent" style={{ background: kpi.color }} />
    </article>
  )
}

export function KpiSection() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver((e) => { if (e[0].isIntersecting) setActive(true) }, { threshold: 0.25 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <section id="kpis" className="pub-section pub-kpis" ref={ref}>
      <div className="pub-container">
        <div className="pub-section-label">Impact</div>
        <h2 className="pub-section-title">Partnership in Numbers</h2>
        <p className="pub-section-sub">
          Key performance indicators summarising the reach and outcomes of the IEEE&nbsp;/&nbsp;ODC collaboration.
        </p>
        <div className="pub-kpi-grid">
          {kpis.map((k) => <KpiCard key={k.id} kpi={k} active={active} />)}
        </div>
      </div>
    </section>
  )
}
