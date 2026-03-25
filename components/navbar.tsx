"use client"
import { useTranslations } from "next-intl";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "../public/logotip.svg";
import Image from "next/image";
import styles from './Navbar.module.css';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import flagRu from '../public/ru.svg';
import flagEn from '../public/en.svg';
import flagTg from '../public/tg.svg';
import PhotoDot from '../public/dot.svg';
import MuiButton from '@mui/material/Button';
import { MoonOutlined, SunOutlined, MenuOutlined } from '@ant-design/icons';
import { useTheme } from '../components/hooks/useTheme';
import '../components/styles/theme.css';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Drawer } from 'antd';

const Navbar = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme, theme, isLoading } = useTheme();
  const isProjectsPage = pathname.includes('/projects');

  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'ru', name: 'Русский', flag: flagRu },
    { code: 'en', name: 'English', flag: flagEn },
    { code: 'tg', name: 'Тоҷикӣ', flag: flagTg },
  ];

  const navigat = useTranslations('Navigation');
  const portfol = useTranslations('PortfolioPage');
  const Service = useTranslations('ServicesPage');
  const Projects = useTranslations('Projects');
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [size, setSize] = useState(256);

  const [scrolled, setScrolled] = useState(false);
  const [value, setValue] = useState(locale);
  const [activeSection, setActiveSection] = useState(() => {
    // Устанавливаем активную секцию в зависимости от страницы
    if (pathname.includes('/projects')) return 'projects';
    return 'home';
  });
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  const navRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLParagraphElement>(null);

  // Массив с ID секций и соответствующими ключами
  const navItems = [
    { id: 'home-cection', key: 'home', label: navigat('home'), isPage: false },
    { id: 'contact-section', key: 'services', label: Service('Services:text'), isPage: false },
    { id: 'portfolio-section', key: 'portfolio', label: portfol('Portfolio_text'), isPage: false },
    { id: 'about-section', key: 'about', label: navigat('about'), isPage: false },
    { id: 'projects', key: 'projects', label: Projects('projects:text'), isPage: true }
  ];

  // Обновление активной секции при скролле (только на главной странице)
  useEffect(() => {
    // Если мы на странице проектов, не отслеживаем скролл
    if (isProjectsPage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const item of navItems) {
        // Пропускаем пункт "Проекты" при скролле, так как это отдельная страница
        if (item.isPage) continue;

        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== item.key) {
              setActiveSection(item.key);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Вызываем сразу для установки начального состояния
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isProjectsPage]);

  // Обновление позиции подчеркивания при изменении активной секции
  useLayoutEffect(() => {
    const updateUnderlinePosition = () => {
      if (activeLinkRef.current && navRef.current) {
        const linkRect = activeLinkRef.current.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();

        setUnderlineStyle({
          width: linkRect.width,
          left: linkRect.left - navRect.left
        });
      }
    };

    // Увеличиваем задержку для страницы проектов
    const delay = isProjectsPage ? 50 : 0;
    const timeoutId = setTimeout(updateUnderlinePosition, delay);

    window.addEventListener('resize', updateUnderlinePosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateUnderlinePosition);
    };
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleNavigation = (sectionId: string, key: string, isPage: boolean) => {
    setOpen(false);

    // Если это отдельная страница (проекты)
    if (isPage) {
      setActiveSection(key);
      setTimeout(() => {
        router.push(`/${locale}/projects`);
      }, 50);
      return;
    }
    setActiveSection(key);

    // Проверяем, находимся ли мы на главной странице
    const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/${locale}/#${sectionId}`);
    }
  };

  const scrollToSection = (sectionId: string, key: string) => {
    setOpen(false);
    setActiveSection(key);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dotMenuItems: MenuProps['items'] = [
    { key: 'home', label: navigat('home'), onClick: () => scrollToSection('home-cection', 'home') },
    { key: 'services', label: Service('Services:text'), onClick: () => scrollToSection('contact-section', 'services') },
    { key: 'portfolio', label: portfol('Portfolio_text'), onClick: () => scrollToSection('portfolio-section', 'portfolio') },
    { key: 'about', label: navigat('about'), onClick: () => scrollToSection('about-section', 'about') },
    {
      key: 'projects', label: Projects('projects:text'), onClick: () => {
        setActiveSection('projects');
        setTimeout(() => {
          router.push(`/${locale}/projects`);
        }, 50);
      }
    }
  ];

  const languageMenuItems: MenuProps['items'] = languages
    .filter(lang => lang.code !== locale)
    .map((lang) => ({
      key: lang.code,
      label: (
        <div
          className={styles.dropdownItem}
          onClick={() => {
            setValue(lang.code);
            router.push(`/${lang.code}${pathname.replace(/^\/[a-z]{2}/, '')}`);
          }}
        >
          <span style={{ marginRight: '7px' }}>
            <Image src={lang.flag} alt={lang.name} width={20} height={15} />
          </span>
          <span>{lang.name}</span>
        </div>
      ),
    }));

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  if (isLoading) {
    return null;
  }

  const getNavbarBackground = () => {
    if (isProjectsPage) {
      return theme.navBackground;
    }
    return scrolled ? theme.navBackground : 'transparent';
  };

  const getTextColor = () => {
    if (isProjectsPage) {
      return theme.navText;
    }
    return scrolled ? theme.navText : 'white';
  };

  const getBoxShadow = () => {
    if (isProjectsPage) {
      return theme.shadow;
    }
    return scrolled ? theme.shadow : 'none';
  }


  return (
    <>
      <nav
        className={styles.nav}
        style={{
          backgroundColor: getNavbarBackground(),
          color: getTextColor(),
          boxShadow: getBoxShadow(),
          transition: 'all 0.3s ease',
        }}
      >
        <div className={styles.logoStyle}>
          <Image
            width={40}
            height={40}
            src={logo}
            style={{ borderRadius: "30%" }}
            alt=""
          />
          <h2 style={{ color: getTextColor() }} className={styles.navbar}>
            IT Support
          </h2>

          <div
            ref={navRef}
            className={styles.textNavigations}
            style={{
              color: getTextColor(),
              position: 'relative',
              display: 'flex',
              gap: '2rem'
            }}
          >
            {navItems.map((item) => (
              <p
                key={item.key}
                ref={activeSection === item.key ? activeLinkRef : null}
                style={{
                  color: getTextColor(),
                  cursor: 'pointer',
                  margin: 0,
                  // padding: '8px 0',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'all 0.3s ease'
                }}
                className={styles.textHome}
                onClick={() => handleNavigation(item.id, item.key, item.isPage)}
              >
                {item.label}
              </p>
            ))}

            {/* Анимированное подчеркивание */}
            <div
              className={styles.navUnderline}
              style={{
                width: `${underlineStyle.width}px`,
                transform: `translateX(${underlineStyle.left}px)`,
                backgroundColor: theme.accent || getTextColor(),
              }}
            />
          </div>
        </div>

        <div className={styles.languageContainer}>
          <MuiButton
            variant="text"
            startIcon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            sx={{
              cursor: "pointer",
              minWidth: '15px',
            }}
          />

          <Dropdown
            menu={{ items: languageMenuItems }}
            trigger={['hover']}
            placement="topRight"
          >
            <button className={styles.languageButton}>
              <Image
                src={currentLanguage?.flag}
                alt={currentLanguage?.name ?? 'language'}
                width={20}
                height={15}
                style={{ marginRight: '6px', borderRadius: "50%" }}
              />
              <span>{currentLanguage?.name}</span>
            </button>
          </Dropdown>

          <MenuOutlined
            className={styles.Bars}
            onClick={() => setOpen(true)}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: getTextColor(),
            }}
          />
        </div>
      </nav>
      <Drawer
        title="IT Support"
        placement={placement}
        onClose={() => setOpen(false)}
        open={open}
        closeIcon={false} // Отключаем стандартную иконку
        extra={
          <span
            onClick={() => setOpen(false)}
            style={{
              color: isDarkMode ? '#ffffff' : '#000000',
              fontSize: '20px',
              cursor: 'pointer',
              position: 'absolute',
              right: '16px',
              top: '16px'
            }}
          >
            ✕
          </span>
        } styles={{
          body: {
            padding: 0,
            margin: 0,
            backgroundColor: isDarkMode ? theme.background : '#ffffff',
            color: isDarkMode ? theme.navText : '#000000',
          },
          header: {
            backgroundColor: isDarkMode ? theme.background : '#ffffff',
            borderBottom: `1px solid ${isDarkMode ? '#333' : '#f0f0f0'}`,
            color: isDarkMode ? theme.navText : '#000000',
            // padding:0,
          },
          mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
          },
          content: {
            backgroundColor: isDarkMode ? theme.background : '#ffffff',
          },
          wrapper: {
            width: '100%',
          },
        }}
        classNames={{
          header: styles.drawerHeader,
          body: styles.drawerBody,
        }}
      >
        <div className={styles.mobileMenuContainer}>
          <div className={styles.mobileMenuItems}>
            {navItems.map((item) => {
              // Проверяем активность пункта
              const isActive = activeSection === item.key;

              return (
                <div
                  key={item.key}
                  className={`${styles.mobileMenuItem} ${isActive ? styles.active : ''}`}
                  onClick={() => handleNavigation(item.id, item.key, item.isPage)}
                  style={{
                    color: isActive
                      ? (isDarkMode ? theme.accent : '#1890ff')  // Активный пункт - синий или цвет акцента
                      : (isDarkMode ? theme.navText : '#000000'), // Неактивный пункт - белый на темной теме, черный на светлой
                    borderBottomColor: theme.accent,
                    fontWeight: isActive ? 600 : 400,
                    // width: '100%',
                    // display: 'block'
                  }}
                >
                  {item.label}
                </div>
              );
            })}

            <div className={styles.mobileMenuDivider} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;