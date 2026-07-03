"use client";
import ScrollTriggeredAnimation from "@/components/ScrollTriggeredAnimation/ScrollTriggeredAnimation";
import gsap from "scripts/gsap/index.js";
import DividerSvg from "./divider.svg";
import css from "./ExpandingHr.module.scss";

function animate(root) {
  let tl = gsap.timeline();
  tl.set(root.querySelectorAll(".initialInvis"), { visibility: "visible" });

  tl.fromTo(root.querySelector(".diamond1"), { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "sine.inOut" });
  tl.fromTo(root.querySelector(".diamond2"), { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "sine.inOut" }, "<50%");

  tl.fromTo(root.querySelectorAll(".circleBig"), { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "sine.inOut" }, "<50%");
  tl.fromTo(root.querySelectorAll(".circleSmall"), { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "sine.inOut" }, "<50%");
  tl.fromTo(root.querySelectorAll(".line"), { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.5, ease: "sine.inOut" }, "<25%");

  return tl;
}


export default function ExpandingHr({ className }) {
  return <ScrollTriggeredAnimation animation={animate} className={`${css.expandingHr} ${className}`} threshold={0.5}>
    <DividerSvg />
  </ScrollTriggeredAnimation>;
}
