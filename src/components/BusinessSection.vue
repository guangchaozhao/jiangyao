<template>
  <section id="business" class="relative py-28 bg-[#060D1F] grid-bg">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">04 / 核心业务</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-4">
          技术 + 经验的<span class="gradient-text">竞争壁垒</span>
        </h2>
        <div class="cyber-divider w-24 mx-auto mt-6"></div>
      </div>

      <!-- Main businesses: 2 big cards -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div v-for="(biz, i) in mainBiz" :key="biz.title"
          class="glass-card rounded-sm p-8 relative hud-corner hover:border-cyber/50 transition-all duration-300 group slide-up"
          :class="`delay-${(i+1)*100}`">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 rounded-sm flex items-center justify-center text-2xl"
              :style="{ background: biz.color + '20', border: `1px solid ${biz.color}40` }">
              {{ biz.icon }}
            </div>
            <div>
              <h3 class="font-display font-bold text-white text-xl">{{ biz.title }}</h3>
              <p class="text-cyber text-sm font-body mt-1">{{ biz.subtitle }}</p>
            </div>
          </div>
          <p class="text-slate-400 font-body text-sm mb-5">{{ biz.desc }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in biz.tags" :key="tag"
              class="text-xs px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-slate-300 font-body">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- 3 platform cards -->
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="(plat, i) in platforms" :key="plat.title"
          class="glass-card rounded-sm p-6 hover:border-cyber/40 transition-all duration-300 slide-up"
          :class="`delay-${(i+1)*100}`">
          <div class="w-10 h-10 rounded-sm mb-4 flex items-center justify-center text-xl"
            :style="{ background: plat.color + '20', border: `1px solid ${plat.color}40` }">
            {{ plat.icon }}
          </div>
          <h3 class="font-display font-bold text-white text-lg mb-2">{{ plat.title }}</h3>
          <p class="text-slate-400 text-sm font-body mb-4">{{ plat.desc }}</p>
          <ul class="space-y-1.5">
            <li v-for="item in plat.items" :key="item"
              class="flex items-center gap-2 text-xs text-slate-300 font-body">
              <span class="w-1 h-1 rounded-full bg-cyber flex-shrink-0"></span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const mainBiz = [
  {
    icon: '⚔️',
    title: 'Star Club 电竞俱乐部',
    subtitle: '致力于打造行业标杆的「百年电竞俱乐部」',
    desc: '三十年冠军经验团队领衔，组建热门项目职业战队，构建完善青训体系，自主策划品牌赛事。',
    tags: ['职业战队', '青训体系', '品牌赛事', '30年经验'],
    color: '#00D4FF',
  },
  {
    icon: '🤖',
    title: 'Doud AI 超级视频工厂',
    subtitle: '以核心技术助力政企单位节能增效',
    desc: '中国AI技术开拓者，资深AI专家团队，成熟运营理念，提供AI时代技术服务和人才培养。',
    tags: ['AI模型构建', '人才培养', '政企服务', '技术开拓'],
    color: '#1A6FFF',
  },
]

const platforms = [
  {
    icon: '🎓',
    title: '电子竞技教育学院',
    desc: '打造产教融合的电竞人才培养标杆',
    items: ['构建专业教育品牌', '深度链接高校资源', '项目指导式教学'],
    color: '#7C3AED',
  },
  {
    icon: '🌟',
    title: '人才经纪管理中心',
    desc: '构建独立IP生态，打通商业变现全链路',
    items: ['高标准直播基地', '孵化优质直播团队', '跨境电商直播平台'],
    color: '#00D4FF',
  },
  {
    icon: '🔗',
    title: '电竞+产业融合平台',
    desc: '全生命周期运营支撑，助力合作企业高效发展',
    items: ['AI服务 / 法务 / 财务', '产业资源对接平台', '完善配套设施'],
    color: '#1A6FFF',
  },
]
</script>
