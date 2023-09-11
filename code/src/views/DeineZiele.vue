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

    <ion-content class="ion-padding">
      <!-- Aktuelles und nicht gewähltes Semester -->
      <div style="height: 5px;"></div>
      <ion-toolbar style="height: 50px;">
        <ion-label style="padding-left: 10px;">Sommersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button color="primary"> 
            <ion-icon :icon="add" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <div class="drag-drop-containers">
        <ion-card @dragover="allowDrop" @drop="onDrop" class="drag-drop-box">
          <!-- Hier können Sie Platzhaltertext oder UI hinzufügen -->
        </ion-card>
      </div>

      <ion-toolbar style="height: 50px;">
        <ion-label style="padding-left: 10px;">Wintersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button color="primary"> 
            <ion-icon :icon="add" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      
      <div class="drag-drop-containers">
        <ion-card @dragover="allowDrop" @drop="onDrop" class="drag-drop-box">
          <!-- Hier können Sie Platzhaltertext oder UI hinzufügen -->
        </ion-card>
      </div>

      <!-- Titel "Diese Klausuren musst du noch schreiben" und grüne Linie -->
      <ion-row class="klausuren-title">
        <ion-label class="underline">Diese Klausuren musst du noch schreiben</ion-label>
      </ion-row>

      <!-- Liste der Semester und Fächer -->
      <ion-list>
        <ion-item v-for="(semester, index) in semesterList" :key="index">
          <ion-label>{{ semester.name }}</ion-label>
          <!-- Fächer als kleine runde Blöcke mit Drag & Drop -->
          <ion-card v-for="(fach, fachIndex) in semester.faecher" :key="fachIndex" @dragstart="onDragStart(fach)"
            draggable="true" class="drag-item" :class="fach.status">
            {{ fach.name }}
          </ion-card>
        </ion-item>
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
      aktuellesSemester: 'Wintersemester 2023', // Aktuelles Semester
      nichtGewaehltesSemester: 'Sommersemester 2023', // Nicht gewähltes Semester
      semesterList: [
        {
          name: '1. Semester',
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
  }
};
</script>


  
<style scoped>

ion-icon {
  border: 2px solid black;
  border-radius: 30px;
  background-color: #8C9900;
}
.drag-drop-containers {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.drag-drop-box {
  width: 45%;
  padding: 20px;
  border: 2px solid #ccc;
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
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
}

.versuch1 {
  background-color: gray;
}

.versuch2 {
  background-color: orange;
}

.versuch3 {
  background-color: red;
}
</style>