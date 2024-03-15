/* eslint-disable vue/multi-word-component-names */
import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/aura-light-green/theme.css'

import App from './App.vue'
import router from './router'
import Toast from 'primevue/toast'
import Slider from 'primevue/slider'
import InputText from 'primevue/inputtext'

import 'primevue/resources/themes/lara-light-purple/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.component('Slider', Slider)
app.component('InputText', InputText)
app.component('Toast', Toast)

app.mount('#app')
