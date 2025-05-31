import { $$, $ } from './utils.js'

// Text Reveal Animation
const textReveals = [...$$('.text__reveal'), ...$$('.text__reveal--full')]

let callback = (entries) => {
  entries.forEach((entry) => {
    const target = entry.target
    const animateFor = target.dataset.animate
    if (entry.isIntersecting) {
      if (animateFor === 'letters') {
        ;[...entry.target.querySelectorAll('span')].forEach((span, idx) => {
          setTimeout(() => {
            span.style.transform = 'translateY(0)'
          }, (idx + 1) * 50)
        })
      } else if (animateFor === 'line') {
        target.firstElementChild.style.transform = 'translateY(0)'
      }
    }
  })
}

let options = {
  rootMargin: '0px',
  threshold: 1.0
}

let observer = new IntersectionObserver(callback, options)
textReveals.forEach((text) => {
  if (text.dataset.animate === 'letters') {
    let string = text.innerText
    let html = ''
    for (let i = 0; i < string.length; i++) {
      html += `<span>${string[i]}</span>`
    }
    text.innerHTML = html
  }
  observer.observe(text)
})

// About section Animation
const text = `There’s a moment right before you quit when everything is decided.
No epic music. No cheering crowd.
Just you… and your choice.

At <b>Pulse</b>, we believe <b>discipline isn’t born — it’s trained</b>.
We’re not here to scream “You got this!”
We’re the steady rhythm that reminds you who you’ve chosen to become,
even when no one’s watching.

We don’t celebrate perfection.
We celebrate <b>consistency</b>.
Every step. Every habit. Every pulse.`

const paragraph = $('.about__scroll-text')
paragraph.innerHTML = text
