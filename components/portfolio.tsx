"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import styles from '../components/Navbar.module.css';
import Link from "next/link";
import Image from "next/image";
import todoYelow from '../public/todoYelow.jpg';
import todoUser from '../public/userTable.png';
import userTable from '../public/userTable1.png';
import { useTheme } from '../components/hooks/useTheme';
import imagePortfolio from '../public/Screenshot 2026-03-21 124131.png';

interface PortfolioProps {
    customTitle?: any;
}

const Portfolio = ({ customTitle }: PortfolioProps) => {
    const { theme } = useTheme();
    const portfol = useTranslations('PortfolioPage');

    // Создаем refs для анимаций
    const titleRef = useRef(null);
    const lineRef = useRef(null);
    const firstRowRef = useRef(null);
    const secondRowRef = useRef(null);
    
    // Состояния для анимаций
    const [titleVisible, setTitleVisible] = useState(false);
    const [lineVisible, setLineVisible] = useState(false);
    const [firstRowVisible, setFirstRowVisible] = useState(false);
    const [secondRowVisible, setSecondRowVisible] = useState(false);

    // Массив с данными проектов для удобства
    const projects = [
        {
            id: 1,
            image: imagePortfolio,
            demoLink: "https://portfolio-zikriollohs-projects.vercel.app/",
            githubLink: "https://github.com/zikriolloh-05/Portfolio",
            alt: "Portfolio Project"
        },
        {
            id: 2,
            image: todoYelow,
            demoLink: "https://todo-list-six-alpha-20.vercel.app/",
            githubLink: "https://github.com/zikriolloh-05/TodoList",
            alt: "Todo List Project"
        },
        {
            id: 3,
            image: todoUser,
            demoLink: "https://table-user-three.vercel.app/",
            githubLink: "https://github.com/zikriolloh-05/Table-User",
            alt: "User Table Project"
        },
        {
            id: 4,
            image: userTable,
            demoLink: "https://table-user-2.vercel.app/",
            githubLink: "https://github.com/zikriolloh-05/Table-User-2",
            alt: "Table User Project 2"
        }
    ];

    // Настройка Intersection Observer для анимаций
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target === titleRef.current) {
                            setTitleVisible(true);
                        }
                        if (entry.target === lineRef.current) {
                            setLineVisible(true);
                        }
                        if (entry.target === firstRowRef.current) {
                            setFirstRowVisible(true);
                        }
                        if (entry.target === secondRowRef.current) {
                            setSecondRowVisible(true);
                        }
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        if (lineRef.current) observer.observe(lineRef.current);
        if (firstRowRef.current) observer.observe(firstRowRef.current);
        if (secondRowRef.current) observer.observe(secondRowRef.current);

        return () => {
            if (titleRef.current) observer.unobserve(titleRef.current);
            if (lineRef.current) observer.unobserve(lineRef.current);
            if (firstRowRef.current) observer.unobserve(firstRowRef.current);
            if (secondRowRef.current) observer.unobserve(secondRowRef.current);
        };
    }, []);

    return (
        <div
            id="portfolio-section"
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
                    style={{
                        display: 'inline-block',
                        borderRadius: '50px',
                        color: theme.accent,
                        fontSize: '22px',
                        fontWeight: '600',
                        marginTop: '50px',
                        marginLeft: "10%",
                        marginBottom: '0px',
                        opacity: titleVisible ? 1 : 0,
                        transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {customTitle || portfol('Portfolio_text')}
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

            {/* Первый ряд проектов */}
            <div 
                ref={firstRowRef}
                className={styles.Div_ful_portfolio}
                style={{
                    opacity: firstRowVisible ? 1 : 0,
                    transform: firstRowVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: '0.1s'
                }}
            >
                {projects.slice(0, 2).map((project, index) => (
                    <div 
                        key={project.id} 
                        className={styles.divImagePortfolio}
                        style={{
                            opacity: firstRowVisible ? 1 : 0,
                            transform: firstRowVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`
                        }}
                    >
                        <Image
                            src={project.image}
                            alt={project.alt}
                            width={700}
                            height={400}
                            style={{
                                borderRadius: '8px',
                                boxShadow: theme.shadow,
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover'
                            }}
                        />
                        <div>
                            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <button
                                    className={styles.style_Btn1Portfolio}
                                    style={{
                                        backgroundColor: theme.accent,
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "10px 20px",
                                        borderRadius: "6px",
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        transition: "all 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.backgroundColor = theme.accentHover;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.backgroundColor = theme.accent;
                                    }}
                                >
                                    {portfol("Portfolio:BtnDemo")}
                                </button>
                            </Link>
                            <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <button
                                    className={styles.style_Btn2Portfolio}
                                    style={{
                                        backgroundColor: theme.accent,
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "10px 20px",
                                        borderRadius: "6px",
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        transition: "all 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.backgroundColor = theme.accentHover;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.backgroundColor = theme.accent;
                                    }}
                                >
                                    {portfol("Portfolio:Github")}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Второй ряд проектов */}
            <div 
                ref={secondRowRef}
                className={styles.Div_ful_portfolio}
                style={{
                    opacity: secondRowVisible ? 1 : 0,
                    transform: secondRowVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: '0.3s'
                }}
            >
                {projects.slice(2, 4).map((project, index) => (
                    <div 
                        key={project.id} 
                        className={styles.divImagePortfolio}
                        style={{
                            opacity: secondRowVisible ? 1 : 0,
                            transform: secondRowVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.4 + index * 0.1}s`
                        }}
                    >
                        <Image
                            src={project.image}
                            alt={project.alt}
                            width={700}
                            height={400}
                            style={{
                                borderRadius: '8px',
                                boxShadow: theme.shadow,
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover'
                            }}
                        />
                        <div>
                            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <button
                                    className={styles.style_Btn1Portfolio}
                                    style={{
                                        backgroundColor: theme.accent,
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "10px 20px",
                                        borderRadius: "6px",
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        transition: "all 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.backgroundColor = theme.accentHover;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.backgroundColor = theme.accent;
                                    }}
                                >
                                    {portfol("Portfolio:BtnDemo")}
                                </button>
                            </Link>
                            <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <button
                                    className={styles.style_Btn2Portfolio}
                                    style={{
                                        backgroundColor: theme.accent,
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "10px 20px",
                                        borderRadius: "6px",
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        transition: "all 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.backgroundColor = theme.accentHover;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.backgroundColor = theme.accent;
                                    }}
                                >
                                    {portfol("Portfolio:Github")}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Portfolio;