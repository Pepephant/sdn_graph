import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import Vuex from 'vuex'
import '@/assets/css/common.css'

const app = createApp(App);
app.use(router);
app.use(Vuex);
app.mount('#app');

import store from '@/store/store'

store.dispatch('startTimer')