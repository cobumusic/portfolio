"use client";
import Button from "@/components/Button/Button";
import css from "./index.module.scss";
import { gsap } from "@/scripts/gsap";
import ScrollTriggeredAnimation from "@/components/ScrollTriggeredAnimation/ScrollTriggeredAnimation";

/**
 * Animates the footer content on scroll.
 *
 * @param root - The root element containing the footer
 * @returns    The GSAP timeline
 */
function animate(root) {
  const tl = gsap.timeline();

  tl.set(root.querySelectorAll(".initialInvis"), { visibility: "visible" });

  //Fade in location text
  tl.fromTo(
    root.querySelector(`.${css.row}:first-child`),
    { opacity: 0, translateY: "-15%" },
    { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 },
  );

  //Stagger in contact buttons
  tl.fromTo(
    root.querySelectorAll(`.${css.row}:last-child > *`),
    { opacity: 0, translateY: "-15%" },
    {
      opacity: 1,
      translateY: "0%",
      ease: "sine.inOut",
      stagger: 0.05,
      duration: 0.2,
    },
    "<70%",
  );

  return tl;
}

/**
 * Footer with contact links and location.
 */
export default function Footer() {
  return (
    <footer className={css.footer} id="contact">
      <ScrollTriggeredAnimation
        animation={animate}
        className="sectionInner"
        threshold={0.5}
      >
        <div className={`initialInvis ${css.row}`}>
          <span>Jacob Ugalde · Los Angeles, CA · US Citizen</span>
        </div>
        <div className={`initialInvis ${css.row}`}>
          <Button
            href="https://www.linkedin.com/in/jacob-ugalde/"
            target="_blank"
          >
            LinkedIn
          </Button>
          <Button href="https://github.com/cobumusic" target="_blank">
            Github
          </Button>
          <Button href="/jacobUgaldeResume.pdf" target="_blank">
            Resume
          </Button>
          <Button href="mailto:jacobmugalde@gmail.com">
            jacobmugalde@gmail.com
          </Button>
        </div>
      </ScrollTriggeredAnimation>
    </footer>
  );
}
