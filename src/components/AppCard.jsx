import { useNavigate } from 'react-router-dom';
import { formatNum, StarRating } from './UI.jsx';
import styles from './AppCard.module.css';

export default function AppCard({ app, delay = 0 }) {
  const navigate = useNavigate();

  return (
    <article
      className={`${styles.card} fade-up`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/apps/${app.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/apps/${app.id}`)}
      aria-label={`View ${app.title}`}
    >
      <div className={styles.imgWrap}>
        <img
          src={app.image}
          alt={app.title}
          className={styles.img}
          loading="lazy"
          onError={e => { e.target.src = 'https://placehold.co/200x200/eef0fd/4f46e5?text=App'; }}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{app.title}</h3>
        <div className={styles.meta}>
          <span className={styles.stat}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            {formatNum(app.downloads)}
          </span>
          <span className={styles.rating}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {app.ratingAvg}
          </span>
        </div>
      </div>
    </article>
  );
}
