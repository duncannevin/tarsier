import {Vue} from 'vue-property-decorator'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Todo from '@/views/Todo.vue'

Vue.use(Router)

// @ts-ignore
Vue.component('router-link', Vue.options.components.RouterLink)
// @ts-ignore
Vue.component('router-view', Vue.options.components.RouterView)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo
    }
  ]
})
