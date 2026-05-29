import React from 'react';

const agentDomains = {
  "antigravity": "antigravity.google",
  "devin": "cognition.ai",
  "copilot": "github.com",
  "cursor": "cursor.com",
  "replit agent": "replit.com",
  "codeium": "codeium.com",
  "supermaven": "supermaven.com",
  "magic.dev": "magic.dev",
  "sweep": "sweep.dev",
  "tabnine": "tabnine.com"
};

const AgentIcon = ({ agent }) => {
  const domain = agentDomains[agent];
  if (!domain) return null;
  
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  
  return (
    <img 
      src={faviconUrl} 
      alt={`${agent} favicon`} 
      className="agent-ticker-icon"
      onError={(e) => {
        // Fallback to a standard dot if image fails to load
        e.target.onerror = null;
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cpath d='M9 17l3-3-3-3M15 15h2'/%3E%3C/svg%3E";
      }}
    />
  );
};

export default function AgentTicker() {
  const agents = [
    "antigravity",
    "devin",
    "copilot",
    "cursor",
    "replit agent",
    "codeium",
    "supermaven",
    "magic.dev",
    "sweep",
    "tabnine"
  ];

  return (
    <div className="agent-ticker-container">
      <div className="agent-ticker-title">supported coding agents</div>
      <div className="agent-ticker-track-wrap">
        <div className="agent-ticker-track">
          <div className="agent-ticker-list">
            {agents.map((agent, index) => (
              <div key={index} className="agent-ticker-item">
                <AgentIcon agent={agent} />
                {agent}
              </div>
            ))}
          </div>
          <div className="agent-ticker-list">
            {agents.map((agent, index) => (
              <div key={`dup-${index}`} className="agent-ticker-item">
                <AgentIcon agent={agent} />
                {agent}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
