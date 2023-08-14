<template>
  <ion-page>
      <ion-header>
          <ion-toolbar>
              <ion-title><p>Modulübersicht</p></ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content>
        <!-- <ion-searchbar animated="true" placeholder="Suche"></ion-searchbar> -->
            <ion-item>
        <ion-select v-model="selectedStudiengang" label="Studiengang" placeholder="Studiengang auswählen">
          <ion-select-option v-for="studiengang in studiengaenge" :key="studiengang.Kuerzel" :value="studiengang.Kuerzel">
            {{ studiengang.Name }}
          </ion-select-option>
        </ion-select>
      </ion-item>

        <ion-grid>
          <ion-row v-for="(semesterModules, semesterIndex) in moduleSemesters" :key="semesterIndex">
            <ion-list-header v-if="semesterIndex === 6">
              <ion-list-header><h5>Wahlpflichtmodul: INF</h5></ion-list-header>
            </ion-list-header>
            <ion-list-header v-else-if="semesterIndex === 7">
              <ion-list-header><h5>Wahlpflichtmodule: Lehreinheit</h5></ion-list-header>
            </ion-list-header>
                <ion-list-header v-else>
                  <ion-list-header>
                  <h5>{{ semesterIndex + 1 }}. Semester</h5>
                </ion-list-header>
                </ion-list-header>
          <ion-col v-for="(module, index) in semesterModules" :key="index" @click="toggleDescription(semesterIndex, index)">
              <ion-card> 
                <ion-card-header> 
                  <ion-card-title>{{ module.name }}</ion-card-title>
                </ion-card-header>
              <ion-card-content v-if="module.showDescription">{{ module.description }}</ion-card-content>
            </ion-card>
            
            <ion-text v-if="module.showDescription">
                <a @click="showModuleDetails(module.name)">Modulbeschreibung </a>
                <a @click="showModuleRating(module.name)"> Bewertung </a>
              </ion-text>

          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>



<script>

