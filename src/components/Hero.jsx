import React, { useState, useEffect } from 'react';
import ceneeScreenshot from '../cenee_screenshot.jpg';
import daylightScreenshot from '../daylight_screenshot.png';
import chiselScreenshot from '../chisel_screenshot.png';
import samuelSniderScreenshot from '../samuel_snider_screenshot.png';
import sunriseScreenshot from '../sunrise_screenshot.png';
import floraScreenshot from '../flora_screenshot.png';

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function Hero({ activeCategory, setActiveCategory, user, onLogout, onAdminClick, showCategories = true }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const categories = ['all', 'landing', 'hero', 'nav', 'footer', 'pricing', 'faq'];
  const displayName = user ? (user.displayName || user.email.split('@')[0]) : '';

  const phrases = ["for your business", "for your agency", "for your company", "for yourself"];
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <>
      <section className="element-hero_container" style={{ position: 'relative' }}>
        {user && (
          <a href="/" className="dashboard-logo" onClick={(e) => e.preventDefault()}>
            indented
          </a>
        )}

        {user && (
          <button 
            className="user-profile-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open profile sidebar"
          >
            <UserIcon />
          </button>
        )}

        <h1 className="element-heading">Create a stunning website {text}<span style={{ opacity: text.length === phrases[loopNum % phrases.length].length && !isDeleting ? 1 : 0.5 }}>|</span></h1>
        <p className="element-subheading">created by humans for you agent</p>

        <div className="hero-prompt-box">
          <input 
            type="text" 
            className="hero-prompt-input" 
            placeholder="describe the interface you want to build..." 
          />
          <button className="hero-prompt-btn">
            build
          </button>
        </div>

        {/* Block 1: Cenee & Daylight */}
        <div className="hero-images-block">
          <div className="hero-image-card">
            <img src={ceneeScreenshot} alt="Cenee Landing Page" />
          </div>
          <div className="hero-image-card">
            <img src={daylightScreenshot} alt="Daylight Landing Page" />
          </div>
        </div>

        {/* Block 2: Flora & Chisel */}
        <div className="hero-images-block">
          <div className="hero-image-card">
            <img src={floraScreenshot} alt="Flora Website" />
          </div>
          <div className="hero-image-card">
            <img src={chiselScreenshot} alt="Chisel Website" />
          </div>
        </div>

        {/* Block 3: Samuel Snider & Sunrise */}
        <div className="hero-images-block">
          <div className="hero-image-card">
            <img src={samuelSniderScreenshot} alt="Samuel Snider Website" />
          </div>
          <div className="hero-image-card">
            <img src={sunriseScreenshot} alt="Sunrise Website" />
          </div>
        </div>

        {/* Attached horizontal navigation track */}
        {showCategories && (
          <div className="element-nav_track">
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`element-nav_track_links ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Sidebar Overlay and Drawer */}
      {user && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
              <div className="sidebar-avatar">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="sidebar-profile-info">
                <div className="sidebar-name">{displayName}</div>
                <div className="sidebar-email">{user.email}</div>
              </div>
            </div>
            
            <div className="sidebar-content">
              {/* Upgrade Segment */}
              <div className="sidebar-section upgrade-card">
                <h4>pro plan</h4>
                <p>unlock advanced styling engines, custom schemas, and high-fidelity integrations.</p>
                <button className="upgrade-btn" onClick={() => alert("Upgrade check: checkout simulation initialized.")}>
                  upgrade now
                </button>
              </div>

              {/* Navigation & Control Links */}
              <div className="sidebar-section">
                <h3>actions</h3>
                <div className="sidebar-links-list">
                  {onAdminClick && (
                    <button 
                      className="sidebar-link-item" 
                      onClick={() => {
                        setSidebarOpen(false);
                        onAdminClick();
                      }}
                    >
                      Admin Panel
                    </button>
                  )}
                  <button 
                    className="sidebar-link-item logout" 
                    onClick={() => {
                      setSidebarOpen(false);
                      onLogout();
                    }}
                  >
                    logout
                  </button>
                </div>
              </div>

              {/* Settings Segment */}
              <div className="sidebar-section">
                <h3>settings</h3>
                <div className="sidebar-settings-group">
                  <div className="settings-item">
                    <span>Aesthetic Guardrails</span>
                    <span className="badge">Active</span>
                  </div>
                  <div className="settings-item">
                    <span>Mock Database</span>
                    <span className="badge warning">Local Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
