<template>
  <section id="park" class="relative py-28 bg-cosmic overflow-hidden">
    <!-- Parallax bg image -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img :src="parkBg" alt=""
        class="absolute w-full h-[120%] object-cover object-center -top-[10%]"
        style="will-change: transform; opacity: 0.12;
               mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 80%, transparent 100%);
               -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 80%, transparent 100%)"
        ref="parallaxImg" />
    </div>
    <div class="absolute right-0 top-1/3 w-80 h-80 bg-cyber/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">03 / 园区规划</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-4">
          "世界电竞<span class="gradient-text">新地标</span>"
        </h2>
        <div class="cyber-divider w-24 mx-auto mt-6"></div>
        <p class="text-slate-400 font-body mt-4 max-w-2xl mx-auto">
          立足中山、辐射粤港澳大湾区、面向全球的电竞产业融合载体
        </p>
      </div>

      <!-- Two cols: vision + stats -->
      <div class="grid lg:grid-cols-2 gap-12 mb-20">
        <!-- Vision -->
        <div class="space-y-6 slide-left">
          <div class="glass-card rounded-sm p-7 hud-corner">
            <h3 class="font-display font-bold text-cyber text-sm tracking-widest uppercase mb-3">核心目标</h3>
            <p class="text-white font-body text-lg leading-relaxed">
              创世界一流<span class="text-cyber font-bold">百年</span>电竞俱乐部，
              建<span class="text-cyber font-bold">百亿</span>产值数字经济产业园
            </p>
          </div>
          <div class="glass-card rounded-sm p-7 hud-corner">
            <h3 class="font-display font-bold text-cyber text-sm tracking-widest uppercase mb-3">生态愿景</h3>
            <p class="text-white font-body text-lg leading-relaxed">
              构建集<span class="text-electric font-bold">赛事</span>、
              <span class="text-electric font-bold">训练</span>、
              <span class="text-electric font-bold">直播</span>、
              <span class="text-electric font-bold">文创</span>于一体的全产业链电竞生态闭环
            </p>
          </div>

          <!-- Key numbers -->
          <div class="grid grid-cols-2 gap-4">
            <div class="glass-card rounded-sm p-6 text-center">
              <div class="stat-number text-4xl gradient-text">20亿</div>
              <div class="text-slate-400 text-sm mt-2 font-body">总投资规模（元）</div>
            </div>
            <div class="glass-card rounded-sm p-6 text-center">
              <div class="stat-number text-4xl gradient-text">50万</div>
              <div class="text-slate-400 text-sm mt-2 font-body">规划建设面积（㎡）</div>
            </div>
          </div>
        </div>

        <!-- Park zones -->
        <div class="slide-right">
          <h3 class="font-display font-bold text-white text-xl mb-6">园区功能分区</h3>
          <div class="space-y-3">
            <div v-for="(zone, i) in zones" :key="zone.name"
              class="glass-card rounded-sm p-4 flex items-center gap-4 hover:border-cyber/40 transition-all duration-300 group"
              :class="`slide-up delay-${(i+1)*100}`">
              <div class="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center text-lg"
                :style="{ background: zone.color + '20', border: `1px solid ${zone.color}40` }">
                {{ zone.icon }}
              </div>
              <div class="flex-1">
                <div class="font-display font-bold text-white text-sm">{{ zone.name }}</div>
                <div class="text-slate-400 text-xs font-body mt-0.5">{{ zone.desc }}</div>
              </div>
              <div class="text-cyber/40 group-hover:text-cyber transition-colors">›</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import parkBg from '../picture/微信图片_20260420035333_450_4.jpg'

const parallaxImg = ref(null)
let ticking = false

function onScroll() {
  if (!parallaxImg.value || ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const section = parallaxImg.value.closest('section')
    const rect = section.getBoundingClientRect()
    const progress = -rect.top / (rect.height + window.innerHeight)
    parallaxImg.value.style.transform = `translateY(${progress * 60}px)`
    ticking = false
  })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const zones = [
  { name: 'SC电竞俱乐部', desc: '职业战队训练与赛事运营核心', icon: '🏆', color: '#00D4FF' },
  { name: '直播基地', desc: '高标准直播孵化与内容制作中心', icon: '📡', color: '#1A6FFF' },
  { name: '电竞赛事中心', desc: '承办国内外顶级电竞赛事场馆', icon: '⚡', color: '#7C3AED' },
  { name: '电竞教育中心', desc: '产教融合的电竞人才培养基地', icon: '🎓', color: '#00D4FF' },
  { name: '电竞博物馆', desc: '中国电竞历史文化展示与体验', icon: '🌐', color: '#1A6FFF' },
  { name: '江曜擎天电竞主楼', desc: '集团总部行政中心与产业大厦', icon: '🏛️', color: '#00D4FF' },
]
</script>
