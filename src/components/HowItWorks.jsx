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

  const sectionRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);
  const [targetStepIndex, setTargetStepIndex] = useState(0);
  const [displayedStepIndex, setDisplayedStepIndex] = useState(0);
  const [transitionState, setTransitionState] = useState(null);

  const swapTimeoutRef = useRef(null);
  const transitionEndTimeoutRef = useRef(null);

  useEffect(() => {
    const scrollContainer = document.querySelector('.main-content');
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const containerHeight = scrollContainer.clientHeight;
      
      const stickyOffset = 80; // sticky top: 80px
      const totalStickyDistance = rect.height - (containerHeight - stickyOffset);
      
      if (totalStickyDistance <= 0) return;
      
      const scrolled = stickyOffset - rect.top;
      let p = scrolled / totalStickyDistance;
      p = Math.max(0, Math.min(1, p));
      
      // Divide progress p into 3 zones for the 3 steps
      let targetStep = 0;
      if (p < 0.35) {
        targetStep = 0;
      } else if (p >= 0.35 && p < 0.7) {
        targetStep = 1;
      } else {
        targetStep = 2;
      }
      
      setTargetStepIndex((prevTarget) => {
        if (prevTarget !== targetStep) {
          // Set rotation target and transition state
          setRotationY(targetStep * 360);
          setTransitionState(`${prevTarget}-${targetStep}`);
          
          if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current);
          if (transitionEndTimeoutRef.current) clearTimeout(transitionEndTimeoutRef.current);
          
          // Swap visible step content at 400ms (180deg midpoint of the 800ms CSS spin)
          swapTimeoutRef.current = setTimeout(() => {
            setDisplayedStepIndex(targetStep);
          }, 400);
          
          // Reset transition state after 800ms when rotation animation ends
          transitionEndTimeoutRef.current = setTimeout(() => {
            setTransitionState(null);
          }, 800);
        }
        return targetStep;
      });
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current);
      if (transitionEndTimeoutRef.current) clearTimeout(transitionEndTimeoutRef.current);
    };
  }, []);

  // Derive back face labels based on transitionState
  let backSub = "";
  let backMessage = "";
  
  if (transitionState === "0-1" || transitionState === "1-0") {
    backSub = "01 → 02";
    backMessage = "compiling design rules...";
  } else if (transitionState === "1-2" || transitionState === "2-1") {
    backSub = "02 → 03";
    backMessage = "generating compiler bundle...";
  }

  return (
    <section ref={sectionRef} className="how-it-works-section">
      <div className="how-it-works-sticky">
        <h3 className="section-title">How It Works</h3>
        
        <div className="flip-card-container">
          <div 
            className="flip-card-inner" 
            style={{ 
              transform: `rotateY(${rotationY}deg)` 
            }}
          >
            {/* Front Face */}
            <div className="flip-card-front">
              <div className="step-card-main">
                <div className="step-card-text">
                  <div className="step-header">
                    <span className="step-number">{steps[displayedStepIndex].num}</span>
                    <h4 className="step-title">{steps[displayedStepIndex].title}</h4>
                  </div>
                  <p className="step-desc">{steps[displayedStepIndex].desc}</p>
                </div>
                
                <div className="step-code-box">
                  <pre><code>{steps[displayedStepIndex].code}</code></pre>
                </div>
              </div>

              {displayedStepIndex === 2 && (
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

            {/* Back Face */}
            <div className="flip-card-back">
              <div className="card-back-content">
                <div className="card-back-sub">{backSub}</div>
                <div className="card-back-logo">indented.</div>
                <div className="card-back-message">{backMessage}</div>
                <div className="card-back-loader">
                  <div className="loader-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
