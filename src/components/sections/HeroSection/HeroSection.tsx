"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ParticleCanvas from "./ParticleCanvas/ParticleCanvas";
import css from "./HeroSection.module.scss";

const NAME = "Jacob";

/**
 * Full-viewport hero section with a GSAP-animated particle network background
 * and staggered text reveal sequence.
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  // GSAP text reveal sequence
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(`.${css.tag}`, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        from: { y: 12 },
      })
        .fromTo(
          `.${css.greeting}`,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          `.${css.name} span`,
          { opacity: 0, y: 70, rotationX: -60 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.06,
            duration: 0.65,
            ease: "back.out(1.6)",
          },
          "-=0.3",
        )
        .fromTo(
          `.${css.subtitle}`,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.25",
        )
        .fromTo(
          `.${css.description}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2",
        )
        .fromTo(
          [`.${css.ctaPrimary}`, `.${css.ctaSecondary}`],
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.45,
            ease: "back.out(1.4)",
          },
          "-=0.2",
        )
        .fromTo(
          `.${css.scroll}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.1",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={css.hero} ref={heroRef}>
      <ParticleCanvas className={css.canvas} />
      <div className={css.glow} />

      <div className={css.content}>
        <p className={css.tag}>Available for opportunities</p>

        <div className={css.nameRow}>
          <span className={css.greeting}>Hi, I&apos;m</span>
        </div>

        <div className={css.name} aria-label={NAME}>
          {NAME.split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>

        <p className={css.subtitle}>
          <strong>Front-End</strong> &amp; Full-Stack Engineer
        </p>

        <p className={css.description}>
          I build fast, polished web experiences — from startup MVPs to
          production platforms serving millions of users.
        </p>

        <div className={css.ctas}>
          <button className={css.ctaPrimary} onClick={() => scrollTo("#work")}>
            View my work
          </button>
          <button
            className={css.ctaSecondary}
            onClick={() => scrollTo("#contact")}
          >
            Get in touch
          </button>
        </div>
      </div>

      <div
        className={css.scroll}
        onClick={() => scrollTo("#about")}
        role="button"
        tabIndex={0}
        aria-label="Scroll to about"
      >
        <span>Scroll</span>
        <div className={css.scrollLine} />
      </div>
    </section>
  );
}
