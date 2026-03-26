import styles from './UI.module.css';

// ─── Logo ───
export function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-label="Hero.io logo">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <polygon points="4,4 32,18 4,32" fill="url(#logo-g)" />
      <polygon points="10,8 32,18 10,30" fill="url(#logo-g)" opacity="0.55" />
      <polygon points="17,11 32,18 17,26" fill="url(#logo-g)" opacity="0.25" />
    </svg>
  );
}

// ─── Spinner ───
export function Spinner({ size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${size * 0.1}px solid #e4e8f0`,
        borderTop: `${size * 0.1}px solid #4f46e5`,
        borderRadius: '50%',
        animation: 'spin .7s linear infinite',
        flexShrink: 0,
      }}
    />
  );
}

// ─── Page Loader ───
export function PageLoader() {
  return (
    <div className={styles.pageLoader}>
      <Spinner size={48} />
    </div>
  );
}

// ─── Star Rating ───
export function StarRating({ avg, size = 14 }) {
  return (
    <span className={styles.stars}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <path
            fill={i <= Math.round(avg) ? '#f59e0b' : '#dde3ef'}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      ))}
    </span>
  );
}

// ─── Format helpers ───
export const formatNum = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return String(n);
};

// ─── Skeleton card ───
export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={`skeleton ${styles.skeletonImg}`} />
      <div className={styles.skeletonBody}>
        <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '70%' }} />
        <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '40%', height: 12 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <div className={`skeleton ${styles.skeletonTag}`} />
          <div className={`skeleton ${styles.skeletonTag}`} />
        </div>
      </div>
    </div>
  );
}
