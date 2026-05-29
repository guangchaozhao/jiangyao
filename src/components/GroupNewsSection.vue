<template>
  <section id="news" class="relative overflow-hidden bg-cosmic py-28">
    <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
    <div class="absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-electric/5 blur-[90px] pointer-events-none"></div>

    <div class="relative mx-auto max-w-7xl px-6">
      <div class="mb-12 text-center slide-up">
        <span class="section-tag font-esports text-[11px]">07 / 集团新闻</span>
        <h2 class="reveal-clip mt-4 font-display text-4xl font-bold text-white md:text-5xl">
          集团<span class="gradient-text">新闻中心</span>
        </h2>
        <p class="mx-auto mt-4 max-w-2xl font-body text-sm leading-7 text-slate-400">
          同步集团公众号发布内容，集中展示集团动态、项目进展与合作资讯。
        </p>
        <div class="cyber-divider mx-auto mt-6 w-24"></div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="(category, index) in categoryCards"
          :key="category.key"
          class="glass-card neon-hover rounded-2xl p-6 slide-up"
          :class="`delay-${(index + 1) * 100}`"
        >
          <div class="mb-5 flex items-center justify-between">
            <span class="font-esports text-xs text-cyber">{{ category.code }}</span>
            <span class="h-2 w-2 rounded-full bg-cyber shadow-[0_0_10px_rgba(0,212,255,0.8)]"></span>
          </div>
          <h3 class="font-display text-xl font-bold text-white">{{ category.title }}</h3>
          <p class="mt-3 min-h-[64px] font-body text-sm leading-6 text-slate-400">{{ category.desc }}</p>
          <div class="mt-6 min-h-[76px] rounded-xl border border-dashed border-cyber/18 bg-white/[0.03] p-3">
            <div v-if="loading" class="space-y-2">
              <div class="h-4 w-5/6 animate-pulse rounded bg-white/[0.08]"></div>
              <div class="h-4 w-2/3 animate-pulse rounded bg-white/[0.05]"></div>
            </div>

            <div v-else-if="category.items.length > 0" class="space-y-2">
              <button
                v-for="article in category.items"
                :key="article.id"
                type="button"
                class="group/news-item flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-cyber/10"
                @click="openArticle(article)"
              >
                <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyber shadow-[0_0_8px_rgba(0,212,255,0.7)]"></span>
                <span class="min-w-0 flex-1">
                  <span class="line-clamp-2 font-body text-sm leading-5 text-slate-200 transition group-hover/news-item:text-electric">
                    {{ article.title }}
                  </span>
                  <span class="mt-1 block font-body text-[11px] text-slate-500">
                    {{ formatNewsDate(article.publishedAt) }} · {{ article.sourceName }}
                  </span>
                </span>
              </button>
            </div>

            <p v-else class="flex h-[52px] items-center justify-center text-center font-body text-xs text-slate-500">
              {{ error || '内容待同步' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="news-modal">
        <div
          v-if="activeArticle"
          class="fixed inset-0 z-[220] flex items-center justify-center bg-black/88 px-3 py-4 backdrop-blur-md sm:px-4 sm:py-6"
          @click.self="closeArticle"
        >
          <div class="relative max-h-[92vh] w-full max-w-[820px] overflow-hidden rounded-xl bg-[#f7f7f7] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <div class="absolute right-3 top-3 z-20">
              <button
                type="button"
                class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/5 text-slate-500 transition hover:bg-black/10 hover:text-slate-900"
                @click="closeArticle"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <article
              ref="articleScrollEl"
              data-lenis-prevent
              class="wechat-article-shell max-h-[92vh] overflow-y-auto bg-white px-5 py-8 sm:px-10 md:px-14"
            >
              <header class="mb-7">
                <h1 class="wechat-article-title">
                  {{ activeArticle.title }}
                </h1>
                <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] leading-6">
                  <span class="text-[#576b95]">{{ activeArticle.sourceName || activeArticle.categoryLabel }}</span>
                  <span class="text-[#999]">{{ formatNewsDate(activeArticle.publishedAt) }}</span>
                </div>
              </header>

              <video
                v-if="activeArticle.videoUrl && !hasInlineVideo(activeArticle)"
                class="mb-6 w-full bg-black"
                :src="activeArticle.videoUrl"
                :poster="activeArticle.videoPoster || activeArticle.cover"
                controls
                playsinline
              ></video>
              <div
                v-if="activeArticle.contentHtml"
                class="wechat-article-content"
                v-html="activeArticle.contentHtml"
              ></div>
              <p v-else class="wechat-article-content">
                {{ activeArticle.summary || '暂无正文内容。' }}
              </p>

              <footer class="mt-10 border-t border-[#e8e8e8] pt-6">
                <a
                  v-if="activeArticle.originalUrl"
                  :href="activeArticle.originalUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-[15px] text-[#576b95] transition hover:text-[#405b86]"
                >
                  阅读原文
                  <span class="ml-1">›</span>
                </a>
              </footer>
            </article>

            <button
              type="button"
              class="absolute bottom-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#111827]/88 text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition hover:bg-[#111827]"
              aria-label="回到顶部"
              @click="scrollArticleTop"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { NEWS_CATEGORIES, fetchGroupNews, formatNewsDate } from '../lib/news'

const newsItems = ref([])
const loading = ref(false)
const error = ref('')
const activeArticle = ref(null)
const articleScrollEl = ref(null)
let previousBodyOverflow = ''

const categoryCards = computed(() =>
  NEWS_CATEGORIES.map((category) => ({
    ...category,
    items: newsItems.value.filter((item) => item.category === category.key),
  })),
)

async function loadNews() {
  loading.value = true
  error.value = ''
  try {
    newsItems.value = await fetchGroupNews()
  } catch {
    newsItems.value = []
    error.value = '新闻内容暂未同步'
  } finally {
    loading.value = false
  }
}

function openArticle(item) {
  activeArticle.value = item
  nextTick(scrollArticleTop)
}

function closeArticle() {
  activeArticle.value = null
}

function scrollArticleTop() {
  articleScrollEl.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

function hasInlineVideo(article) {
  return /<video\b/i.test(article?.contentHtml || '')
}

watch(activeArticle, (article) => {
  if (article) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return
  }
  document.body.style.overflow = previousBodyOverflow
})

onMounted(loadNews)

onBeforeUnmount(() => {
  document.body.style.overflow = previousBodyOverflow
})
</script>

<style scoped>
.news-modal-enter-active,
.news-modal-leave-active {
  transition: opacity 0.22s ease;
}

.news-modal-enter-from,
.news-modal-leave-to {
  opacity: 0;
}

.wechat-article-shell {
  color: #1f2329;
}

.wechat-article-title {
  color: #1f2329;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 500;
  line-height: 1.42;
  letter-spacing: 0;
}

.wechat-article-content {
  color: #222;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 16px;
  line-height: 1.85;
  overflow-wrap: anywhere;
}

.wechat-article-content :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 18px auto;
}

.wechat-article-content :deep(p),
.wechat-article-content :deep(section) {
  max-width: 100%;
}

.wechat-article-content :deep(p) {
  margin: 0 0 15px;
}

.wechat-article-content :deep(a) {
  color: #576b95;
}

.wechat-article-content :deep(video) {
  width: 100%;
  margin: 18px 0;
  background: #000;
}

.wechat-article-content :deep(.wechat-video-block) {
  margin: 18px 0 22px;
}

.wechat-article-content :deep(.wechat-video-block video) {
  display: block;
  width: 100%;
  border-radius: 4px;
}

.wechat-article-content :deep(.wechat-video-block figcaption) {
  margin-top: 8px;
  color: #7b7b7b;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}

.wechat-article-content :deep(*) {
  max-width: 100%;
}
</style>
