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
import sponsor1 from "../assets/images/vecc.png";
import sponsor2 from "../assets/images/square.jpeg";

import guestAnandhakrishnan from "../assets/images/guest.jpeg";
import wiproLogo from "../assets/images/jj.png"; // Optional: Add Wipro logo
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
const handleInvitationDownload = async () => {
  const invitationFile = "/rulz/Invitation.pdf";
  
  // Create toast notification
  const toast = document.createElement('div');
  toast.textContent = '⏳ Preparing download...';
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00f5ff, #ff00ff);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 4px 15px rgba(0, 245, 255, 0.3);
  `;
  document.body.appendChild(toast);

  try {
    const response = await fetch(invitationFile);
    if (!response.ok) throw new Error('File not found');
    
    toast.textContent = '📥 Downloading...';
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "ELECTROWIZ-26-Invitation.pdf";
    document.body.appendChild(link);
    link.click();
    
    toast.textContent = '✅ Download Complete!';
    toast.style.background = 'linear-gradient(135deg, #00ff88, #00f5ff)';
    
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      document.body.removeChild(toast);
    }, 2000);
    
  } catch (error) {
    toast.textContent = '❌ Failed - Opening in new tab...';
    toast.style.background = 'linear-gradient(135deg, #ff4444, #ff00ff)';
    setTimeout(() => document.body.removeChild(toast), 2000);
    window.open(invitationFile, "_blank");
  }
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
      venue: "Vivekananda Block (VB) 241, II Floor",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/sparkix.pdf",
      coordinators: [
        { name: "Madhumithra M", phone: "+91 73059 48188" },
        { name: "Srinivasan V", phone: "+91 93618 89276" },
      ],
      rules: ["Click Download Rules below"],
    },
    {
      id: 2,
      title: "ElectraXpo",
      category: "Technical",
      description:
        "ElectraXpo offers a platform for students to showcase innovative solutions and working models that address real-world engineering challenges",
      posterUrl: elec,
      prize: "₹2,000",
      teamSize: "2-3 members",
      duration: "5-7 mins (per presentation)",
      venue: "Electronics Lab",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/ELECTRAXPO_.pdf",
      coordinators: [
        { name: "Naveen Prakash", phone: "+91 96002 89904" },
        { name: "Rini Rayan", phone: "+91 63824 87338" },
        { name: "Eswararaju Sneha", phone: "+91 80960 06118" },
      ],
      rules: ["Click Download Rules below"],
    },
    {
      id: 3,
      title: "THINK A THON",
      category: "Technical",
      description:
        "Think fast. Answer smart prove you're the sharpest mind in the room.",
      posterUrl: think,
      prize: "₹2,000",
      teamSize: "1-2 members",
      duration: "2 hours",
      venue: "Vivekananda Block (VB) 353, 354, III Floor",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/think.pdf",
      coordinators: [
        { name: "KAVIYARASAN S", phone: "+91 84894 91386" },
        { name: "VENDAMANI K", phone: "+91 93849 95398" },
      ],
      rules: ["Click Download Rules below"],
    },
    {
      id: 4,
      title: "ERROR 404",
      category: "Technical",
      description:
        "Error 404 is a competitive technical event that tests participants' logical reasoning and coding skills.",
      posterUrl: error,
      prize: "₹2,000",
      teamSize: "2 members",
      duration: "3 hours",
      venue: "Advance Electronics Lab",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/error.pdf",
      coordinators: [
        { name: "Harish.S", phone: "+91 63790 04185" },
        { name: "Sushmitha", phone: "+91 74183 36138" },
      ],
      rules: ["Click Download Rules below"],
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
      venue: "Vivekananda Block (VB) 234, 235, II Floor",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/sound__rule.pdf",
      coordinators: [
        { name: "JEEVATH M", phone: "+91 63833 00579" },
        { name: "ANJALI B", phone: "+91 63834 65759" },
      ],
      rules: ["Click Download Rules below"],
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
      venue: "Vivekananda Block (VB) 239, 240, II Floor",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/CLUE CONNECT.pdf",
      coordinators: [
        { name: "Barath", phone: "+91 98402 75886" },
        { name: "Akshitha", phone: "+91 63740 16868" },
      ],
      rules: ["Click Download Rules below"],
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
      venue: "Vivekananda Block (VB) 236, 237, II Floor",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/Mind Maze.pdf",
      coordinators: [
        { name: "Dhiyanesh", phone: "+91 94442 54917" },
        { name: "Swedha P S", phone: "+91 63827 32250" },
      ],
      rules: ["Click Download Rules below"],
    },
    {
      id: 10,
      title: "DREAM XI",
      category: "Non-Technical",
      description:
        "DREAM11 is a IPL-themed team event designed to test participants' IPL knowledge, decision-making, and strategic team-building skills.",
      posterUrl: dream,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "3 hours",
      venue: "Mechanical Seminar Hall",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/dream 11.pdf",
      coordinators: [
        { name: "Anshul S A", phone: "+91 63792 80210" },
        { name: "Santhosh S", phone: "+91 90258 56034" },
      ],
      rules: ["Click Download Rules below"],
    },
    {
      id: 11,
      title: "PIXEL PERFECT",
      category: "Non-Technical",
      description:
        "Pixel Perfect is a creative event that tests participants' visual accuracy and attention to detail.",
      posterUrl: pixel,
      prize: "₹2,000",
      teamSize: "2-4 members",
      duration: "3 hrs",
      venue: "IC LAB",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/pixelperfect.pdf",
      coordinators: [
        { name: "Logesh G", phone: "+91 90250 09593" },
        { name: "Santhosh S", phone: "+91 90258 56034" },
      ],
      rules: ["Click the button --> Download Rules below"],
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
      venue: "Vivekananda Block (VB) 350, 351, III Floor",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/FREEFIRE.pdf",
      coordinators: [
        { name: "Prasanth M", phone: "+91 90924 79171" },
        { name: "Kaviarasan N", phone: "+91 84894 91386" },
      ],
      rules: ["Click Download Rules below"],
    },
    {
      id: 13,
      title: "Exploring Agentic Behaviour through Language Models and NLP",
      category: "Workshop",
      description:
        "Hands-on workshop on Artificial Intelligence and Machine Learning. Learn to build intelligent systems with industry experts.",
      posterUrl: ai,
      prize: "Certificate & Goodies",
      teamSize: "Individual",
      duration: "2-3 hours",
      venue: "Vivekananda Hall",
      registrationLink: "https://forms.gle/tTJELcTobbm8WKuB9",
      rulesFile: "/rulz/Generative AI(Workshop).pdf",
      coordinators: [
        { name: "Varshini", phone: "+91 94880 56400" },
        { name: "Kaviya", phone: "+91 84382 35267" },
      ],
      rules: ["Click the button --> Download Rules below"],
    },
  ];
  
 const schedule = [
    {
      day: "Day 1",
      date: "Feb 14, 2026",
      events: [
        {
          time: "08:15 AM",
          title: "Registration",
          venue: "Vivekananda Hall",
        },
        {
          time: "09:30 AM",
          title: "Invocation",
          venue: "",
        },
        {
          time: "09:32 AM",
          title: "Lighting of Kuthuvilakku",
          venue: "",
        },
        {
          time: "09:35 AM",
          title: "Welcome Address",
          venue: "",
        },
        {
          time: "09:45 AM",
          title: "Felicitation",
          venue: "",
        },
        {
          time: "09:50 AM",
          title: "Presidential Address",
          venue: "",
        },
        {
          time: "09:55 AM",
          title: "Release of Souvenir & Digimail",
          venue: "",
        },
        {
          time: "10:00 AM",
          title: "Inaugural Address",
          venue: "",
        },
        {
          time: "10:30 AM",
          title: "Electrowiz'26 Video Presentation",
          venue: "",
        },
        {
          time: "10:35 AM",
          title: "Vote of Thanks",
          venue: "",
        },
        {
          time: "10:45 AM",
          title: "Commencement of Events",
          venue: "Respective Venues",
        },
        {
          time: "01:00 PM",
          title: "Lunch Break",
          venue: "Canteen / Dining Area",
        },
        {
          time: "02:00 PM",
          title: "Prize & Certificate Distribution",
          venue: "Vivekananda Hall",
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

const handleRulesDownload = async (rulesFile, eventTitle) => {
  // Create toast with "Starting download..." message first
  const downloadingToast = document.createElement('div');
  downloadingToast.className = 'download-toast';
  downloadingToast.textContent = '⏳ Starting download...'; // ← Changed: Show this FIRST
  downloadingToast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00f5ff, #ff00ff);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 245, 255, 0.3);
  `;
  document.body.appendChild(downloadingToast);

  try {
    const response = await fetch(rulesFile);
    
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    
    // Update toast to show "Downloading..." while fetching blob
    downloadingToast.textContent = '📥 Downloading...'; // ← Changed: Show this SECOND
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${eventTitle.replace(/\s+/g, "-").toLowerCase()}-rules.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Update toast to show success
    downloadingToast.textContent = '✅ Download Complete!'; // ← Changed: Show this LAST
    downloadingToast.style.background = 'linear-gradient(135deg, #00ff88, #00f5ff)';
    
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      if (document.body.contains(downloadingToast)) {
        document.body.removeChild(downloadingToast);
      }
    }, 2500);
    
  } catch (error) {
    console.error('Download failed:', error);
    downloadingToast.textContent = '❌ Download Failed - Opening in new tab...';
    downloadingToast.style.background = 'linear-gradient(135deg, #ff4444, #ff00ff)';
    
    setTimeout(() => {
      if (document.body.contains(downloadingToast)) {
        document.body.removeChild(downloadingToast);
      }
    }, 2000);
    
    // Fallback: open in new tab
    window.open(rulesFile, "_blank");
  }
};
  const handleEventRegistration = (registrationLink) => {
  if (registrationLink) {
    window.open(registrationLink, "_blank", "noopener,noreferrer");
  } else {
    console.error("Registration link not found");
  }
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
      {/* ==================== EVENT CONCLUDED SECTION ==================== */}
<section id="event-concluded" className="event-concluded-section">
  <div className="concluded-bg">
    <div className="concluded-particles">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="concluded-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
    <div className="concluded-gradient"></div>
    <div className="concluded-grid"></div>
  </div>

  <div className="concluded-content">
    <div className="concluded-badge">
      <span className="badge-icon">✨</span>
      <span className="badge-text">February 14, 2026</span>
    </div>

    <div className="concluded-main-title">
      <h1 className="concluded-heading">
        <span className="title-line">ELECTROWIZ'26</span>
        <span className="title-highlight">HAS CONCLUDED</span>
      </h1>
    </div>

    <p className="concluded-message">
      Thank you to all participants, coordinators, sponsors, and everyone who made this event a grand success!
    </p>

    <div className="concluded-stats">
      <div className="concluded-stat-item">
        <div className="stat-icon">🎯</div>
        <div className="stat-number">11+</div>
        <div className="stat-label">Events Conducted</div>
      </div>
      <div className="concluded-stat-divider"></div>
      <div className="concluded-stat-item">
        <div className="stat-icon">👥</div>
        <div className="stat-number">400+</div>
        <div className="stat-label">Participants</div>
      </div>
      <div className="concluded-stat-divider"></div>
      <div className="concluded-stat-item">
        <div className="stat-icon">🏆</div>
        <div className="stat-number">₹1L+</div>
        <div className="stat-label">Prizes Distributed</div>
      </div>
      <div className="concluded-stat-divider"></div>
      <div className="concluded-stat-item">
        <div className="stat-icon">🎓</div>
        <div className="stat-number">100+</div>
        <div className="stat-label">Colleges Participated</div>
      </div>
    </div>

    <div className="concluded-actions">
      <button 
        className="concluded-btn primary-btn"
        onClick={() => scrollToSection("gallery")}
      >
        <span className="btn-icon">📸</span>
        <span className="btn-text">View Gallery</span>
      </button>
      <button 
        className="concluded-btn secondary-btn"
        onClick={() => scrollToSection("winners")}
      >
        <span className="btn-icon">🏆</span>
        <span className="btn-text">See Winners</span>
      </button>
    </div>

    <div className="concluded-teaser">
      <div className="teaser-glow"></div>
      <div className="teaser-content">
        <span className="teaser-icon">🚀</span>
        <div className="teaser-text">
          <h3>ELECTROWIZ'27</h3>
          <p>Coming Soon - Stay Tuned!</p>
        </div>
        <a 
          href="https://www.instagram.com/electrowiz.26" 
          target="_blank" 
          rel="noopener noreferrer"
          className="teaser-follow-btn"
        >
          Follow for Updates
        </a>
      </div>
    </div>

    <div className="concluded-scroll-indicator" onClick={() => scrollToSection("about")}>
      <span className="scroll-text">Explore for the Website reference</span>
      <div className="scroll-arrow">
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</section>

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
             <span className="scroll-tex">On-spot Registration Availabe(Cash ony)</span>
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
      {/* ==================== CHIEF GUEST SECTION ==================== */}
<section id="guests" className="guests-section" data-section="guests">
  <div className="section-container">
    <div
      className={`section-header fade-in-up ${
        visibleSections.has("guests") ? "visible" : ""
      }`}
    >
      <span className="section-tag">Honoring Our Distinguished Guest</span>
      <h2 className="section-title">
        Chief <span className="highlight">Guest</span>
      </h2>
      <div className="section-line"></div>
    </div>

    <div
      className={`chief-guest-card fade-in-up ${
        visibleSections.has("guests") ? "visible" : ""
      }`}
      style={{ transitionDelay: "0.2s" }}
    >
      {/* Left: Image Section */}
      <div className="guest-image-section">
        <div className="guest-image-wrapper">
          <img
            src={guestAnandhakrishnan}
            alt="Anandhakrishnan Devaraj"
            className="guest-photo"
          />
          <div className="image-accent"></div>
        </div>
      </div>

      {/* Right: Details Section */}
      <div className="guest-details-section">
        <div className="guest-role-badge">
          <span className="role-icon">★</span>
          <span>Chief Guest</span>
        </div>

        <h3 className="guest-full-name">Anandhakrishnan Devaraj</h3>

        <div className="guest-designation">
          <h4 className="designation-title">National Head – NGA Engineering Hiring</h4>
          <p className="designation-subtitle">Global Campus Hiring Team</p>
        </div>

        <div className="guest-organization">
  <div className="org-logo">
    <img 
      src={wiproLogo} 
      alt="Wipro Logo" 
      className="wipro-logo"
    />
  </div>

  <div className="org-details">
    <span className="org-name">Wipro Limited</span>
    <span className="org-type">Fortune 500 Global IT Company</span>
  </div>
</div>


        <div className="guest-expertise">
          <div className="expertise-item">
            <span className="expertise-icon">🎯</span>
            <div className="expertise-content">
              <span className="expertise-label">Expertise</span>
              <span className="expertise-value">Talent Acquisition & Campus Hiring</span>
            </div>
          </div>
         
        </div>

        <div className="guest-actions">
          <a
            href="https://www.linkedin.com/in/anandhakrishnandevaraj?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-connect-btn"
          >
            <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </div>

    {/* Quote Section */}
    <div
      className={`guest-quote-section fade-in-up ${
        visibleSections.has("guests") ? "visible" : ""
      }`}
      style={{ transitionDelay: "0.4s" }}
    >
      <div className="quote-marks">"</div>
      <blockquote className="guest-quote">
        We are honored to have Mr. Anandhakrishnan Devaraj grace ELECTROWIZ'26 as our 
        Chief Guest, inspiring the next generation of engineers and innovators.
      </blockquote>
      <div className="quote-author">— ELECTROWIZ Organizing Committee</div>
    </div>
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
      {/* ==================== INVITATION CARD SECTION ==================== */}
<section id="invitation" className="invitation-section" data-section="invitation">
  <div className="section-container">
    <div
      className={`section-header fade-in-up ${
        visibleSections.has("invitation") ? "visible" : ""
      }`}
    >
      <span className="section-tag">Event Guidelines</span>
      <h2 className="section-title">
        Invitation <span className="highlight">Card</span>
      </h2>
      <div className="section-line"></div>
    </div>

    <div
      className={`invitation-card-container fade-in-up ${
        visibleSections.has("invitation") ? "visible" : ""
      }`}
      style={{ transitionDelay: "0.2s" }}
    >
      <div className="invitation-card-main">
        {/* Card Header */}
        <div className="invitation-header">
          <div className="invitation-logo">
            <img src={logo} alt="ELECTROWIZ" />
          </div>
          <div className="invitation-title-block">
            <h3>ELECTROWIZ'26</h3>
            <p>Official Invitation Card</p>
          </div>
          <div className="invitation-date-block">
            <span className="date-day">14</span>
            <span className="date-month">FEB</span>
            <span className="date-year">2026</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="invitation-body">
          {/* Do's Section */}
          <div className="invitation-block dos-block">
            <h4><span className="block-icon">✅</span> Do's</h4>
            <ul>
              <li>Carry valid College ID card</li>
              <li>Arrive 30 mins before events</li>
              <li>Follow dress code (Formal)</li>
              <li>Maintain decorum</li>
              <li>Respect coordinators & judges</li>
            </ul>
          </div>

          {/* Don'ts Section */}
          <div className="invitation-block donts-block">
            <h4><span className="block-icon">❌</span> Don'ts</h4>
            <ul>
              <li>No unfair means or plagiarism</li>
              <li>No entry without registration</li>
              <li>No disruption during events</li>
              <li>No arguments with judges</li>
              <li>No damage to property</li>
            </ul>
          </div>

          {/* Agenda Section */}
         

        </div>

        {/* Card Footer with Download Button */}
        <div className="invitation-footer">
          <div className="venue-info">
            <span className="venue-icon">📍</span>
            <span>Velammal Engineering College, Chennai</span>
          </div>
          
          <button
            className="invitation-download-btn"
            onClick={() => handleInvitationDownload()}
          >
            <span className="download-icon">📥</span>
            <span className="download-text">Download Invitation</span>
            <span className="download-format">PDF</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ==================== WHATSAPP GROUP SECTION ==================== */}
