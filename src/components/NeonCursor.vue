<template>
  <div>
    <!-- Inner dot -->
    <div class="cursor-dot" :style="dotStyle"></div>
    <!-- Outer ring -->
    <div class="cursor-ring" :style="ringStyle" :class="{ 'cursor-ring--hover': isHover, 'cursor-ring--click': isClick }"></div>
    <!-- Click ripples -->
    <div v-for="r in ripples" :key="r.id"
      class="cursor-ripple"
      :style="{ left: r.x + 'px', top: r.y + 'px' }">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const mouse = reactive({ x: -100, y: -100 })
const ring  = reactive({ x: -100, y: -100 })
const isHover = ref(false)
const isClick = ref(false)
const ripples = ref([])
let rippleId = 0
let rafId = null

const dotStyle = computed(() => ({
  transform: `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`,
}))
const ringStyle = computed(() => ({
  transform: `translate(${ring.x - 18}px, ${ring.y - 18}px)`,
}))

function lerp(a, b, t) { return a + (b - a) * t }

function animate() {
  ring.x = lerp(ring.x, mouse.x, 0.12)
  ring.y = lerp(ring.y, mouse.y, 0.12)
  rafId = requestAnimationFrame(animate)
}

function onMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onEnter(e) {
  const tag = e.target.tagName.toLowerCase()
  const cur = window.getComputedStyle(e.target).cursor
  isHover.value = tag === 'a' || tag === 'button' || cur === 'pointer'
}

function onClick(e) {
  isClick.value = true
  setTimeout(() => { isClick.value = false }, 300)
  const id = ++rippleId
  ripples.value.push({ id, x: e.clientX, y: e.clientY })
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id)
  }, 700)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onEnter)
  window.addEventListener('click', onClick)
  animate()
  // Hide default cursor
  document.documentElement.style.cursor = 'none'
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onEnter)
  window.removeEventListener('click', onClick)
  if (rafId) cancelAnimationFrame(rafId)
  document.documentElement.style.cursor = ''
})
</script>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0; left: 0;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #00D4FF;
  box-shadow: 0 0 10px rgba(0,212,255,0.9), 0 0 20px rgba(0,212,255,0.5);
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
}

.cursor-ring {
  position: fixed;
  top: 0; left: 0;
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,212,255,0.7);
  box-shadow: 0 0 8px rgba(0,212,255,0.3), inset 0 0 8px rgba(0,212,255,0.1);
  pointer-events: none;
  z-index: 99998;
  will-change: transform;
  transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.cursor-ring--hover {
  width: 52px; height: 52px;
  border-color: rgba(0,212,255,1);
  box-shadow: 0 0 16px rgba(0,212,255,0.5), inset 0 0 12px rgba(0,212,255,0.15);
  margin-top: -8px; margin-left: -8px;
}

.cursor-ring--click {
  width: 20px; height: 20px;
  border-color: rgba(0,212,255,1);
  box-shadow: 0 0 20px rgba(0,212,255,0.8);
  margin-top: 8px; margin-left: 8px;
}

.cursor-ripple {
  position: fixed;
  top: 0; left: 0;
  width: 0; height: 0;
  border-radius: 50%;
  border: 1px solid rgba(0,212,255,0.6);
  pointer-events: none;
  z-index: 99997;
  transform: translate(-50%, -50%);
  animation: ripple-out 0.7s ease-out forwards;
}

@keyframes ripple-out {
  0%   { width: 0;     height: 0;     opacity: 0.8; border-width: 1.5px; }
  100% { width: 80px;  height: 80px;  opacity: 0;   border-width: 0.5px; }
}
</style>
