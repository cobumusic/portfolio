"use client";
import { useRef, useState } from "react";
import FloatingTextInput from "@/components/floatingTextInput";
import Form from "@/components/form";
import css from "./contactForm.module.scss";

export default function ContactForm({}) {
  const [refs, setForm] = useState({
    name: useRef(),
    email: useRef(),
    context: useRef(),
  });

  function getBody(){
    return {
      service: "General Contact",
      name: refs.name.current.getValue(),
      email: refs.email.current.getValue(),
      context: refs.context.current.getValue(),
    };
  }

  return <Form
    endpoint="/api/forms/contact"
    refs={refs}
    cta="Reach Out"
    getBody={getBody}
    success="Thank you! Your message has been received and I will respond within 72 hours."
  >
    <h3 className={css.h3}>Start a Project</h3>
    <p>Want to build something cool together? Drop me a line below or at <a href="mailto:jacobmugalde@gmail.com"> jacobmugalde@gmail.com</a> - I&apos;m always excited to tackle a new challenge!</p>

    <FloatingTextInput
      label="Name"
      name="name"
      autocomplete="true"
      validators={[
        {test: (val) => /^$/.test(val), class: "invalid", message: "Required"},
        {test: (val) => /^.*$/.test(val), class: "valid", message: ""},
      ]}
      ref={refs.name}
    />
    <FloatingTextInput
      label="Email"
      type="email"
      name="email"
      autocomplete="true"
      validators={[
        {test: (val) => /^$/.test(val), class: "invalid", message: "Required"},
        {test: (val) => /^.*@.*$/.test(val), class: "valid", message: ""},
        {test: (val) => /.*/.test(val), class: "invalid", message: "Must be an email"},
      ]}
      ref={refs.email}
    />

    <FloatingTextInput
      label="Message"
      multiline
      validators={[
        {test: (val) => /^$/.test(val), class: "invalid", message: "Required"},
        {test: (val) => /^.*$/.test(val), class: "valid", message: ""},
      ]}
      ref={refs.context}
    />
  </Form>;
}


