<template>
  <section id="company" class="relative py-28 bg-cosmic overflow-hidden">
    <!-- Background accent -->
    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full
                bg-electric/5 blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">02 / 公司介绍</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-4">
          构建<span class="gradient-text">世界级</span>电竞产业生态平台
        </h2>
        <div class="cyber-divider w-24 mx-auto mt-6"></div>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: company intro -->
        <div class="slide-left">
          <div class="mb-6">
            <h3 class="font-display font-bold text-2xl md:text-3xl text-white mb-2">
              江曜擎天电竞发展（广东）有限公司
            </h3>
            <p class="text-slate-400 font-body text-base leading-relaxed">
              专注构建世界级电子竞技产业生态的平台型企业
            </p>
          </div>

          <!-- Vision cards -->
          <div class="space-y-4 mt-8">
            <div v-for="(vision, i) in visions" :key="vision.title"
              class="glass-card rounded-sm p-5 flex items-start gap-4 hover:border-cyber/40 transition-all duration-300 cursor-default"
              :class="`slide-up delay-${(i+1)*100}`">
              <div class="flex-shrink-0 w-10 h-10 rounded-sm bg-electric/20 flex items-center justify-center text-cyber font-display font-bold text-sm">
                0{{ i+1 }}
              </div>
              <div>
                <h4 class="font-display font-bold text-white mb-1">{{ vision.title }}</h4>
                <p class="text-slate-400 text-sm font-body">{{ vision.desc }}</p>
              </div>
              <div class="ml-auto text-cyber/50">→</div>
            </div>
          </div>
        </div>

        <!-- Right: location & HQ -->
        <div class="slide-right">
          <div class="glass-card rounded-sm p-8 relative hud-corner">
            <!-- Map placeholder -->
            <div class="aspect-video rounded-sm overflow-hidden mb-6 relative bg-[#0A1628] border border-cyber/10 flex items-center justify-center">
              <!-- Stylized map visualization -->
              <div class="absolute inset-0 grid-bg opacity-30"></div>
              <div class="relative z-10 text-center">
                <div class="w-16 h-16 mx-auto mb-3 relative">
                  <div class="absolute inset-0 border-2 border-cyber/60 rounded-full animate-ping opacity-30"></div>
                  <div class="absolute inset-0 border-2 border-cyber/40 rounded-full animate-ping opacity-20" style="animation-delay: 0.5s"></div>
                  <div class="w-full h-full rounded-full bg-electric/20 border-2 border-cyber flex items-center justify-center">
                    <svg class="w-8 h-8 text-cyber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-cyber font-display font-bold text-lg">中山市港口镇</p>
                <p class="text-slate-400 text-sm mt-1">总部筹建地</p>
              </div>
              <!-- Grid lines decoration -->
              <div class="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyber/20 to-transparent"></div>
              <div class="absolute top-4 left-4 bottom-4 w-px bg-gradient-to-b from-transparent via-cyber/20 to-transparent"></div>
            </div>

            <!-- Key info -->
            <div class="grid grid-cols-2 gap-4">
              <div v-for="info in keyInfo" :key="info.label"
                class="bg-white/5 rounded-sm p-4 text-center">
                <div class="gradient-text font-display font-bold text-xl">{{ info.value }}</div>
                <div class="text-slate-400 text-xs mt-1 font-body">{{ info.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const visions = [
  {
    title: '立足中山',
    desc: '以俱乐部为引擎打造数字经济新标杆，联动核心城市资源构建产业协同格局',
  },
  {
    title: '引领全国',
    desc: '树立行业发展标杆，输出先进模式标准，成为中国电竞产业示范样板',
  },
  {
    title: '享誉世界',
    desc: '打造国际顶级品牌，提升中国电竞影响力，引领全球电竞行业发展潮流',
  },
]

const keyInfo = [
  { value: '20亿元', label: '总投资规模' },
  { value: '50万方', label: '规划面积' },
  { value: '粤港澳', label: '大湾区辐射' },
  { value: '全球化', label: '发展战略' },
]
</script>
