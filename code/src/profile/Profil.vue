<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Dein Profil</ion-title>
                <ion-buttons slot="start">
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
                <img style="border-radius: 25px;" alt="" src="resources/KoalaSleeping.jpg" />
                <div id="pb">
                    <ion-avatar>
                        <img alt="" src="resources/icon.png" />
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
        IonFab, IonFabButton,
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
    margin: 5px;
    margin-top: 10px;
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
    width: 170px;
    height: 170px;
}

ion-avatar img {
    border: 5px solid #ffffff;
}

h1 {
    color: #8C9900;
}

h4 {
    margin: -7px;
    margin-bottom: 30px;
}
</style>
