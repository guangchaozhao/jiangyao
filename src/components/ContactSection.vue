<template>
  <section id="contact" class="relative py-28 bg-[#060D1F] overflow-hidden">
    <div class="absolute inset-0 hex-bg opacity-30 pointer-events-none"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                bg-electric/5 blur-[100px] pointer-events-none rounded-full"></div>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-14 slide-up">
        <span class="section-tag font-esports text-[11px]">CONTACT · 合作洽谈</span>
        <h2 class="reveal-clip font-display font-bold text-4xl md:text-5xl text-white mt-4">
          欢迎共同<span class="gradient-text">开创未来</span>
        </h2>
        <p class="text-slate-400 font-body mt-3 max-w-xl mx-auto text-sm">
          无论是战略合作、资源对接还是入驻洽谈，我们期待与您深入沟通
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-10">

        <!-- Left: contact info -->
        <div class="lg:col-span-2 space-y-6 slide-left">
          <div v-for="info in contactInfos" :key="info.label"
            class="glass-card rounded-xl p-5 flex items-start gap-4 neon-hover">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              :style="{ background: info.color + '18', border: `1px solid ${info.color}30` }">
              <component :is="info.icon" class="w-5 h-5" :style="{ color: info.color }" />
            </div>
            <div>
              <div class="text-slate-400 text-xs font-body mb-1">{{ info.label }}</div>
              <div class="text-white font-display font-medium text-sm">{{ info.value }}</div>
            </div>
          </div>

          <!-- CTA slogan -->
          <div class="glass-card rounded-2xl p-6 border-cyber/20">
            <div class="text-cyber font-esports text-sm tracking-wider mb-2">江曜所至，皆为星辰</div>
            <p class="text-slate-400 text-xs font-body leading-relaxed">
              我们正处于快速发展阶段，诚挚邀请各界资本、品牌、政府及产业合作伙伴加入这场改变中国电竞格局的大创举。
            </p>
          </div>
        </div>

        <!-- Right: form -->
        <div class="lg:col-span-3 slide-right">
          <div class="glass-card rounded-2xl p-8 relative">
            <!-- Top accent -->
            <div class="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyber/60 to-transparent"></div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Row 1 -->
              <div class="grid sm:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label">姓名 <span class="text-cyber">*</span></label>
                  <input v-model="form.name" type="text" placeholder="您的称呼"
                    class="form-input" required />
                </div>
                <div class="form-group">
                  <label class="form-label">联系电话 <span class="text-cyber">*</span></label>
                  <input v-model="form.phone" type="tel" placeholder="手机号码"
                    class="form-input" required />
                </div>
              </div>

              <!-- Row 2 -->
              <div class="grid sm:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label">公司/机构</label>
                  <input v-model="form.company" type="text" placeholder="所在单位（选填）"
                    class="form-input" />
                </div>
                <div class="form-group">
                  <label class="form-label">合作类型 <span class="text-cyber">*</span></label>
                  <select v-model="form.cooperationType" class="form-input" required>
                    <option value="" disabled>请选择</option>
                    <option v-for="type in cooperationTypes" :key="type" :value="type">{{ type }}</option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div class="form-group">
                <label class="form-label">留言内容 <span class="text-cyber">*</span></label>
                <textarea v-model="form.message" rows="4"
                  :placeholder="`请简要描述您的合作意向或问题，至少 ${MESSAGE_MIN_LENGTH} 个字...`"
                  class="form-input resize-none" required></textarea>
                <p class="text-[11px] text-slate-500 font-body">
                  留言内容至少 {{ MESSAGE_MIN_LENGTH }} 个字
                </p>
              </div>
              <input
                v-model="form.website"
                type="text"
                name="website"
                autocomplete="off"
                tabindex="-1"
                aria-hidden="true"
                class="honeypot-input"
              />

              <!-- Submit -->
              <button type="submit"
                :disabled="submitting || submitted"
                class="cyber-btn w-full py-3.5 font-esports font-bold text-sm rounded-full
                       transition-all duration-300 relative overflow-hidden"
                :class="submitted
                  ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                  : 'bg-gradient-to-r from-electric to-cyber text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]'">
                <span v-if="submitted" class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  合作申请已提交，我们会尽快联系您
                </span>
                <span v-else-if="submitting">发送中...</span>
                <span v-else>立即提交洽谈申请 →</span>
              </button>
              <p v-if="error" class="text-red-400 text-xs text-center font-body mt-2">
                {{ error }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, h } from 'vue'

const COOPERATION_LEADS_ENDPOINT = 'https://doudai.cc/api/cooperation-leads'
const MESSAGE_MIN_LENGTH = 5
const cooperationTypes = ['资本投资', '品牌赞助', '企业入驻', '赛事合作', '媒体合作', '其他']
const createEmptyForm = () => ({
  name: '',
  phone: '',
  company: '',
  cooperationType: '',
  message: '',
  website: '',
})

const form = ref(createEmptyForm())
const submitting = ref(false)
const submitted = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  const message = form.value.message.trim()

  if (message.length < MESSAGE_MIN_LENGTH) {
    error.value = `留言内容至少填写 ${MESSAGE_MIN_LENGTH} 个字`
    return
  }

  submitting.value = true
  try {
    const res = await fetch(COOPERATION_LEADS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.value.name.trim(),
        phone: form.value.phone.trim(),
        company: form.value.company.trim(),
        cooperationType: form.value.cooperationType,
        message,
        pageUrl: window.location.href,
        sourceSite: 'jiangyao.cc',
        website: form.value.website.trim(),
      }),
    })

    const data = await res.json().catch(() => ({}))
    if (data?.success === true) {
      submitted.value = true
      form.value = createEmptyForm()
      setTimeout(() => { submitted.value = false }, 6000)
    } else {
      error.value = data?.error || '提交失败，请稍后重试或直接发送邮件联系我们'
    }
  } catch {
    error.value = '提交失败，请稍后重试或直接发送邮件联系我们'
  } finally {
    submitting.value = false
  }
}

// SVG icon components
const LocationIcon = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5',
    d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' })
])}
const MailIcon = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5',
    d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
])}
const PhoneIcon = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5',
    d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' })
])}

const contactInfos = [
  { label: '总部筹建地址', value: '广东省中山市港口镇', icon: LocationIcon, color: '#00D4FF' },
  { label: '商务合作邮箱', value: 'business@starsesports.cn', icon: MailIcon, color: '#1A6FFF' },
  { label: '招商热线', value: '400-XXX-XXXX', icon: PhoneIcon, color: '#A855F7' },
]
</script>

<style scoped>
.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
}

.form-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(0,212,255,0.15);
  border-radius: 10px;
  padding: 11px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #E2E8F0;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  appearance: none;
}
.form-input::placeholder { color: #475569; }
.form-input:focus {
  border-color: rgba(0,212,255,0.5);
  background: rgba(0,212,255,0.04);
  box-shadow: 0 0 0 2px rgba(0,212,255,0.08);
}
select.form-input option {
  background: #0A1628;
  color: #E2E8F0;
}

.honeypot-input {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>
