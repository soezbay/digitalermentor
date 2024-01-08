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
			<div class="ion-text-center">
				<h4 class="modalheader"
					style=" text-align: center; background-color: var(--ion-color-primary); border-radius: 20px; padding: 10px; margin-left: 70px; margin-right: 70px; color: #fff;">
					{{ texts.titel.modulbeschreibung }}
				</h4>
				<h5 style=" text-align: center; font-size: 1.3em;">
					{{ selectedModul.Name }}
				</h5>
				<h6 style=" text-align: center; font-size: 1.3em;">
					({{ selectedModul.Kuerzel }})
				</h6>
				<ion-button @click="openModalReviews" class="weitereBewertungenButton">{{
					texts.modulbeschreibung.weitereBewertungen }}</ion-button>
			</div>
			<ion-list>
				<ion-item v-for="(item, key) in filteredList" :key="key">
					<ion-label class="ion-text-wrap" style="font-weight: 800;">{{ insertSpaceBetweenLowerAndUpper(key)
					}}:</ion-label>
					<ion-label class="ion-text-wrap">{{ item }}</ion-label>
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
				<div class="ion-text-center">
					<div class="modalheader">
						<ion-label> {{ texts.modulbeschreibung.bewertung }}</ion-label>
					</div>
					<h5 style=" text-align: center; font-size: 1.3em; margin-bottom: 0;">
						{{ selectedModul.Name }}
					</h5>
					<br>
					<div class="ion-text-center">
						<ion-label class="underline">Deine Bewertung</ion-label>
					</div>
					<ion-button @click="startEditing">{{ texts.modulbeschreibung.jetztBewerten }}</ion-button>
				</div>
				<div v-if="editingMode" class="reviewWrapper">
					<form class="giveReviewBox" @submit.prevent="submitReview">
						<ion-grid>
							<ion-row>
								<ion-col>
									<ion-label justify="start" alignment="center">Semester anzeigen</ion-label>
								</ion-col>
								<ion-col>
									<ion-checkbox label-placement="fixed" required
										v-model="formData.semesterAnzeigen.ja">Ja</ion-checkbox><br />
										<!-- <ion-checkbox label-placement="fixed" required
										v-model="formData.semesterAnzeigen.nein">Nein</ion-checkbox> -->
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col class="colHeader">
									<ion-label>Schwierigkeitsgrad</ion-label>
								</ion-col>
								<ion-col>
									<ion-radio-group value="mittel" required class="schwierigkeit"
										v-model="formData.schwierigkeitsgrad">
										<ion-radio value="leicht" label-placement="fixed">leicht</ion-radio><br />
										<ion-radio value="mittel" label-placement="fixed">mittel</ion-radio><br />
										<ion-radio value="schwer" label-placement="fixed">schwer</ion-radio><br />
									</ion-radio-group>
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col class="colHeader">
									<ion-label>Arbeitsaufwand</ion-label>
								</ion-col>
								<ion-col>
									<ion-radio-group value="mittel" required class="schwierigkeit"
										v-model="formData.arbeitsaufwand">
										<ion-radio value="gering" label-placement="fixed">gering</ion-radio><br />
										<ion-radio value="mittel" label-placement="fixed">mittel</ion-radio><br />
										<ion-radio value="hoch" label-placement="fixed">hoch</ion-radio><br />
									</ion-radio-group>
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col class="colHeader">
									<ion-label>Das hat mir beim Lernen geholfen</ion-label>
								</ion-col>
								<ion-col>
									<ion-checkbox v-model="formData.lernhilfen.praktikum"
										label-placement="fixed">Praktikum</ion-checkbox><br />
									<ion-checkbox v-model="formData.lernhilfen.übung"
										label-placement="fixed">Übung</ion-checkbox><br />
									<ion-checkbox v-model="formData.lernhilfen.lerngruppe"
										label-placement="fixed">Lerngruppe</ion-checkbox><br />
									<ion-checkbox v-model="formData.lernhilfen.altklausur"
										label-placement="fixed">Altklausur</ion-checkbox><br />
									<ion-checkbox v-model="formData.lernhilfen.literatur"
										label-placement="fixed">Literatur</ion-checkbox><br />
								</ion-col>
							</ion-row>
							<ion-label position="floating">Persönliches Feedback</ion-label>
							<ion-row
								style="background-color: beige; border-radius: 20px; margin-top: 10px; margin-bottom: 20px;">
								<ion-textarea v-model="formData.persönlichesFeedback" rows="5" style="padding: 10px"></ion-textarea>
							</ion-row>
							<ion-row ion-row style="margin-top: 10px; margin-bottom: 10px;">
								<ion-label style="margin-bottom: 10px;">Gesamtbewertung <br/>(1-5, 1=schlecht 5=sehr
									gut)</ion-label>
								<ion-radio-group value="3" required class="bewertungGroup" v-model="formData.gesamtbewertung">
									<ion-radio value="1" label-placement="stacked">1</ion-radio>
									<ion-radio value="2" label-placement="stacked">2</ion-radio>
									<ion-radio value="3" label-placement="stacked">3</ion-radio>
									<ion-radio value="4" label-placement="stacked">4</ion-radio>
									<ion-radio value="5" label-placement="stacked">5</ion-radio>
								</ion-radio-group>
							</ion-row>
						</ion-grid>

						<div class="confirmButtons">
							<ion-buttons>
								<ion-button @click="cancelEditing" fill="outline" color="danger">Abbrechen</ion-button>
								<ion-button type="submit" fill="solid" color="primary">Absenden</ion-button>
							</ion-buttons>
						</div>
					</form>
				</div>
				<div v-else>
				</div>
				<br>
				<div class="ion-text-center">
					<ion-label class="underline">Das sagen andere Studierende</ion-label>
				</div>
				<br><br>
				<div v-for="(review, index) in reviews" :key="index">
					<ion-item style="padding-left: 10px; padding-right: 10px; height: 40px;">
						<ion-label>Von: {{ review.BenutzerID }} ({{ review.SemsterAnzeigen }}. Semester)</ion-label>
						<ion-label slot="end">{{ review.ErstelltAm }}</ion-label>
					</ion-item>
					<div class="reviewBox">
						<div class="rating">
							<!-- Display stars based on the review's rating -->
							{{ '★'.repeat(review.Bewertung) + '☆'.repeat(5 - review.Bewertung) }}
						</div>
						<div class="reviewText">
							{{ review.Feedback }}
						</div>
						<div class="labelRow">
							<ion-label color="tertiary">Schwierigkeitsgrad: </ion-label>
							<ion-label>{{ review.Schwierigkeitsgrad }}</ion-label>
						</div>
						<div class="labelRow">
							<ion-label color="tertiary">Arbeitsaufwand: </ion-label>
							<ion-label>{{ review.Arbeitsaufwand }}</ion-label>
						</div>
						<div class="labelRow">
							<ion-label color="tertiary">Das hat mir beim Lernen geholfen: </ion-label>
							<ion-label>{{ review.Lernhilfe }}</ion-label>
						</div>
					</div>
				</div>
			</ion-content>
		</ion-modal>

	</ion-page>
