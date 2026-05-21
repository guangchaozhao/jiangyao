<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-[#050B1A]/90 backdrop-blur-md border-b border-cyber/10 py-3' : 'py-5'"
  >
    <div class="max-w-7xl mx-auto px-6 relative flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2 cursor-pointer">
        <img :src="jiangyaoLogo" alt="江曜擎天" class="h-9 w-auto object-contain" />
      </a>

      <!-- Nav links -->
      <div class="hidden lg:flex items-center gap-5 xl:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
          @click="handleNavClick($event, item)"
          class="relative text-sm transition-colors duration-200 cursor-pointer font-body tracking-wide py-1 group"
          :class="activeSection === item.id ? 'text-cyber' : 'text-slate-400 hover:text-white'">
          {{ item.label }}
          <!-- Active underline -->
          <span class="absolute bottom-0 left-0 h-px bg-cyber transition-all duration-300"
            :class="activeSection === item.id ? 'w-full shadow-[0_0_6px_rgba(0,212,255,0.8)]' : 'w-0 group-hover:w-full opacity-50'">
          </span>
        </a>
      </div>

      <!-- Mobile menu button -->
      <button @click="mobileOpen = !mobileOpen" class="lg:hidden text-cyber p-1">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="lg:hidden bg-[#050B1A]/98 backdrop-blur-md border-t border-cyber/10 px-6 py-4">
        <div class="flex flex-col">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
            @click="handleNavClick($event, item)"
            class="flex items-center justify-between py-3 border-b border-white/5 transition-colors"
            :class="activeSection === item.id ? 'text-cyber' : 'text-slate-400'">
            <span class="text-sm font-body">{{ item.label }}</span>
            <span v-if="activeSection === item.id" class="w-1.5 h-1.5 rounded-full bg-cyber animate-pulse"></span>
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { img } from '../config/oss'
const jiangyaoLogo = img.jiangyao

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('')
const overviewActiveId = ref('company')

const navItems = [
  { label: '集团概况', href: '#company',      id: 'company', panel: 0 },
  { label: '子公司',   href: '#subsidiaries', id: 'subsidiaries', panel: 5 },
  { label: '园区规划', href: '#park',         id: 'park' },
  { label: '核心业务', href: '#business',     id: 'business' },
  { label: '新闻中心', href: '#news',         id: 'news' },
  { label: '合作洽谈', href: '#contact',      id: 'contact' },
]

let observer = null

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

function handleNavClick(event, item) {
  mobileOpen.value = false

  if (item.panel === undefined) return

  event.preventDefault()
  activeSection.value = item.id
  overviewActiveId.value = item.id
  window.history.pushState(null, '', item.href)
  window.dispatchEvent(new CustomEvent('jiangyao:overview-go', {
    detail: {
      id: item.id,
      panel: item.panel,
    },
  }))
}

function handleOverviewActive(event) {
  const id = event.detail?.id
  if (!id) return
  overviewActiveId.value = id
  if (activeSection.value === 'company' || activeSection.value === 'subsidiaries') {
    activeSection.value = id
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('jiangyao:overview-active', handleOverviewActive)

  // IntersectionObserver for active section
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        activeSection.value = e.target.id === 'company' ? overviewActiveId.value : e.target.id
      })
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
  )

  navItems
    .filter(({ id }) => id !== 'subsidiaries')
    .forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('jiangyao:overview-active', handleOverviewActive)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
