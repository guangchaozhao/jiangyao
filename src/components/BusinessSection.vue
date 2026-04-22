<script setup>
import { ref } from 'vue'
import { img } from '../config/oss'
const xingchenLogo = img.xingchen
import VideoGalleryModal from './VideoGalleryModal.vue'

const showGallery = ref(false)
</script>

<template>
  <section id="business" class="relative py-28 bg-[#060D1F] grid-bg">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">04 / 核心业务</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-4">
          技术 + 经验的<span class="gradient-text">竞争壁垒</span>
        </h2>
        <div class="cyber-divider w-24 mx-auto mt-6"></div>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto">

        <!-- 1. Star Club 大卡 (2/3宽) -->
        <div class="md:col-span-4 glass-card neon-hover rounded-sm p-8 relative overflow-hidden hud-corner slide-up">
          <div class="absolute top-0 right-0 w-48 h-48 bg-cyber/5 rounded-full blur-3xl pointer-events-none"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-5">
              <img :src="xingchenLogo" alt="星辰电竞" class="w-12 h-12 object-contain flex-shrink-0" />
              <div>
                <h3 class="font-esports font-bold text-white text-xl">Star Club 电竞俱乐部</h3>
                <p class="text-cyber text-xs font-body mt-0.5">致力于打造行业标杆的「百年电竞俱乐部」</p>
              </div>
            </div>
            <p class="text-slate-400 font-body text-sm leading-relaxed mb-5">
              三十年冠军经验团队领衔，以中国电竞开拓者马天元（MTY）为核心，联合星竞威武集团顶级资源，
              组建热门项目职业战队，构建完善青训体系，自主策划品牌赛事，打造世界顶级竞技IP。
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="t in ['职业战队', '青训体系', '品牌赛事', '30年冠军经验', 'IP运营']" :key="t"
                class="text-xs px-3 py-1 rounded-sm bg-cyber/8 border border-cyber/20 text-star font-body">{{ t }}</span>
            </div>
          </div>
        </div>

        <!-- 2. Doud AI 小卡 (1/3宽) -->
        <div class="md:col-span-2 glass-card neon-hover rounded-sm p-6 relative overflow-hidden slide-up delay-100 flex flex-col">
          <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-electric/10 rounded-full blur-2xl"></div>
          <div class="w-10 h-10 rounded-sm bg-electric/15 border border-electric/30 flex items-center justify-center text-xl mb-4">🤖</div>
          <h3 class="font-esports font-bold text-white text-lg mb-2">Doud AI</h3>
          <p class="text-cyber text-xs font-body mb-3">超级视频工厂</p>
          <p class="text-slate-400 text-xs font-body leading-relaxed flex-1">
            中国AI技术开拓者，资深专家团队，助力政企单位节能增效，提供AI时代技术服务与人才培养。
          </p>
          <!-- 案例库按钮 -->
          <button @click="showGallery = true"
            class="cyber-btn mt-5 w-full py-2.5 border border-electric/50 text-electric
                   font-esports font-bold text-xs rounded-sm
                   hover:bg-electric/10 hover:border-electric hover:shadow-[0_0_16px_rgba(26,111,255,0.3)]
                   transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            查看案例库
          </button>
        </div>

        <!-- 案例库弹窗 -->
        <VideoGalleryModal :show="showGallery" @close="showGallery = false" />

        <!-- 3. 教育学院 窄高卡 -->
        <div class="md:col-span-2 glass-card neon-hover rounded-sm p-6 relative overflow-hidden slide-up delay-200">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 via-cyber/50 to-transparent"></div>
          <div class="w-10 h-10 rounded-sm bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-xl mb-4">🎓</div>
          <h3 class="font-esports font-bold text-white text-lg mb-2">电子竞技教育学院</h3>
          <p class="text-slate-400 text-xs font-body leading-relaxed mb-4">
            打造产教融合的电竞人才培养标杆，深度链接高校资源，构建专业教育品牌，推行项目指导式教学。
          </p>
          <div class="space-y-2">
            <div v-for="f in ['专业课程体系', '高校资源对接', '实战项目驱动']" :key="f"
              class="flex items-center gap-2 text-xs text-slate-300 font-body">
              <span class="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0"></span>{{ f }}
            </div>
          </div>
        </div>

        <!-- 4. 人才经纪 中卡 -->
        <div class="md:col-span-2 glass-card neon-hover rounded-sm p-6 relative overflow-hidden slide-up delay-200">
          <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-cyber/8 rounded-full blur-2xl"></div>
          <div class="w-10 h-10 rounded-sm bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-xl mb-4">🌟</div>
          <h3 class="font-esports font-bold text-white text-lg mb-2">人才经纪管理</h3>
          <p class="text-slate-400 text-xs font-body leading-relaxed mb-4">
            建设高标准直播基地，孵化优质直播团队，搭建跨境电商直播平台，打通商业变现全链路。
          </p>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-center p-2 bg-white/3 rounded-sm">
              <div class="font-esports font-bold text-cyber text-sm">500+</div>
              <div class="text-slate-500 text-[10px] font-body">主播管理</div>
            </div>
            <div class="text-center p-2 bg-white/3 rounded-sm">
              <div class="font-esports font-bold text-cyber text-sm">1300万</div>
              <div class="text-slate-500 text-[10px] font-body">月度流水</div>
            </div>
          </div>
        </div>

        <!-- 5. 产业融合平台 大卡 (2/3宽) -->
        <div class="md:col-span-2 glass-card neon-hover rounded-sm p-6 relative overflow-hidden slide-up delay-300">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric/50 to-transparent"></div>
          <div class="w-10 h-10 rounded-sm bg-electric/15 border border-electric/30 flex items-center justify-center text-xl mb-4">🔗</div>
          <h3 class="font-esports font-bold text-white text-lg mb-2">电竞+产业融合</h3>
          <p class="text-slate-400 text-xs font-body leading-relaxed mb-4">
            全生命周期运营支撑，打破信息壁垒，搭建产业资源对接平台，促进企业间深度合作。
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="s in ['AI服务', '法务', '财务', '人力', '资源对接', '配套保障']" :key="s"
              class="text-[10px] px-2 py-0.5 bg-electric/10 border border-electric/20 text-star rounded-sm font-body">{{ s }}</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
