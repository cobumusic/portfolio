"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "./Skills.module.scss";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    icon: "⚡",
    name: "Languages",
    tags: [
      "TypeScript",
      "JavaScript",
      "Python",
      "HTML/CSS",
      "PHP",
      "SQL",
      "Java",
      "C++",
    ],
  },
  {
    icon: "⚛️",
    name: "Frameworks & Libraries",
    tags: ["React", "Next.js", "GSAP", "SCSS / Sass", "WordPress", "Node.js"],
  },
  {
    icon: "🛠",
    name: "Tools & Platforms",
    tags: [
      "Git",
      "Vite",
      "Figma",
      "Jira",
      "Notion",
      "Bitbucket",
      "Confluence",
      "Stripe",
    ],
  },
  {
    icon: "🎨",
    name: "Design & Creative",
    tags: [
      "Adobe Creative Suite",
      "Figma",
      "Unreal Engine",
      "TouchDesigner",
      "Motion Graphics",
    ],
  },
  {
    icon: "🔄",
    name: "Workflow",
    tags: [
      "Agile / Scrum",
      "REST APIs",
      "Component Architecture",
      "PR Reviews",
      "A/B Testing",
    ],
  },
  {
    icon: "🤖",
    name: "AI & Emerging",
    tags: [
      "Claude / Anthropic APIs",
      "LLM Integration",
      "Mixpanel",
      "Analytics Pipelines",
    ],
  },
];

/**
 * Skills section displaying categorized technology tags in a responsive card grid.
 */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.55,
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

  return (
    <section id="skills" className={`section ${css.skills}`} ref={sectionRef}>
      <p className="section__label" data-reveal>
        Skills
      </p>
      <h2 className="section__title" data-reveal>
        My <span>toolkit</span>
      </h2>
      <p className="section__subtitle" data-reveal>
        A mix of battle-tested technologies and emerging tools I&apos;ve used
        across production projects.
      </p>

      <div className={css.grid}>
        {SKILL_CATEGORIES.map((cat) => (
          <div className={css.category} key={cat.name} data-reveal>
            <div className={css.categoryIcon}>{cat.icon}</div>
            <div className={css.categoryName}>{cat.name}</div>
            <div className={css.tags}>
              {cat.tags.map((tag) => (
                <span className={css.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
