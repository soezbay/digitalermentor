import { createRouter, createWebHistory } from '@ionic/vue-router';


//routes muss immer angepasst werden wenn eine neue Seite programmiert wird, die Seite wird dann hier hinzugefügt

const routes = [
  {
    path: '',
    redirect: '/Dashboard'
  },
  {
    path: '/Dashboard',
    component: () => import ('../views/Dashboard.vue')
  },
  {
    path: '/menu/Dashboard',
    component: () => import ('../views/Dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
