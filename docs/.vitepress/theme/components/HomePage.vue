<script lang="ts" setup>
import { withBase } from 'vitepress'
import { ref } from 'vue'
import { componentHref, getComponentItems } from '../../lib/registry'
import ComponentGlyph from './ComponentGlyph.vue'

const INIT_COMMAND = 'pnpm dlx @weme-ui/weme-ui init'
const items = getComponentItems()
const copied = ref(false)

async function copyCommand() {
  try {
    await navigator.clipboard.writeText(INIT_COMMAND)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1400)
  }
  catch {
    copied.value = false
  }
}

const features = [
  {
    place: 'a',
    icon: 'layers',
    title: '源码在项目里',
    body: '现成的组件库改起来像拔河。Slim 把文件写进项目，你改的就是自己的代码。',
  },
  {
    place: 'b',
    icon: 'dial',
    title: 'UnoCSS',
    body: '没用 Tailwind。我觉得它更可控，定制空间也大一点。',
  },
  {
    place: 'c',
    icon: 'sliders',
    title: '约定自己定',
    body: '颜色、圆角、间距是项目里的事。组件跟着走就行，不用先拆主题。',
  },
  {
    place: 'd',
    icon: 'nodes',
    title: 'Reka UI',
    body: '焦点、键盘这些已经有人做好了。看起来怎样你定，我没再包一层主题。',
  },
  {
    place: 'e',
    icon: 'mark',
    title: '还早',
    body: '我尽力了，但现在别用在生产上。先翻翻源码，有哪里不对告诉我。',
  },
] as const
</script>

<template>
  <div class="home">
    <div class="home-shell">
      <header class="hero">
        <h1>Weme UI</h1>
        <p class="lede">
          一套 Vue 组件，用 Reka UI 和 UnoCSS 做的。源码会写进你的项目。
        </p>
        <div class="actions">
          <a class="cta" :href="withBase('/get-started/')">开始使用</a>
          <a class="ghost" :href="withBase('/components/')">浏览组件</a>
        </div>
        <div class="command">
          <div class="command-bar">
            <code>{{ INIT_COMMAND }}</code>
            <button type="button" class="copy" @click="copyCommand">
              {{ copied ? '已复制' : '复制' }}
            </button>
          </div>
        </div>
      </header>

      <section class="features" aria-labelledby="features-title">
        <header class="features-head">
          <h2 id="features-title">
            组件为什么要进项目
          </h2>
          <p>
            改现成的库太累了。文件在你这儿，事情会简单一点。
          </p>
        </header>
        <div class="feature-grid">
          <article
            v-for="(feature, index) in features"
            :key="feature.title"
            class="feature"
            :data-place="feature.place"
            :style="{ '--i': String(index) }"
          >
            <span class="feature-mesh" aria-hidden="true" />
            <svg
              class="feature-icon"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <g
                v-if="feature.icon === 'layers'"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linejoin="round"
              >
                <rect x="6" y="10" width="15" height="15" rx="3" />
                <rect x="11" y="6" width="15" height="15" rx="3" />
              </g>
              <g
                v-else-if="feature.icon === 'dial'"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              >
                <circle cx="16" cy="16" r="10" />
                <circle cx="16" cy="16" r="2.2" fill="currentColor" stroke="none" />
                <path d="M16 16 22 11" />
              </g>
              <g
                v-else-if="feature.icon === 'sliders'"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              >
                <path d="M10 8v16M16 8v16M22 8v16" />
                <circle cx="10" cy="14" r="2.3" fill="currentColor" stroke="none" />
                <circle cx="16" cy="20" r="2.3" fill="currentColor" stroke="none" />
                <circle cx="22" cy="12" r="2.3" fill="currentColor" stroke="none" />
              </g>
              <g
                v-else-if="feature.icon === 'nodes'"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              >
                <circle cx="8.5" cy="10" r="3" />
                <circle cx="23.5" cy="10" r="3" />
                <circle cx="16" cy="22.5" r="3" />
                <path d="m11 12.2 3.2 7.2M21 12.2l-3.2 7.2" />
              </g>
              <g
                v-else
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              >
                <circle cx="16" cy="16" r="10" />
                <path d="M16 11v6" />
                <circle cx="16" cy="21.2" r="1.15" fill="currentColor" stroke="none" />
              </g>
            </svg>
            <div class="feature-copy">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.body }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="specimens" aria-labelledby="specimens-title">
        <header class="specimens-head">
          <h2 id="specimens-title">
            {{ items.length }} 个组件
          </h2>
          <a class="ghost" :href="withBase('/components/')">查看全部</a>
        </header>
        <div class="specimen-grid">
          <a
            v-for="(item, index) in items"
            :key="item.name"
            class="specimen"
            :href="withBase(componentHref(item.name))"
            :style="{ '--i': String(index) }"
          >
            <div class="specimen-well">
              <ComponentGlyph :name="item.name" />
            </div>
            <span>{{ item.title }}</span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: calc(100vh - var(--vp-nav-height, 4rem));
  padding: 0 0 5rem;
}

