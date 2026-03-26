import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.content}>
        {/* Illustration */}
        <div className={styles.illustration}>
          <div className={styles.laptop}>
            <div className={styles.screen}>
              <span className={styles.errorCode}>404</span>
              <div className={styles.screenLine} />
              <div className={styles.screenLine} style={{ width: '60%' }} />
            </div>
            <div className={styles.base} />
          </div>
          {/* Decorative elements */}
          <div className={styles.gear} style={{ top: 20, right: 80 }}>⚙</div>
          <div className={styles.gear} style={{ top: 60, left: 60, fontSize: 22, animationDelay: '0.5s' }}>⚙</div>
          <div className={styles.dot} style={{ top: 30, left: 100 }} />
          <div className={styles.dot} style={{ top: 80, right: 60 }} />
          <div className={styles.plus} style={{ top: 10, left: 180 }}>+</div>
          <div className={styles.plus} style={{ top: 100, right: 40 }}>+</div>
          {/* Plug */}
          <div className={styles.plug}>●</div>
        </div>

        <h1 className={styles.title}>Oops, page not found!</h1>
        <p className={styles.sub}>The page you are looking for is not available.</p>

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={() => navigate('/')}>
            Go Home
          </button>
          <button className={styles.secondaryBtn} onClick={() => navigate(-1)}>
            Go Back!
          </button>
        </div>
      </div>
    </div>
  );
}
