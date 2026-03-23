// components/Preloader.js
"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../public/logotip.svg';
import styles from './Preloader.module.css';

const Preloader = ({ onComplete, duration = 5000 }) => { 
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const steps = 100;
    const intervalTime = duration / steps;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, intervalTime);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 300);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete, duration]);

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.preloaderContent}>
        <div className={styles.logoWrapper}>
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={120}
            className={styles.logo}
          />
          <div className={styles.logoGlow}></div>
        </div>

        <h1 className={styles.companyName}>
          <span className={styles.tech}>IT</span>
          <span className={styles.support}> Support</span>
        </h1>

        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className={styles.progressText}>{Math.floor(progress)}%</p>

        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;