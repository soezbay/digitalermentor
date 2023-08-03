import { createRouter, createWebHistory } from '@ionic/vue-router';


//routes muss immer angepasst werden wenn eine neue Seite programmiert wird. Also Seite hinzufügen.

const routes = [
  {
    path: '',
    redirect: '/Startseite'
  },
  {
    path: '/Startseite',
    component: () => import ('../views/Startseite.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
