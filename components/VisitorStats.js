// components/VisitorStats.tsx
"use client";
import { useVisitorTracking } from './hooks/useVisitorTracking';
import { useTheme } from './hooks/useTheme';
import { FaUsers, FaUserPlus, FaUserCheck, FaClock } from 'react-icons/fa';
import styles from './VisitorStats.module.css';

const VisitorStats = () => {
  const { totalVisitors, todayVisitors, onlineVisitors, lastVisit, isLoading, isVisible } = useVisitorTracking();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className={styles.statsContainer} style={{ background: theme.cardBackground }}>
        <div className={styles.loader}>Загрузка статистики...</div>
      </div>
    );
  }

  return (
    <div 
      id="visitor-stats"
      className={styles.statsContainer}
      style={{
        background: theme.cardBackground,
        border: `1px solid ${theme.border}`,
        boxShadow: theme.shadow,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <h3 style={{ color: theme.text, marginBottom: '20px' }}>
        📊 Статистика посещений
      </h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FaUsers className={styles.statIcon} style={{ color: theme.accent }} />
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{totalVisitors}</div>
            <div className={styles.statLabel}>Всего посетителей</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <FaUserPlus className={styles.statIcon} style={{ color: '#52c41a' }} />
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{todayVisitors}</div>
            <div className={styles.statLabel}>Сегодня</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <FaUserCheck className={styles.statIcon} style={{ color: '#1890ff' }} />
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{onlineVisitors}</div>
            <div className={styles.statLabel}>Сейчас онлайн</div>
          </div>
        </div>
        
        {lastVisit && (
          <div className={styles.statCard}>
            <FaClock className={styles.statIcon} style={{ color: '#faad14' }} />
            <div className={styles.statInfo}>
              <div className={styles.statValue}>
                {new Date(lastVisit).toLocaleDateString()}
              </div>
              <div className={styles.statLabel}>Последний визит</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorStats;