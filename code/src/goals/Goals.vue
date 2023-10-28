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
      <div class="semesterHeader">
        <ion-label class="labelHeader">Sommersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button style="padding-right: 15px;" color="primary" id="open-SS-modal" expand="block">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <!-- Getting Sommersemester-Array of vuex and displaying all elements -->
      <ion-list class="drag-drop-containers" v-if="goals_ss.length > 0">
        <ion-reorder-group :disabled="false" @ionItemReorder="handleReorderForSS($event)">
          <ion-item-sliding v-for="goal in goals_ss" :key="goal.id" class="drag-drop-box-item">
            <ion-item-options side="start">
              <ion-item-option color="success" @click="switchToWS(goal.id)">
                <ion-label>Nach Unten</ion-label>
              </ion-item-option>
            </ion-item-options>
            <!--Displayin Goal-Element properties-->
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
            <!--Slide-Options, first one Deleting Goals, second one moving it into checkedGoals.vue-->
            <ion-item-options side="end">
              <ion-item-option color="danger" @click="deleteGoalHandler(goal.id)">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
              <ion-item-option color="success" @click="checkGoal(goal.id)">
                <ion-icon slot="icon-only" :icon="checkmarkDone"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-reorder-group>
      </ion-list>
      <!--Only getting displayed when Array is empty-->
      <div v-else class="ion-padding">
        <div class="ion-text-center">
          <ion-label style="font-size: large;">Keine Ziele definiert.</ion-label>
          <br>
          <ion-label>
            Erleichtere dein Studienverlauf indem du Ziele mit "+" definierst und nach Priorität sortierst!
          </ion-label>
        </div>
      </div>

      <div class="semesterHeader">
        <ion-label class="labelHeader">Wintersemester</ion-label>
        <ion-buttons slot="end">
          <ion-button style="padding-right: 15px;" color="primary" id="open-WS-modal" expand="block">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <!-- Getting Sommersemester-Array of vuex and displaying all elements -->
      <ion-list class="drag-drop-containers" v-if="goals_ws.length > 0">
        <ion-reorder-group :disabled="false" @ionItemReorder="handleReorderForWS($event)">
          <ion-item-sliding v-for="goal in goals_ws" :key="goal.id" class="drag-drop-box-item">
            <ion-item-options side="start">
              <ion-item-option color="success" @click="switchToSS(goal.id)">
                <ion-label>Nach Oben</ion-label>
              </ion-item-option>
            </ion-item-options>
            <!--Displayin Goal-Element properties-->
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
            <!--Slide-Options, first one Deleting Goals, second one moving it into checkedGoals.vue-->
            <ion-item-options side="end">
              <ion-item-option color="danger" @click="deleteGoalHandler(goal.id)">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
              <ion-item-option color="success" @click="checkGoal(goal.id)">
                <ion-icon slot="icon-only" :icon="checkmarkDone"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-reorder-group>
      </ion-list>
      <!--Only getting displayed when Array is empty-->
      <div v-else class="ion-padding">
        <div class="ion-text-center">
          <ion-label style="font-size: large;">Keine Ziele definiert.</ion-label>
        </div>
      </div>

      <!--Item-Elements routing to checked Goals and deleted Goals-->
      <ion-item color="primary" router-link="/menu/studienziele/checked" id="header" detail="true" lines="none">
        <ion-label slot="end">
          Abgeschlossene Ziele
        </ion-label>
      </ion-item>
      <ion-item color="light" router-link="/menu/studienziele/deleted" id="header" detail="true" lines="none">
        <ion-label slot="end">
          Gelöschte Ziele
        </ion-label>
      </ion-item>

      <ion-row class="klausuren-title">
        <ion-label class="underline">Diese Klausuren musst du noch schreiben</ion-label>
      </ion-row>

      <!-- List of Semester and modules -->
      <ion-list class="ion-padding">
        <div v-for="(semester, index) in semesterList" :key="index">
          <ion-label>{{ semester.name }}</ion-label>
          <ion-item>
            <!-- Displying the module-elements, with drag&drop property -->
            <ion-card v-for="(fach, fachIndex) in semester.faecher" :key="fachIndex" @dragstart="onDragStart(fach)"
              draggable="true" class="drag-item" :class="fach.status">
              <ion-label style="color: #000000; font-weight: bolder;">{{ fach.name }}</ion-label>
            </ion-card>
          </ion-item>
          <br>
        </div>
      </ion-list>
      <!--Color Legend-->
      <p style="text-align: center;">Legende:</p>
      <div class="legend">
        <div class="legend-item Bestanden">Bestanden</div>
        <div class="legend-item versuch1">Versuch 1</div>
        <div class="legend-item versuch2">Versuch 2</div>
        <div class="legend-item versuch3">Versuch 3</div>
      </div>

      <!-- Modals for adding a goal (Sommersemester)-->
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

      <!-- Modals for adding a goal (Wintersemester)-->
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
import { add, trash, checkmarkDone, sadOutline } from 'ionicons/icons';
import axios from "axios";

