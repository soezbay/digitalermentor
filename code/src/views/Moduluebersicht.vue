<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button router-link="/menu/dashboard">
            <ion-icon style="font-size: 45px;" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Modulübersicht</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>

      <!-- Studiengangauswahl aus Datenbank -->
      <ion-item>
        <ion-select v-model="selectedStudiengang" label="Studiengang" placeholder="Studiengang auswählen">
          <ion-select-option v-for="studiengang in studiengaenge" :key="studiengang.Kuerzel" :value="studiengang.Kuerzel">
            {{ studiengang.Name }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Ion Grid für Semester -->
      <ion-grid>
        <ion-row class="modulfont" v-for="semester in uniqueSemesters" :key="semester">
          <ion-list-header class="modulfont">
            {{ `Semester ${semester}` }}
          </ion-list-header>
            <!-- Anzeige der ausgewählten Module für das jeweilige Semester -->
          <ion-row class="semesterBlock">
            <ion-col class="modulBlock" v-for="module in getModulesForSemester(semester)" :key="module.Kuerzel">
              <ion-label>{{ module.Kuerzel }}</ion-label>
              <ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>      
            </ion-col>
          <template v-if="istEinWahlpflichtmodulImSemester(semester)">
            <ion-col class="modulBlock" v-for="index in maxWahlpflichtCols(semester)" :key="index">
            <ion-label>WL {{ index }}</ion-label>
          </ion-col>
          </template>
          </ion-row>
          </ion-row>
          <ion-row class="modulfont" v-if="modules.wahlpflicht != 0">
            <ion-list-header class="modulfont"> Wahlpflichtflichtmodule </ion-list-header>
          <ion-row class="semesterBlock">
              <ion-col class="modulBlock" v-for="module in modules.wahlpflicht" :key="module.Kuerzel">
                <ion-label>{{ module.Kuerzel }}</ion-label>
                <ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
              </ion-col>
            </ion-row>
          </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>


import {
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonSelectOption,
  IonSelect,
  IonContent,
  IonHeader,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  modalController,
  IonButton
} from '@ionic/vue';
import axios from 'axios';
import Modal from "./Modulbeschreibung.vue";


export default {
  components: {
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonSelectOption,
    IonSelect,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonListHeader,
    modalController,
    IonButton
  },

  name: "ModulUebersicht",
  data() {
    return {

      selectedStudiengang: null,
      studiengaenge: [],
      modules: {
        pflicht: [],// Pflichtmodule initialisieren
      wahlpflicht: []
      }
    };
  },
  computed: {
  uniqueSemesters() {
    // Überprüfen, ob this.modules.pflicht verfügbar ist, bevor auf sie zugegriffen wird
    if (this.modules.pflicht) {
      const uniqueSemesters = [...new Set(this.modules.pflicht.map(module => module.Semester))];
      
      // Sortieren Sie die einzigartigen Semester aufsteigend
      uniqueSemesters.sort((a, b) => a - b);
      
      console.log("Einzigartige Semester:", uniqueSemesters);
      return uniqueSemesters;
    } else {
      return [];
    }
  }
},
  created() {
  console.log("Wir sind hier");
  this.fetchStudiengaenge();
  console.log("Studiengang= ", this.selectedStudiengang)
  if(this.selectedStudiengang != null) {
  this.fetchPflichtModule(this.selectedStudiengang);
  this.fetchWahplfichtModule(this.selectedStudiengang);
  }
  },
  mounted() {
    this.fetchStudiengaenge();
  },
  watch: {
    selectedStudiengang(newStudiengang) {
      this.fetchPflichtModule(newStudiengang);
      this.fetchWahplfichtModule(newStudiengang);
    },
  },
  methods: {
    async fetchStudiengaenge() {
      try {
        const response = await axios.get('http://localhost:8000/studiengang');
        this.studiengaenge = response.data.studiengaenge;
        console.log("Test")
        console.log(this.studiengaenge)
      } catch (error) {
        console.error('Error fetching studiengaenge:', error);
      }
    },
    async fetchPflichtModule() {
  try {
    const response = await fetch(`http://localhost:8000/studiengang/pflicht/${this.selectedStudiengang}`);
    const data = await response.json();
    console.log(data);

    // Überprüfen Sie, ob die Daten in der Antwort vorhanden sind
    if (data.pflicht) {
      this.modules.pflicht = data.pflicht;
      console.log("Pflichtmodule geladen:", this.modules.pflicht);
    } else {
      console.error("Fehler beim Laden der Pflichtmodule.");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
  }
},


    async fetchWahplfichtModule(selectedStudiengang) {
      try {
        const response = await axios.get(`http://localhost:8000/studiengang/wahlpflicht/${this.selectedStudiengang}`);
        const data = await response.data;
        if (data.wahlpflicht) {
          this.modules.wahlpflicht = data.wahlpflicht;
          console.log("Wahlplichtmodule geladen:", this.modules.wahlpflicht);
        } else {
          console.error("Fehler beim Laden der Wahlpflichtflichtmodule.");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },
    toggleDescription(semesterIndex, moduleIndex) {
      this.moduleSemesters[semesterIndex][moduleIndex].showDescription = !this.moduleSemesters[semesterIndex][moduleIndex].showDescription;
    },

    // async openModal(selectedModul) {
    //   const modal = await modalController
    //     .create({
    //       component: Modal,
    //       componentProps: {
    //         selectedModul: selectedModul,
    //       },
    //     })
    //     .then((modal) => {
    //       modal.present();
    //     });
    // },
    getModulesForSemester(semester) {
      // Filtern Sie die Pflichtmodule basierend auf dem ausgewählten Semester
      return this.modules.pflicht.filter((module) => module.Semester === semester);
    },



    istEinWahlpflichtmodulImSemester(semester) {
      const filteredModules = this.modules.wahlpflicht.filter((module) => module.Semester === semester);
      return filteredModules.length > 0;
    },

    AnzahlPflichtmoduleImSemester(semester) {
      const filteredModules = this.modules.pflicht.filter((module) => module.Semester === semester);
      return filteredModules.length;
    },

    maxWahlpflichtCols(semester) {
      const maxCols = 5;
      const numPflichtModules = this.getModulesForSemester(semester).length;
      const remainingCols = maxCols - numPflichtModules;
      return Math.max(0, remainingCols);
    }

  }
};
</script>

<style scoped>
.title-block {
  background-color: #8c99004d;
  border-radius: 15px;
  padding: 10px;
  text-align: center;
}

.modulBlock {
  margin: 1%;
  width: 85px;
  text-align: center;
  border-radius: 15px;
  background: #fff;
  color: #000000;
  text-align: center;
}

.modulfont {
  font-size: 16px;
  font-weight: 350;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
}

.semesterBlock {
  border-radius: 15px;
  background: #8C99004D;
}

ion-col {
  background-color: #135d54;
  border: solid 3px #fff;
  color: #fff;
  text-align: center;
}
</style>