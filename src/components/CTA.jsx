import React from 'react';

export default function CTA({ user, onAuthClick }) {
  return (
    <div className="cta-container">
      <h3 className="cta-text">Need more Designs?</h3>
      <p className="cta-subtext">discover designs made by humans for ai agents</p>
      {user ? (
        <span className="cta-status-text">you are logged in as {user.email}</span>
      ) : (
        <button className="cta-btn" onClick={onAuthClick}>
          sign in
        </button>
      )}
    </div>
  );
}

