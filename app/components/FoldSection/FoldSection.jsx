"use client";
import Button, { BUTTON_VARIANTS } from "@/components/Button/Button";
import css from "./FoldSection.module.scss";
// import SignatureSvg from "./signature.svg";
import { useEffect, useRef } from "react";
import { gsap } from "@/scripts/gsap";
// import CustomEase from "@/scripts/gsap/CustomEase";
// import DrawSVGPlugin from "@/scripts/gsap/DrawSVGPlugin";
import GithubLogoSvg from "@/public/icons/github-logo.svg";

export default function FoldSection() {
  let signatureRef = useRef();
  let titleRef = useRef();
  let descriptionRef = useRef();
  let ctasRef = useRef();

  useEffect(() => {
    // gsap.registerPlugin(CustomEase, DrawSVGPlugin);
    // let letters = Array.from(signatureRef.current.querySelectorAll(".letterStroke"));

    // let totalLength = letters.reduce((sum, letter) => sum + letter.getTotalLength(), 0);

    // CustomEase.create("subtleInOut", "M0,0 C0.02,0 0.98,1 1,1");

    // let signatureTl = gsap.timeline({ paused: true });
    // signatureTl.set(letters, { visibility: "visible" });

    // for (let letter of letters) {
    //   let length = letter.getTotalLength();
    //   let duration = length / totalLength * letters.length;

    //   signatureTl.fromTo(letter, {
    //     drawSVG: "0% 0%",
    //   }, {
    //     drawSVG: "0% 100%",
    //     duration,
    //     ease: "linear",
    //   });
    // }

    let tl = gsap.timeline();
    tl.set(titleRef.current, { visibility: "visible" });
    tl.set(descriptionRef.current, { visibility: "visible" });
    tl.set(ctasRef.current.querySelectorAll("&>*"), { visibility: "visible" });

    // tl.to(signatureTl, { time: signatureTl.duration(), duration: 2, ease: "subtleEase" });

    tl.fromTo(
      titleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "sine.inOut" },
      ">0.3s",
    );
    tl.fromTo(
      descriptionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "sine.inOut" },
      "50%",
    );
    tl.fromTo(
      ctasRef.current.querySelectorAll("&>*"),
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "sine.inOut", stagger: 0.05 },
      "50%",
    );
  }, []);

  return (
    <section className={css.intro}>
      <div className="sectionInner">
        <h1>Hello, I&apos;m</h1>
        {/* <h1></h1> */}
        <div className={css.signature} ref={signatureRef}>
          {/* <SignatureSvg /> */}
          <span className={css.signatureText}>Jacob Ugalde</span>
        </div>
        <div className={`initialInvis ${css.subheadline}`} ref={titleRef}>
          Design Engineer
        </div>
        <div className={`initialInvis ${css.description}`} ref={descriptionRef}>
          <span>
            {/* Most teams have designers who can&apos;t code and developers who
            can&apos;t design. I do both. */}
            Creative who loves to code. Experienced professional who loves to
            learn. Solo dev ready to make great things, together.
          </span>
        </div>
        <div className={css.ctas} ref={ctasRef}>
          <Button className="initialInvis" href="#projects">
            View Featured Work
          </Button>
          <Button
            className="initialInvis"
            href="#contact"
            variant={BUTTON_VARIANTS.GHOST}
          >
            Start a Project
          </Button>
        </div>
      </div>
    </section>
  );
}
