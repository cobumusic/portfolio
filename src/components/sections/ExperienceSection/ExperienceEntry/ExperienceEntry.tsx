import css from './ExperienceEntry.module.scss'

/**
 * Shape of a single job entry in the experience timeline.
 */
export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

/**
 * Renders a single experience timeline entry.
 *
 * @param item - The experience data to display
 */
export default function ExperienceEntry({ item }: { item: ExperienceItem }) {
  return (
    <div className={css.item} data-reveal>
      <div className={css.meta}>
        <span className={css.company}>{item.company}</span>
        <span className={css.period}>{item.period}</span>
      </div>
      <div className={css.role}>{item.role}</div>
      <div className={css.location}>{item.location}</div>
      <ul className={css.bullets}>
        {item.bullets.map((b, i) => (
          <li className={css.bullet} key={i}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}
