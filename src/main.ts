import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import axios from './http'

const app = createApp(App)
app.config.globalProperties.$axios = axios

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')


