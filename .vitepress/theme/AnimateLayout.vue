<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { onMounted, ref } from 'vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

const canvasRef = ref(null)
let particles = []

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = Math.random() * 4 + 4 
    this.speedX = Math.random() * 1.2 - 0.6
    this.speedY = Math.random() * 1.2 - 0.6
    this.opacity = 1
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.opacity -= 0.009 
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity * 0.05})`
    ctx.strokeStyle = `rgba(34, 211, 238, ${this.opacity})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.size, this.size)
    ctx.fill()
    ctx.stroke()
  }
}

const handleMouseMove = (e) => {
  for (let i = 0; i < 2; i++) {
    particles.push(new Particle(e.clientX, e.clientY))
  }
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw(ctx)
    if (particles[i].opacity <= 0) { particles.splice(i, 1); i-- }
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  const canvas = canvasRef.value
  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', handleMouseMove)
  resize(); animate()
})
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
  <Layout>
    <template #doc-before v-if="!frontmatter.layout">
      <div class="breadcrumb-custom">
        Цифровая стройка / {{ frontmatter.title || 'Документация' }}
      </div>
    </template>
  </Layout>
</template>

<style>
.particle-canvas {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 9999;
}

:root {
  --vp-c-bg: #050810 !important;
  --vp-c-brand-1: #22D3EE !important;
  --vp-nav-bg-color: #050810 !important;
}

/* --- НАВИГАЦИЯ (БЕЗ ИЗМЕНЕНИЙ) --- */
.VPNav {
  background-color: #050810 !important;
}

.VPSidebar {
  background-color: #050810 !important;
  border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
}

@keyframes sidebarFadeIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.VPSidebarItem {
  animation: sidebarFadeIn 0.5s ease forwards;
}

.VPSidebarItem.level-0 .text {
  color: #FFFFFF !important;
  font-weight: 800 !important;
  font-size: 11px !important;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  /* ТВОЙ ФИКС ОТСТУПОВ (НЕ ТРОГАЮ) */
  padding-top: 0 !important; 
  margin-top: 0 !important;
  padding-bottom: 8px !important;
}

/* Ссылки с анимацией Hover */
.VPSidebarItem .link {
  color: #CBD5E1 !important;
  padding: 8px 24px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  position: relative;
}

.VPSidebarItem .link:hover {
  color: #FFFFFF !important;
  background-color: rgba(34, 211, 238, 0.04) !important;
  padding-left: 30px;
}

.VPSidebarItem.is-active > .item > .link {
  color: var(--vp-c-brand-1) !important;
  background-color: rgba(34, 211, 238, 0.08) !important;
  font-weight: 700 !important;
  border-left: 2px solid var(--vp-c-brand-1) !important;
  box-shadow: inset 4px 0 10px -4px rgba(34, 211, 238, 0.3);
}

/* --- ГЛАВНАЯ СТРАНИЦА (НЕ ТРОГАЮ) --- */
.VPHome {
  background: radial-gradient(circle at 50% -10%, #111827 0%, #050810 70%) !important;
}

.VPHero .name {
  color: #FFFFFF !important;
  text-shadow: 0 0 30px rgba(34, 211, 238, 0.4);
}

.VPFeature {
  background-color: #0B0F1A !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 20px !important;
  transition: all 0.3s ease !important;
}

.VPFeature:hover {
  border-color: var(--vp-c-brand-1) !important;
  transform: translateY(-5px);
}

.VPContent {
  background: radial-gradient(circle at 80% 10%, rgba(17, 24, 39, 0.5) 0%, transparent 40%) !important;
}

.vp-doc h1 {
  font-size: 3rem !important;
  line-height: 1.15 !important;
  margin-bottom: 2rem !important;
  color: #FFFFFF !important;
  font-weight: 800 !important;
}

.vp-doc h2 {
  color: var(--vp-c-brand-1) !important;
  line-height: 1.3 !important;
}

.breadcrumb-custom {
  font-size: 11px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 24px;
}
</style>