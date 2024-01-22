import { createRouter, createWebHistory } from '@ionic/vue-router';
import Dashboard from '../views/Dashboard.vue';
import Moduluebersicht from '../modulesOverview/Moduluebersicht.vue';
import Termine from '../appointments/Termine.vue';
import Studienverlauf from '../views/Studienverlauf.vue';
import Profil from '../profile/Profil.vue';
import Einstellungen from '../views/Einstellungen.vue';
import Studienziele from '../goals/Goals.vue'

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
    path: '/termine',
    component: Termine
  },
  {
    path: '/menu/termine',
    component: Termine
  },
  {
    path: '/termine/:id',
    component: () => import('../appointments/TermineDetails.vue')
  },
  {
    path: '/menu/dashboard/termine/add_termin',
    component: () => import('../appointments/AddTermin.vue')
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
    component: () => import('../modulesOverview/Modulbeschreibung.vue')
  },
  {
    path: '/menu/modulbeschreibung/:url_kuerzel',
    component: () => import('../modulesOverview/Modulbeschreibung.vue')
  },
  {
    path: '/menu/modulbeschreibung/bewertungen',
    component: () => import('../modulesOverview/Modulbewertung.vue')
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
    path: '/studienziele',
    component: Studienziele
  },
  {
    path: '/menu/studienziele',
    component: Studienziele
  },
  {
    path: '/menu/studienziele/checked',
    component: () => import('../goals/checkedGoals.vue')
  },
  {
    path: '/menu/studienziele/deleted',
    component: () => import('../goals/deletedGoals.vue')
  },
  {
    path: '/profil',
    component: Profil
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