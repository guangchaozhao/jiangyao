<template>
  <Transition name="loader-fade" @after-leave="$emit('done')">
    <div v-if="visible" class="intro-loader">

      <!-- Warp canvas -->
      <canvas ref="warpCanvas" class="absolute inset-0 w-full h-full"></canvas>

      <!-- Vignette: pulls focus to center -->
      <div class="vignette"></div>

      <!-- Brand overlay -->
      <div class="brand-wrap" :class="{ 'brand--in': brandIn, 'brand--out': phase >= 4 }">
        <img :src="xingchenLogo" alt="星辰电竞" class="b-logo" />
        <div class="b-name">星辰电竞</div>
        <div class="b-sep" :class="{ 'sep--in': brandIn }"></div>
        <div class="b-sub">江曜擎天电竞发展（广东）有限公司</div>
      </div>

    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { img } from '../config/oss'

defineEmits(['done'])

const xingchenLogo = img.xingchen
const visible      = ref(true)
const brandIn      = ref(false)
const phase        = ref(0)
const warpCanvas   = ref(null)
let   raf          = null

function initWarp(canvas) {
  const ctx = canvas.getContext('2d')
  let W = 0, H = 0, cx = 0, cy = 0

  function resize() {
    const dpr = window.devicePixelRatio || 1
    W = canvas.offsetWidth
    H = canvas.offsetHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cx = W / 2
    cy = H / 2
  }
  resize()
  window.addEventListener('resize', resize)

  // 3D star field
  const NUM = 650
  const stars = []

  function mkStar(spread = false) {
    return {
      x:  (Math.random() - 0.5) * 2,   // -1 to 1 (normalized)
      y:  (Math.random() - 0.5) * 2,
      z:  spread ? Math.random() : Math.random() * 0.5 + 0.5,  // depth 0..1 (0=close)
      pz: 0,
    }
  }
  for (let i = 0; i < NUM; i++) {
    const s = mkStar(true)
    s.pz = s.z
    stars.push(s)
  }

  const t0 = performance.now()

  // Speed curve: slow → ramp → peak → ramp → slow
  function getSpeed(ms) {
    if (ms < 300)  return 2
    if (ms < 1200) {
      const t = (ms - 300) / 900
      const e = t < 0.5 ? 2*t*t : -1 + (4-2*t)*t
      return 2 + 30 * e
    }
    if (ms < 1700) {
      const t = (ms - 1200) / 500
      const e = t < 0.5 ? 2*t*t : -1 + (4-2*t)*t
      return 32 - 30 * e
    }
    return 2
  }

  function draw() {
    if (!W) { raf = requestAnimationFrame(draw); return }
    const elapsed = performance.now() - t0
    const speed   = getSpeed(elapsed)
    const dz      = speed * 0.004    // z step per frame

    // Trail: fast → long (low alpha), slow → short (high alpha)
    const trailA = Math.max(0.08, 0.78 - speed * 0.022)
    ctx.fillStyle = `rgba(2,8,16,${trailA})`
    ctx.fillRect(0, 0, W, H)

    // Central warp glow
    const warpI = Math.max(0, (speed - 4) / 30)
    if (warpI > 0) {
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.45)
      glow.addColorStop(0, `rgba(0,160,255,${warpI * 0.25})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)
    }

    // Star color: white → blue-white at peak
    const r = Math.round(255 - 80 * warpI)
    const g = Math.round(255 - 40 * warpI)

    stars.forEach(s => {
      s.pz = s.z
      s.z -= dz
      if (s.z <= 0.001) { Object.assign(s, mkStar(false)); s.pz = s.z; return }

      const proj  = (v, z) => v / z
      const sx    = proj(s.x,  s.z)  * W * 0.58 + cx
      const sy    = proj(s.y,  s.z)  * H * 0.58 + cy
      const psx   = proj(s.x,  s.pz) * W * 0.58 + cx
      const psy   = proj(s.y,  s.pz) * H * 0.58 + cy

      if (sx < -60 || sx > W+60 || sy < -60 || sy > H+60) {
        Object.assign(s, mkStar(false)); s.pz = s.z; return
      }

      const depth = 1 - s.z    // 0=far, 1=close
      const alpha = Math.min(1, depth * 1.8)
      const lw    = Math.max(0.3, depth * 2.2)

      ctx.beginPath()
      ctx.moveTo(psx, psy)
      ctx.lineTo(sx,  sy)
      ctx.strokeStyle = `rgba(${r},${g},255,${alpha})`
      ctx.lineWidth   = lw
      ctx.stroke()
    })

    raf = requestAnimationFrame(draw)
  }
  draw()

  canvas._cleanup = () => window.removeEventListener('resize', resize)
}

onMounted(() => {
  if (warpCanvas.value) initWarp(warpCanvas.value)

  setTimeout(() => { brandIn.value  = true  }, 850)   // brand fades in near peak warp
  setTimeout(() => { phase.value    = 4      }, 1700)  // brand fades out
  setTimeout(() => { visible.value  = false  }, 2050)  // loader exits
})

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  if (warpCanvas.value?._cleanup) warpCanvas.value._cleanup()
})
</script>

<style scoped>
.intro-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #020810;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Dark vignette pulls focus to center */
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 55% 55% at 50% 50%,
    transparent 25%,
    rgba(2,8,16,0.55) 70%,
    rgba(2,8,16,0.85) 100%);
  pointer-events: none;
  z-index: 2;
}

/* ── Brand overlay ── */
.brand-wrap {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: scale(0.88);
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1);
}
.brand--in  { opacity: 1; transform: scale(1); }
.brand--out {
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.b-logo {
  width: 88px;
  height: 88px;
  object-fit: contain;
  filter: drop-shadow(0 0 18px rgba(220,38,38,0.6))
          drop-shadow(0 0 40px rgba(0,150,255,0.3));
}

.b-name {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(38px, 8vw, 80px);
  font-weight: 900;
  letter-spacing: 6px;
  background: linear-gradient(135deg, #fff 0%, #7CC8FF 55%, #00D4FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: name-glitch 5s 1.2s ease-in-out infinite;
  text-shadow: none;
}
@keyframes name-glitch {
  0%, 82%, 100% { filter: none; }
  84%  { filter: hue-rotate(80deg) brightness(1.4); transform: translateX(-2px); }
  86%  { filter: hue-rotate(-80deg) brightness(1.4); transform: translateX(2px); }
  88%  { filter: none; transform: none; }
}

.b-sep {
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent);
  transition: width 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s;
}
.sep--in { width: 240px; }

.b-sub {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(124,200,255,0.7);
  letter-spacing: 1px;
}

/* ── Loader fade out ── */
.loader-fade-leave-active { transition: opacity 0.4s ease 0.1s; }
.loader-fade-leave-to     { opacity: 0; }
</style>
