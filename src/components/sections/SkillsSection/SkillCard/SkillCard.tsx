import css from "./SkillCard.module.scss";

/**
 * Props for SkillCard.
 */
interface SkillCardProps {
  icon: string;
  name: string;
  tags: string[];
}

/**
 * Displays a single skill category card with an icon, name, and tag list.
 *
 * @param icon - Emoji icon for the category
 * @param name - Category display name
 * @param tags - List of skill tags to render
 */
export default function SkillCard({ icon, name, tags }: SkillCardProps) {
  return (
    <div className={css.category} data-reveal>
      <div className={css.categoryIcon}>{icon}</div>
      <div className={css.categoryName}>{name}</div>
      <div className={css.tags}>
        {tags.map((tag) => (
          <span className={css.tag} key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
