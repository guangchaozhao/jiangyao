// Global spotlight delegation — 任何 .glass-card 自动享有鼠标跟随光斑
// 单一 document mousemove + rAF 节流;通过 @property --spot-color 实现平滑淡入淡出

const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches
const SPOT_COLOR_ON  = 'rgba(0, 212, 255, 0.20)'
const SPOT_COLOR_OFF = 'rgba(0, 212, 255, 0)'

let currentCard = null
let pendingX = 0, pendingY = 0
let rafId = null

function flushMove() {
  rafId = null
  if (!currentCard) return
  const rect = currentCard.getBoundingClientRect()
  const x = pendingX - rect.left
  const y = pendingY - rect.top
  currentCard.style.setProperty('--spot-x', `${x}px`)
  currentCard.style.setProperty('--spot-y', `${y}px`)
}

function onDocMove(e) {
  const card = e.target instanceof Element ? e.target.closest('.glass-card') : null

  if (card !== currentCard) {
    if (currentCard) currentCard.style.setProperty('--spot-color', SPOT_COLOR_OFF)
    currentCard = card
    if (currentCard) currentCard.style.setProperty('--spot-color', SPOT_COLOR_ON)
  }

  if (currentCard) {
    pendingX = e.clientX
    pendingY = e.clientY
    if (!rafId) rafId = requestAnimationFrame(flushMove)
  }
}

function onDocLeave() {
  if (currentCard) {
    currentCard.style.setProperty('--spot-color', SPOT_COLOR_OFF)
    currentCard = null
  }
}

export function initSpotlight() {
  if (isTouch || typeof document === 'undefined') return
  document.addEventListener('mousemove', onDocMove, { passive: true })
  document.addEventListener('mouseleave', onDocLeave)
}

export function destroySpotlight() {
  document.removeEventListener('mousemove', onDocMove)
  document.removeEventListener('mouseleave', onDocLeave)
}

// 兼容老调用,保留 directive 空实现(可选给某个元素手动启用 class)
export const spotlight = {
  mounted() {},
}
