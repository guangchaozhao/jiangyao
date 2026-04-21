<template>
  <Transition name="btt">
    <button v-if="show" @click="scrollTop"
      class="fixed bottom-8 right-6 z-50 w-11 h-11 flex items-center justify-center
             border border-cyber/50 bg-[#050B1A]/90 backdrop-blur-sm
             hover:bg-cyber/15 hover:border-cyber hover:shadow-[0_0_20px_rgba(0,212,255,0.35)]
             transition-all duration-300 rounded-sm group cursor-pointer"
      aria-label="返回顶部">
      <!-- Rotating ring -->
      <svg class="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-60 transition-opacity"
        viewBox="0 0 44 44" fill="none">
        <rect x="1" y="1" width="42" height="42" rx="2"
          stroke="url(#btt-grad)" stroke-width="1" stroke-dasharray="4 3"/>
        <defs>
          <linearGradient id="btt-grad" x1="0" y1="0" x2="44" y2="44">
            <stop stop-color="#00D4FF"/>
            <stop offset="1" stop-color="#1A6FFF"/>
          </linearGradient>
        </defs>
      </svg>
      <!-- Arrow -->
      <svg class="w-4 h-4 text-cyber group-hover:-translate-y-0.5 transition-transform duration-200"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)

function onScroll() {
  show.value = window.scrollY > 400
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.btt-enter-active, .btt-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.btt-enter-from, .btt-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
