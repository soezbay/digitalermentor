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
          <ion-select v-model="selectedStudiengang" label="Studiengang" placeholder="Studiengang auswählen" :interface-options="{cssClass: 'custom-ion-select'}" >
              <ion-select-option v-for="studiengang in studiengaenge" :key="studiengang.Kuerzel"
                :value="studiengang.Kuerzel">
                {{ studiengang.Name }}
              </ion-select-option>
          </ion-select>
        </ion-item>
        <!-- <ion-item id="open-courses-modal">
          <ion-label slot="start">Studiengang</ion-label>
          <ion-button slot="end" color="light" id="open-courses-modal">Studiengang</ion-button>
        </ion-item> -->
        <ion-item lines="none">
          <ion-toggle v-model="showAsList" @click="onToggleChange()">Listenansicht</ion-toggle>
        </ion-item>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Ion Grid für Semester -->
      <ion-grid v-if="showAsList === false">
        <ion-row v-for="semester in uniqueSemesters" :key="semester">
          <ion-col>
            <ion-list class="moduleList">
              <ion-label class="modulfont">{{ `${semester}. Semester ` }}</ion-label>
              <ion-item>
                <ion-card class="modulBlock" v-for="(module) in getModulesForSemester(semester)" :key="module.Kuerzel"
                  @click="openModal(module)">
                  <ion-label class="modulLabel">{{ module.Kuerzel }}</ion-label>
                </ion-card>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row v-if="modules.wahlpflicht != 0">
          <ion-col>
            <ion-list class="moduleList">
              <ion-label class="modulfont">Wahlpflichtflichtmodule</ion-label>
              <ion-item>
                <ion-card class="modulBlock" v-for="(module) in modules.wahlpflicht" :key="module.Kuerzel"
                  @click="openModal(module)">
                  <ion-label class="modulLabel">{{ module.Kuerzel }}</ion-label>
                </ion-card>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <div style="height: 300px;"></div>
      </ion-grid>


      <!--Show modules as List when showAsList=true-->
      <ion-list v-else style="padding: 0;">
        <div v-for="semester in uniqueSemesters" :key="semester">
          <ion-list-header class="semesterHeaderList">
            <ion-label>{{ `Semester ${semester}` }}</ion-label>
          </ion-list-header>
          <ion-item v-for="module in getModulesForSemester(semester)" :key="module.Kuerzel" @click="openModal(module)">
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

      <ion-modal ref="coursesModal" trigger="open-courses-modal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Wähle einen Studiengang aus</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item button v-for="studiengang in studiengaenge" :key="studiengang.Kuerzel"
                :value="studiengang.Kuerzel">
                <ion-label>{{ studiengang.Name }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>

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
  modalController, IonModal
} from '@ionic/vue';
import axios from 'axios';
import Modal from "./Modulbeschreibung.vue";

export default {
  components: {
    IonPage, IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonMenuButton, IonButton,
    IonGrid, IonRow, IonCol,
    IonSearchbar, IonToggle,
    IonSelectOption, IonSelect,
    IonList, IonListHeader, IonItem, IonLabel, IonIcon,
    IonCard, IonCardTitle, IonModal
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

    async openCourses(selectedModul) {

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
.custom-ion-select .alert-wrapper {
  background-color: var(--ion-color-success);
    color: var(--ion-color-success-contrast);
}

ion-alert.custom-alert {
    --backdrop-opacity: 0.7;
  }
.moduleList {
  padding-top: 15px;
}

.modulBlock {
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
  background-color: darkgrey;
}

.modulLabel {
  color: #000000;
  font-weight: bolder;

}

ion-grid {
  padding: 0;
  margin: 0;
}

ion-col {
  margin: 0;
  padding: 0;
}

.modulfont {
  text-align: left;
  padding-left: 27px;
  padding-top: 10px;
}

.semesterHeaderList {
  background-color: var(--ion-color-primary);
  color: #000000;
  font-size: 18px;
  height: 45px;
  text-align: center;
  padding: 0;
}

ion-modal {
  --height: 35%;
  --width: 90%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

@media (min-width: 768px) {
  ion-modal {
    --width: 50%;
    /* Breite für breitere Bildschirme anpassen */
  }
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
