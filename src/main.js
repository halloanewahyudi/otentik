import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    '/print.css',
    // Tambahkan URL gaya lainnya jika diperlukan
  ]
};

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueHtmlToPaper,options)

app.mount('#app')
