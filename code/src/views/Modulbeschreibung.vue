<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
					<ion-button color="medium" @click="cancel">Zurück</ion-button>
				</ion-buttons>
				<ion-title>Modal</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-item>
				<ion-input
					label-placement="stacked"
					label="Enter your name"
					v-model="name"
					placeholder="Your name"></ion-input>
			</ion-item>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonButton,
	IonItem,
	IonInput,
	modalController,
	IonDatetime,
	IonLabel,
	IonList,
	IonMenuButton,
	IonBackButton,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import axios from "axios";

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
		IonList,
		IonBackButton,
	},
	data() {
		return {
			usersList: [],
		};
	},
	methods: {
        async fetchStudiengaenge() {
			try {
				const response = await axios.get("http://localhost:8000/studiengang");
				this.studiengaenge = response.data.studiengaenge;
			} catch (error) {
				console.error("Error fetching studiengaenge:", error);
			}
		},
		cancel() {
			modalController.dismiss(null, "cancel");
		},
		confirm() {
			modalController.dismiss(name.value, "confirm");
		},
	},
	mounted() {
		this.getData();
	},
};
</script>