.home-shell {
  width: min(72rem, calc(100% - 2.5rem));
  margin: 0 auto;
  padding-top: 4.5rem;
}

.hero {
  max-width: 32rem;
  padding-bottom: 3.5rem;
}

.hero h1 {
  margin: 0;
  color: var(--neutral-12);
  font-size: clamp(2.15rem, 5.5vw, 3.15rem);
  font-weight: 670;
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.lede {
  margin: 1rem 0 1.6rem;
  color: var(--vp-c-text-2);
  font-size: 1.05rem;
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem 1.25rem;
  margin-bottom: 1.5rem;
}

.cta,
.ghost,
.copy {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
}

.cta {
  display: inline-flex;
  align-items: center;
  height: 2.15rem;
  padding: 0 0.95rem;
  border-radius: 999px;
  background: var(--neutral-12);
  color: var(--neutral-1);
  transition: background-color 0.18s ease;
}

.cta:hover {
  background: var(--accent-11);
  color: var(--neutral-1);
}

.ghost {
  color: var(--neutral-12);
  border-bottom: 1px solid color-mix(in oklch, var(--neutral-12) 28%, transparent);
  padding-bottom: 0.12rem;
}

.ghost:hover {
  color: var(--accent-11);
  border-bottom-color: var(--accent-11);
}

.cta:focus-visible,
.ghost:focus-visible,
.copy:focus-visible,
.specimen:focus-visible {
  outline: 2px solid var(--accent-9);
  outline-offset: 3px;
}

.command {
  position: relative;
  isolation: isolate;
  max-width: 36rem;
  overflow: visible;
}

.command::after {
  content: '';
  position: absolute;
  z-index: -1;
  inset: -5px;
  border: 1px solid var(--docs-ring-line);
  border-radius: calc(var(--docs-radius) + 5px);
  pointer-events: none;
}

.command-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  padding: 0.85rem 0.95rem 0.85rem 1.1rem;
  overflow: hidden;
  border: 1px solid var(--docs-line);
  border-radius: var(--docs-radius);
  background: var(--docs-card);
  box-shadow: var(--docs-ring);
}

.command code {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: var(--neutral-12);
  font-size: 0.82rem;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy {
  flex: none;
  height: 1.75rem;
  padding: 0 0.65rem;
  border: 1px solid var(--docs-line);
  border-radius: 0.375rem;
  background: var(--neutral-3);
  color: var(--neutral-12);
  cursor: pointer;
}

.copy:hover {
  background: var(--neutral-4);
}

.features {
  margin: 0 0 4.25rem;
}

.features-head {
  max-width: 38rem;
  margin-bottom: 1.75rem;
}

.features-head h2 {
  margin: 0 0 0.7rem;
  color: var(--neutral-12);
  font-size: clamp(1.65rem, 3.2vw, 2.2rem);
  font-weight: 670;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.features-head p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.7;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.feature,
.specimen {
  position: relative;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  overflow: visible;
  border: 1px solid var(--docs-line);
  border-radius: var(--docs-radius);
  box-shadow: var(--docs-ring);
  animation: home-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--i, 0) * 40ms);
}

