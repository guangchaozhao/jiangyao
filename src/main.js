import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { magnetic } from './directives/magnetic'
import { spotlight, initSpotlight } from './directives/spotlight'

const app = createApp(App)
app.directive('magnetic', magnetic)
app.directive('spotlight', spotlight)
app.mount('#app')

initSpotlight()
