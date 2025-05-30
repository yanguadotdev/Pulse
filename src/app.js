import { $$ } from "./utils.js"

// Text Reveal Animation
const textReveals = [...$$('.text__reveal')]

let callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      ;[...entry.target.querySelectorAll('span')].forEach((span, idx) => {
        setTimeout(() => {
          span.style.transform = 'translateY(0)'
        }, (idx + 1) * 50)
      })
    }
  })
}

let options = {
  rootMargin: '0px',
  threshold: 1.0
}

let observer = new IntersectionObserver(callback, options)
textReveals.forEach((text) => {
  let string = text.innerText
  let html = ''
  for (let i = 0; i < string.length; i++) {
    html += `<span>${string[i]}</span>`
  }
  text.innerHTML = html
  observer.observe(text)
})
