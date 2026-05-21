<template>
  <section id="hero-root" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-cosmic scanlines">
    <!-- ① Aurora 极光层 -->
    <div class="aurora-layer" aria-hidden="true">
      <div class="aurora-blob aurora-blob-1"></div>
      <div class="aurora-blob aurora-blob-2"></div>
      <div class="aurora-blob aurora-blob-3"></div>
      <div class="aurora-blob aurora-blob-4"></div>
    </div>

    <!-- ② 粒子网络 canvas（含星空 + 连线 + Tron格）-->
    <canvas ref="starCanvas" class="absolute inset-0 w-full h-full"></canvas>

    <!-- Hex grid overlay -->
    <div class="absolute inset-0 hex-bg opacity-30"></div>

    <!-- 中心径向增亮 -->
    <div class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 70% 50% at 50% 55%, rgba(26,111,255,0.08) 0%, transparent 70%)">
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
          集团
        </span>
      </div>

      <!-- Glitch title -->
      <div class="mb-6">
        <h1
          class="reveal-clip-hero mx-auto max-w-6xl font-esports font-black text-4xl leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl gradient-text-white glitch neon-text-blue"
          data-text="江曜擎天电竞发展">
          江曜擎天电竞发展
        </h1>
        <div class="reveal-clip-hero mt-3 font-esports font-black text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl gradient-text-white neon-text-blue" style="transition-delay: 180ms">
          （广东）有限公司
        </div>
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
        <a href="#company"
          v-magnetic="0.4"
          class="cyber-btn group relative px-10 py-3.5 bg-gradient-to-r from-electric to-cyber text-white
                 font-esports font-bold text-sm rounded-sm
                 hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all duration-300 cursor-pointer overflow-hidden">
          了解集团
          <span class="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
        </a>
        <a href="#contact"
          v-magnetic="0.4"
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
          <video
            ref="heroThumb"
            :src="videoSrc"
            :poster="heroPoster"
            class="w-full aspect-video object-cover"
            muted
            playsinline
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            preload="auto"
          ></video>
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
                <video
                  ref="modalVid"
                  :src="videoSrc"
                  :poster="heroPoster"
                  class="w-full aspect-video"
                  controls
                  autoplay
                  playsinline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  x5-video-player-type="h5"
                ></video>
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
import { video } from '../config/oss'
const videoSrc = video.yuanqu
const heroPoster = `${videoSrc}?x-oss-process=video/snapshot,t_1000,f_jpg,w_1280,m_fast`

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

