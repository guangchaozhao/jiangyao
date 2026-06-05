<template>
  <Teleport to="body">
    <Transition name="gallery-modal">
      <div v-if="show"
        data-lenis-prevent
        class="fixed inset-0 z-[200] flex flex-col bg-[#020810]/97 backdrop-blur-md"
        @keydown.esc="$emit('close')" tabindex="0" ref="modalEl">

        <!-- Header -->
        <div class="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-cyber/15">
          <div class="flex items-center gap-3">
            <div class="w-1 h-6 bg-electric"></div>
            <div>
              <h2 class="font-esports font-bold text-white text-base sm:text-lg">Star Club 战队影像库</h2>
              <p class="text-slate-500 text-xs font-body mt-0.5">
                {{ loading ? '同步战队影像中...' : `${media.length} 个媒体文件` }}
              </p>
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

        <!-- Empty state -->
        <div v-if="loading"
          class="flex-1 flex flex-col items-center justify-center gap-4 text-slate-500">
          <div class="w-10 h-10 rounded-full border border-electric/30 border-t-electric animate-spin"></div>
          <p class="font-body text-sm">战队影像加载中...</p>
        </div>

        <div v-else-if="error"
          class="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center text-red-200">
          <p class="font-body text-sm">{{ error }}</p>
          <button
            type="button"
            class="border border-electric/40 px-4 py-2 text-xs font-esports text-electric hover:bg-electric/10"
            @click="loadMedia(true)"
          >
            重新加载
          </button>
        </div>

        <div v-else-if="media.length === 0"
          class="flex-1 flex flex-col items-center justify-center gap-4 text-slate-500">
          <svg class="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14
                 M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="font-body text-sm">战队影像即将上传，敬请期待</p>
        </div>

        <!-- ══ 移动端 ══ -->
        <div v-else class="md:hidden flex-1 flex flex-col overflow-hidden">
          <!-- 移动端播放/查看区 -->
          <Transition name="player-drop">
            <div v-if="activeIdx !== null" class="flex-shrink-0 bg-black relative">
              <!-- 图片 -->
              <img v-if="activeItem.type === 'image'"
                :src="activeItem.src"
                class="w-full object-contain max-h-[45vh]"
                :alt="activeItem.title" />
              <!-- 视频 -->
              <video v-else
                ref="playerMobile"
                :src="activeItem.src"
                class="w-full object-contain max-h-[40vh]"
                controls autoplay @ended="activeIdx = null">
              </video>
              <!-- 关闭 -->
              <button @click="activeIdx = null"
                class="absolute top-2 right-2 w-8 h-8 bg-black/70 border border-white/20
                       text-white flex items-center justify-center rounded-full cursor-pointer z-10">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <!-- 上下导航 -->
              <div class="absolute bottom-2 left-0 right-0 flex justify-between px-3">
                <button @click="prev"
                  class="px-3 py-1.5 bg-black/70 border border-electric/40 text-electric
                         text-xs font-esports rounded-sm cursor-pointer backdrop-blur-sm">← 上一个</button>
                <button @click="next"
                  class="px-3 py-1.5 bg-black/70 border border-electric/40 text-electric
                         text-xs font-esports rounded-sm cursor-pointer backdrop-blur-sm">下一个 →</button>
              </div>
            </div>
          </Transition>

          <!-- 移动端网格 -->
          <div class="flex-1 overflow-y-auto px-3 py-4"
            style="scrollbar-width: thin; scrollbar-color: rgba(26,111,255,0.3) transparent">
            <div class="grid grid-cols-2 gap-3">
              <div v-for="(m, i) in media" :key="m.src"
                class="group cursor-pointer relative rounded-sm overflow-hidden border transition-all duration-300 aspect-square"
                :class="activeIdx === i
                  ? 'border-electric shadow-[0_0_12px_rgba(26,111,255,0.3)]'
                  : 'border-electric/15 hover:border-electric/50'"
                @click="open(i)">
                <!-- 图片缩略 -->
                <img v-if="m.type === 'image'" :src="previewSrc(m, 520)" :alt="m.title"
                  class="w-full h-full object-cover" loading="lazy" />
                <!-- 视频缩略 -->
                <video v-else :src="m.src + '#t=0.5'"
                  class="w-full h-full object-cover" preload="metadata" muted />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div v-if="activeIdx === i"
                    class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-electric animate-pulse"></div>
                  <!-- 图片放大图标 / 视频播放图标 -->
                  <div class="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                    <svg v-if="m.type === 'image'" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                    </svg>
                    <svg v-else class="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ══ 桌面端：3D 影像轮播 ══ -->
        <div v-if="media.length > 0" class="hidden md:flex flex-1 flex-col overflow-hidden px-8 py-7">
          <div class="relative flex min-h-0 flex-1 items-center justify-center rounded-sm bg-[radial-gradient(circle_at_center,rgba(26,111,255,0.12),rgba(2,8,16,0)_62%)]">
            <button
              type="button"
              class="carousel-arrow left-3 lg:left-8"
              @click="focusPrev"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <div class="carousel-stage">
              <button
                v-for="entry in visibleCarouselMedia"
                :key="entry.item.src"
                type="button"
                class="carousel-card"
                :class="{
                  'is-center': entry.index === focusIdx,
                }"
                :style="carouselStyle(entry.index)"
                @click="handleCarouselClick(entry.index)"
              >
                <img
                  v-if="entry.item.type === 'image'"
                  :src="previewSrc(entry.item, 960)"
                  :alt="entry.item.title"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
                <video
                  v-else
                  :src="entry.item.src + '#t=0.5'"
                  class="h-full w-full object-cover"
                  preload="metadata"
                  muted
                  playsinline
                ></video>
                <div class="carousel-shade"></div>
                <div
                  v-if="entry.index === focusIdx"
                  class="carousel-center-icon"
                >
                  <svg v-if="entry.item.type === 'image'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                  </svg>
                  <svg v-else class="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            </div>

            <button
              type="button"
              class="carousel-arrow right-3 lg:right-8"
              @click="focusNext"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div class="mt-5 flex items-center justify-center gap-2">
            <button
              v-for="(m, i) in media"
              :key="`dot-${m.src}`"
              type="button"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="i === focusIdx ? 'w-8 bg-electric' : 'w-2 bg-white/20 hover:bg-white/40'"
              @click="focus(i)"
            ></button>
          </div>

          <p class="mt-3 text-center font-body text-xs text-slate-500">
            {{ focusIdx + 1 }} / {{ media.length }}
          </p>
        </div>

        <Transition name="viewer-pop">
          <div
            v-if="activeIdx !== null"
            class="fixed inset-0 z-[240] hidden items-center justify-center bg-black/88 px-6 py-8 backdrop-blur-sm md:flex"
            @click.self="closeViewer"
          >
            <button
              type="button"
              class="absolute right-6 top-6 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
              @click="closeViewer"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <button
              v-if="media.length > 1"
              type="button"
              class="lightbox-arrow left-6"
              @click.stop="prev"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <div class="w-full max-w-[min(84vw,1280px)]" @click.stop>
              <div class="relative overflow-hidden rounded-sm bg-black shadow-[0_30px_110px_rgba(0,0,0,0.55)]">
                <img
                  v-if="activeItem.type === 'image'"
                  :src="activeItem.src"
                  :alt="activeItem.title"
                  class="max-h-[78vh] w-full object-contain"
                />
                <video
                  v-else
                  ref="playerDesktop"
                  :src="activeItem.src"
                  class="max-h-[78vh] w-full object-contain"
                  controls
                  autoplay
                  playsinline
                  @ended="closeViewer"
                ></video>
              </div>
            </div>

            <button
              v-if="media.length > 1"
              type="button"
              class="lightbox-arrow right-6"
              @click.stop="next"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </Transition>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { OSS_ESPORTS, esportsMedia as fallbackEsportsMedia } from '../config/oss'