</template>

<script>
import axios from "axios";
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
	IonCol,
	IonRadioGroup,
	IonRadio
} from "@ionic/vue";
import { userdata } from "../userdata.js";

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
		IonCol,
		IonRadioGroup,
		IonRadio
	},

	data() {
		return {
			reviews: [],
			Adress : import.meta.env.VITE_API_URL,
			editingMode: false,
			modul: [],
			filteredList: this.filteredList(),
			texts,
			userdata,
			formData: {
				semesterAnzeigen: {
					ja: false,
					nein: false,
				},
				schwierigkeitsgrad: '',
				arbeitsaufwand: '',
				lernhilfen: {
					praktikum: false,
					übung: false,
					lerngruppe: false,
					altklausur: false,
					literatur: false,
				},
				persönlichesFeedback: '',
				gesamtbewertung: null,
			},

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
		getReviewData() {
			axios
				.get(`${this.Adress}/bewertung/${this.selectedModul.Kuerzel}`)
				.then((Response) => {
					console.log(Response.data);
					this.reviews = Response.data.bewertungen
					console.log(this.reviews);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async submitReview() {
			try {

				if (!this.formData.lernhilfen.praktikum && !this.formData.lernhilfen.übung &&
					!this.formData.lernhilfen.lerngruppe && !this.formData.lernhilfen.altklausur &&
					!this.formData.lernhilfen.literatur) {
					// Wenn keine Lernhilfen ausgewählt wurden, setzen Sie den Standardwert "Keine Angabe"
					this.formData.lernhilfen = { 'Keine Angabe': true };
				}

				if (!this.formData.persönlichesFeedback) {
					// Wenn kein persönliches Feedback gegeben wurde, setzen Sie den Standardwert "Keine Angabe"
					this.formData.persönlichesFeedback = 'Keine Angabe';
				}

				const bewertungData = {
					BewertungSterne: this.formData.gesamtbewertung,
					Feedback: this.formData.persönlichesFeedback,
					Schwierigkeitsgrad: this.formData.schwierigkeitsgrad,
					Arbeitsaufwand: this.formData.arbeitsaufwand,
					Lernhilfe: Object.keys(this.formData.lernhilfen).join(', '), // Join the array to a string
					SemsterAnzeigen: this.formData.semesterAnzeigen ? 'Ja' : 'Nein',
					ModulKuerzel: this.selectedModul.Kuerzel,
					//BenutzerID: this.userdata.profile.matrikelnumber, // Setzen Sie dies auf den entsprechenden Wert
					BenutzerID: this.$store.getters.getUserID
				};
				console.log(bewertungData);

				await axios.post('http://localhost:8000/bewertung', bewertungData);

				// Optional: Feedback an den Benutzer geben (z. B. Erfolgsmeldung).

				// Schließen Sie das Modal oder setzen Sie den Bearbeitungsmodus zurück.
				this.cancelEditing();
			} catch (error) {
				console.error(error);
				// Optional: Fehlerbehandlung oder Benachrichtigung anzeigen.
			}
		},
		// async createNewBewertung(bewertungData) {
		// 	try {
		// 		// Hier können Sie die Bewertung erstellen, indem Sie die Daten an Ihren API-Endpunkt senden
		// 		// Verwenden Sie Axios oder eine ähnliche Bibliothek für HTTP-Anfragen
		// 		await this.$axios.post('http://localhost:8000/bewertung', bewertungData);

		// 		// Optional: Feedback an den Benutzer geben

		// 	} catch (error) {
		// 		console.error(error);
		// 		// Optional: Fehlerbehandlung oder Benachrichtigung anzeigen
		// 	}
		// },
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
				this.getReviewData();
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

.weitereBewertungenButton {
	margin: 0 auto;
	padding: 0;
	padding-top: 20px;
	padding-bottom: 20px;
}

.underline {
	font-size: larger;
	border-bottom: 2px solid #8c9900;
	padding-bottom: 5px;
	margin-bottom: 10px;
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

@media only screen and (min-width: 768px) {
	.modalheader {
		text-align: center;
		font-size: 1.4em;
		justify-self: center;
		background-color: var(--ion-color-primary);
		border-radius: 20px;
		padding: 10px;
		margin-left: 210px;
		margin-right: 210px;
		margin-top: 20px;
		color: #fff;
	}

	.giveReviewBox {
		width: 50%;
		/* Adjust the width as needed */
		margin: 0 auto;
		/* Center the reviewBox horizontally */
		padding: 10px;
		background-color: #d2d69e;
		border-radius: 30px;
		margin-top: 15px;
		color: black;
	}

	.confirmButtons {
		/* Adjust the width as needed */
		width: 35%;
		/* Add space between buttons */
		margin: 0 auto;
		/* Centered button alignment */
		display: flex;
		justify-content: center;
	}

	.confirmButtons ion-button {
		padding: 50px;
		padding-top: 10px;
		padding-bottom: 5px;
	}


}

@media only screen and (max-width: 767px) {

	.modalheader {
		text-align: center;
		font-size: 1.4em;
		justify-self: center;
		background-color: var(--ion-color-primary);
		border-radius: 20px;
		padding: 10px;
		margin: 70px;
		margin-bottom: 0;
		margin-top: 20px;
		color: #fff;
	}


	.giveReviewBox {
		width: 95%;
		margin: 0 auto;
		padding: 10px;
		background-color: #d2d69e;
		border-radius: 30px;
		margin-top: 15px;
		color: black;
	}

	.confirmButtons {
		/* Centered button alignment */
		display: flex;
		justify-content: center;
		width: 90%;
		/* Adjust the width as needed */
		margin: 0 auto;
		/* Add space between buttons */
		
	}

	.confirmButtons ion-button {
		padding: 50px;
		padding-top: 10px;
		padding-bottom: 5px;
	}

	.modalheader {
		font-size: 1.2em;
	}

}

ion-checkbox {
	--size: 20px;
	--border-radius: 20px;
	height: 23px;
}

ion-radio {
	--border-radius: 10px;
	--inner-border-radius: 10px;
	width: 30px;
	height: 23px;
	--color: black;
}

.bewertungGroup ion-radio {
	width: 50px;
	padding-right: 18px;
}

.bewertungGroup {
	margin-left: 50px;
}

.reviewBox {
	color: black;
	width: 90%;
	margin: 0 auto;
	margin-bottom: 20px;
	background-color: #d2d69e;
	border-radius: 10px;
	padding: 20px;
}

.reviewBox .rating {
	font-size: 2em;
	/* Adjust the size as needed */
	margin-bottom: 10px;
}

.reviewBox .reviewText {
	background-color: beige;
	border-radius: 10px;
	padding: 10px;
	margin-bottom: 10px;
}

.reviewBox .labelRow {
	margin-bottom: 10px;
}

.reviewBox ion-label {
	font-weight: bold;
}

.centered-text {
	text-align: center;
	/* Horizontal zentrieren */
}

</style>
