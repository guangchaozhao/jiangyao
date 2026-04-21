<template>
  <section id="team" class="relative py-28 bg-[#060D1F] grid-bg">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">02 / 核心团队</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-4">
          电竞科技<span class="gradient-text">管理团队</span>
        </h2>
        <div class="cyber-divider w-24 mx-auto mt-6"></div>
        <p class="text-slate-400 font-body mt-4 max-w-xl mx-auto">
          汇聚中国电竞开拓者与顶级产业资源，构建世界级电竞运营管理体系
        </p>
      </div>

      <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div v-for="(member, i) in team" :key="member.name"
          class="glass-card neon-hover rounded-sm relative hud-corner group hover:-translate-y-2 transition-all duration-300 slide-up overflow-hidden"
          :class="`delay-${(i+1)*100}`">

          <!-- Photo -->
          <div class="relative h-64 overflow-hidden">
            <img
              :src="member.photo"
              :alt="member.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :style="{ objectPosition: member.pos || 'center top' }"
              loading="lazy"
            />
            <!-- Gradient: only bottom 40% fades to card color, top stays clear -->
            <div class="absolute inset-0"
              style="background: linear-gradient(to top, #0A1628 0%, #0A162880 30%, transparent 60%)"></div>
            <!-- Cyber scan line on hover -->
            <div class="absolute inset-x-0 top-0 h-px bg-cyber/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <!-- Status dot -->
            <div class="absolute top-3 right-3">
              <span class="w-2 h-2 rounded-full bg-cyber block animate-pulse
                           shadow-[0_0_8px_rgba(0,212,255,0.8)]"></span>
            </div>
            <!-- Name overlay -->
            <div class="absolute bottom-3 left-4 right-4">
              <h3 class="font-esports font-bold text-white text-lg leading-tight drop-shadow-lg">{{ member.name }}</h3>
            </div>
          </div>

          <!-- Card body -->
          <div class="p-5">
            <div class="text-cyber text-xs font-body tracking-wide mb-3">{{ member.role }}</div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span v-for="tag in member.tags" :key="tag"
                class="text-[10px] px-2 py-0.5 bg-electric/10 border border-electric/20 text-star rounded-sm font-body">
                {{ tag }}
              </span>
            </div>

            <div class="cyber-divider mb-3"></div>
            <p class="text-slate-400 text-xs font-body leading-relaxed">{{ member.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import tianyuan from '../picture/tianyuan.png'
import xiaogang from '../picture/xiaogang.png'
import zhanghui from '../picture/zhanghui.png'
import zhengxi from '../picture/zhengxi.png'

const team = [
  {
    name: '马天元',
    photo: tianyuan,
    pos: 'center 15%',
    role: 'AG电竞创始人 / SC电竞俱乐部创始人',
    tags: ['中国电竞开拓者', '名人堂入选者', '30年经验'],
    desc: '中国电竞历史上第一位获得电竞世界冠军的行业代表人物，对电竞俱乐部组建与产业发展拥有核心行业资源。',
  },
  {
    name: '李小刚',
    photo: xiaogang,
    pos: 'center 10%',
    role: 'SC俱乐部运营执行总裁',
    tags: ['星竞威武集团', '董事长助理', '纳斯达克上市'],
    desc: '武汉星竞威武集团「中国电竞第一股」（NPG），2024年7月纳斯达克上市。具备以上市为导向的集团化运作管理能力。',
  },
  {
    name: '张晖',
    photo: zhanghui,
    pos: 'center 10%',
    role: 'Doud AI超级视频工厂创始人',
    tags: ['原字节跳动', '商务BD', '3.5亿+曝光'],
    desc: '原字节跳动商务BD，参与运营清华大学「乡村振兴领头雁」计划。作品累计曝光超3.5亿次。',
  },
  {
    name: '张晨晰',
    photo: zhengxi,
    pos: 'center 10%',
    role: '武汉星竞威武集团直播事业部总监',
    tags: ['10年直播经验', '月流水1300万', '500+主播管理'],
    desc: '10年直播行业全链路运营与管理经验，管理团队创下月度流水1300万元业绩，累计运营管理主播超500人。',
  },
]
</script>
