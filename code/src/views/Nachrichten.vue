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
				<ion-title>{{ texts.titel.nachrichten }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<h3 class="titel">{{ texts.nachrichten.mitteilungen }}</h3>
			<!-- Display the sent emails -->
			<ion-list>
        <ion-item v-for="email in sentEmails" :key="email.EmailID">
          <ion-label>{{ email.EmailInhalt }}</ion-label>
        </ion-item>
      </ion-list>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
	IonContent,
	IonButton,
	IonIcon,
	IonLabel,
	IonToggle,
	IonItem,
	IonAlert,
} from '@ionic/vue'
import axios from 'axios'
import { texts } from '../texts.js'

export default {
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonTitle,
		IonContent,
		IonButton,
		IonIcon,
		IonLabel,
		IonToggle,
		IonItem,
		IonAlert,
	},
	data() {
		return {
			
			showAlertModal: false,
			alertButtons: [],
      		texts,
	  		sentEmails: [], // Array to store sent emails
		}
	},
	methods: {
		async fetchSentEmails() {
      try {
        // Make a GET request to your backend API to fetch sent emails
        const response = await axios.get('http://localhost/email/Test123');
        this.sentEmails = response.data.Emails;
      } catch (error) {
        console.error('Error fetching sent emails:', error);
      }
    },
  },
};
</script>

<style scoped>
.titel {
	--ion-background-color: #00ff00; /* Grün als Hintergrundfarbe */
	color: white; /* Weiße Schriftfarbe, damit der Text sichtbar ist */
}
</style>
