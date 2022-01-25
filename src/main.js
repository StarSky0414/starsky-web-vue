import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/icon/iconfont.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// import VueCookies from 'vue-cookies'
const app = createApp(App)

// app.use(VueCookies)
app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(ElementPlus,locale)
app.mount('#app')
