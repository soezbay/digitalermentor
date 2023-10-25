<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button color="medium" @click="cancel">Zurück</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<h4>
				Modulbeschreibung <strong> {{ selectedModul.Kuerzel }} </strong>
			</h4>
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

.centered-text {
	text-align: center; /* Horizontal zentrieren */
}
</style>
