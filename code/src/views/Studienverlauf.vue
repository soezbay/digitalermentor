<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button router-link="/menu/dashboard">
						<ion-icon
							style="font-size: 45px"
							src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-buttons slot="end">
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<draggable
				class="w-full mt-5 dragArea list-group"
				:list="modules"
				@change="log">
				<div
					class="max-w-md p-2 mb-5 border cursor-pointer list-styles"
					v-for="element in list"
					:key="element.name">
					{{ element.name }}
				</div>
			</draggable>
			<h3 id="titel">Studienverlaufsübersicht</h3>
			<ion-progress-bar :value="progress" :buffer="1"></ion-progress-bar>
			<div id="cpInfo">{{ reachedCreditPoints }}/{{ fullCreditPoints }} CP</div>
			<div id="averageGrade">
				Dein Notendurchschnitt:
				{{ calculateAverageGrade().toFixed(2).replace(".", ",") }} <br />
			</div>
			<ion-grid
				:fixed="true"
				v-for="(semesterModules, semester) in groupedModulesWithEmpty"
				:key="semester">
				<ion-row :key="semester">
					<ion-col size="12">
						<ion-row>
							<h2>{{ semester }}.Semester</h2>
							<ion-icon
								:icon="remove"
								id="removeSemesterIcon"
								v-if="
									semester > Object.keys(groupedModules).length &&
									semester ==
										emptySemesters + Object.keys(groupedModules).length
								"
								@click="removeEmptySemester"></ion-icon>
						</ion-row>
					</ion-col>

					<ion-row id="moduleRow" :key="`modules-${semester}`">

							<ion-col
								size="4"
								v-for="(module, index) in semesterModules"
								:key="index">
								<draggable
							class="w-full mt-5 dragArea"
							:list="semesterModule"
							@change="log">
								<ion-card
									id="moduleElement"
									expand="full"
									:class="getModuleStatusClass(module)">
									<span>{{ module.Kuerzel }}</span> <br />
									<span id="note">{{
										getStudentModuleNoteForPass(module)
									}}</span>
								</ion-card>
							</draggable>

							</ion-col>
					</ion-row>
				</ion-row>
			</ion-grid>

			<ion-buttons id="addSemester">
				<ion-button @click="addEmptySemester">
					<ion-icon :icon="add" id="addSemesterIcon"></ion-icon>
					<h5>Semester hinzufügen</h5></ion-button
				>
			</ion-buttons>
			<ion-grid>
				<ion-row>
					<ion-col size="12">
						<ion-row>
							<h2>Wahlpflichtmodule</h2>
						</ion-row>
					</ion-col>
					<ion-row id="moduleRow">
						<ion-col
							size="4"
							v-for="(module, index) in electiveModules"
							:key="index">
							<ion-card id="moduleElement">
								<span>{{ module.Kuerzel }}</span>
								<span id="note">{{ getStudentModuleNoteForPass(module) }}</span>
							</ion-card>
						</ion-col>
					</ion-row>
				</ion-row>
			</ion-grid>

			<div id="legend">
				<ion-badge id="legendBadge" style="color: var(--ion-color-success)"
					>&nbsp;</ion-badge
				>
				<span> Bestanden </span>
				<ion-badge id="legendBadge" color="warning">&nbsp;</ion-badge>
				<span> 1. Versuch </span>
				<ion-badge id="legendBadge" color="danger">&nbsp;</ion-badge>
				<span> 2. Versuch </span>
			</div>
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
	IonIcon,
	IonBadge,
} from "@ionic/vue";
import { remove, add, ellipse } from "ionicons/icons";

