<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button color="primary" router-link="/menu/profil"></ion-back-button>
                </ion-buttons>
                <ion-title>Profil Bearbeiten</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div style="height: 40px;"></div>
            <form action="">
                <ion-avatar style="margin: auto;">
                    <img alt="" src="resources/icon.png" />
                </ion-avatar>
                <ion-list>
                    <ion-item>
                        <ion-label position="fixed">Vorname:</ion-label>
                        <ion-input type="text" required/>
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Nachname:</ion-label>
                        <ion-input type="text" required/>
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Studiengang:</ion-label>
                        <ion-input type="number" required/>
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Semester:</ion-label>
                        <ion-input type="text" required/>
                    </ion-item>
                    <br><br>
                    <ion-item>
                        <ion-label position="stacked">Email:</ion-label>
                        <ion-input type="email" required/>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Passwort:</ion-label>
                        <ion-input type="text" required/>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Passwort wiederholen</ion-label>
                        <ion-input type="password" required/>
                    </ion-item>
                    <ion-toolbar class="ion-padding">
                    <ion-buttons>
                        <ion-button style="margin: auto;" type="submit" fill="solid" color="primary">Übernehmen</ion-button>
                    </ion-buttons>
                </ion-toolbar>
                </ion-list>
            </form>
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
    IonInput
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
        IonInput
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
