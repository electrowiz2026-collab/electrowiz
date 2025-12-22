// src/components/Hero.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import { gsap } from "gsap";
import "../styles/hero.css";
import logo from "../assets/images/logo192.png";

const Hero = ({ onEnter }) => {
  const [stage, setStage] = useState("flickering");
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const textContentRef = useRef(null);
  const backgroundRef = useRef(null);

  const particles = useMemo(
    () =>
      [...Array(25)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${4 + Math.random() * 4}s`,
        size: `${2 + Math.random() * 3}px`,
      })),
    []
  );

  // Stage progression
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage("stable"), 1000),
      setTimeout(() => {
        setStage("exit");
        startSpinZoomTransition();
      }, 2000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onEnter]);

  // GSAP Spin + Zoom Transition
  const startSpinZoomTransition = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setStage("complete");
        if (onEnter) onEnter();
      },
    });

    // Step 1: Brighten logo first (0.3s)
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1.1,
      duration: 0.1,
      ease: "power2.out",
      force3D: true,
    });
    // Step 2: Fade out text content (0.4s)
    tl.to(
      textContentRef.current,
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        force3D: true,
      },
      "-=0.1"
    );

    // Step 3: Fade background
    tl.to(
      backgroundRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      },
      "<"
    );

    // Step 4: SMOOTH Logo spin + zoom (1.2s)
    tl.to(
      logoRef.current,
      {
        scale: 14,
        duration: .95,
        ease: "power1.inOut",
        force3D: true,
        transformOrigin: "center center",
      },
      "+=0.1"
    );

    // Step 5: Fade wrapper during spin
    tl.to(
      heroRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.6"
    );
  };

  // Helper function to split text into letters with word spacing
  const renderTextWithFlicker = (text, baseClass) => {
    return text.split("").map((char, index) => {
      if (char === " ") {
        return (
          <span key={index} className="letter-space">
            {" "}
          </span>
        );
      }
      return (
        <span key={index} className={`tagline-letter ${baseClass}-${index}`}>
          {char}
        </span>
      );
    });
  };

  if (stage === "complete") return null;

  return (
    <div ref={heroRef} className={`hero-wrapper stage-${stage}`}>
      {/* Background - will fade out */}
      <div ref={backgroundRef} className="hero-background-container">
        {/* <div className="hero-background">
          <div className="bg-gradient"></div>
          <div className="bg-mesh"></div>
          <div className="noise-texture"></div>
          <div className="scanlines"></div>
        </div> */}

        <div className="grid-overlay">
          <div className="grid-fade"></div>
        </div>

        <div className="ambient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="particle-field">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>

        <div className="corner-decoration top-left"></div>
        <div className="corner-decoration top-right"></div>
        <div className="corner-decoration bottom-left"></div>
        <div className="corner-decoration bottom-right"></div>

        <div className="hero-progress">
          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>

      {/* Center Logo - Will spin and zoom */}
      <div className="logo-center-container">
        <div ref={logoRef} className="logo-spinner">
          <img src={logo} alt="" className="logo-spin-image" />
        </div>
      </div>

      {/* Text Content - Will fade out first */}
      <div ref={textContentRef} className="text-content-container">
        <div className="brand-container">
          <h1 className="brand-name">
            <span className="letter letter-e">E</span>
            <span className="letter letter-l">L</span>
            <span className="letter letter-e2">E</span>
            <span className="letter letter-c">C</span>
            <span className="letter letter-t">T</span>
            <span className="letter letter-r">R</span>
            <span className="letter letter-o">O</span>
            <span className="letter letter-w">W</span>
            <span className="letter letter-i">I</span>
            <span className="letter letter-z">Z</span>
          </h1>
          <div className="brand-underline"></div>
        </div>

        <div className="tagline">
          <p className="tagline-text">
            {renderTextWithFlicker("ECE DEPARTMENT SYMPOSIUM 2026", "tl")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
