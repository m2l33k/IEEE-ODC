import { VoucherStatusLookup } from '../vouchers/VoucherStatusLookup'

export function VoucherStatusPage() {
  return (
    <section className="layout-section">
      <h1>Voucher Claim Status</h1>
      <p className="page-intro">
        Check the latest status of a submitted voucher claim.
      </p>
      <VoucherStatusLookup />
    </section>
  )
}

