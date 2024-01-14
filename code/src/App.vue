<template>
  <ion-app>
    <!--Navigation-Umbruch width in split-pane-->
    <ion-split-pane when="(min-width: 1000px)" content-id="main-content">
      <ion-menu side="end" content-id="main-content">
        <ion-content class="no-scroll">
          <ion-list class="padding">
            <ion-list-header>{{ texts.titel.digitalerMentor }}</ion-list-header>
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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { texts } from './texts.js'
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
  settingsOutline,
  calendarOutline
} from 'ionicons/icons';

// const selectedIndex = ref(0);
const appPages = [
  {
    title: texts.titel.dashboard,
    url: '/menu/dashboard',
    mdIcon: desktopOutline,
  },
  {
    title: texts.titel.termine,
    url: '/menu/termine',
    mdIcon: calendarOutline,
  },
  {
    title: texts.titel.modulhandbuch,
    url: '/menu/moduluebersicht',
    mdIcon: bookOutline,
  },
  {
    title: texts.titel.studienverlauf,
    url: '/menu/studienverlauf',
    mdIcon: schoolOutline,
  },
  {
    title: texts.titel.studienziele,
    url: '/menu/studienziele',
    mdIcon: rocketOutline,
  },
  {
    title: texts.titel.profil,
    url: '/menu/profil',
    mdIcon: personOutline,
  },
  {
    title: texts.titel.einstellungen,
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
watch(() => route.path, (newPath) => {
  selectedIndex.value = appPages.findIndex(page => page.url === newPath);
});

</script>

<style scoped>
hr.solid {
  border-top: 2.5px solid #757e1b;
  /* Breite der Trennstriche angepasst */
  max-width: 95%;
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
  padding: 10px;
  padding-left: 35px;
  font-size: x-large;
  color: var(--ion-color-light);
}

ion-menu {
  --min-width: 10%;
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
  margin: 0px;
  padding: 5px;
  font-size: larger;
  color: var(--ion-color-light);
  transition: background-color 0.3s ease;
}

ion-menu ion-item.selected {
  --background: #757e1b;
}

ion-menu ion-item ion-label {
  cursor: default;
}

ion-menu ion-item:hover {
  --background: #757e1b;
}

/* Breite der Navigation anpassen: schmaler*/
.split-pane-visible>.split-pane-side {
  min-width: 280px !important;
  max-width: 280px !important;
}

/* Navigation nicht mehr scrollbar machen, in ion-content class="no-scroll" hinzugefügt */
.no-scroll {
  --overflow: hidden;
}
</style>