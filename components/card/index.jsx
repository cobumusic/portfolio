import React, { forwardRef } from "react";
import css from "./index.module.scss";
import Picture, {StrapiPicture} from "../picture";
import Link from "next/link";

function ParentNode({href, className, children, ref}){
  if (href){
    return <Link href={href} ref={ref} className={`custom ${className}`}>{children}</Link>;
  }
  return <div ref={ref} className={className}>{children}</div>;
}

export default forwardRef(({
  strapiPicture = null,
  loading = "lazy",
  picture = {
    base: "/images/placeholder",
    widths: [500, 1000],
    exts: ["webp", "png"],
    alt: "",
  },
  sizes = "100vw",
  className = "",
  dark = false,
  tag = "",
  overlaid = false,
  href = "",
  label = "",
  children = null,
}, ref) => {
  let thisClassName = `${className} ${css.imageCard}`;
  thisClassName += dark ? ` ${css.dark}` : "";
  thisClassName += overlaid ? ` ${css.overlaid}` : "";


  return <ParentNode ref={ref} href={href} className={thisClassName}>
    <div className={css.image}>
      <div className={css.imageInner}>
        {strapiPicture && <StrapiPicture
          picture={strapiPicture}
          sizes={sizes}
          loading={loading}
        />}
        {!strapiPicture && <Picture
          base={picture.base}
          widths={picture.widths}
          exts={picture.exts}
          sizes={sizes}
          loading={loading}
          alt={picture.alt}
        />}
      </div>
      {tag && <div className={css.tag}>{tag}</div>}
    </div>
    <div className={css.body}>
      {(children || label) && <div className={css.inner}>
        <div className={css.label}>{label}</div>
        <div className={css.children}>
          {children}
        </div>
      </div>}
    </div>

  </ParentNode>;
});