import { lockPageScroll, unlockPageScroll } from '../composables/usePageScrollLock'

const props = defineProps({ show: Boolean })
defineEmits(['close'])

const modalEl      = ref(null)
const playerMobile = ref(null)
const playerDesktop= ref(null)
const activeIdx    = ref(null)
const focusIdx     = ref(0)
const media        = ref(fallbackEsportsMedia)
const loading      = ref(false)
const error        = ref('')
const loadedOnce   = ref(false)

const activeItem = computed(() => activeIdx.value !== null ? media.value[activeIdx.value] : null)
const visibleCarouselMedia = computed(() =>
  media.value
    .map((item, index) => ({ item, index, offset: carouselOffset(index) }))
    .filter((entry) => Math.abs(entry.offset) <= 2),
)

const encodePath = (value) =>
  String(value || '')
    .replace(/\\/g, '/')
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/')

const resolveMediaSrc = (item) => {
  if (typeof item?.src === 'string' && /^https?:\/\//i.test(item.src)) return item.src
  const relativePath = item?.relativePath || item?.src || item?.fileName
  const encoded = encodePath(relativePath)
  return encoded ? `${OSS_ESPORTS}/${encoded}` : ''
}

const imageExtensions = /\.(jpe?g|png|webp)(\?|$)/i

const imagePreviewUrl = (src, width = 900) => {
  if (!imageExtensions.test(src)) return src
  const separator = src.includes('?') ? '&' : '?'
  return `${src}${separator}x-oss-process=image/resize,w_${width}/quality,q_82`
}

function previewSrc(item, width = 900) {
  if (!item?.src) return ''
  return item.thumbSrc || (item.type === 'image' ? imagePreviewUrl(item.src, width) : item.src)
}

const normalizeMediaItem = (item, index) => {
  const src = resolveMediaSrc(item)
  if (!src) return null

  const type = item?.type === 'video' ? 'video' : 'image'
  const orientation = item?.orientation
  const thumbSrc = type === 'image' ? imagePreviewUrl(src, 900) : src
  return {
    src,
    thumbSrc,
    type,
    title: item?.title || item?.fileName || `战队影像 ${index + 1}`,
    desc: item?.desc || '',
    wide: Boolean(item?.wide) || orientation === 'landscape',
    tall: Boolean(item?.tall) || orientation === 'portrait',
  }
}

async function loadMedia(force = false) {
  if (loading.value || (loadedOnce.value && !force)) return
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(`${OSS_ESPORTS}/manifest.json`, {
      headers: { Accept: 'application/json' },
      cache: 'no-cache',
    })
    if (!response.ok) throw new Error(`manifest request failed: ${response.status}`)

    const manifest = await response.json()
    const items = Array.isArray(manifest) ? manifest : manifest?.media
    media.value = Array.isArray(items)
      ? items.map(normalizeMediaItem).filter(Boolean)
      : fallbackEsportsMedia
    if (focusIdx.value >= media.value.length) focusIdx.value = 0
    loadedOnce.value = true
  } catch {
    media.value = fallbackEsportsMedia
    if (focusIdx.value >= media.value.length) focusIdx.value = 0
    loadedOnce.value = fallbackEsportsMedia.length > 0
    if (fallbackEsportsMedia.length === 0) {
      error.value = '战队影像库加载失败，请稍后重试。'
    }
  } finally {
    loading.value = false
  }
}

