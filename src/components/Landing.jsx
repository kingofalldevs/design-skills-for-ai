import React, { useState, useEffect } from 'react';
import { SKILLS_DATA } from '../data/skillsData.js';
import Navigation from './Navigation.jsx';
import Hero from './Hero.jsx';
import ProductCarousel from './ProductCarousel.jsx';
import CTA from './CTA.jsx';
import Footer from './Footer.jsx';
import WhyCare from './WhyCare.jsx';
import HowItWorks from './HowItWorks.jsx';
import ThemeSwitcher from './ThemeSwitcher.jsx';
import AuthForm from './AuthForm.jsx';
import { auth, onAuthStateChanged, signOut } from '../firebase';

export default function Landing() {
  const [activeCategory, setActiveCategory] = useState('landing');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const body = document.body;
    if (selectedTheme === 'light') {
      body.classList.add('theme-light');
    } else {
      body.classList.remove('theme-light');
    }
  }, [selectedTheme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("error logging out:", err);
    }
  };

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <div className="app-viewport">
      {/* 1. NAVIGATION */}
      <Navigation 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        user={user}
        onAuthClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. HERO ZONE */}
      <Hero 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* 3. PRODUCT CAROUSEL */}
        <ProductCarousel filteredSkills={filteredSkills} />
        
        {/* 4. CALL TO ACTION */}
        {!user && <CTA user={user} onAuthClick={() => setAuthModalOpen(true)} />}
        
        {/* why must you care */}
        {!user && <WhyCare />}
        
        {/* how it works */}
        {!user && <HowItWorks onAuthClick={() => setAuthModalOpen(true)} />}
        
        {/* 5. FOOTER */}
        {!user && <Footer />}
      </main>

      {/* Global Theme Switcher */}
      <ThemeSwitcher 
        selectedTheme={selectedTheme} 
        setSelectedTheme={setSelectedTheme} 
      />

      {/* Auth Modal Overlay */}
      {authModalOpen && (
        <AuthForm onClose={() => setAuthModalOpen(false)} />
      )}
    </div>
  );
}


