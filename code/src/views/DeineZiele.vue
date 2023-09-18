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
          <ion-button style="padding-right: 15px;" color="primary">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <div class="drag-drop-containers">
        <ion-card v-for="(card, index) in getSommersemesterZieleCards()" :key="index" @dragover="allowDrop" @drop="onDrop"
          class="drag-drop-box">
          <ion-card-title style="font-size: small;">{{ card.title }}</ion-card-title>
        </ion-card>
      </div>

      <div class="semesterHeader">
        <ion-label class="labelHeader">Wintersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button style="padding-right: 15px;" color="primary">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <div class="drag-drop-containers">
        <ion-card v-for="(card, index) in getWintersemesterZieleCards()" :key="index" @dragover="allowDrop" @drop="onDrop"
          class="drag-drop-box">
          <ion-card-title>{{ card.title }}</ion-card-title>
        </ion-card>
      </div>

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

      <!-- Speichern-Button -->
      <ion-button expand="full" color="success" @click="speichern">
        Speichern
      </ion-button>
    </ion-content>
  </ion-page>
</template>
  
<script>
import { add } from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonList, IonListHeader,
  IonCard,
  IonButton,
  IonRow,
  IonIcon
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
    IonIcon
  },

  name: 'Ziele',
  data() {
    return {
      SommersemsterZiele: [
        {
          cards: [
            { ziel: "OPR Bestehen" },
            { ziel: "LDS Bestehen" }
          ], // Array zum Speichern der Karten
        },
      ],

      WintersemesterZiele: [
        {
          cards: [
            { ziel: "ADS Bestehen" },
            { ziel: "INS Bestehen" }
          ], // Array zum Speichern der Karten
        },
      ],

      aktuellesSemester: 'Wintersemester 2023', // Aktuelles Semester
      nichtGewaehltesSemester: 'Sommersemester 2023', // Nicht gewähltes Semester
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
      add
    };
  },
  methods: {
    // Methode, um Drag & Drop zu erlauben
    allowDrop(event) {
      event.preventDefault();
    },
    // Methode, die beim Ziehen eines Faches aufgerufen wird
    onDragStart(fach) {
      event.dataTransfer.setData('text/plain', fach.name);
    },
    // Methode, die beim Ablegen eines Faches aufgerufen wird
    onDrop(event) {
      event.preventDefault();
      const fachName = event.dataTransfer.getData('text/plain');
      // Fügen Sie hier die Logik hinzu, um das Fach an die richtige Stelle zu verschieben
    },
    // Methode zum Speichern der Ziele
    speichern() {
      // Fügen Sie hier die Logik zum Speichern der ausgewählten Module hinzu
    },
    getSommersemesterZieleCards() {
      const ziele = this.SommersemsterZiele[0]; // Annahme: Es gibt nur ein Semester
      return ziele.cards.map((ziel, index) => ({
        title: ziel.ziel,
        index: index + 1, // Index + 1 für die Kartennummer
      }));
    },
    getWintersemesterZieleCards() {
      const ziele = this.WintersemesterZiele[0]; // Annahme: Es gibt nur ein Semester
      return ziele.cards.map((ziel, index) => ({
        title: ziel.ziel,
        index: index + 1, // Index + 1 für die Kartennummer
      }));
    },
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

ion-icon {
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

.drag-drop-box {
  width: 100%;
  height: 40px;
  padding: 20px;
  margin: 10px;
  border: 2px solid #ccc;
  border-radius: 30px;
  text-align: center;
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
</style>