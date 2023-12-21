<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button color="primary" router-link="/menu/dashboard/termine"></ion-back-button>
                </ion-buttons>
                <ion-title>Termine hinzufügen</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <form @submit.prevent="submitFormTermin">
                <ion-list>
                    <ion-datetime :presentation="'date'" size="cover" v-model="enteredDatum" display-format="YYYY-MM-DD"
                        required>
                    </ion-datetime>
                    <ion-item>
                        <ion-label position="fixed">Titel</ion-label>
                        <ion-input type="text" required v-model="enteredTitel" />
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Uhrzeit</ion-label>
                        <ion-input type="time" v-model="enteredZeit" required />
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Ort</ion-label>
                        <ion-input type="text" v-model="enteredOrt" />
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Beschreibung</ion-label>
                        <ion-textarea rows="5" v-model="enteredBeschreibung" />
                    </ion-item>
                </ion-list>
                <ion-toolbar class="ion-padding">
                    <ion-buttons slot="start">
                        <ion-button type="reset" fill="outline" color="danger">Löschen</ion-button>
                    </ion-buttons>
                    <ion-buttons slot="end">
                        <ion-button type="submit" fill="solid" color="primary">Speichern</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </form>
        </ion-content>
    </ion-page>
</template>

<script>
import { useStore } from 'vuex';

import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonDatetime, IonDatetimeButton, IonPicker, IonModal,
    IonItem, IonList, IonLabel,
    IonButtons, IonBackButton, IonButton, IonMenuButton,
    IonFab, IonFabButton,
    IonIcon,
    IonTextarea, IonInput,
} from '@ionic/vue';


export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
        IonDatetime, IonDatetimeButton, IonPicker, IonModal,
        IonItem, IonList, IonLabel,
        IonButtons, IonBackButton, IonButton, IonMenuButton,
        IonFab, IonFabButton,
        IonIcon,
        IonTextarea, IonInput,
    },
    data() {
        return {
            enteredTitel: '',
            enteredDatum: '',
            enteredZeit: '',
            enteredOrt: '',
            enteredBeschreibung: '',
        }

    },
    mounted() {
        // Hier setzen wir enteredDatum und enteredZeit auf die entsprechenden Werte
        this.enteredDatum = this.getDate();
        this.enteredZeit = this.getTime();
    },
    methods: {
        saveTermin(terminData) {
            console.log('3. Dispatching in Vuex Store......................');
            this.$store.dispatch('addTermin', terminData);
            console.log('4. Replace URL......................');
            this.$router.go(-1);
        },

        submitFormTermin() {
            console.log('1. Sende Termin Daten......................')
            const terminData = {
                enteredTitel: this.enteredTitel,
                enteredDatum: this.enteredDatum,
                enteredZeit: this.enteredZeit,
                enteredOrt: this.enteredOrt,
                enteredBeschreibung: this.enteredBeschreibung,
            };
            console.log(terminData);
            console.log('2. Call Emit......................');
            this.saveTermin(terminData);
        },
        getDate() {
            const store = useStore();
            const selectedDate = store.getters.getSelectedDate;
            console.log('SelectedDate:' + selectedDate)

            const unformattedDate = selectedDate ? selectedDate.toLocaleString().slice(0, -10) : '';

            const parts = unformattedDate.split(".");

            if (parts.length !== 3) {
                return ''; // Fallback für ungültige Daten
            }
            const formatted = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            console.log('formattedDate in compute:' + formatted);
            return formatted;
        },
        getTime() {
            const store = useStore();
            const selectedDate = store.getters.getSelectedDate;
            const formatted = selectedDate ? selectedDate.toLocaleString().slice(0, -3) : '';

            return formatted.slice(-5);
        }
    },
}
</script>