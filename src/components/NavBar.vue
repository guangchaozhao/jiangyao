<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-[#050B1A]/90 backdrop-blur-md border-b border-cyber/10 py-3' : 'py-5'"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 relative">
          <div class="absolute inset-0 border-2 border-cyber rotate-45 animate-pulse"></div>
          <div class="absolute inset-1 bg-electric/30 rotate-45"></div>
          <span class="absolute inset-0 flex items-center justify-center text-cyber font-display font-bold text-xs">SC</span>
        </div>
        <div>
          <div class="font-display font-bold text-white text-sm leading-tight">星辰电子竞技</div>
          <div class="text-cyber text-[10px] tracking-widest uppercase">Stars Esports</div>
        </div>
      </div>

      <!-- Nav links -->
      <div class="hidden md:flex items-center gap-8">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
          class="text-sm text-slate-400 hover:text-cyber transition-colors duration-200 cursor-pointer font-body tracking-wide">
          {{ item.label }}
        </a>
      </div>

      <!-- CTA -->
      <a href="#contact"
        class="hidden md:flex items-center gap-2 px-5 py-2 border border-cyber/50 text-cyber text-sm font-display font-medium
               hover:bg-cyber/10 transition-all duration-200 rounded-sm cursor-pointer">
        <span class="w-1.5 h-1.5 bg-cyber rounded-full animate-pulse"></span>
        合作洽谈
      </a>

      <!-- Mobile menu button -->
      <button @click="mobileOpen = !mobileOpen" class="md:hidden text-cyber">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="md:hidden bg-[#050B1A]/95 backdrop-blur-md border-t border-cyber/10 px-6 py-4">
      <div class="flex flex-col gap-4">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
          @click="mobileOpen = false"
          class="text-slate-400 hover:text-cyber transition-colors text-sm py-2 border-b border-white/5">
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const navItems = [
  { label: '项目背景', href: '#background' },
  { label: '公司介绍', href: '#company' },
  { label: '核心团队', href: '#team' },
  { label: '园区规划', href: '#park' },
  { label: '核心业务', href: '#business' },
  { label: '目标展望', href: '#goals' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
