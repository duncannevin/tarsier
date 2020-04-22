import 'reflect-metadata'

import {Vue} from 'vue-property-decorator'
import VueMaterial from 'vue-material' // TODO: this needs to be refactored for production
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'vue-material/dist/vue-material.css'
import './styles/theme.scss'
import './styles/global.scss'
import './styles/overrides.scss'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import diConfig from './di.config'

diConfig.initialize()

Vue.use(VueMaterial)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
