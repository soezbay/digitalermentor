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
            <div v-else class="ion-padding">
                <ion-header>
                    <h1 class="ion-text-center">{{ loadedTermin.titel }}</h1>
                </ion-header><br>
                <ion-item>
                    <ion-label>{{ loadedTermin.datum }}, {{ loadedTermin.zeit }}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Ort: {{ loadedTermin.ort }}</ion-label>
                </ion-item>
                <br>
                <div>
                    Beschreibung:<br><br>
                    {{ loadedTermin.beschreibung }}
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