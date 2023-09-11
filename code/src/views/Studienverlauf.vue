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
			<h3 id="titel">Studienverlaufsübersicht</h3>
			<ion-progress-bar :value="progress" :buffer="1"></ion-progress-bar>
            <div id="cpInfo">{{ reachedCreditPoints }}/{{ fullCreditPoints }} CP</div>
				<ion-grid
					:fixed="true"
					v-for="(semesterModules, semester) in groupedModules"
					:key="semester">
					<ion-row :key="semester">
						<ion-col size="12">
							<h2>{{ semester }}.Semester</h2>
						</ion-col>
						<ion-row :key="`modules-${semester}`">
							<ion-col
								size="4"
								v-for="(module, index) in semesterModules"
								:key="index">
								<ion-card expand="full" :class="getModuleStatusClass(module)">
									{{ module.Kuerzel }}
								</ion-card>
							</ion-col>
						</ion-row>
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
	IonProgressBar,
	IonReorderGroup,
	IonReorder,
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
		IonProgressBar,
		IonReorderGroup,
		IonReorder,
	},
	data() {
		return {
			modules: [],
			groupedModules: {}, // Neues Datenattribut für gruppierte Module
			fullCreditPoints: 180,
			studentID: "test123",
			studentProgress: [],
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
			axios
				.get(`http://localhost:8000/modul/status/${this.studentID}`)
				.then((Response) => {
					console.log(Response.data);
					this.studentProgress = Response.data.modul;
                    this.getProgress();
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

		getModuleStatusClass(module) {
			const moduleStatuses = this.studentProgress.filter(
				(progressModule) => progressModule.Kuerzel === module.Kuerzel
			);

			if (moduleStatuses.length === 0) {
				return "gray"; // Modul nicht in studentProgress gefunden, graue Farbe
			}

			// Berechnen Sie den Durchschnitt der Noten für alle Vorkommen
			const averageGrade =
				moduleStatuses.reduce(
					(total, progressModule) => total + parseFloat(progressModule.Note),
					0
				) / moduleStatuses.length;

			if (averageGrade >= 5) {
				console.log(`Modul ${module.Kuerzel} nicht bestanden.`);
				return "failed"; // Modul nicht bestanden, rote Farbe
			} else {
				console.log(`Modul ${module.Kuerzel} bestanden.`);
				return "passed"; // Modul bestanden, grüne Farbe
			}
		},
		// Funktion zur Berechnung der erreichten Credit Points
		calculateCreditPoints() {
			let totalCreditPoints = 0;

			for (const progressModule of this.studentProgress) {
				if (progressModule.Status === "Bestanden") {
					// Finden Sie das entsprechende Modul im Array 'modules' und fügen Sie die Credit Points hinzu
					const matchingModule = this.modules.find(
						(module) => module.Kuerzel === progressModule.Kuerzel
					);
					if (matchingModule) {
						totalCreditPoints += matchingModule.Leistungspunkte;
					}
				}
			}

			return totalCreditPoints;
		},

        getProgress() {
			const totalCreditPoints = this.calculateCreditPoints();
			console.log("Total Credit Points:", this.reachedCreditPoints);
			console.log("Full Credit Points:", this.fullCreditPoints);
			this.reachedCreditPoints = totalCreditPoints / this.fullCreditPoints;
		},
	},


	mounted() {
		this.getData();
	},

	computed: {
		progress() {
			return this.reachedCreditPoints / this.fullCreditPoints;
		},

		// Berechnung der erreichten Credit Points des Studenten
		reachedCreditPoints() {
			return this.calculateCreditPoints();
		},
	},
};
</script>

<style scoped>
#titel {
	background-color: var(--ion-color-primary);
	text-align: center;
	padding: 5px;
	border-radius: 15px;
	color: var(--ion-color-light);
	width: 80%;
	margin-left: auto;
	margin-right: auto;
}

ion-progress-bar {
	--background: var(--ion-color-light);
	--progress-background: var(--ion-color-primary);
	height: 20px;
	width: 70%;
	margin: auto;
}
.passed {
	--background: green;
}

.failed {
	--background: red;
}

.gray {
	--background: rgb(138, 138, 138);
}

ion-card {
	width: 100%;
	height: 100%;
	color: white;
	text-align: center;
}

#cpInfo {
    text-align: center;
}
</style>
