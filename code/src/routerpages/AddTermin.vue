<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons>
                    <ion-back-button color="primary" router-link="/menu/dashboard/termine"></ion-back-button>
                    <ion-title>Termine hinzufügen</ion-title>
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <form @submit.prevent="submitFormTermin">
                <ion-list>
                    <ion-item>
                        <ion-label position="fixed">Titel</ion-label>
                        <ion-input type="text" required v-model="enteredTitel"/>
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Datum</ion-label>
                        <ion-input type="date" :value="formattedDate" required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Uhrzeit</ion-label>
                        <ion-input v-model="inputValueTime" required />
                        <ion-button id="open-picker">Ändern</ion-button>
                        <ion-picker trigger="open-picker" :columns="pickerColumnsTime"
                            :buttons="pickerButtonsTime"></ion-picker>
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Ort</ion-label>
                        <ion-input type="text" v-model="enteredOrt"/>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Beschreibung</ion-label>
                        <ion-textarea rows="5" v-model="enteredBeschreibung"/>
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
import { ref, computed } from 'vue';
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
    setup() {
      
        const store = useStore();
        const inputValueTime = ref(''); // Initialisieren Sie inputValue mit leerem String
        const inputValueDate = ref('');

        const formattedDate = computed(() => {

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
        });

        console.log(formattedDate);


        const formattedTime = computed(() => {
            const selectedDate = store.getters.getSelectedDate;
            const formatted = selectedDate ? selectedDate.toLocaleString().slice(0, -3) : '';

            return formatted.slice(-5);
        });

        const generateOptions = (maxValue) => {
            const optionsArray = [];
            for (let i = 0; i < maxValue; i++) {
                const value = i.toString().padStart(2, '0'); // Füllen Sie mit führender Null auf, wenn nötig
                optionsArray.push({
                    text: value,
                    value
                });
            }
            return optionsArray;
        };

        const pickerColumnsTime = [
            {
                name: 'hours',
                options: generateOptions(24) // Generieren Sie Optionen für Stunden (0 bis 23)
            },
            {
                name: 'minutes',
                options: generateOptions(60) // Generieren Sie Optionen für Minuten (0 bis 59)
            }
        ];

        const pickerButtonsTime = [
            {
                text: 'Abbrechen',
                role: 'cancel'
            },
            {
                text: 'Übernehmen',
                handler: (value) => {
                    const selectedHours = value.hours.value;
                    const selectedMinutes = value.minutes.value;

                    inputValueTime.value = `${selectedHours}:${selectedMinutes}`;
                }
            }
        ];



        inputValueTime.value = formattedTime.value;
        inputValueDate.value = formattedDate;


        return {
            // selectedDate,
            inputValueTime,
            inputValueDate,
            formattedDate,
            formattedTime,
            pickerColumnsTime,
            pickerButtonsTime,
        };
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
                enteredDatum: this.formattedDate,
                enteredZeit: this.formattedTime,
                enteredOrt: this.enteredOrt,
                enteredBeschreibung: this.enteredBeschreibung,           
            };
            console.log(terminData);
            console.log('2. Call Emit......................');
            this.saveTermin(terminData);
        }
    }
}
</script>