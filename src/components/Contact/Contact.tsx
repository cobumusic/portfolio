"use client";
import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "./Contact.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Sign up at formspree.io, create a form, and replace this with your form ID.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqpwalg";

/**
 * Contact section with a Formspree-powered form. No email address is exposed.
 * Submissions are forwarded to your email via Formspree (formspree.io).
 */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={`section ${css.contact}`} ref={sectionRef}>
      <div className={css.inner}>
        <div className={css.lead} data-reveal>
          <p className="section__label">Contact</p>
          <h2 className="section__title">
            Let&apos;s <span>work together</span>
          </h2>
          <p>
            I&apos;m currently open to front-end and full-stack roles. Whether
            you have a specific opportunity or just want to talk about a project
            — I&apos;d love to hear from you.
          </p>
          <p>
            I typically respond within a day or two. Looking forward to
            connecting.
          </p>
        </div>

        {status === "success" ? (
          <div className={css.success} data-reveal>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Message received — I&apos;ll be in touch soon!
          </div>
        ) : (
          <form className={css.form} onSubmit={handleSubmit} data-reveal>
            <div className={css.row}>
              <div className={css.field}>
                <label className={css.label} htmlFor="name">
                  Name
                </label>
                <input
                  className={css.input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={css.field}>
                <label className={css.label} htmlFor="email">
                  Email
                </label>
                <input
                  className={css.input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="subject">
                Subject
              </label>
              <input
                className={css.input}
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
              />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="message">
                Message
              </label>
              <textarea
                className={css.textarea}
                id="message"
                name="message"
                placeholder="Tell me what you're working on..."
                required
              />
            </div>

            {status === "error" && (
              <p className={css.error}>
                Something went wrong. Please try again or reach out via
                LinkedIn.
              </p>
            )}

            <button
              className={css.submit}
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