// Canvas: 星空 + Tron透视格 + 粒子连线网络 + 鼠标互动
// 优化:空间哈希连线 / 离屏粒子精灵 / 视口可见 + 标签页可见 才渲染 / 移动端降级
function initStars(canvas) {
  const ctx = canvas.getContext('2d', { alpha: true })
  let W = 0, H = 0

  // 设备降级
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  const lowCpu = (navigator.hardwareConcurrency || 4) <= 4
  const lowEnd = isMobile || lowCpu

  // 粒子精灵预渲染(关键优化:避免每帧 createRadialGradient)
  const SPRITE_BASE_R = 2.5
  const SPRITE_PAD = SPRITE_BASE_R * 5
  const spriteCanvas = document.createElement('canvas')
  spriteCanvas.width = SPRITE_PAD * 2
  spriteCanvas.height = SPRITE_PAD * 2
  {
    const sctx = spriteCanvas.getContext('2d')
    const cx = SPRITE_PAD, cy = SPRITE_PAD
    const g = sctx.createRadialGradient(cx, cy, 0, cx, cy, SPRITE_PAD)
    g.addColorStop(0,    'rgba(0,212,255,0.55)')
    g.addColorStop(0.25, 'rgba(0,212,255,0.25)')
    g.addColorStop(1,    'rgba(0,212,255,0)')
    sctx.fillStyle = g
    sctx.fillRect(0, 0, SPRITE_PAD * 2, SPRITE_PAD * 2)
    // 实心核
    sctx.beginPath(); sctx.arc(cx, cy, SPRITE_BASE_R * 0.55, 0, Math.PI * 2)
    sctx.fillStyle = 'rgba(140,230,255,0.95)'; sctx.fill()
  }

  const netParticles = []

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1.25 : 1.75)
    W = canvas.offsetWidth
    H = canvas.offsetHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    netParticles.forEach(p => {
      p.x = Math.random() * W
      p.y = Math.random() * H
    })
  }
  resize()
  window.addEventListener('resize', resize)

  // ── 静态星星 ──
  const STAR_COUNT = lowEnd ? 90 : 240
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.8 + 0.3,
    twinkle: Math.random() * Math.PI * 2,
    spd: Math.random() * 0.35 + 0.05,
    col: Math.random() > 0.8 ? '124,200,255' : '255,255,255',
    bright: Math.random() > 0.92,
  }))

  // ── Tron透视格 ──
  let gridOffset = 0
  const COLS = lowEnd ? 10 : 14, HORIZON = 0.52
  const ROW_COUNT = lowEnd ? 12 : 18

  function drawGrid() {
    const vx = W / 2, vy = H * HORIZON, bottom = H + 20
    const totalDist = bottom - vy
    ctx.save()
    ctx.lineWidth = 0.5
    for (let r = 0; r < ROW_COUNT; r++) {
      const t = Math.pow((r + gridOffset % 1) / ROW_COUNT, 1.8)
      const y = vy + t * totalDist
      if (y > bottom) continue
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y)
      ctx.strokeStyle = `rgba(0,212,255,${t * 0.28})`
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(0,212,255,0.14)'
    for (let c = 0; c <= COLS; c++) {
      const bx = (c / COLS) * W
      ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(bx, bottom)
      ctx.stroke()
    }
    ctx.restore()
  }

  // ── 粒子网络 ──
  const PARTICLE_COUNT = lowEnd ? 32 : 90
  const CONNECT_DIST   = lowEnd ? 100 : 140
  const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST
  const MOUSE_REPEL    = 110
  const MOUSE_REPEL_SQ = MOUSE_REPEL * MOUSE_REPEL
  const REPEL_FORCE    = 3.5

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    netParticles.push({
      x: Math.random() * (W || 1200),
      y: Math.random() * (H || 800),
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      r: Math.random() * 1.8 + 0.8,
      baseAlpha: Math.random() * 0.4 + 0.3,
    })
  }

  // 鼠标位置(canvas 坐标)
  const mouse = { x: -9999, y: -9999 }
  const onMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }
  if (!isMobile) window.addEventListener('mousemove', onMouseMove)

  function updateParticles() {
    for (let i = 0; i < netParticles.length; i++) {
      const p = netParticles[i]
      // 鼠标排斥(平方距离比较,省 sqrt)
      const dx = p.x - mouse.x, dy = p.y - mouse.y
      const dSq = dx * dx + dy * dy
      if (dSq < MOUSE_REPEL_SQ && dSq > 0.01) {
        const dist = Math.sqrt(dSq)
        const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * REPEL_FORCE
        p.vx += (dx / dist) * force * 0.08
        p.vy += (dy / dist) * force * 0.08
      }

      p.vx *= 0.98; p.vy *= 0.98

      const spdSq = p.vx * p.vx + p.vy * p.vy
      if (spdSq > 6.25) { // 2.5^2
        const spd = Math.sqrt(spdSq)
        p.vx = p.vx / spd * 2.5; p.vy = p.vy / spd * 2.5
      }

      p.x += p.vx; p.y += p.vy

      if (p.x < 0)  { p.x = 0;  p.vx = Math.abs(p.vx) }
      if (p.x > W)  { p.x = W;  p.vx = -Math.abs(p.vx) }
      if (p.y < 0)  { p.y = 0;  p.vy = Math.abs(p.vy) }
      if (p.y > H)  { p.y = H;  p.vy = -Math.abs(p.vy) }
    }
  }

  // 空间哈希:每帧 rebuild,只比相邻格,O(n²) → O(n)
  const CELL = CONNECT_DIST
  const grid = new Map()
  function key(cx, cy) { return cx * 10000 + cy }

  function drawNetwork() {
    grid.clear()
    for (let i = 0; i < netParticles.length; i++) {
      const p = netParticles[i]
      const cx = (p.x / CELL) | 0
      const cy = (p.y / CELL) | 0
      const k = key(cx, cy)
      let bucket = grid.get(k)
      if (!bucket) { bucket = []; grid.set(k, bucket) }
      bucket.push(i)
      p._cx = cx; p._cy = cy
    }

    // 连线
    ctx.lineWidth = 0.7
    for (let i = 0; i < netParticles.length; i++) {
      const a = netParticles[i]
      // 只查 9 个相邻格
      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const bucket = grid.get(key(a._cx + ox, a._cy + oy))
          if (!bucket) continue
          for (let bi = 0; bi < bucket.length; bi++) {
            const j = bucket[bi]
            if (j <= i) continue // 去重 + 跳过自己
            const b = netParticles[j]
            const dx = a.x - b.x, dy = a.y - b.y
            const dSq = dx * dx + dy * dy
            if (dSq < CONNECT_DIST_SQ) {
              const dist = Math.sqrt(dSq)
              const alpha = (1 - dist / CONNECT_DIST) * 0.45
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(0,212,255,${alpha})`
              ctx.stroke()
            }
          }
        }
      }
    }

    // 粒子点(用预渲染精灵 drawImage)
    for (let i = 0; i < netParticles.length; i++) {
      const p = netParticles[i]
      const scale = (p.r / SPRITE_BASE_R) * (0.7 + p.baseAlpha)
      const size = SPRITE_PAD * 2 * scale
      ctx.globalAlpha = p.baseAlpha + 0.3
      ctx.drawImage(spriteCanvas, p.x - size / 2, p.y - size / 2, size, size)
    }
    ctx.globalAlpha = 1
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H)

    gridOffset += 0.4 / 60
    drawGrid()

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i]
      s.twinkle += s.spd * 0.03
      const base = s.bright ? 0.5 : 0.1
      const a    = base + 0.7 * Math.abs(Math.sin(s.twinkle))
      ctx.beginPath()
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${s.col},${Math.min(1, a * 0.9)})`
      ctx.fill()
    }

    updateParticles()
    drawNetwork()
  }

  // ── 渲染门控:仅在视口内 + 标签页可见时渲染 ──
  let inView = true
  let pageVisible = !document.hidden
  let running = false

  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    schedule()
  }, { threshold: 0.01 })
  io.observe(canvas)

  const onVis = () => { pageVisible = !document.hidden; schedule() }
  document.addEventListener('visibilitychange', onVis)

  function loop() {
    if (!inView || !pageVisible) { running = false; return }
    drawFrame()
    animFrame = requestAnimationFrame(loop)
  }
  function schedule() {
    if (inView && pageVisible && !running) {
      running = true
      animFrame = requestAnimationFrame(loop)
    }
  }
  schedule()

  canvas._cleanup = () => {
    if (!isMobile) window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVis)
    io.disconnect()
  }
}