.feature {
  gap: 0.9rem;
  padding: 1.15rem 1.2rem 1.2rem;
  background: var(--docs-well);
}

.specimen {
  background: var(--docs-card);
}

.feature::after,
.specimen::after {
  content: '';
  position: absolute;
  z-index: -1;
  inset: -5px;
  border: 1px solid var(--docs-ring-line);
  border-radius: calc(var(--docs-radius) + 5px);
  pointer-events: none;
}

.feature-mesh {
  position: absolute;
  z-index: 0;
  inset: 1.2rem 1.2rem auto 3.5rem;
  height: 1.75rem;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    color-mix(in oklch, var(--neutral-12) 34%, transparent) 1.05px,
    transparent 1.15px
  );
  background-size: 9px 9px;
  mask-image: linear-gradient(90deg, black 6%, transparent 92%);
  -webkit-mask-image: linear-gradient(90deg, black 6%, transparent 92%);
}

.feature-icon {
  position: relative;
  z-index: 1;
  flex: none;
  width: 1.75rem;
  height: 1.75rem;
  color: var(--neutral-12);
}

.feature-copy {
  position: relative;
  z-index: 1;
  max-width: 34rem;
}

.feature-copy h3 {
  margin: 0 0 0.35rem;
  color: var(--neutral-12);
  font-size: 0.92rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.feature-copy p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.86rem;
  line-height: 1.65;
}

.specimens-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.35rem;
}

.specimens-head h2 {
  margin: 0;
  color: var(--neutral-12);
  font-size: 1.35rem;
  font-weight: 670;
}

.specimen-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.specimen {
  color: var(--neutral-12);
  text-decoration: none;
  transition: transform 0.2s ease;
}

.specimen:hover {
  transform: translateY(-2px);
}

.specimen-well {
  display: grid;
  place-items: center;
  height: 7.25rem;
  overflow: hidden;
  border-bottom: 1px solid var(--docs-line);
  border-radius: calc(var(--docs-radius) - 1px) calc(var(--docs-radius) - 1px) 0 0;
  background: var(--docs-well);
}

.specimen-well :deep(.glyph) {
  transform: scale(0.72);
  transform-origin: center;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.specimen:hover :deep(.glyph) {
  transform: scale(0.72) translateY(-3px);
}

.specimen span {
  padding: 0.7rem 0.9rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.hero > * {
  animation: home-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero > :nth-child(1) {
  animation-delay: 0ms;
}
.hero > :nth-child(2) {
  animation-delay: 70ms;
}
.hero > :nth-child(3) {
  animation-delay: 140ms;
}
.hero > :nth-child(4) {
  animation-delay: 210ms;
}

@keyframes home-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (min-width: 720px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .feature[data-place='a'],
  .feature[data-place='d'],
  .feature[data-place='e'] {
    grid-column: span 2;
  }

  .specimen-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }
}

@media (min-width: 1100px) {
  .home-shell {
    padding-top: 5.5rem;
  }

  .feature-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .feature[data-place='a'],
  .feature[data-place='d'],
  .feature[data-place='e'] {
    grid-column: span 2;
  }

  .feature[data-place='b'],
  .feature[data-place='c'] {
    grid-column: span 1;
  }

  .specimen-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero > *,
  .feature,
  .specimen,
  .specimen:hover,
  .specimen:hover :deep(.glyph),
  .specimen-well :deep(.glyph) {
    animation: none;
    transform: none;
    transition: none;
  }
}
</style>
