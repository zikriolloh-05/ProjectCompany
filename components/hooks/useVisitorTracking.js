// hooks/useVisitorTracking.js
import { useEffect, useState } from 'react';

export const useVisitorTracking = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Функция для сохранения посетителя
  const saveVisitor = async () => {
    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setTotalVisitors(data.totalVisitors);
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  // Функция для загрузки статистики
  const loadStats = async () => {
    try {
      const response = await fetch('/api/visitors');
      if (response.ok) {
        const data = await response.json();
        setTotalVisitors(data.totalVisitors);
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };

  // Отслеживание посетителя
  useEffect(() => {
    const trackVisitor = async () => {
      const hasTracked = sessionStorage.getItem('visitorTracked');

      if (!hasTracked) {
        await saveVisitor();
        sessionStorage.setItem('visitorTracked', 'true');
      } else {
        await loadStats();
      }
    };

    trackVisitor();

    // Обновляем статистику каждые 30 секунд
    const interval = setInterval(loadStats, 30000);

    return () => clearInterval(interval);
  }, []);

  // Проверка режима разработчика
  useEffect(() => {
    const isDevMode = localStorage.getItem('devMode') === 'true' ||
      window.location.search.includes('showStats=true');
    setIsVisible(isDevMode);
  }, []);

  const enableDevMode = () => {
    localStorage.setItem('devMode', 'true');
    window.location.reload();
  };

  const disableDevMode = () => {
    localStorage.removeItem('devMode');
    window.location.reload();
  };

  return { totalVisitors, isVisible, enableDevMode, disableDevMode };
};