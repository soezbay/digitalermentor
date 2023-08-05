<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons>
                    <ion-menu-button color="primary"></ion-menu-button>
                    <ion-title>Dashboard</ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-header id="displayUsername">Hallo, 'Username'!</ion-header>
            <ion-header id="zieleHeader">Aktive Ziele</ion-header><br>
            <ion-datetime></ion-datetime>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonButtons, IonMenuButton, IonItem } from '@ionic/vue';

export default {
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonDatetime,
        IonItem
    }
}

</script>

<style scoped>
ion-content {
    display: flex;
}

#displayUsername {
    padding: 30px;
    font-size: xx-large;
    text-align: center;
}

#zieleHeader {
    background-color: #27292b;
    padding: 20px;
    font-size: x-large;
    text-align: center;
}

ion-item {
    text-align: center;
    margin: auto;
}

ion-datetime {
    margin: auto;
}
</style>