<section id="whatsapp" className="whatsapp-section" data-section="whatsapp">
  <div className="section-container">
    <div
      className={`section-header fade-in-up ${
        visibleSections.has("whatsapp") ? "visible" : ""
      }`}
    >
      <span className="section-tag">Stay Connected</span>
      <h2 className="section-title">
        Join Our <span className="highlight">WhatsApp Group</span>
      </h2>
      <div className="section-line"></div>
    </div>

    <div
      className={`whatsapp-card fade-in-up ${
        visibleSections.has("whatsapp") ? "visible" : ""
      }`}
      style={{ transitionDelay: "0.2s" }}
    >
      <div className="whatsapp-card-inner">
        <div className="whatsapp-icon-box">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>

        <div className="whatsapp-content">
          <h3>ELECTROWIZ'26 Committee</h3>
          <p>Join our official WhatsApp group for live updates, event notifications, and direct support from coordinators.</p>
          
          <div className="whatsapp-benefits">
            <span>📢 Live Updates</span>
            <span>💬 Direct Support</span>
            <span>👥 500+ Members</span>
          </div>
        </div>

        <a
          href="https://chat.whatsapp.com/EUdoVbEkspH9fpHHRMO1mE"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-join-btn"
        >
          <span>Join WhatsApp Group</span>
          <span className="btn-arrow">→</span>
        </a>
      </div>
    </div>
  </div>
