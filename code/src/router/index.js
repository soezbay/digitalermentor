import { createRouter, createWebHistory } from '@ionic/vue-router';
import Dashboard from '../views/Dashboard.vue';
import Moduluebersicht from '../views/Moduluebersicht.vue';
import Ziele from '../views/Ziele.vue';
import Termine from '../routerpages/Termine.vue';

//routes muss immer angepasst werden wenn eine neue Seite programmiert wird, die Seite wird dann hier hinzugefügt

const routes = [
  {
    path: '',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/menu/dashboard',
    component: Dashboard
  },
  {
    path: '/moduluebersicht',
    component: Moduluebersicht
  },
  {
    path: '/menu/moduluebersicht',
    component: Moduluebersicht
  },
  {
    path: '/menu/ziele',
    component: Ziele
  },
  {
    path: '/ziele/:id',
    component: Ziele
  },
  {
    path: '/termine',
    component: Termine
  },
  {
    path: '/termine/:id',
    component: () => import('../routerpages/TermineDetails.vue')
  },
  {
    path: '/menu/dashboard/termine',
    component: Termine
  },
  {
    path: '/menu/dashboard/termine/add_termin',
    component: () => import('../routerpages/AddTermin.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router