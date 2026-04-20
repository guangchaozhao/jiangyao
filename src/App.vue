<template>
  <div class="relative">
    <!-- Scroll progress bar -->
    <div class="scroll-progress" :style="{ width: scrollPct + '%' }"></div>

    <IntroLoader v-if="!introComplete" @done="onIntroDone" />
    <template v-if="introComplete">
      <NavBar />
      <HeroSection />
      <VideoSection />
      <BlueprintSection />
      <BackgroundSection />
      <CompanySection />
      <TeamSection />
      <ParkSection />
      <BusinessSection />
      <GoalsSection />
      <FooterSection />
    </template>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import IntroLoader from './components/IntroLoader.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import VideoSection from './components/VideoSection.vue'
import BlueprintSection from './components/BlueprintSection.vue'
import BackgroundSection from './components/BackgroundSection.vue'
import CompanySection from './components/CompanySection.vue'
import TeamSection from './components/TeamSection.vue'
import ParkSection from './components/ParkSection.vue'
import BusinessSection from './components/BusinessSection.vue'
import GoalsSection from './components/GoalsSection.vue'
import FooterSection from './components/FooterSection.vue'
import { initScrollReveal } from './composables/useScrollReveal'

const introComplete = ref(false)
const scrollPct = ref(0)

function onIntroDone() {
  introComplete.value = true
  nextTick(() => initScrollReveal())
}

function updateScroll() {
  const el = document.documentElement
  scrollPct.value = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
}

onMounted(() => window.addEventListener('scroll', updateScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', updateScroll))
</script>
