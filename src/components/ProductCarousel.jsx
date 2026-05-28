import React, { useState } from 'react';
import HighFidelityPreview from './HighFidelityPreview.jsx';
import CopyButton from './CopyButton.jsx';

function CarouselItem({ skill }) {
  const [activeTab, setActiveTab] = useState('prompt'); // 'prompt' or 'skill'
  
  // Helper to split markdown content into Layer 1 (Prompt) and Layer 2 (Skill)
  const splitContent = (mdContent) => {
    if (!mdContent) return { prompt: '', skill: '' };
    
    // Find the start of Layer 2
    const layer2Index = mdContent.search(/##\s*LAYER\s*2/i);
    if (layer2Index === -1) {
      return { prompt: mdContent, skill: '' };
    }
    
    const promptPart = mdContent.substring(0, layer2Index).trim();
    const skillPart = mdContent.substring(layer2Index).trim();
    return { prompt: promptPart, skill: skillPart };
  };

  const { prompt, skill: skillCode } = splitContent(skill.mdContent);
  const activeContent = activeTab === 'prompt' ? prompt : (skillCode || 'no skill definition found.');

  return (
    <div className="element-carousel_item">
      {/* Part A: Design Image Preview */}
      <div className="element-card_part preview-part">
        <div className="card-visual-body">
          <HighFidelityPreview skill={skill} />
        </div>
      </div>

      {/* Part B: Skill Code Spec */}
      <div className="element-card_part skill-part">
        {/* Buttons at the top of the div */}
        <div className="skill-tab-header">
          <button 
            onClick={() => setActiveTab('prompt')} 
            className={`skill-tab-btn ${activeTab === 'prompt' ? 'active' : ''}`}
          >
            skill
          </button>
          <button 
            onClick={() => setActiveTab('skill')} 
            className={`skill-tab-btn ${activeTab === 'skill' ? 'active' : ''}`}
          >
            use case
          </button>
        </div>

        <div className="card-code-body">
          <pre><code>{activeContent}</code></pre>
        </div>
        <CopyButton text={activeContent} />
      </div>
    </div>
  );
}

export default function ProductCarousel({ filteredSkills }) {
  return (
    <div className="element-carousel_container">
      {filteredSkills.map((skill) => (
        <CarouselItem key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
