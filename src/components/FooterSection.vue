<template>
  <footer id="contact" class="relative bg-[#03070F] border-t border-cyber/10 overflow-hidden">
    <!-- Top accent line -->
    <div class="h-px bg-gradient-to-r from-transparent via-cyber/50 to-transparent"></div>

    <!-- CTA banner -->
    <div class="py-20 text-center relative slide-up">
      <div class="absolute inset-0 grid-bg opacity-20"></div>
      <div class="relative z-10">
        <div class="text-cyber text-sm tracking-widest uppercase font-body mb-4">欢迎合作共创</div>
        <h2 class="font-display font-bold text-4xl md:text-6xl gradient-text-white mb-4 neon-text-blue">
          江曜所至，皆为星辰！
        </h2>
        <p class="text-slate-400 font-body text-lg mb-10">
          共同开创世界级电竞产业生态
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:contact@jiangyao-esports.com"
            class="group px-10 py-3.5 bg-gradient-to-r from-electric to-cyber text-white font-display font-semibold
                   rounded-sm hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all duration-300 cursor-pointer">
            立即联系我们
            <span class="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="cyber-divider mx-6"></div>

    <!-- Footer info -->
    <div class="max-w-7xl mx-auto px-6 py-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo & company -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 relative">
            <div class="absolute inset-0 border-2 border-cyber rotate-45"></div>
            <div class="absolute inset-1 bg-electric/30 rotate-45"></div>
            <span class="absolute inset-0 flex items-center justify-center text-cyber font-display font-bold text-xs">SC</span>
          </div>
          <div>
            <div class="font-display font-bold text-white text-sm">星辰电子竞技综合产业园区</div>
            <div class="text-slate-500 text-xs font-body mt-0.5">江曜擎天电竞发展（广东）有限公司</div>
          </div>
        </div>

        <!-- Location -->
        <div class="flex items-center gap-2 text-slate-500 text-sm font-body">
          <svg class="w-4 h-4 text-cyber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          </svg>
          总部筹建地：广东省中山市港口镇
        </div>

        <!-- Copyright -->
        <div class="text-slate-600 text-xs font-body">
          © 2024 江曜擎天电竞发展（广东）有限公司 · 创世界一流百年电竞俱乐部
        </div>
      </div>
    </div>
  </footer>
</template>
