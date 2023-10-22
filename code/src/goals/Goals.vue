<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button router-link="/menu/dashboard">
            <ion-icon style="font-size: 45px;" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Deine Ziele</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div style="height: 20px; background-color: rgb(30, 30, 30)"></div>
      <!-- Aktuelles und nicht gewähltes Semester -->
      <div class="semesterHeader">
        <ion-label class="labelHeader">Sommersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button style="padding-right: 15px;" color="primary" id="open-SS-modal" expand="block">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <ion-list class="drag-drop-containers">
        <ion-reorder-group :disabled="false" @ionItemReorder="handleReorderForSS($event)">
          <ion-item-sliding v-for="goal in goals_ss" :key="goal.id" class="drag-drop-box-item">
            <ion-item color="#d2d69e" class="item-container" lines="none">
              <ion-label class="card-label">
                <h2>{{ goal.titel }}</h2>
                <p>{{ goal.info }}</p>
              </ion-label>
              <ion-label slot="end" class="card-label">
                <h5>{{ goal.date }}</h5>
              </ion-label>
              <ion-reorder slot="end" style="color: #000000; margin: 0px; padding-left: 5px;"></ion-reorder>
            </ion-item>
            <ion-item-options>
              <ion-item-option color="danger">
                <ion-icon slot="icon-only" :icon="trash" @click="deleteGoalHandler(goal.id)"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-reorder-group>
      </ion-list>

      <div class="semesterHeader">
        <ion-label class="labelHeader">Wintersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button style="padding-right: 15px;" color="primary" id="open-WS-modal" expand="block">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <ion-list class="drag-drop-containers">
        <ion-reorder-group :disabled="false" @ionItemReorder="handleReorderForWS($event)">
          <ion-item-sliding v-for="goal in goals_ws" :key="index" class="drag-drop-box-item">
            <ion-item color="#d2d69e" class="item-container" lines="none">
              <ion-label class="card-label">
                <h2>{{ goal.titel }}</h2>
                <p>{{ goal.info }}</p>
              </ion-label>
              <ion-label slot="end" class="card-label">
                <h5>{{ goal.date }}</h5>
              </ion-label>
              <ion-reorder slot="end" style="color: #000000; margin: 0px; padding-left: 5px;"></ion-reorder>
            </ion-item>
            <ion-item-options>
              <ion-item-option color="danger">
                <ion-icon slot="icon-only" :icon="trash" @click="deleteGoalHandler(goal.id)"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-reorder-group>
      </ion-list>

      <ion-item color="primary" router-link="/menu/studienziele/deleted" id="header" detail="true" lines="none">
        <ion-label slot="end">
          Gelöschte Ziele
        </ion-label>
      </ion-item>

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

      <ion-modal ref="modal_SS" trigger="open-SS-modal" :presenting-element="presentingElement">
        <ion-header>
          <ion-toolbar>
            <ion-title>Erstelle ein Ziel</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="saveGoal" :disabled="!goal_name" color="light">Speichern</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-item>
            <ion-label position="floating">Zielname</ion-label>
            <ion-input v-model="goal_name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-select ref="semesterSelect" label="Season" placeholder="Semesterseason" value="Sommersemester">
              <ion-select-option value="Sommersemester">Sommersemester</ion-select-option>
              <ion-select-option value="Wintersemester">Wintersemester</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Info</ion-label>
            <ion-input v-model="info"></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>

      <ion-modal ref="modal_WS" trigger="open-WS-modal" :presenting-element="presentingElement">
        <ion-header>
          <ion-toolbar>
            <ion-title>Erstelle ein Ziel</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="saveGoal" :disabled="!goal_name">Speichern</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="floating">Zielname</ion-label>
            <ion-input v-model="goal_name" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-select ref="semesterSelect" label="Season" placeholder="Semesterseason" value="Wintersemester">
              <ion-select-option value="Sommersemester">Sommersemester</ion-select-option>
              <ion-select-option value="Wintersemester">Wintersemester</ion-select-option>
            </ion-select>
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
  IonLabel, IonInput,
  IonList, IonListHeader,
  IonCard,
  IonRow,
  IonIcon,
  IonItemSliding, IonItemOptions, IonItemOption,
  IonModal,
  IonSelect, IonSelectOption,
  IonReorder, IonReorderGroup,
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
    IonLabel, IonInput,
    IonList, IonListHeader,
    IonCard,
    IonButton,
    IonRow,
    IonIcon,
    IonItemSliding, IonItemOptions, IonItemOption,
    IonModal,
    IonSelect, IonSelectOption,
    IonReorder, IonReorderGroup
  },
  data() {
    return {
      presentingElement: undefined,
      goal_name: '',
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
    handleReorderForWS(event) {
      const updatedGoalsWS = event.detail.complete(this.goals_ws);
      this.$store.commit('updateGoalsOrderForWS', updatedGoalsWS);
    },
    handleReorderForSS(event) {
      const updatedGoalsSS = event.detail.complete(this.goals_ss);
      this.$store.commit('updateGoalsOrderForSS', updatedGoalsSS);
    },
    dismiss() {
      this.$refs.modal_SS.$el.dismiss();
      this.$refs.modal_WS.$el.dismiss();
    },
    saveGoal() {
      const selectedOption = this.$refs.semesterSelect.value;
      if (this.goal_name && selectedOption) {
        console.log('Erstelle Ziel Daten')
        const goal_data = {
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          titel: this.goal_name,
          semesterSeason: selectedOption,
          info: this.info
        };
        console.log('Dispatche Ziel Daten')
        this.$store.dispatch('addGoal', goal_data);
        console.log('Schließe Modal')
        this.goal_name = '';
        this.semesterSeason = '';
        this.info = '';
        this.dismiss(); // Schließe das Modal nach dem Speichern
      } else {
        console.log('Fehlgeschlagen Daten zu generienen')
      }
    },
    deleteGoalHandler(goal_ID) {
      this.$store.dispatch('deleteGoal', goal_ID);
      console.log('Gelöschte Ziele:', this.deletedGoals);
    },

    filteredZiele(semester) {
      // Filtere die Ziele basierend auf dem übergebenen Semester
      return this.goals.filter(goal => goal.semesterSeason === semester);
    },
  },
  // mounted() {
  //   this.presentingElement = this.$refs.page.$el;
  // },

  computed: {
    goals() {
      return this.$store.getters.getGoal;
    },
    goals_ss() {
      return this.$store.getters.getGoals_ss;
    },

    goals_ws() {
      return this.$store.getters.getGoals_ws;
    },
    deletedGoals() {
      return this.$store.getters.getDeletedGoals;
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
  background-color: rgb(30, 30, 30);
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
  font-weight: normal;
  color: black;
}

.card-label h2 {
  font-weight: bold;
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