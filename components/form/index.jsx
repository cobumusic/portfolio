"use client";
import { useRef, useState } from "react";
import css from "./index.module.scss";
import Button, { BUTTON_VARIANTS } from "@/components/Button/Button";

const STATUSES = {
  SENDING: "WORKING",
  SUCCESS: "SUCCESS",
  READY: "READY",
  ERROR: "ERROR",
};


export default function Form({
  children,
  refs,
  cta,
  endpoint,
  className,
  getBody = () => { },
  success = "Message sent.",
  innerClassName = "",
  dark = false,
}) {
  const [status, setStatus] = useState(STATUSES.READY);


  async function submit() {
    let allValid = true;
    for (const [key, element] of Object.entries(refs)) {
      if (!(await element.current.isValid())) {
        allValid = false;
      }
    }

    if (allValid) {
      setStatus(STATUSES.SENDING);

      fetch(endpoint, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(getBody(refs)),
      })
        .then((res) => {
          if (res.ok) {
            setStatus(STATUSES.SUCCESS);
          } else {
            setStatus(STATUSES.ERROR);
          }
        });
    }
  }


  let thisClassName = `${css.form} ${className}`;
  thisClassName += ` ${status === STATUSES.ERROR ? css.error : ""}`;
  thisClassName += ` ${status === STATUSES.SUCCESS ? css.success : ""}`;

  return <div className={thisClassName}>
    <div className={`${css.main} ${innerClassName}`}>
      {children}
      <Button dark={dark} loading={status === STATUSES.SENDING} onClick={submit} variant={BUTTON_VARIANTS.GHOST}>{cta}</Button>
    </div>
    <div className={css.successMessage}>{success}</div>
    <div className={css.errorMessage}>An error occurred. Please contact me directly at: <a href="mailto:jacobmugalde@gmail.com">jacobmugalde@gmail.com</a>.</div>
  </div>;
}


