"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceEntry, {
  type ExperienceItem,
} from "./ExperienceEntry/ExperienceEntry";
import css from "./ExperienceSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const FULL_TIME: ExperienceItem[] = [
  {
    company: "SymbyAI",
    role: "Front-End Engineer",
    period: "2025 – Present",
    location: "Remote",
    bullets: [
      "Built and scaled the core web application for an AI-driven research platform with $800K in pre-launch funding and 1,200+ researchers on the waitlist.",
      "Developed responsive, high-performance pages in TypeScript and React, establishing reusable component libraries and SCSS style systems that accelerated team development.",
      "Integrated Stripe for subscription payments and implemented frontend credential management, ensuring robust security across authentication flows.",
      "Collaborated with backend engineers to design RESTful API endpoints for credential handling, AI paper analysis pipelines, and topic-based search features.",
      "Led whiteboard sessions and usability tests for application redesigns, iterating on Figma prototypes through full implementation cycles.",
    ],
  },
  {
    company: "Madison Square Garden Sphere",
    role: "Software Engineer",
    period: "2022 – 2023",
    location: "Burbank, CA",
    bullets: [
      "Developed audiovisual content and tooling for the Las Vegas Sphere, which debuted to an estimated 300K daily in-person impressions and 4M via social media.",
      "Optimized content pipelines for 100+ brands and artists, cutting production time from 3–4 months to 2 weeks on average — contributing to $346M in revenue in its first year.",
      "Curated 20+ toolkits with 10,000+ unique visual combinations, ensuring the Sphere had hundreds of hours of ready content at launch.",
      "Implemented working Figma designs in Unreal Engine using JavaScript, Python, C++, and Blueprints, giving clients accurate previews before full-scale deployment.",
    ],
  },
  {
    company: "idobi Network",
    role: "Web Developer",
    period: "2021 – 2022",
    location: "North Hollywood, CA",
    bullets: [
      "One of 2 engineers developing the primary site for an internet radio station with 3M+ unique monthly visitors.",
      "Led a full site overhaul that increased monthly listeners by 23% and revenue by 45%, adding new ad placements and monetization features.",
      "Rebuilt auxiliary WordPress plugins from scratch in JavaScript, HTML, PHP, and React, eliminating $84,000+ in annual licensing and maintenance costs.",
      "Built custom in-header radio players that kept listeners browsing while listening, expanding auditory ad inventory.",
    ],
  },
  {
    company: "General Atomics",
    role: "Software Developer",
    period: "2018 – 2019",
    location: "San Diego, CA",
    bullets: [
      "Led full-stack development on B2B embedded software for internal databases, data visualization dashboards, and early AI prototypes.",
      "Pioneered live database visualization on internal sites, improving research team workflow efficiency by 25%.",
      "Built AI error-prediction applications that demonstrated a 40% reduction in fatal errors, saving an estimated $340K annually in repair costs.",
      "Represented General Atomics in stakeholder presentations, helping secure multiple six-figure contracts.",
    ],
  },
];

const FREELANCE: ExperienceItem[] = [
  {
    company: "VTProDesign",
    role: "Freelance Programmer",
    period: "2024",
    location: "Los Angeles, CA",
    bullets: [
      "Solo programmer for an interactive exhibit at the WNBA Phoenix conference, generating ~2,000 interactions over 2 days via Python and TouchDesigner with custom hardware.",
      "Took the project from zero to live in under 2 weeks by rapidly onboarding, coordinating with art, fabrication, and management teams, and picking up new skills on the fly.",
    ],
  },
  {
    company: "Dressertation",
    role: "Front-End Developer",
    period: "2024",
    location: "Remote",
    bullets: [
      "Developed an early-stage mobile app for wardrobe scanning and AI-generated outfit suggestions using Android Studio, Java, Kotlin, and XML.",
      "Drove redesign from Figma and paper prototypes through beta implementation and Bitbucket merge into the production app.",
    ],
  },
  {
    company: "Delite! Media & Others",
    role: "Freelance Web Developer",
    period: "2020 – 2021",
    location: "Remote",
    bullets: [
      "Built and repaired sites for independent entertainment media journalists, fixing critical bugs and shipping redesigns with SEO improvements.",
      "Invented solutions for complex features within constraints of Squarespace and WordPress template environments.",
    ],
  },
];

/**
 * Experience section rendering a vertical timeline of full-time and freelance roles.
 */
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      className={`section ${css.experience}`}
      ref={sectionRef}
    >
      <div className={css.header} data-reveal>
        <p className="section__label">Experience</p>
        <h2 className="section__title">
          Where I&apos;ve <span>worked</span>
        </h2>
        <p className="section__subtitle">
          From defense tech to AI startups, I&apos;ve built production software
          across industries that demand both precision and speed.
        </p>
      </div>

      <div className={css.timeline}>
        <div className={css.group}>
          <div className={css.groupLabel}>Full-time</div>
          {FULL_TIME.map((item) => (
            <ExperienceEntry key={item.company} item={item} />
          ))}
        </div>

        <div className={css.group}>
          <div className={css.groupLabel}>Freelance</div>
          {FREELANCE.map((item) => (
            <ExperienceEntry key={item.company} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
