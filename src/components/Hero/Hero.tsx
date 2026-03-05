'use client'
import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import css from './Hero.module.scss'

const NAME = 'Jacob'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

/**
 * Full-viewport hero section with a GSAP-animated particle network background
 * and staggered text reveal sequence.
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle network animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    let animFrameId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const initParticles = () => {
      const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 14000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 140

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animFrameId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const resizeObs = new ResizeObserver(resize)
    resizeObs.observe(canvas)

    return () => {
      cancelAnimationFrame(animFrameId)
      resizeObs.disconnect()
    }
  }, [])

  // GSAP text reveal sequence
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(`.${css.tag}`, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        from: { y: 12 },
      })
        .fromTo(
          `.${css.greeting}`,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2',
        )
        .fromTo(
          `.${css.name} span`,
          { opacity: 0, y: 70, rotationX: -60 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.06,
            duration: 0.65,
            ease: 'back.out(1.6)',
          },
          '-=0.3',
        )
        .fromTo(
          `.${css.subtitle}`,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.25',
        )
        .fromTo(
          `.${css.description}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2',
        )
        .fromTo(
          [`.${css.ctaPrimary}`, `.${css.ctaSecondary}`],
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.45,
            ease: 'back.out(1.4)',
          },
          '-=0.2',
        )
        .fromTo(
          `.${css.scroll}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.1',
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={css.hero} ref={heroRef}>
      <canvas className={css.canvas} ref={canvasRef} />
      <div className={css.glow} />

      <div className={css.content}>
        <p className={css.tag}>Available for opportunities</p>

        <div className={css.nameRow}>
          <span className={css.greeting}>Hi, I&apos;m</span>
        </div>

        <div className={css.name} aria-label={NAME}>
          {NAME.split('').map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>

        <p className={css.subtitle}>
          <strong>Front-End</strong> &amp; Full-Stack Engineer
        </p>

        <p className={css.description}>
          I build fast, polished web experiences — from startup MVPs to
          production platforms serving millions of users.
        </p>

        <div className={css.ctas}>
          <button className={css.ctaPrimary} onClick={() => scrollTo('#work')}>
            View my work
          </button>
          <button className={css.ctaSecondary} onClick={() => scrollTo('#contact')}>
            Get in touch
          </button>
        </div>
      </div>

      <div
        className={css.scroll}
        onClick={() => scrollTo('#about')}
        role="button"
        tabIndex={0}
        aria-label="Scroll to about"
      >
        <span>Scroll</span>
        <div className={css.scrollLine} />
      </div>
    </section>
  )
}
