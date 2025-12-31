// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import "../styles/hero.css";
import logo from "../assets/images/logo192.png";
import heroVideo from "../assets/videos/try.mp4";

const Hero = ({ onEnter }) => {
  const [isComplete, setIsComplete] = useState(false);
  
  // Refs
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const yearRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderFillRef = useRef(null);

  useEffect(() => {
    // Initial setup - hide elements
    gsap.set([logoRef.current, titleRef.current, subtitleRef.current, yearRef.current], {
      opacity: 0,
      y: 30,
    });
    
    gsap.set([lineLeftRef.current, lineRightRef.current], {
      scaleX: 0,
    });
    
    gsap.set(loaderRef.current, {
      opacity: 0,
    });

    // Create entrance timeline - 4.5 SECONDS TOTAL
    const entranceTL = gsap.timeline({
      delay: 0.3, // Initial delay
    });

    // Fade in logo first
    entranceTL.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    // Then title
    entranceTL.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3");

    // Lines expand
    entranceTL.to([lineLeftRef.current, lineRightRef.current], {
      scaleX: 1,
      duration: 0.5,
      ease: "power2.inOut",
    }, "-=0.3");

    // Subtitle appears
    entranceTL.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    }, "-=0.2");

    // Year appears
    entranceTL.to(yearRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    }, "-=0.3");

    // Show loader
    entranceTL.to(loaderRef.current, {
      opacity: 1,
      duration: 0.3,
    }, "-=0.2");

    // Animate loader fill - ADJUSTED FOR 4.5 SECONDS TOTAL
    entranceTL.to(loaderFillRef.current, {
      width: "100%",
      duration: 2.3, // Adjusted to reach exactly 4.5 seconds total
      ease: "power1.inOut",
      onComplete: () => {
        startExitTransition();
      },
    });

    return () => {
      entranceTL.kill();
    };
  }, []);

  const startExitTransition = () => {
    const exitTL = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        if (onEnter) onEnter();
      },
    });

    // FASTER EXIT ANIMATIONS
    // Fade out loader first
    exitTL.to(loaderRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });

    // Elegant exit - content rises and blurs away
    exitTL.to(contentRef.current, {
      y: -60,
      opacity: 0,
      filter: "blur(20px)",
      duration: 0.6,
      ease: "power2.inOut",
    }, "-=0.1");

    // Overlay fades to white/transparent
    exitTL.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }, "-=0.5");

    // Video fades and slightly scales
    exitTL.to(videoRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, "-=0.6");

    // Final hero wrapper fade
    exitTL.to(heroRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    }, "-=0.3");
  };

  if (isComplete) return null;

  return (
    <div ref={heroRef} className="hero">
      {/* Video Background */}
      <div className="hero__video-container">
        <video
          ref={videoRef}
          className="hero__video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Dark Overlay */}
      <div ref={overlayRef} className="hero__overlay" />

      {/* Ambient Light Effects */}
      <div className="hero__ambient">
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="hero__content">
        {/* Logo */}
        <div ref={logoRef} className="hero__logo">
          <img src={logo} alt="Logo" className="hero__logo-img" />
          <div className="hero__logo-ring" />
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="hero__title">
          ELECTROWIZ
        </h1>

        {/* Decorative Lines */}
        <div className="hero__lines">
          <span ref={lineLeftRef} className="hero__line hero__line--left" />
          <span className="hero__line-dot" />
          <span ref={lineRightRef} className="hero__line hero__line--right" />
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero__subtitle">
          Electronics & Communication Engineering
        </p>

        {/* Year */}
        <div ref={yearRef} className="hero__year">
          <span className="hero__year-label">Department Symposium</span>
          <span className="hero__year-value">2026</span>
        </div>

        {/* Loader */}
        <div ref={loaderRef} className="hero__loader">
          <div className="hero__loader-track">
            <div ref={loaderFillRef} className="hero__loader-fill" />
          </div>
          <span className="hero__loader-text">Loading Experience</span>
        </div>
      </div>

      {/* Corner Frames */}
      <div className="hero__frame hero__frame--tl" />
      <div className="hero__frame hero__frame--tr" />
      <div className="hero__frame hero__frame--bl" />
      <div className="hero__frame hero__frame--br" />
    </div>
  );
};

export default Hero;