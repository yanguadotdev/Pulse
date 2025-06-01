import { $, initMouseParallax, initTiltEffect } from './utils.js'

const cards = [
  {
    type: 'quote',
    pos: 'start',
    image: './src/assets/showcase/card01.webp'
  },
  {
    type: 'quote',
    pos: 'mid',
    image: './src/assets/showcase/card02.webp'
  },
  {
    type: 'quote',
    pos: 'end',
    image: './src/assets/showcase/card03.webp'
  },
  {
    type: 'quote',
    pos: 'mid',
    image: './src/assets/showcase/card04.webp'
  },
  {
    type: 'quote',
    pos: 'end',
    image: './src/assets/showcase/card05.webp'
  },
  {
    type: 'quote',
    pos: 'mid',
    image: './src/assets/showcase/card06.webp'
  },
  {
    type: 'quote',
    pos: 'start',
    image: './src/assets/showcase/card07.webp'
  },
  {
    type: 'quote',
    pos: 'mid',
    image: './src/assets/showcase/card08.webp'
  },
  {
    type: 'quote',
    pos: 'end',
    image: './src/assets/showcase/card09.webp'
  },
  {
    type: 'quote',
    pos: 'mid',
    image: './src/assets/showcase/card10.webp'
  },
  {
    type: 'quote',
    pos: 'start',
    image: './src/assets/showcase/card11.webp'
  },
  {
    type: 'quote',
    pos: 'mid',
    image: './src/assets/showcase/card12.webp'
  }
]

const createCards = () => {
  const slider = $('.cards__slider')
  cards.forEach((card) => {
    let panel = document.createElement('article')
    panel.classList.add('card', `${card.pos}`)

    let span = document.createElement('span')
    span.innerText = 'VIEW'

    let imageContainer = document.createElement('div')
    imageContainer.className = 'image__container box-center'
    
    let image = document.createElement('img')
    image.classList.add('card__image')
    image.src = card.image
    initTiltEffect({ target: imageContainer })
    initMouseParallax(image, span, 4)

    imageContainer.append(image, span)
    panel.append(imageContainer)

    slider.appendChild(panel)
  })
}

const lengthCards = cards.length

export { createCards, lengthCards }
