import { useNavigate } from 'react-router-dom';
import AppCard from '../components/AppCard.jsx';
import apps from '../data/apps.js';
import styles from './Home.module.css';
import Banner from '../components/Banner.jsx';

const STATS = [
    { label: 'Total Downloads', value: '29.6M', sub: '21% More Than Last Month' },
    { label: 'Total Reviews', value: '906K', sub: '46% More Than Last Month' },
    { label: 'Active Apps', value: '132+', sub: '31 More Will Launch' },
];

export default function Home() {
    const navigate = useNavigate();
    const trending = apps.slice(0, 8);

    return (
        <div className={`${styles.page} page-enter`}>

            <Banner />

            {/* ── Stats Banner ── */}
            < section className={styles.statsBanner} >
                <h2 className={styles.statsTitle}>Trusted By Millions, Built For You</h2>
                <div className={styles.statsGrid}>
                    {STATS.map((s, i) => (
                        <div key={i} className={styles.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
                            <p className={styles.statLabel}>{s.label}</p>
                            <p className={styles.statValue}>{s.value}</p>
                            <p className={styles.statSub}>{s.sub}</p>
                        </div>
                    ))}
                </div>
            </ section>

            {/* ── Trending Apps ── */}
            < section className={styles.trending} >
                <div className={styles.sectionHead}>
                    <h2 className={styles.sectionTitle}>Trending Apps</h2>
                    <p className={styles.sectionSub}>Explore All Trending Apps on the Market developed by us</p>
                </div>
                <div className={styles.appsGrid}>
                    {trending.map((app, i) => (
                        <AppCard key={app.id} app={app} delay={i * 40} />
                    ))}
                </div>
                <div className={styles.showAllWrap}>
                    <button className={styles.showAllBtn} onClick={() => navigate('/apps')}>
                        Show All
                    </button>
                </div>
            </ section>
        </div >
    );
}
