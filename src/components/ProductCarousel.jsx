import React from 'react';
import HighFidelityPreview from './HighFidelityPreview.jsx';
import CopyButton from './CopyButton.jsx';

export default function ProductCarousel({ filteredSkills }) {
  return (
    <div className="element-carousel_container">
      {filteredSkills.map((skill) => (
        <div key={skill.id} className="element-carousel_item">
          {/* Part A: Design Image Preview */}
          <div className="element-card_part preview-part">
            <div className="card-visual-body">
              <HighFidelityPreview skill={skill} />
            </div>
          </div>

          {/* Part B: Skill Code Spec */}
          <div className="element-card_part skill-part">
            <div className="card-code-body">
              <pre><code>{skill.mdContent}</code></pre>
            </div>
            <CopyButton text={skill.mdContent} />
          </div>
        </div>
      ))}
    </div>
  );
}
