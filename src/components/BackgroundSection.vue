<template>
  <section id="background" class="relative py-28 bg-[#060D1F] hex-bg">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section header -->
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">01 / 项目背景</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-4">
          宏观背景与<span class="gradient-text">产业机遇</span>
        </h2>
        <div class="cyber-divider w-24 mx-auto mt-6"></div>
      </div>

      <!-- Policy cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-20">
        <div v-for="(card, i) in policyCards" :key="card.title"
          class="glass-card neon-hover rounded-sm p-8 relative hud-corner slide-up transition-all duration-300 hover:-translate-y-1"
          :class="`delay-${(i+1)*100}`">
          <div class="text-cyber mb-4">
            <component :is="card.icon" class="w-8 h-8" />
          </div>
          <h3 class="font-display font-bold text-white text-xl mb-4">{{ card.title }}</h3>
          <div class="space-y-3">
            <div v-for="item in card.items" :key="item.year" class="flex items-start gap-3">
              <span v-if="item.year" class="flex-shrink-0 bg-electric/20 text-cyber text-xs font-bold px-2 py-1 rounded-sm font-display">
                {{ item.year }}
              </span>
              <p class="text-slate-300 text-sm font-body leading-relaxed">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Market data -->
      <div class="slide-up">
        <div class="text-center mb-10">
          <span class="section-tag font-esports text-[11px]">市场规模</span>
          <h3 class="font-esports font-bold text-3xl text-white mt-4">电竞产业<span class="gradient-text">黄金时期</span></h3>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(stat, i) in marketStats" :key="stat.label"
            class="glass-card neon-hover rounded-sm p-8 text-center slide-up transition-all duration-300"
            :class="`delay-${(i+1)*150}`">
            <div class="stat-number text-5xl md:text-6xl gradient-text mb-3">{{ stat.value }}</div>
            <div class="font-display font-bold text-white text-lg mb-2">{{ stat.label }}</div>
            <p class="text-slate-400 text-sm font-body">{{ stat.desc }}</p>
            <div v-if="stat.bars" class="mt-4 space-y-2">
              <div v-for="bar in stat.bars" :key="bar.label" class="text-left">
                <div class="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{{ bar.label }}</span>
                  <span class="text-cyber">{{ bar.pct }}</span>
                </div>
                <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-electric to-cyber rounded-full transition-all duration-1000"
                    :style="{ width: bar.pct }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const policyCards = [
  {
    title: '国家战略与政策支持',
    items: [
      { year: '2003', text: '电竞列为正式体育竞赛项目' },
      { year: '2016', text: '教育部开设电竞专业，多部委发文支持电子竞技产业发展，电竞产业纳入数字经济与文化消费核心范畴' },
    ],
  },
  {
    title: '大湾区核心城市政策利好',
    items: [
      { year: '2025', text: '《广州市扶持电竞产业发展的十八条措施》，单个企业每年最高可获得 1000万元 扶持' },
      { year: '2026', text: '广东力推「粤超联赛」，省委宣传部等打造区域顶级IP' },
    ],
  },
  {
    title: '中山独特机遇',
    items: [
      { year: null, text: '大湾区中心城市，庞大产业集群，数字经济发展沃土' },
      { year: null, text: '本地尚无顶级电竞俱乐部，市场空白巨大' },
      { year: null, text: '具备俱乐部落地和电竞产业融合发展机遇' },
    ],
  },
]

const marketStats = [
  {
    value: '$29.5亿',
    label: '全球市场爆发增长',
    desc: '赞助与媒体版权收入持续攀升',
  },
  {
    value: '¥293.3亿',
    label: '中国电竞产值领跑全球',
    desc: '同比增长 6.4%，产业链日趋成熟',
  },
  {
    value: '4.9亿',
    label: '中国电竞用户规模',
    desc: '高学历年轻用户群体为主',
    bars: [
      { label: '用户年龄 < 25岁', pct: '60%' },
      { label: '专科及以上学历', pct: '70%' },
    ],
  },
]
</script>
