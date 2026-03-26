import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from './Layout.module.css';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
