import React, { useState, useEffect } from 'react';
import { SKILLS_DATA } from '../data/skillsData.js';
import Navigation from './Navigation.jsx';
import Hero from './Hero.jsx';
import ProductCarousel from './ProductCarousel.jsx';
import CTA from './CTA.jsx';
import Footer from './Footer.jsx';
import WhyCare from './WhyCare.jsx';
import ThemeSwitcher from './ThemeSwitcher.jsx';

export default function Landing() {
  const [activeCategory, setActiveCategory] = useState('landing');
  const [selectedTheme, setSelectedTheme] = useState('light');

  useEffect(() => {
    const body = document.body;
    if (selectedTheme === 'light') {
      body.classList.add('theme-light');
    } else {
      body.classList.remove('theme-light');
    }
  }, [selectedTheme]);

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <div className="app-viewport">
      {/* 1. NAVIGATION */}
      <Navigation 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
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
        <CTA />
        
        {/* why must you care */}
        <WhyCare />
        
        {/* 5. FOOTER */}
        <Footer />
      </main>

      {/* Global Theme Switcher */}
      <ThemeSwitcher 
        selectedTheme={selectedTheme} 
        setSelectedTheme={setSelectedTheme} 
      />
    </div>
  );
}