import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonMenuButton, IonButton,
  IonItem, IonLabel, IonInput,
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
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonMenuButton, IonButton,
    IonItem, IonLabel, IonInput,
    IonList, IonListHeader,
    IonCard,
    IonRow,
    IonIcon,
    IonItemSliding, IonItemOptions, IonItemOption,
    IonModal,
    IonSelect, IonSelectOption,
    IonReorder, IonReorderGroup,
  },
  data() {
    return {
      add, trash, checkmarkDone, //Icons
      presentingElement: undefined,
      //Goal properties
      goal_name: '',
      semesterSeason: '',
      info: '',
      studentID: "test123",
      modules: [], // Alle Module aus der Datenbank
      studentProgress: [], // Teilgenommene Module des Studierenden
      electiveModules: [],
      //Array with Modules
      semesterList: [
        { name: '1. Semester', },
        { name: '2. Semester', },
        { name: '3. Semester', },
        { name: '4. Semester', },
        { name: '5. Semester', },
        { name: '6. Semester', },
        { name: 'Wahlpflichtmodule', },
      ],
    };
  },

  methods: {
    //Reorder Handler which commits to Vuex-Store
    handleReorderForWS(event) {
      const updatedGoalsWS = event.detail.complete(this.goals_ws);
      console.log(updatedGoalsWS);
      this.$store.commit('updateGoalsOrderForWS', updatedGoalsWS);
    },
    handleReorderForSS(event) {
      const updatedGoalsSS = event.detail.complete(this.goals_ss);
      console.log(updatedGoalsSS);
      this.$store.commit('updateGoalsOrderForSS', updatedGoalsSS);
    },
    //Dissmis-Methode for Modals
    dismiss() {
      this.$refs.modal_SS.$el.dismiss();
      this.$refs.modal_WS.$el.dismiss();
    },
    //Logik for saving a new Goal to Vuex-Store
    saveGoal() {
      const selectedOption = this.$refs.semesterSelect.value; //get selected Semester in Modal
      if (this.goal_name && selectedOption) {
        console.log('Erstelle Ziel Daten')
        //Set Properties from input
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
        //Set propeties to Default
        this.goal_name = '';
        this.semesterSeason = '';
        this.info = '';
        this.dismiss();
      } else {
        console.log('Fehlgeschlagen Daten zu generienen')
      }
    },
    //Handler for deleting and checking goals and commiting it to the store
    deleteGoalHandler(goal_ID) {
      this.$store.dispatch('deleteGoal', goal_ID);
      console.log('Gelöschte Ziele:', this.deletedGoals);
    },
    checkGoal(goal_ID) {
      this.$store.commit('checkGoal', goal_ID);
    },
    //Methodes moves goals from one to another array in vuex store
    switchToWS(goal_ID) {
      this.$store.commit('switchToWS', goal_ID);
    },
    switchToSS(goal_ID) {
      this.$store.commit('switchToSS', goal_ID);
    },

    //Get Modules- and User-Data from Server
    getData() {
      axios.get("http://localhost:8000/studiengang/pflicht/pi")
        .then((response) => {
          const pflichtModule = response.data.pflicht;

          // Group Modules by Semester
          const groupedModules = {};
          pflichtModule.forEach((modul) => {
            const semester = modul.Semester;
            if (!groupedModules[semester]) {
              groupedModules[semester] = [];
            }
            groupedModules[semester].push(modul);
          });

          // Fill semesterList-Array with the grouped Modules
          this.semesterList.forEach((semester, index) => {
            const semesterIndex = index + 1;
            if (groupedModules[semesterIndex]) {
              semester.faecher = groupedModules[semesterIndex].map((modul) => {
                //Put Module in array
                return { name: modul.Kuerzel, status: 'versuch1' };
              });
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });

      axios.get("http://localhost:8000/studiengang/wahlpflicht/pi")
        .then((Response) => {
          console.log(Response.data);
          this.electiveModules = Response.data.wahlpflicht;

          // Put electiveModules in belonging SemesterArray
          const wahlpflichtSemesterIndex = this.semesterList.findIndex(item => item.name === 'Wahlpflichtmodule');
          if (wahlpflichtSemesterIndex !== -1) {
            this.semesterList[wahlpflichtSemesterIndex].faecher = this.electiveModules.map((modul) => {
              return { name: modul.Kuerzel, status: 'versuch1' };
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios.get(`http://localhost:8000/modul/status/${this.studentID}`)
        .then((Response) => {
          console.log(Response.data);
          //get user data containing modules which are passed or not
          const studentModules = Response.data.modul;
          const passedModules = studentModules.filter((modul) => modul.Status === 'Bestanden');
          const notPassedModules = studentModules.filter((modul) => modul.Status === 'Nicht Bestanden');
          // Iterate through Studentmodules and update Status
          this.semesterList.forEach((semester) => {
            semester.faecher.forEach((fach) => {
              const matchingModule1 = notPassedModules.find((modul) => modul.Kuerzel === fach.name);
              if (matchingModule1) {
                if (matchingModule1.Versuch < 3) {
                  fach.status = "versuch" + (parseInt(matchingModule1.Versuch) + 1);
                } else {
                  fach.status = parseInt(matchingModule1.Versuch);
                }
              }
              const matchingModule2 = passedModules.find((modul) => modul.Kuerzel === fach.name);
              if (matchingModule2) {
                fach.status = "Bestanden";
              }
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //Display when data is fetched
  mounted() {
    this.getData();
  },

  computed: {
    //Vuex-Getters
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
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--ion-color-light);
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
  padding-top: 5px;
  padding-left: 8px;
  padding-right: 25px;
  padding-bottom: 5px;
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

.legend {
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  flex-direction: row;
  /* Legt die Ausrichtung auf horizontal fest */
}

.legend-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 20px;
  height: 30px;
  width: 120px;
  border-radius: 20px;
  color: black;
}

.Bestanden {
  background-color: var(--ion-color-primary);
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