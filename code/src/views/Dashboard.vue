<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons>
                    <ion-menu-button color="primary"></ion-menu-button>
                    <ion-title>Dashboard</ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-header id="displayUsername">{{ getGreeting() }}, {{ getUsername() }}</ion-header>
            <ion-list-header color="primary" router-link="/menu/ziele" id="header" >
                <ion-label>
                    Aktive Ziele
                </ion-label>
            </ion-list-header>
            <div id="flexbox1">
                <ion-item lines="none">
                    <ion-label>EPR</ion-label>
                </ion-item>
                <ion-item lines="none">
                    <ion-label>ADS</ion-label>
                </ion-item>
                <ion-item lines="none">
                    <ion-label>ADS</ion-label>
                </ion-item>
                <ion-item lines="none">
                    <ion-label>ADS</ion-label>
                </ion-item>
                <ion-item lines="none">
                    <ion-label>INP</ion-label>
                </ion-item>
            </div>
            <ion-header style="height: 0.3%;"></ion-header>
            <ion-list-header color='primary' router-link="/menu/dashboard/termine" id="header">
                <ion-label>
                    Termine
                </ion-label>
            </ion-list-header>
            <div>
                <ion-item>
                    <ion-label v-for="termin in termine" :router-link="`/termine/${termin.id}`">
                        <h2>{{ termin.titel }}</h2>
                        <h3>{{ termin.datum }}, {{ termin.zeit }}</h3>
                    </ion-label>
                </ion-item>
            </div><br>
            <div id="kalender">
                <ion-datetime :highlighted-dates="highlightedDates" size="cover" max="2100-01-01T00:00:00"></ion-datetime>
            </div>
            <!-- HIER ERSTMAL NUR KONZEPT WIE MODULE MÖGLICHERWEISE AUS DEM SERVER GEHOLT WERDEN -->
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
            </ion-list>
        </ion-content>
    </ion-page>
</template>
            

<script>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonList, IonListHeader
} from '@ionic/vue';

import axios from 'axios';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonDatetime,
        IonItem,
        IonButtons,
        IonMenuButton,
        IonLabel,
        IonList, IonListHeader
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


        return {
            highlightedDates,
        };
    },
    data() {
        return {
            usersList: []
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
                return 'Guten Mittag';
            } else {
                return 'Schönen Abend';
            }
        },

        getUsername() {
            return 'Username' + '!';

        }
    },
    mounted() {
        this.getData();
    },
    computed: {
        termine() {
            return this.$store.getters.termine;
        }
    }
}
</script>

<style scoped>
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

.ios #flexbox1 ion-item {
    margin: 1%;
    width: 85px;
    text-align: center;
}


#displayUsername {
    padding: 20px;
    font-size: x-large;
    text-align: center;
}

#header {
    /* height: 35px;
    padding-top: 8px;
    padding-left: 25px; */
    padding-right: 5%;
    font-size: larger;
    text-align: center;
}

#module {
    height: 20px;
}

ion-datetime {
    --background: #D7D5D5;
    color: black;
    border-radius: 16px;
    }
</style>
