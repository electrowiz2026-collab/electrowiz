/* ============================================
   ELECTROWIZ HOME PAGE - ENHANCED VERSION
   With Smooth Typewriter, Save The Date & Moment Animation
   ============================================ */

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import logo from "../assets/images/logo192.png";
import veclogo from "../assets/images/veclogo.png";
import Contact from "../pages/Contact.jsx";
import bgVideo from "../assets/videos/back.mp4";
import saveTheDateVideo from "../assets/videos/save.mp4";
import sparkx from "../assets/images/spark.png";
import think from "../assets/images/think.png";
import elec from "../assets/images/elect.png";
import error from "../assets/images/error.png";
import mind from "../assets/images/mind.png";
import clue from "../assets/images/clue.png";
import dream from "../assets/images/dream.png";
import pixel from "../assets/images/pixel.png";
import sound from "../assets/images/Sound.png";
import game from "../assets/images/ff.png";
import ai from "../assets/images/ai.png";

// ==================== SMOOTH TYPEWRITER HOOK ====================
const useTypewriter = (text, totalDuration = 2000, startTyping = false) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!startTyping) {
      setDisplayedText("");
      setIsComplete(false);
      startTimeRef.current = null;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    if (!text || text.length === 0) {
      setDisplayedText("");
      setIsComplete(true);
      return;
    }

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / totalDuration, 1);
      const charIndex = Math.floor(progress * text.length);

      setDisplayedText(text.slice(0, charIndex + 1));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayedText(text);
        setIsComplete(true);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, totalDuration, startTyping]);

  return { displayedText, isComplete };
};

