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
            <ion-header>
                <ion-title v-if="!loadedTermin">Dieser Termin existiert nicht</ion-title>
                <ion-title v-else>{{ loadedTermin.titel }}</ion-title>
            </ion-header>
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