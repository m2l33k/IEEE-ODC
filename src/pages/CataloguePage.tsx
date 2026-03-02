import { useState } from 'react'

interface Formation {
    id: string
    title: string
    category: string
    level?: string
    pdfUrl?: string
}

const CATEGORIES = [
    'All',
    'Mobile Development',
    'Web Development',
    'Game Development',
    'Data & AI',
    'Other',
]

const FORMATIONS: Formation[] = [
    // Mobile
    {
        id: '101',
        title: 'Mobile Development with Android - Kotlin (Basic Level)',
        category: 'Mobile Development',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1WyGnV7DvMUrZ1Z6Qk2HIkIyLkcOhBG9J/edit?usp=sharing&ouid=111296696479010531197&rtpof=true&sd=true',
    },
    {
        id: '102',
        title: 'Mobile Development with Android - Kotlin (Advanced Level) — Seniority Roadmap',
        category: 'Mobile Development',
        level: 'Advanced',
        pdfUrl: 'https://docs.google.com/document/d/1hyC0sgni_cOTJv3Zc-zRrpqrVQogAdHv/edit?usp=sharing&ouid=111296696479010531197&rtpof=true&sd=true',
    },
    {
        id: '103',
        title: 'Mobile Development with Flutter (Basic Level) — Flutter 101',
        category: 'Mobile Development',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1rSLJBcFLjZYtcyRasJo0T_DD81hASqF4/edit?usp=sharing&ouid=103104064566215241629&rtpof=true&sd=true',
    },
    {
        id: '104',
        title: 'Kotlin Multi Platform',
        category: 'Mobile Development',
        level: 'Advanced',
        pdfUrl: 'https://docs.google.com/document/d/1H-sU-sDt1ld7BjW_gQyNy7Sygon5aMNC/edit?usp=sharing&ouid=111296696479010531197&rtpof=true&sd=true',
    },
    {
        id: '105',
        title: 'Mobile Development with iOS SwiftUI — iOS 101',
        category: 'Mobile Development',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1nAMsxkBqNzyAJcwZu0IK4aKJl0svFHUIwwgGpKvqDOA/edit?usp=sharing',
    },
    {
        id: '106',
        title: 'Mobile Development with React Native — React Native 101',
        category: 'Mobile Development',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1blS2kNdNp5vQpY5PEIEBIQaIyh8bPQKT-Q6ARwnRPOU/edit?usp=sharing',
    },

    // Web
    {
        id: '201',
        title: 'Fullstack Web Development with MERN Stack & Docker Deployment (Advanced)',
        category: 'Web Development',
        level: 'Advanced',
        pdfUrl: 'https://docs.google.com/document/d/18Qbcx6LWbR1RCxIihogmWvMOA31WHW_iyl5HCv4cJNI/edit?usp=sharing',
    },
    {
        id: '202',
        title: 'Fullstack Web Development with MERN Stack (Intermediate)',
        category: 'Web Development',
        level: 'Intermediate',
        pdfUrl: 'https://docs.google.com/document/d/1a7Rc4M0QEX-I7kwXkpszpFcHDfIrBxop/edit?usp=sharing&ouid=111296696479010531197&rtpof=true&sd=true',
    },
    {
        id: '203',
        title: 'Fullstack Web Development with MERN Stack (Basic)',
        category: 'Web Development',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1zlIC8t4KSiitTxr5VUWTMZnbOLuIrboK/edit?usp=sharing&ouid=111296696479010531197&rtpof=true&sd=true',
    },
    {
        id: '204',
        title: 'Web Development with React, Redux Toolkit & Tailwind',
        category: 'Web Development',
        level: 'Intermediate',
        pdfUrl: 'https://docs.google.com/document/d/12FOSpNch2pVyXdG1bMq9SRQ6WneOhrykFbapSpTlqyU/edit?usp=sharing',
    },
    {
        id: '205',
        title: 'Introduction to Web Development (HTML / CSS / JS) — v1',
        category: 'Web Development',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1MEW-Pp9QMom-FFDv2nfMogDZMSfaBcuY/edit?usp=sharing&ouid=111296696479010531197&rtpof=true&sd=true',
    },
    {
        id: '206',
        title: 'Introduction to Web Development (HTML / CSS / JS) — v2 (2 days)',
        category: 'Web Development',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1PaIOhhkgvXwmN2Y7OWpCx1okqHb7_DcxV2VuMphBrxc/edit?usp=sharing',
    },
    {
        id: '207',
        title: 'Introduction to Next.js with Prisma',
        category: 'Web Development',
        level: 'Advanced',
        pdfUrl: 'https://docs.google.com/document/d/1LYLzZi3vLHR4MrKrWfRPefqRCiP6F1FKapzdffuiKSo/edit?usp=sharing',
    },
    {
        id: '208',
        title: 'AI-Powered Interfaces with Next.js',
        category: 'Web Development',
        level: 'Advanced',
        pdfUrl: 'https://docs.google.com/document/d/1kAYaOU6JPBly5Jv0S9m2RgRewYAGHxyNBYxlApuC6SM/edit?usp=sharing',
    },

    // Game Dev
    {
        id: '301',
        title: 'Game Development with Unity / C#',
        category: 'Game Development',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1mCEHmRDyUF-Oxovpeu2vBsLvM8F6rOz2E8bw3N5AhNU/edit?usp=sharing',
    },
    {
        id: '302',
        title: 'AR Development with Vuforia & AR Foundation',
        category: 'Game Development',
        level: 'Advanced',
        pdfUrl: 'https://docs.google.com/document/d/1EqGuhQckHOqn803dgr-CG79XC-rVKqE6D3rxw8Bmj2c/edit?usp=sharing',
    },

    // Data & AI
    {
        id: '401',
        title: 'Artificial Intelligence — Fundamentals',
        category: 'Data & AI',
        level: 'Basic',
        pdfUrl: 'https://drive.google.com/file/d/1zqD_VVFPLU7y_0_BUb2sWiJsanru4HEm/view?usp=drive_link',
    },
    {
        id: '402',
        title: 'Data Science & Machine Learning',
        category: 'Data & AI',
        level: 'Intermediate',
        pdfUrl: 'https://drive.google.com/file/d/1jqUxquib1rj2E_eu60TY3nug3xYOnVSH/view?usp=drive_link',
    },
    {
        id: '403',
        title: 'Power BI',
        category: 'Data & AI',
        level: 'Intermediate',
        pdfUrl: 'https://drive.google.com/file/d/1yjI7UxPDJWM12Hdv80WPtXdKsBXthi4C/view?usp=drive_link',
    },
    {
        id: '404',
        title: 'Big Data with Hadoop & Spark',
        category: 'Data & AI',
        level: 'Advanced',
        pdfUrl: 'https://drive.google.com/file/d/1xGqM51dgI7haHiWYY-gjW1fqQa6nC_ZR/view?usp=drive_link',
    },

    // Other
    {
        id: '501',
        title: 'Python Programming — Fundamentals',
        category: 'Other',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1QhPhEbRAvqFhCRW6DgPHYKaL0rogQTLa/edit?usp=sharing&ouid=111296696479010531197&rtpof=true&sd=true',
    },
    {
        id: '502',
        title: 'Python — Advanced Level',
        category: 'Other',
        level: 'Advanced',
        pdfUrl: 'https://drive.google.com/file/d/1xUZ2Lpfk_5yl8OQv_fcHKXx1vGhaQDvT/view?usp=drive_link',
    },
    {
        id: '503',
        title: 'Introduction to Cloud Computing with AWS',
        category: 'Other',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1ExCN1w9DY33UtWxOJgSX7Q-Nk2YauPpa/edit?usp=sharing&ouid=111296696479010531197&rtpof=true&sd=true',
    },
    {
        id: '504',
        title: 'DevOps Essentials',
        category: 'Other',
        level: 'Intermediate',
        pdfUrl: 'https://drive.google.com/file/d/1RwEnbYf08QLo8sxJmiErYpDkmZuO6R_j/view?usp=drive_link',
    },
    {
        id: '505',
        title: 'SEO — Search Engine Optimization',
        category: 'Other',
        level: 'Basic',
        pdfUrl: 'https://docs.google.com/document/d/1RvOqjCC_eXRujQLMX25k4hseTeh81_e3hvD2gFDqbqE/edit?usp=sharing',
    },
    {
        id: '506',
        title: 'Project Management — Agile & SCRUM',
        category: 'Other',
        level: 'Intermediate',
        pdfUrl: 'https://drive.google.com/file/d/1MagQat8Wmkr2C0JxUlwl83obobfvZ4US/view?usp=drive_link',
    },
    {
        id: '507',
        title: 'UX/UI Design with Figma',
        category: 'Other',
        level: 'Basic',
        pdfUrl: 'https://drive.google.com/file/d/1ctKAJXQZt7qXCTxu2uWlGbgjB7C-HNFm/view?usp=drive_link',
    },
    {
        id: '510',
        title: 'Docker',
        category: 'Other',
        level: 'Intermediate',
        pdfUrl: 'https://docs.google.com/document/d/1sZfxqsC2LM6cMIQI0J2dLu1D0W0EqCam/edit?usp=sharing&ouid=115623358834997436384&rtpof=true&sd=true',
    },
    {
        id: '511',
        title: 'Cyber Security',
        category: 'Other',
        level: 'Advanced',
        pdfUrl: 'https://drive.google.com/file/d/1ASB5ZsaAIi6PKR9rwW1zqWB0dzfilb4C/view?usp=drive_link',
    },
    {
        id: '512',
        title: 'Personal Branding',
        category: 'Other',
        level: 'Basic',
        pdfUrl: 'https://drive.google.com/file/d/1aDkVq0YAYHlKGN4uluHKtZWvMHEi7R1o/view?usp=drive_link',
    },
]

