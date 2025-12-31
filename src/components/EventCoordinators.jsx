/* ============================================
   EVENT COORDINATORS PAGE - COMPLETE
   Faculty, Overall & Event Coordinators
   ============================================ */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/eventCoordinators.css";
import logo from "../assets/images/logo192.png";

const EventCoordinators = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ==================== FACULTY COORDINATORS ====================
  const facultyCoordinators = [
    {
      name: "Dr. R. Kalpana",
      role: "Head of Department",
      department: "ECE Department",
      phone: "+91 98765 43100",
      email: "hod.ece@velammal.edu.in",
      qualification: "Ph.D., M.E.",
      specialization: "VLSI Design & Embedded Systems",
    },
    {
      name: "Dr. S. Rajendran",
      role: "Chief Faculty Coordinator",
      department: "ECE Department",
      phone: "+91 98765 43101",
      email: "rajendran@velammal.edu.in",
      qualification: "Ph.D., M.Tech",
      specialization: "Signal Processing & Communications",
    },
    {
      name: "Prof. M. Lakshmi",
      role: "Senior Faculty Coordinator",
      department: "ECE Department",
      phone: "+91 98765 43102",
      email: "lakshmi.m@velammal.edu.in",
      qualification: "M.E., B.E.",
      specialization: "Wireless Communication",
    },
    {
      name: "Dr. K. Venkatesh",
      role: "Faculty Coordinator - Technical",
      department: "ECE Department",
      phone: "+91 98765 43103",
      email: "venkatesh.k@velammal.edu.in",
      qualification: "Ph.D., M.Tech",
      specialization: "Microelectronics & IoT",
    },
    {
      name: "Prof. A. Priya",
      role: "Faculty Coordinator - Non-Technical",
      department: "ECE Department",
      phone: "+91 98765 43104",
      email: "priya.a@velammal.edu.in",
      qualification: "M.E., B.Tech",
      specialization: "Digital Communications",
    },
    {
      name: "Dr. N. Ramesh",
      role: "Workshop Coordinator",
      department: "ECE Department",
      phone: "+91 98765 43105",
      email: "ramesh.n@velammal.edu.in",
      qualification: "Ph.D., M.E.",
      specialization: "AI & Machine Learning",
    },
  ];

  // ==================== OVERALL STUDENT COORDINATORS ====================
  const overallCoordinators = [
    {
      name: "Harish Kumar S",
      role: "Overall Student Coordinator",
      department: "Final Year ECE",
      phone: "+91 98765 43202",
      email: "harish.student@velammal.edu.in",
      year: "IV Year",
      responsibility: "Event Management & Logistics",
    },
    {
      name: "Priyanka Nair R",
      role: "Overall Co-Coordinator",
      department: "Final Year ECE",
      phone: "+91 98765 43203",
      email: "priyanka.student@velammal.edu.in",
      year: "IV Year",
      responsibility: "Participant Relations & Registration",
    },
    {
      name: "Aravind Kumar M",
      role: "Technical Head",
      department: "Final Year ECE",
      phone: "+91 98765 43204",
      email: "aravind.tech@velammal.edu.in",
      year: "IV Year",
      responsibility: "Technical Events Coordination",
    },
    {
      name: "Divya Lakshmi K",
      role: "Non-Technical Head",
      department: "Final Year ECE",
      phone: "+91 98765 43205",
      email: "divya.nontech@velammal.edu.in",
      year: "IV Year",
      responsibility: "Cultural & Non-Tech Events",
    },
    {
      name: "Karthik Prasad V",
      role: "Sponsorship Head",
      department: "Final Year ECE",
      phone: "+91 98765 43206",
      email: "karthik.sponsor@velammal.edu.in",
      year: "IV Year",
      responsibility: "Sponsorship & Marketing",
    },
    {
      name: "Sneha Reddy P",
      role: "Design & Media Head",
      department: "Final Year ECE",
      phone: "+91 98765 43207",
      email: "sneha.media@velammal.edu.in",
      year: "IV Year",
      responsibility: "Design, Social Media & Publicity",
    },
  ];

  // ==================== EVENT COORDINATORS DATA ====================
  const coordinatorsData = [
    // Technical Events
    {
      eventTitle: "SPARKX",
      eventIcon: "✨",
      category: "Technical",
      coordinators: [
        {
          name: "Srinivasan V",
          role: "Lead Coordinator",
          phone: "+91 93618 89276",
          email: "srinivasan@velammal.edu.in",
        },
        {
          name: "Madhumithra M",
          role: "Co-Coordinator",
          phone: "+91 93618 89277",
          email: "madhumithra@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "ElectraXpo",
      eventIcon: "💡",
      category: "Technical",
      coordinators: [
        {
          name: "Naveen Prakash",
          role: "Lead Coordinator",
          phone: "+91 96002 89904",
          email: "naveen@velammal.edu.in",
        },
        {
          name: "Rini Rayan",
          role: "Co-Coordinator",
          phone: "+91 63824 87338",
          email: "rini@velammal.edu.in",
        },
        {
          name: "Eswararaju Sneha",
          role: "Co-Coordinator",
          phone: "+91 80960 06118",
          email: "sneha.e@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "THINK A THON",
      eventIcon: "🧠",
      category: "Technical",
      coordinators: [
        {
          name: "Kaviyarasan S",
          role: "Lead Coordinator",
          phone: "+91 84894 91386",
          email: "kaviyarasan@velammal.edu.in",
        },
        {
          name: "Vendamani K",
          role: "Co-Coordinator",
          phone: "+91 93849 95398",
          email: "vendamani@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "ERROR 404",
      eventIcon: "🐛",
      category: "Technical",
      coordinators: [
        {
          name: "Harish S",
          role: "Lead Coordinator",
          phone: "+91 63790 04185",
          email: "harish.s@velammal.edu.in",
        },
        {
          name: "Sushmitha",
          role: "Co-Coordinator",
          phone: "+91 74183 36138",
          email: "sushmitha@velammal.edu.in",
        },
      ],
    },
    // Non-Technical Events
    {
      eventTitle: "SOUND SPHERE",
      eventIcon: "🎵",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Jeevath M",
          role: "Lead Coordinator",
          phone: "+91 63833 00579",
          email: "jeevath@velammal.edu.in",
        },
        {
          name: "Anjali B",
          role: "Co-Coordinator",
          phone: "+91 63834 65759",
          email: "anjali.b@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "CLUE CONNECT",
      eventIcon: "🔍",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Barath",
          role: "Lead Coordinator",
          phone: "+91 98402 75886",
          email: "barath@velammal.edu.in",
        },
        {
          name: "Akshitha",
          role: "Co-Coordinator",
          phone: "+91 63740 16868",
          email: "akshitha@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "MIND MAZE",
      eventIcon: "🎯",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Dhiyanesh",
          role: "Lead Coordinator",
          phone: "+91 94442 54917",
          email: "dhiyanesh@velammal.edu.in",
        },
        {
          name: "Swedha P S",
          role: "Co-Coordinator",
          phone: "+91 63827 32250",
          email: "swedha@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "DREAM XI",
      eventIcon: "🏏",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Anshul S A",
          role: "Lead Coordinator",
          phone: "+91 63792 80210",
          email: "anshul@velammal.edu.in",
        },
        {
          name: "Santhosh S",
          role: "Co-Coordinator",
          phone: "+91 90258 56034",
          email: "santhosh.s@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "PIXEL PERFECT",
      eventIcon: "🎨",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Logesh G",
          role: "Lead Coordinator",
          phone: "+91 90250 09593",
          email: "logesh@velammal.edu.in",
        },
        {
          name: "Tanya Pillai",
          role: "Co-Coordinator",
          phone: "+91 98765 43231",
          email: "tanya@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "GAMEVERSE",
      eventIcon: "🎮",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Prasanth M",
          role: "Lead Coordinator",
          phone: "+91 90924 79171",
          email: "prasanth@velammal.edu.in",
        },
        {
          name: "Shreya Jain",
          role: "Co-Coordinator",
          phone: "+91 98765 43233",
          email: "shreya@velammal.edu.in",
        },
      ],
    },
    // Workshop
    {
      eventTitle: "AI & ML WORKSHOP",
      eventIcon: "🤖",
      category: "Workshop",
      coordinators: [
        {
          name: "Dr. Anand Kumar",
          role: "Faculty Lead",
          phone: "+91 98765 43234",
          email: "anand.kumar@velammal.edu.in",
        },
        {
          name: "Prof. Neha Singh",
          role: "Faculty Co-Lead",
          phone: "+91 98765 43235",
          email: "neha.singh@velammal.edu.in",
        },
      ],
    },
  ];

  // Filter coordinators by category
  const filteredCoordinators =
    activeCategory === "all"
      ? coordinatorsData
      : activeCategory === "Workshop"
      ? coordinatorsData.filter((event) => event.category === "Workshop")
      : coordinatorsData.filter((event) => event.category === activeCategory);

  // Handle phone call
  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  // Handle email
  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  // Navigate back to home
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="coordinators-page">
      {/* Header */}
      <header className={`coordinators-header ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="header-container">
          <button className="back-btn" onClick={goToHome}>
            <span className="back-icon">←</span>
            <span>Back to Home</span>
          </button>

          <div className="header-logo">
            <img src={logo} alt="ELECTROWIZ" />
            <span>ELECTROWIZ'26</span>
          </div>

          <div className="header-spacer"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="coordinators-hero">
        <div className="hero-bg-effect">
          <div className="hero-grid-pattern"></div>
          <div className="hero-gradient-overlay"></div>
        </div>
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <span className="badge-icon">👥</span>
            <span className="badge-text">Meet Our Team</span>
          </div>
          <h1 className="hero-title">
            Event <span className="highlight">Coordinators</span>
          </h1>
          <p className="hero-subtitle">
            Connect with our dedicated team members for any event-related queries
          </p>
          <div className="hero-line"></div>
        </div>
      </section>

      {/* ==================== FACULTY COORDINATORS SECTION ==================== */}
      <section className="faculty-coordinators-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">🎓</span>
              Faculty Coordinators
            </h2>
            <p className="section-subtitle">
              Distinguished faculty members guiding ELECTROWIZ 2026
            </p>
          </div>

          <div className="faculty-coordinators-grid">
            {facultyCoordinators.map((faculty, index) => (
              <div key={index} className="faculty-coordinator-card">
                <div className="faculty-card-glow"></div>
                <div className="faculty-header">
                  <div className="faculty-avatar">
                    <span className="faculty-avatar-icon">👨‍🏫</span>
                    <div className="faculty-avatar-ring"></div>
                  </div>
                  <div className="faculty-badge">Faculty</div>
                </div>
                <div className="faculty-details">
                  <h3 className="faculty-name">{faculty.name}</h3>
                  <p className="faculty-role">{faculty.role}</p>
                  <p className="faculty-qualification">{faculty.qualification}</p>
                  <p className="faculty-specialization">
                    <span className="spec-icon">🔬</span>
                    {faculty.specialization}
                  </p>
                  <p className="faculty-department">
                    <span className="dept-icon">🏛️</span>
                    {faculty.department}
                  </p>
                  <div className="faculty-contact-btns">
                    <button
                      className="faculty-contact-btn phone-btn"
                      onClick={() => handleCall(faculty.phone)}
                    >
                      <span className="btn-icon">📞</span>
                      <span>Call</span>
                    </button>
                    <button
                      className="faculty-contact-btn email-btn"
                      onClick={() => handleEmail(faculty.email)}
                    >
                      <span className="btn-icon">📧</span>
                      <span>Email</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OVERALL STUDENT COORDINATORS SECTION ==================== */}
      <section className="overall-coordinators-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">⭐</span>
              Overall Student Coordinators
            </h2>
            <p className="section-subtitle">
              Student leadership team managing ELECTROWIZ 2026
            </p>
          </div>

          <div className="overall-coordinators-grid">
            {overallCoordinators.map((coordinator, index) => (
              <div key={index} className="overall-coordinator-card">
                <div className="card-glow-effect"></div>
                <div className="coordinator-avatar">
                  <span className="avatar-icon">👤</span>
                  <div className="avatar-ring"></div>
                </div>
                <div className="coordinator-details">
                  <h3 className="coordinator-name">{coordinator.name}</h3>
                  <p className="coordinator-role">{coordinator.role}</p>
                  <p className="coordinator-department">
                    {coordinator.department} • {coordinator.year}
                  </p>
                  <p className="coordinator-responsibility">
                    <span className="resp-icon">📋</span>
                    {coordinator.responsibility}
                  </p>
                  <div className="coordinator-contact-btns">
                    <button
                      className="contact-btn phone-btn"
                      onClick={() => handleCall(coordinator.phone)}
                    >
                      <span className="btn-icon">📞</span>
                      <span>Call</span>
                    </button>
                    <button
                      className="contact-btn email-btn"
                      onClick={() => handleEmail(coordinator.email)}
                    >
                      <span className="btn-icon">📧</span>
                      <span>Email</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EVENT COORDINATORS SECTION ==================== */}
      <section className="event-coordinators-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">🎯</span>
              Event Coordinators
            </h2>
            <p className="section-subtitle">
              Reach out to specific event coordinators for detailed information
            </p>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            <button
              className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <span>All Events</span>
            </button>
            <button
              className={`filter-btn tech-filter ${activeCategory === "Technical" ? "active" : ""}`}
              onClick={() => setActiveCategory("Technical")}
            >
              <span>Technical</span>
            </button>
            <button
              className={`filter-btn nontech-filter ${activeCategory === "Non-Technical" ? "active" : ""}`}
              onClick={() => setActiveCategory("Non-Technical")}
            >
              <span>Non-Technical</span>
            </button>
            <button
              className={`filter-btn workshop-filter ${activeCategory === "Workshop" ? "active" : ""}`}
              onClick={() => setActiveCategory("Workshop")}
            >
              <span>Workshop</span>
            </button>
          </div>

          {/* Event Coordinators Grid */}
          <div className="event-coordinators-grid">
            {filteredCoordinators.map((event, index) => (
              <div
                key={index}
                className={`event-coordinator-block ${
                  event.category === "Technical"
                    ? "tech-block"
                    : event.category === "Workshop"
                    ? "workshop-block"
                    : "nontech-block"
                }`}
              >
                <div className="event-block-header">
                  <span className="event-icon">{event.eventIcon}</span>
                  <div className="event-info">
                    <h3 className="event-title">{event.eventTitle}</h3>
                    <span
                      className={`event-category ${
                        event.category === "Technical"
                          ? "tech-cat"
                          : event.category === "Workshop"
                          ? "workshop-cat"
                          : "nontech-cat"
                      }`}
                    >
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="coordinators-list">
                  {event.coordinators.map((coordinator, idx) => (
                    <div key={idx} className="coordinator-item">
                      <div className="coordinator-avatar-small">
                        <span>👤</span>
                      </div>
                      <div className="coordinator-info">
                        <h4 className="coordinator-name-small">
                          {coordinator.name}
                        </h4>
                        <p className="coordinator-role-small">{coordinator.role}</p>
                        <div className="coordinator-contact-info">
                          <a
                            href={`tel:${coordinator.phone}`}
                            className="contact-link phone-link"
                          >
                            <span className="link-icon">📞</span>
                            <span>{coordinator.phone}</span>
                          </a>
                          <a
                            href={`mailto:${coordinator.email}`}
                            className="contact-link email-link"
                          >
                            <span className="link-icon">📧</span>
                            <span>{coordinator.email}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="coordinators-cta-section">
        <div className="section-container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Participate?</h2>
              <p className="cta-text">
                Register now for ELECTROWIZ 2026 and be part of the biggest
                technical symposium!
              </p>
              <button className="cta-btn" onClick={goToHome}>
                <span>Go to Events</span>
                <span className="cta-btn-icon">→</span>
              </button>
            </div>
            <div className="cta-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="coordinators-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logo} alt="ELECTROWIZ" />
              <span>ELECTROWIZ'26</span>
            </div>
            <p className="footer-text">
              Department of Electronics and Communication Engineering
              <br />
              Velammal Engineering College
            </p>
          </div>
          <div className="footer-bottom">
            <p>© 2026 ELECTROWIZ. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        className={`scroll-to-top ${isScrolled ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span>↑</span>
      </button>
    </div>
  );
};

export default EventCoordinators;