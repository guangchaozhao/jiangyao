<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-cosmic scanlines">
    <!-- Star canvas -->
    <canvas ref="starCanvas" class="absolute inset-0 w-full h-full"></canvas>

    <!-- Hex grid overlay -->
    <div class="absolute inset-0 hex-bg opacity-60"></div>

    <!-- Radial glow -->
    <div class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 80% 60% at 50% 60%, rgba(26,111,255,0.12) 0%, transparent 70%)">
    </div>

    <!-- Scan line sweep -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-cyber/30 to-transparent animate-scan-line opacity-40"></div>
    </div>

    <!-- Left HUD decoration -->
    <div class="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 opacity-30">
      <div class="w-px h-24 bg-gradient-to-b from-transparent via-cyber to-transparent"></div>
      <div class="text-cyber text-[9px] font-esports tracking-widest rotate-90 origin-left translate-x-3">STARS ESPORTS</div>
      <div class="w-px h-24 bg-gradient-to-b from-cyber via-transparent to-transparent"></div>
    </div>

    <!-- Right HUD ring -->
    <div class="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
      <div class="relative w-56 h-56 animate-float">
        <div class="absolute inset-0 rounded-full border border-cyber/20"></div>
        <div class="absolute inset-3 rounded-full border border-electric/15"></div>
        <div class="absolute inset-8 rounded-full border border-star/10"></div>
        <!-- Rotating ring -->
        <div class="absolute inset-0 rounded-full border border-dashed border-cyber/20"
          style="animation: spin 12s linear infinite;"></div>
        <!-- Center dot -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-3 h-3 rounded-full bg-cyber animate-pulse"></div>
        </div>
        <!-- Tick marks -->
        <div v-for="n in 8" :key="n"
          class="absolute w-1.5 h-0.5 bg-cyber/40"
          :style="{ top: '50%', left: '50%', transformOrigin: '0 0',
                    transform: `rotate(${n*45}deg) translateX(100px) translateY(-50%)` }">
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <!-- Badge -->
      <div class="slide-up flex justify-center mb-8">
        <span class="section-tag font-esports text-[11px]">
          <span class="inline-block w-1.5 h-1.5 bg-cyber rounded-full mr-2 animate-pulse"></span>
          江曜擎天电竞发展（广东）有限公司
        </span>
      </div>

      <!-- Glitch title -->
      <div class="slide-up delay-100 mb-3">
        <h1
          class="font-esports font-black text-5xl md:text-7xl lg:text-8xl gradient-text-white glitch neon-text-blue"
          data-text="星辰电子竞技">
          星辰电子竞技
        </h1>
      </div>
      <div class="slide-up delay-200 mb-6">
        <span class="font-display font-bold text-3xl md:text-5xl gradient-text">综合产业园区</span>
      </div>

      <!-- Divider with dots -->
      <div class="slide-up delay-200 flex items-center justify-center gap-3 mb-8">
        <div class="flex-1 max-w-24 h-px bg-gradient-to-r from-transparent to-cyber/50"></div>
        <div class="flex gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-cyber"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-electric"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-cyber"></span>
        </div>
        <div class="flex-1 max-w-24 h-px bg-gradient-to-l from-transparent to-cyber/50"></div>
      </div>

      <!-- Typewriter slogan -->
      <div class="slide-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10">
        <div class="flex items-center gap-2 text-star font-body text-base md:text-lg">
          <span class="w-1 h-5 bg-cyber flex-shrink-0"></span>
          <span>{{ displayText1 }}<span v-if="typing1" class="cursor-blink text-cyber">|</span></span>
        </div>
        <div class="hidden sm:block w-px h-6 bg-cyber/20"></div>
        <div class="flex items-center gap-2 text-star font-body text-base md:text-lg">
          <span class="w-1 h-5 bg-electric flex-shrink-0"></span>
          <span>{{ displayText2 }}<span v-if="typing2" class="cursor-blink text-electric">|</span></span>
        </div>
      </div>

      <!-- CTA -->
      <div class="slide-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <a href="#background"
          class="cyber-btn group relative px-10 py-3.5 bg-gradient-to-r from-electric to-cyber text-white
                 font-esports font-bold text-sm rounded-sm
                 hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all duration-300 cursor-pointer overflow-hidden">
          探索园区
          <span class="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
        </a>
        <a href="#contact"
          class="cyber-btn px-10 py-3.5 border border-cyber/50 text-cyber font-esports font-bold text-sm
                 rounded-sm hover:bg-cyber/10 hover:border-cyber hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]
                 transition-all duration-300 cursor-pointer overflow-hidden">
          合作洽谈
        </a>
      </div>

      <!-- Stats bar -->
      <div class="slide-up delay-500 grid grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto overflow-hidden rounded-sm border border-cyber/15">
        <div v-for="(stat, i) in heroStats" :key="stat.label"
          class="bg-[#0A1628]/80 px-6 py-5 text-center border-r border-cyber/10 last:border-r-0 backdrop-blur-sm
                 hover:bg-cyber/5 transition-colors duration-200">
          <div class="font-esports font-bold text-xl md:text-2xl gradient-text">{{ stat.value }}</div>
          <div class="text-slate-400 text-xs mt-1 font-body">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="text-cyber/40 text-[10px] tracking-widest uppercase font-esports">SCROLL</span>
      <div class="flex flex-col gap-1">
        <div class="w-4 h-0.5 bg-cyber/60 mx-auto"></div>
        <div class="w-2 h-0.5 bg-cyber/30 mx-auto"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const starCanvas = ref(null)
let animFrame = null

const heroStats = [
  { value: '20亿+', label: '总投资规模' },
  { value: '50万㎡', label: '规划建设面积' },
  { value: '100亿+', label: '目标产业集群' },
  { value: '4.9亿', label: '中国电竞用户' },
]

// Typewriter effect
const text1 = '创世界一流百年电竞俱乐部'
const text2 = '建百亿产值数字经济中心'
const displayText1 = ref('')
const displayText2 = ref('')
const typing1 = ref(true)
const typing2 = ref(false)

function typeText(text, displayRef, typingRef, onDone) {
  let i = 0
  const interval = setInterval(() => {
    displayRef.value += text[i]
    i++
    if (i >= text.length) {
      clearInterval(interval)
      typingRef.value = false
      if (onDone) setTimeout(onDone, 300)
    }
  }, 80)
}

// Star field
function initStars(canvas) {
  const ctx = canvas.getContext('2d')
  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const stars = Array.from({ length: 250 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.2,
    twinkle: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.4 + 0.05,
    color: Math.random() > 0.8 ? '124,200,255' : '255,255,255',
  }))

  // Particles floating up
  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 200,
    vy: -(Math.random() * 0.5 + 0.2),
    vx: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.5 + 0.2,
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Stars
    stars.forEach((s) => {
      s.twinkle += s.speed * 0.03
      const a = 0.2 + 0.8 * Math.abs(Math.sin(s.twinkle))
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${s.color},${a * 0.7})`
      ctx.fill()
    })

    // Floating particles
    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      if (p.y < -10) {
        p.y = canvas.height + 10
        p.x = Math.random() * canvas.width
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0,212,255,${p.alpha * 0.6})`
      ctx.fill()
    })

    animFrame = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(() => {
  if (starCanvas.value) initStars(starCanvas.value)
  setTimeout(() => {
    typeText(text1, displayText1, typing1, () => {
      typing2.value = true
      typeText(text2, displayText2, typing2, null)
    })
  }, 800)
})
onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