const CATEGORY_META: Record<string, { color: string }> = {
    'Mobile Development': { color: '#3b82f6' },
    'Web Development': { color: '#10b981' },
    'Game Development': { color: '#a855f7' },
    'Data & AI': { color: '#f59e0b' },
    'Other': { color: '#64748b' },
}

const LEVEL_META: Record<string, { color: string; bg: string }> = {
    Basic: { color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
    Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    Advanced: { color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
}

export function CataloguePage() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [search, setSearch] = useState('')

    const filtered = FORMATIONS.filter((f) => {
        const matchCat = activeFilter === 'All' || f.category === activeFilter
        const q = search.toLowerCase()
        const matchSearch =
            !q ||
            f.title.toLowerCase().includes(q) ||
            f.id.includes(q) ||
            f.category.toLowerCase().includes(q)
        return matchCat && matchSearch
    })

    const grouped: Record<string, Formation[]> = {}
    for (const f of filtered) {
        if (!grouped[f.category]) grouped[f.category] = []
        grouped[f.category].push(f)
    }

    return (
        <div className="catalogue-page">
            {/* Page header */}
            <div className="catalogue-hero">
                <div className="catalogue-hero-inner">
                    <div className="catalogue-badge">Orange Digital Center · 2026</div>
                    <h1 className="catalogue-title">Training Catalogue</h1>
                    <p className="catalogue-subtitle">
                        {FORMATIONS.length} training programs across{' '}
                        {Object.keys(CATEGORY_META).length} technology domains
                    </p>

                    {/* Search */}
                    <div className="catalogue-search-wrap">
                        <svg className="catalogue-search-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            className="catalogue-search"
                            type="text"
                            placeholder="Search by title, code, or domain…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            id="catalogue-search"
                        />
                    </div>

                    {/* Filter chips */}
                    <div className="catalogue-filters">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                id={`cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                                className={`catalogue-chip${activeFilter === cat ? ' catalogue-chip--active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="catalogue-content">
                {Object.keys(grouped).length === 0 ? (
                    <div className="catalogue-empty">
                        <p>No training program found for &ldquo;{search}&rdquo;.</p>
                    </div>
                ) : (
                    Object.entries(grouped).map(([category, formations]) => {
                        const meta = CATEGORY_META[category] ?? { color: '#64748b' }
                        return (
                            <section key={category} className="catalogue-category">
                                <div className="catalogue-category-header">
                                    <span
                                        className="catalogue-category-dot"
                                        style={{ background: meta.color }}
                                    />
                                    <h2 className="catalogue-category-title" style={{ color: meta.color }}>
                                        {category}
                                    </h2>
                                    <span className="catalogue-category-count">
                                        {formations.length} course{formations.length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="catalogue-grid">
                                    {formations.map((f) => {
                                        const lvl = f.level ? LEVEL_META[f.level] : undefined
                                        return (
                                            <div
                                                key={f.id}
                                                className="catalogue-card"
                                                style={{ '--cat-color': meta.color } as React.CSSProperties}
                                            >
                                                <div className="catalogue-card-top">
                                                    <span className="catalogue-card-id">#{f.id}</span>
                                                    {lvl && f.level && (
                                                        <span
                                                            className="catalogue-card-level"
                                                            style={{ color: lvl.color, background: lvl.bg }}
                                                        >
                                                            {f.level}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="catalogue-card-title">{f.title}</p>
                                                <a
                                                    href={f.pdfUrl ?? '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="catalogue-card-btn"
                                                    style={
                                                        {
                                                            '--btn-color': meta.color,
                                                            '--btn-color-soft': `${meta.color}18`,
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    <svg viewBox="0 0 20 20" fill="currentColor" className="catalogue-card-btn-icon">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    View PDF
                                                </a>
                                                <div
                                                    className="catalogue-card-accent"
                                                    style={{ background: meta.color }}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        )
                    })
                )}
            </div>
        </div>
    )
}
