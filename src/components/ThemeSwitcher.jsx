import React from 'react';

export default function ThemeSwitcher({ selectedTheme, setSelectedTheme }) {
  return (
    <button 
      className="theme-switch-btn"
      onClick={() => setSelectedTheme(prev => prev === 'dark' ? 'light' : 'dark')}
    >
      canvas: {selectedTheme}
    </button>
  );
}
