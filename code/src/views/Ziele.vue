<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button router-link="/menu/dashboard">
                        <ion-icon style="font-size: 45px;" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Ziele</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <section>
                <br>
                <ion-header class="header1">Sommersemester</ion-header>
                <div id="flexbox1">
                    <ion-item lines="none">
                        <ion-label>EPR</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label>ADS</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label>ADS</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label>ADS</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label>ADS</ion-label>
                    </ion-item>       
                </div>
            </section>
            <br>
            <section>
                <ion-header class="header1">Wintersemester</ion-header>
                 <div id="flexbox1">
                    <ion-item>
                        <ion-label>INP</ion-label>
                    </ion-item>                      
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonItem, IonLabel } from '@ionic/vue';


export default {
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonItem,
        IonButtons,
        IonMenuButton,
        IonLabel,
    }
}

</script>

<style scoped>

.header1 {
    background-color: #27292b;
    padding: 10px;
    font-size: x-large;
    text-align: center;
}

#flexbox1 {
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #27292b;
}

#flexbox1 ion-item {
    margin: 1%;
    width: 85px;
    text-align: center;
    border-radius: 20px;
    background-color: #27292b;
}




</style>