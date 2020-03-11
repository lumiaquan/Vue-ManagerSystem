import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../App'
import AddContainer from "../components/AddContainer.vue"
import SearchContainer from "../components/SearchContainer.vue"
import ChargeContainer from "../components/ChargeContainer.vue"
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/add'},
  {
    path: '/add',
    component: AddContainer
  },
  {
    path: '/charge',
    component: ChargeContainer
  },
  {
    path: '/search',
    component: SearchContainer
  }
]

const router = new VueRouter({
  routes
})

export default router
