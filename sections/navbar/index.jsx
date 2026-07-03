"use client";
import css from "./index.module.scss";
import Link from "next/link";
import gsap from "scripts/gsap/index.js";
import { useRef, useState, useEffect } from "react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Contact",
    href: "#about",
  },
];

export default function Navbar({
  dark = false,
}) {
  const navItems = useRef([]);

  const [menuOpenAnimation, setMenuOpenAnimation] = useState(null);
  const [menuCloseAnimation, setMenuCloseAnimation] = useState(null);

  const [status, setStatus] = useState("closed");

  useEffect(() => {
    let openTl = gsap.timeline({paused: true});
    openTl.to(navItems.current, {
      translateX: "-100%",
      duration: 0.15,
      ease: "sine.out",
      stagger: {
        each: 0.025,
      },
    }, "<25%");

    let closeTl = gsap.timeline({paused: true});
    closeTl.to(navItems.current, {
      translateX: "0%",
      duration: 0.15,
      ease: "sine.in",
      stagger: {
        each: 0.025,
        from: "end",
      },
    }, "<25%");

    setMenuCloseAnimation(closeTl);
    setMenuOpenAnimation(openTl);

    return () => {
      openTl.kill();
      closeTl.kill();
    };
  }, []);


  function toggleBurger(){
    if (status === "closed"){
      menuOpenAnimation.seek(0);
      menuOpenAnimation.resume();
      setStatus("open");
    } else if (status === "open"){
      menuCloseAnimation.seek(0);
      menuCloseAnimation.resume();
      setStatus("closed");
    }
  }


  let thisClassName = `${css.navbar}`;
  thisClassName += ` ${dark ? css.dark : ""}`;


  return <nav className={thisClassName}>
    <div className={css.navbarInner}>
      <div className={css.navItems}>
        <div className={css.close} ref={(element) => {
          navItems.current[0] = element;
        }}
        >
          <button className={css.burger} onClick={toggleBurger} aria-label="Nav Menu">
            <svg width="1.5rem" height="1.5rem" viewBox="0 0 30 30" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.34 3.82c-1.108.055-2.033 1.508-.952 2.534l8.54 8.541-8.567 8.566a1.451 1.451 0 102.053 2.053l8.566-8.566 8.566 8.566a1.452 1.452 0 102.053-2.053l-8.566-8.566 8.54-8.541c1.443-1.368-.684-3.495-2.052-2.053l-8.54 8.541-8.54-8.54c-.342-.361-.732-.5-1.102-.481z" fill="#ffffff"/>
            </svg>
          </button>
        </div>
        {links.map((link, idx) => <Link
          key={link.href}
          className={css.navItem}
          ref={(element) => {
            navItems.current[idx + 1] = element;
          }}
          href={link.href}
        >{link.name}</Link>)}
      </div>
      <button className={css.burger} onClick={toggleBurger} aria-label="Nav Menu">
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 30 30" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 14.879c0-.802-.65-1.452-1.452-1.452H1.452c-1.936 0-1.936 2.904 0 2.904h27.096c.802 0 1.452-.65 1.452-1.452zm0-9.677c0-.802-.65-1.452-1.452-1.452H1.452c-1.885.05-1.885 2.854 0 2.903h27.096c.802 0 1.452-.65 1.452-1.451zm0 19.354c0-.801-.65-1.451-1.452-1.451H1.452c-1.987-.052-1.987 2.955 0 2.903h27.096c.802 0 1.452-.65 1.452-1.452z" />
        </svg>
      </button>
    </div>
  </nav>;
}
