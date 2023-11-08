<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button router-link="/menu/dashboard">
                        <ion-icon style="font-size: 45px;" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Dein Profil</ion-title>
                <ion-buttons slot="end">
                    <ion-button color="primary" router-link="/menu/profil/changeProfile">
                        <ion-icon slot="icon-only" :icon="create"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        
        <ion-content>
            <div id="imageContainer">
                <img style="border-bottom-left-radius: 25px; 
                border-bottom-right-radius: 25px;" 
                alt="" src="resources/Tafel.png" class="platzhalter" />
                <div id="pb">
                    <ion-avatar>
                        <img alt="" src="resources/Platzhalter_Digitaler_Mentor.png" />
                    </ion-avatar>
                </div>
            </div>
            <div style="height: 70px;"></div>
            <div style="text-align: center;">
                <h1>Name</h1>
                <h4>Max Mustermann</h4>

                <h1>Matrikel Nr.</h1>
                <h4>202021000</h4>

                <h1>Studiengang</h1>
                <h4>Informatik (B.Sc)</h4>

                <h1>Fachsemster</h1>
                <h4 style="margin-bottom: 0px;">4</h4>

                <h1>Email</h1>
                <h4>max.mustermann@studmail.w-hs.de</h4>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { create } from 'ionicons/icons';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonButtons, IonBackButton, IonMenuButton, IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonFab, IonFabButton,
    IonIcon,
    IonAvatar
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
        IonButtons, IonBackButton, IonMenuButton, IonButton,
        IonLabel,
        IonList,
        IonFab,
        IonFabButton,
        IonIcon,
        IonAvatar
    },
    setup() {
        return { create };
    }
}
</script>

<style scoped>
#imageContainer {
    position: relative; 
    display: flex;
    align-items: center;
    justify-content: center;
}

#pb {
    position: absolute;
    bottom: -80px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    padding: 10px;

}

ion-content ion-header {
    font-size: 150%;
    padding: 10px;
}

ion-avatar {
    width: 200px;
    height: 200px;
    border: 5px solid white;
    
}

h1 {
    color: #8C9900;
}

h4 {
    margin: -7px;
    margin-bottom: 30px;
}

@media screen and (min-width: 768px) {
    .platzhalter {
        width: 760px;
        height: 300px;
       

    }

}
</style>