// ==================== MAIN COMPONENT ====================
const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // ==================== STATE ====================
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeEventTab, setActiveEventTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  // Scroll animation states
  const [visibleSections, setVisibleSections] = useState(new Set());

  // Typewriter states
  const [aboutTypingStarted, setAboutTypingStarted] = useState(false);

  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [yearVisible, setYearVisible] = useState(false);
  const [yearMorphed, setYearMorphed] = useState(false);

  // ==================== MOMENT SECTION STATE ====================
  const [scrollTextVisible, setScrollTextVisible] = useState(false);
  const scrollTextRef = useRef(null);

  const eventDate = useMemo(() => new Date("2026-02-14T09:00:00"), []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ==================== TYPEWRITER TEXTS ====================
  const aboutText1 =
    "Velammal Engineering College is a hub of knowledge, innovation, and excellence. It inspires students to explore technology beyond textbooks. With quality education and skilled mentorship, it builds future leaders.";

  const aboutText2 =
    "ELECTROWIZ is the flagship technical symposium organized by the Department of Electronics and Communication Engineering at Velammal Engineering College.";

  const { displayedText: typedText1, isComplete: typing1Complete } =
    useTypewriter(aboutText1, 3000, aboutTypingStarted);

  const { displayedText: typedText2, isComplete: typing2Complete } =
    useTypewriter(aboutText2, 2500, typing1Complete);

  // ==================== DATA ====================
  const navItems = [
    { id: "home", label: "Home", icon: "⌂", isPage: false },
    { id: "about", label: "About", icon: "◈", isPage: false },
    { id: "events", label: "Events", icon: "◉", isPage: false },
    { id: "schedule", label: "Schedule", icon: "▤", isPage: false },

    { id: "coordinators", label: "Coordinators", icon: "👥", isPage: true },
    { id: "contact", label: "Contact", icon: "✉", isPage: false },
  ];

  const titleChars = [
    { char: "E", accent: false },
    { char: "L", accent: false },
    { char: "E", accent: false },
    { char: "C", accent: false },
    { char: "T", accent: false },
    { char: "R", accent: false },
    { char: "O", accent: false },
    { char: "W", accent: false },
    { char: "I", accent: false },
    { char: "Z", accent: false },
  ];

  // ==================== ALL EVENTS DATA ====================
  const allEvents = [
    {
      id: 1,
      title: "SPARKX",
      category: "Technical",
      description:
        "SPARKIX is a competitive academic forum designed for budding researchers and innovators to present their original ideas and research outcomes before an expert evaluation panel",
      posterUrl: sparkx,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "3 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/sparkix.pdf",
      coordinators: [
        { name: "Srinivasan V", phone: "+91 93618 89276 " },
        { name: "Madhumithra M", phone: "+91 73059 48188" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 2,
      title: "ElectraXpo",
      category: "Technical",
      description:
        "ElectraXpo offers a platform for students to showcase innovative solutions and working models that address real-world engineering challenges",
      posterUrl: elec,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "4 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/ELECTRAXPO.pdf",
      coordinators: [
        { name: "Naveen Prakash", phone: "+91 96002 89904" },
        { name: "Rini Rayan", phone: "+91 63824 87338" },
        { name: "Eswararaju Sneha", phone: "+91 80960 06118" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 3,
      title: "THINK A THON",
      category: "Technical",
      description:
        "Think fast. Answer smart prove you're the sharpest mind in the room.",
      posterUrl: think,
      prize: "₹2,000",
      teamSize: "3-4 members",
      duration: "2 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/think-a-thon-rules.pdf",
      coordinators: [
        { name: "KAVIYARASAN S", phone: "+91 84894 91386" },
        { name: "VENDAMANI K", phone: "+91 93849 95398" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 4,
      title: "ERROR 404",
      category: "Technical",
      description:
        "Error 404 is a competitive technical event that tests participants' logical reasoning and coding skills.",
      posterUrl: error,
      prize: "₹2,000",
      teamSize: "3-4 members",
      duration: "3 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz.pdf",
      coordinators: [
        { name: "Harish.S ", phone: "+91 63790 04185" },
        { name: "Sushmitha", phone: "+91 74183 36138" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 7,
      title: "SOUND SPHERE",
      category: "Non-Technical",
      description:
        "Sound Sphere is a creative event that challenges participants to identify, analyze, and interpret audio-based clues",
      posterUrl: sound,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "2 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/soundrule.pdf",
      coordinators: [
        { name: "JEEVATH M", phone: "+91 63833 00579" },
        { name: "ANJALI B", phone: "+91 63834 65759" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 8,
      title: "CLUE CONNECT",
      category: "Non-Technical",
      description:
        "Clue Connect is an exciting non-technical event that tests listening skills, visual reasoning, and movie knowledge.",
      posterUrl: clue,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "3 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/CLUE CONNECT.pdf",

      coordinators: [
        { name: "Barath ", phone: "+91 98402 75886" },
        { name: "Akshitha", phone: "+91 63740 16868" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 9,
      title: "MIND MAZE",
      category: "Non-Technical",
      description:
        "Mind Maze is an engaging non-technical event that challenges logical thinking, observation, and problem-solving skills.",
      posterUrl: mind,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "4 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/Mind Maze .pdf",
      coordinators: [
        { name: "Dhiyanesh", phone: "+91 94442 54917" },
        { name: "Swedha P S", phone: "+91 63827 32250" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 10,
      title: "DREAM XI",
      category: "Non-Technical",
      description:
        "DREAM11 is a IPL-themed team event designed to test participants' IPL knowledge,decision-making, and strategic team-building skills.",
      posterUrl: dream,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "3 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/dream 11.pdf",
      coordinators: [
        { name: "Anshul S A", phone: "+91 63792 80210" },
        { name: "Santhosh S", phone: "+91 90258 56034" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 11,
      title: "PIXEL PERFECT",
      category: "Non-Technical",
      description:
        "Pixel Perfect is a creative event that tests participants' visual accuracy and attention to detail.",
      posterUrl: pixel,
      prize: "₹15,000",
      teamSize: "2-4 members",
      duration: "3 hrs",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/pixelperfect.pdf",

      coordinators: [
        { name: "Logesh G", phone: "+91 90250 09593" },
        { name: "Tanya Pillai", phone: "+91 98765 43231" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 12,
      title: "GAMEVERSE",
      category: "Non-Technical",
      description:
        "GameVerse is a fun-filled gaming event that brings together competition, skill, and entertainment.",
      posterUrl: game,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "2 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/ff.pdf",
      coordinators: [
        { name: "Prasanth M", phone: "+91 90924 79171" },
        { name: "Shreya Jain", phone: "+91 98765 43233" },
      ],
      rules: ["Click the button --> Download Rules"],
    },
    {
      id: 13,
      title: "INTRODUCTION TO NLP AND AGENTIC AI",
      category: "Workshop",
      description:
        "Hands-on workshop on Artificial Intelligence and Machine Learning. Learn to build intelligent systems with industry experts.",
      posterUrl: ai,
      prize: "Certificate & Goodies",
      teamSize: "Individual",
      duration: "2-3 hours",
      venue: "TBA",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/Generative AI(Workshop).pdf",
      coordinators: [
        { name: "Dr. Anand Kumar", phone: "+91 98765 43234" },
        { name: "Prof. Neha Singh", phone: "+91 98765 43235" },
      ],
      rules: ["Click the button --> Download"],
    },
  ];

  const schedule = [
    {
      day: "Day 1",
      date: "March 15, 2026",
      events: [
        {
          time: "09:00 AM",
          title: "Inauguration Ceremony",
          venue: "Main Auditorium",
        },
        { time: "10:30 AM", title: "Keynote Speech", venue: "Main Auditorium" },
        {
          time: "12:00 PM",
          title: "Circuit Quest - Round 1",
          venue: "Lab Block A",
        },
        { time: "02:00 PM", title: "Code Storm Begins", venue: "Computer Lab" },
        { time: "03:00 PM", title: "Robo Wars - Prelims", venue: "Main Arena" },
        { time: "04:00 PM", title: "Tech Quiz Prelims", venue: "Seminar Hall" },
        {
          time: "05:00 PM",
          title: "Paper Presentations",
          venue: "Conference Hall",
        },
        {
          time: "06:00 PM",
          title: "Cultural Evening",
          venue: "Open Air Theatre",
        },
      ],
    },
  ];

  // ==================== MOMENT SECTION OBSERVER ====================
  useEffect(() => {
    const scrollTextElement = scrollTextRef.current;
    if (!scrollTextElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrollTextVisible(true);
          } else {
            setScrollTextVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px",
      }
    );

    observer.observe(scrollTextElement);

    return () => observer.disconnect();
  }, []);

  // ==================== SCROLL ANIMATION EFFECT ====================
  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3],
      rootMargin: "0px 0px -50px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.dataset.section;
          if (sectionId) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.add(sectionId);
              return newSet;
            });

            if (sectionId === "about") {
              setTimeout(() => setAboutTypingStarted(true), 500);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section) => {
        observer.observe(section);

        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
          const sectionId = section.dataset.section;
          if (sectionId) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.add(sectionId);
              return newSet;
            });

            if (sectionId === "about") {
              setTimeout(() => setAboutTypingStarted(true), 500);
            }
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  // ==================== OTHER EFFECTS ====================
  useEffect(() => {
    const timer = setTimeout(() => setTitleAnimationComplete(true), 1500);
    const yearTimer = setTimeout(() => setYearVisible(true), 1800);
    const morphTimer = setTimeout(() => setYearMorphed(true), 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(yearTimer);
      clearTimeout(morphTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems
        .filter((item) => !item.isPage)
        .map((item) => item.id);

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (isModalOpen) closeEventModal();
        if (isVideoModalOpen) closeVideoModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen, isVideoModalOpen]);

  useEffect(() => {
    if (isModalOpen || isVideoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isVideoModalOpen]);

  // ==================== HANDLERS ====================
  const scrollToSection = (sectionId) => {
    if (sectionId === "coordinators") {
      navigate("/coordinators");
      setIsMobileMenuOpen(false);
      return;
    }

    setIsMobileMenuOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        window.scrollBy({
          top: -100,
          behavior: "smooth",
        });
      }, 10);

      setActiveSection(sectionId);
    }
  };

  const handleRegisterClick = () => {
    scrollToSection("events");
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedEvent(null);
    }, 300);
  };

  const openVideoModal = () => {
    setVideoUrl("https://www.youtube.com/embed/OfuKNPIyk8Q?autoplay=1&rel=0");

    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setTimeout(() => {
      setVideoUrl("");
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeEventModal();
    }
    if (e.target.classList.contains("video-modal-overlay")) {
      closeVideoModal();
    }
  };

  const handleRulesDownload = (rulesFile, eventTitle) => {
    const link = document.createElement("a");
    link.href = rulesFile;
    link.download = `${eventTitle
      .replace(/\s+/g, "-")
      .toLowerCase()}-rules.pdf`; // ← Changed .docx to .pdf

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEventRegistration = (registrationLink) => {
    window.open(registrationLink, "_blank", "noopener,noreferrer");
  };

  const getDisplayedEvents = () => {
    switch (activeEventTab) {
      case "tech":
        return allEvents.filter((event) => event.category === "Technical");
      case "nontech":
        return allEvents.filter((event) => event.category === "Non-Technical");
      case "workshop":
        return allEvents.filter((event) => event.category === "Workshop");
      case "all":
      default:
        return allEvents;
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="home-container">
      {/* ==================== NAVBAR ==================== */}
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => scrollToSection("home")}>
            <img src={logo} alt="ELECTROWIZ" className="navbar-logo-img" />
            <span className="navbar-logo-text">ELECTROWIZ</span>
          </div>

          <ul className="navbar-menu">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`navbar-link ${
                    !item.isPage && activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="navbar-link-icon">{item.icon}</span>
                  <span className="navbar-link-text">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <button className="navbar-cta" onClick={handleRegisterClick}>
            <span className="cta-text">Register Now</span>
            <span className="cta-icon">→</span>
          </button>

          <button
            className={`navbar-toggle ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </button>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="mobile-menu-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`mobile-menu-link ${
                    !item.isPage && activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="mobile-link-icon">{item.icon}</span>
                  <span className="mobile-link-text">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button className="mobile-cta" onClick={handleRegisterClick}>
            Register Now
          </button>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="hero-section">
        <div className="hero-bg">
          <br />
          <br />

          <section className="college-banner-clean">
            <div className="college-banner-inner">
              <div className="college-banner-logo">
                <img src={veclogo} alt="Velammal Engineering College" />
              </div>
              <div className="college-banner-text">
                <h1>Velammal Engineering College</h1>
                <p>An Autonomous Institution</p>
              </div>
            </div>
          </section>

          <video
            className="hero-video"
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-grid"></div>
          <div className="hero-gradient"></div>
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="hero-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <br />
          <br />

          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">ECE Department Presents</span>
          </div>

          <h1 className="hero-title">
            <div
              className={`title-animated ${
                titleAnimationComplete ? "animation-complete" : ""
              }`}
            >
              <div className="inner">
                <div className="title-main-row">
                  {titleChars.map((item, index) => (
                    <span key={index} className="char-wrapper">
                      <span
                        className={`spin-char ${item.accent ? "accent" : ""}`}
                        style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                      >
                        {item.char}
                      </span>
                    </span>
                  ))}

                  <span
                    className="title-apostrophe"
                    style={{
                      opacity: yearVisible ? 1 : 0,
                      transform: yearVisible ? "scale(1)" : "scale(0)",
                      transition:
                        "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  >
                    '
                  </span>

                  <span
                    className="title-year-container"
                    style={{
                      opacity: yearVisible ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  >
                    <span
                      className="year-digit-static"
                      style={{
                        transform: yearVisible
                          ? "translateY(0)"
                          : "translateY(-20px)",
                        transition: "transform 0.5s ease-out 0.1s",
                      }}
                    >
                      26
                    </span>

                    <span className="odometer-wrapper">
                      <span
                        className="odometer-roll"
                        style={{
                          top: yearMorphed ? "-1.1em" : "0",
                        }}
                      ></span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </h1>

          <div className="countdown-container">
            <h3 className="countdown-label">Event Starts In</h3>
            <div className="countdown-grid">
              <div className="countdown-item">
                <div className="countdown-value">
                  <span className="countdown-number">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <div className="countdown-glow"></div>
                </div>
                <span className="countdown-unit">Days</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-value">
                  <span className="countdown-number">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <div className="countdown-glow"></div>
                </div>
                <span className="countdown-unit">Hours</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-value">
                  <span className="countdown-number">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <div className="countdown-glow"></div>
                </div>
                <span className="countdown-unit">Minutes</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-value">
                  <span className="countdown-number countdown-seconds">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <div className="countdown-glow"></div>
                </div>
                <span className="countdown-unit">Seconds</span>
              </div>
            </div>
          </div>

          <div className="hero-cta-group">
            <button
              className="hero-btn hero-btn-primary"
              onClick={handleRegisterClick}
            >
              <span className="btn-content">
                <span className="btn-icon">⚡</span>
                <span className="btn-text">Register Now</span>
              </span>
              <span className="btn-glow"></span>
            </button>
            <button
              className="hero-btn hero-btn-secondary"
              onClick={openVideoModal}
            >
              <span className="btn-content">
                <span className="btn-icon">▶</span>
                <span className="btn-text">Watch Trailer</span>
              </span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">15+</span>
              <span className="stat-label">Events</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">₹2L+</span>
              <span className="stat-label">Prize Pool</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Participants</span>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            className="scroll-indicator"
            onClick={() => scrollToSection("about")}
          >
            <span className="scroll-text">Scroll Down</span>
            <div className="scroll-arrow">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="about-section" data-section="about">
        <div className="section-container">
          <div
            className={`section-header fade-in-up ${
              visibleSections.has("about") ? "visible" : ""
            }`}
          >
            <h2 className="section-title">
              <span className="highlight">Welcome To ELECTROWIZ</span>
            </h2>
            <div className="section-line"></div>
            <br />
            <br />
            <span className="section-tag">About VEC</span>
          </div>

          <div className="about-grid">
            <div
              className={`about-content fade-in-left ${
                visibleSections.has("about") ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="typewriter-container">
                <p className="about-text typewriter-text">
                  <span className="typewriter-content">{typedText1}</span>
                  {aboutTypingStarted && !typing1Complete && (
                    <span className="typing-cursor"></span>
                  )}
                </p>
                <p className="about-text typewriter-text">
                  <span className="typewriter-content">{typedText2}</span>
                  {typing1Complete && !typing2Complete && (
                    <span className="typing-cursor"></span>
                  )}
                </p>
              </div>

              <div className="about-features">
                {[
                  {
                    icon: "🎯",
                    title: "Technical Excellence",
                    desc: "Challenging events designed to push your limits",
                  },
                  {
                    icon: "🌟",
                    title: "Industry Connect",
                    desc: "Network with professionals and recruiters",
                  },
                  {
                    icon: "🏆",
                    title: "Massive Prizes",
                    desc: "Win from a prize pool of over ₹2 Lakhs",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-item fade-in-up ${
                      visibleSections.has("about") ? "visible" : ""
                    }`}
                    style={{ transitionDelay: `${0.8 + index * 0.2}s` }}
                  >
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`about-visual fade-in-right ${
                visibleSections.has("about") ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="visual-card">
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="card-icon">
                    <img src={veclogo} alt="ELECTROWIZ" />
                  </div>
                  <div className="card-info">
                    <span className="info-label">Established</span>
                    <span className="info-value">1995</span>
                  </div>
                  <div className="card-info">
                    <span className="info-label">Edition</span>
                    <span className="info-value">5th</span>
                  </div>
                  <div className="card-info">
                    <span className="info-label">Theme</span>
                    <span className="info-value">Future Tech</span>
                  </div>
                </div>
                <div className="card-ring"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="save-date-section" data-section="savedate">
        <div className="save-date-container">
          <h2 className="save-date-top-text">SAVE THE DATE</h2>

          <div className="save-date-video-wrapper">
            <video
              ref={videoRef}
              className="save-date-video"
              src={saveTheDateVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/save-date-poster.jpg"
            />
          </div>

          <h1 className="save-date-bottom-text">FEB 14!</h1>
        </div>
      </section>
      {/* ==================== EVENTS SECTION ==================== */}
      <section id="events" className="events-section" data-section="events">
        <div className="section-container">
          <div
            className={`section-header fade-in-up ${
              visibleSections.has("events") ? "visible" : ""
            }`}
          >
            <span className="section-tag">Competitions & Workshops</span>
            <h2 className="section-title">
              Featured <span className="highlight">Events</span>
            </h2>
            <div className="section-line"></div>
          </div>

          <div
            className={`events-tabs fade-in-up ${
              visibleSections.has("events") ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <button
              className={`event-tab ${
                activeEventTab === "all" ? "active" : ""
              }`}
              onClick={() => setActiveEventTab("all")}
            >
              <span>All Events</span>
            </button>
            <button
              className={`event-tab tech-tab ${
                activeEventTab === "tech" ? "active" : ""
              }`}
              onClick={() => setActiveEventTab("tech")}
            >
              <span>Technical</span>
            </button>
            <button
              className={`event-tab nontech-tab ${
                activeEventTab === "nontech" ? "active" : ""
              }`}
              onClick={() => setActiveEventTab("nontech")}
            >
              <span>Non-Technical</span>
            </button>
            <button
              className={`event-tab workshop-tab ${
                activeEventTab === "workshop" ? "active" : ""
              }`}
              onClick={() => setActiveEventTab("workshop")}
            >
              <span>Workshops</span>
            </button>
          </div>

          <div className="events-clean-grid">
            {getDisplayedEvents().map((event, index) => (
              <div
                key={event.id}
                className={`event-clean-card ${
                  event.category === "Technical"
                    ? "tech-card"
                    : event.category === "Workshop"
                    ? "workshop-card"
                    : "nontech-card"
                } fade-in-up ${visibleSections.has("events") ? "visible" : ""}`}
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="event-index-badge">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="event-card-poster">
                  <img src={event.posterUrl} alt={event.title} />
                  <div className="poster-hover-overlay">
                    <span>View Details</span>
                  </div>
                </div>

                <div className="event-card-content">
                  <div className="event-card-header">
                    <span
                      className={`event-type-badge ${
                        event.category === "Technical"
                          ? "tech"
                          : event.category === "Workshop"
                          ? "workshop"
                          : "nontech"
                      }`}
                    >
                      {event.category}
                    </span>
                    <h3 className="event-card-title">{event.title}</h3>
                  </div>

                  <p className="event-card-description">{event.description}</p>

                  <div className="event-card-meta">
                    <div className="meta-row">
                      <span className="meta-icon">👥</span>
                      <span>{event.teamSize}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-icon">⏱️</span>
                      <span>{event.duration}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-icon">📍</span>
                      <span>{event.venue}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-icon">🏆</span>
                      <span>{event.prize}</span>
                    </div>
                  </div>

                  <div className="event-card-actions">
                    <button
                      className="event-action-btn learn-more-btn"
                      onClick={() => openEventModal(event)}
                    >
                      Learn More →
                    </button>
                    <button
                      className="event-action-btn register-btn"
                      onClick={() =>
                        handleEventRegistration(event.registrationLink)
                      }
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ==================== ANNOUNCEMENT BANNER ==================== */}
      <section className="announcement-section">
        <div className="announcement-track">
          <div className="announcement-content">
            <span>🚀 REGISTRATION IS LIVE NOW</span>
            <span>⚡ ELECTROWIZ 2026</span>
            <span>🎟️ LIMITED SLOTS AVAILABLE</span>
            <span>📅 FEBRUARY 14</span>
            <span>🔥 REGISTER TODAY</span>

            {/* duplicate for seamless loop */}
            <span>🚀 REGISTRATION IS LIVE NOW</span>
            <span>⚡ ELECTROWIZ 2026</span>
            <span>🎟️ LIMITED SLOTS AVAILABLE</span>
            <span>📅 FEBRUARY 14</span>
            <span>🔥 REGISTER TODAY</span>
          </div>
        </div>
      </section>

      {/* ==================== MAKE A MOMENT SECTION ==================== */}
      <section
        className={`moment-section ${scrollTextVisible ? "in-view" : ""}`}
        ref={scrollTextRef}
      >
        <div className="moment-bg">
          <div className="moment-grid-overlay"></div>
          <div className="moment-glow moment-glow-1"></div>
          <div className="moment-glow moment-glow-2"></div>
          <div className="moment-particles">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="moment-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="moment-content">
          <div className="moment-lines">
            <div className="moment-line-wrapper">
              <h2 className="moment-line moment-line-1">
                <span className="moment-text">JOIN THE</span>
              </h2>
            </div>

            <div className="moment-line-wrapper">
              <h2 className="moment-line moment-line-2">
                <span className="moment-text">MOMENT</span>
              </h2>
            </div>

            <div className="moment-line-wrapper">
              <h2 className="moment-line moment-line-3">
                <span className="moment-text">WITH US</span>
              </h2>
            </div>
          </div>

          <div className="moment-cta-wrapper">
            <p className="moment-subtitle">
              Join 500+ participants in the biggest tech fest
            </p>
            <button className="moment-cta-btn" onClick={handleRegisterClick}>
              <span className="moment-btn-bg"></span>
              <span className="moment-btn-text">Register Now</span>
              <span className="moment-btn-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="moment-decoration">
          <div className="moment-circle moment-circle-1"></div>
          <div className="moment-circle moment-circle-2"></div>
          <div className="moment-circle moment-circle-3"></div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq" className="faq-section" data-section="faq">
        <div className="section-container">
          <div
            className={`section-header fade-in-up ${
              visibleSections.has("faq") ? "visible" : ""
            }`}
          >
            <span className="section-tag">Need Help?</span>
            <h2 className="section-title">
              <span className="highlight">Frequently Asked Questions</span>
            </h2>
            <div className="section-line"></div>
          </div>

          <div className="faq-list">
            {[
              {
                q: "Who can participate?",
                a: "Students from all colleges can participate in Electrowiz'26.",
              },
              {
                q: "Is there any registration fee?",
                a: "Registration fee ₹150(Individual) + Additional ₹150(WORKSHOP IF ATTENDED))",
              },
              {
                q: "How do I register?",
                a: "You can register through the Gform available on the website.",
              },
              {
                q: "Is the workshop open to all branches?",
                a: "Yes, the workshop is open to students from all branches.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`faq-item fade-in-up ${
                  visibleSections.has("faq") ? "visible" : ""
                }`}
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="contact-section" data-section="contact">
        <div className="section-container">
          <div
            className={`section-header fade-in-up ${
              visibleSections.has("contact") ? "visible" : ""
            }`}
          >
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">
              Contact <span className="highlight">Us</span>
            </h2>
            <div className="section-line"></div>
          </div>

          <div className="contact-grid">
            <div
              className={`contact-info fade-in-left ${
                visibleSections.has("contact") ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              {[
                {
                  icon: "📍",
                  title: "Location",
                  lines: [
                    "Department of ECE",
                    "Velammal Engineering College",
                    "Chennai, Tamil Nadu - 600066",
                  ],
                },
                {
                  icon: "📧",
                  title: "Email",
                  lines: ["electrowiz2026@gmail.com"],
                },
                {
                  icon: "📱",
                  title: "Phone",
                  lines: ["+91 80158 84879 ", "+91 90250 09593"],
                },
              ].map((info, index) => (
                <div
                  key={index}
                  className={`info-card fade-in-up ${
                    visibleSections.has("contact") ? "visible" : ""
                  }`}
                  style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h4>{info.title}</h4>
                    {info.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div
                className={`social-links fade-in-up ${
                  visibleSections.has("contact") ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <a
                  href="https://www.instagram.com/electrowiz.26?utm_source=qr&igsh=MW5kbWN2YzNjZ2Jjdg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>

                <a
                  href="https://www.youtube.com/watch?v=OfuKNPIyk8Q"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>

            <div
              className={`fade-in-right ${
                visibleSections.has("contact") ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <Contact />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src={logo} alt="ELECTROWIZ" />
                <span>ELECTROWIZ</span>
              </div>
              <p className="footer-tagline">
                ECE Department Technical Symposium 2026
              </p>
              <p className="footer-description">
                Igniting innovation, fostering talent, and building the future
                of technology at Velammal Engineering College.
              </p>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                {[
                  "home",
                  "about",
                  "events",
                  "schedule",
                  "coordinators",
                  "contact",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link);
                      }}
                    >
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links">
              <h4>Events</h4>
              <ul>
                <li>
                  <a
                    href="#events"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveEventTab("tech");
                      scrollToSection("events");
                    }}
                  >
                    Technical Events
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveEventTab("nontech");
                      scrollToSection("events");
                    }}
                  >
                    Non-Technical Events
                  </a>
                </li>
                <li>
                  <a href="#events">Workshops</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              © 2026 ELECTROWIZ - Velammal Engineering College. All rights
              reserved.
            </p>

            <p className="credits">
              Made by{" "}
              <a
                href="https://yasvanthbala.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Yasvanth Bala G
              </a>{" "}
              .{" "}
              <a
                href="https://ravikishore17.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Ravi Kishore S
              </a>
            </p>
          </div>
        </div>
      </footer>

      <button
        className={`back-to-top ${isScrolled ? "visible" : ""}`}
        onClick={() => scrollToSection("home")}
        aria-label="Back to top"
      >
        <span>↑</span>
      </button>

      {/* ==================== MODALS ==================== */}
      <div
        className={`modal-overlay ${isModalOpen ? "open" : ""}`}
        onClick={handleOverlayClick}
      >
        {selectedEvent && (
          <div
            className={`modal-container ${
              selectedEvent.category === "Technical"
                ? "tech-modal"
                : "nontech-modal"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content-wrapper">
              <div
                className={`modal-header ${
                  selectedEvent.category === "Technical"
                    ? "tech-header"
                    : "nontech-header"
                }`}
              >
                <button
                  className="modal-close"
                  onClick={closeEventModal}
                  aria-label="Close modal"
                >
                  ✕
                </button>

                <div className="modal-poster-container">
                  <img
                    src={selectedEvent.posterUrl}
                    alt={selectedEvent.title}
                    className="modal-poster-image"
                  />
                </div>

                <span
                  className={`modal-event-category ${
                    selectedEvent.category === "Technical" ? "tech" : "nontech"
                  }`}
                >
                  {selectedEvent.category}
                </span>
                <h2 className="modal-event-title">{selectedEvent.title}</h2>
                <p className="modal-event-prize">
                  Prize Pool: {selectedEvent.prize}
                </p>
              </div>

              <div className="modal-body">
                <div className="rules-section">
                  <h3 className="rules-title">
                    <span className="rules-title-icon">📋</span>
                    About This Event
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: "1.8",
                      marginBottom: "1rem",
                    }}
                  >
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="event-details-grid">
                  <div className="detail-item">
                    <span className="detail-icon">👥</span>
                    <span className="detail-label">Team Size</span>
                    <span className="detail-value">
                      {selectedEvent.teamSize}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">⏱️</span>
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">
                      {selectedEvent.duration}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-label">Venue</span>
                    <span className="detail-value">{selectedEvent.venue}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🏆</span>
                    <span className="detail-label">Prize</span>
                    <span className="detail-value">{selectedEvent.prize}</span>
                  </div>
                </div>

                <div className="rules-section">
                  <h3 className="rules-title">
                    <span className="rules-title-icon">📜</span>
                    Rules & Regulations
                  </h3>
                  <ul className="rules-list">
                    {selectedEvent.rules.map((rule, index) => (
                      <li key={index}>
                        <span className="rule-number">{index + 1}</span>
                        <span className="rule-text">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="coordinators-section">
                  <h3 className="rules-title">
                    <span className="rules-title-icon">👥</span>
                    Event Coordinators
                  </h3>
                  <div className="coordinators-grid">
                    {selectedEvent.coordinators.map((coordinator, index) => (
                      <div key={index} className="coordinator-card">
                        <div className="coordinator-icon">👤</div>
                        <div className="coordinator-info">
                          <div className="coordinator-name">
                            {coordinator.name}
                          </div>
                          <div className="coordinator-contact">
                            <span className="contact-icon">📞</span>
                            <span>{coordinator.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="modal-back-btn" onClick={closeEventModal}>
                  <span className="back-btn-icon">←</span>
                  <span>Back to Events</span>
                </button>

                <div className="modal-buttons">
                  <button
                    className="modal-rules-btn"
                    onClick={() =>
                      handleRulesDownload(
                        selectedEvent.rulesFile,
                        selectedEvent.title
                      )
                    }
                  >
                    <span className="rules-btn-icon">📥</span>
                    <span>Download Rules</span>
                  </button>

                  <button
                    className="modal-register-btn"
                    onClick={() =>
                      handleEventRegistration(selectedEvent.registrationLink)
                    }
                  >
                    <span>Register Now</span>
                    <span className="register-btn-icon">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`video-modal-overlay ${isVideoModalOpen ? "open" : ""}`}
        onClick={handleOverlayClick}
      >
        <div
          className="video-modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="video-modal-close"
            onClick={closeVideoModal}
            aria-label="Close video"
          >
            ✕
          </button>
          {videoUrl && (
            <iframe
              className="video-modal-iframe"
              src={videoUrl}
              title="ELECTROWIZ Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
