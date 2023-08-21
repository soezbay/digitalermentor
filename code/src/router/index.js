import { createRouter, createWebHistory } from '@ionic/vue-router';
import Moduluebersicht from '../views/Moduluebersicht.vue';

//routes muss immer angepasst werden wenn eine neue Seite programmiert wird, die Seite wird dann hier hinzugefügt

const routes = [
  {
    path: '',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: () => import ('../views/Dashboard.vue')
  },
  {
    path: '/menu/dashboard',
    component: () => import ('../views/Dashboard.vue')
  },
  {
    path: '/Moduluebersicht',
    component: Moduluebersicht
  },
  {
    path: '/menu/Moduluebersicht',
    component: Moduluebersicht
  },
  {
    path: '/menu/modulbeschreibung',
    component: () => import ('../views/Modulbeschreibung.vue')
  },
  {
    path: '/menu/modulbeschreibung/:url_kuerzel',
    component: () => import ('../views/Modulbeschreibung.vue')
  },
  {
    path: '/menu/ziele',
    component: () => import ('../views/Ziele.vue')
  },
  {
    path: '/ziele/:id',
    component: () => import ('../views/Ziele.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router