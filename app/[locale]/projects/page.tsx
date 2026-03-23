import { useTranslations } from "next-intl"
import styles from '../../../components/Navbar.module.css';
import Footer from "../../../components/footer";
import Portfolio from "../../../components/portfolio";
import { useTheme } from "@emotion/react";



const Projects = () => {
    const t = useTranslations("HomePage");
    const navigat = useTranslations('Navigation');
    const Projects = useTranslations('Projects');
    // const { theme } = useTheme(); // если используете тему

    return (
        <>
            <div id="about-section">
                <div>
                    <Portfolio customTitle={Projects('projects:text')} />
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projects;