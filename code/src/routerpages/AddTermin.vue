<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons>
                    <ion-back-button></ion-back-button>
                    <ion-menu-button color="primary"></ion-menu-button>
                    <ion-title>Termine</ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label position="floating">Titel</ion-label>
                    <ion-input type="text" placeholder="" required />
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
                    <ion-label position="floating">Ort</ion-label>
                    <ion-input type="text" placeholder="" />
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Beschreibung</ion-label>
                    <ion-textarea rows="5" placeholder="" />
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonDatetime, IonDatetimeButton, IonPicker, IonModal,
    IonItem, IonList, IonLabel,
    IonButtons, IonBackButton, IonButton, IonMenuButton,
    IonFab, IonFabButton,
    IonIcon,
    IonTextarea, IonInput
} from '@ionic/vue';

export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
        IonDatetime, IonDatetimeButton, IonPicker, IonModal,
        IonItem, IonList, IonLabel,
        IonButtons, IonBackButton, IonButton, IonMenuButton,
        IonFab, IonFabButton,
        IonIcon,
        IonTextarea, IonInput
    },
    setup() {
        const store = useStore();
        const inputValueTime = ref(''); // Initialisieren Sie inputValue mit leerem String
        const inputValueDate = ref('');

        const formattedDate = computed(() => {
            const selectedDate = store.getters.getSelectedDate;

            const formatted = selectedDate ? selectedDate.toLocaleString().slice(0, -10) : '';
            const parts = formatted.split(".");

            if (parts[1].length === 2 && parts[2].length === 2) {

                console.log(`${parts[2]}-${parts[1]}-${parts[0]}`);
                return `${parts[2]}-${parts[1]}-${parts[0]}`;

            } else if (parts[1].length === 1 && parts[2].length === 2) {

                console.log(`${parts[2]}-0${parts[1]}-${parts[0]}`);
                return `${parts[2]}-0${parts[1]}-${parts[0]}`;

            } else if (parts[1].length === 2 && parts[2].length === 1) {

                console.log(`0${parts[2]}-${parts[1]}-${parts[0]}`);
                return `0${parts[2]}-${parts[1]}-${parts[0]}`;

            } else if (parts[1].length === 1 && parts[2].length === 1) {

                console.log(`0${parts[2]}-0${parts[1]}-${parts[0]}`);
                return `0${parts[2]}-0${parts[1]}-${parts[0]}`;

            }

        });

        console.log(formattedDate.value);

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
            inputValueTime,
            inputValueDate,
            formattedDate,
            formattedTime,
            pickerColumnsTime,
            pickerButtonsTime,
        };
    },
    methods: {
        formatDate() {
            const parts = this.originalDate.split("."); // Trenne die Teile der Original-Zeichenkette
            const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`; // Stelle das Datum im gewünschten Format zusammen
            this.formattedDate = formatted;
        },
    },
}
</script>