import { IonSearchbar, IonSelectOption, IonSelect, IonContent, IonHeader, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
// import { searchCircle } from 'ionicons/icons';
import axios from 'axios';

 
export default {
  components: {
    IonSearchbar,
    IonSelectOption,
    IonSelect,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonListHeader
},

  // setup() {
  //     return { searchCircle };
  //   },

  name: "ModulUebersicht",
  data(){
    return{

      selectedStudiengang: null,
      studiengaenge: [],
      wahlpflichtModule: [],
      pflichtModule: [],
      moduleSemesters: [
        [
          {name: "LDS", description: "Logik und diskrete Strukturen (LDS)", showDescription: false},
          {name: "EPR", description: "Einführung in die Programmierung", showDescription: false},
          {name: "MGR", description: "Mathematische Grundlagen", showDescription: false},
          {name: "TGI", description: "Technische Grundlagen der Informatik (TGI)", showDescription: false},
          {name: "TENI", description: "Technisches Englisch für Informatiker (TENI)", showDescription: false},
        ],
        [
          {name: "ADS", description: "Algorithmen und Datenstrukturen", showDescription: false},
          {name: "OPR", description: "Objektorientierte Programmierung", showDescription: false},
          {name: "SLA", description: "Statistik und Lineare Algebra", showDescription: false},
          {name: "THI", description: "Theoretische Informatik (THI)", showDescription: false},
          {name: "BSY", description: "Betriebssysteme (BSY)", showDescription: false},
        ],
        [
          {name: "DBA", description: "Datenbanksysteme (DBA)", showDescription: false},
          {name: "SWT", description: "Softwaretechnik (SWT)", showDescription: false},
          {name: "MCI", description: "Mensch-Computer-Interaktion (MCI)", showDescription: false},
          {name: "REN", description: "Rechnernetze (REN)", showDescription: false},
          {name: "INS", description: "Internetsprachen (INS)", showDescription: false},
        ],
        [
          {name: "SPIN", description: "Softwareprojekt Informatik (SPIN)", showDescription: false},
          {name: "Wahlpflicht: INF", description: "Siehe Auswahl unten", showDescription: false},
          {name: "Wahlpflicht: INF", description: "Siehe Auswahl unten", showDescription: false},
          {name: "Wahlpflicht: Lehreinheit", description: "Siehe Auswahl unten", showDescription: false},
          {name: "Wahlpflicht: Lehreinheit", description: "Siehe Auswahl unten", showDescription: false},
        ],
        [
          {name: "SPIN", description: "Softwareprojekt Informatik (SPIN)", showDescription: false},
          {name: "Wahlpflicht: INF", description: "Siehe Auswahl unten", showDescription: false},
          {name: "Wahlpflicht: INF", description: "Siehe Auswahl unten", showDescription: false},
          {name: "Wahlpflicht: Lehreinheit", description: "Siehe Auswahl unten", showDescription: false},
          {name: "Wahlpflicht: Lehreinheit", description: "Siehe Auswahl unten", showDescription: false},
        ],
        [
          {name: "PXP", description: "Praxisphase"},
          {name: "Bachelorarbeit", description: "Beschreibung für M1 - Semester 6", showDescription: false},
          {name: "KBIN", description: "Kolloquium zur Bachelorarbeit Informatik", showDescription: false},
          ],
        [
          {name: "BKV", description: "Betrieb komplexer verteilter Systeme (BKV)", showDescription: false},
          {name: "BV", description: "Einführung in die Bildverarbeitung (BV)", showDescription: false},
          {name: "DOW", description: "Data on the Web (DOW)", showDescription: false},
          {name: "DSP", description: "Data Science in Practice (DSP)", showDescription: false},
          {name: "EMI", description: "Einführung in die medizinische Informatik (EMI)", showDescription: false},
          {name: "ERO", description: "Einführung in die Robotik (ERO)", showDescription: false},
          {name: "INP", description: "Internet-Protokolle (INP)", showDescription: false},
          {name: "ITS", description: "Grundlagen der IT-Sicherheit (ITS)", showDescription: false},
          {name: "KBE", description: "Komponentenbasierte Softwareentwicklung (KBE)", showDescription: false},
          {name: "KI", description: "Künstliche Intelligenz (KI)", showDescription: false},
          {name: "KNG", description: "Knowledge Graphs (KNG)", showDescription: false},
          {name: "MCC", description: "Mobile und Cloud Computing (MCC)", showDescription: false},
          {name: "MRO", description: "Mobile Robotik (MRO)", showDescription: false},
          {name: "PAP", description: "Parallele Programmierung (PAP)", showDescription: false},
          {name: "PPR", description: "Prozedurale Programmierung (PPR)", showDescription: false},
          {name: "PRAX", description: "Practical Security Attacks and Exploitation (PRAX)", showDescription: false},
          {name: "SWD", description: "Software Design (SWD)", showDescription: false},
        ],
        [
          {name: "BRW", description: "Betriebliches Rechnungswesen (BRW)", showDescription: false},
          {name: "DIM", description: "Digitales Marketing (DIM)", showDescription: false},
          {name: "EBW", description: "Einführung in die Betriebswirtschaftslehre (EBW)", showDescription: false},
          {name: "GPM", description: "Geschäftsprozessmanagement (GPM)", showDescription: false},
          {name: "GWI", description: "Grundlagen der Wirtschaftsinformatik (GWI)", showDescription: false},
          {name: "PMA", description: "Projektmanagement (PMA)", showDescription: false},
          {name: "PMW", description: "Produktion und Materialwirtschaft (PMW)", showDescription: false},
        ]
      ],
    };
  },
  mounted() {
    this.fetchStudiengaenge();
  },
  methods: {
    async fetchStudiengaenge() {
      try {
        const response = await axios.get('http://localhost:3000/studiengang');
        this.studiengaenge = response.data.studiengaenge;
      } catch (error) {
        console.error('Error fetching studiengaenge:', error);
      }
    },
    async fetchPflichtModule(selectedStudiengang) {
      try {
        const response = await axios.get('http://localhost:3000/pflicht/${selectedStudiengang}');
        this.pflichtModule = response.data.modules
      } catch (error) {
        console.error('Error fetching pflichtmodule:', error);
      }
    },
    async fetchWahplfichtModule(selectedStudiengang) {
      try {
        const response = await axios.get('http://localhost:3000/studiengang/${selectedStudiengang}');
        this.wahlpflichtModule = response.data.modules
      } catch (error) {
        console.error('Error fetching wahlpfichtmodule:', error);
      }
    },
    toggleDescription(semesterIndex, moduleIndex) {
      this.moduleSemesters[semesterIndex][moduleIndex].showDescription = !this.moduleSemesters[semesterIndex][moduleIndex].showDescription;
    },
    showModuleDetails(moduleName){
      // Navigation zur Modulbescreibungsseite implementieren
      //console.log("Modulbeschreibung für", moduleName);
    },
    showModuleRating(moduleName){
      // Navigation zur Bewertungsseite implementieren
      //console.log("Bewertung für", moduleName);
    }
  },
};

</script>