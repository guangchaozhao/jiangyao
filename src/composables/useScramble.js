import { ref } from 'vue'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

export function useScramble(target, duration = 1200) {
  const display = ref('')
  let frame = null

  function start() {
    const startTime = performance.now()
    const len = target.length

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const resolvedCount = Math.floor(progress * len)

      display.value = target
        .split('')
        .map((char, i) => {
          if (i < resolvedCount) return char
          if (char === ' ') return ' '
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        display.value = target
      }
    }
    frame = requestAnimationFrame(tick)
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame)
  }

  return { display, start, stop }
}
