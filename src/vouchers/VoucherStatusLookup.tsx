import { type FormEvent, useState } from 'react'

type VoucherStatus = 'submitted' | 'approved' | 'rejected'

type LookupResult = {
  claimId: string
  status: VoucherStatus
  lastUpdated: string
}

type LookupState = 'idle' | 'loading' | 'not-found' | 'loaded'

export function VoucherStatusLookup() {
  const [claimId, setClaimId] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<LookupState>('idle')
  const [result, setResult] = useState<LookupResult | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setState('loading')

    setTimeout(() => {
      if (!claimId.trim()) {
        setState('not-found')
        setResult(null)
        return
      }

      setState('loaded')
      setResult({
        claimId,
        status: 'submitted',
        lastUpdated: new Date().toISOString()
      })
    }, 500)
  }

  function renderStatusBadge(status: VoucherStatus) {
    if (status === 'approved') {
      return <span className="status-badge status-badge-success">Approved</span>
    }
    if (status === 'rejected') {
      return <span className="status-badge status-badge-error">Rejected</span>
    }
    return <span className="status-badge status-badge-neutral">Submitted</span>
  }

  return (
    <div className="status-lookup">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form-section">
          <legend>Lookup details</legend>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="lookup-claim-id">Claim ID</label>
              <input
                id="lookup-claim-id"
                type="text"
                value={claimId}
                onChange={(e) => setClaimId(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="lookup-email">Email</label>
              <input
                id="lookup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </fieldset>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={state === 'loading'}>
            {state === 'loading' ? 'Checking status...' : 'Check status'}
          </button>
        </div>
      </form>

      {state === 'not-found' && (
        <div className="banner banner-error" role="status">
          No claim found for the provided details.
        </div>
      )}

      {state === 'loaded' && result && (
        <section className="layout-section section-contained">
          <h2>Claim summary</h2>
          <div className="status-summary-card">
            <div className="status-summary-row">
              <span className="status-summary-label">Claim ID</span>
              <span className="status-summary-value">{result.claimId}</span>
            </div>
            <div className="status-summary-row">
              <span className="status-summary-label">Status</span>
              <span className="status-summary-value">{renderStatusBadge(result.status)}</span>
            </div>
            <div className="status-summary-row">
              <span className="status-summary-label">Last updated</span>
              <span className="status-summary-value">{result.lastUpdated}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