import { defineComponent, ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
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
		IonIcon,
		IonBadge,
		draggable: VueDraggableNext,
	},

	setup() {
		return {
			remove,
			add,
			ellipse,
		};
	},
	data() {
		return {
			modules: [], // Alle Module aus der Datenbank
			groupedModules: {}, // Neues Datenattribut für gruppierte Module
			electiveModules: [], // Wahlpflichtmodule
			fullCreditPoints: 180, // Zu erreichenden Credit Points
			studentID: "test123",
			studentProgress: [], // Teilgenommene Module des Studierenden
			emptySemesters: 0, // Anzahl der leeren Semester
			enabled: true,
			list: [
				{ name: "Medical science", id: 1 },
				{ name: "Allied Medicine", id: 2 },
				{ name: "Defense Service", id: 3 },
				{ name: "Education training", id: 4 },
				{ name: "Economics & Commerce", id: 5 },
				{ name: "Banking & Finance", id: 6 },
				{ name: "Enginnering", id: 7 },
				{ name: "science", id: 8 },
			],
			dragging: true,
		};
	},
	methods: {
		log(event) {
			console.log(event);
		},
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
				})
				.catch((err) => {
					console.log(err);
				});
			axios
				.get("http://localhost:8000/studiengang/wahlpflicht/pi")
				.then((Response) => {
					console.log(Response.data);
					this.electiveModules = Response.data.wahlpflicht;
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// Methode, um ein leeres Semester hinzuzufügen
		addEmptySemester() {
			this.emptySemesters++;
		},

		// Methode, um ein leeres Semester zu entfernen
		removeEmptySemester() {
			if (this.emptySemesters > 0) {
				this.emptySemesters--;
			}
		},

		// Funktion zum Gruppieren der Module nach Semestern
		groupModulesBySemester(modules) {
			const groupedModules = {};

			modules.forEach((module) => {
				const semester = module.Semester;

				if (!groupedModules[semester]) {
					groupedModules[semester] = [];
				}

				groupedModules[semester].push(module);
			});

			return groupedModules;
		},

		// Rufen Sie diese Methode auf, um die Module zu gruppieren
		groupModules() {
			this.groupedModules = this.groupModulesBySemester(this.modules);
		},

		// Status des Moduls herausfinden (Bestanden oder nicht Bestanden)
		getModuleStatusClass(module) {
			// Einträge aus studentProgress mit dem übergebenen Modul werden zu enteredModules hinzugefügt
			const enteredModules = this.studentProgress.filter(
				(progressModule) => progressModule.Kuerzel === module.Kuerzel
			);
			// Wenn enteredModules leer ist, ist das Modul noch nicht angetreten worden
			if (enteredModules.length === 0) {
				return "gray";
			}

			// Berechnen des Notendurchschnitts
			const averageGrade =
				enteredModules.reduce(
					(total, progressModule) => total + parseFloat(progressModule.Note),
					0
				) / enteredModules.length;

			if (averageGrade >= 5 && enteredModules.length == 1) {
				return "firstTry"; // Modul ein mal nicht bestanden, gelbe Farbe
			} else if (averageGrade >= 5 && enteredModules.length == 2) {
				return "secondTry"; // Modul zwei mal nicht bestanden, rote Farbe
			} else {
				return "passed"; // Modul bestanden, grüne Farbe
			}
		},

		// Funktion zur Berechnung der erreichten Credit Points
		calculateCreditPoints() {
			let totalCreditPoints = 0;

			for (const progressModule of this.studentProgress) {
				if (progressModule.Status === "Bestanden") {
					// Findet das entsprechende Modul im Array 'modules' und fügt die Credit Points hinzu
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

		// Diese Methode gibt die Note zurück, mit der der Student das Modul bestanden hat
		getStudentModuleNoteForPass(module) {
			const passedModules = this.studentProgress.filter(
				(progressModule) =>
					progressModule.Kuerzel === module.Kuerzel &&
					progressModule.Status === "Bestanden"
			);

			// Wenn es mindestens einen bestandenen Versuch gibt, gib die Note des ersten bestandenen Versuchs zurück
			if (passedModules.length > 0) {
				return "Note: " + passedModules[0].Note;
			}
		},
		// Durchschnittsnote berechnen
		calculateAverageGrade() {
			let totalGrade = 0;
			let totalModules = 0;
			let totalCreditPoints = 0;

			for (const progressModule of this.studentProgress) {
				if (progressModule.Status === "Bestanden") {
					// Findet das entsprechende Modul im Array 'modules' und fügt die Credit Points hinzu
					const matchingModule = this.modules.find(
						(module) => module.Kuerzel === progressModule.Kuerzel
					);
					if (matchingModule) {
						totalCreditPoints += matchingModule.Leistungspunkte;
					}

					totalGrade +=
						parseFloat(progressModule.Note) * matchingModule.Leistungspunkte;
					totalModules++;
				}
			}

			if (totalModules === 0) {
				return 0; // Keine bestandenen Module, Durchschnittsnote ist 0
			}

			return totalGrade / totalCreditPoints;
		},
	},

	mounted() {
		this.getData();
	},

	computed: {
		// Berechnung der erreichten Credit Points des Studenten
		reachedCreditPoints() {
			return this.calculateCreditPoints();
		},

		// Berechne Prozent der erreichten Credit Points für den Progress Bar
		progress() {
			return this.reachedCreditPoints / this.fullCreditPoints;
		},

		// Berechnete Eigenschaft, die die Semester einschließlich der leeren Semester zurückgibt
		groupedModulesWithEmpty() {
			const groupedModulesWithEmpty = { ...this.groupedModules };

			// Füge leere Semester basierend auf this.emptySemesters hinzu
			for (let i = 1; i <= this.emptySemesters; i++) {
				const semesterNumber = Object.keys(groupedModulesWithEmpty).length + 1;
				groupedModulesWithEmpty[semesterNumber] = [];
			}

			return groupedModulesWithEmpty;
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
	margin-bottom: 30px;
	margin-top: 30px;
}

ion-progress-bar {
	--background: var(--ion-color-light);
	--progress-background: var(--ion-color-primary);
	height: 20px;
	width: 70%;
	margin: auto;
}
.passed {
	--background: var(--ion-color-success);
}

.secondTry {
	--background: var(--ion-color-danger);
}

.firstTry {
	--background: var(--ion-color-warning);
}

.gray {
	--background: white;
}

ion-card {
	width: 100%;
	height: 100%;
	text-align: center;
	color: black;
	border-radius: 15px;
}

#cpInfo {
	text-align: center;
}

#moduleRow {
	width: 100%;
	margin-left: 5px;
	margin-right: 5px;
	background-color: var(--ion-color-success-tint);
	border-radius: 10px;
}

#moduleElement {
	height: 50px;
	margin: 0px;
	box-shadow: 5px 5px 10px grey;
}

#note {
	color: white;
}

#averageGrade {
	color: var(--ion-color-primary);
	text-align: center;
	margin-top: 10px;
}

#removeSemesterIcon {
	background-color: var(--ion-color-success-tint);
	text-align: center;
	margin-top: 23px;
	border-radius: 15px;
	width: 30px;
	margin-left: 10px;
	--ionicon-stroke-width: 80px;
	padding: 3px;
	color: var(--ion-color-light);
	box-shadow: 1px 1px 7px grey;
}

#addSemester {
	margin-left: 15px;
	background-color: transparent;
}

#addSemesterIcon {
	background-color: var(--ion-color-success-tint);
	text-align: center;
	border-radius: 15px;
	width: 30px;
	margin-right: 15px;
	margin-top: 5px;
	--ionicon-stroke-width: 80px;
	padding: 3px;
	color: var(--ion-color-light);
	box-shadow: 1px 1px 7px grey;
}

#legend {
	text-align: center;
	font-size: large;
	margin-top: 25px;
}

#legendBadge {
	box-shadow: 1px 1px 7px grey;
}

.draggable-list {
	background: #3f51b5;
	color: #fff;
	border: 1px solid;
	height: 50vh;
}
.list-item {
	margin: 10px;
	padding: 40px;
	cursor: pointer;
	font-size: 18px;
	border-radius: 5px;
	background: #f44336;
	display: inline-block;
}
</style>
