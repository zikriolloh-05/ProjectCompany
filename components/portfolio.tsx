"use client";
import { useTranslations } from "next-intl"
import styles from '../components/Navbar.module.css';
import Link from "next/link";
import Image from "next/image";
import todoYelow from '../public/todoYelow.jpg';
import todoUser from '../public/userTable.png';
import userTable from '../public/userTable1.png';
import { useTheme } from '../components/hooks/useTheme';
import imagePortfolio from '../public/Screenshot 2026-03-21 124131.png'

interface PortfolioProps {
    customTitle?:any;
}

const Portfolio = ({ customTitle}: PortfolioProps ) => {
    const { theme } = useTheme();
    const portfol = useTranslations('PortfolioPage');

    // Массив с данными проектов для удобства
    const projects = [
        {
            id: 1,
            image: imagePortfolio,
            demoLink: "https://portfolio-zikriollohs-projects.vercel.app/",
            githubLink: "https://github.com/zikriolloh-05/Portfolio",
            alt: "User Table Project"
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
            alt: "User Table Project 2"
        },
        {
            id: 4,
            image: userTable,
            demoLink: "https://table-user-2.vercel.app/",
            githubLink: "https://github.com/zikriolloh-05/Table-User-2",
            alt: "Table User"
        }
    ];

    return (
        <div
            id="portfolio-section"
            className={styles.PortfolioPage}
            style={{
                backgroundColor: theme.sectionBackground,
                color: theme.text
            }}
        >
            <h2
            
                style={{
                    display: 'inline-block',
                    borderRadius: '50px',
                    color: theme.accent,
                    fontSize: '22px',
                    fontWeight: '600',
                    marginTop: '100px',
                    marginLeft: "7%",
                }}
            >
                {customTitle || portfol('Portfolio_text')}
            </h2>

            {/* Первый ряд проектов */}
            <p className={styles.dotss}></p>

            <div className={styles.Div_ful_portfolio}>
                {projects.slice(0, 2).map((project) => (
                    <div key={project.id} className={styles.divImagePortfolio}>
                        <Image
                            src={project.image}
                            alt={project.alt}
                            width={700}
                            height={400}
                            style={{
                                borderRadius: '8px',
                                boxShadow: theme.shadow
                            }}
                        />
                        <div>
                            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <button
                                    className={styles.style_Btn1Portfolio}
                                    style={{
                                        backgroundColor: theme.accent,
                                        // border:"none",
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
            <div className={styles.Div_ful_portfolio}>
                {projects.slice(2, 4).map((project) => (
                    <div key={project.id} className={styles.divImagePortfolio}>
                        <Image
                            src={project.image}
                            alt={project.alt}
                            width={700}
                            height={400}
                            style={{
                                borderRadius: '8px',
                                boxShadow: theme.shadow
                            }}
                        />
                        <div>
                            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <button
                                    className={styles.style_Btn1Portfolio}
                                    style={{
                                        backgroundColor: theme.accent,
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
    )
}

export default Portfolio;