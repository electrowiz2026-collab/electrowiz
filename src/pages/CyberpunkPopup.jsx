// src/components/CyberpunkPopup.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/CyberpunkPopup.css';

// Import your cyberpunk girl image
import cyberpunkGirlImg from '../assets/images/girl.png';

const CyberpunkPopup = ({ onRegister, delay = 7000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [girlAnimated, setGirlAnimated] = useState(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [buttonAnimated, setButtonAnimated] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  
  const fullMessage ="<^-^> Hey there! 👋 Limited slots are filling fast. Don’t miss your chance to be part of the biggest tech fest! 🚀"
  const typingSpeed = 40;
  const typingRef = useRef(null);

  // Check if already shown this session
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('electrowiz_popup_seen');
    if (hasSeenPopup) {
      setIsClosed(true);
      return;
    }

    // Show popup after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Start girl animation after popup appears
      setTimeout(() => {
        setGirlAnimated(true);
      }, 300);

      // Show dialogue after girl slides in
      setTimeout(() => {
        setDialogueVisible(true);
      }, 1200);

    }, delay);

    return () => clearTimeout(showTimer);
  }, [delay]);

  // Typing effect
  useEffect(() => {
    if (!dialogueVisible) return;

    let currentIndex = 0;
    
    typingRef.current = setInterval(() => {
      if (currentIndex <= fullMessage.length) {
        setTypedText(fullMessage.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingRef.current);
        // Show button after typing completes
        setTimeout(() => {
          setShowButton(true);
          setTimeout(() => {
            setButtonAnimated(true);
          }, 100);
        }, 300);
      }
    }, typingSpeed);

    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current);
      }
    };
  }, [dialogueVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('electrowiz_popup_seen', 'true');
    setTimeout(() => {
      setIsClosed(true);
    }, 500);
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    }
    handleClose();
  };

  if (isClosed) return null;

  return (
    <div className={`cyber-popup-overlay ${isVisible ? 'active' : ''}`}>
      <div className="cyber-popup-container">
        {/* Close Button */}
        <button className="cyber-close-btn" onClick={handleClose} aria-label="Close">
          <span className="close-x">✕</span>
        </button>

        {/* Urgent Badge */}
        <div className="cyber-urgent-badge">
          <span className="badge-pulse"></span>
          <span>🔥 LIMITED SLOTS</span>
        </div>

        {/* Main Content */}
        <div className="cyber-popup-content">
          
          {/* Cyberpunk Girl Image */}
          <div className={`cyber-girl-wrapper ${girlAnimated ? 'animated' : ''}`}>
            {/* Glowing Aura Behind Girl */}
            <div className="girl-aura"></div>
            <div className="girl-aura-secondary"></div>
            
            {/* Floating Particles */}
            <div className="girl-particles">
              {[...Array(8)].map((_, i) => (
                <span 
                  key={i} 
                  className="particle" 
                  style={{
                    animationDelay: `${i * 0.4}s`,
                    left: `${10 + Math.random() * 80}%`
                  }}
                ></span>
              ))}
            </div>

            {/* The Girl Image */}
            <div className="girl-image-container">
              <img 
                src={cyberpunkGirlImg} 
                alt="Cyberpunk Girl" 
                className="cyber-girl-image"
              />
              {/* Glitch Effect Overlay */}
              <div className="girl-glitch-overlay"></div>
              {/* Neon Glow Effect */}
              <div className="girl-neon-glow"></div>
            </div>

            {/* Waving Hand Emoji */}
           
          </div>

          {/* Dialogue Section */}
          <div className={`cyber-dialogue-section ${dialogueVisible ? 'visible' : ''}`}>
            
            {/* Speech Bubble */}
            <div className="cyber-speech-bubble">
              <div className="speech-pointer"></div>
              <div className="speech-content">
                <p className="typing-text">
                  {typedText}
                  <span className={`cursor ${showButton ? 'hidden' : ''}`}>|</span>
                </p>
              </div>
              <div className="speech-glitch"></div>
            </div>

            {/* Register Button */}
            <div className={`cyber-register-wrapper ${showButton ? 'visible' : ''} ${buttonAnimated ? 'animated' : ''}`}>
              <button className="cyber-register-btn" onClick={handleRegister}>
                <span className="btn-bg"></span>
                <span className="btn-glitch"></span>
                <span className="btn-content">
                  <span className="btn-icon">🚀</span>
                  <span className="btn-text">REGISTER NOW</span>
                  <span className="btn-arrow">→</span>
                </span>
              </button>
              
              {/* Slots Counter */}
             
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="cyber-corner cyber-corner-tl"></div>
        <div className="cyber-corner cyber-corner-tr"></div>
        <div className="cyber-corner cyber-corner-bl"></div>
        <div className="cyber-corner cyber-corner-br"></div>
        
        {/* Scan Line */}
        
      </div>
    </div>
  );
};

export default CyberpunkPopup;