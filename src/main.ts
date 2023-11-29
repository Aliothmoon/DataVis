import {createApp} from 'vue'
import './style.css'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from "@arco-design/web-vue";
import Pinia from "@/store/index.js";
import App from '@/App.vue'

createApp(App)
    .use(ArcoVue)
    .use(Pinia)
    .mount('#app')
