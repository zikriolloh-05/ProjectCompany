import { useTranslations } from "next-intl"
import styles from './Navbar.module.css';
import Portfolio from "./portfolio";



const Projects = () => {
    const t = useTranslations("HomePage");
    const navigat = useTranslations('Navigation');
    const vacanc = useTranslations('VacancyPagy');
    return (
        <>
            <div className={styles.vacancyPage}>
                {/* <h2 className={styles.h2_textVacancy}>{vacanc('vacancy_slova')}</h2> */}
                <div>
                    {/* <Portfolio/> */}
                    <div>
                         {/* <h3>{vacanc('vacancy.job')}</h3>
                         <p></p> */}
                    </div>
                </div>
            </div>


        </>
    )
}

export default Projects;