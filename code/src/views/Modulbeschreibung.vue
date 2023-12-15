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
					style=" text-align: center; font-size: 1.4em; background-color: var(--ion-color-primary); border-radius: 20px; padding: 10px; margin-left: 70px; margin-right: 70px; color: #fff;">
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
					<form class="giveReviewBox">
						<ion-grid>
							<ion-row>
								<ion-col>
									<ion-label justify="start" alignment="center">Semester anzeigen</ion-label>
								</ion-col>
								<ion-col>
									<ion-checkbox label-placement="fixed">Ja</ion-checkbox>
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col class="colHeader">
									<ion-label>Schwierigkeitsgrad</ion-label>
								</ion-col>
								<ion-col>
									<ion-radio-group>
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
									<ion-radio-group>
										<ion-radio value="gering" label-placement="fixed">gering</ion-radio><br />
										<ion-radio value="medium" label-placement="fixed">medium</ion-radio><br />
										<ion-radio value="hoch" label-placement="fixed">hoch</ion-radio><br />
									</ion-radio-group>
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col class="colHeader">
									<ion-label>Das hat mir beim lernen geholfen</ion-label>
								</ion-col>
								<ion-col>
									<ion-checkbox label-placement="fixed">Praktikum</ion-checkbox><br />
									<ion-checkbox label-placement="fixed">Übung</ion-checkbox><br />
									<ion-checkbox label-placement="fixed">Lerngruppe</ion-checkbox><br />
									<ion-checkbox label-placement="fixed">Altklausur</ion-checkbox><br />
									<ion-checkbox label-placement="fixed">Literatur</ion-checkbox><br />
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
					</form>
					<div class="confirmButtons">
						<ion-buttons>
							<ion-button @click="cancelEditing" fill="outline" color="danger">Abbrechen</ion-button>
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
				<br><br>
				<div class="reviewBox" v-for="(review, index) in reviews" :key="index">
					<div class="rating">
						★★★★☆ <!-- Display stars based on the review's rating -->
					</div>
					<div class="reviewText">
						{{ review.reviewText }}
					</div>
					<div class="labelRow">
						<ion-label>Schwierigkeitsgrad: {{ review.difficulty }}</ion-label>
					</div>
					<div class="labelRow">
						<ion-label>Arbeitsaufwand: {{ review.workload }}</ion-label>
					</div>
					<div class="labelRow">
						<ion-label>Das hat mir beim Lernen geholfen: {{ review.helped.join(', ') }}</ion-label>
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
			reviews: [
				{
					rating: 4,
					reviewText: "test1",
					difficulty: "mittel",
					workload: "medium",
					helped: ["Altklausur", "Praktikum"]
				},
				{
					rating: 5,
					reviewText: "test2",
					difficulty: "leicht",
					workload: "gering",
					helped: ["Übung", "Lerngruppe"]
				},
				{
					rating: 3,
					reviewText: "test3",
					difficulty: "schwer",
					workload: "hoch",
					helped: ["Literatur", "Praktikum"]
				}
			],
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
		width: 35%;
		/* Adjust the width as needed */
		margin: 0 auto;
		/* Add space between buttons */
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
		display: flex;
		justify-content: space-between;
		width: 90%;
		/* Adjust the width as needed */
		margin: 0 auto;
		padding-right: 600px;
		/* Add space between buttons */
	}

	.confirmButtons ion-button {
		padding: 50px;
		padding-top: 10px;
		padding-bottom: 5px;
	}

}



ion-checkbox {
	--size: 20px;
	--border-radius: 20px;
	height: 30px;
}

ion-radio {
	--border-radius: 10px;
	--inner-border-radius: 10px;
	width: 30px;
	height: 23px;
	--color: black;
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
	background-color: #f0f0f0;
	/* Light gray background */
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
