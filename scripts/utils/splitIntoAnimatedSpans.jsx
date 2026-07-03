import React from "react";

const TARGET_CHARS = 15; //roughly 2-3 words
const MAX_WORDS = 3;

/**
 * Splits a string into span elements for staggered animation.
 * Each span contains 1-3 words, targeting roughly equal character lengths.
 *
 * @param text - String to split into animated spans
 * @returns    Array of span elements, each containing 1-3 words
 */
export default function splitIntoAnimatedSpans(text) {
  const spans = [];
  const words = text.split(/\s+/).filter(Boolean);
  let chunk = [];
  let chunkLength = 0;

  for (const word of words) {
    const wouldBeLength = chunkLength + (chunk.length > 0 ? 1 : 0) + word.length;

    if (chunk.length >= MAX_WORDS || (chunk.length > 0 && wouldBeLength > TARGET_CHARS)) {
      spans.push(chunk.join(" "));
      chunk = [word];
      chunkLength = word.length;
    } else {
      chunk.push(word);
      chunkLength = wouldBeLength;
    }
  }

  if (chunk.length > 0) {
    spans.push(chunk.join(" "));
  }

  return spans.map((spanText, i) => <span key={i}>{spanText} </span>);
}
