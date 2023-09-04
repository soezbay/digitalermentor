<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu side="end" content-id="main-content" type="overlay">
        <ion-content class="ion-padding">
          <ion-list>
            <ion-list-header>Digitaler Mentor</ion-list-header>
            <hr class="solid">
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
                <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none"
                  :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                  <ion-label>{{ p.title }}</ion-label>
                </ion-item>
                <hr v-if="i === appPages.length - 3" class="solid">
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
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

const selectedIndex = ref(1);
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
    title: 'Modulbeschreibung',
    url: '/menu/modulbeschreibung',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: 'Profil',
    url: '/menu/profil',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
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
hr.solid {
  border-top: 3px solid #757e1b;
}

ion-menu ion-content ion-list-header {
  --background: var(--ion-color-primary);
  text-align: left;
  padding: 10px;
  font-size: x-large;
  color: var(--ion-color-light);
}

ion-menu {
  --min-width: 70%;
}

ion-menu ion-content {
  --background: var(--ion-color-primary);
}

ion-menu ion-list {
  padding: 5px 0;
  background: var(--ion-color-primary);

}

ion-menu ion-item {
  --background: var(--ion-color-primary);
  text-align: left;
  padding: 10px;
  font-size: larger;
  color: var(--ion-color-light);
}

ion-menu ion-item.selected {
  background-color: #6b8e23;
}
</style>