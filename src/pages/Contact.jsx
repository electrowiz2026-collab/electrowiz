import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../styles/contact.css";

const Contact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7e8ysml", // ✅ Your Service ID
        "template_csd0r4o", // ✅ Your Template ID
        formRef.current,
        "f97NptpqAlbmtNjiS" // ✅ Your Public Key
      )
      .then(
        () => {
          alert("Message sent successfully ✅");
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          alert("Failed to send message ❌");
        }
      );
  };

  return (
    <div className="contact-form-container">
      <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input type="text" name="subject" required />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea name="message" rows="4" required />
        </div>

        <button type="submit" className="form-submit">
          <span>Send Message</span>
          <span className="submit-icon">→</span>
        </button>
      </form>
    </div>
  );
};

export default Contact;
