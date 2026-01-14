// CyberpunkXStrips.jsx
import React from 'react';
import '../styles/CyberpunkXStrips.css';
import cyberpunkGirl from '../assets/images/cgirl.png';

const CyberpunkXStrips = () => {
  
  const strip1Text = "★ REGISTER NOW ★ REGISTER NOW ★ REGISTER NOW ";
  const strip2Text = "🔥 LIMITED SEATS 🔥 LIMITED SEATS 🔥 LIMITED SEATS ";
  
  const items1 = Array(20).fill(strip1Text);
  const items2 = Array(20).fill(strip2Text);

  return (
    <div className="hero">
      
      {/* X-SHAPED RED STRIPS (z-index: 1) */}
      <div className="red-strip strip-1">
        <div className="text-track">
          {items1.map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
        <div className="text-track">
          {items1.map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      <div className="red-strip strip-2">
        <div className="text-track reverse">
          {items2.map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
        <div className="text-track reverse">
          {items2.map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* PURPLE GLOW BEHIND GIRL (z-index: 1.5) */}
      <div className="purple-glow"></div>

      {/* CYBERPUNK GIRL (z-index: 2) */}
      <div className="girl-container">
        <img 
          src={cyberpunkGirl} 
          alt="Cyberpunk Girl" 
          className="girl-image"
        />
      </div>

    </div>
  );
};

export default CyberpunkXStrips;