import { type FormEvent, useState } from 'react'

type ClaimFormState = {
  name: string
  email: string
  memberId: string
  eventTitle: string
  eventDate: string
  eventLocation: string
  supportType: string
  justification: string
  files: File[]
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function VoucherClaimForm() {
  const [form, setForm] = useState<ClaimFormState>({
    name: '',
    email: '',
    memberId: '',
    eventTitle: '',
    eventDate: '',
    eventLocation: '',
    supportType: '',
    justification: '',
    files: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submittedId, setSubmittedId] = useState<string | null>(null)

  function handleChange<K extends keyof ClaimFormState>(key: K, value: ClaimFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function handleFileChange(files: FileList | null) {
    if (!files) return
    handleChange('files', Array.from(files))
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required.'
    if (!form.email.trim()) e.email = 'Email address is required.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.memberId.trim()) e.memberId = 'IEEE membership ID is required.'
    if (!form.eventTitle.trim()) e.eventTitle = 'Event title is required.'
    if (!form.eventDate.trim()) e.eventDate = 'Event date is required.'
    if (!form.supportType.trim()) e.supportType = 'Please select a support type.'
    if (!form.justification.trim()) e.justification = 'Please provide a justification.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!validate()) { setStatus('error'); return }
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setSubmittedId('IEEE-ODC-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'))
    }, 900)
  }

  /* ── Success screen ── */
  if (status === 'success' && submittedId) {
    return (
      <div className="vcf-success">
        <div className="vcf-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="vcf-success-title">Claim Submitted!</h2>
        <p className="vcf-success-body">
          Your voucher claim has been received and is under review.
        </p>
        <div className="vcf-success-ref">
          <span className="vcf-success-ref-label">Reference ID</span>
          <span className="vcf-success-ref-id">{submittedId}</span>
        </div>
        <p className="vcf-success-note">
          Keep this reference ID — you'll need it to check the status of your claim.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => { setStatus('idle'); setSubmittedId(null); setForm({ name: '', email: '', memberId: '', eventTitle: '', eventDate: '', eventLocation: '', supportType: '', justification: '', files: [] }) }}
        >
          Submit another claim
        </button>
      </div>
    )
  }

  return (
    <form className="vcf" onSubmit={handleSubmit} noValidate>

      {/* Error banner */}
      {status === 'error' && (
        <div className="vcf-banner vcf-banner--error" role="alert">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Please fix the highlighted fields before submitting.
        </div>
      )}

      {/* ── Section 1: Applicant ── */}
      <div className="vcf-section">
        <div className="vcf-section-header">
          <span className="vcf-section-num">01</span>
          <h2 className="vcf-section-title">Applicant Information</h2>
        </div>
        <div className="vcf-grid vcf-grid--3">
          <Field label="Full Name" required error={errors.name}>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`vcf-input${errors.name ? ' vcf-input--error' : ''}`}
              aria-invalid={Boolean(errors.name)}
            />
          </Field>
          <Field label="Email Address" required error={errors.email}>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`vcf-input${errors.email ? ' vcf-input--error' : ''}`}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>
          <Field label="IEEE Membership ID" required error={errors.memberId}>
            <input
              id="memberId"
              type="text"
              placeholder="e.g. 12345678"
              value={form.memberId}
              onChange={(e) => handleChange('memberId', e.target.value)}
              className={`vcf-input${errors.memberId ? ' vcf-input--error' : ''}`}
              aria-invalid={Boolean(errors.memberId)}
            />
          </Field>
        </div>
      </div>

      {/* ── Section 2: Event ── */}
      <div className="vcf-section">
        <div className="vcf-section-header">
          <span className="vcf-section-num">02</span>
          <h2 className="vcf-section-title">Event Information</h2>
        </div>
        <div className="vcf-grid vcf-grid--3">
          <Field label="Event Title" required error={errors.eventTitle} className="vcf-col-2">
            <input
              id="eventTitle"
              type="text"
              placeholder="Name of the event or activity"
              value={form.eventTitle}
              onChange={(e) => handleChange('eventTitle', e.target.value)}
              className={`vcf-input${errors.eventTitle ? ' vcf-input--error' : ''}`}
              aria-invalid={Boolean(errors.eventTitle)}
            />
          </Field>
          <Field label="Event Date" required error={errors.eventDate}>
            <input
              id="eventDate"
              type="date"
              value={form.eventDate}
              onChange={(e) => handleChange('eventDate', e.target.value)}
              className={`vcf-input${errors.eventDate ? ' vcf-input--error' : ''}`}
              aria-invalid={Boolean(errors.eventDate)}
            />
          </Field>
          <Field label="Location (optional)" className="vcf-col-full">
            <input
              id="eventLocation"
              type="text"
              placeholder="City, Country or Online"
              value={form.eventLocation}
              onChange={(e) => handleChange('eventLocation', e.target.value)}
              className="vcf-input"
            />
          </Field>
        </div>
      </div>

      {/* ── Section 3: Support ── */}
      <div className="vcf-section">
        <div className="vcf-section-header">
          <span className="vcf-section-num">03</span>
          <h2 className="vcf-section-title">Support & Documentation</h2>
        </div>
        <div className="vcf-grid vcf-grid--1">
          <Field label="Support Type" required error={errors.supportType}>
            <div className="vcf-select-wrap">
              <select
                id="supportType"
                value={form.supportType}
                onChange={(e) => handleChange('supportType', e.target.value)}
                className={`vcf-input vcf-select${errors.supportType ? ' vcf-input--error' : ''}`}
                aria-invalid={Boolean(errors.supportType)}
              >
                <option value="">Select a support type…</option>
                <option value="voucher">Voucher</option>
                <option value="financial">Financial contribution</option>
                <option value="in-kind">In-kind support</option>
              </select>
              <svg className="vcf-select-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </Field>
          <Field label="Justification" required error={errors.justification}>
            <textarea
              id="justification"
              rows={5}
              placeholder="Describe the activity, its impact, and why this support is needed…"
              value={form.justification}
              onChange={(e) => handleChange('justification', e.target.value)}
              className={`vcf-input vcf-textarea${errors.justification ? ' vcf-input--error' : ''}`}
              aria-invalid={Boolean(errors.justification)}
            />
          </Field>
          <Field label="Attachments (optional)">
            <label htmlFor="files" className="vcf-file-zone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="vcf-file-zone-text">
                {form.files.length > 0
                  ? `${form.files.length} file${form.files.length > 1 ? 's' : ''} selected`
                  : 'Click to upload or drag & drop'}
              </span>
              <span className="vcf-file-zone-hint">PDF, DOCX, PNG, JPG — up to 10 MB each</span>
              <input
                id="files"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </label>
            {form.files.length > 0 && (
              <ul className="vcf-file-list">
                {form.files.map((f) => (
                  <li key={f.name} className="vcf-file-item">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    {f.name}
                  </li>
                ))}
              </ul>
            )}
          </Field>
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="vcf-actions">
        <p className="vcf-actions-note">
          Fields marked <span className="vcf-required-mark">*</span> are required.
        </p>
        <button
          type="submit"
          id="submit-claim"
          className="btn btn-primary vcf-submit-btn"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <span className="vcf-spinner" />
              Submitting…
            </>
          ) : (
            <>
              Submit Claim
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>

    </form>
  )
}

/* ── Helper component ── */
function Field({
  label,
  required,
  error,
  children,
  className = '',
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`vcf-field ${className}`}>
      <label className="vcf-label">
        {label}
        {required && <span className="vcf-required-mark"> *</span>}
      </label>
      {children}
      {error && (
        <span className="vcf-field-error" role="alert">
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
            <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 011 1v3a1 1 0 11-2 0V5a1 1 0 011-1zm0 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  )
}
