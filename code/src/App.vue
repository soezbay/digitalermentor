<template>
  <ion-app>
    <ion-menu side="end" content-id="main-content">
      <ion-content class="ion-padding">
        <ion-toolbar>
          <ion-menu-toggle>
            <ion-icon class="ion-float-right" :src = "close" id="close-button"></ion-icon>
          </ion-menu-toggle>
        </ion-toolbar>
        <ion-list>            
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
      </ion-content>
    </ion-menu>
    <ion-page>
      <ion-content class="ion-padding"> Tap the button in the toolbar to open the menu. </ion-content>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-page>
  </ion-app>
</template>


<script setup>
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonNav,
} from '@ionic/vue';
import { ref } from 'vue';
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  toggle,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  close,
} from 'ionicons/icons';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Dashbord',
    url: '/menu/dashboard',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Modulübersicht',
    url: '/menu/moduluebersicht',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: 'Studienverlauf',
    url: '/menu/studienverlauf',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'Studienziele',
    url: '/menu/studienziele',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: 'Einstellungen',
    url: '/menu/einstellungen',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
];


const path = window.location.pathname.split('menu/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>

<style scoped>
ion-menu {
  --min-width: 100%;
}

ion-menu ion-content {
  --background: var(--ion-color-primary);
}

ion-menu ion-toolbar {
  --background: none;
  padding:0;
}

#close-button {
  margin-right: auto;
  margin-top: 0px;
  font-size: xx-large; 
  font: bold;
}

ion-menu ion-item {
  --background: var(--ion-color-primary);
  text-align: center;
  padding: 10px;
  font-size: x-large;
  color: var(--ion-color-light);
  font: bold; 
}

ion-menu ion-item.selected {
  text-decoration: underline;
}

ion-menu ion-list {
  background: var(--ion-color-primary);
}
</style>