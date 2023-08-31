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
                <ion-header style="text-align: center; padding: 8%;">
                    <ion-label style="font-size: x-large; ">
                        {{ loadedTermin.titel }}
                    </ion-label>
                </ion-header><br>
                <div style="padding-left: 2%;">
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
    IonMenuButton,
    IonItem,
    IonLabel,
    IonList,
    IonFab, IonFabButton, IonIcon,
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
        IonMenuButton,
        IonLabel,
        IonList,
        IonFab,
        IonFabButton,
        IonFab, IonFabButton, IonIcon,
        IonBackButton
    },
    data() {
        return {
            terminId: this.$route.params.id,
        }
    },
    computed: {
        loadedTermin() {
            return this.$store.getters.termin(this.terminId);
        },
        formattedDate() {
            const unformattedDate = this.loadedTermin.datum;
            console.log(unformattedDate);
            const dateParts = unformattedDate.split('-');
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];
            return `${day}.${month}.${year}`;
        }
    },
    // watch: {
    //     '$route'(currentRoute) {
    //         this.terminId = currentRoute.params.id;
    //     }
    // }
}

</script>

<style scoped>
ion-titel {
    background-color: #27292b;
    height: 35px;
    padding-top: 8px;
    padding-left: 25px;
    font-size: larger;
    text-align: left;
}
</style>