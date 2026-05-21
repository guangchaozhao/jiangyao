<template>
  <div class="relative">
    <BackToTop />
    <!-- Scroll progress bar -->
    <div class="scroll-progress" :style="{ width: scrollPct + '%' }"></div>

    <IntroLoader v-if="!introComplete" @done="onIntroDone" />
    <template v-if="introComplete">
      <NavBar />
      <HeroSection />
      <BlueprintSection />
      <BackgroundSection />
      <CompanySection />
      <SubsidiariesSection />
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
import IntroLoader from './components/IntroLoader.vue'
import BackToTop from './components/BackToTop.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import BlueprintSection from './components/BlueprintSection.vue'
import BackgroundSection from './components/BackgroundSection.vue'
import CompanySection from './components/CompanySection.vue'
import SubsidiariesSection from './components/SubsidiariesSection.vue'
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
