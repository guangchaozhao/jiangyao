<template>
  <section id="company" class="relative py-28 bg-cosmic overflow-hidden">
    <!-- Background accent -->
    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full
                bg-electric/5 blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">02 / 集团概况</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-4">
          江曜擎天的<span class="gradient-text">集团结构</span>与核心资源
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

      <!-- Group structure -->
      <div class="mt-16 grid md:grid-cols-4 gap-4 slide-up">
        <div v-for="unit in groupUnits" :key="unit.title"
          class="border border-cyber/15 bg-white/[0.03] rounded-sm p-5 hover:border-cyber/40 transition-colors duration-300">
          <div class="text-cyber font-esports text-[11px] tracking-widest mb-3">{{ unit.code }}</div>
          <h4 class="font-display font-bold text-white mb-2">{{ unit.title }}</h4>
          <p class="text-slate-400 text-sm font-body leading-relaxed">{{ unit.desc }}</p>
        </div>
      </div>

      <!-- Core team inside group overview -->
      <div class="mt-20 slide-up">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div>
            <span class="section-tag font-esports text-[11px]">集团概况 / 核心团队</span>
            <h3 class="font-display font-bold text-3xl md:text-4xl text-white mt-4">
              电竞科技<span class="gradient-text">管理团队</span>
            </h3>
          </div>
          <p class="text-slate-400 font-body max-w-xl leading-relaxed">
            汇聚中国电竞开拓者、上市集团运营经验、AI视频技术与直播商业化资源，支撑集团化项目落地。
          </p>
        </div>

        <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <div v-for="(member, i) in team" :key="member.name"
            class="glass-card neon-hover rounded-sm relative hud-corner group transition-all duration-300 slide-up overflow-hidden"
            :class="`delay-${(i+1)*100}`">

            <div class="relative overflow-hidden h-44 sm:h-48 xl:h-52 bg-[#0A1628]">
              <img
                :src="member.photo"
                :alt="member.name"
                class="w-full h-full transition-transform duration-500 object-contain object-top xl:object-cover xl:group-hover:scale-105"
                :style="{ objectPosition: member.pos || 'center top' }"
                loading="lazy"
              />
              <div class="absolute inset-0"
                style="background: linear-gradient(to top, #0A1628 0%, #0A162880 32%, transparent 62%)"></div>
              <div class="absolute inset-x-0 top-0 h-px bg-cyber/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-3 left-4 right-4">
                <h4 class="font-esports font-bold text-white text-lg leading-tight drop-shadow-lg">{{ member.name }}</h4>
              </div>
            </div>

            <div class="p-5">
              <div class="text-cyber text-xs font-body tracking-wide mb-3 min-h-[32px]">{{ member.role }}</div>
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
    </div>
  </section>
</template>

<script setup>
import { img } from '../config/oss'

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

const groupUnits = [
  {
    code: 'GROUP',
    title: '集团总部',
    desc: '统筹战略、资本、品牌与区域资源，推动电竞产业项目规模化落地。',
  },
  {
    code: 'CLUB',
    title: '电竞俱乐部',
    desc: '以职业战队、赛事训练与青训体系为核心，形成竞技内容源头。',
  },
  {
    code: 'PARK',
    title: '产业园区',
    desc: '承载赛事场馆、直播基地、培训中心与数字内容企业集聚。',
  },
  {
    code: 'AI',
    title: '超级视频工厂',
    desc: '提供AI视频生产、数字营销与品牌内容增长能力，服务集团业务闭环。',
  },
]

const team = [
  {
    name: '马天元',
    photo: img.tianyuan,
    pos: 'center 15%',
    role: 'AG电竞创始人 / SC电竞俱乐部创始人',
    tags: ['中国电竞开拓者', '名人堂入选者', '30年经验'],
    desc: '中国电竞历史上第一位获得电竞世界冠军的行业代表人物，对电竞俱乐部组建与产业发展拥有核心行业资源。',
  },
  {
    name: '李小刚',
    photo: img.xiaogang,
    pos: 'center 10%',
    role: 'SC俱乐部运营执行总裁',
    tags: ['星竞威武集团', '董事长助理', '纳斯达克上市'],
    desc: '武汉星竞威武集团「中国电竞第一股」（NPG），2024年7月纳斯达克上市。具备以上市为导向的集团化运作管理能力。',
  },
  {
    name: '张晖',
    photo: img.zhanghui,
    pos: 'center 10%',
    role: 'Doud AI超级视频工厂创始人',
    tags: ['原字节跳动', '商务BD', '3.5亿+曝光'],
    desc: '原字节跳动商务BD，参与运营清华大学「乡村振兴领头雁」计划。作品累计曝光超3.5亿次。',
  },
  {
    name: '张晨晰',
    photo: img.chengxi,
    pos: 'center 10%',
    role: '武汉星竞威武集团直播事业部总监',
    tags: ['10年直播经验', '月流水1300万', '500+主播管理'],
    desc: '10年直播行业全链路运营与管理经验，管理团队创下月度流水1300万元业绩，累计运营管理主播超500人。',
  },
]
</script>
