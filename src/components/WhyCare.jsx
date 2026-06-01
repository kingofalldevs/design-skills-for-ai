import React from 'react';
export default function WhyCare() {
  const cards = [
    {
      number: "1",
      title: "choose a design of your choice",
      desc: "Browse our catalog of premium, production-ready interface templates. Every design is meticulously handcrafted by human UI/UX experts to ensure maximum visual impact, clean typography, and seamless structure.",
      isSplitLayout: true
    },
    {
      number: "2",
      title: "license the design",
      desc: "Secure your design with an exclusive, limited license that guarantees uniqueness. We strictly cap the number of active licenses for every single template, preventing the design from ever becoming saturated or over-used.",
      isSplitLayoutRight: true
    },
    {
      number: "3",
      title: <>describe your brand details to our ai agent (Lucy)<br />and she will customize it to your need</>,
      desc: "Bring your interface to life instantly. Instruct Lucy to tweak layout elements, adjust styling tokens, or add new components using simple, natural language chat instructions.",
      isSplitLayout: true
    }
  ];

  return (
    <div className="why-care-container">
      <h3 className="why-care-header">Why Must You Care</h3>
      <div className="why-care-grid">
        <div className="how-it-works">
          {cards.map((card, index) => {
            if (card.isSplitLayout) {
              return (
                <div key={index} className="why-care-card split-layout-card">
                  <div className="card-number-col">
                    {card.number}
                  </div>
                  <div className="card-content-col">
                    <h4 className="card-title">{card.title}</h4>
                    <p className="card-desc">{card.desc}</p>
                  </div>
                </div>
              );
            }
            if (card.isSplitLayoutRight) {
              return (
                <div key={index} className="why-care-card split-layout-card-right">
                  <div className="card-content-col">
                    <h4 className="card-title">{card.title}</h4>
                    <p className="card-desc">{card.desc}</p>
                  </div>
                  <div className="card-number-col">
                    {card.number}
                  </div>
                </div>
              );
            }
            return (
              <div key={index} className={`why-care-card ${card.centered ? 'centered-card' : ''} ${card.extraImage || card.renderExtra ? 'has-extra-image' : ''}`}>
                <h4 className="card-title">{card.title}</h4>
                <p className="card-desc">{card.desc}</p>
                {card.extraImage && (
                  <div className="card-image-wrap">
                    <img src={card.extraImage} alt={card.title} className="card-extra-img" />
                  </div>
                )}
                {card.renderExtra && card.renderExtra()}
                {card.extraSection && (
                  <>
                    <h4 className="card-title" style={{ marginTop: '28px' }}>{card.extraSection.title}</h4>
                    <p className="card-desc">{card.extraSection.desc}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
