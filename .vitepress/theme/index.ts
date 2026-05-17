import DefaultTheme from 'vitepress/theme'
import AnimateLayout from './AnimateLayout.vue'
import RagChat from './components/RagChat.vue'

export default {
  extends: DefaultTheme,    
  Layout: AnimateLayout,
  enhanceApp({ app }: { app: any }) {
    app.component('RagChat', RagChat)
  }  
}
