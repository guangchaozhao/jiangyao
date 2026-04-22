<template>
  <Teleport to="body">
    <Transition name="gallery-modal">
      <div v-if="show"
        class="fixed inset-0 z-[200] flex flex-col bg-[#020810]/97 backdrop-blur-md"
        @keydown.esc="$emit('close')" tabindex="0" ref="modalEl">

        <!-- Header -->
        <div class="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4
                    border-b border-cyber/15">
          <div class="flex items-center gap-3">
            <div class="w-1 h-6 bg-cyber"></div>
            <div>
              <h2 class="font-esports font-bold text-white text-base sm:text-lg">Doud AI 案例库</h2>
              <p class="text-slate-500 text-xs font-body mt-0.5">{{ videos.length }} 个案例</p>
            </div>
          </div>
          <button @click="$emit('close')"
            class="w-9 h-9 border border-cyber/30 text-slate-400 hover:text-white
                   hover:border-cyber transition-all duration-200 flex items-center
                   justify-center rounded-sm cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- ══ 移动端：播放器在上，缩略图在下 ══ -->
        <div class="md:hidden flex-1 flex flex-col overflow-hidden">

          <!-- 移动端播放器 -->
          <Transition name="player-drop">
            <div v-if="activeIdx !== null" class="flex-shrink-0 bg-black relative">
              <video ref="playerElMobile"
                :src="videos[activeIdx].src"
                class="w-full object-contain max-h-[40vh]"
                controls autoplay
                @ended="activeIdx = null"
              ></video>
              <!-- 关闭播放器按钮 -->
              <button @click="activeIdx = null"
                class="absolute top-2 right-2 w-8 h-8 bg-black/70 border border-white/20
                       text-white flex items-center justify-center rounded-full cursor-pointer z-10">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <!-- 切换按钮：浮在播放器上 -->
              <div class="absolute bottom-2 left-0 right-0 flex justify-between px-3">
                <button @click="prevVideo"
                  class="px-3 py-1.5 bg-black/70 border border-cyber/40 text-cyber
                         text-xs font-esports rounded-sm cursor-pointer backdrop-blur-sm">
                  ← 上一个
                </button>
                <span class="text-white text-xs font-body self-center opacity-70">
                  {{ videos[activeIdx].title }}
                </span>
                <button @click="nextVideo"
                  class="px-3 py-1.5 bg-black/70 border border-cyber/40 text-cyber
                         text-xs font-esports rounded-sm cursor-pointer backdrop-blur-sm">
                  下一个 →
                </button>
              </div>
            </div>
          </Transition>

          <!-- 移动端缩略图格 -->
          <div class="flex-1 overflow-y-auto px-3 py-4"
            style="scrollbar-width: thin; scrollbar-color: rgba(0,212,255,0.3) transparent">
            <div class="grid grid-cols-2 gap-3">
              <div v-for="(v, i) in videos" :key="v.src"
                class="group cursor-pointer relative rounded-sm overflow-hidden border transition-all duration-300"
                :class="activeIdx === i
                  ? 'border-cyber shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                  : 'border-cyber/15 hover:border-cyber/50'"
                @click="playVideo(i, true)">
                <video :src="v.src + '#t=0.5'"
                  class="w-full object-cover block aspect-video"
                  preload="metadata" muted />
                <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div v-if="activeIdx === i"
                    class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyber animate-pulse"></div>
                  <div class="w-8 h-8 rounded-full bg-white/20 border border-white/40
                              flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div class="absolute bottom-0 inset-x-0 px-2 py-1.5
                            bg-gradient-to-t from-black/80 to-transparent">
                  <p class="text-white text-[10px] font-body truncate">{{ v.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ══ 桌面端：左格 + 右播放器 ══ -->
        <div class="hidden md:flex flex-1 overflow-hidden">

          <!-- 左：瀑布格 -->
          <div class="flex-1 overflow-y-auto px-8 py-6"
            style="scrollbar-width: thin; scrollbar-color: rgba(0,212,255,0.3) transparent">
            <div class="columns-3 lg:columns-4 gap-4 space-y-4">
              <div v-for="(v, i) in videos" :key="v.src"
                class="break-inside-avoid mb-4 group cursor-pointer relative rounded-sm overflow-hidden
                       border transition-all duration-300"
                :class="activeIdx === i
                  ? 'border-cyber shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                  : 'border-cyber/15 hover:border-cyber/50'"
                @click="playVideo(i, false)">
                <video :src="v.src + '#t=0.5'"
                  class="w-full object-cover block"
                  :class="v.tall ? 'aspect-[9/16]' : v.wide ? 'aspect-video' : 'aspect-square'"
                  preload="metadata" muted />
                <div class="absolute inset-0 bg-black/50 group-hover:bg-black/30
                            transition-colors duration-200 flex items-center justify-center">
                  <div v-if="activeIdx === i"
                    class="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyber animate-pulse
                           shadow-[0_0_8px_rgba(0,212,255,0.8)]"></div>
                  <div class="w-10 h-10 rounded-full bg-white/20 border border-white/40
                              flex items-center justify-center group-hover:bg-cyber/30
                              group-hover:border-cyber transition-all duration-200"
                    :class="activeIdx === i ? 'bg-cyber/40 border-cyber' : ''">
                    <svg class="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div class="absolute bottom-0 inset-x-0 px-3 py-2
                            bg-gradient-to-t from-black/80 to-transparent">
                  <p class="text-white text-xs font-body truncate">{{ v.title }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 右：播放器 -->
          <Transition name="player-slide">
            <div v-if="activeIdx !== null"
              class="w-[440px] lg:w-[520px] flex-shrink-0 border-l border-cyber/15
                     flex flex-col bg-[#030912]">
              <!-- 播放器 -->
              <div class="relative aspect-video bg-black flex-shrink-0">
                <video ref="playerEl"
                  :src="videos[activeIdx].src"
                  class="w-full h-full object-contain"
                  controls autoplay
                  @ended="activeIdx = null"
                ></video>
                <!-- 关闭播放器 -->
                <button @click="activeIdx = null"
                  class="absolute top-2 right-2 w-7 h-7 bg-black/60 border border-white/20
                         text-white flex items-center justify-center rounded-full cursor-pointer
                         hover:border-cyber hover:text-cyber transition-all duration-200 z-10">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <!-- HUD corners -->
                <div class="absolute top-2 left-2 w-5 h-5 border-t border-l border-cyber/50 pointer-events-none"></div>
              </div>
              <!-- 信息 + 切换 -->
              <div class="p-5 flex-1 overflow-y-auto">
                <h3 class="font-display font-bold text-white text-base mb-1">
                  {{ videos[activeIdx].title }}
                </h3>
                <p class="text-slate-400 text-sm font-body leading-relaxed mb-4">
                  {{ videos[activeIdx].desc || 'Doud AI 超级视频工厂出品' }}
                </p>
                <div class="flex gap-2">
                  <button @click="prevVideo"
                    class="flex-1 py-2 border border-cyber/30 text-cyber text-xs font-esports
                           hover:bg-cyber/10 transition-all duration-200 rounded-sm cursor-pointer">
                    ← 上一个
                  </button>
                  <button @click="nextVideo"
                    class="flex-1 py-2 border border-cyber/30 text-cyber text-xs font-esports
                           hover:bg-cyber/10 transition-all duration-200 rounded-sm cursor-pointer">
                    下一个 →
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { showcaseVideos } from '../config/oss'

const props = defineProps({ show: Boolean })
defineEmits(['close'])

const modalEl     = ref(null)
const playerEl    = ref(null)       // 桌面播放器
const playerElMobile = ref(null)    // 移动播放器
const activeIdx   = ref(null)
const videos      = showcaseVideos

function playVideo(i, isMobile = false) {
  const prev = playerEl.value || playerElMobile.value
  if (prev) { prev.pause(); prev.currentTime = 0 }
  activeIdx.value = i
  nextTick(() => {
    const el = isMobile ? playerElMobile.value : playerEl.value
    el?.play()
    // 移动端：滚动到顶部看播放器
    if (isMobile) modalEl.value?.querySelector('.overflow-y-auto')?.scrollTo(0, 0)
  })
}

function nextVideo() { playVideo((activeIdx.value + 1) % videos.length, window.innerWidth < 768) }
function prevVideo() { playVideo((activeIdx.value - 1 + videos.length) % videos.length, window.innerWidth < 768) }

watch(() => props.show, (v) => {
  if (v) {
    document.body.style.overflow = 'hidden'
    nextTick(() => modalEl.value?.focus())
  } else {
    document.body.style.overflow = ''
    playerEl.value?.pause()
    playerElMobile.value?.pause()
    activeIdx.value = null
  }
})
</script>

<style scoped>
.gallery-modal-enter-active, .gallery-modal-leave-active { transition: opacity 0.25s ease; }
.gallery-modal-enter-from, .gallery-modal-leave-to { opacity: 0; }

.player-slide-enter-active, .player-slide-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.player-slide-enter-from { transform: translateX(30px); opacity: 0; }
.player-slide-leave-to  { transform: translateX(30px); opacity: 0; }

.player-drop-enter-active, .player-drop-leave-active { transition: max-height 0.3s ease, opacity 0.3s ease; }
.player-drop-enter-from { max-height: 0; opacity: 0; }
.player-drop-leave-to  { max-height: 0; opacity: 0; }
</style>
