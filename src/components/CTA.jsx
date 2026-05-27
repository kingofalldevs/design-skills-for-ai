import React from 'react';

export default function CTA() {
  const handleSignIn = () => {
    alert("Sign In clicked. Target: global user account session.");
  };

  return (
    <div className="cta-container">
      <h3 className="cta-text">Need more Designs?</h3>
      <button className="cta-btn" onClick={handleSignIn}>
        sign in
      </button>
    </div>
  );
}
