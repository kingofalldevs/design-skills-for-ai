import React, { useEffect, useRef, useState } from 'react';

export default function HowItWorks({ onAuthClick }) {
  const steps = [
    {
      num: "01",
      title: "author design rules",
      desc: "define your structural layouts and aesthetic style tokens inside the standardized .agent/skills/design-system/ directory.",
      code: `/* design-system/SKILL.md */
--font-mono: "Geist Mono";
--border-color: #000000;
--bg-color: #faf6eb;`
    },
    {
      num: "02",
      title: "agent compiles design",
      desc: "your autonomous AI agent reads the blueprints and compiles the layout code safely, locked inside your design system guardrails.",
      code: `// Agent execution flow
import { compiler } from 'indented';
const component = compiler.build(SKILL);`
    },
    {
      num: "03",
      title: "pull via CLI",
      desc: "run our lightweight compiler package command in your project directory to fetch the stylized assets with zero visual bloat.",
      code: `$ npx indented.xyz pull nav-minimal
✓ nav-minimal fetched
✓ compiled in 24ms`
    }
  ];

  const cardRefs = [useRef(null), useRef(null), useRef(null)];
  const [opacities, setOpacities] = useState([1, 1, 1]);
  const [scales, setScales] = useState([1, 1, 1]);

  useEffect(() => {
    const scrollContainer = document.querySelector('.main-content');
    if (!scrollContainer) return;

    const updateScrollEffects = () => {
      const newOpacities = [1, 1, 1];
      const newScales = [1, 1, 1];
      const stickyPoint = 120;

      cardRefs.forEach((ref, index) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        if (index < 2) {
          const nextRef = cardRefs[index + 1];
          if (nextRef.current) {
            const nextRect = nextRef.current.getBoundingClientRect();
            const cardHeight = rect.height;
            const startFade = stickyPoint + cardHeight;
            const endFade = stickyPoint;

            if (nextRect.top < startFade && nextRect.top > endFade) {
              const progress = (startFade - nextRect.top) / (startFade - endFade);
              newOpacities[index] = 1 - progress * 0.7; // fade down to 0.3
              newScales[index] = 1 - progress * 0.05; // scale down to 0.95
            } else if (nextRect.top <= endFade) {
              newOpacities[index] = 0.3;
              newScales[index] = 0.95;
            }
          }
        }
      });

      setOpacities(newOpacities);
      setScales(newScales);
    };

    scrollContainer.addEventListener('scroll', updateScrollEffects, { passive: true });
    updateScrollEffects();

    return () => scrollContainer.removeEventListener('scroll', updateScrollEffects);
  }, []);

  return (
    <section className="how-it-works-section">
      <h3 className="section-title">How It Works</h3>
      
      <div className="steps-container">
        {steps.map((step, index) => (
          <div 
            key={index} 
            ref={cardRefs[index]}
            className="step-card"
            style={{
              opacity: opacities[index],
              transform: `scale(${scales[index]})`,
              zIndex: index + 1
            }}
          >
            <div className="step-card-main">
              <div className="step-card-text">
                <div className="step-header">
                  <span className="step-number">{step.num}</span>
                  <h4 className="step-title">{step.title}</h4>
                </div>
                <p className="step-desc">{step.desc}</p>
              </div>
              
              <div className="step-code-box">
                <pre><code>{step.code}</code></pre>
              </div>
            </div>

            {index === 2 && (
              <div className="step-card-cta">
                <button 
                  className="element-primary_action_btn get-started-btn"
                  onClick={onAuthClick}
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
