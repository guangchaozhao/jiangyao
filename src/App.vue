<template>
  <div class="relative">
    <NavBar />
    <HeroSection />
    <VideoSection />
    <BackgroundSection />
    <CompanySection />
    <TeamSection />
    <ParkSection />
    <BusinessSection />
    <GoalsSection />
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import VideoSection from './components/VideoSection.vue'
import BackgroundSection from './components/BackgroundSection.vue'
import CompanySection from './components/CompanySection.vue'
import TeamSection from './components/TeamSection.vue'
import ParkSection from './components/ParkSection.vue'
import BusinessSection from './components/BusinessSection.vue'
import GoalsSection from './components/GoalsSection.vue'
import FooterSection from './components/FooterSection.vue'
import { useScrollReveal } from './composables/useScrollReveal'

useScrollReveal()
</script>
