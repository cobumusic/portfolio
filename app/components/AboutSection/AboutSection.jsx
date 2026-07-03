"use client";
import css from "./AboutSection.module.scss";
import { gsap } from "@/scripts/gsap";
import ScrollTriggeredAnimation from "@/components/ScrollTriggeredAnimation/ScrollTriggeredAnimation";
import splitIntoAnimatedSpans from "@/scripts/utils/splitIntoAnimatedSpans";
import Button from "@/components/Button/Button";

function animate(root) {
  const tl = gsap.timeline();

  tl.set(root.querySelectorAll(".initialInvis"), { visibility: "visible" });

  //Fade in heading
  tl.fromTo(root.querySelector("h2"),
    { opacity: 0, translateY: "-15%" },
    { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 });

  //Stagger in text spans
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

  //Fade in contact links
  tl.fromTo(root.querySelectorAll(`.${css.contact} > *`),
    { opacity: 0 },
    { opacity: 1, ease: "sine.inOut", duration: 0.2, stagger: 0.05 });

  //Fade in email button
  tl.fromTo(root.querySelectorAll(`.${css.button}`),
    { opacity: 0 },
    { opacity: 1, ease: "sine.inOut", duration: 0.2 },
    "<90%");

  return tl;
}

/**
 * About section with bio text and contact form.
 */
const paragraphs = [
  "Some say that being a jack of all trades means you're a master of none, but I always say, why not both? A natural curiosity and eagerness to learn quickly has brought me towards all kinds of memorable experiences, from AI startups, to building out internet radio stations, to immersive technology in Las Vegas and beyond.",
  "Having the confidence to try and try again has shaped my career in a uniquely powerful way: I've worked with both big and small companies, in collaborative and independent environments, with reasonable paced and incredibly quick turnarounds—and I'm just getting started.",
  "If you think I'd be a great fit for your team, please reach out; my inbox is open!",
];

export default function AboutSection() {
  return (
    <section className={css.about} id="about">
      <ScrollTriggeredAnimation
        animation={animate}
        className="sectionInner"
        threshold={0.3}
      >
        <h2 className="initialInvis">About</h2>
        <div className={`initialInvis ${css.text}`}>
          {paragraphs.map((text, i) => (
            <p key={i}>{splitIntoAnimatedSpans(text)}</p>
          ))}
        </div>
        <Button
          className={`initialInvis ${css.button}`}
          href="mailto:jacobmugalde@gmail.com"
        >
          jacobmugalde@gmail.com
        </Button>
      </ScrollTriggeredAnimation>
    </section>
  );
}
