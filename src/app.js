import { $$, $, lerp } from './utils.js'
import { createCards } from './cards.js'

createCards()

const main = $('#main')

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

// Video Section
const videoSection = $('#video')
const video = $('.main__video')
const headerLeft = $('.text__header__left')
const headerRight = $('.text__header__right')

function animateVideo() {
  let { bottom } = videoSection.getBoundingClientRect()
  let scale = 1 - (bottom - window.innerHeight) * 0.0005
  scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale
  video.style.transform = `scale(${scale})`

  // Text transformation
  let textTrans = bottom - window.innerHeight
  textTrans = textTrans < 0 ? 0 : textTrans
  headerLeft.style.transform = `translate(${-textTrans}px)`
  headerRight.style.transform = `translate(${textTrans}px)`
}

main.addEventListener('scroll', animateVideo)

// Cards Section
const cardsSection = $('#cards')
const cardsSticky = $('.cards__sticky')
const cardsSlider = $('.cards__slider')

let projectTargetX = 0
let projectCurrentX = 0

let percentages = {
  small: 700,
  medium: 540,
  large: 540
}

let limit =
  window.innerWidth <= 600
    ? percentages.small
    : window.innerWidth <= 1100
    ? percentages.medium
    : percentages.large

function setLimits() {
  limit =
    window.innerWidth <= 600
      ? percentages.small
      : window.innerWidth <= 1100
      ? percentages.medium
      : percentages.large
}

window.addEventListener('resize', setLimits)

function animateCards() {
  const rect = cardsSticky.getBoundingClientRect()

  // Only animate if it is within the viewport
  if (rect.bottom < 0 || rect.top > window.innerHeight) return

  let offsetTop = cardsSticky.parentElement.offsetTop
  let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100
  percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage
  projectTargetX = percentage
  projectCurrentX = lerp(projectCurrentX, projectTargetX, 0.1)
  cardsSlider.style.transform = `translate3d(${-projectCurrentX}vw, 0, 0)`
}

function animate() {
  animateCards()
  requestAnimationFrame(animate)
}

animate()
