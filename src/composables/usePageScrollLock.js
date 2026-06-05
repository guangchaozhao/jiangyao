let lockCount = 0
let scrollY = 0
let previousHtmlOverflow = ''
let previousBodyOverflow = ''
let previousBodyPosition = ''
let previousBodyTop = ''
let previousBodyLeft = ''
let previousBodyRight = ''
let previousBodyWidth = ''

export function lockPageScroll() {
  if (typeof window === 'undefined') return
  lockCount += 1
  if (lockCount > 1) return

  const html = document.documentElement
  const body = document.body
  scrollY = window.scrollY || html.scrollTop || 0
  previousHtmlOverflow = html.style.overflow
  previousBodyOverflow = body.style.overflow
  previousBodyPosition = body.style.position
  previousBodyTop = body.style.top
  previousBodyLeft = body.style.left
  previousBodyRight = body.style.right
  previousBodyWidth = body.style.width

  html.style.overflow = 'hidden'
  body.style.overflow = 'hidden'
  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'
}

export function unlockPageScroll() {
  if (typeof window === 'undefined' || lockCount === 0) return
  lockCount -= 1
  if (lockCount > 0) return

  const html = document.documentElement
  const body = document.body
  html.style.overflow = previousHtmlOverflow
  body.style.overflow = previousBodyOverflow
  body.style.position = previousBodyPosition
  body.style.top = previousBodyTop
  body.style.left = previousBodyLeft
  body.style.right = previousBodyRight
  body.style.width = previousBodyWidth
  window.scrollTo(0, scrollY)
}
