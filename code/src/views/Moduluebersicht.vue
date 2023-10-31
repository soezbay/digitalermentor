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
      <ion-toolbar>
          <ion-item lines="none">
            <ion-select v-model="selectedStudiengang" label="Studiengang" placeholder="Studiengang auswählen">
              <ion-select-option v-for="studiengang in studiengaenge" :key="studiengang.Kuerzel"
                :value="studiengang.Kuerzel">
                {{ studiengang.Name }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item lines="none">
            <ion-toggle v-model="showAsList" @click="onToggleChange()">Listenansicht</ion-toggle>
          </ion-item>
        </ion-toolbar>
    </ion-header>

    <ion-content>

      <!-- Ion Grid für Semester -->
      <ion-grid v-if="showAsList === false">
        <ion-row class="modulfont" v-for="semester in uniqueSemesters" :key="semester">
          <ion-list-header class="modulfont">
            {{ `Semester ${semester}` }}
          </ion-list-header>
          <!-- Anzeige der ausgewählten Module für das jeweilige Semester -->
          <ion-row class="semesterBlock">
            <ion-col class="modulBlock" v-for="module in getModulesForSemester(semester)" :key="module.Kuerzel"
              @click="openModal(module)">
              <ion-label>{{ module.Kuerzel }}</ion-label>
              <ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
            </ion-col>
            <template v-if="istEinWahlpflichtmodulImSemester(semester)">
              <ion-col class="modulBlock" v-for="index in maxWahlpflichtCols(semester)" :key="index">
                <ion-label>WP {{ index }}</ion-label>
              </ion-col>
            </template>
          </ion-row>
        </ion-row>
        <ion-row class="modulfont" v-if="modules.wahlpflicht != 0">
          <ion-list-header class="modulfont"> Wahlpflichtflichtmodule </ion-list-header>
          <ion-row class="semesterBlock">
            <ion-col class="modulBlock" v-for="module in modules.wahlpflicht" :key="module.Kuerzel"
              @click="openModal(module)">
              <ion-label>{{ module.Kuerzel }}</ion-label>
              <ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
            </ion-col>
          </ion-row>
        </ion-row>
      </ion-grid>

      <!--Show modules as List when showAsList=true-->
      <ion-list v-else style="padding: 0;">
        <div v-for="semester in uniqueSemesters" :key="semester">
          <ion-list-header class="semesterHeaderList">
            <ion-label>{{ `Semester ${semester}` }}</ion-label>
          </ion-list-header>
          <ion-item  v-for="module in getModulesForSemester(semester)" :key="module.Kuerzel" @click="openModal(module)">
            <ion-label>{{ module.Name }} ({{ module.Kuerzel }})</ion-label>
            <ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
          </ion-item>
        </div>

        <div v-if="modules.wahlpflicht != 0">
          <ion-list-header class="semesterHeaderList">
            <ion-label>Wahlpflichtflichtmodule</ion-label>
          </ion-list-header>
          <ion-item v-for="module in modules.wahlpflicht" :key="module.Kuerzel" @click="openModal(module)">
            <ion-label>{{ module.Name }} ({{ module.Kuerzel }})</ion-label>
            <ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
          </ion-item>
        </div>

        <div style="height: 200px;"></div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>


import {
  IonPage, IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonMenuButton, IonButton,
  IonGrid, IonRow, IonCol,
  IonSearchbar, IonToggle,
  IonSelectOption, IonSelect,
  IonList, IonListHeader, IonItem, IonLabel, IonIcon,
  IonCard, IonCardTitle,
  modalController,
} from '@ionic/vue';
import axios from 'axios';
import Modal from "./Modulbeschreibung.vue";
import { mapActions, mapMutations } from 'vuex';
import { sadOutline } from 'ionicons/icons';


export default {
  components: {
    IonPage, IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonMenuButton, IonButton,
    IonGrid, IonRow, IonCol,
    IonSearchbar, IonToggle,
    IonSelectOption, IonSelect,
    IonList, IonListHeader, IonItem, IonLabel, IonIcon,
    IonCard, IonCardTitle,
  },

  name: "ModulUebersicht",
  data() {
    return {
      showAsList: false,
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
    },
    settings() {
      console.log("Getting settings:");
      return this.$store.getters.getModuleOverviewData;
    }
  },

  created() {
    // console.log("Wir sind hier");
    this.fetchStudiengaenge();
    // console.log("Studiengang= ", this.selectedStudiengang)
    if (this.selectedStudiengang != null) {
      this.fetchPflichtModule(this.selectedStudiengang);
      this.fetchWahplfichtModule(this.selectedStudiengang);
    }
  },

  mounted() {
    this.fetchStudiengaenge();
    console.log("Mounte Settings:");
    console.log(this.settings);
    const lastSetup = this.settings;

    if (lastSetup.selectedStudiengang !== undefined && lastSetup.selectedStudiengang !== null) {
      this.selectedStudiengang = lastSetup.selectedStudiengang;
    }
    if (lastSetup.showAsList !== undefined && lastSetup.showAsList !== null) {
      this.showAsList = lastSetup.showAsList;
      console.log("Settings Geladen");
    }
  },

  watch: {
    selectedStudiengang(newStudiengang) {
      this.fetchPflichtModule(newStudiengang);
      this.fetchWahplfichtModule(newStudiengang);
      this.onStudiengangChange();
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

    async openModal(selectedModul) {

      console.log("selectedModul:", selectedModul);
      const modal = await modalController
        .create({
          component: Modal,
          componentProps: {
            selectedModul: selectedModul,
          },
        })
        .then((modal) => {
          modal.present();
        });
    },
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
    },

    onToggleChange() {
      if (this.showAsList === true) {
        const settingsArr = { selectedStudiengang: this.selectedStudiengang, showAsList: false };
        this.$store.commit('saveSettingsModuleOverview', settingsArr);
      }
      if (this.showAsList === false) {
        const settingsArr = { selectedStudiengang: this.selectedStudiengang, showAsList: true };
        this.$store.commit('saveSettingsModuleOverview', settingsArr);
      }
    },

    onStudiengangChange() {
      // Aktualisiere den Store, wenn selectedStudiengang geändert wird
      const settingsArr = { selectedStudiengang: this.selectedStudiengang, showAsList: this.showAsList };
      this.$store.commit('saveSettingsModuleOverview', settingsArr);
    },
  },
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

.semesterHeaderList {
  background-color: var(--ion-color-primary);
  color: #000000;
  font-size: 18px;
  height: 45px;
  text-align: center;
  padding: 0;
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
