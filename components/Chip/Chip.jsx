import css from "./Chip.module.scss";

/**
 * A pill-shaped chip displaying an icon and text label.
 *
 * @param icon - SVG icon element to display
 * @param text - Text label for the chip
 */
export default function Chip({icon, text}) {
  return <span className={css.chip}>
    {icon && <span className={css.icon}>{icon}</span>}
    <span className={css.text}>{text}</span>
  </span>;
}
