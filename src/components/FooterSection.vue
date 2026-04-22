<template>
  <footer class="relative bg-[#03070F] overflow-hidden">
    <div class="h-px bg-gradient-to-r from-transparent via-cyber/40 to-transparent"></div>

    <!-- Main footer content -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <img :src="jiangyaoLogo" alt="江曜擎天" class="h-12 w-auto object-contain" />
          </div>
          <p class="text-slate-500 text-sm font-body leading-relaxed mb-5 max-w-xs">
            立足中山、辐射粤港澳大湾区、面向全球的电竞产业融合载体。创世界一流百年电竞俱乐部，建百亿产值数字经济中心。
          </p>
          <!-- Social icons -->
          <div class="flex gap-3">
            <a v-for="s in socials" :key="s.name" :href="s.href"
              class="w-9 h-9 border border-cyber/20 rounded-sm flex items-center justify-center
                     text-slate-500 hover:text-cyber hover:border-cyber/50 hover:bg-cyber/5
                     transition-all duration-200 cursor-pointer"
              :title="s.name">
              <component :is="s.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="font-esports font-bold text-white text-sm tracking-wider mb-5">快速导航</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.label">
              <a :href="link.href"
                class="text-slate-500 hover:text-cyber text-sm font-body transition-colors duration-200 flex items-center gap-2 group cursor-pointer">
                <span class="w-0 h-px bg-cyber group-hover:w-3 transition-all duration-200"></span>
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-esports font-bold text-white text-sm tracking-wider mb-5">联系我们</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-cyber flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              <span class="text-slate-500 text-sm font-body">广东省中山市港口镇</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-cyber flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span class="text-slate-500 text-sm font-body">business@starsesports.cn</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-cyber flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span class="text-slate-500 text-sm font-body">400-XXX-XXXX</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-slate-600 text-xs font-body text-center sm:text-left">
          © 2025 江曜擎天电竞发展（广东）有限公司 · 粤ICP备XXXXXXXX号
        </div>
        <div class="font-esports text-xs text-cyber/50 tracking-widest">
          江曜所至，皆为星辰
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { h } from 'vue'
import { img } from '../config/oss'
const jiangyaoLogo = img.jiangyao

const quickLinks = [
  { label: '项目背景', href: '#background' },
  { label: '公司介绍', href: '#company' },
  { label: '核心团队', href: '#team' },
  { label: '园区规划', href: '#park' },
  { label: '核心业务', href: '#business' },
  { label: '目标展望', href: '#goals' },
  { label: '合作洽谈', href: '#contact' },
]

// Simple SVG icon components
const WechatIcon = { render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.063-6.122zm-3.84 3.26c.537 0 .972.44.972.982a.977.977 0 0 1-.972.982.977.977 0 0 1-.972-.982c0-.542.434-.982.972-.982zm4.484 0c.537 0 .972.44.972.982a.977.977 0 0 1-.972.982.977.977 0 0 1-.972-.982c0-.542.434-.982.972-.982z' })
])}

const WeiboIcon = { render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M9.82727 23.6538C4.32727 23.6538 0 20.0307 0 15.5538C0 13.0153 1.41818 10.2153 3.87273 7.86923C7.16364 4.68923 11.0182 3.32308 12.6182 4.98462C13.3455 5.74615 13.4909 6.96923 13.0545 8.38462C12.8364 9.03077 13.4545 8.74615 13.4545 8.74615C15.8727 7.66154 17.9455 7.56923 18.7636 8.74615C19.2 9.37692 19.1273 10.3538 18.6182 11.4923C18.4364 11.9077 18.6909 11.9692 18.6909 11.9692C21.1818 12.8308 22.9455 14.4308 22.9455 16.3385C22.9636 20.3077 16.9818 23.6538 9.82727 23.6538ZM5.23636 14.5231C4.32727 14.5231 3.6 15.2923 3.6 16.2462C3.6 17.1692 4.32727 17.9077 5.23636 17.9077C6.14545 17.9077 6.87273 17.1692 6.87273 16.2462C6.87273 15.3077 6.14545 14.5231 5.23636 14.5231ZM9.32727 12.7385C7.83636 12.7385 6.61818 13.9846 6.61818 15.5231C6.61818 17.0462 7.83636 18.2769 9.32727 18.2769C10.8182 18.2769 12.0364 17.0462 12.0364 15.5231C12.0364 13.9692 10.8 12.7385 9.32727 12.7385ZM20.0727 5.33846C18.9818 4.04615 17.3818 3.41538 15.7636 3.63077L15.7455 3.63846C15.3455 3.69231 15.0727 4.06923 15.1273 4.47692C15.1818 4.88462 15.5455 5.16923 15.9455 5.11538C17.1273 4.96923 18.3273 5.43077 19.1273 6.36923C19.9273 7.30769 20.1818 8.56923 19.8 9.73077C19.6727 10.1231 19.8909 10.5385 20.2727 10.6615C20.6727 10.7846 21.0727 10.5538 21.2 10.1615C21.7636 8.43077 21.4 6.65385 20.0727 5.33846ZM17.4 7.07692C16.8364 6.43077 16.0182 6.1 15.1636 6.21538C14.7636 6.26923 14.4909 6.64615 14.5455 7.05385C14.6 7.46154 14.9636 7.74615 15.3636 7.69231C15.7636 7.63846 16.1636 7.8 16.4182 8.09231C16.6727 8.38462 16.7636 8.78462 16.6364 9.15385C16.5091 9.55385 16.7273 9.96923 17.1091 10.0923C17.5091 10.2154 17.9091 9.98462 18.0364 9.6C18.3636 8.58462 18.0727 7.72308 17.4 7.07692Z' })
])}

const BilibiliIcon = { render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z' })
])}

const socials = [
  { name: '微信公众号', href: '#', icon: WechatIcon },
  { name: '微博',       href: '#', icon: WeiboIcon },
  { name: 'Bilibili',  href: '#', icon: BilibiliIcon },
]
</script>
