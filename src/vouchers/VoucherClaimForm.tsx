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
    files: []
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
    const list = Array.from(files)
    handleChange('files', list)
  }

  function validate() {
    const nextErrors: Record<string, string> = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.memberId.trim()) nextErrors.memberId = 'IEEE membership identifier is required.'
    if (!form.eventTitle.trim()) nextErrors.eventTitle = 'Event title is required.'
    if (!form.eventDate.trim()) nextErrors.eventDate = 'Event date is required.'
    if (!form.supportType.trim()) nextErrors.supportType = 'Support type is required.'
    if (!form.justification.trim()) nextErrors.justification = 'Justification is required.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!validate()) {
      setStatus('error')
      return
    }
    setStatus('submitting')

    setTimeout(() => {
      setStatus('success')
      setSubmittedId('IEEE-ODC-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'))
    }, 600)
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <div className="banner banner-error" role="alert">
          There are issues with the form. Review the highlighted fields.
        </div>
      )}
      {status === 'success' && submittedId && (
        <div className="banner banner-success" role="status">
          Voucher claim submitted. Reference ID: {submittedId}
        </div>
      )}

      <fieldset className="form-section">
        <legend>Applicant information</legend>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">
              Name <span className="field-required">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>
          <div className="form-field">
            <label htmlFor="email">
              Email <span className="field-required">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
          <div className="form-field">
            <label htmlFor="memberId">
              IEEE membership ID <span className="field-required">*</span>
            </label>
            <input
              id="memberId"
              type="text"
              value={form.memberId}
              onChange={(e) => handleChange('memberId', e.target.value)}
              aria-invalid={Boolean(errors.memberId)}
            />
            {errors.memberId && <div className="field-error">{errors.memberId}</div>}
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Event information</legend>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="eventTitle">
              Event title <span className="field-required">*</span>
            </label>
            <input
              id="eventTitle"
              type="text"
              value={form.eventTitle}
              onChange={(e) => handleChange('eventTitle', e.target.value)}
              aria-invalid={Boolean(errors.eventTitle)}
            />
            {errors.eventTitle && <div className="field-error">{errors.eventTitle}</div>}
          </div>
          <div className="form-field">
            <label htmlFor="eventDate">
              Event date <span className="field-required">*</span>
            </label>
            <input
              id="eventDate"
              type="date"
              value={form.eventDate}
              onChange={(e) => handleChange('eventDate', e.target.value)}
              aria-invalid={Boolean(errors.eventDate)}
            />
            {errors.eventDate && <div className="field-error">{errors.eventDate}</div>}
          </div>
          <div className="form-field">
            <label htmlFor="eventLocation">Location</label>
            <input
              id="eventLocation"
              type="text"
              value={form.eventLocation}
              onChange={(e) => handleChange('eventLocation', e.target.value)}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Support and documentation</legend>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="supportType">
              Support type <span className="field-required">*</span>
            </label>
            <select
              id="supportType"
              value={form.supportType}
              onChange={(e) => handleChange('supportType', e.target.value)}
              aria-invalid={Boolean(errors.supportType)}
            >
              <option value="">Select support type</option>
              <option value="voucher">Voucher</option>
              <option value="financial">Financial contribution</option>
              <option value="in-kind">In-kind support</option>
            </select>
            {errors.supportType && <div className="field-error">{errors.supportType}</div>}
          </div>
          <div className="form-field form-field-full">
            <label htmlFor="justification">
              Justification <span className="field-required">*</span>
            </label>
            <textarea
              id="justification"
              rows={4}
              value={form.justification}
              onChange={(e) => handleChange('justification', e.target.value)}
              aria-invalid={Boolean(errors.justification)}
            />
            {errors.justification && <div className="field-error">{errors.justification}</div>}
          </div>
          <div className="form-field form-field-full">
            <label htmlFor="files">Attachments</label>
            <div className="file-upload">
              <input
                id="files"
                type="file"
                multiple
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </div>
            {form.files.length > 0 && (
              <ul className="file-list">
                {form.files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </fieldset>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting...' : 'Submit claim'}
        </button>
      </div>
    </form>
  )
}
