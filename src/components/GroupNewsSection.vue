<template>
  <section id="news" class="relative overflow-hidden bg-cosmic py-28">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
    <div class="absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-electric/5 blur-[90px] pointer-events-none"></div>

    <div class="relative mx-auto max-w-7xl px-6">
      <div class="mb-14 text-center slide-up">
        <span class="section-tag font-esports text-[11px]">07 / 集团新闻</span>
        <h2 class="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
          集团<span class="gradient-text">新闻中心</span>
        </h2>
        <p class="mx-auto mt-4 max-w-2xl font-body text-sm leading-7 text-slate-400">
          定期发布集团新闻、领导关怀、合作交流等信息，形成统一的集团资讯发布窗口。
        </p>
        <div class="cyber-divider mx-auto mt-6 w-24"></div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="(item, index) in newsCategories"
          :key="item.title"
          class="glass-card neon-hover rounded-sm p-6 slide-up"
          :class="`delay-${(index + 1) * 100}`"
        >
          <div class="mb-5 flex items-center justify-between">
            <span class="font-esports text-xs text-cyber">{{ item.code }}</span>
            <span class="h-2 w-2 rounded-full bg-cyber shadow-[0_0_10px_rgba(0,212,255,0.8)]"></span>
          </div>
          <h3 class="font-display text-xl font-bold text-white">{{ item.title }}</h3>
          <p class="mt-3 min-h-[64px] font-body text-sm leading-6 text-slate-400">{{ item.desc }}</p>
          <div class="mt-6 rounded-sm border border-dashed border-cyber/18 bg-white/[0.03] px-4 py-5 text-center">
            <p class="font-body text-xs text-slate-500">内容待发布</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const newsCategories = [
  {
    code: 'NEWS',
    title: '集团新闻',
    desc: '发布集团经营动态、重点项目进展、品牌活动与重要公告。',
  },
  {
    code: 'CARE',
    title: '领导关怀',
    desc: '记录各级领导调研指导、政策关怀与项目推进情况。',
  },
  {
    code: 'COOP',
    title: '合作交流',
    desc: '呈现政府、企业、高校、赛事机构等合作交流与资源对接。',
  },
]
</script>
