import React from 'react';

export default function Hero({ activeCategory, setActiveCategory }) {
  const categories = ['all', 'landing', 'hero', 'nav', 'footer', 'pricing', 'faq'];

  return (
    <section className="element-hero_container">
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
  );
}
