<template>
  <Teleport to="body">
    <Transition name="gallery-modal">
      <div
        v-if="show"
        ref="modalEl"
        class="fixed inset-0 z-[200] flex flex-col bg-[#020810]/97 text-white backdrop-blur-md"
        tabindex="0"
        @keydown.esc="$emit('close')"
      >
        <div class="flex-shrink-0 border-b border-cyber/15 px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between gap-4">
            <div class="flex min-w-0 items-center gap-3">
              <div class="h-6 w-1 flex-shrink-0 bg-cyber"></div>
              <div class="min-w-0">
                <h2 class="truncate font-esports text-base font-bold text-white sm:text-lg">Doud AI 公共案例库</h2>
                <p class="mt-0.5 text-xs font-body text-slate-500">
                  {{ loading ? '同步公共案例中...' : `${filteredVideos.length} / ${videos.length} 个案例` }}
                </p>
              </div>
            </div>
            <div class="flex flex-shrink-0 items-center gap-2">
              <button
                type="button"
                class="hidden rounded-sm border border-cyber/30 px-3 py-2 font-esports text-[11px] text-cyber transition hover:border-cyber hover:bg-cyber/10 disabled:cursor-not-allowed disabled:opacity-50 sm:block"
                :disabled="loading"
                @click="loadVideos(true)"
              >
                刷新
              </button>
              <button
                type="button"
                class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-cyber/30 text-slate-400 transition hover:border-cyber hover:text-white"
                @click="$emit('close')"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 border-b border-cyber/10 px-3 py-3 md:hidden">
          <div class="flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="cat in categoryTabs"
              :key="cat.id"
              type="button"
              class="shrink-0 rounded-full border px-3 py-1.5 font-body text-xs transition disabled:cursor-not-allowed disabled:opacity-40"
              :class="activeCategory === cat.id
                ? 'border-cyber bg-cyber/12 text-cyber'
                : 'border-cyber/20 text-slate-400 hover:border-cyber/50 hover:text-white'"
              :disabled="cat.id !== 'all' && cat.count === 0"
              @click="activeCategory = cat.id"
            >
              {{ cat.label }} · {{ cat.count }}
            </button>
          </div>
        </div>

        <div class="grid min-h-0 flex-1 md:grid-cols-[290px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside class="hidden min-h-0 overflow-y-auto border-r border-cyber/10 bg-[#030912] px-5 py-5 md:block">
            <div class="rounded-sm border border-cyber/15 bg-white/[0.03] p-4">
              <p class="font-esports text-xs uppercase tracking-[0.18em] text-slate-500">Library</p>
              <p class="mt-2 font-display text-3xl font-bold text-white">{{ videos.length }}</p>
              <p class="mt-2 font-body text-xs leading-5 text-slate-500">统一读取 Doud 公共 manifest，视频来自 OSS 公共案例库。</p>
            </div>

            <div class="mt-5 space-y-2">
              <button
                v-for="cat in categoryTabs"
                :key="cat.id"
                type="button"
                class="flex w-full items-center justify-between rounded-sm border px-4 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-40"
                :class="activeCategory === cat.id
                  ? 'border-cyber bg-cyber/10 text-cyber shadow-[0_0_16px_rgba(0,212,255,0.14)]'
                  : 'border-cyber/12 bg-white/[0.02] text-slate-400 hover:border-cyber/40 hover:text-white'"
                :disabled="cat.id !== 'all' && cat.count === 0"
                @click="activeCategory = cat.id"
              >
                <span class="font-body text-sm">{{ cat.label }}</span>
                <span class="font-esports text-xs">{{ cat.count }}</span>
              </button>
            </div>
          </aside>

          <main class="min-h-0 overflow-y-auto px-3 py-4 md:px-6 md:py-5" style="scrollbar-width: thin; scrollbar-color: rgba(0,212,255,0.3) transparent">
            <div v-if="loading" class="grid grid-cols-2 gap-3 md:columns-2 md:block lg:columns-3">
              <div v-for="n in 8" :key="n" class="mb-4 h-44 break-inside-avoid animate-pulse rounded-sm border border-cyber/10 bg-white/[0.04]"></div>
            </div>

            <div v-else-if="error" class="rounded-sm border border-red-400/30 bg-red-500/10 px-4 py-5 font-body text-sm text-red-200">
              {{ error }}
            </div>

            <div v-else-if="filteredVideos.length === 0" class="rounded-sm border border-cyber/15 bg-white/[0.03] px-4 py-5 font-body text-sm text-slate-400">
              当前分类暂时没有公开视频。
            </div>

            <div v-else class="columns-2 gap-3 md:columns-2 lg:columns-3 [column-gap:0.75rem]">
              <article
                v-for="video in filteredVideos"
                :key="video.id"
                class="group mb-3 break-inside-avoid overflow-hidden rounded-sm bg-[#172033] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(0,0,0,0.28)]"
                :class="activeId === video.id
                  ? 'shadow-[0_0_22px_rgba(0,212,255,0.24)]'
                  : ''"
              >
                <button
                  type="button"
                  class="relative block w-full overflow-hidden bg-black text-left"
                  :class="video.tall ? 'aspect-[9/16]' : 'aspect-[16/10]'"
                  @click="openVideo(video)"
                >
                  <img
                    v-if="video.poster && !posterFailed[video.id]"
                    :src="video.poster"
                    :alt="video.title"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    @error="markPosterFailed(video.id)"
                  />
                  <div
                    v-else
                    class="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.16),rgba(2,8,16,0.96))]"
                  >
                    <span class="font-esports text-xs text-cyber/80">DOUD AI</span>
                  </div>
                  <div class="absolute inset-0 bg-black/42 transition group-hover:bg-black/22"></div>
                  <span class="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-body text-[10px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-sm md:left-3 md:top-3">
                    {{ categoryLabel(video.category) }}
                  </span>
                  <span
                    v-if="activeId === video.id"
                    class="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyber shadow-[0_0_8px_rgba(0,212,255,0.8)]"
                  ></span>
                  <span class="absolute inset-0 flex items-center justify-center">
                    <span class="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/18 text-white transition group-hover:border-cyber group-hover:bg-cyber/25">
                      <svg class="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </span>
                  </span>
                </button>
                <div class="px-3 py-2">
                  <p class="truncate font-body text-xs font-semibold text-white">{{ video.title }}</p>
                  <p class="mt-0.5 truncate font-body text-[10px] text-slate-500">{{ video.desc || 'Doud AI 公共案例' }}</p>
                </div>
              </article>
            </div>
          </main>
        </div>

        <Transition name="player-lightbox">
          <div
            v-if="activeVideo"
            class="fixed inset-0 z-[230] flex items-center justify-center bg-black/90 px-3 py-6 backdrop-blur-sm sm:px-6"
            @click.self="closeVideoPlayer"
          >
            <button
              type="button"
              class="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
              @click="closeVideoPlayer"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <button
              v-if="filteredVideos.length > 1"
              type="button"
              class="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 sm:left-6"
              @click.stop="stepVideo(-1)"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <div class="w-full max-w-[min(92vw,1280px)]" @click.stop>
              <div class="relative overflow-hidden rounded-sm bg-black shadow-[0_30px_110px_rgba(0,0,0,0.55)]">
                <video
                  ref="playerEl"
                  :key="activeVideo.id"
                  :src="activeVideo.src"
                  :poster="activeVideo.poster"
                  class="max-h-[78vh] w-full bg-black object-contain"
                  controls
                  playsinline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  preload="auto"
                  controlslist="nodownload noremoteplayback"
                  disablepictureinpicture
                  @loadeddata="handlePlayerReady"
                  @canplay="handlePlayerReady"
                  @play="playerReady = true"
                  @error="playerError = '视频加载失败，请稍后重试。'"
                  @ended="handlePlayerEnded"
                ></video>
                <div
                  v-if="!playerReady || playerError"
                  class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/42"
                >
                  <div class="rounded-sm bg-black/58 px-4 py-2 font-body text-xs text-white/80 backdrop-blur-sm">
                    {{ playerError || '视频加载中...' }}
                  </div>
                </div>
              </div>
              <div class="mt-4 text-center">
                <p class="font-display text-sm font-bold text-white">{{ activeVideo.title }}</p>
                <p class="mt-1 font-body text-xs text-white/50">{{ activeVideo.desc || categoryLabel(activeVideo.category) }}</p>
              </div>
            </div>

            <button
              v-if="filteredVideos.length > 1"
              type="button"
              class="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 sm:right-6"
              @click.stop="stepVideo(1)"
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
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import {
  SHOWCASE_CATEGORIES,
  categoryLabel,
  fetchPublicShowcaseVideos,
} from '../lib/publicShowcase'

const props = defineProps({ show: Boolean })
defineEmits(['close'])

const modalEl = ref(null)
const playerEl = ref(null)
const videos = ref([])
const loading = ref(false)
const error = ref('')
const activeCategory = ref('all')
const activeId = ref('')
const loadedOnce = ref(false)
const playerReady = ref(false)
const playerError = ref('')
const playIntent = ref(false)
const posterFailed = ref({})

const categoryTabs = computed(() => {
  const counts = videos.value.reduce((map, video) => {
    map[video.category] = (map[video.category] || 0) + 1
    return map
  }, {})

  return [
    { id: 'all', label: categoryLabel('all'), count: videos.value.length },
    ...SHOWCASE_CATEGORIES.map((id) => ({ id, label: categoryLabel(id), count: counts[id] || 0 })),
  ]
})

const filteredVideos = computed(() => {
  if (activeCategory.value === 'all') return videos.value
  return videos.value.filter((video) => video.category === activeCategory.value)
})

const activeVideo = computed(() =>
  filteredVideos.value.find((video) => video.id === activeId.value) || null,
)

async function loadVideos(force = false) {
  if (loading.value || (loadedOnce.value && !force)) return
  loading.value = true
  error.value = ''

  try {
    videos.value = await fetchPublicShowcaseVideos()
    loadedOnce.value = true
  } catch (err) {
    error.value = '公共案例库加载失败，请稍后重试。'
  } finally {
    loading.value = false
  }
}

function stopPlayer() {
  const player = playerEl.value
  if (!player) return
  try {
    player.pause()
  } catch {}
}

function closeVideoPlayer() {
  stopPlayer()
  activeId.value = ''
  playerReady.value = false
  playerError.value = ''
  playIntent.value = false
}

function openVideo(video) {
  stopPlayer()
  playerReady.value = false
  playerError.value = ''
  playIntent.value = true
  activeId.value = video.id
  nextTick(() => {
    const player = playerEl.value
    if (!player) return
    try {
      player.currentTime = 0
      player.load()
    } catch {
      player.load?.()
    }
  })
}

async function handlePlayerReady() {
  if (playerReady.value) return
  playerReady.value = true
  if (!playIntent.value) return
  const player = playerEl.value
  if (!player) return
  try {
    await player.play()
    playIntent.value = false
  } catch {
    playIntent.value = false
  }
}

function stepVideo(direction) {
  const items = filteredVideos.value
  if (items.length === 0) return
  const currentIndex = items.findIndex((video) => video.id === activeId.value)
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + direction + items.length) % items.length
  openVideo(items[nextIndex])
}

function handlePlayerEnded() {
  if (filteredVideos.value.length > 1) {
    stepVideo(1)
    return
  }
  closeVideoPlayer()
}

function markPosterFailed(id) {
  posterFailed.value = { ...posterFailed.value, [id]: true }
}

watch(activeCategory, () => {
  closeVideoPlayer()
})

watch(() => props.show, (visible) => {
  if (visible) {
    document.body.style.overflow = 'hidden'
    nextTick(() => modalEl.value?.focus())
    void loadVideos()
  } else {
    document.body.style.overflow = ''
    closeVideoPlayer()
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  closeVideoPlayer()
})
</script>

<style scoped>
.gallery-modal-enter-active, .gallery-modal-leave-active { transition: opacity 0.25s ease; }
.gallery-modal-enter-from, .gallery-modal-leave-to { opacity: 0; }

.player-lightbox-enter-active, .player-lightbox-leave-active { transition: opacity 0.2s ease; }
.player-lightbox-enter-from, .player-lightbox-leave-to { opacity: 0; }

</style>
