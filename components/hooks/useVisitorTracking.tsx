// components/hooks/useVisitorTracking.ts
"use client";
import { useState, useEffect } from 'react';

interface VisitorData {
  totalVisitors: number;
  todayVisitors: number;
  onlineVisitors: number;
  lastVisit: string | null;
}

export const useVisitorTracking = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [onlineVisitors, setOnlineVisitors] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Генерация уникального ID посетителя
  const getVisitorId = () => {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  };

  // Получение IP адреса (опционально)
  const getVisitorIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Ошибка получения IP:', error);
      return null;
    }
  };

  // Сохранение информации о посещении
  const trackVisit = async () => {
    const visitorId = getVisitorId();
    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem('last_visit_date');
    
    // Получаем текущую статистику
    let stats = JSON.parse(localStorage.getItem('visitor_stats') || '{}');
    
    // Общее количество посетителей
    let total = parseInt(localStorage.getItem('total_visitors') || '0');
    
    // Если посетитель новый
    if (!lastVisitDate) {
      total++;
      localStorage.setItem('total_visitors', total.toString());
      localStorage.setItem('last_visit_date', today);
      setLastVisit(today);
    }
    
    // Обновляем статистику по дням
    if (!stats[today]) {
      stats[today] = { count: 0, visitors: [] };
    }
    
    // Если этот посетитель еще не был сегодня
    if (!stats[today].visitors.includes(visitorId)) {
      stats[today].visitors.push(visitorId);
      stats[today].count = stats[today].visitors.length;
      localStorage.setItem('visitor_stats', JSON.stringify(stats));
    }
    
    // Сегодняшние посетители
    const todayCount = stats[today]?.count || 0;
    
    // Обновляем состояния
    setTotalVisitors(total);
    setTodayVisitors(todayCount);
    
    // Онлайн посетители (за последние 5 минут)
    updateOnlineVisitors();
    
    setIsLoading(false);
  };

  // Обновление онлайн посетителей
  const updateOnlineVisitors = () => {
    const visitorId = getVisitorId();
    const now = Date.now();
    const onlineData = JSON.parse(localStorage.getItem('online_visitors') || '{}');
    
    // Обновляем время последней активности
    onlineData[visitorId] = now;
    
    // Удаляем неактивных посетителей (5 минут)
    const fiveMinutes = 5 * 60 * 1000;
    let onlineCount = 0;
    for (const id in onlineData) {
      if (now - onlineData[id] < fiveMinutes) {
        onlineCount++;
      } else {
        delete onlineData[id];
      }
    }
    
    localStorage.setItem('online_visitors', JSON.stringify(onlineData));
    setOnlineVisitors(onlineCount);
  };

  // Запуск отслеживания
  useEffect(() => {
    trackVisit();
    
    // Обновляем онлайн статус каждые 30 секунд
    const interval = setInterval(() => {
      updateOnlineVisitors();
    }, 30000);
    
    // Очистка при размонтировании
    return () => clearInterval(interval);
  }, []);

  // Настройка Intersection Observer для анимаций
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('visitor-stats');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Функции для разработки (можно удалить в продакшн)
  const enableDevMode = () => {
    console.log('Dev mode enabled');
  };
  
  const disableDevMode = () => {
    console.log('Dev mode disabled');
  };

  return {
    totalVisitors,
    todayVisitors,
    onlineVisitors,
    lastVisit,
    isVisible,
    isLoading,
    enableDevMode,
    disableDevMode
  };
};