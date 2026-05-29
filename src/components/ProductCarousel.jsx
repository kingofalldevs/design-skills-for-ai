import React from 'react';
import HighFidelityPreview from './HighFidelityPreview.jsx';

function CarouselItem({ skill }) {
  return (
    <div className="element-carousel_item">
      {/* Part A: Design Image Preview */}
      <div className="element-card_part preview-part">
        <div className="card-visual-body">
          <HighFidelityPreview skill={skill} />
        </div>
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
