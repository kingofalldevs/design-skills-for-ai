import React from 'react';

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-content">
        <span className="copyright">© 2026 indented inc.</span>
        <div className="footer-links">
          <a 
            href="#docs" 
            onClick={(e) => { 
              e.preventDefault(); 
              alert("Docs specification: Geist Mono, monochrome 1px borders, zero shadows."); 
            }}
          >
            docs
          </a>
          <a href="#pricing" onClick={(e) => e.preventDefault()}>pricing</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()}>privacy</a>
        </div>
        <span className="status">
          <span className="dot"></span> system_status: ready
        </span>
      </div>
    </footer>
  );
}
