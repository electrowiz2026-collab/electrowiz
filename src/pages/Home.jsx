/* ============================================
   ELECTROWIZ HOME PAGE - WITH SCROLL ANIMATIONS
   Fade-in effects as you scroll
   ============================================ */

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import logo from "../assets/images/logo192.png";
import Contact from "../pages/Contact.jsx";

const Home = () => {
  const navigate = useNavigate();

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

  const techScrollRef = useRef(null);
  const nonTechScrollRef = useRef(null);
  const [techScrollProgress, setTechScrollProgress] = useState(0);
  const [nonTechScrollProgress, setNonTechScrollProgress] = useState(0);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [yearVisible, setYearVisible] = useState(false);
  const [yearMorphed, setYearMorphed] = useState(false);

  const eventDate = useMemo(() => new Date("2026-02-14T09:00:00"), []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ==================== DATA ====================
  const navItems = [
    { id: "home", label: "Home", icon: "⌂", isPage: false },
    { id: "about", label: "About", icon: "◈", isPage: false },
    { id: "events", label: "Events", icon: "◉", isPage: false },
    { id: "schedule", label: "Schedule", icon: "▤", isPage: false },
    { id: "sponsors", label: "Sponsors", icon: "★", isPage: false },
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

  const techEvents = [
    {
      id: 1,
      title: "CIRCUIT QUEST",
      category: "Technical",
      description:
        "Design and debug complex circuits under time pressure. Test your electronics knowledge and problem-solving skills.",
      icon: "⚡",
      prize: "₹15,000",
      teamSize: "2-3 members",
      duration: "3 hours",
      venue: "Lab Block A",
      registrationLink: "https://forms.google.com/your-circuit-quest-form",
      rulesFile: "/rules/circuit-quest-rules.docx",
      coordinators: [
        { name: "Rajesh Kumar", phone: "+91 98765 43210" },
        { name: "Priya Sharma", phone: "+91 98765 43211" },
      ],
      rules: [
        "Each team must have 2-3 members from the same institution",
        "Participants must bring their own calculators and stationery",
        "Use of mobile phones is strictly prohibited during the event",
        "The decision of judges will be final and binding",
        "Teams must report 30 minutes before the event starts",
        "Any form of malpractice will lead to immediate disqualification",
      ],
    },
    {
      id: 2,
      title: "CODE STORM",
      category: "Technical",
      description:
        "Competitive programming challenge with algorithmic puzzles. Solve complex problems in limited time.",
      icon: "💻",
      prize: "₹20,000",
      teamSize: "1-2 members",
      duration: "4 hours",
      venue: "Computer Lab",
      registrationLink: "https://forms.google.com/your-code-storm-form",
      rulesFile: "/rules/code-storm-rules.docx",
      coordinators: [
        { name: "Arun Prakash", phone: "+91 98765 43212" },
        { name: "Divya Nair", phone: "+91 98765 43213" },
      ],
      rules: [
        "Individual or team of 2 members allowed",
        "Languages allowed: C, C++, Java, Python",
        "Internet access will not be provided",
        "Pre-written code templates are not allowed",
        "Scoring based on accuracy and time complexity",
        "Ties will be broken by submission time",
      ],
    },
    {
      id: 3,
      title: "ROBO WARS",
      category: "Technical",
      description:
        "Build and battle robots in an ultimate showdown. Showcase your robotics engineering skills.",
      icon: "🤖",
      prize: "₹25,000",
      teamSize: "3-5 members",
      duration: "Full day",
      venue: "Main Arena",
      registrationLink: "https://forms.google.com/your-robo-wars-form",
      rulesFile: "/rules/robo-wars-rules.docx",
      coordinators: [
        { name: "Karthik Reddy", phone: "+91 98765 43214" },
        { name: "Sneha Patel", phone: "+91 98765 43215" },
      ],
      rules: [
        "Robot weight must not exceed 15kg",
        "Maximum dimensions: 50cm x 50cm x 50cm",
        "Wireless control within 2.4GHz frequency only",
        "No flammable or explosive weapons allowed",
        "Battery voltage should not exceed 24V",
        "Teams must submit robot specifications before the event",
      ],
    },
    {
      id: 4,
      title: "HACKATHON",
      category: "Technical",
      description:
        "24-hour coding marathon to build innovative solutions. Transform your ideas into reality.",
      icon: "🚀",
      prize: "₹50,000",
      teamSize: "3-4 members",
      duration: "24 hours",
      venue: "Innovation Hub",
      registrationLink: "https://forms.google.com/your-hackathon-form",
      rulesFile: "/rules/hackathon-rules.docx",
      coordinators: [
        { name: "Vikram Singh", phone: "+91 98765 43216" },
        { name: "Anjali Menon", phone: "+91 98765 43217" },
      ],
      rules: [
        "Teams of 3-4 members required",
        "Problem statements will be revealed at the start",
        "All code must be written during the hackathon",
        "Use of open-source libraries is allowed",
        "Judging based on innovation, feasibility, and presentation",
        "Working prototype must be demonstrated",
      ],
    },
    {
      id: 5,
      title: "PAPER PRESENTATION",
      category: "Technical",
      description:
        "Present your research and innovative ideas. Share knowledge on cutting-edge technologies.",
      icon: "📄",
      prize: "₹12,000",
      teamSize: "1-2 members",
      duration: "2 hours",
      venue: "Conference Hall",
      registrationLink: "https://forms.google.com/your-paper-form",
      rulesFile: "/rules/paper-presentation-rules.docx",
      coordinators: [
        { name: "Suresh Babu", phone: "+91 98765 43218" },
        { name: "Lakshmi Iyer", phone: "+91 98765 43219" },
      ],
      rules: [
        "Abstract must be submitted before the deadline",
        "Presentation time: 8 minutes + 2 minutes Q&A",
        "Topics must be related to electronics or technology",
        "Plagiarism will result in disqualification",
        "PowerPoint presentations only (max 15 slides)",
        "Papers must follow IEEE format",
      ],
    },
    {
      id: 6,
      title: "IOT CHALLENGE",
      category: "Technical",
      description:
        "Build smart IoT solutions for real-world problems. Connect devices and create intelligent systems.",
      icon: "🌐",
      prize: "₹18,000",
      teamSize: "2-3 members",
      duration: "5 hours",
      venue: "IoT Lab",
      registrationLink: "https://forms.google.com/your-iot-form",
      rulesFile: "/rules/iot-challenge-rules.docx",
      coordinators: [
        { name: "Ramesh Kumar", phone: "+91 98765 43220" },
        { name: "Kavya Reddy", phone: "+91 98765 43221" },
      ],
      rules: [
        "Basic IoT kit will be provided",
        "Additional components can be brought by teams",
        "Cloud platforms like AWS IoT, Azure allowed",
        "Solution must address the given problem statement",
        "Documentation of the project is mandatory",
        "Live demonstration required for evaluation",
      ],
    },
  ];

  const nonTechEvents = [
    {
      id: 7,
      title: "TECH QUIZ",
      category: "Non-Technical",
      description:
        "Test your knowledge across technology domains. Challenge your mind with exciting questions.",
      icon: "🧠",
      prize: "₹10,000",
      teamSize: "2 members",
      duration: "2 hours",
      venue: "Seminar Hall",
      registrationLink: "https://forms.google.com/your-quiz-form",
      rulesFile: "/rules/tech-quiz-rules.docx",
      coordinators: [
        { name: "Sanjay Gupta", phone: "+91 98765 43222" },
        { name: "Meera Krishnan", phone: "+91 98765 43223" },
      ],
      rules: [
        "Teams of exactly 2 members",
        "Three rounds: Prelims, Semi-finals, Finals",
        "Questions cover tech, science, and current affairs",
        "No electronic devices allowed",
        "Negative marking in finals only",
        "Time limit for each question will be displayed",
      ],
    },
    {
      id: 8,
      title: "TREASURE HUNT",
      category: "Non-Technical",
      description:
        "Solve clues and puzzles to find the hidden treasure. Adventure awaits across the campus!",
      icon: "🗺️",
      prize: "₹8,000",
      teamSize: "4-5 members",
      duration: "3 hours",
      venue: "Entire Campus",
      registrationLink: "https://forms.google.com/your-treasure-form",
      rulesFile: "/rules/treasure-hunt-rules.docx",
      coordinators: [
        { name: "Arjun Verma", phone: "+91 98765 43224" },
        { name: "Pooja Shah", phone: "+91 98765 43225" },
      ],
      rules: [
        "Teams of 4-5 members required",
        "All team members must stay together",
        "Clues must not be shared with other teams",
        "Running inside buildings is not allowed",
        "First team to find treasure wins",
        "Damaging college property leads to disqualification",
      ],
    },
    {
      id: 9,
      title: "PHOTOGRAPHY",
      category: "Non-Technical",
      description:
        "Capture moments with your creative lens. Show your perspective through photography.",
      icon: "📸",
      prize: "₹6,000",
      teamSize: "Individual",
      duration: "4 hours",
      venue: "Campus Wide",
      registrationLink: "https://forms.google.com/your-photo-form",
      rulesFile: "/rules/photography-rules.docx",
      coordinators: [
        { name: "Rohan Mehta", phone: "+91 98765 43226" },
        { name: "Isha Desai", phone: "+91 98765 43227" },
      ],
      rules: [
        "Individual participation only",
        "Theme will be announced on spot",
        "DSLR, mirrorless, or smartphone allowed",
        "Basic editing allowed (no heavy manipulation)",
        "Submit 3 best photographs for judging",
        "Watermarks are not allowed on submissions",
      ],
    },
    {
      id: 10,
      title: "DEBATE",
      category: "Non-Technical",
      description:
        "Voice your opinions on contemporary topics. Showcase your oratory and argumentation skills.",
      icon: "🎤",
      prize: "₹7,000",
      teamSize: "2 members",
      duration: "3 hours",
      venue: "Auditorium",
      registrationLink: "https://forms.google.com/your-debate-form",
      rulesFile: "/rules/debate-rules.docx",
      coordinators: [
        { name: "Nikhil Joshi", phone: "+91 98765 43228" },
        { name: "Swati Rao", phone: "+91 98765 43229" },
      ],
      rules: [
        "Teams of 2 (one for, one against)",
        "Topics will be given 30 minutes before",
        "Speaking time: 3 minutes per person",
        "Rebuttal time: 1 minute each",
        "English or Tamil language allowed",
        "Maintain decorum throughout the debate",
      ],
    },
    {
      id: 11,
      title: "GAMING ARENA",
      category: "Non-Technical",
      description:
        "Compete in popular esports titles. Show your gaming prowess and claim victory!",
      icon: "🎮",
      prize: "₹15,000",
      teamSize: "1-5 members",
      duration: "Full day",
      venue: "Gaming Zone",
      registrationLink: "https://forms.google.com/your-gaming-form",
      rulesFile: "/rules/gaming-rules.docx",
      coordinators: [
        { name: "Aditya Kapoor", phone: "+91 98765 43230" },
        { name: "Tanya Pillai", phone: "+91 98765 43231" },
      ],
      rules: [
        "Games: Valorant, BGMI, FIFA 24",
        "Bring your own peripherals (optional)",
        "Team size varies by game",
        "Fair play policy strictly enforced",
        "Matches streamed live on big screens",
        "Prize pool split across all games",
      ],
    },
    {
      id: 12,
      title: "MEME MAKING",
      category: "Non-Technical",
      description:
        "Create the funniest memes on given topics. Let your creativity and humor shine!",
      icon: "😂",
      prize: "₹5,000",
      teamSize: "Individual",
      duration: "2 hours",
      venue: "Digital Lab",
      registrationLink: "https://forms.google.com/your-meme-form",
      rulesFile: "/rules/meme-making-rules.docx",
      coordinators: [
        { name: "Rahul Bansal", phone: "+91 98765 43232" },
        { name: "Shreya Jain", phone: "+91 98765 43233" },
      ],
      rules: [
        "Individual participation only",
        "Topics will be given on spot",
        "Any editing software can be used",
        "Memes must be original and not copied",
        "No offensive or inappropriate content",
        "Submit minimum 5 memes for judging",
      ],
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

  const sponsors = [
    {
      tier: "Title Sponsor",
      name: "TechCorp Industries",
      logo: "🏢",
      image: null,
    },
    { tier: "Gold Sponsor", name: "InnovateTech", logo: "💎", image: null },
    { tier: "Gold Sponsor", name: "FutureSystems", logo: "🔮", image: null },
    { tier: "Silver Sponsor", name: "CodeLabs", logo: "⚙️", image: null },
    { tier: "Silver Sponsor", name: "RoboTech", logo: "🤖", image: null },
    { tier: "Silver Sponsor", name: "CircuitPro", logo: "⚡", image: null },
    { tier: "Bronze Sponsor", name: "DataDrive", logo: "💾", image: null },
    { tier: "Bronze Sponsor", name: "CloudNine", logo: "☁️", image: null },
  ];

  const scrollSponsors = [...sponsors, ...sponsors, ...sponsors];

  // ==================== SCROLL ANIMATION EFFECT ====================
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections with fade-in animation
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
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
  const handleScrollProgress = useCallback((ref, setProgress) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setProgress(Math.min(progress, 100));
    }
  }, []);

  const scrollEvents = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 370;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
    setVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1");
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
      .toLowerCase()}-rules.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEventRegistration = (registrationLink) => {
    window.open(registrationLink, "_blank", "noopener,noreferrer");
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

      {/* ==================== COLLEGE BANNER ==================== */}
      
      <br></br>
      <br></br>
      <div
        className={`college-banner ${
          isScrolled ? "college-banner-scrolled" : ""
        }`}
      >
        
        <div className="college-banner-shimmer"></div>
        <div className="college-banner-content">
          <span className="college-dot"></span>
          <span className="college-name">Velammal Engineering College</span>
          <span className="college-dot"></span>
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="hero-section">
        <div className="hero-bg">
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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

      {/* ==================== ABOUT SECTION WITH FADE-IN ==================== */}
      <section 
        id="about" 
        className="about-section"
        data-section="about"
      >
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
            <span className="section-tag">About Us</span>
          </div>

          <div className="about-grid">
            <div 
              className={`about-content fade-in-left ${
                visibleSections.has("about") ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              <p className="about-text">
                ELECTROWIZ is the flagship technical symposium organized by the
                Department of Electronics and Communication Engineering at
                Velammal Engineering College. Now in its 11th edition, we bring
                together the brightest minds from across the nation to compete,
                learn, and innovate.
              </p>
              <p className="about-text">
                Experience two days of intense competition, hands-on workshops,
                inspiring talks from industry leaders, and networking
                opportunities that could shape your future in technology.
              </p>

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
                    style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
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
                    <img src={logo} alt="ELECTROWIZ" />
                  </div>
                  <div className="card-info">
                    <span className="info-label">Established</span>
                    <span className="info-value">2015</span>
                  </div>
                  <div className="card-info">
                    <span className="info-label">Edition</span>
                    <span className="info-value">11th</span>
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

      {/* ==================== EVENTS SECTION WITH FADE-IN ==================== */}
      <section 
        id="events" 
        className="events-section"
        data-section="events"
      >
        <div className="section-container">
          <div 
            className={`section-header fade-in-up ${
              visibleSections.has("events") ? "visible" : ""
            }`}
          >
            <span className="section-tag">Competitions</span>
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
              className={`event-tab ${
                activeEventTab === "all" ? "active" : ""
              }`}
              onClick={() => setActiveEventTab("Workshop")}
            >
              <span>Workshop</span>
            </button>
          </div>
        </div>

        {/* Technical Events */}
        {(activeEventTab === "all" || activeEventTab === "tech") && (
          <div className="events-category-section">
            <div className="section-container">
              <div 
                className={`category-label fade-in-left ${
                  visibleSections.has("events") ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.3s" }}
              >
                <span className="category-indicator tech"></span>
                <span className="category-title tech">Technical Events</span>
              </div>
            </div>

            <div className="scroll-nav">
              <button
                className="scroll-nav-btn"
                onClick={() => scrollEvents(techScrollRef, "left")}
                aria-label="Scroll left"
              >
                ←
              </button>
              <div className="scroll-progress-container">
                <div
                  className="scroll-progress-bar"
                  style={{ width: `${techScrollProgress}%` }}
                ></div>
              </div>
              <button
                className="scroll-nav-btn"
                onClick={() => scrollEvents(techScrollRef, "right")}
                aria-label="Scroll right"
              >
                →
              </button>
            </div>

            <div className="events-scroll-wrapper">
              <div
                className="events-scroll-container"
                ref={techScrollRef}
                onScroll={() =>
                  handleScrollProgress(techScrollRef, setTechScrollProgress)
                }
              >
                {techEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`event-card tech-event fade-in-scale ${
                      visibleSections.has("events") ? "visible" : ""
                    }`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      transitionDelay: `${0.4 + index * 0.1}s`
                    }}
                  >
                    <div className="event-card-bg"></div>
                    <div className="event-card-content">
                      <div className="event-icon">{event.icon}</div>
                      <span className="event-category">{event.category}</span>
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-description">{event.description}</p>
                      <div className="event-footer">
                        <div className="event-prize">
                          <span className="prize-label">Prize Pool</span>
                          <span className="prize-value">{event.prize}</span>
                        </div>
                        <button
                          className="event-btn"
                          onClick={() => openEventModal(event)}
                        >
                          Learn More
                          <span className="btn-arrow">→</span>
                        </button>
                      </div>
                    </div>
                    <div className="event-card-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Non-Technical Events */}
        {(activeEventTab === "all" || activeEventTab === "nontech") && (
          <div className="events-category-section">
            <div className="section-container">
              <div 
                className={`category-label fade-in-left ${
                  visibleSections.has("events") ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.3s" }}
              >
                <span className="category-indicator nontech"></span>
                <span className="category-title nontech">
                  Non-Technical Events
                </span>
              </div>
            </div>

            <div className="scroll-nav">
              <button
                className="scroll-nav-btn"
                onClick={() => scrollEvents(nonTechScrollRef, "left")}
                aria-label="Scroll left"
              >
                ←
              </button>
              <div className="scroll-progress-container">
                <div
                  className="scroll-progress-bar"
                  style={{ width: `${nonTechScrollProgress}%` }}
                ></div>
              </div>
              <button
                className="scroll-nav-btn"
                onClick={() => scrollEvents(nonTechScrollRef, "right")}
                aria-label="Scroll right"
              >
                →
              </button>
            </div>

            <div className="events-scroll-wrapper">
              <div
                className="events-scroll-container"
                ref={nonTechScrollRef}
                onScroll={() =>
                  handleScrollProgress(
                    nonTechScrollRef,
                    setNonTechScrollProgress
                  )
                }
              >
                {nonTechEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`event-card nontech-event fade-in-scale ${
                      visibleSections.has("events") ? "visible" : ""
                    }`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      transitionDelay: `${0.4 + index * 0.1}s`
                    }}
                  >
                    <div className="event-card-bg"></div>
                    <div className="event-card-content">
                      <div className="event-icon">{event.icon}</div>
                      <span className="event-category">{event.category}</span>
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-description">{event.description}</p>
                      <div className="event-footer">
                        <div className="event-prize">
                          <span className="prize-label">Prize Pool</span>
                          <span className="prize-value">{event.prize}</span>
                        </div>
                        <button
                          className="event-btn"
                          onClick={() => openEventModal(event)}
                        >
                          Learn More
                          <span className="btn-arrow">→</span>
                        </button>
                      </div>
                    </div>
                    <div className="event-card-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="section-container">
          <div 
            className={`events-cta fade-in-up ${
              visibleSections.has("events") ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <button
              className="view-all-btn"
              onClick={() => setActiveEventTab("all")}
            >
              <span>View All Events</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================== SCHEDULE SECTION WITH FADE-IN ==================== */}
      <section 
        id="schedule" 
        className="schedule-section"
        data-section="schedule"
      >
        <div className="section-container">
          <div 
            className={`section-header fade-in-up ${
              visibleSections.has("schedule") ? "visible" : ""
            }`}
          >
            <span className="section-tag">Timeline</span>
            <h2 className="section-title">
              Event <span className="highlight">Schedule</span>
            </h2>
            <div className="section-line"></div>
          </div>

          <div className="schedule-tabs">
            {schedule.map((day, index) => (
              <div 
                key={index} 
                className={`schedule-day fade-in-up ${
                  visibleSections.has("schedule") ? "visible" : ""
                }`}
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="day-header">
                  <h3 className="day-title">{day.day}</h3>
                  <span className="day-date">{day.date}</span>
                </div>
                <div className="timeline">
                  {day.events.map((event, eventIndex) => (
                    <div 
                      key={eventIndex} 
                      className={`timeline-item fade-in-left ${
                        visibleSections.has("schedule") ? "visible" : ""
                      }`}
                      style={{ transitionDelay: `${0.3 + eventIndex * 0.05}s` }}
                    >
                      <div className="timeline-marker">
                        <div className="marker-dot"></div>
                        <div className="marker-line"></div>
                      </div>
                      <div className="timeline-content">
                        <span className="timeline-time">{event.time}</span>
                        <h4 className="timeline-title">{event.title}</h4>
                        <span className="timeline-venue">
                          <span className="venue-icon">📍</span>
                          {event.venue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GALLERY SECTION WITH FADE-IN ==================== */}
      <section 
        id="gallery" 
        className="gallery-section"
        data-section="gallery"
      >
        <div className="section-container">
          <div 
            className={`section-header fade-in-up ${
              visibleSections.has("gallery") ? "visible" : ""
            }`}
          >
            <span className="section-tag">Memories</span>
            <h2 className="section-title">
              Event <span className="highlight">Gallery</span>
            </h2>
            <div className="section-line"></div>
          </div>

          <div className="gallery-collage">
            {[
              { img: "img1.jpg", text: "Robo Wars 2025", class: "gallery-large" },
              { img: "img2.jpg", text: "Hackathon", class: "gallery-small" },
              { img: "img3.jpg", text: "Tech Quiz", class: "gallery-small" },
              { img: "img4.jpg", text: "Code Storm", class: "gallery-medium" },
              { img: "img5.jpg", text: "Inauguration", class: "gallery-small" },
              { img: "img6.jpg", text: "Prize Distribution", class: "gallery-large" },
              { img: "img7.jpg", text: "Workshop", class: "gallery-small" },
              { img: "img8.jpg", text: "Gaming Arena", class: "gallery-medium" },
            ].map((item, index) => (
              <div
                key={index}
                className={`gallery-item ${item.class} fade-in-scale ${
                  visibleSections.has("gallery") ? "visible" : ""
                }`}
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="gallery-image">
                  <img src={`/gallery/${item.img}`} alt={`Electrowiz Event ${index + 1}`} />
                  <div className="gallery-overlay">
                    <span className="gallery-icon">🔍</span>
                    <span className="gallery-text">{item.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SPONSORS SECTION WITH FADE-IN ==================== */}
      <section 
        id="sponsors" 
        className="sponsors-section"
        data-section="sponsors"
      >
        <div className="section-container">
          <div 
            className={`section-header fade-in-up ${
              visibleSections.has("sponsors") ? "visible" : ""
            }`}
          >
            <span className="section-tag">Partners</span>
            <h2 className="section-title">
              Our <span className="highlight">Sponsors</span>
            </h2>
            <div className="section-line"></div>
          </div>
        </div>

        <div className="sponsors-scroll-wrapper">
          <div className="sponsors-scroll-track">
            {scrollSponsors.map((sponsor, index) => (
              <div key={index} className="sponsor-scroll-item">
                {sponsor.image ? (
                  <img src={sponsor.image} alt={sponsor.name} />
                ) : (
                  <span className="sponsor-scroll-logo">{sponsor.logo}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="section-container">
          <div className="sponsors-grid">
            {sponsors.slice(0, 6).map((sponsor, index) => (
              <div
                key={index}
                className={`sponsor-card ${
                  sponsor.tier === "Title Sponsor" ? "title-sponsor" : ""
                } fade-in-scale ${
                  visibleSections.has("sponsors") ? "visible" : ""
                }`}
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="sponsor-tier">{sponsor.tier}</div>
                <div className="sponsor-logo">{sponsor.logo}</div>
                <div className="sponsor-name">{sponsor.name}</div>
              </div>
            ))}
          </div>

          <div 
            className={`sponsor-cta fade-in-up ${
              visibleSections.has("sponsors") ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.8s" }}
          >
            <p>Interested in sponsoring ELECTROWIZ 2026?</p>
            <button className="sponsor-btn">Become a Sponsor</button>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION WITH FADE-IN ==================== */}
      <section 
        id="contact" 
        className="contact-section"
        data-section="contact"
      >
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
                  lines: ["+91 98765 43210", "+91 98765 43211"],
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
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

      {/* ==================== FAQ SECTION WITH FADE-IN ==================== */}
      <div 
        className="section-container faq-section"
        data-section="faq"
      >
        <h2 
          className={`section-title animated-title fade-in-up ${
            visibleSections.has("faq") ? "visible" : ""
          }`}
        >
          Frequently Asked Questions
        </h2>
        <br />
        <br />
        {[
          {
            q: "Who can participate?",
            a: "Students from all colleges can participate in Electrowiz'26.",
          },
          {
            q: "Is there any registration fee?",
            a: "Registration details will be announced soon.",
          },
          {
            q: "How do I register?",
            a: "You can register through the Register button available on the website.",
          },
          {
            q: "Is the workshop open to all branches?",
            a: "Yes, the Generative AI workshop is open to students from all branches.",
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
                {["home", "about", "events", "schedule", "coordinators", "contact"].map(
                  (link) => (
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
                  )
                )}
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
                <li>
                  <a href="#events">Hackathon</a>
                </li>
                <li>
                  <a href="#events">Guest Lectures</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              © 2026 ELECTROWIZ - Velammal Engineering College. All rights
              reserved.
            </p>
            <p className="credits">Made with ⚡ by ECE Department</p>
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
              <span className="modal-event-icon">{selectedEvent.icon}</span>
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
                  <span className="detail-value">{selectedEvent.teamSize}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{selectedEvent.duration}</span>
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