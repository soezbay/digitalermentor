<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button router-link="/menu/dashboard">
                        <ion-icon style="font-size: 45px;" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Dashboard</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-header id="displayUsername">{{ getGreeting() }}, {{ getUsername() }}</ion-header>

            <ion-grid>
                <ion-row>
                    <ion-col size="12" size-md="6" class="ion-padding-horizontal ion-padding-top">
                        <ion-item color="primary" router-link="/menu/studienziele" id="header" detail="true" lines="none"
                            class="rounded-item ion-margin-horizontal">
                            <ion-label class="custom-label">
                                Deine Ziele
                            </ion-label>
                        </ion-item>
                        <div class="semester-container ion-padding-bottom">
                            <ion-label class="semester-label" style="font-size: larger;">Sommersemester</ion-label>
                            <ion-label class="semester-label" style="font-size: larger;">Wintersemester</ion-label>
                        </div>
                        <div class="ziel-container">
                            <ion-list class="drag-drop-containers">
                                <div v-if="goals_ss.length >= 1" class="drag-drop-box-item">
                                    <ion-item lines="none" color="#d2d69e" class="item-container">
                                        <ion-label class="card-label">
                                            <h2>{{ goals_ss[0].titel }}</h2>
                                            <p>{{ goals_ss[0].beschreibung }}</p>
                                        </ion-label>
                                    </ion-item>
                                    <ion-item v-if="goals_ss.length > 1" lines="none" color="#d2d69e"
                                        class="item-container">
                                        <ion-label class="card-label">
                                            <h2>{{ goals_ss[1].titel }}</h2>
                                            <p>{{ goals_ss[1].beschreibung }}</p>
                                        </ion-label>
                                    </ion-item>
                                </div>


                            </ion-list>
                            <div class="ziel-separator"></div>
                            <ion-list class="drag-drop-containers">
                                <div v-if="goals_ws.length >= 1" class="drag-drop-box-item">
                                    <ion-item lines="none" color="#d2d69e" class="item-container">
                                        <ion-label class="card-label">
                                            <h2>{{ goals_ws[0].titel }}</h2>
                                            <p>{{ goals_ws[0].beschreibung }}</p>
                                        </ion-label>
                                    </ion-item>
                                    <ion-item v-if="goals_ws.length > 1" lines="none" color="#d2d69e"
                                        class="item-container">
                                        <ion-label class="card-label">
                                            <h2>{{ goals_ws[1].titel }}</h2>
                                            <p>{{ goals_ws[1].beschreibung }}</p>
                                        </ion-label>
                                    </ion-item>
                                </div>
                            </ion-list>
                        </div>
                    </ion-col>


                    <ion-header style="height: 0.3%;"></ion-header>

                    <ion-col size="12" size-md="6" class="ion-padding-horizontal ion-padding-top">
                        <ion-item color="primary" router-link="/termine" id="header" detail="true" lines="none"
                            class="rounded-item ion-margin-horizontal">
                            <ion-label class="custom-label">
                                Deine Termine
                            </ion-label>
                        </ion-item>
                        <div v-if="kommendeTermine.length > 0">
                            <ion-list v-for="termin in kommendeTermine" :router-link="`/termine/${termin.id}`"
                                style="padding: 0%;">
                                <ion-item style="background-color: #3d3e40;">
                                    <ion-label>
                                        <h2>{{ termin.titel }}</h2>
                                        <h3>{{ termin.ort }}</h3>
                                    </ion-label>
                                    <ion-label slot="end">
                                        <h2>{{ formatDate(termin.datum) }} - {{ termin.zeit }}</h2>
                                    </ion-label>
                                </ion-item>
                            </ion-list>
                        </div>
                        <div v-else>
                            <ion-item style="text-align: center;">
                                <ion-label class="custom-text ion-padding">
                                    <h2>Keine Termine für diesen Monat.</h2>
                                </ion-label>
                            </ion-item>
                        </div>
                        <br>
                        <div class="dateDiv">
                            <ion-datetime presentation="date" v-model="selectedDate" :highlighted-dates="highlightedDates"
                                size="cover" max="2100-01-01T00:00:00">
                            </ion-datetime>
                        </div>
                        <!-- HIER ERSTMAL NUR KONZEPT WIE MODULE MÖGLICHERWEISE AUS DEM SERVER GEHOLT WERDEN
            <ion-list>
                <div>
                    <ion-item v-for="(item, index) in usersList" :key="index">
                        <ion-label>
                            <p><strong>BewertungsID:</strong> {{ item.BewertungsID }}</p>
                            <p><strong>BewertungsGruppe:</strong> {{ item.BewertugsGruppe }}</p>
                            <p><strong>Bewertung:</strong> {{ item.Bewertung }}</p>
                            <p><strong>ErstelltAm:</strong> {{ item.ErstelltAm }}</p>
                            <p><strong>Kuerzel:</strong> {{ item.Kuerzel }}</p>
                            <p><strong>BenutzerID:</strong> {{ item.BenutzerID }}</p>
                        </ion-label>
                    </ion-item>
                </div>
                </ion-list> -->
                    </ion-col>
                </ion-row>
            </ion-grid>

        </ion-content>
    </ion-page>
