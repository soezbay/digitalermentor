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
			<h4 class="padding"
				style=" text-align: center; font-size: 1.4em; background-color: var(--ion-color-primary); border-radius: 20px; padding: 10px; margin-left: 70px; margin-right: 70px; color: #fff;">
				{{ texts.titel.modulbeschreibung }}
			</h4>
			<h5 style=" text-align: center; font-size: 1.3em;">
				{{ selectedModul.Name }}
			</h5>
			<h6 style=" text-align: center; font-size: 1.3em;">
				({{ selectedModul.Kuerzel }})
			</h6>
			<ion-item @click="openModalReviews">
				<ion-label class="bewertung-button">
					{{ texts.modulbeschreibung.weitereBewertungen }}
				</ion-label>
			</ion-item>
			<ion-list>
				<ion-item v-for="(item, key) in filteredList" :key="key">
					<ion-text>
						<strong>{{ insertSpaceBetweenLowerAndUpper(key) }}: </strong> <br />
						{{ item }}
					</ion-text>
				</ion-item>
			</ion-list>
		</ion-content>

		<ion-modal class="reviews" ref="modal_reviews" trigger="open-reviews-modal" :presenting-element="presentingElement">
			<ion-header>
				<ion-toolbar>
					<ion-buttons slot="start" style="margin-right: 75px;">
						<ion-button color="medium" @click="cancel">{{ texts.allgemein.zurueck }}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<h4 class="padding"
					style=" text-align: center; font-size: 1.4em; background-color: var(--ion-color-primary); border-radius: 20px; padding: 10px; margin-left: 70px; margin-right: 70px; color: #fff;">
					<ion-label> {{ texts.modulbeschreibung.bewertung }}</ion-label>
				</h4>
				<h5 style=" text-align: center; font-size: 1.3em; margin-bottom: 0;">
					{{ selectedModul.Name }}
				</h5>
				<br>
				<div class="ion-text-center">
					<ion-label class="underline">Deine Bewertung</ion-label>
				</div>
				<ion-button @click="startEditing">{{ texts.modulbeschreibung.jetztBewerten }}</ion-button>
				<div v-if="editingMode">
					<ion-grid class="reviewBox">
						<ion-row>
							<ion-col>
								<ion-checkbox justify="start" alignment="center">Semester anzeigen</ion-checkbox>
							</ion-col>
						</ion-row>
						<ion-row>
							<ion-col class="colHeader">
								<ion-label>Schwierigkeitsgrad</ion-label>
							</ion-col>
							<ion-col>
								<ion-checkbox justify="end">leicht</ion-checkbox>
								<ion-checkbox justify="end">mittel</ion-checkbox>
								<ion-checkbox justify="end">Schwer</ion-checkbox>
							</ion-col>
						</ion-row>
						<ion-row>
							<ion-col class="colHeader">
								<ion-label>Arbeitsaufwand</ion-label>
							</ion-col>
							<ion-col>
								<ion-checkbox justify="end">leicht</ion-checkbox>
								<ion-checkbox justify="end">mittel</ion-checkbox>
								<ion-checkbox justify="end">Schwer</ion-checkbox>
							</ion-col>
						</ion-row>
						<ion-row>
							<ion-col class="colHeader">
								<ion-label>Das hat mir beim lernen geholfen</ion-label>
							</ion-col>
							<ion-col>
								<ion-checkbox justify="end">Praktikum</ion-checkbox>
								<ion-checkbox justify="end">Übung</ion-checkbox>
								<ion-checkbox justify="end">Lerngruppe</ion-checkbox>
								<ion-checkbox justify="end">Altklausur</ion-checkbox>
								<ion-checkbox justify="end">Literatur</ion-checkbox>
							</ion-col>
						</ion-row>
						<ion-row>
							<ion-label position="floating">Persönlicher Feedback:</ion-label>
							<ion-textarea rows="5"></ion-textarea>
						</ion-row>
						<ion-row>
							<ion-col>
								<ion-label position="floating">Gesamtbewertung</ion-label>
							</ion-col>
							<ion-col>

							</ion-col>
						</ion-row>
					</ion-grid>
					<div style="display: flex; align-items: ;">
						<ion-buttons slot="start">
							<ion-button @click="cancelEditing" fill="outline" color="danger">Abbrechen</ion-button>
						</ion-buttons>
						<ion-buttons slot="">
							<ion-button type="submit" fill="solid" color="primary">Absenden</ion-button>
						</ion-buttons>
					</div>
				</div>
				<div v-else>

				</div>
				<br>
				<div class="ion-text-center">
					<ion-label class="underline">Das sagen andere Studierende</ion-label>
				</div>
			</ion-content>
		</ion-modal>

	</ion-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import Moduluebersicht from "./Moduluebersicht.vue";
import { texts } from '../texts.js';
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
	IonCheckbox,
	IonTextarea,
	IonGrid,
	IonRow,
	IonCol
} from "@ionic/vue";

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
		IonCheckbox,
		IonTextarea,
		IonGrid,
		IonRow,
		IonCol
	},

	data() {
		return {
			Adress : import.meta.env.VITE_API_URL,
			editingMode: false,
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
				.get(`${this.Adress}/modul/pi/${this.selectedModul.name}`)
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
			this.dismiss();
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

		startEditing() {
			// Im Bearbeitungsmodus erstellen Sie eine Kopie des geladenen Termins
			this.editingMode = true;
		},
		cancelEditing() {
			// Abbrechen des Bearbeitungsmodus und Zurücksetzen auf den ursprünglichen Termin
			this.editingMode = false;
		},
		openModalReviews() {
			const editModal = this.$refs.modal_reviews.$el;
			if (editModal) {
				editModal.present();
			}
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

ion-button {
	padding-left: 30%;
	padding-right: 30%;
	padding-top: 20px;
}

.underline {
	font-size: larger;
	border-bottom: 2px solid #8c9900;
	padding-bottom: 5px;
	margin-bottom: 10px;
}

.reviewBox {
	padding-left: 10px;
	background-color: #d2d69e;
	border-radius: 30px;
	margin: 15px;
	color: black;
}



@media only screen and (max-width: 767px) {
	.reviews {
		--height: 100%;
		--width: 100%;
	}
}

/* Stile für größere Bildschirme */
@media only screen and (min-width: 768px) {
	.reviews {
		--height: 90%;
		--width: 80%;
	}
}

@media (min-width: 800px) {
	.bewertung-button {
		color: black;
		display: flex;
		justify-content: center;
		background-color: #d2d69e;
		padding: 10px;
		border-radius: 15px;
		margin-left: 160px;
		margin-right: 160px;
		margin-top: 25px;
		margin-bottom: 20px;
		;
	}
}

@media (max-width: 800px) {
	.bewertung-button {
		color: black;
		text-align: center;
		display: flex;
		justify-content: center;
		background-color: #d2d69e;
		padding: 10px;
		border-radius: 15px;
		margin-left: 80px;
		margin-right: 80px;
		margin-top: 25px;
		margin-bottom: 20px;
	}
}

.centered-text {
	text-align: center;
	/* Horizontal zentrieren */
}
</style>
