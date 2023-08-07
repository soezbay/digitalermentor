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
        <ion-datetime></ion-datetime>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
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
  </style>
  