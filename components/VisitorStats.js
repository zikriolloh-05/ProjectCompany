// components/VisitorStats.js
"use client";
import { useVisitorTracking } from '../components/hooks/useVisitorTracking';
import styles from './VisitorStats.module.css';

const VisitorStats = () => {
  const { totalVisitors, isVisible, enableDevMode, disableDevMode } = useVisitorTracking();

  if (!isVisible) {
    return (
      <button
        onClick={enableDevMode}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '12px',
          opacity: 0.5
        }}
      >
        👁️ Показать статистику
      </button>
    );
  }

  return (
    <div className={styles.statsPanel}>
      <div className={styles.statsHeader}>
        <h3>📊 Всего посетителей: {totalVisitors}</h3>
        <button onClick={disableDevMode} className={styles.closeBtn}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default VisitorStats;