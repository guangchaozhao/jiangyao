<template>
  <section class="relative h-screen overflow-hidden bg-[#020810]">

    <!-- Slides -->
    <div v-for="(slide, i) in slides" :key="i"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'">

      <!-- Image with Ken Burns zoom -->
      <div class="absolute inset-0 scale-110"
        :class="i === current ? 'animate-kb' : ''">
        <img :src="slide.img" :alt="slide.label"
          class="w-full h-full object-cover object-center"
          :loading="i === 0 ? 'eager' : 'lazy'" />
      </div>

      <!-- Dark gradient overlay - only bottom for text readability -->
      <div class="absolute inset-0 bg-gradient-to-t
                  from-[#020810]/90 via-[#020810]/20 to-transparent z-10"></div>
      <!-- Side vignette - lighter -->
      <div class="absolute inset-0 bg-gradient-to-r
                  from-[#020810]/30 via-transparent to-[#020810]/30 z-10"></div>
    </div>

    <!-- HUD scan line -->
    <div class="absolute inset-0 z-20 pointer-events-none"
      style="background: repeating-linear-gradient(0deg, transparent, transparent 3px,
             rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)"></div>

    <!-- Content overlay -->
    <div class="absolute inset-0 z-30 flex flex-col justify-end pb-20 px-8 md:px-16 max-w-7xl mx-auto left-0 right-0">

      <!-- Tag -->
      <div class="mb-4 reveal-up" :class="{ 'is-revealed': revealed }">
        <span class="section-tag font-esports text-[11px]">CONCEPT · 园区效果图</span>
      </div>

      <!-- Slide label -->
      <div class="overflow-hidden mb-6">
        <Transition name="slide-label" mode="out-in">
          <div :key="current">
            <h2 class="font-esports font-black text-4xl md:text-6xl text-white leading-tight">
              {{ slides[current].label }}
            </h2>
            <p class="text-slate-400 font-body text-base mt-2 max-w-lg">
              {{ slides[current].desc }}
            </p>
          </div>
        </Transition>
      </div>

      <!-- Progress dots + counter -->
      <div class="flex items-center gap-6">
        <!-- Dots -->
        <div class="flex gap-2">
          <button v-for="(_, i) in slides" :key="i"
            @click="goTo(i)"
            class="h-0.5 transition-all duration-300 rounded-full cursor-pointer"
            :class="i === current
              ? 'w-8 bg-cyber shadow-[0_0_8px_rgba(0,212,255,0.8)]'
              : 'w-3 bg-white/20 hover:bg-white/40'">
          </button>
        </div>

        <!-- Progress bar -->
        <div class="flex-1 max-w-xs h-px bg-white/10 relative overflow-hidden">
          <div class="absolute inset-y-0 left-0 bg-cyber transition-none"
            :style="{ width: progressWidth + '%', transition: 'width 0.1s linear',
                      boxShadow: '0 0 6px rgba(0,212,255,0.6)' }"></div>
        </div>

        <!-- Counter -->
        <div class="font-esports text-xs text-slate-400">
          <span class="text-cyber">{{ String(current + 1).padStart(2, '0') }}</span>
          <span class="mx-1">/</span>
          <span>{{ String(slides.length).padStart(2, '0') }}</span>
        </div>

        <!-- Nav arrows -->
        <div class="flex gap-2 ml-auto">
          <button @click="prev"
            class="w-9 h-9 border border-cyber/30 text-cyber hover:bg-cyber/10
                   hover:border-cyber transition-all duration-200 flex items-center justify-center rounded-sm cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button @click="next"
            class="w-9 h-9 border border-cyber/30 text-cyber hover:bg-cyber/10
                   hover:border-cyber transition-all duration-200 flex items-center justify-center rounded-sm cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Top right: 星辰 Logo + HUD -->
    <div class="absolute top-6 right-8 z-30 hidden md:flex flex-col items-end gap-2">
      <img :src="xingchenLogo" alt="星辰电竞" class="h-12 w-auto object-contain drop-shadow-lg" />
      <div class="font-esports text-[9px] text-slate-500 text-right opacity-60">
        CONCEPT VISUALIZATION
      </div>
    </div>

    <!-- Corner brackets -->
    <div class="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-cyber/40 z-30"></div>
    <div class="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-cyber/40 z-30"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { img } from '../config/oss'
const xingchenLogo = img.xingchen
const img1 = img.park1, img2 = img.park2, img3 = img.park3
const img4 = img.park4, img5 = img.park5, img6 = img.park6

const slides = [
  { img: img1, label: '园区全景', desc: '立足中山港口镇，电竞教育中心、SC俱乐部、直播基地、赛事中心全貌一览' },
  { img: img2, label: '鸟瞰效果图', desc: '俯瞰星辰电竞综合产业园整体建筑群，云雾山间，世界电竞新地标' },
  { img: img3, label: '高空俯瞰', desc: '园区六大功能分区布局合理，产业生态闭环，辐射粤港澳大湾区' },
  { img: img4, label: '园区中心广场', desc: '星辰电竞品牌广场，赛事中心、教育中心、博物馆围合式布局' },
  { img: img5, label: '星辰电竞园区入口', desc: '标志性大门与品牌形象墙，星辰电竞——STARS CLUB 的荣耀起点' },
  { img: img6, label: '电竞教育中心·SC俱乐部', desc: '电竞教育学院与俱乐部主楼近景，引领中国电竞人才培养新范式' },
]

const current = ref(0)
const progressWidth = ref(0)
const revealed = ref(false)
const DURATION = 5000
let timer = null
let rafId = null
let startTime = null

function startProgress() {
  startTime = performance.now()
  function tick(now) {
    const elapsed = now - startTime
    progressWidth.value = Math.min((elapsed / DURATION) * 100, 100)
    if (elapsed < DURATION) {
      rafId = requestAnimationFrame(tick)
    }
  }
  rafId = requestAnimationFrame(tick)
}

function resetProgress() {
  if (rafId) cancelAnimationFrame(rafId)
  progressWidth.value = 0
}

function next() {
  resetProgress()
  current.value = (current.value + 1) % slides.length
  startProgress()
}

function prev() {
  resetProgress()
  current.value = (current.value - 1 + slides.length) % slides.length
  startProgress()
}

function goTo(i) {
  resetProgress()
  current.value = i
  startProgress()
}

function startAuto() {
  timer = setInterval(next, DURATION)
}

onMounted(() => {
  startProgress()
  startAuto()
  setTimeout(() => { revealed.value = true }, 300)
})

onUnmounted(() => {
  clearInterval(timer)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* Ken Burns zoom animation */
@keyframes kenburns {
  0%   { transform: scale(1.1) translate(0, 0); }
  100% { transform: scale(1.0) translate(-1%, -1%); }
}
.animate-kb {
  animation: kenburns 5s ease-out forwards;
}

/* Slide label transition */
.slide-label-enter-active {
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.slide-label-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-label-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-label-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.reveal-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-up.is-revealed {
  opacity: 1;
  transform: none;
}
</style>
