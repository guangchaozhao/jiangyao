<script setup>
import { ref } from 'vue'
import { img } from '../config/oss'
const xingchenLogo = img.xingchen
import VideoGalleryModal from './VideoGalleryModal.vue'
import EsportsGalleryModal from './EsportsGalleryModal.vue'

const showGallery        = ref(false)
const showEsportsGallery = ref(false)
</script>

<template>
  <section id="business" class="relative py-28 bg-[#060D1F] grid-bg">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 slide-up">
        <span class="section-tag font-esports text-[11px]">04 / 核心业务</span>
        <h2 class="reveal-clip font-display font-bold text-4xl md:text-5xl text-white mt-4">
          技术 + 经验的<span class="gradient-text">竞争壁垒</span>
        </h2>
        <div class="cyber-divider w-24 mx-auto mt-6"></div>
      </div>

      <!-- Bento Grid — 不对称 + 混合圆角 -->
      <div class="grid grid-cols-1 md:grid-cols-6 md:grid-rows-[auto_auto_auto] gap-4">

        <!-- 1. Star Club 主卡 4×2,rounded-3xl(全场最大圆角,视觉锚点) -->
        <div class="md:col-span-4 md:row-span-2 glass-card neon-hover rounded-3xl p-8 md:p-10 relative overflow-hidden slide-up flex flex-col">
          <!-- 角落大数字标识 -->
          <div class="absolute top-6 right-7 font-esports font-black text-cyber/15 text-[88px] leading-none pointer-events-none select-none">01</div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-cyber/8 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-electric/6 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col h-full">
            <div class="flex items-center gap-4 mb-6">
              <img :src="xingchenLogo" alt="星辰电竞" class="w-14 h-14 object-contain flex-shrink-0" />
              <div>
                <h3 class="font-esports font-bold text-white text-xl md:text-2xl">Star Club 电竞俱乐部</h3>
                <p class="text-cyber text-xs font-body mt-1">致力于打造行业标杆的「百年电竞俱乐部」</p>
              </div>
            </div>

            <p class="text-slate-400 font-body text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
              三十年冠军经验团队领衔，以中国电竞开拓者马天元（MTY）为核心，联合星竞威武集团顶级资源，
              组建热门项目职业战队，构建完善青训体系，自主策划品牌赛事，打造世界顶级竞技IP。
            </p>

            <div class="flex flex-wrap gap-2 mb-auto">
              <span v-for="t in ['职业战队', '青训体系', '品牌赛事', '30年冠军经验', 'IP运营']" :key="t"
                class="text-xs px-3 py-1.5 rounded-full bg-cyber/10 border border-cyber/25 text-star font-body">{{ t }}</span>
            </div>

            <button type="button" @click="showEsportsGallery = true"
              class="cyber-btn mt-7 self-start px-6 py-3 border border-cyber/50 text-cyber
                     font-esports font-bold text-xs rounded-full
                     hover:bg-cyber/10 hover:border-cyber hover:shadow-[0_0_24px_rgba(0,212,255,0.35)]
                     transition-all duration-300 cursor-pointer inline-flex items-center gap-2">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              查看战队影像库
            </button>
          </div>
        </div>

        <!-- 2. Doud AI 右上 2×1,rounded-2xl -->
        <div class="md:col-span-2 glass-card neon-hover rounded-2xl p-6 relative overflow-hidden slide-up delay-100 flex flex-col">
          <div class="absolute -bottom-6 -right-6 w-28 h-28 bg-electric/12 rounded-full blur-2xl"></div>
          <div class="flex items-start justify-between mb-4">
            <div class="w-11 h-11 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center text-xl">🤖</div>
            <div class="font-esports font-black text-electric/20 text-3xl leading-none">02</div>
          </div>
          <h3 class="font-esports font-bold text-white text-lg mb-1">Doud AI</h3>
          <p class="text-cyber text-xs font-body mb-3">超级视频工厂</p>
          <p class="text-slate-400 text-xs font-body leading-relaxed flex-1">
            中国AI技术开拓者，资深专家团队，助力政企单位节能增效，提供AI时代技术服务与人才培养。
          </p>
          <button @click="showGallery = true"
            class="cyber-btn mt-5 w-full py-2.5 border border-electric/50 text-electric
                   font-esports font-bold text-xs rounded-full
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

        <VideoGalleryModal :show="showGallery" @close="showGallery = false" />
        <EsportsGalleryModal :show="showEsportsGallery" @close="showEsportsGallery = false" />

        <!-- 3. 教育学院 右中 2×1,rounded-2xl -->
        <div class="md:col-span-2 glass-card neon-hover rounded-2xl p-6 relative overflow-hidden slide-up delay-200">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 via-cyber/50 to-transparent"></div>
          <div class="flex items-start justify-between mb-4">
            <div class="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-xl">🎓</div>
            <div class="font-esports font-black text-purple-400/20 text-3xl leading-none">03</div>
          </div>
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

        <!-- 4. 人才经纪 底左 2×1,rounded-xl(故意比邻居小一档,做层次) -->
        <div class="md:col-span-2 glass-card neon-hover rounded-xl p-6 relative overflow-hidden slide-up delay-200">
          <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-cyber/10 rounded-full blur-2xl"></div>
          <div class="flex items-start justify-between mb-4">
            <div class="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-xl">🌟</div>
            <div class="font-esports font-black text-cyan-400/20 text-3xl leading-none">04</div>
          </div>
          <h3 class="font-esports font-bold text-white text-lg mb-2">人才经纪管理</h3>
          <p class="text-slate-400 text-xs font-body leading-relaxed mb-4">
            建设高标准直播基地，孵化优质直播团队，搭建跨境电商直播平台，打通商业变现全链路。
          </p>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-center p-2.5 bg-white/4 rounded-lg">
              <div class="font-esports font-bold text-cyber text-sm">500+</div>
              <div class="text-slate-500 text-[10px] font-body">主播管理</div>
            </div>
            <div class="text-center p-2.5 bg-white/4 rounded-lg">
              <div class="font-esports font-bold text-cyber text-sm">1300万</div>
              <div class="text-slate-500 text-[10px] font-body">月度流水</div>
            </div>
          </div>
        </div>

        <!-- 5. 产业融合 底右 4×1 横向卡片(打破竖向节奏)rounded-2xl -->
        <div class="md:col-span-4 glass-card neon-hover rounded-2xl p-6 md:p-7 relative overflow-hidden slide-up delay-300">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric/60 via-cyber/40 to-transparent"></div>
          <div class="absolute top-5 right-7 font-esports font-black text-electric/15 text-5xl leading-none pointer-events-none">05</div>

          <div class="flex flex-col md:flex-row md:items-center gap-5 md:gap-7 relative z-10">
            <!-- 左:图标 + 主标题 -->
            <div class="flex items-center gap-4 md:flex-col md:items-start md:gap-3 md:min-w-[200px]">
              <div class="w-12 h-12 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center text-xl flex-shrink-0">🔗</div>
              <div>
                <h3 class="font-esports font-bold text-white text-lg md:text-xl">电竞+产业融合</h3>
                <p class="text-electric text-xs font-body mt-0.5">全生命周期运营</p>
              </div>
            </div>

            <!-- 中:描述 -->
            <p class="text-slate-400 font-body text-sm leading-relaxed flex-1 md:max-w-md">
              打破信息壁垒，搭建产业资源对接平台，促进企业间深度合作。
            </p>

            <!-- 右:tag pills -->
            <div class="flex flex-wrap gap-1.5 md:max-w-[280px]">
              <span v-for="s in ['AI服务', '法务', '财务', '人力', '资源对接', '配套保障']" :key="s"
                class="text-[10px] px-2.5 py-1 bg-electric/10 border border-electric/25 text-star rounded-full font-body">{{ s }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
