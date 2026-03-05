'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactForm from './ContactForm/ContactForm'
import css from './ContactSection.module.scss'

gsap.registerPlugin(ScrollTrigger)

/**
 * Contact section with a lead blurb and a Formspree-powered form.
 */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
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
    <section id="contact" className={`section ${css.contact}`} ref={sectionRef}>
      <div className={css.inner}>
        <div className={css.lead} data-reveal>
          <p className="section__label">Contact</p>
          <h2 className="section__title">
            Let&apos;s <span>work together</span>
          </h2>
          <p>
            I&apos;m currently open to front-end and full-stack roles. Whether
            you have a specific opportunity or just want to talk about a project
            — I&apos;d love to hear from you.
          </p>
          <p>
            I typically respond within a day or two. Looking forward to
            connecting.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