function wrapIndex(index) {
  const length = media.value.length
  if (length === 0) return 0
  return (index + length) % length
}

function carouselOffset(index) {
  const length = media.value.length
  if (length <= 1) return 0
  let offset = index - focusIdx.value
  if (offset > length / 2) offset -= length
  if (offset < -length / 2) offset += length
  return offset
}

function carouselStyle(index) {
  const offset = carouselOffset(index)
  const distance = Math.abs(offset)
  const hidden = distance > 2
  const x = offset * 280
  const y = distance * 18
  const z = -distance * 150
  const rotate = offset * -24
  const scale = Math.max(0.72, 1 - distance * 0.13)

  return {
    opacity: hidden ? 0 : Math.max(0.32, 1 - distance * 0.27),
    pointerEvents: hidden ? 'none' : 'auto',
    zIndex: String(30 - distance),
    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotate}deg) scale(${scale})`,
  }
}

function focus(index) {
  stopCurrent()
  activeIdx.value = null
  focusIdx.value = wrapIndex(index)
}

function focusPrev() { focus(focusIdx.value - 1) }
function focusNext() { focus(focusIdx.value + 1) }

function handleCarouselClick(index) {
  if (index === focusIdx.value) {
    open(index)
    return
  }
  focus(index)
}

function open(i) {
  stopCurrent()
  activeIdx.value = wrapIndex(i)
  focusIdx.value = activeIdx.value
  nextTick(() => {
    if (window.innerWidth < 768) {
      playerMobile.value?.play()
      modalEl.value?.querySelector('.overflow-y-auto')?.scrollTo(0, 0)
    } else {
      playerDesktop.value?.play()
    }
  })
}

function stopCurrent() {
  playerMobile.value?.pause()
  playerDesktop.value?.pause()
}

function closeViewer() {
  stopCurrent()
  activeIdx.value = null
}

function prev() {
  if (activeIdx.value === null) {
    focusPrev()
    return
  }
  open(activeIdx.value - 1)
}

function next() {
  if (activeIdx.value === null) {
    focusNext()
    return
  }
  open(activeIdx.value + 1)
}

watch(() => props.show, (v) => {
  if (v) {
    lockPageScroll()
    nextTick(() => modalEl.value?.focus())
    void loadMedia(true)
  } else {
    unlockPageScroll()
    closeViewer()
  }
})

onBeforeUnmount(() => {
  unlockPageScroll()
  closeViewer()
})
</script>

<style scoped>
.gallery-modal-enter-active, .gallery-modal-leave-active { transition: opacity 0.25s ease; }
.gallery-modal-enter-from, .gallery-modal-leave-to { opacity: 0; }

.player-drop-enter-active, .player-drop-leave-active { transition: max-height 0.3s ease, opacity 0.3s ease; }
.player-drop-enter-from { max-height: 0; opacity: 0; }
.player-drop-leave-to   { max-height: 0; opacity: 0; }

.viewer-pop-enter-active,
.viewer-pop-leave-active {
  transition: opacity 0.22s ease;
}

.viewer-pop-enter-from,
.viewer-pop-leave-to {
  opacity: 0;
}

.carousel-stage {
  position: relative;
  width: min(72vw, 1040px);
  height: min(62vh, 620px);
  min-height: 420px;
  perspective: 1400px;
  transform-style: preserve-3d;
}

.carousel-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(42vw, 560px);
  height: min(56vh, 540px);
  min-width: 360px;
  min-height: 360px;
  overflow: hidden;
  border-radius: 4px;
  background: #030912;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.48);
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.28s ease,
    box-shadow 0.28s ease;
  will-change: transform, opacity;
}

.carousel-card.is-center {
  box-shadow:
    0 34px 110px rgba(0, 0, 0, 0.58),
    0 0 42px rgba(26, 111, 255, 0.24);
  cursor: zoom-in;
}

.carousel-card:not(.is-center) {
  cursor: pointer;
}

.carousel-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(2, 8, 16, 0.52), rgba(2, 8, 16, 0.18));
  transition: opacity 0.28s ease;
}

.carousel-card.is-center .carousel-shade {
  opacity: 0;
}

.carousel-center-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  width: 54px;
  height: 54px;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  background: rgba(0, 0, 0, 0.26);
  color: white;
  backdrop-filter: blur(10px);
}

.carousel-arrow,
.lightbox-arrow {
  position: absolute;
  top: 50%;
  z-index: 40;
  display: flex;
  width: 44px;
  height: 44px;
  transform: translateY(-50%);
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(26, 111, 255, 0.32);
  border-radius: 999px;
  background: rgba(3, 9, 18, 0.68);
  color: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(10px);
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.carousel-arrow:hover,
.lightbox-arrow:hover {
  border-color: rgba(26, 111, 255, 0.72);
  background: rgba(26, 111, 255, 0.18);
  color: white;
}
</style>
