import { useNavigate } from 'react-router-dom';
import AppCard from '../components/AppCard.jsx';
import apps from '../data/apps.js';
import styles from './Home.module.css';

const STATS = [
  { label: 'Total Downloads', value: '29.6M', sub: '21% More Than Last Month' },
  { label: 'Total Reviews',   value: '906K',  sub: '46% More Than Last Month' },
  { label: 'Active Apps',     value: '132+',  sub: '31 More Will Launch'       },
];

function GooglePlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 512 512">
      <path fill="#34a853" d="M30.2 0L261 236.2 30.3 472C12.2 462 0 443 0 421V91C0 69 12.2 50 30.2 0z"/>
      <path fill="#fbbc04" d="M344.5 168.1L99.4 24.3 30.2 0l230.8 236.2 83.5-68.1z"/>
      <path fill="#ea4335" d="M344.5 343.9l-83.7-67.7L30.3 472l69.1-24.4 245.1-103.7z"/>
      <path fill="#4285f4" d="M512 256c0 32-17.6 60-44 75.8L344.5 343.9l-83.7-67.7L344.5 168.1l123.5 12.2C496 196 512 224 512 256z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.1-47.8-168.5-127.8c-53.8-72.2-90-171-90-265.5 0-113.4 37.5-204.9 106.3-274 46.1-46.1 109-73 174.9-73 67.5 0 116.4 42.1 154.6 42.1 36.5 0 93.3-44.4 168.4-44.4 26.7 0 109.9 3.2 161.3 65.5zm-84.3-140.3c31.7-37.5 54.3-89.8 54.3-142.1 0-7.7-.6-15.4-1.9-21.8-51.6 2-113 34.3-148.4 76-28.2 32.7-55.1 85-55.1 138 0 8.4 1.3 16.7 1.9 19.2 3.2.6 8.4 1.3 13.5 1.3 45.8 0 102.9-29.4 135.7-70.6z"/>
    </svg>
  );
}

function PhoneMockup() {
  return (
    <div className={styles.phoneMockup}>
      <div className={styles.phoneShell}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          <div className={styles.phoneHeader}>
            <span className={styles.phoneHeaderBack}>‹ All Courses</span>
            <div className={styles.phoneBadges}>
              <span className={styles.badgePro}>PRO</span>
              <span className={styles.badgeCount}>345 ❤</span>
            </div>
          </div>
          <div className={styles.phoneTabs}>
            <span className={styles.tabActive}>Regular Course</span>
            <span className={styles.tabInactive}>Video Course</span>
          </div>
          <p className={styles.phoneSubtitle}>Choose your Course</p>
          <div className={styles.phoneCourseCard}>
            <p className={styles.courseTitle}>Complete Web Development</p>
            <p className={styles.courseSub}>203 Lessons</p>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '32%' }} /></div>
            <span className={styles.progressLabel}>32%</span>
          </div>
          <div className={styles.phoneCourseCard2}>
            <p className={styles.courseTitle2}>Python Programming</p>
          </div>
        </div>
      </div>
      {/* Floating app icons */}
      {[
        { emoji: '⏱', x: -70, y: 80, color: '#06b6d4' },
        { emoji: '✅', x: -80, y: 200, color: '#4f46e5' },
        { emoji: '⏻',  x: -65, y: 320, color: '#10b981' },
        { emoji: '🕐', x: 70,  y: 80,  color: '#ef4444' },
        { emoji: '▦',  x: 75,  y: 210, color: '#4f46e5' },
        { emoji: '✕',  x: 65,  y: 340, color: '#06b6d4' },
      ].map((icon, i) => (
        <div
          key={i}
          className={styles.floatIcon}
          style={{
            left: icon.x > 0 ? `calc(50% + ${icon.x}px)` : `calc(50% + ${icon.x}px)`,
            top: icon.y,
            background: icon.color,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {icon.emoji}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const trending = apps.slice(0, 8);

  return (
    <div className={`${styles.page} page-enter`}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} fade-up`}>
            We Build<br />
            <span className={styles.heroAccent}>Productive</span>{' '}Apps
          </h1>
          <p className={`${styles.heroSub} fade-up-1`}>
            At HERO.IO, we craft innovative apps designed to make everyday life simpler,
            smarter, and more exciting. Our goal is to turn your ideas into digital
            experiences that truly make an impact.
          </p>
          <div className={`${styles.heroBtns} fade-up-2`}>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              className={styles.storeBtn}
            >
              <GooglePlayIcon />
              Google Play
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noreferrer"
              className={styles.storeBtn}
            >
              <AppleIcon />
              App Store
            </a>
          </div>
        </div>
        <div className={`${styles.heroPhone} fade-up-2`}>
          <PhoneMockup />
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className={styles.statsBanner}>
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
      </section>

      {/* ── Trending Apps ── */}
      <section className={styles.trending}>
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
      </section>
    </div>
  );
}
