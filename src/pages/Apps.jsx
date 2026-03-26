import { useState, useEffect, useRef } from 'react';
import AppCard from '../components/AppCard.jsx';
import { SkeletonCard } from '../components/UI.jsx';
import apps from '../data/apps.js';
import styles from './Apps.module.css';

export default function Apps() {
  const [query, setQuery]       = useState('');
  const [sort, setSort]         = useState('default');
  const [loading, setLoading]   = useState(false);
  const [displayed, setDisplayed] = useState(apps);
  const timerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      let result = apps.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase())
      );
      if (sort === 'high-low') result = [...result].sort((a, b) => b.downloads - a.downloads);
      if (sort === 'low-high') result = [...result].sort((a, b) => a.downloads - b.downloads);
      setDisplayed(result);
      setLoading(false);
    }, 350);
    return () => clearTimeout(timerRef.current);
  }, [query, sort]);

  return (
    <div className={`${styles.page} page-enter`}>
      {/* ── Title ── */}
      <div className={styles.titleSection}>
        <h1 className={`${styles.title} fade-up`}>Our All Applications</h1>
        <p className={`${styles.sub} fade-up-1`}>
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        <span className={styles.count}>
          <strong>({displayed.length})</strong> Apps Found
        </span>
        <div className={styles.controlsRight}>
          {/* Sort */}
          <div className={styles.selectWrap}>
            <svg className={styles.selectIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 6h18M7 12h10M11 18h2"/>
            </svg>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className={styles.select}
            >
              <option value="default">Sort By: Default</option>
              <option value="high-low">Downloads: High → Low</option>
              <option value="low-high">Downloads: Low → High</option>
            </select>
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search Apps…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search apps"
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => setQuery('')} aria-label="Clear search">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : displayed.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No App Found</h3>
          <p className={styles.emptySub}>No apps match "<strong>{query}</strong>". Try a different search.</p>
          <button className={styles.clearSearchBtn} onClick={() => setQuery('')}>Clear Search</button>
        </div>
      ) : (
        <div className={styles.grid}>
          {displayed.map((app, i) => (
            <AppCard key={app.id} app={app} delay={i * 30} />
          ))}
        </div>
      )}
    </div>
  );
}
