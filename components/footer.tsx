"use client";
import { useTranslations } from "next-intl"
import styles from './Navbar.module.css';
import footerLogo from '../public/logotip.svg';
import { useEffect } from "react";
import { useTheme } from '../components/hooks/useTheme';

const Footer = () => {
    const { theme } = useTheme();
    const navigat = useTranslations('Navigation');
    const portfol = useTranslations('PortfolioPage');
    const footer_text = useTranslations("Footer_f");
    const services = useTranslations('ServicesPage');

    useEffect(() => {
        const allElements = document.querySelectorAll('[id]');
        console.log('All elements with IDs:', Array.from(allElements).map(el => el.id));
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log(`Section with id ${sectionId} not found`);
        }
    };

    return (
        <>
            <footer
                className={styles.footer}
                style={{
                    backgroundColor: theme.footerBackground,
                    color: theme.footerText
                }}
            >
                <div className={styles.footer_display_flex}>
                    <div className={styles.footer_forMedia}>
                        <img src={footerLogo} alt="" />
                        <h2 className={styles.navbar}>IT Support</h2>
                        <p>{footer_text("footer:phrase")}</p>
                    </div>

                    <div className={styles.footer_forMedia} style={{ fontSize: '18px' }}>
                        <h2 style={{ color: theme.accent }}
                            className={styles.textH2Minasosetyax}>{footer_text('footer_contact')}</h2>
                        <p className={styles.FoterMtop}>+992 909 050 409</p>
                        <p className={styles.FoterMtop}>t.me/Zikriolloh_05</p>
                        <p className={styles.FoterMtop}>sharipovzikriolloh28@gmail.com</p>
                    </div>

                    <div className={styles.footer_forMedia} style={{ fontSize: '18px' }}>
                        <h2 style={{ color: theme.accent }}
                            className={styles.textH2Minasosetyax}>{footer_text('footer_nashsakampaniya')}</h2>
                        <p
                            className={styles.FoterMtop}
                            onClick={() => scrollToSection('contact-section')}
                            style={{ cursor: 'pointer', color: theme.footerText }}
                        >
                            {services('Services:text')}
                        </p>
                        <p
                            className={styles.FoterMtop}
                            onClick={() => scrollToSection('portfolio-section')}
                            style={{ cursor: 'pointer', color: theme.footerText }}
                        >
                            {portfol('Portfolio_text')}
                        </p>
                        <p
                            className={styles.FoterMtop}
                            onClick={() => scrollToSection('about-section')}
                            style={{ cursor: 'pointer', color: theme.footerText }}
                        >
                            {navigat('about')}
                        </p>
                    </div>
                </div>

                <div className={styles.footerContainer}>
                    <div className={styles.footerTop}>
                        <img src={footerLogo} alt="" />
                        <h2 className={styles.navbar}>IT Support</h2>
                        <p>{footer_text("footer:phrase")}</p>
                    </div>

                    <div className={styles.footerRow}>
                        <div className={styles.footerColumn}>
                            <h2 className={styles.textH2Minasosetyax}>{footer_text('footer_contact')}</h2>
                            <p className={styles.FoterMtop}>+992 909 050 409</p>
                            <p className={styles.FoterMtop}>t.me/Zikriolloh_05</p>
                            <p className={styles.FoterMtop}>sharipovzikriolloh28@gmail.com</p>
                        </div>

                        <div className={styles.footerColumn}>
                            <h2 className={styles.textH2Minasosetyax}>{footer_text('footer_nashsakampaniya')}</h2>
                            <p
                                className={styles.FoterMtop}
                                onClick={() => scrollToSection('contact-section')}
                                style={{ cursor: 'pointer' }}
                            >
                                {services('Services:text')}
                            </p>
                            <p
                                className={styles.FoterMtop}
                                onClick={() => scrollToSection('portfolio-section')}
                                style={{ cursor: 'pointer' }}
                            >
                                {portfol('Portfolio_text')}
                            </p>
                            <p
                                className={styles.FoterMtop}
                                onClick={() => scrollToSection('about-section')}
                                style={{ cursor: 'pointer' }}
                            >
                                {navigat('about')}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            <h3 style={{
                color: theme.text,
                textAlign: 'center',
                backgroundColor: theme.footerBackground,
                margin: 0,
                padding: '20px'
            }}>
                {footer_text('footer:AllRightsReserved')}
            </h3>
        </>
    )
}

export default Footer;