"use client"

import Image from "next/image";
import Navbar from "../../components/navbar";
import Home from "../../components/home";
// import styles from '../../components/Navbar.module.css';
import Link from "next/link";
import { useTranslations } from "next-intl";
import AboutPage from "../../components/about";
import Portfolio from "../../components/portfolio";
import Contact from "../../components/contact";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Page = () => {
  const t = useTranslations("HomePage");
  const navigat = useTranslations('Navigation');
  const pathname = usePathname();

  useEffect(() => {
    // Проверяем, есть ли hash в URL при загрузке страницы
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Небольшая задержка для полной загрузки DOM
      }
    }
  }, [pathname]);

  return (
    <div className="">
      <div id="home-cection">
        <Home />
      </div>
      <div id="contact-section">
        <Contact />
      </div>
      <div id="portfolio-section">
        <Portfolio />
      </div>
      <div id="about-section">
        <AboutPage />
      </div>

    </div>
  );
}

export default Page;
