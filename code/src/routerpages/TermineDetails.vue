<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons>
                    <ion-back-button color="primary" router-link="/menu/dashboard/termine"></ion-back-button>
                    <ion-title>Termin Details</ion-title>
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-title v-if="!loadedTermin">Dieser Termin existiert nicht</ion-title>
            <div v-else>
                <!-- Überprüfen, ob der Bearbeitungsmodus aktiv ist -->
                <ion-header v-if="!editingMode" style="text-align: center; padding: 8%;">
                    <ion-label style="font-size: x-large; ">
                        {{ loadedTermin.titel }}
                    </ion-label>
                </ion-header><br>
                <div v-if="!editingMode" style="padding-left: 2%;">
                    <ion-item>
                        <ion-label style="font-size: larger;">
                            Datum: {{ formattedDate }}<br><br>
                            Uhrzeit: {{ loadedTermin.zeit }}
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>Ort: {{ loadedTermin.ort }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            Beschreibung:<br><br>
                            {{ loadedTermin.beschreibung }}
                        </ion-label>
                    </ion-item>
                    <!-- Schaltfläche, um den Bearbeitungsmodus zu aktivieren -->
                    <ion-toolbar class="ion-padding">
                        <ion-buttons slot="start">
                            <ion-button @click="deleteTermin" color="danger" :fill="'outline'">Löschen</ion-button>
                        </ion-buttons>
                        <ion-buttons slot="end">
                            <ion-button @click="startEditing" color="primary" :fill="'solid'">Bearbeiten</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </div>
                <!-- Bearbeitungsmodus -->
                <div v-else>
                    <form @submit.prevent="saveChanges">
                        <ion-item>
                            <ion-label position="fixed">Titel</ion-label>
                            <ion-input type="text" v-model="editedTermin.titel" required />
                        </ion-item>
                        <ion-datetime :presentation="'date'" size="cover" v-model="editedTermin.datum"
                            display-format="YYYY-MM-DD" required></ion-datetime>
                        <ion-item>
                            <ion-label position="fixed">Uhrzeit</ion-label>
                            <ion-input type="time" v-model="editedTermin.zeit" required />
                        </ion-item>
                        <ion-item>
                            <ion-label position="fixed">Ort</ion-label>
                            <ion-input type="text" v-model="editedTermin.ort" />
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Beschreibung</ion-label>
                            <ion-textarea rows="5" v-model="editedTermin.beschreibung" />
                        </ion-item>
                        <ion-toolbar class="ion-padding">
                            <ion-buttons slot="start">
                                <ion-button @click="cancelEditing" fill="outline" color="danger">Abbrechen</ion-button>
                            </ion-buttons>
                            <ion-buttons slot="end">
                                <ion-button type="submit" fill="solid" color="primary">Speichern</ion-button>
                            </ion-buttons>
                        </ion-toolbar>

                    </form>
                </div>
            </div>
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
    IonButton,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput,
    IonBackButton
} from '@ionic/vue';

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
        IonButton,
        IonMenuButton,
        IonLabel,
        IonTextarea,
        IonInput,
        IonBackButton
    },
    data() {
        return {
            terminId: this.$route.params.id,
            editingMode: false,
            editedTermin: null,
        };
    },
    computed: {
        loadedTermin() {
            return this.$store.getters.termin(this.terminId);
        },
        formattedDate() {
            const unformattedDate = this.loadedTermin.datum;
            const dateParts = unformattedDate.split('-');
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];
            return `${day}.${month}.${year}`;
        }
    },
    methods: {
        startEditing() {
            // Im Bearbeitungsmodus erstellen Sie eine Kopie des geladenen Termins
            this.editedTermin = { ...this.loadedTermin };
            this.editingMode = true;
        },
        cancelEditing() {
            // Abbrechen des Bearbeitungsmodus und Zurücksetzen auf den ursprünglichen Termin
            this.editedTermin = null;
            this.editingMode = false;
        },
        saveChanges() {
            // Hier können Sie die geänderten Daten speichern, z.B. im Vuex Store
            this.$store.dispatch('updateTermin', this.editedTermin);
            this.editedTermin = null;
            this.editingMode = false;
        },
        deleteTermin() {
            // Hier können Sie den Termin löschen, z.B. durch Aufrufen einer Aktion im Vuex Store
            if (this.loadedTermin) {
                const terminId = this.loadedTermin.id; // Nehmen Sie an, dass Ihre Terminobjekte eine eindeutige ID haben
                this.$store.dispatch('deleteTermin', terminId); // Rufen Sie eine Aktion im Vuex Store auf, um den Termin zu löschen
                // Anschließend können Sie zur vorherigen Seite zurückkehren oder eine andere gewünschte Aktion ausführen.
                this.$router.push('/menu/dashboard/termine'); // Beispiel: Zurück zur Terminliste
            }
        },
    }
};
</script>
