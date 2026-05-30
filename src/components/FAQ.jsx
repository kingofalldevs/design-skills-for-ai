import React, { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      q: "what is indented.xyz?",
      a: "it is a design system framework built specifically for autonomous AI agents and modern developers to compile visually uniform, zero-bloat web components."
    },
    {
      q: "how does the AI agent compile the design system?",
      a: "the agent reads your design rules written in standard markdown/blueprints inside your .agent/skills/design-system/ directory and compiles them into production-ready layout code, safely constrained by your system's structural guardrails."
    },
    {
      q: "what frontend frameworks does the compiler support?",
      a: "the CLI compiles and exports clean, framework-agnostic assets that can be easily pulled into React, Next.js, Vue, Tailwind, or vanilla HTML/CSS environments."
    },
    {
      q: "is it possible to use custom layout rules?",
      a: "absolutely. you can define custom layouts, custom CSS tokens, and component behavior directly inside your SKILL.md blueprint file."
    },
    {
      q: "how is this different from traditional component libraries?",
      a: "unlike rigid component libraries, indented compiles layout and aesthetic rules dynamically at the agent level, ensuring zero unused code, optimal speed, and 100% design system alignment."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h3 className="section-title">frequently asked questions</h3>
      
      <div className="faq-container">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              className={`faq-item ${isOpen ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="faq-header">
                <span className="faq-question">{faq.q}</span>
                <span className="faq-icon">{isOpen ? '−' : '+'}</span>
              </div>
              <div className="faq-body">
                <p className="faq-answer">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
