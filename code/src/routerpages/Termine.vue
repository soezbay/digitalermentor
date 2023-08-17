<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons>
                    <ion-back-button></ion-back-button>
                    <ion-menu-button color="primary" ></ion-menu-button>
                    <ion-title>Termine</ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button>
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
            <ion-datetime size="cover" max="2100-01-01T00:00:00"></ion-datetime>
            <ion-list>
                <ion-item-sliding v-for="termin in termine" :router-link="`/termine/${termin.id}`" :key="termin.id">
                    <ion-item>
                        <ion-label>
                            <h2>{{ termin.titel }}</h2>
                            <h3>{{ termin.datum }}, {{ termin.zeit }}</h3>
                        </ion-label>
                    </ion-item>
                        <ion-item-options>
                            <ion-item-option color="danger">Delete</ion-item-option>
                        </ion-item-options>
                </ion-item-sliding>
            </ion-list>
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
import { add, colorPalette, document, globe } from 'ionicons/icons';

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
        IonFab, IonFabButton, IonIcon,
        IonItemSliding, IonItemOptions, IonItemOption
    },
    setup() {
        return { add, colorPalette, document, globe };
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
</style>