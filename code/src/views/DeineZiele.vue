<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Deine Ziele</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div style="height: 20px;"></div>
      <!-- Aktuelles und nicht gewähltes Semester -->
      <div class="semesterHeader">
        <ion-label class="labelHeader">Sommersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button style="padding-right: 15px;" color="primary" @click="generateAndAddSommerZiel">
            <ion-icon class="addButton" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <ion-list class="drag-drop-containers">
        <ion-item-sliding v-for="ziel in ziele" :key="index" @dragover="allowDrop" @drop="onDrop"
          class="drag-drop-box-item">
          <ion-item color="#d2d69e" class="item-container">
            <ion-label class="card-label">
              <h2>{{ ziel.titel }}</h2>
              <p>{{ ziel.beschreibung }}</p>
            </ion-label>
          </ion-item>
          <ion-item-options>
            <ion-item-option color="danger">
              <ion-icon slot="icon-only" :icon="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <div class="semesterHeader">
        <ion-label class="labelHeader">Wintersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button style="padding-right: 15px;" color="primary" id="open-modal" expand="block">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <ion-list class="drag-drop-containers">
        <ion-item-sliding v-for="ziel in ziele" :key="index" class="drag-drop-box-item">
          <ion-item color="#d2d69e" class="item-container">
            <ion-label class="card-label">
              <h2>{{ ziel.titel }}</h2>
              <p>{{ ziel.beschreibung }}</p>
            </ion-label>
          </ion-item>
          <ion-item-options>
            <ion-item-option color="danger">
              <ion-icon slot="icon-only" :icon="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <!-- Titel "Diese Klausuren musst du noch schreiben" und grüne Linie -->
      <ion-row class="klausuren-title">
        <ion-label class="underline">Diese Klausuren musst du noch schreiben</ion-label>
      </ion-row>

      <!-- Liste der Semester und Fächer -->
      <ion-list class="ion-padding">
        <div v-for="(semester, index) in semesterList" :key="index">
          <ion-label>{{ semester.name }}</ion-label>
          <ion-item>
            <!-- Fächer als kleine runde Blöcke mit Drag & Drop -->
            <ion-card v-for="(fach, fachIndex) in semester.faecher" :key="fachIndex" @dragstart="onDragStart(fach)"
              draggable="true" class="drag-item" :class="fach.status">
              <ion-label style="color: #000000; font-weight: bolder;">{{ fach.name }}</ion-label>
            </ion-card>
          </ion-item>
          <br>
        </div>
      </ion-list>

      <ion-modal ref="modal" trigger="open-modal" :can-dismiss="canDismiss" :presenting-element="presentingElement">
        <ion-header>
          <ion-toolbar>
            <ion-title>Erstelle ein Ziel</ion-title>
            <ion-buttons slot="end">
              <ion-button>Speichern</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="floating">Zielname</ion-label>
            <ion-input v-model="zielName"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Season</ion-label>
            <ion-input v-model="semesterSeason"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Info</ion-label>
            <ion-input v-model="info"></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>
  
<script>
import { add, trash } from 'ionicons/icons';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton, IonButton,
  IonItem,
  IonLabel,
  IonList, IonListHeader,
  IonCard,
  IonRow,
  IonIcon,
  IonItemSliding, IonItemOptions, IonItemOption,
  IonModal, actionSheetController
} from '@ionic/vue';

export default {

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonButtons,
    IonMenuButton,
    IonLabel,
    IonList, IonListHeader,
    IonCard,
    IonButton,
    IonRow,
    IonIcon,
    IonItemSliding, IonItemOptions, IonItemOption,
    IonModal,
  },
  data() {
    return {
      presentingElement: undefined,
      zielName: '',
      semesterSeason: '',
      info: '',
      add, trash,
      semesterList: [
        {
          name: '1. Semester',
          faecher: [
            { name: 'Fach 1', status: 'versuch3' },
            { name: 'Fach 2', status: 'versuch2' },
            { name: 'Fach 3', status: 'versuch1' },
            { name: 'Fach 3', status: 'versuch1' },
            { name: 'Fach 3', status: 'versuch1' },

          ],
        },
        {
          name: '2. Semester',
          faecher: [
            { name: 'Fach 1', status: 'versuch3' },
            { name: 'Fach 2', status: 'versuch2' },
            { name: 'Fach 3', status: 'versuch1' },
          ],
        },
        // Weitere Semester und Fächer hier hinzufügen
      ],
    };
  },

  methods: {
    dismiss() {
      this.$refs.modal.$el.dismiss();
    },
    async canDismiss() {
      const actionSheet = await actionSheetController.create({
        header: 'Fenster schließen und kein Ziel hinzufügen?',
        buttons: [
          {
            text: 'Ja',
            role: 'confirm',
          },
          {
            text: 'Nein',
            role: 'cancel',
          },
        ],
      });
      actionSheet.present();
      const { role } = await actionSheet.onWillDismiss();
      return role === 'confirm';
    },
  },
  // mounted() {
  //   this.presentingElement = this.$refs.page.$el;
  // },

  computed: {
    ziele() {
      return this.$store.getters.ziele;
    }
  }
};
</script>


  
<style scoped>
.semesterHeader {
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  /* Platzierung für den Inhalt */
}

.labelHeader {
  padding-left: 25px;
}

.semesterHeader ion-icon {
  width: 45px;
  height: 25px;
  border-radius: 30px;
  background-color: var(--ion-color-primary);
  color: white;
}

.drag-drop-containers {
  display: block;
  justify-content: space-between;
  padding: 10px;
  padding-top: 0;
  padding-left: 20px;
  padding-right: 45px;
}

.drag-drop-box-item {
  height: 45px;
  margin: 10px;
  border-radius: 30px;
  text-align: left;
  background-color: #d2d69e;
}

.drag-drop-box-item ion-icon {
  color: white;
}

.item-container {
  background-color: #d2d69e;
}

.card-label {
  margin: 0;
  padding-left: 15px;
}

.löschenButton {
  height: 27px;
  width: 27px;
  margin-left: 8px;
  margin-top: 4px;
  border: 2px solid #ccc;
  border-radius: 20px;
}

.klausuren-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.underline {
  border-bottom: 2px solid green;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.drag-item {
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
}

.versuch1 {
  background-color: gray;
}

.versuch2 {
  background-color: sandybrown;
}

.versuch3 {
  background-color: #d32e2e;
}

ion-modal {
  --height: 35%;
  --width: 90%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: #8C9900;
  --color: white;
}
</style>