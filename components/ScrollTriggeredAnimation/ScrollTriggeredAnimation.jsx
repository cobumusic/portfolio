"use client";

import { useRef, useEffect } from "react";

/**
 * Wraps its children in a div and applies a GSAP animation when the div becomes visible in the viewport.
 *
 * @param animation  - Function that returns a GSAP timeline for the animation
 * @param children   - React children to be wrapped and animated
 * @param rootMargin - [optional] Margin around the root (default: "0px")
 * @param threshold  - [optional] Percentage of the target element that needs to be visible to trigger the animation (default: 0.1)
 */
export default function ScrollTriggeredAnimation({
  animation,
  children,
  className = "",
  rootMargin = "0px",
  threshold = 0.1,
}) {
  const wrapper = useRef(null);

  //Compile the animation and set up an intersection observer
  useEffect(() => {
    if (wrapper.current) {
      const target = wrapper.current;
      const newTimeline = animation(target);
      newTimeline.pause(0);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            newTimeline.play(0);
            observer.unobserve(target);
          }
        });
      }, {
        threshold,
        rootMargin,
      });

      observer.observe(target);

      return () => {
        observer.unobserve(target);
        newTimeline.kill();
      };
    }
  }, [animation, threshold, rootMargin, wrapper]);


  return <div ref={wrapper} className={className}>{children}</div>;
}
