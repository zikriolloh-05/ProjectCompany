// Страница "О нас"
import { useTranslations } from 'next-intl';
import styles from './Navbar.module.css';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../components/hooks/useTheme';
import { FaUsers, FaRocket, FaHeart, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const AboutPage = () => {
    const t = useTranslations("AboutPage");
    const about = useTranslations("Navigation");
    const textRef = useRef(null);
    const statsRef = useRef(null);
    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const statsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setStatsVisible(true);
                        statsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }
        if (statsRef.current) {
            statsObserver.observe(statsRef.current);
        }

        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
            if (statsRef.current) {
                statsObserver.unobserve(statsRef.current);
            }
        };
    }, []);

    // Статистика компании
    const stats = [
        { value: "10+", label: t('about_text10'), icon: FaRocket, color: "#ff6b6b" },
        { value: "10+", label: t('about_text11'), icon: FaUsers, color: "#4ecdc4" },
        { value: "100%", label: t('about_text12'), icon: FaHeart, color: "#ff9f4a" },
        { value: "24/7", label: t('about_text13'), icon: FaShieldAlt, color: "#667eea" }
    ];

    return (
        <div
            id="about-section"
            className={styles.about_page}
            style={{
                backgroundColor: theme.sectionBackground,
                color: theme.text,

            }}
        >

            <div className={styles.about_container}>
                {/* Заголовок секции */}
                <div style={{ marginBottom: '60px' }}>
                    <span style={{
                        fontSize: '22px',
                        color: theme.accent,
                        marginRight:'77%',
                    }}>
                        {about('about')}
                    </span>
                    <p style={{ marginRight: '100px' }} className={styles.anotherClass}/>
                        <br />
                        <span style={{ color: theme.accent, WebkitTextFillColor: theme.accent }}>{t('about_text2')}</span>
                        <p style={{
                            fontSize: '18px',
                            opacity: 0.7,
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            {t('about_text3')}
                        </p>
                </div>

                {/* Основной контент */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '30px',
                    alignItems: 'center',
                    maxWidth: '83.5%',
                    justifySelf: 'center'
                }}>
                    {/* Левая колонка - описание */}
                    <div>
                        <div style={{
                            background: theme.cardBackground,
                            borderRadius: '24px',
                            padding: '40px',
                            boxShadow: theme.shadow
                        }}>
                            <h3 style={{
                                fontSize: '28px',
                                fontWeight: '600',
                                marginBottom: '24px',
                                color: theme.accent
                            }}>
                                {t('about_text4')}
                            </h3>

                            <p ref={textRef} style={{
                                fontSize: '18px',
                                lineHeight: '1.7',
                                marginBottom: '32px',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}>
                                {t('about_text')}
                            </p>

                            {/* Преимущества */}
                            <div style={{ marginTop: '32px' }}>
                                <h4 style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    marginBottom: '20px'
                                }}>
                                    {t('about_text5')}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { text: t('about_text6') },  // Индивидуальный подход
                                        { text: t('about_text7') },  // Современные технологии
                                        { text: t('about_text8') },  // Гарантия качества
                                        { text: t('about_text9') }   // Поддержка 24/7
                                    ].map((item, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                                            transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                                        }}>
                                            <FaCheckCircle color={theme.accent} size={20} />
                                            <span style={{ fontSize: '16px' }}>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка - статистика */}
                    <div ref={statsRef}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '24px',
                            marginBottom: '32px'
                        }}>
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            background: theme.cardBackground,
                                            borderRadius: '20px',
                                            padding: '32px 24px',
                                            textAlign: 'center',
                                            boxShadow: theme.shadow,
                                            cursor: 'pointer',
                                            transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                                            opacity: statsVisible ? 1 : 0,
                                            transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '50%',
                                            background: `${stat.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 20px'
                                        }}>
                                            <Icon size={32} color={stat.color} />
                                        </div>
                                        <div style={{
                                            fontSize: '36px',
                                            fontWeight: '700',
                                            color: stat.color,
                                            marginBottom: '8px'
                                        }}>
                                            {stat.value}
                                        </div>
                                        <div style={{
                                            fontSize: '14px',
                                            opacity: 0.7
                                        }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Миссия компании */}
                        <div style={{
                            background: `linear-gradient(135deg, ${theme.accent}15 0%, ${theme.accent}05 100%)`,
                            borderRadius: '20px',
                            padding: '32px',
                            borderLeft: `4px solid ${theme.accent}`,
                            transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                            opacity: statsVisible ? 1 : 0,
                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
                        }}>
                            <p style={{
                                fontSize: '18px',
                                lineHeight: '1.6',
                                fontStyle: 'italic',
                                margin: 0
                            }}>
                                {t('about_text14')}
                            </p>
                            <div style={{
                                marginTop: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: theme.accent,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ color: 'white', fontSize: '20px' }}>🌟</span>
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{t('about_text15')}</div>
                                    <div style={{ fontSize: '12px', opacity: 0.6 }}>{t('about_text16')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;