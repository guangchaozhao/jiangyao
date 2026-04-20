<template>
  <Transition name="loader-fade" @after-leave="$emit('done')">
    <div v-if="visible" class="intro-loader">

      <!-- Scanline sweep -->
      <div class="scan-sweep"></div>

      <!-- Grid overlay -->
      <div class="intro-grid"></div>

      <!-- Center content -->
      <div class="intro-center" :class="{ 'intro-center--in': phase >= 1 }">

        <!-- Top bracket -->
        <div class="bracket bracket--top" :class="{ 'bracket--in': phase >= 1 }"></div>

        <!-- Logo area -->
        <div class="logo-wrap">
          <div class="logo-sub" :class="{ 'logo-sub--in': phase >= 2 }">
            STARS ESPORTS · INDUSTRIAL PARK
          </div>
          <div
            class="logo-main"
            :class="{ 'logo-main--in': phase >= 2 }"
            :data-text="logoText"
          >{{ logoText }}</div>
          <div class="logo-slogan" :class="{ 'logo-slogan--in': phase >= 3 }">
            江曜擎天电竞发展（广东）有限公司
          </div>
        </div>

        <!-- Progress bar -->
        <div class="progress-wrap" :class="{ 'progress-wrap--in': phase >= 2 }">
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <div class="progress-glow" :style="{ left: progress + '%' }"></div>
          </div>
          <div class="progress-label">
            <span class="progress-pct">{{ Math.floor(progress) }}</span>
            <span class="progress-unit">%</span>
          </div>
        </div>

        <!-- Bottom bracket -->
        <div class="bracket bracket--bottom" :class="{ 'bracket--in': phase >= 1 }"></div>
      </div>

      <!-- Split curtains -->
      <div class="curtain curtain--top" :class="{ 'curtain--open': phase >= 4 }"></div>
      <div class="curtain curtain--bottom" :class="{ 'curtain--open': phase >= 4 }"></div>

    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['done'])

const visible = ref(true)
const phase = ref(0)
const progress = ref(0)
const logoText = '星辰电竞'

onMounted(() => {
  // Phase 1: brackets appear
  setTimeout(() => { phase.value = 1 }, 200)

  // Phase 2: logo + progress bar appear
  setTimeout(() => { phase.value = 2 }, 600)

  // Progress animation
  setTimeout(() => {
    const duration = 1600
    const start = performance.now()
    function tick(now) {
      const t = Math.min((now - start) / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      progress.value = eased * 100
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, 700)

  // Phase 3: slogan
  setTimeout(() => { phase.value = 3 }, 1200)

  // Phase 4: curtains split open
  setTimeout(() => { phase.value = 4 }, 2500)

  // Hide loader after curtains open
  setTimeout(() => { visible.value = false }, 3300)
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

/* Scanline sweep */
.scan-sweep {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 212, 255, 0.015) 3px,
    rgba(0, 212, 255, 0.015) 4px
  );
  pointer-events: none;
}
.scan-sweep::after {
  content: '';
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent);
  animation: sweep 2.5s linear infinite;
}
@keyframes sweep {
  0%   { top: -2px; opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* Grid */
.intro-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Center content */
.intro-center {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.intro-center--in {
  opacity: 1;
  transform: scale(1);
}

/* Brackets */
.bracket {
  width: 220px;
  height: 2px;
  position: relative;
  background: linear-gradient(90deg, rgba(0,212,255,0), rgba(0,212,255,0.6), rgba(0,212,255,0));
  transform: scaleX(0);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.bracket--in { transform: scaleX(1); }
.bracket--top::before,
.bracket--top::after,
.bracket--bottom::before,
.bracket--bottom::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: rgba(0,212,255,0.7);
  border-style: solid;
}
.bracket--top::before  { top: -1px; left:  0; border-width: 2px 0 0 2px; }
.bracket--top::after   { top: -1px; right: 0; border-width: 2px 2px 0 0; }
.bracket--bottom::before { bottom: -1px; left:  0; border-width: 0 0 2px 2px; }
.bracket--bottom::after  { bottom: -1px; right: 0; border-width: 0 2px 2px 0; }

/* Logo */
.logo-wrap {
  text-align: center;
}
.logo-sub {
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  letter-spacing: 4px;
  color: rgba(0,212,255,0.6);
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.logo-sub--in { opacity: 1; transform: translateY(0); }

.logo-main {
  font-family: 'Orbitron', 'Space Grotesk', sans-serif;
  font-size: clamp(36px, 8vw, 80px);
  font-weight: 900;
  color: #fff;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #fff 0%, #7CC8FF 60%, #00D4FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
  text-shadow: none;
  position: relative;
}
.logo-main--in {
  opacity: 1;
  transform: translateY(0);
  animation: logo-glitch 4s 0.8s ease-in-out infinite;
}
@keyframes logo-glitch {
  0%, 85%, 100% { filter: none; }
  87% { filter: hue-rotate(90deg) brightness(1.3); transform: translateX(-2px); }
  89% { filter: hue-rotate(-90deg) brightness(1.3); transform: translateX(2px); }
  91% { filter: none; transform: translateX(0); }
}

.logo-slogan {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: rgba(124,200,255,0.7);
  margin-top: 8px;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.logo-slogan--in { opacity: 1; transform: translateY(0); }

/* Progress */
.progress-wrap {
  width: 280px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s;
}
.progress-wrap--in { opacity: 1; transform: translateY(0); }

.progress-track {
  height: 2px;
  background: rgba(0,212,255,0.15);
  border-radius: 1px;
  position: relative;
  overflow: visible;
  margin-bottom: 8px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1A6FFF, #00D4FF);
  border-radius: 1px;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px rgba(0,212,255,0.6);
}
.progress-glow {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00D4FF;
  box-shadow: 0 0 12px 4px rgba(0,212,255,0.8);
  transition: left 0.05s linear;
}
.progress-label {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 2px;
}
.progress-pct {
  font-family: 'Orbitron', monospace;
  font-size: 22px;
  font-weight: 700;
  color: #00D4FF;
  min-width: 3ch;
  text-align: right;
}
.progress-unit {
  font-family: 'Orbitron', monospace;
  font-size: 11px;
  color: rgba(0,212,255,0.6);
}

/* Curtains */
.curtain {
  position: absolute;
  left: 0;
  right: 0;
  background: #020810;
  z-index: 3;
  transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
}
.curtain--top {
  top: 0;
  height: 50%;
  transform: translateY(0);
  border-bottom: 1px solid rgba(0,212,255,0.3);
}
.curtain--bottom {
  bottom: 0;
  height: 50%;
  transform: translateY(0);
  border-top: 1px solid rgba(0,212,255,0.3);
}
.curtain--top.curtain--open    { transform: translateY(-100%); }
.curtain--bottom.curtain--open { transform: translateY(100%); }

/* Loader fade-out */
.loader-fade-leave-active {
  transition: opacity 0.4s ease 0.1s;
}
.loader-fade-leave-to {
  opacity: 0;
}
</style>
