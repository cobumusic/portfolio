"use client";
import { gsap } from "@/scripts/gsap";
import ProjectImage, {
  animateProjectImage
} from "@/app/components/ProjectsSection/ProjectImage";
import ScrollTriggeredAnimation from "@/components/ScrollTriggeredAnimation/ScrollTriggeredAnimation";
import splitIntoAnimatedSpans from "@/scripts/utils/splitIntoAnimatedSpans";
import css from "./ProjectsSection.module.scss";

const PROJECTS = [
  {
    alt: "The SymbyAI platform interface.",
    image: "/images/cards/symby/symby",
    name: "SymbyAI",
    paragraphs: [
      "Peer review takes months to years. Researchers submit papers and wait, while reviewers' backlogs fill up just so they can catch errors that a machine could flag in seconds. The system is slow, overloaded, and at worst, leads to bad science.",
      "SymbyAI does a first pass before humans get involved. Upload a PDF, get it back annotated: statistical errors, image issues, claims that contradict existing research. Reviewers still review; they just start from a better place.",
      "I was brought on as a front end engineer to build and scale the core web application in its early days. Before I joined, there was only a small demo product; my job was to help turn that into a full website with marketing pages and auth-gated service pages. Within a year, we had done just that and more: I implemented a thorough redesign, built out extensive component and design libraries, and expanded the MVP to a fully fleshed out, publicly available website.",
      "The frontend is primarily TypeScript, React, SCSS, Next.js, and Node.js. In addition, I also helped build out several API endpoints, constructed auth and payment flows, as well as set up the upload → analyze → report pipeline. Being a startup, we developed fast, but deliberately; being in the science and research industry, we also had to code with security (SOC-2 certified!) and precision in mind.",
      "$800k in pre-launch ARR. 800+ researchers on the waitlist.",
    ],
    subtitle: "AI-powered peer review for academic research",
  },
  //{
  //alt: "The X Marks the Site infinite art puzzle game.",
  //image: "/images/cards/xmarksthesite/xmarksthesite",
  //name: "X Marks the Site",
  //paragraphs: [
  //"A marketing campaign for a band. The concept: an infinite-zoom art piece, looping seamlessly, with clickable objects hidden throughout. Find an object, solve a puzzle, earn raffle entries. Most puzzles were music trivia. Some were ciphers, Braille art, obscure audio equipment. The kind of thing that rewards obsessive attention.",
  //"I'd never done canvas animation before this project. The zoom needed to loop perfectly with no visible seam and no jerk when it looped. That took a while to get right. But the harder problem was subtler: when you scale something down naively in the browser, the center gets glittery. Pixels fight each other.",
  //"The other thing nobody warns you about: linear scaling produces a nonlinear visual effect. If you shrink a frame at a constant rate, it doesn't look constant. The motion feels wrong and you can't immediately tell why. I had to adjust the speed dynamically as each frame shrank to make the zoom feel smooth.",
  //"80,000 people played. It didn't translate to album sales, but that's marketing for you.",
  //],
  //subtitle: "An interactive puzzle game for the band A Bad Think",
  //},
  //{
  //alt: "The IAA homepage.",
  //image: "/images/cards/immersiveaudioalbum/immersiveaudioalbum",
  //name: "Immersive Audio Album",
  //paragraphs: [
  //'A marketplace where musicians keep most of what they earn. The inverse of the typical platform cut. It was growing, but the site was a cheap template that screamed "we\'re not serious." Potential partners took one look and walked away.',
  //"My job was to make it look like something that belonged. Modern, artistic, the kind of site that makes you trust what you're buying. The initial designs I got were concepts, not solutions. Good ideas, flat execution. Static layouts that would have looked fine and felt forgettable. I took them and rebuilt them into something with motion: parallax, gradients, animated transitions. I drew new hero art for most of the pages.",
  //"Sessions increased 40%. More importantly, the deals started closing.",
  //],
  //subtitle: "A music marketplace for independent artists",
  //},
];

/**
 * Animates the header on scroll trigger.
 * @param root - The root element containing the header
 * @returns    The GSAP timeline
 */
function animateHeader(root) {
  const tl = gsap.timeline();

  tl.set(root.querySelectorAll(".initialInvis"), { visibility: "visible" });

  tl.fromTo(root.querySelector("h2"),
    { opacity: 0, translateY: "-15%" },
    { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 });

  tl.fromTo(root.querySelector(`.${css.subtitle}`),
    { opacity: 0, translateY: "-15%" },
    { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 },
    "<70%");

  return tl;
}

/**
 * Animates a project entry on scroll trigger.
 * @param root - The root element containing the project
 * @returns    The GSAP timeline
 */
function animateProject(root) {
  const tl = gsap.timeline();

  //Image animation (border draw + fade)
  tl.set(root.querySelectorAll(".initialInvis"), { visibility: "visible" });
  animateProjectImage(tl, root);

  //Title fades in
  tl.fromTo(root.querySelector("h3"),
    { opacity: 0, translateY: "-15%" },
    { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 },
    "<50%");

  //Subtitle fades in
  tl.fromTo(root.querySelector(`.${css.subtitle}`),
    { opacity: 0, translateY: "-15%" },
    { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 },
    "<70%");

  //Text spans stagger in
  tl.fromTo(root.querySelectorAll(`.${css.text} span`),
    { opacity: 0, translateY: "-15%" },
    {
      opacity: 1,
      translateY: "0%",
      ease: "sine.inOut",
      stagger: 0.01,
      duration: 0.1,
    },
    "<70%");

  return tl;
}

/**
 * Projects section showcasing featured work with animated cards.
 */
export default function ProjectsSection() {
  return (
    <section className={css.projects} id="projects">
      <div className="sectionInner">
        <ScrollTriggeredAnimation
          animation={animateHeader}
          className={css.header}
          threshold={0.5}
        >
          <h2 className="initialInvis">Selected Work</h2>
          <div className={`initialInvis ${css.subtitle}`}>
            5+ years of professional work. Based in Los Angeles, CA.
          </div>
        </ScrollTriggeredAnimation>

        {PROJECTS.map((project) => (
          <ScrollTriggeredAnimation
            animation={animateProject}
            className={css.project}
            key={project.name}
            threshold={0.2}
          >
            <ProjectImage alt={project.alt} base={project.image} />
            <h3 className="initialInvis">{project.name}</h3>
            <div className={`initialInvis ${css.subtitle}`}>
              {project.subtitle}
            </div>
            <div className={`initialInvis ${css.text}`}>
              {project.paragraphs.map((text, i) => (
                <p key={i}>{splitIntoAnimatedSpans(text)}</p>
              ))}
            </div>
          </ScrollTriggeredAnimation>
        ))}
      </div>
    </section>
  );
}
