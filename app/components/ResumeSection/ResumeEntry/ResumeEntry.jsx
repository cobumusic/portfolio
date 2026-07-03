"use client";
import css from "./ResumeEntry.module.scss";
import Chip from "@/components/Chip/Chip";
import ScrollTriggeredAnimation from "@/components/ScrollTriggeredAnimation/ScrollTriggeredAnimation";
import { gsap } from "@/scripts/gsap";
import splitIntoAnimatedSpans from "@/scripts/utils/splitIntoAnimatedSpans";


function animate(root) {
  let tl = gsap.timeline();


  //Draw separator line
  tl.set(root.querySelectorAll(".initialInvis"), { visibility: "visible" });
  tl.fromTo(root.querySelector(`.${css.verticalSeparator}`), { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, ease: "sine.inOut", duration: 0.2 });
  tl.fromTo(root.querySelector("h3"), { opacity: 0, translateY: "-15%" }, { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 }, "<90%");
  tl.fromTo(root.querySelector(`.${css.subtitle}`), { opacity: 0, translateY: "-15%" }, { opacity: 1, translateY: "0%", ease: "sine.inOut", duration: 0.2 }, "<70%");

  tl.fromTo(root.querySelectorAll(`.${css.body} span`), {
    opacity: 0,
    translateY: "-15%",
  }, {
    opacity: 1,
    translateY: "0%",
    ease: "sine.inOut",
    stagger: 0.01,
    duration: 0.1,
  }, "<70%");

  tl.fromTo(root.querySelectorAll(`.${css.tech} > *`), {
    opacity: 0,
  }, {
    opacity: 1,
    ease: "sine.inOut",
    duration: 0.2,
    stagger: { each: 0.05, from: "center" },
  });

  return tl;
}

export default function ResumeEntry({
  body,
  subtitle,
  techs,
  title,
}) {
  return <ScrollTriggeredAnimation animation={animate} className={css.resumeEntry} threshold={0.5}>
    <div className={`initialInvis ${css.verticalSeparator}`}></div>

    <h3 className="initialInvis">{title}</h3>
    <div className={`initialInvis ${css.subtitle}`}>{subtitle}</div>
    <div className={`initialInvis ${css.body}`}>
      {body.map((paragraph, i) => <p key={i}>{splitIntoAnimatedSpans(paragraph)}</p>)}
    </div>

    <div className={`initialInvis ${css.tech}`}>
      {techs.map((tech) => <Chip icon={tech.icon} text={tech.text} key={tech.text} />)}
    </div>
  </ScrollTriggeredAnimation>;
}
