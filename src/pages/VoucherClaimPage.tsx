import { VoucherClaimForm } from '../vouchers/VoucherClaimForm'

export function VoucherClaimPage() {
  return (
    <section className="layout-section">
      <h1>Voucher Claim</h1>
      <p className="page-intro">
        Submit a voucher claim request related to IEEE / ODC supported activity.
      </p>
      <VoucherClaimForm />
    </section>
  )
}

