// hooks/useVisitorTracking.js
import { useEffect, useState } from 'react';

export const useVisitorTracking = () => {
  const [stats, setStats] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Функция для получения геоданных
  const getGeoData = async () => {
    try {
      // Используем бесплатный API для определения местоположения
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        country: data.country_name || 'Неизвестно',
        city: data.city || 'Неизвестно',
        region: data.region || 'Неизвестно'
      };
    } catch (error) {
      console.error('Ошибка получения геоданных:', error);
      return { country: 'Неизвестно', city: 'Неизвестно', region: 'Неизвестно' };
    }
  };

  // Функция для сохранения посетителя
  const saveVisitor = async (visitorData) => {
    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
      });
      
      if (response.ok) {
        const updatedStats = await response.json();
        setStats(updatedStats);
        localStorage.setItem('visitorStats', JSON.stringify(updatedStats));
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
        setStats(data);
        localStorage.setItem('visitorStats', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };

  // Отслеживание посетителя
  useEffect(() => {
    const trackVisitor = async () => {
      // Проверяем, был ли уже зарегистрирован посетитель в этой сессии
      const hasTracked = sessionStorage.getItem('visitorTracked');
      
      if (!hasTracked) {
        // Получаем геоданные
        const geoData = await getGeoData();
        
        // Данные о посетителе
        const visitorData = {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          referrer: document.referrer || 'прямой заход',
          page: window.location.pathname,
          country: geoData.country,
          city: geoData.city,
          region: geoData.region
        };
        
        // Сохраняем данные
        await saveVisitor(visitorData);
        
        // Отмечаем, что посетитель зарегистрирован
        sessionStorage.setItem('visitorTracked', 'true');
        
        // Сохраняем в localStorage для отображения
        localStorage.setItem('visitor_country', geoData.country);
        localStorage.setItem('visitor_city', geoData.city);
        localStorage.setItem('visitor_id', Date.now().toString());
      } else {
        // Просто загружаем статистику
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

  return { stats, isVisible, enableDevMode, disableDevMode };
};