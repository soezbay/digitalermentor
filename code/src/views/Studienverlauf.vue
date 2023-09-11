<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons>
					<ion-title>Studienverlauf</ion-title>
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-grid :fixed="true" v-for="(semesterModules, semester) in groupedModules"
					:key="semester">
				<h2>
					{{ semester }}.Semester
				</h2>
				<ion-row v-for="(moduleGroup, index) in chunkedModules" :key="index">
					<ion-col
						size="3"
						v-for="(module, moduleIndex) in moduleGroup"
						:key="moduleIndex">
						<ion-button expand="full">{{ module.Kuerzel }}</ion-button>
					</ion-col>
				</ion-row>
			</ion-grid>
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
	IonCol,
	IonGrid,
	IonRow,
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
		IonModal,
		IonButton,
		IonCol,
		IonGrid,
		IonRow,
	},
	data() {
		return {
			modules: [],
			groupedModules: {}, // Neues Datenattribut für gruppierte Module
			chunkedModules: [],
		};
	},
	methods: {
		getData() {
			axios
				.get("http://localhost:8000/studiengang/pflicht/pi")
				.then((Response) => {
					console.log(Response.data);
					this.modules = Response.data.pflicht;
					this.groupModules();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		// Funktion zum Gruppieren der Module nach Semestern
		groupModulesBySemester(modules) {
			const groupedModules = {}; // Erstellen Sie ein leeres Objekt

			modules.forEach((modul) => {
				const semester = modul.Semester;

				if (!groupedModules[semester]) {
					groupedModules[semester] = [];
				}

				groupedModules[semester].push(modul);
			});

			return groupedModules;
		},

		// Rufen Sie diese Methode auf, um die Module zu gruppieren
		groupModules() {
			this.groupedModules = this.groupModulesBySemester(this.modules);
		},
	},
	mounted() {
		this.getData();
	},

	computed: {
		// Berechnete Eigenschaft, um Module in Gruppen aufzuteilen
		chunkedModules() {
			const chunkSize = 4; // Maximale Anzahl von Buttons pro Reihe
			const chunkedModules = [];

			for (const semesterModules of Object.values(this.groupedModules)) {
				for (let i = 0; i < semesterModules.length; i += chunkSize) {
					const moduleGroup = semesterModules.slice(i, i + chunkSize);
					chunkedModules.push(moduleGroup);
				}
			}

			return chunkedModules;
		},
	},
};
</script>

<style scoped></style>
