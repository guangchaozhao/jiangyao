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

      <div class="grid md:grid-cols-2 gap-6" :class="managementTeamGridClass">
        <div v-for="(member, i) in team" :key="member.name"
          class="glass-card neon-hover rounded-sm relative hud-corner group hover:-translate-y-2 transition-all duration-300 slide-up overflow-hidden"
          :class="`delay-${(i+1)*100}`">

          <!-- Photo
               xl(4列): h-64 object-cover 人像不动
               md(2列): h-52 object-contain 自动缩小展示完整人像
               sm以下(1列): h-44 object-contain
          -->
          <div class="relative overflow-hidden
                      h-44 sm:h-52 md:h-52 xl:h-64
                      bg-[#0A1628]">
            <img
              :src="member.photo"
              :alt="member.name"
              class="w-full h-full transition-transform duration-500
                     object-contain object-top
                     xl:object-cover xl:group-hover:scale-105"
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
import { managementTeam, managementTeamGridClass } from '../config/management-team'

const team = managementTeam
</script>
