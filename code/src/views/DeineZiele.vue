<template>
    <ion-page>
      <!-- Header mit Titel -->
      <ion-header>
        <ion-toolbar color="success">
          <ion-title class="ion-text-center">Deine Ziele</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <!-- Inhalt der Seite -->
      <ion-content>
        <!-- Aktuelles und nicht gewähltes Semester -->
        <div class="semester-labels">
          <ion-label>{{ aktuellesSemester }}</ion-label>
          <ion-label>{{ nichtGewaehltesSemester }}</ion-label>
        </div>
  
        <!-- Große leere Block-Kästen für Drag & Drop -->
        <div class="drag-drop-containers">
          <ion-card @dragover="allowDrop" @drop="onDrop" class="drag-drop-box">
            <!-- Hier können Sie Platzhaltertext oder UI hinzufügen -->
          </ion-card>
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
            <ion-card
              v-for="(fach, fachIndex) in semester.faecher"
              :key="fachIndex"
              @dragstart="onDragStart(fach)"
              draggable="true"
              class="drag-item"
              :class="fach.status"
            >
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
  export default {
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
    },
  };
  </script>
  
  <style scoped>
  /* Stile für die Ziele-Seite */
  .semester-labels {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  
  .drag-drop-containers {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  
  .drag-drop-box {
    width: 45%;
    padding: 20px;
    border: 2px dashed #ccc;
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