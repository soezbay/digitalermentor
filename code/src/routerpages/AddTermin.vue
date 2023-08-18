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
                    <ion-input v-model="inputValue" :value="formattedDate" required />
                </ion-item>
                <ion-item>
                    <ion-label position="fixed">Uhrzeit</ion-label>
                    <ion-input v-model="inputValue" :value="formattedTime" required />
                    <ion-button id="open-picker">Open</ion-button>
                    <ion-picker trigger="open-picker" :columns="pickerColumns" :buttons="pickerButtons"></ion-picker>
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
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonDatetime, IonDatetimeButton, IonPicker,
    IonItem, IonList, IonLabel,
    IonButtons, IonBackButton, IonButton, IonMenuButton,
    IonFab, IonFabButton,
    IonIcon,
    IonTextarea, IonInput
} from '@ionic/vue';

export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
        IonDatetime, IonDatetimeButton, IonPicker,
        IonItem, IonList, IonLabel,
        IonButtons, IonBackButton, IonButton, IonMenuButton,
        IonFab, IonFabButton,
        IonIcon,
        IonTextarea, IonInput
    },
    setup() {
        const store = useStore();
        const inputValue = ref(''); // Initialisieren Sie inputValue mit leerem String

        const formattedDate = computed(() => {
            const selectedDate = store.getters.getSelectedDate;
            const formatted = selectedDate ? selectedDate.toLocaleString() : '';

            return formatted.slice(0, -10);
        });

        const formattedTime = computed(() => {
            const selectedDate = store.getters.getSelectedDate;
            const formatted = selectedDate ? selectedDate.toLocaleString() : '';

            return formatted.slice(11, -3);
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

        const pickerColumns = [
            {
                name: 'hours',
                options: generateOptions(24) // Generieren Sie Optionen für Stunden (0 bis 23)
            },
            {
                name: 'minutes',
                options: generateOptions(60) // Generieren Sie Optionen für Minuten (0 bis 59)
            }
        ];

        const pickerButtons = [
            {
                text: 'Abbrechen',
                role: 'cancel'
            },
            {
                text: 'Übernehmen',
                handler: (value) => {
                    const selectedHours = value.hours.text;
                    const selectedMinutes = value.minutes.text;

                    // Setzen Sie die ausgewählte Uhrzeit in das inputValue-Ref
                    inputValue.value = `${selectedHours}:${selectedMinutes}`;
                }
            }
        ];


        return {
            formattedDate,
            formattedTime,
            pickerColumns,
            pickerButtons
        };
    }
}
</script>