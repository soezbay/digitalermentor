<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button color="medium" @click="cancel">{{ texts.allgemein.zurueck }}</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<h4 class="padding" style=" text-align: center; font-size: 1.4em; background-color: var(--ion-color-primary); border-radius: 20px; padding: 10px; margin-left: 70px; margin-right: 70px; color: #fff;">
				{{ texts.titel.modulbeschreibung }}
			</h4>
			<h5 style=" text-align: center; font-size: 1.3em;">
				{{selectedModul.Name}}
			</h5>
			<h6 style=" text-align: center; font-size: 1.3em;">
				({{ selectedModul.Kuerzel }})
			</h6>
			<ion-button-bewertung class="bewertung-button">
				{{ texts.modulbeschreibung.bewertungen }}
			</ion-button-bewertung>
			<ion-list>
				<ion-item v-for="(item, key) in filteredList" :key="key">
					<ion-text>
						<strong>{{ insertSpaceBetweenLowerAndUpper(key) }}: </strong> <br />
						{{ item }}
					</ion-text>
				</ion-item>
			</ion-list>
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
	IonItem,
	modalController,
	IonDatetime,
	IonLabel,
	IonList,
	IonMenuButton,
	IonBackButton,
	IonModal,
	IonButton,
	IonIcon,
} from "@ionic/vue";

import { defineComponent, ref } from "vue";
import axios from "axios";
import Moduluebersicht from "./Moduluebersicht.vue";
import { texts } from '../texts.js';

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
		IonModal,
		IonButton,
		IonIcon,
	},

	data() {
		return {
			modul: [],
			filteredList: this.filteredList(),
			texts,
		};
	},

	props: {
		selectedModul: Object,
	},

	methods: {
		getData() {
			axios
				.get(`http://localhost:8000/modul/pi/${this.selectedModul.name}`)
				.then((Response) => {
					console.log(Response.data);
					this.modul = Response.data.modul;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		// Schließen des Modals
		cancel() {
			modalController.dismiss(null, "cancel");
		},

		// selectedModul nach items filtern, die ein Value besitzen
		filteredList() {
			const filtered = {};
			for (const key in this.selectedModul) {
				if (this.selectedModul[key] !== null) {
					filtered[key] = this.selectedModul[key];
				}
			}
			return filtered;
		},

		// Setzt ein Leerzeichen ein bei Keys die aus mehr als einem Wort bestehen
		insertSpaceBetweenLowerAndUpper(text) {
			return text.replace(/([a-z])([A-Z])/g, "$1 $2");
		},
	},
	mounted() {
		this.getData();
	},
};
</script>

<style scoped>
ion-toolbar {
	--background: none;
}

ion-button{
	padding-left: 30%;
	padding-right: 30%;
	padding-top: 20px;


}
@media (min-width: 800px) {
.bewertung-button {
	display: flex;
	justify-content: center;
	background-color: #d2d69e;
	padding: 10px;
	border-radius: 15px;
	margin-left: 160px;
	margin-right: 160px;
	margin-top: 25px;
	margin-bottom: 20px;
}
}

@media (max-width: 800px) {
.bewertung-button {
	text-align: center;
	display: flex;
	justify-content: center;
	background-color: #d2d69e;
	padding: 10px;
	border-radius: 15px;
	margin-left: 100px;
	margin-right: 100px;
	margin-top: 25px;
	margin-bottom: 20px;
}
}

.centered-text {
	text-align: center; /* Horizontal zentrieren */
}
</style>
