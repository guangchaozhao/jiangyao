import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.slide-up, .slide-left, .slide-right, .fade-in, .scale-in').forEach((el) => {
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