</template>
            

<script>
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol,
    IonButtons, IonButton, IonMenuButton,
    IonItem, IonLabel,
    IonList, IonListHeader,
    IonIcon,
    IonDatetime,
} from '@ionic/vue';

import axios from 'axios';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
        IonGrid, IonRow, IonCol,
        IonButtons, IonButton, IonMenuButton,
        IonItem, IonLabel,
        IonList, IonListHeader,
        IonIcon,
        IonDatetime,
    },
    setup() {
        const store = useStore();

        const termine = computed(() => {
            const terminArr = store.getters.termine;
            return terminArr;
        });

        const highlightedDates = computed(() => {
            // Generate highlightedDates from your Vuex store data
            return termine.value.map(termine => {
                return {
                    date: termine.datum, // Use the appropriate property from your termine data
                    textColor: '#000000', // Customize as needed
                    backgroundColor: '#D7D5D5', // Customize as needed
                };
            });
        });

        const formatDate = (dateString) => {
            const parts = dateString.split('-');
            if (parts.length === 3) {
                const [year, month, day] = parts;
                return `${day}.${month}.${year}`;
            }
            return dateString; // Rückgabe des ursprünglichen Datums, falls das Format ungültig ist
        };

        return {
            highlightedDates,
            formatDate
        };
    },
    data() {
        return {
            usersList: [],
            selectedDate: new Date().toISOString()
        }
    },
    methods: {
        getData() {
            axios.get('http://localhost:8000/bewertung').then(Response => {
                console.log(Response.data)
                this.usersList = Response.data.bewertungen;
            }).catch(err => {
                console.log(err);
            })
        },
        getGreeting() {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            if (currentHour >= 5 && currentHour < 12) {
                return 'Guten Morgen';
            } else if (currentHour >= 12 && currentHour < 18) {
                return 'Hallo';
            } else {
                return 'Guten Abend';
            }
        },
        getUsername() {
            return 'Username' + '!';

        },
    },
    mounted() {
        this.getData();
    },
    computed: {
        kommendeTermine() {
            const currentDate = new Date();
            const kommendeTermine = this.$store.getters.termine.filter(termin => {
                const terminDate = new Date(termin.datum);
                return terminDate >= currentDate;
            });

            return kommendeTermine.slice(0, 3); // Nur die ersten zwei Termine
        },
        goals_ss() {
            return this.$store.getters.getGoals_ss;
        },
        goals_ws() {
            return this.$store.getters.getGoals_ws;
        },

    },

}
</script>


<style scoped>
.custom-text {
    color: #555;
}

.custom-label {
    color: white;
    font-size: 20px;

}



@media screen and (min-width: 992px) {
    .ion-padding-horizontal {
        padding: 20px;
    }
}

.rounded-item {
    border-radius: 15px;
    overflow: hidden;
    width: auto;
    justify-content: center;
}

@media screen and (min-width:992px) {
    .ion-margin-horizontal {
        margin-left: 10px;
        margin-right: 40px;
    }
}

@media (min-width: 1024px) {
    .dateDiv {
        max-width: 1400px;
        padding-left: 50px;
        padding-right: 50px;
    }
}

.drag-drop-containers {
    width: 50%;
}

.semester-container {
    display: flex;
    padding-top: 10px;
    background: var(--ion-item-background, var(--ion-background-color, #fff));
}

.semester-label {
    width: 50%;
    font-size: larger;
    text-align: center;
    display: inline-block;
}

.ziel-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ziel-separator {
    border-left: 2px solid #ccc;
    height: 130px;
    margin: 0 3px;

}

.drag-drop-box-item {
    margin: 5px;
    border-radius: 30px;
    text-align: left;
}

.item-container {
    margin: 5px;
    border-radius: 30px;
    text-align: left;
    background-color: #d2d69e;
    text-align: center;
    color: black;
}

#flexbox1 {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

#flexbox1 ion-item {
    margin: 1%;
    width: 85px;
    text-align: center;
    border-radius: 20px;
}

#displayUsername {
    font-family: 'Blessing', sans-serif;
    padding: 20px;
    font-size: 45px;
    text-align: center;
}

#header {
    font-size: larger;
    text-align: center;
}

#header ion-label {
    padding-left: 10px;
}

.dateDiv {
    margin: 10px;
}

ion-datetime {
    background: var(--ion-item-background, var(--ion-background-color, #d2d69e));
    color: var(--ion-color #fff);
    border-radius: 16px;
}
</style>