</section>
      {/* ==================== SCHEDULE SECTION ==================== */}
<section id="schedule" className="schedule-section" data-section="schedule">
  <div className="section-container">
    <div
      className={`section-header fade-in-up ${
        visibleSections.has("schedule") ? "visible" : ""
      }`}
    >
      <span className="section-tag">Event Timeline</span>
      <h2 className="section-title">
        Event <span className="highlight">Schedule</span>
      </h2>
      <div className="section-line"></div>
    </div>

    <div className="schedule-container">
      {schedule.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className={`schedule-day fade-in-up ${
            visibleSections.has("schedule") ? "visible" : ""
          }`}
          style={{ transitionDelay: `${0.2 + dayIndex * 0.1}s` }}
        >
          <div className="schedule-day-header">
            <h3 className="schedule-day-title">{day.day}</h3>
            <span className="schedule-day-date">{day.date}</span>
          </div>

          <div className="schedule-timeline">
            {day.events.map((event, eventIndex) => (
              <div
                key={eventIndex}
                className={`schedule-item fade-in-up ${
                  visibleSections.has("schedule") ? "visible" : ""
                }`}
                style={{ transitionDelay: `${0.3 + eventIndex * 0.05}s` }}
              >
                <div className="schedule-time">
                  <span className="time-dot"></span>
                  <span className="time-text">{event.time}</span>
                </div>
                <div className="schedule-content">
                  <h4 className="schedule-event-title">{event.title}</h4>
                  {event.venue && (
                    <p className="schedule-venue">
                      <span className="venue-icon">📍</span>
                      {event.venue}
                    </p>
                  )}
                </div>
              </div>
            ))}
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
                a: "Registration fee ₹150(Individual) + Additional ₹100(WORKSHOP IF ATTENDED))",
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
     {/* ==================== SPONSORS SECTION ==================== */}
<section id="sponsors" className="sponsors-section" data-section="sponsors">
  <div className="section-container">
    <div
      className={`section-header fade-in-up ${
        visibleSections.has("sponsors") ? "visible" : ""
      }`}
    >
      <span className="section-tag">Our Partners</span>
      <h2 className="section-title">
        <span className="highlight">Sponsors</span>
      </h2>
      <div className="section-line"></div>
    </div>

    <div className="sponsors-grid">
      {/* Sponsor 1 */}
      <a
        href="https://velammal.edu.in"
        target="_blank"
        rel="noopener noreferrer"
        className={`sponsor-card fade-in-up ${
          visibleSections.has("sponsors") ? "visible" : ""
        }`}
        style={{ transitionDelay: "0.2s" }}
      >
        <div className="sponsor-card-inner">
          <div className="sponsor-glow"></div>
          <div className="sponsor-image-wrapper">
            <img
              src={sponsor1}
              alt="Sponsor 1"
              className="sponsor-image"
            />
          </div>
          
        </div>
       
      </a>

      {/* Sponsor 2 */}
      <a
        href="https://www.squarebrothers.in"
        target="_blank"
        rel="noopener noreferrer"
        className={`sponsor-card fade-in-up ${
          visibleSections.has("sponsors") ? "visible" : ""
        }`}
        style={{ transitionDelay: "0.4s" }}
      >
        <div className="sponsor-card-inner">
          <div className="sponsor-glow"></div>
          <div className="sponsor-image-wrapper">
            <img
              src={sponsor2}
              alt="Sponsor 2"
              className="sponsor-image"
            />
          </div>
          
        </div>
       
      </a>
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
