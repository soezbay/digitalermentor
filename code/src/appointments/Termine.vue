<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Termine</ion-title>
                <ion-buttons slot="start">
                    <ion-back-button color="primary" router-link="/menu/dashboard"></ion-back-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-datetime presentation="date-time" :highlighted-dates="highlightedDates" size="cover"
                max="2200-01-01T00:00:00" v-model="selectedDate" display-format="D MM YYYY HH:mm" first-day-of-week="1"></ion-datetime>
            <div v-if="termine.length > 0">
                <ion-list>
                    <ion-item-sliding v-for="termin in termine" :router-link="`/termine/${termin.id}`" :key="termin.id">
                        <ion-item>
                            <ion-label>
                                <h2>{{ termin.titel }}</h2>
                                <h3>{{ termin.ort }}</h3>
                            </ion-label>
                            <ion-label slot="end">
                                <h2>{{ formatDate(termin.datum) }} - {{ termin.zeit }}</h2>
                            </ion-label>
                        </ion-item>
                        <ion-item-options>
                            <ion-item-option style="margin-bottom: 0.5px;" color="danger" @click="deleteTermin(termin.id)">
                                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                    </ion-item-sliding>
                </ion-list>
            </div>
            <div v-else>
                <ion-item style="text-align: center;">
                    <ion-label>
                        <h2>Keine Termine für diesen Monat.</h2>
                    </ion-label>
                </ion-item>
            </div>

            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button router-link="/menu/dashboard/termine/add_termin" @click="saveDate">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
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
    IonButtons, IonMenuButton, IonBackButton,
    IonItem,
    IonLabel,
    IonList,
    IonFab, IonFabButton, IonIcon,
    IonItemSliding, IonItemOptions, IonItemOption,

} from '@ionic/vue';
import { add, trash } from 'ionicons/icons';
import { ref, computed } from 'vue';
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
        IonButtons, IonMenuButton, IonBackButton,
        IonLabel,
        IonList,
        IonFab,
        IonFabButton,
        IonIcon,
        IonItemSliding, IonItemOptions, IonItemOption
    },
    setup() {
        const selectedDate = ref(null);
        const store = useStore();

        const saveDate = () => {
            if (selectedDate.value) {
                store.dispatch('saveSelectedDate', new Date(selectedDate.value));
            }
        }

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
            //     const parts = dateString.split('-');
            //     if (parts.length === 3) {
            //         const [year, month, day] = parts;
            //         return `${day}.${month}.${year}`;
            //     }
            //     return dateString; // Rückgabe des ursprünglichen Datums, falls das Format ungültig ist
            // };

            // show date as dd-mm-yyyy in termine
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1; // Monate in JavaScript sind 0-basiert
            const year = date.getFullYear();

            return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
        };

        const deleteTermin = (terminId) => {
            store.dispatch('deleteTermin', terminId);
        };

        return {
            add,
            selectedDate,
            highlightedDates,
            saveDate,
            formatDate,
            deleteTermin,
            trash
        };
    },

    computed: {
        termine() {
            return this.$store.getters.termine;
        }
    }
}


</script>

<style scoped>
p {
    padding-left: 70%;
}

/* background color termine */
ion-item-sliding ion-item {
    --background: var(--ion-color-secondary);
}
</style>