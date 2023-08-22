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
            <ion-header router-link="/menu/ziele" id="zieleHeader">Aktive Ziele:</ion-header>
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
            <br>
            <ion-header router-link="/menu/dashboard/termine" id="zieleHeader">Termine:</ion-header>
            <div>
                <ion-item>
                    <ion-label>xyz</ion-label>
                </ion-item>
            </div><br>
            <div id="kalender">
                <ion-datetime size="fixed" max="2100-01-01T00:00:00"></ion-datetime>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonButtons, IonMenuButton, IonItem, IonLabel, IonList } from '@ionic/vue';
import axios from 'axios';

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
        IonList
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

#zieleHeader {
    height: 35px;
    padding-top: 8px;
    padding-left: 25px;
    font-size: larger;
    text-align: left;
}

#module {
    height: 20px;
}

ion-datetime {
    margin: auto;
    border-radius: 16px;
}
</style>
