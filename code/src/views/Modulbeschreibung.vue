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
			<!-- Merveille -->
			<h4>Modulbewertungen</h4> 
	 		<!-- Verwenden des Stern-Icons -->
			<!--  <ion-button v-for="star in stars" :key="star" @click="rateModule(star)">
    <ion-icon :icon="star === 'star' ? 'star-outline' : 'star'"></ion-icon>
</ion-button> -->

<!-- Verwenden des Stern-Icons -->
		<ion-button> <ion-icon :icon="star"></ion-icon></ion-button>
		<ion-button> <ion-icon :icon="star"></ion-icon></ion-button>
		<ion-button> <ion-icon :icon="star"></ion-icon></ion-button>
		<ion-button> <ion-icon :icon="star"></ion-icon></ion-button>
		<ion-button> <ion-icon :icon="star"></ion-icon></ion-button>


    <p>Durchschnittliche Bewertung: {{ averageRating.toFixed(1) }}</p>
	<ion-button @click="goToReviewsPage">Bewertungen ansehen</ion-button>

  <!-- M. End -->

			<h4>Modulbeschreibung</h4>
            <ion-list>
					<ion-item v-for="(item, index) in modul" :key="index">
						<ion-label>
							<p><strong>Kuerzel:</strong> {{ item.Kuerzel }}</p>
							<p><strong>Name:</strong> {{ item.Name }}</p>
							<p>
								<strong>Verantwortliche/r:</strong> {{ item.Verantwortliche }}
							</p>
							<p><strong>Dozent/in:</strong> {{ item.Dozent }}</p>
							<p><strong>Sprache:</strong> {{ item.Sprache }}</p>
							<p><strong>Turnus:</strong> {{ item.Turnus }}</p>
							<p>
								<strong>Leistungspunkte:</strong> {{ item.Leistungspunkte }}
							</p>
                            <p><strong>Arbeitsaufwand:</strong> {{ item.Arbeitsaufwand }}</p>
							<p><strong>Teilnehmerzahl:</strong> {{ item.Teilnehmerzahl }}</p>
							<p>
								<strong>Voraussetzungen (Pflicht):</strong> {{ item.VoraussetzungenPflicht }}
							</p>
							<p><strong>Voraussetzungen (Empfohlen):</strong> {{ item.VoraussetzungenEmpfohlen }}</p>
							<p><strong>Prüfungsleistung:</strong> {{ item.Pruefungsleistung }}</p>
						</ion-label>
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
// import { star } from 'ionicons/icons';

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
	setup(){
		return {
			star
			//stars: ['star', 'star', 'star', 'star', 'star'],
		};
	},

	data() {
		return {
			modul: [],
			//Merveille
			//stars: ['star', 'star', 'star', 'star', 'star'],
            averageRating: 0, // Hier wird der Durchschnitt der Bewertungen gespeichert
            selectedRating: 0, // Hier wird die ausgewählte Bewertung gespeichert
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
		cancel() {
			modalController.dismiss(null, "cancel");
		},
	
//Merveille
// Methode, um das Modul zu bewerten
rateModule(star) {
            if (this.selectedRating === star) {
                this.selectedRating = 0; // Wenn dieselbe Bewertung erneut geklickt wird, löschen Sie die Auswahl
            } else {
                this.selectedRating = star;
            }

            // Bewertungsprozess durchführen, z. B. an den Server senden
            
            const ratings = [1, 2, 3, 4, 5]; // Annahme, dass die Bewertung von 1 bis 5 geht
            const totalRatings = ratings.reduce((sum, rating) => sum + (rating === this.selectedRating ? 1 : 0), 0);
            this.averageRating = totalRatings / ratings.length;
        },

		goToReviewsPage() {
        // Hier können Sie zur Bewertungsseite navigieren, z. B.:
        this.$router.push('/bewertungen.vue'); 
    },
},
// End
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
