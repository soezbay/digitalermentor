<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button router-link="/menu/dashboard">
						<ion-icon style="font-size: 45px" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-buttons slot="end">
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
				<ion-title>{{ texts.titel.einstellungen }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<h3 class="titel">{{ texts.einstellungen.mitteilungen }}</h3>
			<!-- Einstellungen für E-Mail-Benachrichtigungen -->
			<ion-item>
				<ion-label>{{ texts.einstellungen.email }}</ion-label>
				<ion-toggle v-model="emailNotifications"></ion-toggle>
			</ion-item>

			<!-- Einstellungen für Push-Benachrichtigungen -->
			<ion-item>
				<ion-label>{{ texts.einstellungen.push }}</ion-label>
				<ion-toggle v-model="pushNotifications"></ion-toggle>
			</ion-item>
			<ion-item>
				<ion-button id="Delete_Cache" @click="showAlert">
					{{texts.einstellungen.loeschen }}
				</ion-button>
				<ion-alert trigger="Delete_Cache" v-show="showAlertModal" class="custom-alert"
					:header="texts.einstellungen.loeschenBestaetigung" :buttons="alertButtons"></ion-alert>
			</ion-item>
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
			emailNotifications: false, // Hier werden die E-Mail-Benachrichtigungen gespeichert
			pushNotifications: false, // Hier werden die Push-Benachrichtigungen gespeichert
			showAlertModal: false,
			alertButtons: [],
			texts,
		}
	},
	methods: {
		saveSettings() {
			// Speichern Sie die Einstellungen auf dem Server und behandeln Sie die entsprechenden Aktionen.
			// Hier könnte eine Axios-Anfrage oder eine andere Methode zum Speichern von Einstellungen verwendet werden.
		},
		showAlert() {
			this.showAlertModal = true // Set the property to true to show the alert
		},
		async deleteCache() {
			// const BenutzerID = this.$store.dispatch('getTestBenutzer');
			// await axios.delete(`http://localhost:8000/cache/${BenutzerID}`);
			this.$store.dispatch('deleteCache')
			console.log('Cache deleted!')
		},
	},
	mounted() {
		const alert = document.querySelector('ion-alert')

		alert.buttons = [
			{
				text: 'Nein',
				// cssClass: 'alert-button-cancel',
				handler: () => {
					this.showAlertModal = false // Close the alert
				},
			},
			{
				text: 'Ja',
				// cssClass: 'alert-button-confirm',
				handler: () => {
					this.deleteCache() // Execute the deleteCache method
					this.showAlertModal = false // Close the alert
				},
			},
		]
	},
}
</script>

<style scoped>
.titel {
	--ion-background-color: #00ff00;
	/* Grün als Hintergrundfarbe */
	color: white;
	/* Weiße Schriftfarbe, damit der Text sichtbar ist */
}

/* move to the left */
ion-title {
	margin-left: -5px;
}
</style>
