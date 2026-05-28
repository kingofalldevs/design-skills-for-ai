import React, { useState } from 'react';

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function Hero({ activeCategory, setActiveCategory, user, onLogout, onAdminClick }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const categories = ['all', 'landing', 'hero', 'nav', 'footer', 'pricing', 'faq'];
  const displayName = user ? (user.displayName || user.email.split('@')[0]) : '';

  return (
    <>
      <section className="element-hero_container" style={{ position: 'relative' }}>
        {user && (
          <button 
            className="user-profile-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open profile sidebar"
          >
            <UserIcon />
          </button>
        )}

        <h1 className="element-heading">Design Skills for Agents</h1>
        
        {/* Attached horizontal navigation track */}
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
