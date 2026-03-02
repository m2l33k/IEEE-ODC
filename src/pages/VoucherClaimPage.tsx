import { VoucherClaimForm } from '../vouchers/VoucherClaimForm'

export function VoucherClaimPage() {
  return (
    <div className="voucher-page">
      {/* Page hero */}
      <div className="voucher-hero">
        <div className="voucher-hero-inner">
          <div className="voucher-badge">IEEE / ODC Partnership</div>
          <h1 className="voucher-title">Claim Your Voucher</h1>
          <p className="voucher-subtitle">
            Submit a support request for IEEE / ODC–backed activities. Fill in the details
            below and we'll process your claim as soon as possible.
          </p>

          {/* Trust indicators */}
          <div className="voucher-trust">
            <div className="voucher-trust-item">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M10 1l2.928 5.928L19 7.854l-4.5 4.382 1.072 6.248L10 15.25l-5.572 3.234L5.5 12.236 1 7.854l6.072-.926L10 1z" clipRule="evenodd" />
              </svg>
              Secure submission
            </div>
            <div className="voucher-trust-item">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Processed within 5 business days
            </div>
            <div className="voucher-trust-item">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email confirmation sent
            </div>
          </div>
        </div>
      </div>

      {/* Form area */}
      <div className="voucher-body">
        <div className="voucher-form-wrapper">
          <VoucherClaimForm />
        </div>
      </div>
    </div>
  )
}
