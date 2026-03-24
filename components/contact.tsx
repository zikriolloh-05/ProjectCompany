"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import styles from './Navbar.module.css';
import PhotoWeb from '../public/web.png';
import PhotoBack from '../public/back.svg';
import Image from "next/image";
import { useTheme } from '../components/hooks/useTheme';

const Contact = () => {
    const { theme } = useTheme();
    const services = useTranslations('ServicesPage');
    // Создаем отдельные refs и состояния для анимаций
    const titleRef = useRef(null);
    const lineRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);

    const [titleVisible, setTitleVisible] = useState(false);
    const [lineVisible, setLineVisible] = useState(false);
    const [card1Visible, setCard1Visible] = useState(false);
    const [card2Visible, setCard2Visible] = useState(false);

    // Настройка Intersection Observer для каждого элемента
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Определяем какой элемент появился
                        if (entry.target === titleRef.current) {
                            setTitleVisible(true);
                        }
                        if (entry.target === lineRef.current) {
                            setLineVisible(true);
                        }
                        if (entry.target === card1Ref.current) {
                            setCard1Visible(true);
                        }
                        if (entry.target === card2Ref.current) {
                            setCard2Visible(true);
                        }
                        // Не отключаем observer, чтобы можно было повторно анимировать
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" } // Немного смещаем для лучшего эффекта
        );

        // Наблюдаем за каждым элементом
        if (titleRef.current) observer.observe(titleRef.current);
        if (lineRef.current) observer.observe(lineRef.current);
        if (card1Ref.current) observer.observe(card1Ref.current);
        if (card2Ref.current) observer.observe(card2Ref.current);

        return () => {
            if (titleRef.current) observer.unobserve(titleRef.current);
            if (lineRef.current) observer.unobserve(lineRef.current);
            if (card1Ref.current) observer.unobserve(card1Ref.current);
            if (card2Ref.current) observer.unobserve(card2Ref.current);
        };
    }, []);

    return (
        <div
            id="services-section"
            className={styles.PortfolioPage}
            style={{
                backgroundColor: theme.sectionBackground,
                color: theme.text,
                minHeight: "100vh",
                padding: "80px 20px"
            }}
        >
            {/* Заголовок */}
            <div ref={titleRef}>
                <h2
                    className={styles.textForMedia}
                    style={{
                        color: theme.accent,
                        borderRadius: '50px',
                        fontSize: '22px',
                        fontWeight: '600',
                        marginLeft: "7%",
                        marginTop: '50px',
                        marginBottom: '20px',
                        opacity: titleVisible ? 1 : 0,
                        transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {services('Services:text')}
                </h2>
            </div>

            {/* Декоративная линия */}
            <div ref={lineRef}>
                <p
                    className={styles.dotss}
                    style={{
                        opacity: lineVisible ? 1 : 0,
                        transform: lineVisible ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transformOrigin: 'left'
                    }}
                />
            </div>

            {/* Контейнер с карточками */}
            <div className={styles.DivFullServices}>
                {/* Первая карточка - Web Development */}
                <div
                    ref={card1Ref}
                    className={styles.divServices}
                    style={{
                        opacity: card1Visible ? 1 : 0,
                        transform: card1Visible ? 'translateY(0)' : 'translateY(50px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.1s'
                    }}
                >
                    <div className={styles.divServicesInner}>
                        <div
                            className={styles.divServices_front}
                            style={{
                                backgroundColor: theme.cardBackground,
                                borderColor: theme.cardBorder
                            }}
                        >
                            <h3 style={{ margin: 0, padding: '15px' }}>
                                {services('Services:WebDevelopment')}
                            </h3>
                            <Image
                                src={PhotoWeb}
                                alt="web development"
                                width={300}
                                height={200}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                        </div>
                        <div
                            className={styles.divServices_back}
                            style={{
                                backgroundColor: theme.accent,
                                color: 'white'
                            }}
                        >
                            <h3 style={{ color: 'white', marginBottom: '15px' }}>
                                {services('Services:WebDevelopment')}
                            </h3>
                            <p style={{ color: 'white', lineHeight: '1.6' }}>
                                HTML5, CSS3, JavaScript, React, Next.js
                                <br />
                                ASP.NET Core MVC (Model-View-Controller)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Вторая карточка - Backend Development */}
                <div
                    ref={card2Ref}
                    className={styles.divServices}
                    style={{
                        opacity: card2Visible ? 1 : 0,
                        transform: card2Visible ? 'translateY(0)' : 'translateY(50px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.3s'
                    }}
                >
                    <div className={styles.divServicesInner}>
                        <div
                            className={styles.divServices_front}
                            style={{
                                backgroundColor: theme.cardBackground,
                                borderColor: theme.cardBorder
                            }}
                        >
                            <h3 style={{ margin: 0, padding: '15px' }}>
                                {services('Services:BackendDevelopment')}
                            </h3>
                            <Image
                                src={PhotoBack}
                                alt="backend development"
                                width={300}
                                height={200}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                        </div>
                        <div
                            className={styles.divServices_back}
                            style={{
                                backgroundColor: theme.accent,
                                color: 'white'
                            }}
                        >
                            <h3 style={{ color: 'white', marginBottom: '15px' }}>
                                {services('Services:BackendDevelopment')}
                            </h3>
                            <p style={{ color: 'white', lineHeight: '1.6' }}>
                                C# / .NET, ASP.NET Core
                                <br />
                                Entity Framework Core & Dapper
                                <br />
                                Sql Server & PostgreSql
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;