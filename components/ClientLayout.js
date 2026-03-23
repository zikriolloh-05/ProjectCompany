// components/ClientLayout.js
"use client";
import { useState, useEffect } from 'react';
import Preloader from './Preloader';
import Navbar from './navbar';
import Footer from './footer';

export default function ClientLayout({ children, locale }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasShownPreloader = sessionStorage.getItem('preloaderShown');
    
    if (hasShownPreloader) {
      setLoading(false);
    } else {
      sessionStorage.setItem('preloaderShown', 'true');
      
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000); 
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} duration={10000} />}
      <div style={{ 
        opacity: loading ? 0 : 1, 
        transition: 'opacity 2s ease',
        visibility: loading ? 'hidden' : 'visible'
      }}>
        <Navbar locale={locale} />
        {children}
        <Footer />
      </div>
    </>
  );
}