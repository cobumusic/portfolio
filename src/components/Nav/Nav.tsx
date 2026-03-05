"use client";
import { useEffect, useState } from "react";
import css from "./Nav.module.scss";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/**
 * Fixed navigation bar that becomes opaque on scroll.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`${css.nav} ${scrolled ? css.scrolled : ""}`}>
      <div className={css.logo}>
        J<span>.</span>
      </div>
      <ul className={css.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <span
              className={css.link}
              onClick={() => scrollTo(href)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && scrollTo(href)}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
      <button className={css.cta} onClick={() => scrollTo("#contact")}>
        Get in touch
      </button>
    </nav>
  );
}
