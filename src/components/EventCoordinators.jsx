/* ============================================
   EVENT COORDINATORS PAGE
   Display all event coordinators with contact info
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

  // Coordinators Data
  const coordinatorsData = [
    // Technical Events
    {
      eventTitle: "CIRCUIT QUEST",
      eventIcon: "⚡",
      category: "Technical",
      coordinators: [
        {
          name: "Rajesh Kumar",
          role: "Lead Coordinator",
          phone: "+91 98765 43210",
          email: "rajesh@velammal.edu.in",
        },
        {
          name: "Priya Sharma",
          role: "Co-Coordinator",
          phone: "+91 98765 43211",
          email: "priya@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "CODE STORM",
      eventIcon: "💻",
      category: "Technical",
      coordinators: [
        {
          name: "Arun Prakash",
          role: "Lead Coordinator",
          phone: "+91 98765 43212",
          email: "arun@velammal.edu.in",
        },
        {
          name: "Divya Nair",
          role: "Co-Coordinator",
          phone: "+91 98765 43213",
          email: "divya@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "ROBO WARS",
      eventIcon: "🤖",
      category: "Technical",
      coordinators: [
        {
          name: "Karthik Reddy",
          role: "Lead Coordinator",
          phone: "+91 98765 43214",
          email: "karthik@velammal.edu.in",
        },
        {
          name: "Sneha Patel",
          role: "Co-Coordinator",
          phone: "+91 98765 43215",
          email: "sneha@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "HACKATHON",
      eventIcon: "🚀",
      category: "Technical",
      coordinators: [
        {
          name: "Vikram Singh",
          role: "Lead Coordinator",
          phone: "+91 98765 43216",
          email: "vikram@velammal.edu.in",
        },
        {
          name: "Anjali Menon",
          role: "Co-Coordinator",
          phone: "+91 98765 43217",
          email: "anjali@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "PAPER PRESENTATION",
      eventIcon: "📄",
      category: "Technical",
      coordinators: [
        {
          name: "Suresh Babu",
          role: "Lead Coordinator",
          phone: "+91 98765 43218",
          email: "suresh@velammal.edu.in",
        },
        {
          name: "Lakshmi Iyer",
          role: "Co-Coordinator",
          phone: "+91 98765 43219",
          email: "lakshmi@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "IOT CHALLENGE",
      eventIcon: "🌐",
      category: "Technical",
      coordinators: [
        {
          name: "Ramesh Kumar",
          role: "Lead Coordinator",
          phone: "+91 98765 43220",
          email: "ramesh@velammal.edu.in",
        },
        {
          name: "Kavya Reddy",
          role: "Co-Coordinator",
          phone: "+91 98765 43221",
          email: "kavya@velammal.edu.in",
        },
      ],
    },
    // Non-Technical Events
    {
      eventTitle: "TECH QUIZ",
      eventIcon: "🧠",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Sanjay Gupta",
          role: "Lead Coordinator",
          phone: "+91 98765 43222",
          email: "sanjay@velammal.edu.in",
        },
        {
          name: "Meera Krishnan",
          role: "Co-Coordinator",
          phone: "+91 98765 43223",
          email: "meera@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "TREASURE HUNT",
      eventIcon: "🗺️",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Arjun Verma",
          role: "Lead Coordinator",
          phone: "+91 98765 43224",
          email: "arjun@velammal.edu.in",
        },
        {
          name: "Pooja Shah",
          role: "Co-Coordinator",
          phone: "+91 98765 43225",
          email: "pooja@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "PHOTOGRAPHY",
      eventIcon: "📸",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Rohan Mehta",
          role: "Lead Coordinator",
          phone: "+91 98765 43226",
          email: "rohan@velammal.edu.in",
        },
        {
          name: "Isha Desai",
          role: "Co-Coordinator",
          phone: "+91 98765 43227",
          email: "isha@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "DEBATE",
      eventIcon: "🎤",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Nikhil Joshi",
          role: "Lead Coordinator",
          phone: "+91 98765 43228",
          email: "nikhil@velammal.edu.in",
        },
        {
          name: "Swati Rao",
          role: "Co-Coordinator",
          phone: "+91 98765 43229",
          email: "swati@velammal.edu.in",
        },
      ],
    },
    {
      eventTitle: "GAMING ARENA",
      eventIcon: "🎮",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Aditya Kapoor",
          role: "Lead Coordinator",
          phone: "+91 98765 43230",
          email: "aditya@velammal.edu.in",
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
      eventTitle: "MEME MAKING",
      eventIcon: "😂",
      category: "Non-Technical",
      coordinators: [
        {
          name: "Rahul Bansal",
          role: "Lead Coordinator",
          phone: "+91 98765 43232",
          email: "rahul@velammal.edu.in",
        },
        {
          name: "Shreya Jain",
          role: "Co-Coordinator",
          phone: "+91 98765 43233",
          email: "shreya@velammal.edu.in",
        },
      ],
    },
  ];

  // Overall Coordinators
  const overallCoordinators = [
    {
      name: "Dr. S. Rajendran",
      role: "Faculty Coordinator",
      department: "ECE Department",
      phone: "+91 98765 43200",
      email: "rajendran@velammal.edu.in",
    },
    {
      name: "Prof. M. Lakshmi",
      role: "Faculty Co-Coordinator",
      department: "ECE Department",
      phone: "+91 98765 43201",
      email: "lakshmi.m@velammal.edu.in",
    },
    {
      name: "Harish Kumar",
      role: "Student Coordinator",
      department: "Final Year ECE",
      phone: "+91 98765 43202",
      email: "harish.student@velammal.edu.in",
    },
    {
      name: "Priyanka Nair",
      role: "Student Co-Coordinator",
      department: "Final Year ECE",
      phone: "+91 98765 43203",
      email: "priyanka.student@velammal.edu.in",
    },
  ];

  // Filter coordinators by category
  const filteredCoordinators =
    activeCategory === "all"
      ? coordinatorsData
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

      {/* Overall Coordinators Section */}
      <section className="overall-coordinators-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">⭐</span>
              Overall Coordinators
            </h2>
            <p className="section-subtitle">
              Leadership team managing ELECTROWIZ 2026
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
                  <p className="coordinator-department">{coordinator.department}</p>
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

      {/* Event Coordinators Section */}
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
          </div>

          {/* Event Coordinators Grid */}
          <div className="event-coordinators-grid">
            {filteredCoordinators.map((event, index) => (
              <div
                key={index}
                className={`event-coordinator-block ${
                  event.category === "Technical" ? "tech-block" : "nontech-block"
                }`}
              >
                <div className="event-block-header">
                  <span className="event-icon">{event.eventIcon}</span>
                  <div className="event-info">
                    <h3 className="event-title">{event.eventTitle}</h3>
                    <span
                      className={`event-category ${
                        event.category === "Technical" ? "tech-cat" : "nontech-cat"
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