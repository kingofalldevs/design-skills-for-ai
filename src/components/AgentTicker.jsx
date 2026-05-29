import React from 'react';

export default function AgentTicker() {
  const agents = [
    "Antigravity",
    "Devin",
    "Copilot",
    "Cursor",
    "Replit Agent",
    "Codeium",
    "Supermaven",
    "Magic.dev",
    "Sweep",
    "Tabnine"
  ];

  return (
    <div className="agent-ticker-container">
      <div className="agent-ticker-title">supported coding agents</div>
      <div className="agent-ticker-track-wrap">
        <div className="agent-ticker-track">
          <div className="agent-ticker-list">
            {agents.map((agent, index) => (
              <div key={index} className="agent-ticker-item">
                <span className="agent-dot"></span>
                {agent.toLowerCase()}
              </div>
            ))}
          </div>
          <div className="agent-ticker-list">
            {agents.map((agent, index) => (
              <div key={`dup-${index}`} className="agent-ticker-item">
                <span className="agent-dot"></span>
                {agent.toLowerCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
