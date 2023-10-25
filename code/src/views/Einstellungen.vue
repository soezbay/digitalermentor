<!-- -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
        <ion-button router-link="/menu/dashboard">
          <ion-icon
            style="font-size: 45px"
            src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
        <ion-title>Einstellungen</ion-title>
      </ion-toolbar>
      
    </ion-header>
    <ion-content>
      <h3 class="titel">Mitteilungen</h3>
      <!-- Einstellungen für E-Mail-Benachrichtigungen -->
      <ion-item>
        <ion-label>E-Mail-Benachrichtigungen</ion-label>
        <ion-toggle v-model="emailNotifications"></ion-toggle>
      </ion-item>

      <!-- Einstellungen für Push-Benachrichtigungen -->
      <ion-item>
        <ion-label>Push-Benachrichtigungen</ion-label>
        <ion-toggle v-model="pushNotifications"></ion-toggle>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data() {
    return {
      emailNotifications: false, // Hier werden die E-Mail-Benachrichtigungen gespeichert
      pushNotifications: false, // Hier werden die Push-Benachrichtigungen gespeichert
    };
  },
  methods: {
saveSettings() {
  // Speichern Sie die Einstellungen auf dem Server und behandeln Sie die entsprechenden Aktionen.
  // Hier könnte eine Axios-Anfrage oder eine andere Methode zum Speichern von Einstellungen verwendet werden.
},
}
};

</script>

<style scoped>
.titel {
--ion-background-color: #00ff00; /* Grün als Hintergrundfarbe */
color: white; /* Weiße Schriftfarbe, damit der Text sichtbar ist */
}
</style>