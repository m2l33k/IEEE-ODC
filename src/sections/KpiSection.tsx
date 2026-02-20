import { useEffect, useRef, useState } from 'react'

type Kpi = {
  id: string
  label: string
  value: number
  suffix?: string
}

const kpis: Kpi[] = [
  { id: 'events', label: 'Supported events', value: 70, suffix: '+' },
  { id: 'participants', label: 'Participants reached', value: 3000, suffix: '+' },
  { id: 'branches', label: 'Student Branch', value: 51, suffix: '+' },
  { id: 'years', label: 'Years of collaboration', value: 3 }
]

function useCountUp(target: number, durationMs: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }

    let frameId: number
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      setValue(Math.round(target * progress))
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [target, durationMs, active])

  return value
}

type KpiCardProps = {
  kpi: Kpi
  active: boolean
}

function KpiCardDisplay({ kpi, active }: KpiCardProps) {
  const animatedValue = useCountUp(kpi.value, 3000, active)

  return (
    <article className="kpi-card">
      <div className="kpi-label">{kpi.label}</div>
      <div className="kpi-value">
        <span>{animatedValue}</span>
        {kpi.suffix ? <span className="kpi-suffix">{kpi.suffix}</span> : null}
      </div>
    </article>
  )
}

export function KpiSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="kpis" className="layout-section section-stats" ref={sectionRef}>
      <header className="section-header">
        <h2>KPIs and Impact</h2>
        <p>Key performance indicators summarizing the reach and outcomes of the partnership.</p>
      </header>
      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <KpiCardDisplay key={kpi.id} kpi={kpi} active={isActive} />
        ))}
      </div>
    </section>
  )
}
