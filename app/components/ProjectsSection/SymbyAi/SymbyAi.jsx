import { gsap } from "@/scripts/gsap";
import DrawSVGPlugin from "@/scripts/gsap/DrawSVGPlugin";
import ScrollTriggeredAnimation from "@/components/ScrollTriggeredAnimation/ScrollTriggeredAnimation";
import SymbyInkSvg from "./symbyInk.svg";
import css from "./SymbyAi.module.scss";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * Creates the ink drawing animation timeline.
 *
 * @param target - The container element to query for paths
 * @returns      GSAP timeline animating the ink paths
 */
function createInkAnimation(target) {
  const paths = [...target.querySelectorAll("path.ink")].sort(() => Math.random() - 0.5);
  const tl = gsap.timeline();

  let offset = 0;
  for (const path of paths) {
    const length = path.getTotalLength();
    const duration = length / 500;

    tl.fromTo(path,
      { drawSVG: "0 0" },
      { drawSVG: "0% 100%", duration },
      offset);
    offset += 0.01;
  }

  return tl;
}


export default function SymbyAi() {
  return <ScrollTriggeredAnimation animation={createInkAnimation}>
    <div className={css.container}>
      <SymbyInkSvg />
    </div>
  </ScrollTriggeredAnimation>;
}
