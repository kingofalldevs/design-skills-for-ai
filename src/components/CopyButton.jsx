import React, { useState } from 'react';

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button className="copy-btn" onClick={handleCopy}>
      {copied ? 'copied!' : 'copy skill'}
    </button>
  );
}
