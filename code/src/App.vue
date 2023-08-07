<template>
  <ion-app>
    <ion-menu side="end" content-id="main-content">
      <ion-content class="ion-padding" id="menu-content">
        <ion-toolbar id="menu-toolbar">
          <ion-menu-toggle>
            <ion-icon class="ion-float-right" id="close-button" :src = "close"></ion-icon>
          </ion-menu-toggle>
        </ion-toolbar>
        <ion-list id="menu-list">            
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }" id="menu-item">
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
      </ion-content>
    </ion-menu>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Digitaler Mentor</ion-title>
          <ion-buttons slot="end">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
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
    title: 'Outbox',
    url: '/menu/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: 'Favorites',
    url: '/menu/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'Archived',
    url: '/menu/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: 'Trash',
    url: '/menu/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: 'Spam',
    url: '/menu/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
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

ion-menu ion-header ion-toolbar{
  border: none;
  background: none;
}

#menu-toolbar {
  --background: none;
  padding:0;
}

#menu-content {
  --background: rgb(140, 153, 0);
}

#close-button {
  margin-right: auto;
  margin-top: 0px;
  font-size: xx-large; 
  font: bold;
}

#menu-header {
  --background: none;
  --border: none;
}

#menu-item {
  --background: rgb(140, 153, 0);
  text-align: center;
  padding: 10px;
  font-size: x-large;
  color: white;
  font: bold; 
}

#menu-item.selected {
  text-decoration: underline;
}

#menu-list {
  background: rgb(140, 153, 0);
}
</style>