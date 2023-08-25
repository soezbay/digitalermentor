<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button color="medium" @click="cancel">Zurück</ion-button>
				</ion-buttons>
				<ion-title> {{ selectedModul.name }} </ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-list>
				<div>
					<ion-item v-for="(item, index) in modul" :key="index">
						<ion-label>
							<p><strong>Kuerzel:</strong> {{ item.Kuerzel }}</p>
							<p><strong>Name:</strong> {{ item.Name }}</p>
							<p>
								<strong>Verantwortliche/r:</strong> {{ item.Verantwortlicher }}
							</p>
							<p><strong>Dozent/in:</strong> {{ item.Dozent }}</p>
							<p><strong>Sprache:</strong> {{ item.Sprache }}</p>
							<p><strong>Turnus:</strong> {{ item.Turnus }}</p>
							<p>
								<strong>Leistungspunkte:</strong> {{ item.Leistungspunkte }}
							</p>
						</ion-label>
					</ion-item>
				</div>
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
	},
	data() {
		return {
			modul: [],
		};
	},

	methods: {
		getData() {
			axios
				.get("http://localhost:8000/modul/PI/ads")
				.then((Response) => {
					console.log(Response.data);
					this.modul = Response.data.module;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		cancel() {
			modalController.dismiss(null, "cancel");
		},
	},
	mounted() {
		this.getData();
	},

	props: {
		selectedModul: Object,
	},
};
</script>
