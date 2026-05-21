<template>
  <div class="relative">
    <BackToTop />
    <!-- Scroll progress bar -->
    <div class="scroll-progress" :style="{ transform: `scaleX(${scrollRatio})` }"></div>

    <IntroLoader v-if="!introComplete" @done="onIntroDone" />
    <template v-if="introComplete">
      <NavBar />
      <HeroSection />
      <GroupOverviewHorizontal />
      <ParkSection />
      <ParkGallery />
      <BusinessSection />
      <GoalsSection />
      <GroupNewsSection />
      <!-- <PartnersSection /> -->
      <ContactSection />
      <FooterSection />
    </template>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import IntroLoader from './components/IntroLoader.vue'
import BackToTop from './components/BackToTop.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import GroupOverviewHorizontal from './components/GroupOverviewHorizontal.vue'
import ParkSection from './components/ParkSection.vue'
import ParkGallery from './components/ParkGallery.vue'
import BusinessSection from './components/BusinessSection.vue'
import GoalsSection from './components/GoalsSection.vue'
import GroupNewsSection from './components/GroupNewsSection.vue'
import PartnersSection from './components/PartnersSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import { initScrollReveal } from './composables/useScrollReveal'

const introComplete = ref(false)
const scrollRatio = ref(0)

let lenis = null
let rafId = null
const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function onIntroDone() {
  introComplete.value = true
  nextTick(() => initScrollReveal())
}

function setupLenis() {
  if (prefersReducedMotion) {
    // Fallback: native scroll + native progress
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      scrollRatio.value = max > 0 ? el.scrollTop / max : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }

  lenis = new Lenis({
    lerp: 0.12,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
  })

  lenis.on('scroll', ({ scroll, limit }) => {
    scrollRatio.value = limit > 0 ? scroll / limit : 0
  })

  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  // Make anchor links work with Lenis
  const onAnchorClick = (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    if (id && id.length > 1) {
      const target = document.querySelector(id)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -20 })
      }
    }
  }
  document.addEventListener('click', onAnchorClick)

  return () => {
    document.removeEventListener('click', onAnchorClick)
    if (rafId) cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
  }
}

let cleanupScroll = null
onMounted(() => { cleanupScroll = setupLenis() })
onUnmounted(() => { cleanupScroll?.() })
</script>
