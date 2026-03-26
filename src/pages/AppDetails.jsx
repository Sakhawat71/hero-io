import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import toast from 'react-hot-toast';
import apps from '../data/apps.js';
import { installApp, isAppInstalled } from '../data/storage.js';
import { formatNum, StarRating, PageLoader } from '../components/UI.jsx';
import styles from './AppDetails.module.css';
import appNotFound from '../assets/App-Error.png'


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.chartTooltip}>
                <p className={styles.tooltipLabel}>{payload[0].payload.name}</p>
                <p className={styles.tooltipValue}>{payload[0].value.toLocaleString()} reviews</p>
            </div>
        );
    }
    return null;
};

export default function AppDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [installed, setInstalled] = useState(false);
    const app = apps.find(a => a.id === parseInt(id));

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const t = setTimeout(() => {
            setLoading(false);
            if (app) setInstalled(isAppInstalled(app.id));
        }, 600);
        return () => clearTimeout(t);
    }, [id]);

    const handleInstall = () => {
        if (installed || !app) return;
        installApp(app);
        setInstalled(true);
        toast.success(`✅ ${app.title} installed successfully!`, {
            style: {
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 600,
                borderRadius: '12px',
                padding: '14px 20px',
            },
        });
    };

    if (loading) return <PageLoader />;

    if (!app) {
        return (
            <div className={`${styles.notFound} page-enter`}>
                <img
                    src={appNotFound}
                    alt="Not found"
                    className={styles.notFoundImg}
                />
                <h2 className={styles.notFoundTitle}>OPPS!! APP NOT FOUND</h2>
                <p className={styles.notFoundSub}>
                    The App you are requesting is not found on our system. Please try another app.
                </p>
                <button className={styles.goBackBtn} onClick={() => navigate('/apps')}>
                    Go Back!
                </button>
            </div>
        );
    }

    const chartData = [...app.ratings].reverse();
    const maxCount = Math.max(...app.ratings.map(r => r.count));

    return (
        <div className={`${styles.page} page-enter`}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <button className={styles.backBtn} onClick={() => navigate('/apps')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M5 12l7-7M5 12l7 7" />
                    </svg>
                    Back to Apps
                </button>
                <span className={styles.breadSep}>/</span>
                <span className={styles.breadCurrent}>{app.title}</span>
            </div>

            {/* ── App Header ── */}
            <div className={styles.appHeader}>
                <div className={styles.appImageWrap}>
                    <img
                        src={app.image}
                        alt={app.title}
                        className={styles.appImage}
                        onError={e => { e.target.src = 'https://placehold.co/200x200/eef0fd/4f46e5?text=App'; }}
                    />
                </div>

                <div className={styles.appInfo}>
                    <h1 className={`${styles.appTitle} fade-up`}>{app.title}</h1>
                    <p className={`${styles.appCompany} fade-up-1`}>
                        Developed by{' '}
                        <a href="#" className={styles.companyLink}>{app.companyName}</a>
                    </p>

                    <hr className={styles.divider} />

                    <div className={`${styles.statsRow} fade-up-2`}>
                        <div className={styles.statItem}>
                            <div className={styles.statIconWrap} data-color="green">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                </svg>
                            </div>
                            <div>
                                <p className={styles.statLabel}>Downloads</p>
                                <p className={styles.statVal}>{formatNum(app.downloads)}</p>
                            </div>
                        </div>

                        <div className={styles.statItem}>
                            <div className={styles.statIconWrap} data-color="amber">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className={styles.statLabel}>Average Ratings</p>
                                <p className={styles.statVal}>{app.ratingAvg}</p>
                            </div>
                        </div>

                        <div className={styles.statItem}>
                            <div className={styles.statIconWrap} data-color="indigo">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className={styles.statLabel}>Total Reviews</p>
                                <p className={styles.statVal}>{formatNum(app.reviews)}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.installRow} fade-up-3`}>
                        <button
                            className={`${styles.installBtn} ${installed ? styles.installedBtn : ''}`}
                            onClick={handleInstall}
                            disabled={installed}
                        >
                            {installed ? (
                                <>
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    Installed
                                </>
                            ) : (
                                <>
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 5v14M5 12l7 7 7-7" />
                                    </svg>
                                    Install Now ({app.size} MB)
                                </>
                            )}
                        </button>
                        <div className={styles.starsWrap}>
                            <StarRating avg={app.ratingAvg} size={18} />
                            <span className={styles.starsLabel}>{app.ratingAvg} out of 5</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className={styles.sectionDivider} />

            {/* ── Ratings Chart ── */}
            <section className={`${styles.section} fade-up`}>
                <h2 className={styles.sectionTitle}>Ratings</h2>
                <div className={styles.chartWrap}>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 4, right: 20, bottom: 4, left: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eef0fd" />
                            <XAxis
                                type="number"
                                tick={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, fill: '#8492a6' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={54}
                                tick={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, fill: '#4a5568' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(79,70,229,0.05)' }} />
                            <Bar dataKey="count" radius={[0, 8, 8, 0]} maxBarSize={28}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={entry.count === maxCount ? '#f59e0b' : '#4f46e5'}
                                        opacity={entry.count === maxCount ? 1 : 0.65 - index * 0.05}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <hr className={styles.sectionDivider} />

            {/* ── Description ── */}
            <section className={`${styles.section} fade-up`}>
                <h2 className={styles.sectionTitle}>Description</h2>
                <div className={styles.description}>
                    {app.description.split('\n\n').map((para, i) => (
                        <p key={i} className={styles.para}>{para}</p>
                    ))}
                </div>
            </section>
        </div>
    );
}
