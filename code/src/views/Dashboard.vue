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
            <div class="kalender">
                <ion-datetime ></ion-datetime>
            </div>



        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonButtons, IonMenuButton, IonItem, isPlatform } from '@ionic/vue';

export default {
    components: {
        IonPage,
        IonHeader, 
        IonToolbar,
        IonTitle,
        IonContent,
        IonDatetime,
        IonItem
    },
    setup() {

        const isDesktop = isPlatform('desktop');
        const isIos = isPlatform('ios');
        const isMd = isPlatform('mobile');

        return { isIos };
    }
}

let element = document.getElementsByClassName("kalender");
if (isPlatform("ios")) {
    element.className = 'browser-margin';
    
} else {
    element.className = 'custom-margin';
}

</script>

<style>
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

.custom-margin {
    /* Hier die allgemeine Margin für den Kalender, die auf allen Plattformen gilt */
    margin: auto;
}

.browser-margin {
    /* Hier die spezifische Margin für den Kalender, die nur im Browser gilt */
    margin: 0px;
}
</style>