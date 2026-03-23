"use client";
import { useTranslations } from "next-intl"
import styles from './Navbar.module.css';
import PhotoWeb from '../public/web.png';
import PhotoBack from '../public/back.svg';
import Image from "next/image";
import { useTheme } from '../components/hooks/useTheme';

const Contact = () => {
    const { theme } = useTheme();
    const services = useTranslations('ServicesPage');

    return (
        <div
            id="services-section"
            className={styles.PortfolioPage}
            style={{
                backgroundColor: theme.sectionBackground,
                color: theme.text
            }}
        >
            <h2
                className={styles.textForMedia}
                style={{
                    color: theme.accent,
                    borderRadius: '50px',
                    fontSize: '22px',
                    fontWeight: '600',
                    marginLeft:"7%",
                    marginTop: '100px',
                }}
            >
                {services('Services:text')}
            </h2>
            <p className={styles.dotss}></p>

            <div className={styles.DivFullServices}>
                {/* Первая карточка - Web Development */}
                <div className={styles.divServices}>
                    <div className={styles.divServicesInner}>
                        <div
                            className={styles.divServices_front}
                            style={{
                                backgroundColor: theme.cardBackground,
                                borderColor: theme.cardBorder
                            }}
                        >
                            <h3>{services('Services:WebDevelopment')}</h3>
                            <Image
                                src={PhotoWeb}
                                alt="web development"
                                width={300}
                                height={100}
                            />
                        </div>
                        <div
                            className={styles.divServices_back}
                            style={{
                                backgroundColor: theme.accent,
                            }}
                        >
                            <h3>{services('Services:WebDevelopment')}</h3>
                            <p>HTML5, CSS3, JavaScript, React, Next.js</p>
                            <p>ASP.NET Core MVC (Model-View-Controller)</p>
                        </div>
                    </div>
                </div>

                {/* Вторая карточка - Backend Development */}
                <div className={styles.divServices}>
                    <div className={styles.divServicesInner}>
                        <div
                            className={styles.divServices_front}
                            style={{
                                backgroundColor: theme.cardBackground,
                                borderColor: theme.cardBorder
                            }}
                        >
                            <h3>{services('Services:BackendDevelopment')}</h3>
                            <Image
                                src={PhotoBack}
                                alt="backend development"
                                width={300}
                                height={100}
                            />
                        </div>
                        <div
                            className={styles.divServices_back}
                            style={{
                                backgroundColor: theme.accent,
                            }}
                        >
                            <h3>{services('Services:BackendDevelopment')}</h3>
                            <p>C# / .NET, ASP.NET Core ,<br />
                                Entity Framework Core & Dapper ,<br />
                                Sql Server & PosgreSql</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;