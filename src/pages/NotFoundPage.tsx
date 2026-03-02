export function NotFoundPage() {
    return (
        <>
            <head>
                <title>404 — Page Not Found | IEEE / ODC</title>
            </head>
            <div className="notfound-wrap">
                <div className="notfound-glow" />
                <div className="notfound-inner">
                    <div className="notfound-code">404</div>
                    <div className="notfound-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35M11 8v3M11 14h.01" />
                        </svg>
                    </div>
                    <h1 className="notfound-title">Page not found</h1>
                    <p className="notfound-sub">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="notfound-actions">
                        <a href="/" className="btn btn-primary notfound-btn">
                            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Back to Home
                        </a>
                        <a href="/catalogue" className="btn notfound-btn-ghost">
                            Browse Catalogue
                        </a>
                    </div>
                    <div className="notfound-links">
                        <a href="#kpis" className="notfound-link">Impact KPIs</a>
                        <span>·</span>
                        <a href="#faq" className="notfound-link">FAQ</a>
                        <span>·</span>
                        <a href="/vouchers/claim" className="notfound-link">Claim Voucher</a>
                    </div>
                </div>
            </div>
        </>
    )
}
