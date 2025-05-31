export const $ = (el) => document.querySelector(el)
export const $$ = (el) => document.querySelectorAll(el)

export function lerp(start, end, t) {
  return start * (1 - t) + end * t
}