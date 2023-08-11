<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons>
                    <ion-menu-button color="primary"></ion-menu-button>
                    <ion-title>Deine Ziele</ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <section>
                <br>
                <ion-header class="header1">Sommersemester</ion-header>
                <div id="flexbox1">
                    <IonItem>
                        <ion-label>EPR</ion-label>
                    </IonItem>
                    <IonItem>
                        <ion-label>ADS</ion-label>
                    </IonItem>
                    <IonItem>
                        <ion-label>ADS</ion-label>
                    </IonItem>
                    <IonItem>
                        <ion-label>ADS</ion-label>
                    </IonItem>
                    <IonItem>
                        <ion-label>ADS</ion-label>
                    </IonItem>
                    <IonItem>
                        <ion-label>ADS</ion-label>
                    </IonItem>
                    <IonItem>
                        <ion-label>INP</ion-label>
                    </IonItem>          
                </div>
            </section>
            <br>
            <section>
                <ion-header class="header1">Wintersemester</ion-header>
                 <div id="flexbox1">
                    <IonItem>
                        <ion-label>ADS</ion-label>
                    </IonItem>
                    <IonItem>
                        <ion-label>ADS</ion-label>
                    </IonItem>
                    <IonItem>
                        <ion-label>INP</ion-label>
                    </IonItem>                      
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
        IonLabel
    }
}

</script>

<style scoped>

.header1 {
    background-color: #27292b;
    padding: 16px;
    font-size: x-large;
    text-align: center;
}

#flexbox1 {
    padding-top: 2%;
    padding-bottom: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #27292b;
}

ion-item {
    padding: 1%;
    background-color: #27292b;
}

ion-label {
   
}



</style>