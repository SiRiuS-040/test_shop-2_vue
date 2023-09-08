import { createRouter, createWebHashHistory  } from 'vue-router'
import ViewHome from '../views/ViewHome.vue'

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewHome
    },
  ]
};

const router = createRouter(routerOptions)

export default router
