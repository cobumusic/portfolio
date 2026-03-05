import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import css from './About.module.scss'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '7+', label: 'Years of professional experience' },
  { value: '4', label: 'Industries — defense, media, entertainment, AI' },
  { value: '3M+', label: 'Monthly users across projects' },
  { value: '300K+', label: 'Daily impressions at MSG Sphere debut' },
]

/**
 * About section with a brief bio and key career stats.
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className={`section ${css.about}`} ref={sectionRef}>
      <div className={css.grid}>
        <div className={css.text}>
          <p className="section__label" data-reveal>About</p>
          <h2 className="section__title" data-reveal>
            Building things that <span>matter</span>
          </h2>
          <p data-reveal>
            I&apos;m a front-end and full-stack engineer with a background in
            interdisciplinary computing from UC San Diego. I&apos;ve spent the
            last seven years turning complex problems into clean, fast, and
            maintainable software.
          </p>
          <p data-reveal>
            My work spans <strong>React/TypeScript applications</strong> for
            AI-driven startups, content pipelines for the Las Vegas Sphere,
            high-traffic radio platforms, and interactive exhibits — always with
            a focus on both the engineering quality and the user experience.
          </p>
          <p data-reveal>
            I care deeply about clean architecture, reusable component design,
            and shipping things that are genuinely <strong>fast and
            polished</strong>. I&apos;m equally comfortable whiteboarding
            product flows, collaborating across backend and design, and diving
            solo into a complex feature.
          </p>
        </div>

        <div className={css.stats}>
          {STATS.map(({ value, label }) => (
            <div className={css.stat} key={label} data-reveal>
              <div className={css.statValue}>{value}</div>
              <div className={css.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
