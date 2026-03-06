"use client";
import { useState, type FormEvent } from "react";
import css from "./ContactForm.module.scss";

// Sign up at formspree.io, create a form, and replace this with your form ID.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqpwalg";

/**
 * Formspree-powered contact form with inline success and error states.
 * Submissions are forwarded to your email via Formspree (formspree.io).
 */
export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

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

  if (status === "success") {
    return (
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
    );
  }

  return (
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
          Something went wrong. Please try again or reach out via LinkedIn.
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
  );
}
