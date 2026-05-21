// v-magnetic="strength" — 鼠标靠近时吸附,离开时弹回
// strength: 0.2 微妙 / 0.35 默认 / 0.5 显眼
// 自动跳过触屏设备 / reduced-motion

const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches
const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const DISABLED = isTouch || reduceMotion

const ATTRACT_RADIUS = 120 // 鼠标多近开始吸
const elements = new Set()
let rafId = null
let mx = -9999, my = -9999

function onMove(e) {
  mx = e.clientX
  my = e.clientY
  if (!rafId) rafId = requestAnimationFrame(update)
}

function update() {
  rafId = null
  elements.forEach(({ el, strength }) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = mx - cx
    const dy = my - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    // 元素半径 + 吸力辐射距离
    const reach = Math.max(rect.width, rect.height) / 2 + ATTRACT_RADIUS
    if (dist < reach) {
      // 距离越近吸力越大,出元素范围保持最大
      const ratio = Math.min(1, 1 - dist / reach + 0.3)
      const tx = dx * strength * ratio
      const ty = dy * strength * ratio
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`
    } else {
      el.style.transform = ''
    }
  })
}

export const magnetic = {
  mounted(el, binding) {
    if (DISABLED) return
    const strength = typeof binding.value === 'number' ? binding.value : 0.35
    el.style.transition = (el.style.transition ? el.style.transition + ', ' : '')
      + 'transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1)'
    el.style.willChange = 'transform'
    const entry = { el, strength }
    elements.add(entry)
    el._magneticEntry = entry

    if (elements.size === 1) {
      window.addEventListener('mousemove', onMove, { passive: true })
    }
  },
  unmounted(el) {
    if (DISABLED) return
    if (el._magneticEntry) elements.delete(el._magneticEntry)
    if (elements.size === 0) {
      window.removeEventListener('mousemove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
    }
  },
}
