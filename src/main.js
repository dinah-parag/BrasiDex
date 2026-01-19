import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // <--- Importe isso

const app = createApp(App)
app.use(router) // <--- Use isso
app.mount('#app')