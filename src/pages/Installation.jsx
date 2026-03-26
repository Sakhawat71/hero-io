import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getInstalledApps, uninstallApp } from '../data/storage.js';
import styles from './Installation.module.css';

function formatNum(n) {
    if (!n && n !== 0) return '—';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
    return String(n);
}

const SORT_OPTIONS = [
    { label: 'Sort By Size',      value: 'size' },
    { label: 'Sort By Name',      value: 'name' },
    { label: 'Sort By Rating',    value: 'rating' },
    { label: 'Sort By Downloads', value: 'downloads' },
];

export default function Installation() {
    const navigate = useNavigate();
    const [apps, setApps]         = useState([]);
    const [sortBy, setSortBy]     = useState('size');
    const [sortOpen, setSortOpen] = useState(false);
    const dropdownRef             = useRef(null);

    const loadApps = () => setApps(getInstalledApps());
    useEffect(() => { loadApps(); }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleUninstall = (app) => {
        uninstallApp(app.id);
        loadApps();
        toast(`${app.title} has been uninstalled.`, {
            icon: '🗑️',
            style: {
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 600,
                borderRadius: '12px',
                padding: '14px 20px',
                background: '#1e293b',
                color: '#fff',
            },
        });
    };

    const sortedApps = [...apps].sort((a, b) => {
        if (sortBy === 'name')      return a.title.localeCompare(b.title);
        if (sortBy === 'rating')    return (b.ratingAvg ?? 0) - (a.ratingAvg ?? 0);
        if (sortBy === 'downloads') return (b.downloads ?? 0) - (a.downloads ?? 0);
        if (sortBy === 'size')      return (b.size ?? 0) - (a.size ?? 0);
        return 0;
    });

    return (
        <div className={styles.page}>

            {/* ── Header ── */}
            <div className={styles.header}>
                <h1 className={styles.title}>Your Installed Apps</h1>
                <p className={styles.subtitle}>Explore All Trending Apps on the Market developed by us</p>
            </div>

            {/* ── Main Content ── */}
            <div className={styles.content}>

                {apps.length === 0 ? (
                    /* ── Empty State ── */
                    <div className={styles.empty}>
                        <div className={styles.emptyIconWrap}>
                            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2"/>
                                <path d="M8 21h8M12 17v4"/>
                            </svg>
                        </div>
                        <h3 className={styles.emptyTitle}>No Apps Installed Yet</h3>
                        <p className={styles.emptySub}>
                            Start exploring our collection of productive apps and install your favorites!
                        </p>
                        <button className={styles.exploreBtn} onClick={() => navigate('/apps')}>
                            Explore Apps
                        </button>
                    </div>
                ) : (
                    <>
                        {/* ── Toolbar ── */}
                        <div className={styles.toolbar}>
                            <span className={styles.appCount}>
                                {apps.length} App{apps.length !== 1 ? 's' : ''} Found
                            </span>

                            <div className={styles.sortWrap} ref={dropdownRef}>
                                <button
                                    className={styles.sortBtn}
                                    onClick={() => setSortOpen(o => !o)}
                                >
                                    {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                                    <svg
                                        width="13" height="13" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                        style={{ transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                                    >
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </button>

                                {sortOpen && (
                                    <div className={styles.dropdown}>
                                        {SORT_OPTIONS.map(opt => (
                                            <button
                                                key={opt.value}
                                                className={`${styles.dropdownItem} ${sortBy === opt.value ? styles.dropdownItemActive : ''}`}
                                                onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── App List ── */}
                        <div className={styles.list}>
                            {sortedApps.map((app) => (
                                <div key={app.id} className={styles.card}>

                                    {/* Icon */}
                                    <img
                                        src={app.image}
                                        alt={app.title}
                                        className={styles.cardImg}
                                        onError={e => { e.target.src = 'https://placehold.co/56x56/eef0fd/4f46e5?text=App'; }}
                                    />

                                    {/* Info */}
                                    <div className={styles.cardInfo}>
                                        <p className={styles.cardName}>{app.title}</p>
                                        {app.companyName && (
                                            <p className={styles.cardCompany}>{app.companyName}</p>
                                        )}
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaDownload}>
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                    <path d="M12 5v14M5 12l7 7 7-7"/>
                                                </svg>
                                                {formatNum(app.downloads)}
                                            </span>
                                            <span className={styles.metaRating}>
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                </svg>
                                                {app.ratingAvg ?? '—'}
                                            </span>
                                            {app.size != null && (
                                                <span className={styles.metaSize}>{app.size} MB</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Uninstall */}
                                    <button
                                        className={styles.uninstallBtn}
                                        onClick={() => handleUninstall(app)}
                                    >
                                        Uninstall
                                    </button>

                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { getInstalledApps, uninstallApp } from '../data/storage.js';
// import { formatNum } from '../components/UI.jsx';
// import styles from './Installation.module.css';

// export default function Installation() {
//     const navigate = useNavigate();
//     const [apps, setApps] = useState([]);

//     const loadApps = () => setApps(getInstalledApps());

//     useEffect(() => {
//         loadApps();
//     }, []);

//     const handleUninstall = (app) => {
//         uninstallApp(app.id);
//         loadApps();
//         toast(`🗑️ ${app.title} has been uninstalled.`, {
//             icon: '✓',
//             style: {
//                 fontFamily: 'Plus Jakarta Sans, sans-serif',
//                 fontWeight: 600,
//                 borderRadius: '12px',
//                 padding: '14px 20px',
//                 background: '#1e293b',
//                 color: '#fff',
//             },
//         });
//     };

//     return (
//         <div className={`${styles.page} page-enter`}>
//             {/* ── Header ── */}
//             <div className={styles.pageHeader}>
//                 <div>
//                     <h1 className={`${styles.title} fade-up`}>My Installations</h1>
//                     <p className={`${styles.sub} fade-up-1`}>
//                         {apps.length > 0
//                             ? `You have ${apps.length} app${apps.length > 1 ? 's' : ''} installed`
//                             : 'Your installed apps will appear here'}
//                     </p>
//                 </div>
//                 {apps.length > 0 && (
//                     <button className={styles.browseBtn} onClick={() => navigate('/apps')}>
//                         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M12 5v14M5 12l7 7 7-7" />
//                         </svg>
//                         Browse More
//                     </button>
//                 )}
//             </div>

//             {/* ── How to Install Section ── */}
//             <div className={`${styles.howTo} fade-up-2`}>
//                 <h2 className={styles.howToTitle}>
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                         <circle cx="12" cy="12" r="10" />
//                         <path d="M12 16v-4M12 8h.01" />
//                     </svg>
//                     How to Install Apps
//                 </h2>
//                 <div className={styles.steps}>
//                     {[
//                         { step: '01', title: 'Browse Apps', desc: 'Go to the Apps page and explore our collection of productive apps.' },
//                         { step: '02', title: 'View Details', desc: 'Click on any app to see its full details, ratings, and description.' },
//                         { step: '03', title: 'Install', desc: 'Click the Install button to save the app to your collection here.' },
//                     ].map(s => (
//                         <div key={s.step} className={styles.step}>
//                             <div className={styles.stepNum}>{s.step}</div>
//                             <div>
//                                 <p className={styles.stepTitle}>{s.title}</p>
//                                 <p className={styles.stepDesc}>{s.desc}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* ── Installed Apps ── */}
//             {apps.length === 0 ? (
//                 <div className={styles.empty}>
//                     <div className={styles.emptyIllustration}>
//                         <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
//                             <circle cx="40" cy="40" r="40" fill="#eef0fd" />
//                             <path d="M40 24v16M40 48v2" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
//                             <rect x="26" y="52" width="28" height="4" rx="2" fill="#c7d2fe" />
//                         </svg>
//                     </div>
//                     <h3 className={styles.emptyTitle}>No Apps Installed Yet</h3>
//                     <p className={styles.emptySub}>
//                         Start exploring our collection of productive apps and install your favorites!
//                     </p>
//                     <button className={styles.exploreBtn} onClick={() => navigate('/apps')}>
//                         Explore Apps
//                     </button>
//                 </div>
//             ) : (
//                 <>
//                     <div className={styles.grid}>
//                         {apps.map((app, i) => (
//                             <div
//                                 key={app.id}
//                                 className={`${styles.card} fade-up`}
//                                 style={{ animationDelay: `${i * 50}ms` }}
//                             >
//                                 <div className={styles.cardTop}>
//                                     <img
//                                         src={app.image}
//                                         alt={app.title}
//                                         className={styles.cardImg}
//                                         onError={e => { e.target.src = 'https://placehold.co/64x64/eef0fd/4f46e5?text=App'; }}
//                                     />
//                                     <div className={styles.cardInfo}>
//                                         <h3 className={styles.cardTitle}>{app.title}</h3>
//                                         <p className={styles.cardCompany}>{app.companyName}</p>
//                                         <div className={styles.cardMeta}>
//                                             <span className={styles.metaTag}>
//                                                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                                                     <path d="M12 5v14M5 12l7 7 7-7" />
//                                                 </svg>
//                                                 {formatNum(app.downloads)}
//                                             </span>
//                                             <span className={styles.metaTag}>
//                                                 <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
//                                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//                                                 </svg>
//                                                 {app.ratingAvg}
//                                             </span>
//                                             <span className={styles.installedBadge}>✓ Installed</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className={styles.cardActions}>
//                                     <button
//                                         className={styles.viewBtn}
//                                         onClick={() => navigate(`/apps/${app.id}`)}
//                                     >
//                                         View Details
//                                     </button>
//                                     <button
//                                         className={styles.uninstallBtn}
//                                         onClick={() => handleUninstall(app)}
//                                     >
//                                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                             <polyline points="3 6 5 6 21 6" />
//                                             <path d="M19 6l-1 14H6L5 6" />
//                                             <path d="M10 11v6M14 11v6" />
//                                             <path d="M9 6V4h6v2" />
//                                         </svg>
//                                         Uninstall
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }
