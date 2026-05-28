import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, query } from '../firebase';
import Navigation from './Navigation.jsx';
import Hero from './Hero.jsx';
import ProductCarousel from './ProductCarousel.jsx';

export default function Dashboard({ user, onLogout, navigate }) {
  const [skillsData, setSkillsData] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
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

  useEffect(() => {
    if (!db) {
      setLoadingSkills(false);
      return;
    }
    const q = query(collection(db, 'skills'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skills = [];
      snapshot.forEach((doc) => {
        const id = doc.id;
        if (id !== 'landing-writings' && id !== 'landing-firecrawl') {
          skills.push({ id, ...doc.data() });
        }
      });
      setSkillsData(skills);
      setLoadingSkills(false);
    }, (error) => {
      console.error("Error listening to skills:", error);
      setLoadingSkills(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <div className="app-viewport">

      {/* 2. HERO ZONE */}
      <Hero 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        user={user}
        onLogout={onLogout}
        onAdminClick={() => navigate('/admin')}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {loadingSkills ? (
          <div className="auth-loading-screen" style={{ marginTop: '40px' }}>Loading registry from Firestore...</div>
        ) : skillsData.length === 0 ? (
           <div style={{ textAlign: 'center', marginTop: '40px' }}>
             <h3>No skills found in Firestore.</h3>
             <p>Use the Admin Panel to upload your first skill!</p>
           </div>
        ) : (
          /* 3. PRODUCT CAROUSEL */
          <ProductCarousel filteredSkills={filteredSkills} />
        )}
      </main>
    </div>
  );
}
