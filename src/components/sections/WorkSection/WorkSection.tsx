'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard, { type Project } from './ProjectCard/ProjectCard'
import css from './WorkSection.module.scss'

gsap.registerPlugin(ScrollTrigger)

// Add projects here. Drop screenshots into /public/images/ and set the `image` field.
const PROJECTS: Project[] = [
  {
    type: 'AI Platform',
    title: 'SymbyAI — Research Platform',
    description:
      'Core web application for an AI-driven platform automating peer review. Built end-to-end user flows for paper uploading, AI-assisted analysis, team review, org management, and topic-based discovery.',
    tech: ['TypeScript', 'React', 'SCSS', 'Stripe', 'RESTful API', 'Mixpanel'],
  },
  {
    type: 'Creative Tech',
    title: 'MSG Sphere Content Pipelines',
    description:
      'Interactive tooling and visual content libraries for the Las Vegas Sphere, enabling 100+ brands and artists to preview and customize content for the world\'s largest LED display.',
    tech: ['Unreal Engine', 'JavaScript', 'Python', 'C++', 'Blueprints'],
  },
  {
    type: 'Web Platform',
    title: 'idobi Network Redesign',
    description:
      'Complete site overhaul for a 3M+ visitor/month internet radio station — custom radio players, rebuilt WordPress plugins, expanded ad inventory, and boosted revenue by 45%.',
    tech: ['React', 'JavaScript', 'PHP', 'WordPress', 'HTML/CSS'],
  },
  {
    type: 'Interactive Exhibit',
    title: 'WNBA Phoenix Conference',
    description:
      'Solo-developed an interactive exhibit for the WNBA Phoenix conference that generated ~2,000 interactions over 2 days using custom hardware and real-time visual programming.',
    tech: ['Python', 'TouchDesigner', 'Hardware Integration'],
  },
  {
    type: 'Mobile App',
    title: 'Dressertation',
    description:
      'Early-stage mobile app enabling users to scan wardrobes and receive AI-generated outfit suggestions. Designed in Figma, built in Android Studio.',
    tech: ['Java', 'Kotlin', 'XML', 'Android Studio', 'Figma'],
  },
  {
    type: 'Defense / Data Viz',
    title: 'General Atomics Internal Tools',
    description:
      'Full-stack B2B tools for live database visualization and AI error-prediction dashboards, cutting fatal error rates by 40% and saving $340K annually.',
    tech: ['Python', 'JavaScript', 'SQL', 'Data Visualization'],
  },
]

/**
 * Work section displaying a grid of project cards.
 * Add screenshots by placing images in /public/images/ and setting the `image` field on each project.
 */
export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className={`section ${css.work}`} ref={sectionRef}>
      <p className="section__label" data-reveal>
        Work
      </p>
      <h2 className="section__title" data-reveal>
        Selected <span>projects</span>
      </h2>
      <p className="section__subtitle" data-reveal>
        A selection of the platforms, tools, and experiences I&apos;ve shipped
        across industries.
      </p>

      <div className={css.grid}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
