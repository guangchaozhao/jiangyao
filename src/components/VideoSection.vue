<template>
  <section class="relative py-20 bg-[#030810] overflow-hidden">
    <!-- Top/bottom accent lines -->
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber/40 to-transparent"></div>
    <div class="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"></div>

    <div class="max-w-5xl mx-auto px-6">
      <div class="text-center mb-10 slide-up">
        <span class="section-tag font-esports text-[11px]">OFFICIAL FILM</span>
        <h2 class="font-esports font-bold text-3xl md:text-4xl text-white mt-4">
          星辰园区<span class="gradient-text">宣传片</span>
        </h2>
      </div>

      <!-- Video container -->
      <div class="slide-up delay-100 relative group cursor-pointer rounded-sm overflow-hidden
                  border border-cyber/20 hover:border-cyber/50 transition-all duration-300
                  shadow-[0_0_60px_rgba(0,212,255,0.08)] hover:shadow-[0_0_80px_rgba(0,212,255,0.2)]"
        @click="openModal">

        <!-- Video thumbnail (first frame) -->
        <video
          ref="thumbVideo"
          :src="videoSrc"
          class="w-full aspect-video object-cover"
          muted
          preload="metadata"
        ></video>

        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-[#030810]/60 group-hover:bg-[#030810]/40 transition-colors duration-300"></div>

        <!-- Scanlines on thumbnail -->
        <div class="absolute inset-0 pointer-events-none"
          style="background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)">
        </div>

        <!-- HUD corners -->
        <div class="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyber/70"></div>
        <div class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyber/70"></div>
        <div class="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyber/70"></div>
        <div class="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyber/70"></div>

        <!-- Play button -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="relative">
            <!-- Outer ring -->
            <div class="w-20 h-20 rounded-full border-2 border-cyber/50 group-hover:border-cyber
                        group-hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]
                        transition-all duration-300 flex items-center justify-center">
              <!-- Inner glow -->
              <div class="w-14 h-14 rounded-full bg-cyber/20 group-hover:bg-cyber/30 transition-colors duration-300
                          flex items-center justify-center">
                <svg class="w-7 h-7 text-cyber ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <!-- Ping animation -->
            <div class="absolute inset-0 rounded-full border border-cyber/30 animate-ping opacity-40"></div>
          </div>
        </div>

        <!-- Bottom info bar -->
        <div class="absolute bottom-0 inset-x-0 px-6 py-3 bg-gradient-to-t from-[#030810]/80 to-transparent
                    flex items-center justify-between">
          <span class="text-cyber text-xs font-esports tracking-widest">STARS ESPORTS · INDUSTRIAL PARK</span>
          <span class="text-slate-400 text-xs font-body">点击播放</span>
        </div>
      </div>
    </div>

    <!-- Modal player -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="closeModal">
          <div class="relative w-full max-w-5xl mx-4">
            <!-- Close button -->
            <button
              class="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-body text-sm"
              @click="closeModal">
              <span>关闭</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- HUD frame -->
            <div class="relative border border-cyber/30 rounded-sm overflow-hidden
                        shadow-[0_0_80px_rgba(0,212,255,0.2)]">
              <div class="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyber to-transparent"></div>
              <video
                ref="modalVideo"
                :src="videoSrc"
                class="w-full aspect-video"
                controls
                autoplay
              ></video>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import videoFile from '../picture/yuanqu.mp4'

const videoSrc = videoFile
const showModal = ref(false)
const thumbVideo = ref(null)
const modalVideo = ref(null)

function openModal() {
  showModal.value = true
  nextTick(() => {
    if (modalVideo.value) modalVideo.value.play()
  })
}

function closeModal() {
  if (modalVideo.value) {
    modalVideo.value.pause()
    modalVideo.value.currentTime = 0
  }
  showModal.value = false
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
