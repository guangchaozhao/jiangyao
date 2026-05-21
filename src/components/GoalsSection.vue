<template>
  <section id="goals" class="relative py-28 bg-cosmic hex-bg overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-electric/3 to-transparent pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">05 / 目标展望</span>
        <h2 class="reveal-clip font-display font-bold text-4xl md:text-5xl text-white mt-4">
          经济目标与<span class="gradient-text">产业价值</span>
        </h2>
        <div class="cyber-divider w-24 mx-auto mt-6"></div>
      </div>

      <!-- Economic stats: 4 big count-up numbers -->
      <div ref="statsRef" class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-20">
        <div v-for="(stat, i) in economicStats" :key="stat.label"
          class="glass-card neon-hover rounded-2xl p-4 sm:p-8 text-center relative slide-up"
          :class="`delay-${(i+1)*100}`">
          <!-- Accent top line -->
          <div class="absolute top-0 left-1/4 right-1/4 h-px"
            :style="{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }">
          </div>

          <div class="stat-number text-3xl sm:text-5xl md:text-6xl mb-2"
            :style="{ background: `linear-gradient(135deg, ${stat.color}, #ffffff)`,
                      '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent',
                      'background-clip': 'text' }">
            {{ stat.prefix }}{{ stat.countUp.display.value }}{{ stat.unit }}
          </div>
          <div class="text-white font-display font-bold text-base mb-3">{{ stat.label }}</div>
          <div class="cyber-divider mb-3"></div>
          <ul class="space-y-1">
            <li v-for="point in stat.points" :key="point"
              class="flex items-center gap-2 text-xs text-slate-400 font-body justify-center">
              <svg class="w-3 h-3 flex-shrink-0" :style="{ color: stat.color }" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              {{ point }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Industry value -->
      <div class="slide-up">
        <div class="text-center mb-10">
          <span class="section-tag font-esports text-[11px]">产业价值</span>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(value, i) in industryValues" :key="value.title"
            class="glass-card neon-hover rounded-2xl p-8 text-center slide-up"
            :class="`delay-${(i+1)*150}`">
            <div class="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center"
              :style="{ background: value.color + '20', border: `1px solid ${value.color}50` }">
              <span class="text-2xl">{{ value.icon }}</span>
            </div>
            <h3 class="font-esports font-bold text-white text-lg mb-3">{{ value.title }}</h3>
            <div class="cyber-divider mb-4"></div>
            <ul class="space-y-2">
              <li v-for="point in value.points" :key="point"
                class="text-slate-400 text-sm font-body">{{ point }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCountUp } from '../composables/useCountUp'

const statsRef = ref(null)

const rawStats = [
  { target: 3000, prefix: '', unit: '+', label: '高质量就业岗位', color: '#00D4FF',
    points: ['创造大量就业机会', '助力区域人才集聚'] },
  { target: 100, prefix: '', unit: '+', label: '年举办赛事场次', color: '#1A6FFF',
    points: ['丰富赛事活动体系', '提升区域品牌影响力'] },
  { target: 100, prefix: '', unit: '万+', label: '年接待参观人次', color: '#A855F7',
    points: ['打造热门文旅地标', '激发文旅消费新活力'] },
  { target: 100, prefix: '', unit: '亿+', label: '高价值产业集群', color: '#00D4FF',
    points: ['打造百亿电竞生态', '驱动区域经济发展'] },
]

const economicStats = rawStats.map((s) => ({
  ...s,
  countUp: useCountUp(s.target, 2000),
}))

const industryValues = [
  {
    icon: '💡', title: '中山数字经济引擎', color: '#00D4FF',
    points: ['依托技术创新', '为中山市培育数字经济新增长点', '驱动传统产业数字化转型'],
  },
  {
    icon: '🌐', title: '大湾区电竞枢纽', color: '#1A6FFF',
    points: ['链接区域资源', '打造大湾区电竞产业核心节点', '促进区域产业协同发展'],
  },
  {
    icon: '🏆', title: '全球电竞赛事中心', color: '#A855F7',
    points: ['提升国际影响力', '具备承办世界顶级电竞赛事能力', '引领全球电竞行业发展潮流'],
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        economicStats.forEach((s, i) => {
          setTimeout(() => s.countUp.start(), i * 150)
        })
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (statsRef.value) observer.observe(statsRef.value)
})
</script>
