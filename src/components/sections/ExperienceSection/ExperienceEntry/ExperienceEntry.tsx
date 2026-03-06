"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "./ExperienceEntry.module.scss";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shape of a single job entry in the experience timeline.
 */
export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

/**
 * Renders a single experience timeline entry with a staggered scroll-reveal animation.
 *
 * @param item - The experience data to display
 */
export default function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const itemRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current!.querySelectorAll(`.${css.line}`),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 82%",
          },
        },
      );
    }, itemRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={css.item} ref={itemRef}>
      <div className={`${css.meta} ${css.line}`}>
        <span className={css.company}>{item.company}</span>
        <span className={css.period}>{item.period}</span>
      </div>
      <div className={`${css.role} ${css.line}`}>{item.role}</div>
      <div className={`${css.location} ${css.line}`}>{item.location}</div>
      <ul className={css.bullets}>
        {item.bullets.map((b, i) => (
          <li className={`${css.bullet} ${css.line}`} key={i}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
