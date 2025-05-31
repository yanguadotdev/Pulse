export const $ = (el) => document.querySelector(el)
export const $$ = (el) => document.querySelectorAll(el)

export function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

export function initTiltEffect({ target = null, constraint = 200 } = {}) {
  function transforms(x, y) {
    let box = target.getBoundingClientRect()
    let calcX = -(y - box.y - box.height / 2) / constraint
    let calcY = (x - box.x - box.width / 2) / constraint

    return (
      'perspective(100px) ' +
      '   rotateX(' +
      calcX +
      'deg) ' +
      '   rotateY(' +
      calcY +
      'deg) '
    )
  }

  function transformElement(el, position) {
    el.style.transform = transforms.apply(null, position)
  }

  target.onmousemove = function (e) {
    transformElement(target, [e.clientX, e.clientY])
  }

  target.addEventListener('mouseleave', () => {
    target.style.transform = 'perspective(100px) rotateX(0deg) rotateY(0deg)'
  })
}
