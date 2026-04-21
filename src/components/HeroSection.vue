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
    <div class="relative z-10 max-w-7xl mx-auto px-6 text-center pt-28">
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
          class="font-esports font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl gradient-text-white glitch neon-text-blue"
          data-text="星辰电子竞技">
          星辰电子竞技
        </h1>
      </div>
      <div class="slide-up delay-200 mb-6">
        <span class="font-display font-bold text-2xl sm:text-3xl md:text-5xl gradient-text">综合产业园区</span>
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
      <div class="slide-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10">
        <div class="flex items-center gap-2 text-star font-body text-sm md:text-base lg:text-lg">
          <span class="w-1 h-5 bg-cyber flex-shrink-0"></span>
          <span>{{ displayText1 }}<span v-if="typing1" class="cursor-blink text-cyber">|</span></span>
        </div>
        <div class="hidden sm:block w-px h-6 bg-cyber/20"></div>
        <div class="flex items-center gap-2 text-star font-body text-sm md:text-base lg:text-lg">
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

      <!-- Inline video player -->
      <div class="slide-up delay-500 max-w-2xl mx-auto mb-10 group cursor-pointer"
        @click="videoModal = true">
        <div class="relative rounded-sm overflow-hidden border border-cyber/20
                    hover:border-cyber/50 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]
                    transition-all duration-300">
          <video ref="heroThumb" :src="videoSrc" class="w-full aspect-video object-cover"
            muted preload="metadata"></video>
          <div class="absolute inset-0 bg-[#030912]/55 group-hover:bg-[#030912]/35 transition-colors duration-300"></div>
          <!-- HUD corners -->
          <div class="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyber/70"></div>
          <div class="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyber/70"></div>
          <div class="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-cyber/70"></div>
          <div class="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-cyber/70"></div>
          <!-- Play button -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="relative">
              <div class="absolute inset-0 rounded-full border border-cyber/30 animate-ping opacity-30"></div>
              <div class="w-14 h-14 rounded-full bg-cyber/20 border border-cyber/60
                          group-hover:bg-cyber/35 group-hover:border-cyber
                          group-hover:shadow-[0_0_24px_rgba(0,212,255,0.5)]
                          transition-all duration-300 flex items-center justify-center">
                <svg class="w-6 h-6 text-cyber ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video modal -->
      <Teleport to="body">
        <Transition name="vmodal">
          <div v-if="videoModal"
            class="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            @click.self="closeVideo">
            <div class="relative w-full max-w-5xl mx-4">
              <button @click="closeVideo"
                class="absolute -top-10 right-0 text-slate-400 hover:text-white transition-colors text-sm font-body flex items-center gap-2">
                关闭
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <div class="border border-cyber/30 rounded-sm overflow-hidden shadow-[0_0_80px_rgba(0,212,255,0.2)]">
                <video ref="modalVid" :src="videoSrc" class="w-full aspect-video" controls autoplay></video>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Stats bar -->
      <div class="slide-up delay-600 grid grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto overflow-hidden rounded-sm border border-cyber/15">
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
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import videoSrc from '../picture/yuanqu.mp4'

const starCanvas = ref(null)
const heroThumb = ref(null)
const modalVid = ref(null)
const videoModal = ref(false)

function closeVideo() {
  if (modalVid.value) { modalVid.value.pause(); modalVid.value.currentTime = 0 }
  videoModal.value = false
}

// Watch modal open to autoplay
import { watch } from 'vue'
watch(videoModal, (v) => {
  if (v) nextTick(() => modalVid.value?.play())
})
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

// Full canvas: stars + particles + Tron grid
function initStars(canvas) {
  const ctx = canvas.getContext('2d')
  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // Stars
  const stars = Array.from({ length: 220 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.6 + 0.2,
    twinkle: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.4 + 0.05,
    color: Math.random() > 0.8 ? '124,200,255' : '255,255,255',
  }))

  // Floating particles
  const particles = Array.from({ length: 25 }, () => ({
    x: Math.random(),
    y: 1 + Math.random() * 0.3,
    vy: -(Math.random() * 0.0004 + 0.0002),
    vx: (Math.random() - 0.5) * 0.0002,
    r: Math.random() * 1.8 + 0.5,
    alpha: Math.random() * 0.5 + 0.2,
  }))

  // Tron grid config
  let gridOffset = 0
  const GRID_SPEED = 0.4          // px per frame (logical)
  const COLS = 14
  const GRID_COLOR = 'rgba(0,212,255,'
  const HORIZON = 0.52            // vanishing point y ratio

  function drawGrid(W, H) {
    const vx = W / 2
    const vy = H * HORIZON
    const bottom = H + 20

    // How many rows: use offset to create scroll illusion
    // Rows spread from horizon to bottom
    const rowCount = 18
    const totalDist = bottom - vy

    ctx.save()

    for (let r = 0; r < rowCount; r++) {
      // t: 0=horizon, 1=bottom; apply offset to animate
      const raw = (r + gridOffset % 1) / rowCount
      const t = Math.pow(raw, 1.8)      // non-linear: crowded near horizon
      const y = vy + t * totalDist
      if (y > bottom) continue

      const alpha = t * 0.35
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.strokeStyle = GRID_COLOR + alpha + ')'
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // Vertical lines: evenly spaced at bottom, converge to vx at horizon
    for (let c = 0; c <= COLS; c++) {
      const bx = (c / COLS) * W      // x at bottom
      const alpha = 0.18
      ctx.beginPath()
      ctx.moveTo(vx, vy)             // all start from vanishing point
      ctx.lineTo(bx, bottom)
      ctx.strokeStyle = GRID_COLOR + alpha + ')'
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    ctx.restore()
  }

  function draw() {
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)

    // Draw Tron grid first (background layer)
    gridOffset += GRID_SPEED / 60   // ~60fps target

    drawGrid(W, H)

    // Stars
    stars.forEach((s) => {
      s.twinkle += s.speed * 0.03
      const a = 0.2 + 0.8 * Math.abs(Math.sin(s.twinkle))
      ctx.beginPath()
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${s.color},${a * 0.65})`
      ctx.fill()
    })

    // Particles
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy
      if (p.y < -0.05) { p.y = 1.05; p.x = Math.random() }
      const px = p.x * W, py = p.y * H
      // Glow
      const grad = ctx.createRadialGradient(px, py, 0, px, py, p.r * 3)
      grad.addColorStop(0, `rgba(0,212,255,${p.alpha * 0.8})`)
      grad.addColorStop(1, 'rgba(0,212,255,0)')
      ctx.beginPath()
      ctx.arc(px, py, p.r * 3, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      // Core dot
      ctx.beginPath()
      ctx.arc(px, py, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0,212,255,${p.alpha})`
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
.vmodal-enter-active, .vmodal-leave-active { transition: opacity 0.25s ease; }
.vmodal-enter-from, .vmodal-leave-to { opacity: 0; }
</style>
