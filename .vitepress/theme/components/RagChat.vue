<template>
  <div class="rag-chat-widget">
    <button @click="toggleChat" class="chat-toggle-button" :class="{ 'is-active': isOpen }">
      <span v-if="!isOpen">💬</span>
      <span v-else>✕</span>
    </button>
    
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <h3> AI Помощник</h3>
        <p class="subtitle">Поможет вам сориентироваться в базе</p>
      </div>
      
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(msg, idx) in messages" :key="idx" 
             :class="['message', msg.role]">
          <div class="message-content">{{ msg.content }}</div>
          
          <div v-if="msg.source_urls && msg.source_urls.length" class="sources-block">
            <div class="sources-title">📚 Источники:</div>
            <ol class="sources-list">
              <li v-for="(url, uIdx) in msg.source_urls" :key="uIdx">
                <a :href="url" class="source-link" target="_self">
                  {{ formatTitleFromUrl(url) }}
                </a>
              </li>
            </ol>
          </div>
          
        </div>
        <div v-if="isLoading" class="message bot">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <input 
          v-model="currentQuestion" 
          @keyup.enter="sendMessage"
          :disabled="isLoading"
          placeholder="Спросите меня о проекте..."
        />
        <button @click="sendMessage" :disabled="isLoading">
          {{ isLoading ? '⏳' : '➤' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const API_URL = 'https://backend-progress-production.up.railway.app'

const isOpen = ref(false)
const isLoading = ref(false)
const currentQuestion = ref('')
const messages = ref([
  { 
    role: 'bot', 
    content: 'Привет! Я AI-ассистент этой базы данных о нейросетях в строительстве. Готов ответить на твои вопросы!'
  }
])
const messagesContainer = ref(null)

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Новый хелпер: вытаскивает из URL имя файла и подставляет красивое название
const formatTitleFromUrl = (url) => {
  if (typeof url !== 'string') return 'Инженерная статья';
  
  // Вытаскиваем хвостик ссылки (например, ai-construction-part6 из https://.../ai-construction-part6.html)
  const slug = url.split('/').pop().replace('.html', '');

  const titles = {
    'ai-construction-part1': 'Часть 1: Проектирование',
    'ai-construction-part2': 'Часть 2: Площадка и контроль',
    'ai-construction-part3': 'Архитектор и дизайнер',
    'ai-construction-part4': 'Инженер-проектировщик',
    'ai-construction-part5': 'Руководитель проекта',
    'ai-construction-part6': 'Инженер-сметчик / Специалист ПТО',
    'ai-construction-part7': 'Инженер по охране труда и ТБ',
    'ai-construction-part8': 'Специалист по закупкам и логистике',
    'ai-construction-part9': 'Геодезист / Оператор дронов',
    'ai-construction-part10': 'Прораб / Начальник участка',
    'ai-construction-part11': 'Инженер по качеству (Технадзор)',
    'ai-construction-part12': 'Специалист по работе с клиентами / Риелтор'
  }
  
  return titles[slug] || 'Полезный материал из базы данных';
}

const sendMessage = async () => {
  if (!currentQuestion.value.trim() || isLoading.value) return
  
  const question = currentQuestion.value
  messages.value.push({ role: 'user', content: question })
  currentQuestion.value = ''
  scrollToBottom()
  
  isLoading.value = true
  
  try {
    const response = await fetch(`${API_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question })
    })
    
    if (!response.ok) throw new Error('Ошибка сервера')
    
    const responseText = await response.text()
    const data = JSON.parse(responseText)
    
    // ТЕПЕРЬ ТУТ: сохраняем в сообщение именно массив source_urls
    messages.value.push({ 
      role: 'bot', 
      content: data.answer,
      source_urls: data.source_urls 
    })
  } catch (error) {
    console.error('Ошибка:', error)
    messages.value.push({ 
      role: 'bot', 
      content: 'Извините, произошла ошибка. Проверьте подключение к серверу.' 
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.rag-chat-widget {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 10000;
  font-family: inherit;
}

.chat-toggle-button {
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: rgba(17, 24, 39, 0.8) !important;
  border: 1px solid rgba(34, 211, 238, 0.3) !important;
  color: #FFFFFF !important;
  font-size: 24px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.chat-toggle-button:hover {
  border-color: #22D3EE !important;
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
  transform: translateY(-3px);
}

.chat-toggle-button.is-active {
  background: #22D3EE !important;
  color: #050810 !important;
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 360px;
  height: 520px;
  background: rgba(11, 15, 26, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, transparent 100%) !important;
  color: #FFFFFF !important;
  padding: 18px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}

.chat-header .subtitle {
  margin: 4px 0 0;
  font-size: 11px;
  color: #22D3EE !important;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: transparent !important;
}

.message {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.message.user {
  align-items: flex-end;
}

.message-content {
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 85%;
  font-size: 14px;
  line-height: 1.4;
}

.message.user .message-content {
  background: #22D3EE !important;
  color: #050810 !important;
  font-weight: 600;
  border-bottom-right-radius: 4px;
}

.message.bot .message-content {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #E2E8F0 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-bottom-left-radius: 4px;
}

.sources-block {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  width: 100%;
}

.sources-title {
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #E2E8F0 !important;
  margin-bottom: 6px !important;
}

.sources-list {
  margin: 0 !important;
  padding-left: 20px !important;
  list-style-type: decimal !important;
}

.sources-list li {
  margin-bottom: 6px !important;
  color: #94A3B8 !important;
}

.source-link {
  color: #38BDF8 !important;
  text-decoration: underline !important;
  font-weight: 600 !important;
  display: inline-block !important;
  cursor: pointer !important;
  transition: color 0.2s ease;
}

.source-link:hover {
  color: #7DD3FC !important;
  text-decoration: underline !important;
}

.typing-indicator {
  display: flex;
  gap: 5px;
  padding: 10px;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #22D3EE !important;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
  30% { transform: translateY(-5px); opacity: 1; }
}

.chat-input {
  padding: 15px;
  background: rgba(0, 0, 0, 0.2) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  padding: 10px 15px;
  border-radius: 12px;
  color: white !important;
  outline: none;
}

.chat-input input:focus {
  border-color: #22D3EE !important;
}

.chat-input button {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: #22D3EE !important;
  color: #050810 !important;
  font-weight: bold;
  cursor: pointer;
}
</style>