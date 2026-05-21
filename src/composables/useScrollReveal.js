import { onMounted, onUnmounted } from 'vue'

let observer = null

export function initScrollReveal() {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -12% 0px' }
  )

  document.querySelectorAll('.slide-up, .slide-left, .slide-right, .fade-in, .scale-in').forEach((el) => {
    observer.observe(el)
  })
}

export function useScrollReveal() {
  onMounted(initScrollReveal)
  onUnmounted(() => { if (observer) observer.disconnect() })
}
