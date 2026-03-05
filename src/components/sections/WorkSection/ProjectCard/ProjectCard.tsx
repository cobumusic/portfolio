import css from './ProjectCard.module.scss'

/**
 * Shape of a single portfolio project.
 */
export interface Project {
  type: string
  title: string
  description: string
  tech: string[]
  /** Relative path under /images/ — leave undefined to show placeholder */
  image?: string
  link?: string
}

/**
 * Displays a single portfolio project card with thumbnail, metadata, and tech tags.
 *
 * @param project - The project data to render
 */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={css.card} data-reveal>
      <div className={css.thumbnail}>
        {project.image ? (
          <img
            src={`/images/${project.image}`}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div className={css.placeholder}>
            <svg
              className={css.placeholderIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      <div className={css.body}>
        <div className={css.cardType}>{project.type}</div>
        <h3 className={css.cardTitle}>{project.title}</h3>
        <p className={css.cardDesc}>{project.description}</p>
        <div className={css.tech}>
          {project.tech.map((t) => (
            <span className={css.techTag} key={t}>
              {t}
            </span>
          ))}
        </div>

        {project.link ? (
          <a
            href={project.link}
            className={css.cardLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View project
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        ) : (
          <p className={css.comingSoon}>Details available on request</p>
        )}
      </div>
    </div>
  )
}
