import React from 'react';

export default function Navigation({ activeCategory, setActiveCategory }) {
  return (
    <nav className="element-container">
      {/* Navigation items (left) */}
      <div className="left-group">
        <a 
          href="#docs" 
          className="element-nav_links"
          onClick={(e) => { 
            e.preventDefault(); 
            alert("Docs specification: Geist Mono, monochrome 1px borders, zero shadows."); 
          }}
        >
          Docs
        </a>
        <a 
          href="#pricing" 
          className={`element-nav_links ${activeCategory === 'pricing' ? 'active' : ''}`}
          onClick={(e) => { 
            e.preventDefault(); 
            setActiveCategory('pricing'); 
          }}
        >
          Pricing
        </a>
      </div>

      {/* Brand logo (center) */}
      <a href="/" className="element-indented logo-match" onClick={(e) => e.preventDefault()}>
        indented
      </a>

      {/* Action CTAs (right) */}
      <div className="right-group">
        <a href="#login" className="element-nav_links" onClick={(e) => e.preventDefault()}>
          Login
        </a>
        <a href="#companies" className="element-nav_links" onClick={(e) => e.preventDefault()}>
          for companies
        </a>
        <button 
          className="element-primary_action_btn"
          onClick={() => alert("Initializing WebMCP connection... Target: client-side registry.")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
