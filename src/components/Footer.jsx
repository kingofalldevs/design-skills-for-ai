import React from 'react';

export default function Footer() {
  const handleAlert = (topic) => (e) => {
    e.preventDefault();
    alert(`${topic} specification: Geist Mono, monochrome 1px borders, zero shadows.`);
  };

  return (
    <footer className="global-footer">
      {/* 1. Top Section - Multi-column Layout */}
      <div className="footer-top-grid">
        <div className="footer-brand-col">
          <a href="/" className="footer-logo" onClick={(e) => e.preventDefault()}>
            indented.xyz
          </a>
          <p className="footer-tagline">
            Deterministic design systems for autonomous agents.
          </p>
          <div className="footer-socials">
            <a href="#github" onClick={handleAlert("GitHub")}>github</a>
            <span className="sep">/</span>
            <a href="#twitter" onClick={handleAlert("Twitter")}>twitter</a>
            <span className="sep">/</span>
            <a href="#discord" onClick={handleAlert("Discord")}>discord</a>
          </div>
        </div>

        <div className="footer-nav-col">
          <h4>Registry</h4>
          <a href="#all" onClick={(e) => e.preventDefault()}>all skills</a>
          <a href="#hero" onClick={(e) => e.preventDefault()}>hero templates</a>
          <a href="#nav" onClick={(e) => e.preventDefault()}>navigation layouts</a>
          <a href="#pricing" onClick={(e) => e.preventDefault()}>pricing cards</a>
        </div>

        <div className="footer-nav-col">
          <h4>Resources</h4>
          <a href="#docs" onClick={handleAlert("Docs")}>documentation</a>
          <a href="#cli" onClick={handleAlert("CLI")}>cli compiler</a>
          <a href="#schemas" onClick={handleAlert("Schemas")}>agent schemas</a>
          <a href="#status" onClick={handleAlert("Status")}>system status</a>
        </div>

        <div className="footer-nav-col">
          <h4>Company</h4>
          <a href="#about" onClick={(e) => e.preventDefault()}>about us</a>
          <a href="#pricing-plans" onClick={(e) => e.preventDefault()}>pricing plans</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()}>privacy policy</a>
          <a href="#terms" onClick={(e) => e.preventDefault()}>terms of service</a>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* 2. Bottom Section */}
      <div className="footer-bottom-row">
        <span className="copyright">© 2026 indented inc. all rights reserved.</span>
        
        <span className="footer-cli-hint">
          npx indented.xyz pull [skill_id]
        </span>

        <div className="status-group">
          <span className="version">v0.1.2</span>
          <span className="status">
            <span className="dot"></span> system_status: operational
          </span>
        </div>
      </div>

      {/* Huge brand wordmark at the bottom */}
      <div className="footer-huge-logo">
        indented
      </div>
    </footer>
  );
}
