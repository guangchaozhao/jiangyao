<template>
  <section id="blueprint" class="relative bg-[#030912] overflow-hidden">

    <!-- ── 顶部分隔线 ── -->
    <div class="h-px bg-gradient-to-r from-transparent via-cyber/50 to-transparent"></div>

    <!-- ── 背景：大门入口图 ── -->
    <div class="absolute top-0 inset-x-0 h-[600px] overflow-hidden pointer-events-none">
      <img :src="gateBg" alt=""
        class="w-full h-full object-cover object-center opacity-55"
        style="mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%);
               -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)" />
    </div>
    <div class="absolute inset-0 hex-bg opacity-20 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full
                bg-purple-800/8 blur-[100px] pointer-events-none"></div>

    <!-- ══════════════════════════════════════
         BLOCK 1 — 英雄数字墙
    ══════════════════════════════════════ -->
    <div class="max-w-7xl mx-auto px-6 pt-24 pb-16">

      <!-- section tag -->
      <div class="flex items-center gap-4 mb-12 reveal-left">
        <div class="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-cyber/50"></div>
        <span class="section-tag font-esports text-[11px]">VISION · 星辰版图</span>
        <div class="h-px flex-1 bg-gradient-to-l from-transparent to-cyber/50"></div>
        <div class="h-px flex-1 max-w-16"></div>
      </div>

      <!-- 大标题 clip-reveal -->
      <div class="mb-4 overflow-hidden reveal-clip">
        <h2 class="font-esports font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight">
          世界电竞
        </h2>
      </div>
      <div class="mb-14 overflow-hidden reveal-clip" style="transition-delay:0.12s">
        <h2 class="font-esports font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight gradient-text">
          新地标
        </h2>
      </div>

      <!-- 四大核心数字 -->
      <div ref="statsRef" class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cyber/10 mb-20 rounded-sm overflow-hidden">
        <div v-for="(s, i) in bigStats" :key="s.label"
          class="relative bg-[#030912] px-4 sm:px-8 py-7 sm:py-10 group hover:bg-electric/5 transition-colors duration-300 cursor-default"
          :class="i > 0 ? 'border-l border-cyber/10' : ''">
          <!-- top accent -->
          <div class="absolute top-0 left-0 right-0 h-px transition-all duration-500 group-hover:opacity-100 opacity-0"
            :style="{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }"></div>

          <div class="stat-number leading-none mb-1"
            :style="{ fontSize: 'clamp(1.8rem,4vw,3.5rem)', color: s.color,
                      textShadow: `0 0 30px ${s.color}60` }">
            {{ s.prefix }}{{ s.counter.display.value }}{{ s.suffix }}
          </div>
          <div class="text-white font-esports font-bold text-sm mb-2 tracking-wide">{{ s.label }}</div>
          <div class="text-slate-500 text-xs font-body leading-relaxed">{{ s.desc }}</div>
        </div>
      </div>

      <!-- ── 两栏：投资详情 + 建设规模 ── -->
      <div class="grid lg:grid-cols-2 gap-12 mb-20">

        <!-- 左：总投资 -->
        <div class="reveal-left">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1 h-8 bg-cyber"></div>
            <h3 class="font-esports font-bold text-2xl text-white">总投资规模</h3>
          </div>
          <div class="glass-card rounded-sm p-8 hud-corner neon-hover">
            <div class="text-7xl font-esports font-black gradient-text mb-2">20亿</div>
            <div class="text-slate-400 text-sm font-body mb-6">人民币 · 分期投入</div>
            <div class="space-y-4">
              <div v-for="phase in investPhases" :key="phase.name"
                class="group/phase">
                <div class="flex justify-between items-center mb-1.5">
                  <span class="text-slate-300 text-sm font-body">{{ phase.name }}</span>
                  <span class="text-cyber text-sm font-esports">{{ phase.amount }}</span>
                </div>
                <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-1000 ease-out"
                    :style="{ width: phase.pct, background: `linear-gradient(90deg, #1A6FFF, #00D4FF)`,
                               boxShadow: '0 0 8px rgba(0,212,255,0.5)' }"></div>
                </div>
                <div class="text-slate-500 text-xs font-body mt-1">{{ phase.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右：建设规模 -->
        <div class="reveal-right">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1 h-8 bg-electric"></div>
            <h3 class="font-esports font-bold text-2xl text-white">规划建设面积</h3>
          </div>
          <div class="glass-card rounded-sm p-8 hud-corner neon-hover">
            <div class="text-7xl font-esports font-black gradient-text mb-2">50万㎡</div>
            <div class="text-slate-400 text-sm font-body mb-6">综合规划 · 分区建设</div>
            <div class="space-y-3">
              <div v-for="zone in buildZones" :key="zone.name"
                class="flex items-center gap-4">
                <div class="flex-shrink-0 w-2 h-2 rounded-full"
                  :style="{ background: zone.color, boxShadow: `0 0 6px ${zone.color}` }"></div>
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <span class="text-slate-300 text-sm font-body">{{ zone.name }}</span>
                    <span class="font-esports text-sm" :style="{ color: zone.color }">{{ zone.area }}</span>
                  </div>
                  <div class="h-px mt-1.5 bg-white/5"></div>
                </div>
              </div>
            </div>
            <div class="mt-6 p-4 bg-white/3 rounded-sm border border-cyber/10">
              <div class="text-cyber text-xs font-esports tracking-widest mb-1">LOCATION</div>
              <div class="text-white font-body text-sm">广东省中山市港口镇</div>
              <div class="text-slate-400 text-xs font-body mt-1">大湾区核心腹地 · 毗邻珠江口</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════
         BLOCK 2 — 建设时间轴
    ══════════════════════════════════════ -->
    <div class="border-t border-cyber/8">
      <div class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-14 reveal-up">
          <span class="section-tag font-esports text-[11px]">ROADMAP · 建设节奏</span>
          <h3 class="font-display font-bold text-3xl md:text-4xl text-white mt-4">
            分阶段 <span class="gradient-text">落地推进</span>
          </h3>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Center spine -->
          <div class="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2
                      bg-gradient-to-b from-cyber/50 via-electric/30 to-transparent hidden md:block"></div>

          <div class="space-y-10">
            <div v-for="(step, i) in timeline" :key="step.phase"
              class="relative grid md:grid-cols-2 gap-6 md:gap-12"
              :class="i % 2 === 0 ? '' : 'md:flex-row-reverse'">

              <!-- Left content (even) / spacer (odd) -->
              <div :class="i % 2 === 0
                ? 'reveal-left md:text-right md:pr-8'
                : 'hidden md:block'">
                <template v-if="i % 2 === 0">
                  <div class="glass-card neon-hover rounded-sm p-6 inline-block w-full">
                    <div class="font-esports font-bold text-xs tracking-widest mb-3"
                      :style="{ color: step.color }">{{ step.phase }}</div>
                    <h4 class="font-display font-bold text-white text-xl mb-3">{{ step.title }}</h4>
                    <p class="text-slate-400 text-sm font-body leading-relaxed">{{ step.desc }}</p>
                    <div class="mt-4 flex flex-wrap gap-2" :class="i%2===0?'md:justify-end':''">
                      <span v-for="tag in step.tags" :key="tag"
                        class="text-xs px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-slate-300 font-body">
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </template>
              </div>

              <!-- Center dot -->
              <div class="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center z-10">
                <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :style="{ borderColor: step.color, boxShadow: `0 0 12px ${step.color}60` }">
                  <div class="w-1.5 h-1.5 rounded-full" :style="{ background: step.color }"></div>
                </div>
              </div>

              <!-- Right content (odd) / spacer (even) -->
              <div :class="i % 2 === 1
                ? 'reveal-right md:pl-8'
                : 'hidden md:block'">
                <template v-if="i % 2 === 1">
                  <div class="glass-card neon-hover rounded-sm p-6 inline-block w-full">
                    <div class="font-esports font-bold text-xs tracking-widest mb-3"
                      :style="{ color: step.color }">{{ step.phase }}</div>
                    <h4 class="font-display font-bold text-white text-xl mb-3">{{ step.title }}</h4>
                    <p class="text-slate-400 text-sm font-body leading-relaxed">{{ step.desc }}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                      <span v-for="tag in step.tags" :key="tag"
                        class="text-xs px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-slate-300 font-body">
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </template>
                <!-- Mobile fallback for even items -->
                <template v-else-if="i % 2 === 0">
                  <div class="md:hidden glass-card neon-hover rounded-sm p-6">
                    <div class="font-esports font-bold text-xs tracking-widest mb-3"
                      :style="{ color: step.color }">{{ step.phase }}</div>
                    <h4 class="font-display font-bold text-white text-xl mb-3">{{ step.title }}</h4>
                    <p class="text-slate-400 text-sm font-body leading-relaxed">{{ step.desc }}</p>
                  </div>
                </template>
              </div>

              <!-- Mobile: odd items full width -->
              <div v-if="i % 2 === 1" class="md:hidden col-span-2 reveal-up">
                <div class="glass-card neon-hover rounded-sm p-6">
                  <div class="font-esports font-bold text-xs tracking-widest mb-3"
                    :style="{ color: step.color }">{{ step.phase }}</div>
                  <h4 class="font-display font-bold text-white text-xl mb-3">{{ step.title }}</h4>
                  <p class="text-slate-400 text-sm font-body leading-relaxed">{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部分隔线 -->
    <div class="h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"></div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCountUp } from '../composables/useCountUp'
import { img } from '../config/oss'
const gateBg = img.park5

const statsRef = ref(null)

const bigStats = [
  { prefix: '', suffix: '亿', label: '总投资规模', color: '#00D4FF',
    desc: '人民币，分三期投入建设，打造世界级电竞综合产业园',
    counter: useCountUp(20, 1800) },
  { prefix: '', suffix: '万㎡', label: '总规划面积', color: '#1A6FFF',
    desc: '综合规划建设用地，涵盖赛事、训练、教育、商业全业态',
    counter: useCountUp(50, 1800) },
  { prefix: '', suffix: '亿+', label: '目标产业集群', color: '#A855F7',
    desc: '打造百亿产值数字经济产业园，驱动区域经济腾飞',
    counter: useCountUp(100, 1800) },
  { prefix: '', suffix: '年', label: '百年俱乐部愿景', color: '#00D4FF',
    desc: '以百年视野构建世界一流电竞俱乐部，传承中国电竞精神',
    counter: useCountUp(100, 1800) },
]

const investPhases = [
  { name: '一期建设', amount: '8亿元', pct: '40%',
    desc: '电竞赛事中心、SC俱乐部总部、直播基地核心区落地' },
  { name: '二期扩展', amount: '7亿元', pct: '35%',
    desc: '电竞教育学院、人才公寓、商业配套区域开发' },
  { name: '三期完善', amount: '5亿元', pct: '25%',
    desc: '电竞博物馆、产业孵化中心、生态景观工程收尾' },
]

const buildZones = [
  { name: '电竞赛事核心区', area: '12万㎡', color: '#00D4FF' },
  { name: '俱乐部训练基地', area: '8万㎡',  color: '#1A6FFF' },
  { name: '直播孵化产业区', area: '10万㎡', color: '#A855F7' },
  { name: '电竞教育学院区', area: '8万㎡',  color: '#00D4FF' },
  { name: '商业生活配套区', area: '7万㎡',  color: '#1A6FFF' },
  { name: '生态景观绿化区', area: '5万㎡',  color: '#6EE7B7' },
]

const timeline = [
  {
    phase: 'PHASE 01 · 2025',
    title: '战略筹备与招商启动',
    color: '#00D4FF',
    desc: '完成项目顶层设计与选址确认，启动品牌发布与战略合作洽谈，正式向粤港澳大湾区核心政企资源发起招商，组建核心运营团队，完成工商注册落地。',
    tags: ['品牌发布', '选址确认', '战略合作', '团队组建'],
  },
  {
    phase: 'PHASE 02 · 2026',
    title: '一期核心区开工建设',
    color: '#1A6FFF',
    desc: '电竞赛事中心、SC俱乐部基地、直播基地一期正式开工，Star Club战队参与「粤超联赛」等区域顶级赛事，建立品牌影响力，同步启动Doud AI超级视频工厂业务。',
    tags: ['开工建设', '战队参赛', 'AI业务启动', '政策对接'],
  },
  {
    phase: 'PHASE 03 · 2027',
    title: '一期竣工·运营全面启动',
    color: '#A855F7',
    desc: '赛事中心正式投入运营，承接首场国家级/国际电竞赛事，电竞教育学院完成首期招生，年接待参观游客突破20万人次，产业园初具产业集聚效应。',
    tags: ['首赛举办', '教育招生', '产业集聚', '运营达标'],
  },
  {
    phase: 'PHASE 04 · 2028-2030',
    title: '全面扩张·产业生态成形',
    color: '#00D4FF',
    desc: '二三期全面推进，电竞博物馆开放，国际级电竞赛事常态化举办，产业园年流量突破100万人次，引进50+上下游企业入驻，形成完整电竞产业生态闭环，推动集团上市进程。',
    tags: ['国际赛事', '100万流量', '50+企业入驻', '上市推进'],
  },
]

onMounted(() => {
  // Reveal animations via IntersectionObserver
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed')
        revealObs.unobserve(e.target)
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-clip').forEach((el) => {
    revealObs.observe(el)
  })

  // Counter trigger
  const counterObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bigStats.forEach((s, i) => setTimeout(() => s.counter.start(), i * 150))
      counterObs.disconnect()
    }
  }, { threshold: 0.3 })
  if (statsRef.value) counterObs.observe(statsRef.value)
})
</script>

<style scoped>
/* Clip-path reveal */
.reveal-clip {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.9s cubic-bezier(0.77, 0, 0.175, 1);
}
.reveal-clip.is-revealed {
  clip-path: inset(0 0% 0 0);
}

/* Slide in from left */
.reveal-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal-left.is-revealed {
  opacity: 1;
  transform: translateX(0);
}

/* Slide in from right */
.reveal-right {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal-right.is-revealed {
  opacity: 1;
  transform: translateX(0);
}

/* Slide up */
.reveal-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal-up.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
