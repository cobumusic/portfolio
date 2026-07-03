"use client";
import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";

import css from "./index.module.scss";

export default forwardRef(({
  name = "",
  validators = [],
  onfocus = () => { },
  onBlur = () => { },
  onChange = () => { },
  onFinish = () => { },
  type = "text",
  autocomplete = "off",
  label = "",
  multiline = false,
  dark = false,
  initialValue = "",
  className = "",
  disabled = false,
  helperText = "",
  prefixText = "",
}, ref) => {
  const [message, setMessage] = useState(helperText);
  const [value, setValue] = useState(initialValue);
  const [validity, setValidity] = useState(null);
  const [finished, setFinished] = useState(null);
  const inputHolder = useRef();
  const input = useRef();

  //generate component className
  let fullClassName = `${css.floatingTextInput} ${className}`;
  if (dark) {
    fullClassName += ` dark ${css.dark}`;
  }

  if (validity === false) {
    fullClassName += ` ${css.invalid}`;
  } else if (validity === true) {
    fullClassName += ` ${css.valid}`;
  }

  if (multiline) {
    fullClassName += ` ${css.multiline}`;
  }
  if (disabled) {
    fullClassName += ` ${css.disabled}`;
  }


  async function validate(newValue){
    for (let validator of validators){
      if (await validator.test(newValue)){
        let result = false;
        if (validator.class === "valid"){
          result = true;
        } else if (validator.class === "invalid") {
          result = false;
        }

        setMessage(validator.message || helperText);
        setValidity(result);
        return result;
      }
    }
    return true;
  }


  useImperativeHandle(ref, () => ({
    isValid() {
      return validate(value);
    },
    getValue() {
      return value;
    },
    setValid(newValidity) {
      setValidity(newValidity);
    },
    setMessage(newMessage) {
      setMessage(newMessage);
    },
    setValue(newValue) {
      setValue(newValue);
      if (multiline){
        input.current.style.height = "0px";
        input.current.style.height = `${input.current.scrollHeight}px`;
      }
      return newValue;
    },
  }));

  return (
    <div className={fullClassName}>
      <div className={css.inputHolder} ref={inputHolder}>
        {multiline && (
          <textarea
            type={type}
            ref={input}
            placeholder="x"
            className={css.input}
            name={name}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              onChange(event.target.value);

              //delayed change
              clearTimeout(finished);
              setFinished(setTimeout(() => {
                let isValid = validate(event.target.value);
                onFinish(event.target.value, isValid);
              }, 300));
            }}
            onFocus={onfocus}
            onBlur={(event) => {
              let isValid = validate(event.target.value);
              onBlur(event.target.value, isValid);
            }}
            autoComplete={autocomplete}
            onInput={() => {
              //resize the textarea
              input.current.style.height = "0px";
              input.current.style.height = `${input.current.scrollHeight}px`;
            }}
            onKeyUp={(event) => {
              if (event.keyCode === 13) { //enter
                clearTimeout(finished);
                onFinish(event.target.value);
              }
            }}
          ></textarea>
        )}

        {!multiline && (<>
          <input
            ref={input}
            type={type}
            placeholder="x"
            className={css.input}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(event) => {
              setValue(event.target.value);
              onChange(event.target.value);

              //delayed change
              clearTimeout(finished);
              setFinished(setTimeout(() => {
                let isValid = validate(event.target.value);
                onFinish(event.target.value, isValid);
              }, 300));
            }}
            onFocus={onfocus}
            onBlur={(event) => {
              let isValid = validate(event.target.value);

              onBlur(event.target.value, isValid);
            }}
            autoComplete={autocomplete}
            onKeyUp={(event) => {
              if (event.keyCode === 13) { //enter
                clearTimeout(finished);
                onFinish(event.target.value);

                event.target.blur();
              }
            }}
          />
        </>)}
        <span className={css.prefixText}>{prefixText}</span>
        <label htmlFor={name}>
          <span>{label}</span>
        </label>
      </div>
      <div className={css.message}>{message}</div>
    </div>
  );
});
