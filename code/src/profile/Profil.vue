<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Dein Profil</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <IonGrid>
                <IonRow>
                    <ion-col>
                        <div id="imageContainer">
                            <img style="border-radius: 25px;" alt="" src="resources/SleepingKoala.jpg" />
                            <div id="pb">
                                <ion-avatar>
                                    <img alt="" src="resources/icon.png" />
                                </ion-avatar>
                            </div>
                        </div>
                    </ion-col>
                </IonRow>
                <div style="height: 60px;"></div>
                <ion-row>
                    <ion-col style="text-align: center;">
                        <div>
                            <h1>Name</h1>
                            <h4>Max Mustermann</h4>

                            <h1>Studiengang</h1>
                            <h4>Informatik (B.Sc)</h4>

                            <h1>Fachsemster</h1>
                            <h4 style="margin-bottom: 0px;">4</h4>

                            <h1>Email</h1>
                            <h4>Max Mustermann</h4>
                        </div>
                    </ion-col>
                </ion-row>
            </IonGrid>
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
    IonButtons, IonBackButton, IonMenuButton,
    IonItem,
    IonLabel,
    IonList,
    IonFab, IonFabButton,
    IonIcon,
    IonAvatar,
    IonRow,
    IonCol,
    IonGrid

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
        IonButtons, IonBackButton, IonMenuButton,
        IonLabel,
        IonList,
        IonFab,
        IonFabButton,
        IonFab, IonFabButton,
        IonIcon,
        IonAvatar,
        IonRow,
        IonCol,
        IonGrid
    }
}
</script>

<style scoped>
#imageContainer {
    position: relative;
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
