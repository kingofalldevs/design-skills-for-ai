import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';

export default function AuthForm({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose(); // Close the modal upon success
    } catch (err) {
      // Clean up firebase error messages for better display
      let message = err.message;
      if (message.includes("auth/invalid-credential") || message.includes("auth/user-not-found")) {
        message = "invalid credentials. please check your email and password.";
      } else if (message.includes("auth/email-already-in-use")) {
        message = "this email is already registered.";
      } else if (message.includes("auth/weak-password")) {
        message = "weak password. must be at least 6 characters.";
      } else if (message.includes("auth/invalid-email")) {
        message = "please enter a valid email address.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="auth-modal">
        <div className="auth-header">
          <h3 className="auth-title">{isSignUp ? "create account" : "login"}</h3>
          <button className="auth-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-input-group">
            <label htmlFor="auth-email">email</label>
            <input 
              id="auth-email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              disabled={loading}
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="auth-password">password</label>
            <input 
              id="auth-password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={loading}
              className="auth-input"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "loading..." : (isSignUp ? "create account" : "login")}
          </button>
        </form>

        <div className="auth-toggle">
          {isSignUp ? (
            <span>
              already have an account?{" "}
              <button type="button" onClick={() => { setIsSignUp(false); setError(null); }} className="auth-toggle-link">
                login
              </button>
            </span>
          ) : (
            <span>
              don't have an account?{" "}
              <button type="button" onClick={() => { setIsSignUp(true); setError(null); }} className="auth-toggle-link">
                create one
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
