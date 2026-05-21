<template>
  <section
    id="company"
    ref="sectionRef"
    class="relative overflow-hidden bg-[#030912] hex-bg scroll-mt-20"
  >
    <div
      id="subsidiaries"
      class="overview-anchor"
      aria-hidden="true"
    ></div>

    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber/50 to-transparent"></div>
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_20%,rgba(0,212,255,0.13),transparent_28%),radial-gradient(circle_at_82%_66%,rgba(26,111,255,0.12),transparent_30%)]"></div>

    <div class="relative z-10 h-[100svh] overflow-hidden">
      <div
        class="flex h-full will-change-transform"
        :style="trackStyle"
      >
        <!-- 01 Group overview -->
        <article id="overview-panel-0" data-panel-index="0" class="overview-panel overview-order-0">
          <div class="overview-inner grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span class="section-tag font-esports text-[11px]">01 / 集团概况</span>
              <h2 class="mt-5 font-display text-4xl font-bold leading-tight text-white md:text-7xl 2xl:text-8xl">
                江曜擎天的<br />
                <span class="gradient-text">电竞产业集团</span>
              </h2>
              <p class="mt-7 max-w-3xl font-body text-base leading-relaxed text-slate-300 md:text-lg">
                以电竞俱乐部为入口，联动产业园区、赛事运营、AI内容生产与数字商业服务，打造面向粤港澳大湾区的电竞产业融合平台。
              </p>
              <div class="mt-10 grid grid-cols-3 gap-3 md:gap-4">
                <div v-for="item in keyStats" :key="item.label" class="rounded-sm border border-cyber/15 bg-white/[0.04] p-4 md:p-6">
                  <div class="stat-number gradient-text text-2xl md:text-5xl">{{ item.value }}</div>
                  <div class="mt-2 font-body text-xs text-slate-400">{{ item.label }}</div>
                </div>
              </div>
              <div class="mt-6 flex flex-wrap gap-2">
                <span v-for="tag in strategyTags" :key="tag"
                  class="rounded-sm border border-cyber/20 bg-cyber/5 px-3 py-1.5 font-body text-xs text-slate-300 md:px-4 md:py-2">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="relative overflow-hidden rounded-sm border border-cyber/20 bg-[#071224] shadow-[0_0_50px_rgba(0,212,255,0.08)]">
              <img :src="gateBg" alt="江曜擎天电竞产业园区意向图" class="h-[360px] w-full object-cover opacity-75 md:h-[560px] xl:h-[600px]" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#030912] via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="font-esports text-xs tracking-[0.22em] text-cyber">ZHONGSHAN · GUANGDONG</div>
                <div class="mt-2 font-display text-2xl font-bold text-white">立足中山，辐射大湾区</div>
              </div>
            </div>
          </div>
        </article>

        <!-- 02 Opportunity -->
        <article id="overview-panel-1" data-panel-index="1" class="overview-panel overview-order-1">
          <div class="overview-inner">
            <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span class="section-tag font-esports text-[11px]">02 / 产业机遇</span>
                <h2 class="mt-5 font-display text-4xl font-bold text-white md:text-5xl">
                  政策、市场与城市<span class="gradient-text">窗口期</span>
                </h2>
              </div>
              <p class="max-w-xl font-body text-sm leading-relaxed text-slate-400">
                电竞被纳入数字经济与文化消费核心范畴，区域赛事 IP、年轻用户规模与城市产业升级需求同步释放。
              </p>
            </div>

            <div class="grid gap-4 lg:grid-cols-3">
              <div v-for="card in policyCards" :key="card.title" class="glass-card hud-corner rounded-sm p-6">
                <h3 class="font-display text-xl font-bold text-white">{{ card.title }}</h3>
                <div class="mt-5 space-y-3">
                  <div v-for="item in card.items" :key="item.text" class="flex gap-3">
                    <span v-if="item.year" class="h-fit rounded-sm bg-electric/20 px-2 py-1 font-display text-xs font-bold text-cyber">
                      {{ item.year }}
                    </span>
                    <p class="font-body text-sm leading-relaxed text-slate-300">{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 grid gap-4 md:grid-cols-3">
              <div v-for="stat in marketStats" :key="stat.label" class="rounded-sm border border-cyber/15 bg-white/[0.04] p-6">
                <div class="stat-number gradient-text text-4xl">{{ stat.value }}</div>
                <div class="mt-3 font-display font-bold text-white">{{ stat.label }}</div>
                <p class="mt-2 font-body text-sm text-slate-400">{{ stat.desc }}</p>
              </div>
            </div>
          </div>
        </article>

        <!-- 03 Blueprint -->
        <article id="overview-panel-2" data-panel-index="2" class="overview-panel overview-order-2">
          <div class="overview-inner grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span class="section-tag font-esports text-[11px]">03 / 投资蓝图</span>
              <h2 class="mt-5 font-display text-4xl font-bold text-white md:text-5xl">
                分期投入，<span class="gradient-text">分区落地</span>
              </h2>
              <p class="mt-5 font-body leading-relaxed text-slate-400">
                以赛事中心、俱乐部基地、直播孵化、电竞教育、商业配套为核心，形成可运营、可招商、可持续扩展的产业空间。
              </p>
              <div class="mt-8 space-y-4">
                <div v-for="phase in investPhases" :key="phase.name">
                  <div class="mb-1.5 flex items-center justify-between">
                    <span class="font-body text-sm text-slate-300">{{ phase.name }}</span>
                    <span class="font-esports text-sm text-cyber">{{ phase.amount }}</span>
                  </div>
                  <div class="h-1 overflow-hidden rounded-full bg-white/10">
                    <div class="h-full rounded-full bg-gradient-to-r from-electric to-cyber" :style="{ width: phase.pct }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <div v-for="zone in buildZones" :key="zone.name" class="rounded-sm border border-cyber/15 bg-[#071224]/80 p-5">
                <div class="mb-4 h-1 w-10 rounded-full" :style="{ background: zone.color, boxShadow: `0 0 12px ${zone.color}80` }"></div>
                <h3 class="font-display font-bold text-white">{{ zone.name }}</h3>
                <div class="mt-3 font-esports text-lg" :style="{ color: zone.color }">{{ zone.area }}</div>
              </div>
            </div>
          </div>
        </article>

        <!-- 04 Structure -->
        <article id="overview-panel-3" data-panel-index="3" class="overview-panel overview-order-3">
          <div class="overview-inner">
            <div class="mb-8 text-center">
              <span class="section-tag font-esports text-[11px]">04 / 集团结构</span>
              <h2 class="mt-5 font-display text-4xl font-bold text-white md:text-5xl">
                四大板块<span class="gradient-text">协同运转</span>
              </h2>
              <div class="cyber-divider mx-auto mt-6 w-24"></div>
            </div>

            <div class="grid gap-4 md:grid-cols-4">
              <div v-for="unit in groupUnits" :key="unit.title" class="glass-card rounded-sm p-6">
                <div class="font-esports text-[11px] tracking-[0.22em] text-cyber">{{ unit.code }}</div>
                <h3 class="mt-4 font-display text-xl font-bold text-white">{{ unit.title }}</h3>
                <p class="mt-3 font-body text-sm leading-relaxed text-slate-400">{{ unit.desc }}</p>
              </div>
            </div>

            <div class="mt-8 grid gap-4 md:grid-cols-3">
              <div v-for="vision in visions" :key="vision.title" class="rounded-sm border border-white/10 bg-white/[0.03] p-5">
                <h3 class="font-display font-bold text-white">{{ vision.title }}</h3>
                <p class="mt-2 font-body text-sm leading-relaxed text-slate-400">{{ vision.desc }}</p>
              </div>
            </div>
          </div>
        </article>

        <!-- 05 Team -->
        <article id="overview-panel-4" data-panel-index="4" class="overview-panel overview-order-4">
          <div class="overview-inner">
            <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span class="section-tag font-esports text-[11px]">05 / 核心团队</span>
                <h2 class="mt-5 font-display text-4xl font-bold text-white md:text-5xl">
                  电竞科技<span class="gradient-text">管理团队</span>
                </h2>
              </div>
              <p class="max-w-xl font-body text-sm leading-relaxed text-slate-400">
                汇聚中国电竞开拓者、上市集团运营经验、AI视频技术与直播商业化资源，支撑集团项目落地。
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div v-for="member in team" :key="member.name" class="glass-card hud-corner overflow-hidden rounded-sm">
                <div class="relative h-40 bg-[#0A1628] xl:h-48">
                  <img
                    :src="member.photo"
                    :alt="member.name"
                    class="h-full w-full object-contain object-top xl:object-cover"
                    :style="{ objectPosition: member.pos }"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A162880] to-transparent"></div>
                  <h3 class="absolute bottom-3 left-4 font-esports text-lg font-bold text-white">{{ member.name }}</h3>
                </div>
                <div class="p-4">
                  <div class="min-h-[32px] font-body text-xs tracking-wide text-cyber">{{ member.role }}</div>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span v-for="tag in member.tags" :key="tag" class="rounded-sm border border-electric/20 bg-electric/10 px-2 py-0.5 font-body text-[10px] text-star">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 06 Subsidiaries -->
        <article id="overview-panel-5" data-panel-index="5" class="overview-panel overview-order-5">
          <div class="overview-inner grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span class="section-tag font-esports text-[11px]">06 / 子公司</span>
              <h2 class="mt-5 font-display text-4xl font-bold text-white md:text-5xl">
                子公司<span class="gradient-text">矩阵</span>
              </h2>
              <p class="mt-5 font-body leading-relaxed text-slate-400">
                子公司页面先保留公司简介入口，后续可继续接入工商信息、业务资质、项目案例、媒体资料等内容。
              </p>
            </div>

            <div class="glass-card hud-corner rounded-sm p-8">
              <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="font-esports text-xs uppercase tracking-[0.18em] text-cyber">Company Profile</p>
                  <h3 class="mt-2 font-display text-2xl font-bold text-white">公司简介</h3>
                </div>
                <span class="w-fit rounded-sm border border-cyber/25 bg-cyber/8 px-3 py-1 font-body text-xs text-cyber">
                  待补充
                </span>
              </div>

              <div class="mt-8 rounded-sm border border-dashed border-cyber/20 bg-[#030912]/60 px-6 py-12 text-center">
                <p class="font-body text-sm text-slate-500">子公司资料整理中</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div
        class="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 md:bottom-6"
      >
        <button
          type="button"
          class="overview-arrow"
          :class="canGoPrev ? 'text-cyber hover:border-cyber/70 hover:bg-cyber/10' : 'text-slate-600 opacity-45 cursor-not-allowed'"
          :disabled="!canGoPrev"
          aria-label="上一屏"
          @click="shiftPanel(-1)"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          class="overview-arrow"
          :class="canGoNext ? 'text-cyber hover:border-cyber/70 hover:bg-cyber/10' : 'text-slate-600 opacity-45 cursor-not-allowed'"
          :disabled="!canGoNext"
          aria-label="下一屏"
          @click="shiftPanel(1)"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { img } from '../config/oss'

const sectionRef = ref(null)
const currentPanel = ref(0)
const panelCount = 6

const gateBg = img.park5

const activeIndex = computed(() => currentPanel.value)
const canGoPrev = computed(() => activeIndex.value > 0)
const canGoNext = computed(() => activeIndex.value < panelCount - 1)
const trackStyle = computed(() => ({
  transform: `translate3d(-${currentPanel.value * 100}vw, 0, 0)`,
  transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
}))

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function scrollToPanel(index) {
  currentPanel.value = clamp(index, 0, panelCount - 1)
}

function shiftPanel(direction) {
  scrollToPanel(clamp(activeIndex.value + direction, 0, panelCount - 1))
}

function overviewActiveId() {
  return currentPanel.value === 5 ? 'subsidiaries' : 'company'
}

function emitOverviewActive() {
  window.dispatchEvent(new CustomEvent('jiangyao:overview-active', {
    detail: {
      id: overviewActiveId(),
      panel: currentPanel.value,
    },
  }))
}

function handleOverviewGo(event) {
  const panel = Number(event.detail?.panel ?? 0)
  scrollToPanel(panel)
  sectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function syncPanelFromHash() {
  if (window.location.hash === '#subsidiaries') {
    scrollToPanel(5)
  } else if (window.location.hash === '#company') {
    scrollToPanel(0)
  }
}

const keyStats = [
  { value: '20亿', label: '总投资规模' },
  { value: '50万㎡', label: '规划面积' },
  { value: '100亿+', label: '目标产业集群' },
]

const strategyTags = ['电竞俱乐部', '赛事运营', '产业园区', 'AI内容生产', '直播商业化', '数字经济']

const policyCards = [
  {
    title: '国家战略与政策支持',
    items: [
      { year: '2003', text: '电竞列为正式体育竞赛项目' },
      { year: '2016', text: '教育部开设电竞专业，多部委发文支持电子竞技产业发展' },
    ],
  },
  {
    title: '大湾区政策利好',
    items: [
      { year: '2025', text: '广州出台扶持电竞产业政策，区域赛事与内容生态持续升级' },
      { year: '2026', text: '广东力推「粤超联赛」，打造区域顶级赛事 IP' },
    ],
  },
  {
    title: '中山独特机遇',
    items: [
      { year: '', text: '大湾区中心城市，具备数字经济和制造业融合基础' },
      { year: '', text: '本地尚无顶级电竞俱乐部，市场空白与城市名片机会明显' },
    ],
  },
]

const marketStats = [
  { value: '$29.5亿', label: '全球市场增长', desc: '赞助与媒体版权收入持续攀升' },
  { value: '¥293.3亿', label: '中国电竞产值', desc: '产业链日趋成熟，商业化空间持续释放' },
  { value: '4.9亿', label: '中国电竞用户', desc: '年轻、高学历、高互动用户群体集中' },
]

const investPhases = [
  { name: '一期建设', amount: '8亿元', pct: '40%' },
  { name: '二期扩展', amount: '7亿元', pct: '35%' },
  { name: '三期完善', amount: '5亿元', pct: '25%' },
]

const buildZones = [
  { name: '电竞赛事核心区', area: '12万㎡', color: '#00D4FF' },
  { name: '俱乐部训练基地', area: '8万㎡', color: '#1A6FFF' },
  { name: '直播孵化产业区', area: '10万㎡', color: '#A855F7' },
  { name: '电竞教育学院区', area: '8万㎡', color: '#00D4FF' },
  { name: '商业生活配套区', area: '7万㎡', color: '#1A6FFF' },
  { name: '生态景观绿化区', area: '5万㎡', color: '#6EE7B7' },
]

const groupUnits = [
  { code: 'GROUP', title: '集团总部', desc: '统筹战略、资本、品牌与区域资源，推动电竞产业项目规模化落地。' },
  { code: 'CLUB', title: '电竞俱乐部', desc: '以职业战队、赛事训练与青训体系为核心，形成竞技内容源头。' },
  { code: 'PARK', title: '产业园区', desc: '承载赛事场馆、直播基地、培训中心与数字内容企业集聚。' },
  { code: 'AI', title: '超级视频工厂', desc: '提供AI视频生产、数字营销与品牌内容增长能力，服务业务闭环。' },
]

const visions = [
  { title: '立足中山', desc: '联动核心城市资源构建产业协同格局。' },
  { title: '引领全国', desc: '输出先进模式标准，成为中国电竞产业示范样板。' },
  { title: '享誉世界', desc: '打造国际顶级品牌，提升中国电竞影响力。' },
]

const team = [
  {
    name: '马天元',
    photo: img.tianyuan,
    pos: 'center 15%',
    role: 'AG电竞创始人 / SC电竞俱乐部创始人',
    tags: ['中国电竞开拓者', '名人堂入选者', '30年经验'],
  },
  {
    name: '李小刚',
    photo: img.xiaogang,
    pos: 'center 10%',
    role: 'SC俱乐部运营执行总裁',
    tags: ['星竞威武集团', '董事长助理', '纳斯达克上市'],
  },
  {
    name: '张晖',
    photo: img.zhanghui,
    pos: 'center 10%',
    role: 'Doud AI超级视频工厂创始人',
    tags: ['原字节跳动', '商务BD', '3.5亿+曝光'],
  },
  {
    name: '张晨晰',
    photo: img.chengxi,
    pos: 'center 10%',
    role: '武汉星竞威武集团直播事业部总监',
    tags: ['10年直播经验', '月流水1300万', '500+主播管理'],
  },
]

watch(currentPanel, emitOverviewActive)

onMounted(() => {
  window.addEventListener('jiangyao:overview-go', handleOverviewGo)
  window.addEventListener('hashchange', syncPanelFromHash)
  syncPanelFromHash()
  emitOverviewActive()
})

onUnmounted(() => {
  window.removeEventListener('jiangyao:overview-go', handleOverviewGo)
  window.removeEventListener('hashchange', syncPanelFromHash)
})
</script>

<style scoped>
.overview-anchor {
  position: absolute;
  left: 0;
  height: 1px;
  width: 1px;
  scroll-margin-top: 88px;
}

.overview-panel {
  width: 100vw;
  height: 100svh;
  min-height: 100svh;
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  overflow-y: auto;
  scroll-snap-align: center;
  padding: 5.75rem 1rem 4.5rem;
  scrollbar-width: none;
}

.overview-panel::-webkit-scrollbar {
  display: none;
}

.overview-order-0 { order: 0; }
.overview-order-1 { order: 1; }
.overview-order-2 { order: 2; }
.overview-order-3 { order: 3; }
.overview-order-4 { order: 4; }
.overview-order-5 { order: 5; }

.overview-inner {
  width: min(108rem, calc(100vw - 2rem));
  margin: 0 auto;
}

.overview-arrow {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 212, 255, 0.24);
  background: rgba(3, 9, 18, 0.74);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.overview-arrow:not(:disabled):hover {
  transform: translateY(-1px);
}

@media (min-width: 768px) {
  .overview-panel {
    width: 100vw;
    height: 100svh;
    min-height: 100svh;
    align-items: center;
    padding: 5.25rem 3rem 4rem;
    overflow: hidden;
  }

  .overview-inner {
    width: min(108rem, calc(100vw - 6rem));
  }
}
</style>
