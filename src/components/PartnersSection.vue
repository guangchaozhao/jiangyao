<template>
  <section class="relative py-24 bg-[#030912] overflow-hidden">
    <div class="h-px bg-gradient-to-r from-transparent via-cyber/40 to-transparent mb-16"></div>

    <!-- Header -->
    <div class="max-w-7xl mx-auto px-6 text-center mb-14 slide-up">
      <span class="section-tag font-esports text-[11px]">PARTNERS · 战略合作</span>
      <h2 class="font-display font-bold text-3xl md:text-4xl text-white mt-4">
        联动核心资源，共建<span class="gradient-text">产业生态</span>
      </h2>
      <p class="text-slate-400 font-body text-sm mt-3 max-w-xl mx-auto">
        汇聚政府、电竞、科技、媒体全链条战略合作伙伴，构建世界级电竞产业协同格局
      </p>
    </div>

    <!-- Row 1: left to right -->
    <div class="relative mb-5">
      <div class="flex gap-4 marquee-track">
        <div v-for="(p, i) in [...partners1, ...partners1]" :key="'r1-'+i"
          class="partner-card flex-shrink-0">
          <div class="partner-icon" :style="{ background: p.bg, color: p.color }">
            {{ p.abbr }}
          </div>
          <div class="partner-name">{{ p.name }}</div>
          <div class="partner-type">{{ p.type }}</div>
        </div>
      </div>
      <!-- Fade edges -->
      <div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030912] to-transparent z-10"></div>
      <div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030912] to-transparent z-10"></div>
    </div>

    <!-- Row 2: right to left -->
    <div class="relative">
      <div class="flex gap-4 marquee-track marquee-reverse">
        <div v-for="(p, i) in [...partners2, ...partners2]" :key="'r2-'+i"
          class="partner-card flex-shrink-0">
          <div class="partner-icon" :style="{ background: p.bg, color: p.color }">
            {{ p.abbr }}
          </div>
          <div class="partner-name">{{ p.name }}</div>
          <div class="partner-type">{{ p.type }}</div>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030912] to-transparent z-10"></div>
      <div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030912] to-transparent z-10"></div>
    </div>

    <div class="h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent mt-16"></div>
  </section>
</template>

<script setup>
const partners1 = [
  { name: '星竞威武集团', abbr: 'NPG', type: '战略合作',   bg: 'rgba(0,212,255,0.12)',  color: '#00D4FF' },
  { name: 'AG电竞俱乐部', abbr: 'AG',  type: '电竞资源',   bg: 'rgba(26,111,255,0.12)', color: '#7CC8FF' },
  { name: '粤超联赛',     abbr: '粤超', type: '赛事合作',   bg: 'rgba(168,85,247,0.12)', color: '#A855F7' },
  { name: '广东省文旅厅', abbr: '文旅', type: '政府支持',   bg: 'rgba(0,212,255,0.10)',  color: '#00D4FF' },
  { name: 'Doud AI',      abbr: 'AI',  type: '技术支撑',   bg: 'rgba(26,111,255,0.12)', color: '#1A6FFF' },
  { name: '中山市港口镇', abbr: '港口', type: '属地支持',   bg: 'rgba(110,231,183,0.10)',color: '#6EE7B7' },
  { name: '字节跳动',     abbr: 'TT',  type: '媒体资源',   bg: 'rgba(168,85,247,0.10)', color: '#A855F7' },
  { name: '清华大学',     abbr: '清华', type: '教育合作',   bg: 'rgba(0,212,255,0.10)',  color: '#00D4FF' },
]

const partners2 = [
  { name: 'SC电竞俱乐部', abbr: 'SC',  type: '核心战队',   bg: 'rgba(0,212,255,0.12)',  color: '#00D4FF' },
  { name: '虎牙直播',     abbr: '虎牙', type: '直播平台',   bg: 'rgba(251,146,60,0.10)', color: '#FB923C' },
  { name: '腾讯电竞',     abbr: 'TGA', type: '赛事资源',   bg: 'rgba(26,111,255,0.12)', color: '#7CC8FF' },
  { name: '广州电竞协会', abbr: '协会', type: '行业协会',   bg: 'rgba(110,231,183,0.10)',color: '#6EE7B7' },
  { name: '纳斯达克',     abbr: 'NSDQ',type: '资本市场',   bg: 'rgba(168,85,247,0.10)', color: '#A855F7' },
  { name: '中山市人民政府',abbr: '中山', type: '政府支持',  bg: 'rgba(0,212,255,0.10)',  color: '#00D4FF' },
  { name: '网易游戏',     abbr: 'NE',  type: '游戏资源',   bg: 'rgba(251,146,60,0.10)', color: '#FB923C' },
  { name: '大湾区电竞联盟',abbr: '联盟', type: '产业联盟',  bg: 'rgba(26,111,255,0.12)', color: '#1A6FFF' },
]
</script>

<style scoped>
/* Marquee animation */
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.marquee-track {
  width: max-content;
  animation: marquee-left 30s linear infinite;
}
.marquee-reverse {
  animation: marquee-right 28s linear infinite;
}
.marquee-track:hover,
.marquee-reverse:hover {
  animation-play-state: paused;
}

/* Partner card */
.partner-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background: rgba(10, 22, 40, 0.6);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 2px;
  width: 140px;
  cursor: default;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.partner-card:hover {
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.08);
}
.partner-icon {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.5px;
}
.partner-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #E2E8F0;
  text-align: center;
  line-height: 1.3;
}
.partner-type {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: #475569;
  text-align: center;
}
</style>
