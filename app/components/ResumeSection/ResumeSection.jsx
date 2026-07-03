"use client";
import css from "./ResumeSection.module.scss";
import { gsap } from "@/scripts/gsap";
import DatabaseSvg from "@/public/icons/database.svg";
import DockerSvg from "@/public/icons/docker.svg";
import Html5Svg from "@/public/icons/html5.svg";
import JavaScriptSvg from "@/public/icons/javascript.svg";
import NextJsSvg from "@/public/icons/next-js.svg";
import NodeJsSvg from "@/public/icons/node-js.svg";
import ReactSvg from "@/public/icons/react.svg";
import ResumeEntry from "@/app/components/ResumeSection/ResumeEntry/ResumeEntry";
import SassSvg from "@/public/icons/sass.svg";
import ScrollTriggeredAnimation from "@/components/ScrollTriggeredAnimation/ScrollTriggeredAnimation";

/**
 * Animates the Experience header on scroll.
 *
 * @param root - The root element containing the header
 * @returns    The GSAP timeline
 */
function animateHeader(root) {
  const tl = gsap.timeline();

  tl.set(root.querySelectorAll(".initialInvis"), { visibility: "visible" });

  tl.fromTo(
    root.querySelector("h2"),
    { opacity: 0, translateY: "-15%" },
    { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 },
  );

  return tl;
}

/**
 * Experience/resume section with animated job entries.
 */
export default function ResumeSection() {
  return (
    <section className={css.resumeSection}>
      <div className="sectionInner">
        <ScrollTriggeredAnimation
          animation={animateHeader}
          className={css.header}
          threshold={0.5}
        >
          <h2 className="initialInvis">Experience</h2>
        </ScrollTriggeredAnimation>
        <ResumeEntry
          title="Front End Engineer"
          subtitle="SymbyAI · 2025 — Present"
          techs={[
            { icon: <ReactSvg />, text: "React" },
            { icon: <NextJsSvg />, text: "Next.js" },
            { icon: <NodeJsSvg />, text: "Node" },
            { icon: <SassSvg />, text: "SCSS" },
          ]}
          body={[
            "I'm currently building the core web application for an AI-driven SaaS startup aiming to streamline peer review and the academic publishing pipeline. I turn pitch abstractions into real designs and code, with accessibility, responsiveness, security, and ease of use guiding every decision.",
            "Most of the frontend is TypeScript, React, SCSS, Next.js, and Node.js. I built a scalable component library so new features stack on top of existing infrastructure with minimal refactoring, and designed the data flows and API endpoints behind project tracking, file uploads, AI paper analysis, organization management, authentication, and database querying.",
            "I've also integrated Stripe for subscription billing, Mixpanel for analytics, and other third-party services, produced marketing assets from demo videos to slide decks to data visualizers, and leaned on enterprise Claude Code for PR reviews and feature work—using my own experience to catch hallucinations and filter out the noise.",
          ]}
        />

        <ResumeEntry
          title="Software Engineer"
          subtitle="MSG Sphere Entertainment Co. · 2022 — 2023"
          techs={[
            { icon: <JavaScriptSvg />, text: "JavaScript" },
            { icon: <ReactSvg />, text: "React" },
            { icon: <NodeJsSvg />, text: "Node" },
          ]}
          body={[
            "I developed audiovisual content and production pipelines for the Las Vegas Sphere, which premiered in the summer of 2023. Early daily impressions reached an estimated 300,000 in person and around 4 million across social media.",
            "My main contribution was optimizing the content pipeline: I built interactive tools and templates that let 100+ prospective brands and artists display their content efficiently, cutting average production time from three or four months down to two weeks and feeding into $346M in first-year revenue. I also spearheaded QA testing and API documentation to keep the output consistent and accurate.",
          ]}
        />

        <ResumeEntry
          title="Web Developer"
          subtitle="iDobi Network · 2021 — 2022"
          techs={[
            { icon: <JavaScriptSvg />, text: "JavaScript" },
            { icon: <ReactSvg />, text: "React" },
            { icon: <Html5Svg />, text: "HTML" },
          ]}
          body={[
            "I was one of two programmers building the primary website for a large internet radio station with over 3 million unique monthly visitors. I led a complete overhaul of the site's design, adding cookies and features that opened up new ad space and monetization points, which pushed monthly listeners up 23% and revenue up 45%.",
            "I rebuilt their WordPress plugins from scratch in JavaScript, HTML, PHP, and React, saving more than $84,000 a year in long-term costs and maintenance, and drove development on persistent radio players built into the site header so listeners could keep browsing while they listened.",
          ]}
        />

        <ResumeEntry
          title="Software Developer"
          subtitle="General Atomics · 2018 — 2019"
          techs={[
            { icon: <DockerSvg />, text: "Docker" },
            { icon: <DatabaseSvg />, text: "PostgreSQL" },
            { icon: <JavaScriptSvg />, text: "JavaScript" },
            { icon: <Html5Svg />, text: "HTML" },
          ]}
          body={[
            "I led full-stack development on B2B embedded software for data visualization, databases, and early AI prototypes. One project deployed a web app with Docker, Kubernetes, and PostgreSQL to compare custom AI prediction models against human prediction, showing a 40% reduction in fatal machinery errors and saving $340,000 a year in repair costs.",
            "I also built company-wide live database visualizers with straightforward sorting and filtering, and represented General Atomics at remote stakeholder presentations that helped land multiple six-figure contracts.",
          ]}
        />
      </div>
    </section>
  );
}