onMounted(() => {
  if (starCanvas.value) initStars(starCanvas.value)

  // Hero 是首屏,不依赖 IntersectionObserver,直接触发进场
  requestAnimationFrame(() => {
    document.querySelectorAll(
      '#hero-root .reveal-clip-hero, #hero-root .reveal-clip, #hero-root .slide-up'
    ).forEach(el => el.classList.add('is-visible'))
  })

  setTimeout(() => {
    typeText(text1, displayText1, typing1, () => {
      typing2.value = true
      typeText(text2, displayText2, typing2, null)
    })
  }, 800)
})
onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
  if (starCanvas.value?._cleanup) starCanvas.value._cleanup()
})
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.vmodal-enter-active, .vmodal-leave-active { transition: opacity 0.25s ease; }
.vmodal-enter-from, .vmodal-leave-to { opacity: 0; }

/* ══ Aurora 极光层 ══ */
.aurora-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0;
  animation: aurora-fade-in 1.5s ease forwards;
}

@keyframes aurora-fade-in {
  to { opacity: 1; }
}

/* 蓝紫极光 — 左上 */
.aurora-blob-1 {
  width: 55vw; height: 55vw;
  max-width: 700px; max-height: 700px;
  top: -15%; left: -10%;
  background: radial-gradient(ellipse, rgba(26,111,255,0.22) 0%, transparent 70%);
  animation: aurora-fade-in 1.5s ease forwards, aurora-drift-1 14s ease-in-out infinite;
  animation-delay: 0s, 1.5s;
}

/* 青色极光 — 右侧 */
.aurora-blob-2 {
  width: 50vw; height: 50vw;
  max-width: 650px; max-height: 650px;
  top: 10%; right: -15%;
  background: radial-gradient(ellipse, rgba(0,212,255,0.18) 0%, transparent 70%);
  animation: aurora-fade-in 1.5s ease forwards, aurora-drift-2 17s ease-in-out infinite;
  animation-delay: 0.4s, 1.5s;
}

/* 紫色极光 — 中下 */
.aurora-blob-3 {
  width: 60vw; height: 40vw;
  max-width: 800px; max-height: 500px;
  bottom: 5%; left: 15%;
  background: radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%);
  animation: aurora-fade-in 1.5s ease forwards, aurora-drift-3 20s ease-in-out infinite;
  animation-delay: 0.8s, 1.5s;
}

/* 深青极光 — 中心补光 */
.aurora-blob-4 {
  width: 40vw; height: 40vw;
  max-width: 500px; max-height: 500px;
  top: 30%; left: 30%;
  background: radial-gradient(ellipse, rgba(0,180,255,0.10) 0%, transparent 70%);
  animation: aurora-fade-in 1.5s ease forwards, aurora-drift-4 11s ease-in-out infinite;
  animation-delay: 1.2s, 1.5s;
}

@keyframes aurora-drift-1 {
  0%,100% { transform: translate(0,   0)   scale(1); }
  33%      { transform: translate(5%,  8%)  scale(1.08); }
  66%      { transform: translate(-4%, 5%)  scale(0.95); }
}
@keyframes aurora-drift-2 {
  0%,100% { transform: translate(0,   0)   scale(1); }
  40%      { transform: translate(-6%, 6%)  scale(1.1); }
  70%      { transform: translate(4%, -5%)  scale(0.92); }
}
@keyframes aurora-drift-3 {
  0%,100% { transform: translate(0,   0)   scale(1); }
  30%      { transform: translate(4%, -6%)  scale(1.06); }
  60%      { transform: translate(-5%, 4%)  scale(1.12); }
}
@keyframes aurora-drift-4 {
  0%,100% { transform: translate(0,   0)   scale(1); }
  50%      { transform: translate(-3%, -4%) scale(1.15); }
}
</style>
