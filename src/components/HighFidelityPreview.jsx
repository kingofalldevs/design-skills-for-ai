import React, { useState } from 'react';
import writingsScreenshot from '../writings_screenshot.png';
import firecrawlScreenshot from '../firecrawl_screenshot.png';

export default function HighFidelityPreview({ skill }) {
  const [activeFaq, setActiveFaq] = useState(null);

  if (skill.id === 'landing-writings') {
    return (
      <div className="preview-wrap" style={{ width: '100%', height: '100%' }}>
        <img 
          src={writingsScreenshot} 
          alt="Writings Landing Page Preview" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '4px',
            display: 'block'
          }} 
        />
      </div>
    );
  }
  if (skill.id === 'landing-firecrawl') {
    return (
      <div className="preview-wrap" style={{ width: '100%', height: '100%' }}>
        <img 
          src={firecrawlScreenshot} 
          alt="Firecrawl Landing Page Preview" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '4px',
            display: 'block'
          }} 
        />
      </div>
    );
  }
  if (skill.id === 'hero-monochrome') {
    return (
      <div className="preview-wrap stark-theme alignment-stretch">
        <div className="hifi-hero-monochrome">
          <h2>indented design</h2>
          <div className="hifi-hero-tracks">
            <span>track_01</span>
            <span>track_02</span>
            <span>track_03</span>
          </div>
        </div>
      </div>
    );
  }
  if (skill.id === 'hero-neon') {
    return (
      <div className="preview-wrap neon-theme alignment-stretch">
        <div className="hifi-hero-neon">
          <h2>cyberpunk.engine</h2>
          <div className="hifi-hero-tracks">
            <span>matrix_init</span>
            <span>agent_detect</span>
          </div>
        </div>
      </div>
    );
  }
  if (skill.id === 'nav-minimal') {
    return (
      <div className="preview-wrap stark-theme alignment-stretch">
        <div className="hifi-nav-minimal">
          <span className="logo">indented</span>
          <div className="links">
            <span>market</span>
            <span>docs</span>
          </div>
        </div>
      </div>
    );
  }
  if (skill.id === 'nav-cyberpunk') {
    return (
      <div className="preview-wrap neon-theme alignment-stretch">
        <div className="hifi-nav-minimal" style={{ borderBottomWidth: '2px' }}>
          <span className="logo" style={{ color: '#00ffcc', textShadow: '0 0 8px rgba(0, 255, 204, 0.4)', fontWeight: 'bold' }}>cyberpunk</span>
          <div className="links" style={{ color: '#ff0055' }}>
            <span>matrix</span>
            <span>nodes</span>
          </div>
        </div>
      </div>
    );
  }
  if (skill.id === 'footer-stark') {
    return (
      <div className="preview-wrap stark-theme alignment-stretch">
        <div className="hifi-footer-stark">
          <span>© 2026 indented inc.</span>
          <span className="status"><span className="dot"></span>ready</span>
        </div>
      </div>
    );
  }
  if (skill.id === 'pricing-monochrome') {
    return (
      <div className="preview-wrap stark-theme alignment-stretch">
        <div className="hifi-pricing-grid">
          <div className="price-card">
            <span>dev</span>
            <h3>$0</h3>
          </div>
          <div className="price-card active">
            <span>pro</span>
            <h3>$49</h3>
          </div>
        </div>
      </div>
    );
  }
  if (skill.id === 'pricing-cyberpunk') {
    return (
      <div className="preview-wrap neon-theme alignment-stretch">
        <div className="hifi-pricing-grid">
          <div className="price-card" style={{ borderColor: '#ff0055', color: '#00ffcc' }}>
            <span>dev</span>
            <h3 style={{ color: '#ffffff' }}>$0</h3>
          </div>
          <div className="price-card active" style={{ backgroundColor: '#ff0055', color: '#ffffff', borderColor: '#ff0055', boxShadow: '0 0 10px rgba(255, 0, 85, 0.4)' }}>
            <span>pro</span>
            <h3>$49</h3>
          </div>
        </div>
      </div>
    );
  }
  if (skill.id === 'faq-stark') {
    return (
      <div className="preview-wrap stark-theme alignment-stretch">
        <div className="hifi-faq-list">
          <div className="faq-item" onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
            <div className="faq-q">Q: execution_speed? <span>{activeFaq === 0 ? '−' : '+'}</span></div>
            {activeFaq === 0 && <div className="faq-a">A: Sub-50ms visual target matching.</div>}
          </div>
          <div className="faq-item" onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
            <div className="faq-q">Q: safety_guarantees? <span>{activeFaq === 1 ? '−' : '+'}</span></div>
            {activeFaq === 1 && <div className="faq-a">A: 100% compliant with strict monochrome guardrails.</div>}
          </div>
        </div>
      </div>
    );
  }
  if (skill.id === 'faq-glass') {
    return (
      <div className="preview-wrap neon-theme alignment-stretch">
        <div className="hifi-faq-glass">
          <div className="faq-item" onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
            <div className="faq-q">Q: glassmorphism_blur? <span>{activeFaq === 2 ? '−' : '+'}</span></div>
            {activeFaq === 2 && <div className="faq-a">A: 10px backdrop filter blur with transparent alpha levels.</div>}
          </div>
        </div>
      </div>
    );
  }
  if (skill.html) {
    const isLight = document.body.classList.contains('theme-light');
    const defaultColor = isLight ? '#000000' : '#ffffff';
    const srcDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              background: transparent;
              color: ${defaultColor};
              font-family: 'Geist Mono', monospace;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              overflow: hidden;
            }
            ${skill.css || ''}
          </style>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap">
        </head>
        <body>
          ${skill.html}
        </body>
      </html>
    `;
    return (
      <div className="preview-wrap" style={{ width: '100%', height: '100%' }}>
        <iframe
          srcDoc={srcDoc}
          title={`${skill.id} Live Preview`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'transparent',
            display: 'block'
          }}
          sandbox="allow-scripts"
        />
      </div>
    );
  }

  if (skill.imageUrl) {
    return (
      <div className="preview-wrap" style={{ width: '100%', height: '100%' }}>
        <img 
          src={skill.imageUrl} 
          alt={`${skill.id} Preview`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', display: 'block' }} 
        />
      </div>
    );
  }

  return <div className="preview-wrap">Unknown Component</div>;

}
