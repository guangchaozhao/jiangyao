import { ref } from 'vue'

export function useCountUp(target, duration = 2000, suffix = '') {
  const display = ref('0')
  let started = false

  function start() {
    if (started) return
    started = true
    const start = performance.now()
    const isFloat = target % 1 !== 0

    function update(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      display.value = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix
      if (progress < 1) requestAnimationFrame(update)
      else display.value = target + suffix
    }
    requestAnimationFrame(update)
  }

  return { display, start }
}
