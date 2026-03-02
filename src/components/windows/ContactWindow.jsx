import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import MacWindow from "./MacWindow";
import { EMAILJS, WINDOW_SIZES } from "../../config/constants";
import "./ContactWindow.scss";

export default function ContactWindow({ windowName, setwindowState, zIndex, onFocus }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({ from_name: "", from_email: "", message: "" });

  const handleChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS.SERVICE_ID,
        EMAILJS.TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS.PUBLIC_KEY }
      );
      setStatus("success");
      setFields({ from_name: "", from_email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      const msg = err?.text || err?.message || JSON.stringify(err);
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus} {...WINDOW_SIZES.CONTACT}>
      <div className="contact-window">
        <div className="contact-window__header">
          <h2 className="contact-window__title">✉️ Send a Message</h2>
          <p className="contact-window__sub">Drop me a line — I reply within 24h</p>
        </div>

        {status === "success" ? (
          <div className="contact-window__success">
            <div className="contact-window__check-wrap">
              <svg className="contact-window__check-svg" viewBox="0 0 80 80">
                {/* Dim background ring */}
                <circle cx="40" cy="40" r="34" fill="rgba(220,38,38,0.06)" stroke="rgba(220,38,38,0.15)" strokeWidth="1.5"/>
                {/* Animated ring */}
                <circle cx="40" cy="40" r="34" fill="none" stroke="#dc2626" strokeWidth="2.2"
                  strokeLinecap="round" className="contact-window__check-ring"
                  strokeDasharray="214" strokeDashoffset="214"/>
                {/* Animated checkmark */}
                <polyline points="22,41 34,53 58,27" fill="none" stroke="#dc2626" strokeWidth="4"
                  strokeLinecap="round" strokeLinejoin="round" className="contact-window__check-mark"
                  strokeDasharray="56" strokeDashoffset="56"/>
              </svg>
            </div>

            <div className="contact-window__success-text">
              <p className="contact-window__success-headline">Message Sent!</p>
              <p className="contact-window__success-sub">
                I&apos;ll swing back to you within <strong>24 hours</strong>.
              </p>
            </div>

            <div className="contact-window__success-tags">
              <span className="contact-window__tag">✓ Delivered</span>
              <span className="contact-window__tag">⏱ 24h reply</span>
            </div>

            <button className="contact-window__btn" onClick={() => setStatus("idle")}>
              Send Another
            </button>
          </div>
        ) : (
          <form ref={formRef} className="contact-window__form" onSubmit={handleSubmit}>
            <div className="contact-window__field">
              <label className="contact-window__label">Name</label>
              <input
                className="contact-window__input"
                type="text"
                name="from_name"
                value={fields.from_name}
                onChange={handleChange}
                placeholder="Your name"
                required
                autoComplete="off"
              />
            </div>

            <div className="contact-window__field">
              <label className="contact-window__label">Email</label>
              <input
                className="contact-window__input"
                type="email"
                name="from_email"
                value={fields.from_email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                autoComplete="off"
              />
            </div>

            <div className="contact-window__field contact-window__field--grow">
              <label className="contact-window__label">Message</label>
              <textarea
                className="contact-window__textarea"
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
              />
            </div>

            {status === "error" && (
              <p className="contact-window__error">Something went wrong: {errorMsg || "unknown error"}</p>
            )}

            <button
              className="contact-window__btn contact-window__btn--submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </MacWindow>
  );
}
