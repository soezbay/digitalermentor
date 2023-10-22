import { createRouter, createWebHistory } from '@ionic/vue-router';
import Dashboard from '../views/Dashboard.vue';
import Moduluebersicht from '../views/Moduluebersicht.vue';
import Termine from '../routerpages/Termine.vue';
import Studienverlauf from '../views/Studienverlauf.vue';
import Profil from '../profile/Profil.vue';
import Einstellungen from '../views/Einstellungen.vue';

//routes muss immer angepasst werden wenn eine neue Seite programmiert wird, die Seite wird dann hier hinzugefügt

const routes = [
  {
    path: '',
    redirect: '/menu/dashboard',
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
    path: '/menu/modulbeschreibung',
    component: () => import ('../views/Modulbeschreibung.vue')
  },
  {
    path: '/menu/modulbeschreibung/:url_kuerzel',
    component: () => import ('../views/Modulbeschreibung.vue')
  },
  //---
{
    path: '/menu/bewertungen',
  component: () => import ('../views/Bewertungen.vue')
},
{
  path: '/menu/bewertungen/:url_kuerzel',
  component: () => import ('../views/Bewertungen.vue')
},
  //---
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
  {
    path: '/studienverlauf',
    component: Studienverlauf
  },
  {
    path: '/menu/studienverlauf',
    component: Studienverlauf
  },
  {
    path: '/menu/studienziele',
    component: () => import('../goals/Goals.vue')
  },
  {
    path: '/menu/studienziele/deleted',
    component: () => import('../goals/deletedGoals.vue')
  },
  {
    path: '/menu/profil',
    component: Profil
  },
  {
    path: '/menu/profil/changeProfile',
    component: () => import('../profile/changeProfile.vue')
  },
  {
    path: '/menu/einstellungen',
    component: Einstellungen
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router