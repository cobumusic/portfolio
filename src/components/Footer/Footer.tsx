'use client'
import css from './Footer.module.scss'

/**
 * Minimal site footer with copyright and quick navigation links.
 */
export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={css.footer}>
      <p className={css.copy}>
        &copy; {new Date().getFullYear()} Jacob. Built with React &amp; GSAP.
      </p>
      <nav className={css.links}>
        {[
          ['About', '#about'],
          ['Experience', '#experience'],
          ['Work', '#work'],
          ['Contact', '#contact'],
        ].map(([label, href]) => (
          <span
            key={href}
            className={css.link}
            onClick={() => scrollTo(href)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && scrollTo(href)}
          >
            {label}
          </span>
        ))}
      </nav>
    </footer>
  )
}
