import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { stateSymbol, createState } from './store'

createApp(App)
  .provide(stateSymbol, createState())
  .use(router)
  .mount('#app')
