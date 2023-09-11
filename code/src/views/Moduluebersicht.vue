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
        <ion-row v-for="semester in uniqueSemesters" :key="semester">
          <ion-col>
            <ion-label>{{ `Semester ${semester}` }}</ion-label>
          </ion-col>
          <ion-col>
            <!-- Anzeige der ausgewählten Module für das jeweilige Semester -->
            <ion-list>
              <ion-item v-for="module in getModulesForSemester(semester)" :key="module.Kuerzel">
                <ion-label>{{ module.Name }}</ion-label>
                <ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
              </ion-item>
            </ion-list>
          </ion-col>
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

      selectedStudiengang: "PI",
      studiengaenge: [],
      modules: {
        pflicht: [] // Pflichtmodule initialisieren
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
  // this.fetchStudiengaenge();
  console.log("Studiengang= ", this.selectedStudiengang)
  this.fetchPflichtModule(this.selectedStudiengang);
  },
  mounted() {
    // this.fetchStudiengaenge();
  },
  watch: {
    selectedStudiengang(newStudiengang) {
      this.fetchPflichtModule(newStudiengang);
    },
  },
  methods: {
    // async fetchStudiengaenge() {
    //   try {
    //     const response = await axios.get('http://localhost:8000/studiengang');
    //     this.studiengaenge = response.data.studiengaenge;
    //     console.log("Test")
    //     console.log(this.studiengaenge)
    //   } catch (error) {
    //     console.error('Error fetching studiengaenge:', error);
    //   }
    // },
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


    // async fetchWahplfichtModule(selectedStudiengang) {
    //   try {
    //     const response = await axios.get('http://localhost:8000/studiengang/${selectedStudiengang}');
    //     this.wahlpflichtModule = response.data.modules
    //   } catch (error) {
    //     console.error('Error fetching wahlpfichtmodule:', error);
    //   }
    // },
    // toggleDescription(semesterIndex, moduleIndex) {
    //   this.moduleSemesters[semesterIndex][moduleIndex].showDescription = !this.moduleSemesters[semesterIndex][moduleIndex].showDescription;
    // },

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