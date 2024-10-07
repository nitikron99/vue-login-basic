import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '@/components/MainPage.vue'
import LoginPage from '@/components/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  console.log('to => ', to)
  const user = JSON.parse(localStorage.getItem('authenticatorInfo'))
  if (to.name !== 'LoginPage' && !user) {
    return ({ name: 'LoginPage' })
  } else if (to.name === 'LoginPage' && user) {
    return ({ name: 'MainPage' })
  }
})

export default router