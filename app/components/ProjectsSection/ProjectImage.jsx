"use client";

import { gsap } from "@/scripts/gsap";
import Picture from "@/components/picture";
import css from "./ProjectImage.module.scss";

/**
 * Adds the border-draw-then-fade animation to a timeline.
 *
 * @param tl   - The GSAP timeline to add animations to
 * @param root - The root element containing the project image
 */
export function animateProjectImage(tl, root) {
  const container = root.querySelector(`.${css.container}`);
  const border = root.querySelector(".border");
  const image = root.querySelector(".projectImage");

  tl.set(container, { visibility: "visible" });

  //Border reveals via conic gradient mask
  tl.fromTo(border,
    { "--angle": "0deg" },
    { "--angle": "360deg", duration: 1.5, ease: "power2.inOut" });

  //Image fades in from sepia, starting at 70% of border animation
  tl.fromTo(image, { opacity: 0 }, { opacity: 1, duration: 1, ease: "sine.inOut" }, "<70%");
  tl.fromTo(image, { filter: "sepia(1)" }, { filter: "sepia(0.1)", duration: 1, ease: "sine.inOut" }, "<20%");
}

/**
 * Animated project image with border-draw reveal effect.
 *
 * @param alt  - Alt text for the image
 * @param base - Base path for the responsive image (without extension)
 */
/**
 * Project image with border-draw reveal effect.
 *
 * @param alt  - Alt text for the image
 * @param base - Base path for the responsive image (without extension)
 */
export default function ProjectImage({ alt, base }) {
  return <div className={`initialInvis ${css.container}`}>
    <div className={`border ${css.border}`} />
    <div className={`projectImage ${css.image}`}>
      <Picture
        alt={alt}
        base={base}
        exts={["webp", "png"]}
        sizes="(max-width: 700px) 100vw, (max-width: 1300px) 61vw, 80rem"
        widths={[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
      />
    </div>
  </div>;
}
