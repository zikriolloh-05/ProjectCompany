// hooks/useTheme.ts
"use client";
import { useState, useEffect } from 'react';

// Интерфейс для цветов темы
export interface ThemeColors {
  background: string;
  text: string;
  textSecondary: string;
  navBackground: string;
  navText: string;
  navHover: string;
  buttonBackground: string;
  buttonText: string;
  buttonHover: string;
  cardBackground: string;
  cardBorder: string;
  sectionBackground: string;
  sectionAlternate: string;
  accent: string;
  accentHover: string;
  border: string;
  borderLight: string;
  shadow: string;
  success: string;
  warning: string;
  error: string;
  languageButtonBg: string;
  languageButtonText: string;
  dotIcon: string;
  footerBackground: string;
  footerText: string;
  modalBackground: string;
  modalText: string;
  inputBackground: string;
  inputBorder: string;
  backgroundGradient?: string;
}

// СВЕТЛАЯ ТЕМА
export const lightTheme: ThemeColors = {
  background: '#ffffff',
  text: '#000000',
  textSecondary: '#666666',
  navBackground: 'rgba(255, 255, 255, 0.95)',
  navText: '#000000',
  navHover: '#1890ff',
  buttonBackground: '#f0f0f0',
  buttonText: '#000000',
  buttonHover: '#e0e0e0',
  cardBackground: '#f9f9f9',
  cardBorder: '#e8e8e8',
  sectionBackground: '#f5f5f5',
  sectionAlternate: '#fafafa',
  accent: '#1890ff',
  accentHover: '#40a9ff',
  border: '#d9d9d9',
  borderLight: '#f0f0f0',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
  languageButtonBg: 'rgba(0, 0, 0, 0.1)',
  languageButtonText: '#000000',
  dotIcon: '#000000',
  footerBackground: '#e6f4ff',
  footerText: '#333333',
  modalBackground: '#ffffff',
  modalText: 'gray',
  inputBackground: '#ffffff',
  inputBorder: '#d9d9d9',
};

// ТЕМНАЯ ТЕМА
export const darkTheme: ThemeColors = {
  background: '#111a2c',
  backgroundGradient: 'linear-gradient(135deg, #111a2c 0%, #1a2a42 50%, #111a2c 100%)',
  text: 'white',
  textSecondary: '#a6a6a6',
  navBackground: '#111a2c',
  navText: '#ffffff',
  navHover: '#177ddc',
  buttonBackground: '#111a2c',
  buttonText: '#ffffff',
  buttonHover: '#2c2c2c',
  cardBackground: '#111a2c',
  cardBorder: '#303030',
  sectionBackground: '#111a2c',
  sectionAlternate: '#141414',
  accent: '#177ddc',
  accentHover: '#3c9ae8',
  border: '#303030',
  borderLight: '#262626',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.45)',
  success: '#49aa19',
  warning: '#d89614',
  error: '#dc4446',
  languageButtonBg: '#111a2c',
  languageButtonText: '#ffffff',
  dotIcon: '#ffffff',
  footerBackground: '#112545',
  footerText: '#ffffff',
  modalBackground: '#111a2c',
  modalText: 'rgba(255, 255, 255, 0.685)',
  inputBackground: '#1668dc',
  inputBorder: '#1668dc',
};

// Создаем глобальное событие для обновления темы
const THEME_CHANGE_EVENT = 'themeChange';

// Хук для использования темы
export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Функция для применения темы к body
  const applyThemeToBody = (dark: boolean) => {
    if (dark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  };

  // Загрузка темы при старте
  useEffect(() => {
    const loadTheme = () => {
      try {
        // Проверяем cookie
        const cookies = document.cookie.split('; ');
        const themeCookie = cookies.find(row => row.startsWith('theme='));
        const cookieValue = themeCookie ? themeCookie.split('=')[1] : null;

        // Проверяем localStorage
        const savedTheme = localStorage.getItem('theme');

        // Определяем тему
        let theme = 'light';

        if (cookieValue) {
          theme = cookieValue;
        } else if (savedTheme) {
          theme = savedTheme;
        } else {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = systemPrefersDark ? 'dark' : 'light';
        }

        const isDark = theme === 'dark';
        setIsDarkMode(isDark);
        applyThemeToBody(isDark);
      } catch (error) {
        console.error('Ошибка загрузки темы:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();

    // Слушаем изменения темы из других компонентов
    const handleThemeChange = (event: CustomEvent) => {
      const { isDarkMode: newIsDarkMode } = event.detail;
      setIsDarkMode(newIsDarkMode);
      applyThemeToBody(newIsDarkMode);
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    };
  }, []);

  // Сохранение темы
  useEffect(() => {
    if (!isLoading) {
      // Сохраняем в localStorage
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

      // Сохраняем в cookie
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 365);
      document.cookie = `theme=${isDarkMode ? 'dark' : 'light'}; path=/; expires=${expiryDate.toUTCString()}; max-age=31536000;`;

      // Применяем к body
      applyThemeToBody(isDarkMode);

      // Отправляем событие об изменении темы для других компонентов
      const event = new CustomEvent(THEME_CHANGE_EVENT, {
        detail: { isDarkMode }
      });
      window.dispatchEvent(event);
    }
  }, [isDarkMode, isLoading]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return {
    isDarkMode,
    theme: isDarkMode ? darkTheme : lightTheme,
    toggleTheme,
    isLoading
  };
};