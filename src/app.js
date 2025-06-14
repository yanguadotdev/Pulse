import { $$, $, lerp } from './utils.js'
import { createCards, lengthCards } from './cards.js'

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
const words = paragraph.innerHTML.match(/<b>.*?<\/b>|\S+/g)
let htmlStr = ''
words.forEach((el) => {
  const isBold = el.startsWith('<b>')
  htmlStr += (isBold ? el : `<span>${el}</span>`) + ' '
})

paragraph.innerHTML = htmlStr
console.log()
const spans = [...paragraph.querySelectorAll('span')]
function revealSpan() {
  for (let i = 0; i < spans.length; i++) {
    if (
      spans[i].parentElement.getBoundingClientRect().top <
      window.innerHeight * 0.66
    ) {
      let { left, top } = spans[i].getBoundingClientRect()
      top = top - window.innerHeight * 0.66
      let opacityValue =
        1 - (top * 0.01 + left * 0.001) < 0.1
          ? 0.1
          : 1 - (top * 0.01 + left * 0.001).toFixed(3)
      opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3)
      spans[i].style.opacity = opacityValue
    }
  }
}

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

// Cards Section

const cardsSection = $('#cards')
const cardsSticky = $('.cards__sticky')
const cardsSlider = $('.cards__slider')

// ***** LOGIC FOR RESPONSIVE SLIDER *******
let wCard = 100
const MATHMEDIA = window.matchMedia('(min-width: 800px)')
function handleMediaChange(e) {
  if (e.matches) {
    wCard = 50
  } else {
    wCard = 100
  }
  cardsSection.style.setProperty('--w-card', `${wCard}vw`)
  cardsSection.style.setProperty('--h-section-card', `${wCard * lengthCards}%`)
  const calc = 100 / (lengthCards / (100 / wCard))
  cardsSection.style.setProperty('--h-card-sticky', `${calc}%`)
}

handleMediaChange(MATHMEDIA)
MATHMEDIA.addEventListener('change', handleMediaChange)

createCards()

// ******************************************

let projectTargetX = 0
let projectCurrentX = 0

let limit = null

function setLimits() {
  limit =
    window.innerWidth <= 800
      ? lengthCards * 100 - 100
      : (lengthCards / (100 / wCard)) * 100 - 100
}

setLimits()

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

// Quote Animation
const quoteContainer = $('.quote__container')
const leftTexts = $$('.text__left')
const rightTexts = $$('.text__right')

function scrollQuote() {
  let { bottom, top } = quoteContainer.getBoundingClientRect()
  let textTrans = bottom - window.innerHeight
  textTrans = textTrans < 0 ? 0 : textTrans

  const rotation = textTrans * 0.05
  const visibleAmount = window.innerHeight - top
  const maxVisible = window.innerHeight * 1
  const opacity = Math.min(Math.max(visibleAmount / maxVisible, 0), 1)

  leftTexts.forEach((leftText) => {
    leftText.style.transform = `translateX(${-textTrans}px) rotate(${rotation}deg)`
    leftText.style.opacity = opacity
  })

  rightTexts.forEach((rightText) => {
    rightText.style.transform = `translateX(${textTrans}px) rotate(-${rotation}deg)`
    rightText.style.opacity = opacity
  })
}

// Clock Animation
const containerLabels = $('.clock__labels')
const fragment = document.createDocumentFragment()
Array.from({ length: 12 }).map((_, i) => {
  const span = document.createElement('span')
  span.style.setProperty('--i', i)
  span.innerHTML = `<span>NOW</span>`
  fragment.appendChild(span)
})
containerLabels.append(fragment)

const hourHand = document.querySelector('.hour-hand')
const minuteHand = document.querySelector('.minute-hand')
const secondHand = document.querySelector('.second-hand')

function setTime() {
  const now = new Date()
  const hours = now.getHours() % 12
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const hourDeg = (360 / 12) * hours + (30 / 60) * minutes
  const minuteDeg = (360 / 60) * minutes + (6 / 60) * seconds
  const secondDeg = (360 / 60) * seconds

  hourHand.style.transform = `rotate(${hourDeg}deg)`
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`
  secondHand.style.transform = `rotate(${secondDeg}deg)`
}

setInterval(setTime, 1000)
setTime()

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
main.addEventListener('scroll', () => {
  animateVideo()
  scrollQuote()
  revealSpan()
})
revealSpan()
function animate() {
  animateCards()
  requestAnimationFrame(animate)
}

animate()
