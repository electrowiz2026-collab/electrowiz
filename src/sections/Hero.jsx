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

  // Pre-set elements for GPU acceleration
  useEffect(() => {
    if (logoRef.current) {
      gsap.set(logoRef.current, {
        force3D: true,
        z: 0.01,
        transformStyle: "preserve-3d",
      });
    }
    if (textContentRef.current) {
      gsap.set(textContentRef.current, {
        force3D: true,
        z: 0.01,
      });
    }
  }, []);

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

  // OPTIMIZED GSAP Spin + Zoom Transition
  const startSpinZoomTransition = () => {
    // Pre-set will-change for performance
    if (logoRef.current) {
      logoRef.current.style.willChange = "transform, opacity";
    }
    if (textContentRef.current) {
      textContentRef.current.style.willChange = "transform, opacity";
    }
    if (backgroundRef.current) {
      backgroundRef.current.style.willChange = "opacity";
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setStage("complete");
        // Clean up will-change
        if (logoRef.current) {
          logoRef.current.style.willChange = "auto";
        }
        if (textContentRef.current) {
          textContentRef.current.style.willChange = "auto";
        }
        if (backgroundRef.current) {
          backgroundRef.current.style.willChange = "auto";
        }
        if (onEnter) onEnter();
      },
    });

    // Step 1: Quick brighten logo (0.05s)
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1.1,
      duration: 0.05,
      ease: "power1.out",
      force3D: true,
    });

    // Step 2: Fast fade out text content (0.2s)
    tl.to(
      textContentRef.current,
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power1.in",
        force3D: true,
      },
      "-=0.05"
    );

    // Step 3: Quick fade background (0.5s)
    tl.to(
      backgroundRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power1.in",
      },
      "<"
    );

    // Step 4: ULTRA SMOOTH Logo zoom (0.6s)
    tl.to(
      logoRef.current,
      {
        scale: 12,
        duration: 0.6,
        ease: "power2.inOut",
        force3D: true,
        transformOrigin: "center center",
        rotation: 0.01, // Tiny rotation to force GPU acceleration
      },
      "+=0.05"
    );

    // Step 5: Quick fade wrapper during zoom
    tl.to(
      heroRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
      },
      "-=0.3"
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
