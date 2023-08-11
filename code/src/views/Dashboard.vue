<template>
    <ion-page>
<<<<<<< code/src/views/Dashboard.vue
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
            <section>
            <ion-header id="zieleHeader">Aktive Ziele:</ion-header>
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
                        <ion-label>INP</ion-label>
                    </IonItem>    
                </div>
            </section>
            <br>
            <section>
            <ion-header id="zieleHeader">Termine:</ion-header>
                <div>
                    <IonItem>
                        <ion-label>xyz</ion-label>
                    </IonItem>  
                </div>
            </section>
            <div id="kalender">
                <ion-datetime size="cover"></ion-datetime>
            </div>
            <ion-list>
          <ion-item v-for="(item, index) in usersList" :key="index">
            <ion-label>
              <p><strong>BewertungsID:</strong> {{ item.BewertungsID }}</p>
              <p><strong>BewertungsGruppe:</strong> {{ item.BewertugsGruppe }}</p>
              <p><strong>Bewertung:</strong> {{ item.Bewertung }}</p>
              <p><strong>ErstelltAm:</strong> {{ item.ErstelltAm }}</p>
              <p><strong>Kuerzel:</strong> {{ item.Kuerzel }}</p>
              <p><strong>BenutzerID:</strong> {{ item.BenutzerID }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
        </ion-content>
    </ion-page>
</template>

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonButtons, IonMenuButton, IonItem, IonLabel, IonList } from '@ionic/vue';
  import axios from 'axios';
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
      IonList
    },
    data() {
      return {
        usersList: []
      }
    },
    methods: {
      getData() {
        axios.get('http://localhost:3000/bewertung').then(Response => {
          console.log(Response.data)
          this.usersList = Response.data.bewertungen;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.getData();
    }
  }
  </script>

<style scoped>

#flexbox1 {
    padding-top: 2%;
    padding-bottom: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    background-color: #27292b;
}

ion-item {
    padding: 1%;
    background-color: #27292b;
}

#displayUsername {
    padding: 20px;
    font-size: xx-large;
    text-align: center;
}

#zieleHeader {
    background-color: #27292b;
    height: 35px;
    padding-top: 8px;
    padding-left: 25px;
    font-size: larger;
    text-align: left;
}

</style>
