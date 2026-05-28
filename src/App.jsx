import React, { useState, useEffect } from 'react';
import Landing from './components/Landing.jsx';
import Dashboard from './components/Dashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { auth, onAuthStateChanged, signOut } from './firebase';

function getPath() {
  return window.location.pathname;
}

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const handlePop = () => setPath(getPath());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('error logging out:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '13px' }}>
        authenticating...
      </div>
    );
  }

  // Route: /admin
  if (path === '/admin') {
    if (!user) {
      navigate('/');
      return null;
    }
    return <AdminDashboard user={user} onLogout={handleLogout} navigate={navigate} />;
  }

  // Route: /dashboard
  if (path === '/dashboard') {
    if (!user) {
      navigate('/');
      return null;
    }
    return <Dashboard user={user} onLogout={handleLogout} navigate={navigate} />;
  }

  // Route: / (Landing)
  // If logged in, redirect to /dashboard
  if (user && path === '/') {
    navigate('/dashboard');
    return null;
  }

  return <Landing navigate={navigate} />;
}
