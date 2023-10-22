<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button color="primary" router-link="/menu/studienziele"></ion-back-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Gelöschte Ziele</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-toolbar>
                <ion-buttons slot="end">
                    <ion-button color="danger" @click="deleteAllGoals()">Alle löschen</ion-button>
                </ion-buttons>
            </ion-toolbar>
            <!-- Aktuelles und nicht gewähltes Semester -->
            <ion-list class="drag-drop-containers">
                <ion-item-sliding v-for="goal in deletedGoals" :key="goal.id" class="drag-drop-box-item">
                    <ion-item color="secondary" class="item-container" lines="none">
                        <ion-label class="card-label">
                            <h2>{{ goal.titel }}</h2>
                            <p>{{ goal.info }}</p>
                            <p>{{ goal.date }}</p>
                        </ion-label>
                        <ion-label slot="end">
                            <p>{{ goal.date }}</p>
                        </ion-label>
                    </ion-item>
                    <ion-item-options>
                        <ion-item-option color="danger">
                            <ion-icon slot="icon-only" :icon="trash" @click="deleteGoalHandler(goal.id)"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>

        </ion-content>
    </ion-page>
</template>
    
<script>
import { trash } from 'ionicons/icons';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonMenuButton, IonButton, IonButtons, IonBackButton,
    IonItem,
    IonLabel, IonInput,
    IonList, IonListHeader,
    IonCard,
    IonRow,
    IonIcon,
    IonItemSliding, IonItemOptions, IonItemOption,
    IonModal,
    IonSelect, IonSelectOption,
    IonReorder, IonReorderGroup,
    alertController
} from '@ionic/vue';

export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
        IonItem,
        IonMenuButton, IonButton, IonButtons, IonBackButton,
        IonLabel, IonInput,
        IonList, IonListHeader,
        IonCard,
        IonRow,
        IonIcon,
        IonItemSliding, IonItemOptions, IonItemOption,
        IonModal,
        IonSelect, IonSelectOption,
        IonReorder, IonReorderGroup,
    },
    data() {
        return {
            trash
        };
    },

    methods: {
        deleteGoalHandler(goal_ID) {
            this.$store.dispatch('deleteGoalFinal', goal_ID);
            console.log('Gelöschte Ziele:', this.deletedGoals);
        },

        async deleteAllGoals() {
            const alert = await alertController.create({
                header: 'Bestätigung',
                message: 'Möchten Sie wirklich alle Ziele löschen?',
                buttons: [
                    {
                        text: 'Abbrechen',
                        role: 'cancel'
                    },
                    {
                        text: 'Löschen',
                        handler: () => {
                            this.$store.dispatch('deleteAllGoals');
                        }
                    }
                ]
            });
            await alert.present();
        }
    },

    computed: {
        deletedGoals() {
            return this.$store.getters.getDeletedGoals;
        }
    }
};
</script>
  
  
    
<style scoped>
.drag-drop-containers {
    display: block;
    justify-content: space-between;
    padding: 10px;
    padding-top: 0;
    padding-left: 20px;
    padding-right: 45px;
}

.drag-drop-box-item {
    height: 45px;
    margin: 10px;
    border-radius: 30px;
    text-align: left;
    background-color: var(--ion-color-secondary);
}

.drag-drop-box-item ion-icon {
    color: white;
}

.card-label {
    margin: 0;
    padding-left: 15px;
    font-weight: normal;
    color: black;
}

.card-label h2 {
    font-weight: bold;
}

.löschenButton {
    height: 27px;
    width: 27px;
    margin-left: 8px;
    margin-top: 4px;
    border: 2px solid #ccc;
    border-radius: 20px;
}
</style>