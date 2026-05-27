import React from 'react';
import sloppyCodeImg from '../sloppy_code.png';
import skillsFolderImg from '../skills_folder.jpg';

export default function WhyCare() {
  const cards = [
    {
      title: "AI is Not the Problem",
      desc: "Artificial intelligence isn't inherently flawed; rather, we often fail to construct and convey our exact intent. When we give vague, abstract prompts without strict design rules, the AI is forced to make assumptions. By formalizing abstract design blueprints, we translate human creativity into clear, deterministic instructions that agents can execute flawlessly.",
      centered: true,
      extraSection: {
        title: "What AI Needs",
        desc: "To produce truly premium results, an AI must be equipped with precise structural and design boundaries. Without a deterministic blueprint defining how every component is constructed, models inevitably fall back on statistical averages—resulting in generic, uninspired design slop. Providing clear design intent gives AI the constraints it needs to achieve perfection."
      }
    },
    {
      title: "What Indented Does for You",
      desc: "While developers write code in abstract systems, Indented handles the core design of the micro-systems, layout parts, and interactive components that define the user experience. By organizing design blueprints into a structured skills folder—using specialized instructions in files like nav.md, pricing.md, footer.md, and cta.md—we translate visual guidelines into concrete design tokens. This enables agents to build beautifully stylized components without losing control over the styling blueprint.",
      centered: true,
      extraImage: skillsFolderImg
    }
  ];

  return (
    <div className="why-care-container">
      <h3 className="why-care-header">Why Must You Care</h3>
      <div className="why-care-grid">
        {/* Special first card: Divided into two halves (split-card) */}
        <div className="why-care-card split-card">
          <div className="split-left">
            <h4 className="card-title">AI Generates Sloppy Code</h4>
            <p className="card-desc">
              Large language models frequently generate bloated, non-deterministic CSS and layouts with hidden style variables or floating pixels. Our system enforces a strict layer separation to guarantee clean visual compilation.
            </p>
          </div>
          <div className="split-right">
            <img src={sloppyCodeImg} alt="Sloppy Code Example" className="sloppy-code-img" />
          </div>
        </div>

        {/* Remaining cards */}
        {cards.map((card, index) => (
          <div key={index} className={`why-care-card ${card.centered ? 'centered-card' : ''} ${card.extraImage ? 'has-extra-image' : ''}`}>
            <h4 className="card-title">{card.title}</h4>
            <p className="card-desc">{card.desc}</p>
            {card.extraSection && (
              <>
                <h4 className="card-title" style={{ marginTop: '28px' }}>{card.extraSection.title}</h4>
                <p className="card-desc">{card.extraSection.desc}</p>
              </>
            )}
            {card.extraImage && (
              <div className="card-image-wrap">
                <img src={card.extraImage} alt={card.title} className="card-extra-img" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
