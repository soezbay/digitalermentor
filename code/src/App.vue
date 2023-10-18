<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu side="end" content-id="main-content" type="overlay">
        <ion-content>
          <ion-list class="padding">
            <ion-list-header>Digitaler Mentor</ion-list-header>
            <hr class="solid">
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none"
                :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" :md="p.mdIcon" style="margin-right: 15px; color: antiquewhite;"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
              <hr v-if="i === appPages.length - 3" class="solid">
            </ion-menu-toggle>
          </ion-list>
          <ion-icon class="filter" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList, IonListHeader,
  IonMenu, IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import {
  desktopOutline,
  bookOutline,
  schoolOutline,
  rocketOutline,
  personOutline,
  settingsOutline
} from 'ionicons/icons';

// const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Dashbord',
    url: '/menu/dashboard',
    mdIcon: desktopOutline,
  },
  {
    title: 'Modulübersicht',
    url: '/menu/moduluebersicht',
    mdIcon: bookOutline,
  },
  {
    title: 'Studienverlauf',
    url: '/menu/studienverlauf',
    mdIcon: schoolOutline,
  },
  {
    title: 'Studienziele',
    url: '/menu/studienziele',
    mdIcon: rocketOutline,
  },
  {
    title: 'Profil',
    url: '/menu/profil',
    mdIcon: personOutline,
  },
  {
    title: 'Einstellungen',
    url: '/menu/einstellungen',
    mdIcon: settingsOutline,
  },
];

// const path = window.location.pathname.split('localhost:8100/')[1];
// if (path !== undefined) {
//   selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
// }

const route = useRoute();
const selectedIndex = ref(appPages.findIndex(page => page.url === route.path));

</script>

<style scoped>
hr.solid {
  border-top: 3px solid #757e1b;
}

.filter {
  filter: opacity(0.25);
  font-size: 275px;
  float: right;
  padding-top: 0px;
}

.padding {
  padding: 10px;
}

ion-list-header {

  --background: var(--ion-color-primary);
  text-align: left;
  padding: 5px;
  padding-left: 45px;
  font-size: x-large;
  color: var(--ion-color-light);
}

ion-menu {
  --min-width: 80%;
}

ion-menu ion-content {
  --background: var(--ion-color-primary);
}

ion-menu ion-list {
  padding: 5px 0;
  background: var(--ion-color-primary);

}

ion-menu ion-item {
  border-radius: 25px;
  --background: var(--ion-color-primary);
  text-align: left;
  margin: 5px;
  padding: 5px;
  font-size: larger;
  color: var(--ion-color-light);
}

ion-menu ion-item.selected {
  --background: #757e1b;
}
</style>