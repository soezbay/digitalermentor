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
				<ion-title>Studienverlauf</ion-title>
				<ion-buttons slot="end">
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<h3 id="titel">Studienverlaufsübersicht</h3>
			<ion-progress-bar :value="progress" :buffer="1"></ion-progress-bar>
			<div id="cpInfo">{{ reachedCreditPoints }}/{{ fullCreditPoints }} CP</div>
			<div id="averageGrade">
				Dein Notendurchschnitt:
				{{ calculateAverageGrade().toFixed(2).replace(".", ",") }} <br />
			</div>
			<ion-grid
				:fixed="true"
				v-for="(semesterModules, semester) in groupedModules"
				:key="semester">
				<ion-row :key="semester">
					<ion-col size="12">
						<!-- Zeige nur Semester ab 1. Semester (da 0. Semester Wahlmodule sind)-->
						<ion-row v-if="semester >= 1">
							<h2>{{ semester }}.Semester</h2>
							<!-- Remove Button wird nur angezeigt für das letzte Semester und nur, wenn es leer ist -->
							<ion-icon
								:icon="remove"
								id="removeSemesterIcon"
								v-if="
									semester === Object.keys(groupedModules).length - 1 &&
									emptySemesters != 0 &&
									groupedModules[semester].length === 0
								"
								@click="removeEmptySemester"></ion-icon>
							<ion-icon
								:icon="remove"
								id="removeSemesterIconUnabled"
								v-else-if="
									semester === Object.keys(groupedModules).length - 1 &&
									emptySemesters != 0
								"
								@click="setOpen(true)"></ion-icon>

							<ion-toast
								:is-open="isOpen"
								message="Entferne alle Module um das Semester zu löschen."
								:duration="4000"
								@didDismiss="setOpen(false)"></ion-toast>
						</ion-row>
					</ion-col>
					<span class="modulesRow" @drop="drop" @dragover="dragOver">
						<!-- Zeige nur Semester ab 1. Semester (da 0. Semester Wahlmodule sind)-->
						<ion-row
							class="modulesContainer"
							id="parentContainer"
							:key="`modules-${semester}`"
							v-if="semester >= 1"
							:data-semester="semester"
							@dragenter="dragEnter"
							@dragleave="dragLeave">
							<ion-col
								size="4"
								v-for="(module, index) in semesterModules"
								:key="index">
								<ion-card
									class="pflichtModuleElement"
									:draggable="!isPassedModules(module)"
									:data-semester="semester"
									:id="module.Kuerzel"
									@dragstart="(e) => dragStart(e, module.Kuerzel, semester)"
									:class="getModuleStatusClass(module)">
									<span>{{ module.Kuerzel }}</span> <br />
									<span id="note">
										{{ getStudentModuleNoteForPass(module) }}</span
									>
								</ion-card>
							</ion-col>
						</ion-row>
					</span>
				</ion-row>
			</ion-grid>

			<ion-grid
				:fixed="true"
				v-for="(semesterModules, semester) in groupedModules"
				:key="semester">
				<ion-row>
					<ion-col size="12">
						<ion-buttons v-if="semester == 0" id="addSemester">
							<ion-button @click="addEmptySemester">
								<ion-icon :icon="add" id="addSemesterIcon"></ion-icon>
								<h5>Semester hinzufügen</h5></ion-button
							>
						</ion-buttons>
						<ion-row>
							<h2 v-if="semester == 0">Wahlpflichtmodule</h2>
						</ion-row>
					</ion-col>
					<div class="modulesRow" @drop="drop" @dragover="dragOver">
						<ion-row
							:key="`modules-${semester}`"
							class="modulesContainer"
							v-if="semester == 0"
							:data-semester="semester">
							<ion-col
								size="4"
								v-for="(module, index) in semesterModules"
								:key="index">
								<ion-card
									class="pflichtModuleElement"
									draggable="true"
									:data-semester="semester"
									@dragstart="(e) => dragStart(e, module.Kuerzel, semester)"
									:id="module.Kuerzel"
									:class="getModuleStatusClass(module)">
									<span>{{ module.Kuerzel }}</span> <br />
									<span id="note">{{
										getStudentModuleNoteForPass(module)
									}}</span>
								</ion-card>
							</ion-col>
						</ion-row>
					</div>
				</ion-row>
			</ion-grid>

			<div id="legend">
				<ion-badge id="legendBadge" color="primary">&nbsp;</ion-badge>
				<span> Bestanden </span>
				<ion-badge id="legendBadge" color="warning">&nbsp;</ion-badge>
				<span> 2. Versuch </span>
				<ion-badge id="legendBadge" color="danger">&nbsp;</ion-badge>
				<span> 3. Versuch </span>
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
	IonCard,
	IonToast,
} from "@ionic/vue";
import { remove, add, ellipse } from "ionicons/icons";

import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
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
		IonCard,
		IonToast,
	},

	setup() {
		const isOpen = ref(false);

		const setOpen = (state) => {
			isOpen.value = state;
		};

		const showToast = () => {
			isOpen.value = true;
		};

		return {
			remove,
			add,
			ellipse,
			isOpen,
			setOpen,
			showToast,
		};
	},
	data() {
		return {
			modules: [], // Alle Module aus der Datenbank
			groupedModules: [], // Neues Datenattribut für gruppierte Module
			electiveModules: [], // Wahlpflichtmodule
			fullCreditPoints: 180, // Zu erreichenden Credit Points
			studentID: "test123",
			studentProgress: [], // Teilgenommene Module des Studierenden
			emptySemesters: 0, // Anzahl der leeren Semester
			enabled: true,
			targetSemesterModules: [],
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
					this.groupModules();
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// Methode, um ein leeres Semester hinzuzufügen
		addEmptySemester() {
			this.emptySemesters++;
			// Fügen Sie dann ein leeres Array für das neue Semester hinzu
			this.groupedModules.push([]);
		},

		// Methode, um ein leeres Semester zu entfernen
		removeEmptySemester() {
			if (this.emptySemesters > 0) {
				this.emptySemesters--;
				this.groupedModules.pop([]);
			}
		},

		// Funktion zum Gruppieren der Module nach Semestern
		groupModulesBySemester(modules) {
			const groupedObliModules = [];

			modules.forEach((module) => {
				const semester = module.Semester;

				if (!groupedObliModules[semester]) {
					groupedObliModules[semester] = [];
				}

				groupedObliModules[semester].push(module);
			});

			return groupedObliModules;
		},

		// Rufen Sie diese Methode auf, um die Module zu gruppieren
		groupModules() {
			// Erstellen Sie eine tiefe Kopie von electiveModules
			const clonedElectiveModules = JSON.parse(
				JSON.stringify(this.electiveModules)
			);
			this.groupedModules = [
				clonedElectiveModules,
				...this.groupModulesBySemester(this.modules).filter(Array),
			];
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
		dragStart(event, moduleKuerzel, semester) {
			// Überprüft, ob das ausgewählte Modul Bestanden ist
			const passedCheck = this.studentProgress.some(
				(module) =>
					module.Kuerzel === moduleKuerzel && module.Status === "Bestanden"
			);

			// Wenn ja, dann soll es nicht draggable sein
			if (!passedCheck) {
				event.dataTransfer.setData(
					"text/plain",
					JSON.stringify({ moduleKuerzel, semester })
				);
				event.target.classList.add("drag-start");
				console.log("dragStart");
			} else {
				event.target.setAttribute("draggable", false);
			}
		},

		dragEnter(e) {
			e.preventDefault();
			e.target.classList.add("drag-enter");
			console.log("dragEnter");
		},

		dragOver(e) {
			e.preventDefault();
			e.target.classList.add("drag-over");
			console.log("dragOver");
		},

		dragLeave(e) {
			e.target.classList.remove("drag-enter");
			console.log("dragLeave");
			e.target.classList.remove("drag-over");
		},

		drop(e) {
			e.target.classList.remove("drag-over");
			e.target.classList.remove("drag-start");
			e.target.classList.remove("drag-enter");

			// Holen Sie sich die gezogenen Daten
			const data = e.dataTransfer.getData("text/plain");
			const { moduleKuerzel, semester } = JSON.parse(data);

			const targetSemester = e.target.dataset.semester;
			let electiveModuleCheck = this.electiveModules.some(
				(electiveModule) => electiveModule.Kuerzel === moduleKuerzel
			);

			if(targetSemester != 0) {
				electiveModuleCheck = true;
			}

			console.log(
				"target semester: " + targetSemester + "semester: " + semester
			);
			console.log(electiveModuleCheck);

			if (targetSemester != semester && electiveModuleCheck) {
				// Zugriff auf die Semester-Arrays
				const sourceSemesterArray = this.groupedModules[semester];
				const targetSemesterArray = this.groupedModules[targetSemester];

				// Finde das Index des Moduls im Quellsemester-Array
				const moduleIndex = sourceSemesterArray.findIndex(
					(module) => module.Kuerzel === moduleKuerzel
				);

				if (moduleIndex !== -1) {
					// Entferne das Modul aus dem Quellsemester-Array
					const removedModule = sourceSemesterArray.splice(moduleIndex, 1)[0];

					// Füge das Modul zum Zielsemester-Array hinzu
					targetSemesterArray.push(removedModule);

					// Führe eine Aktualisierung der Vue.js-Ansicht durch
					this.$forceUpdate();
				}
			}
		},

		isPassedModules(module) {
			return this.getModuleStatusClass(module) === "passed";
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
		addEmptySemesters() {
			// Füge leere Semester basierend auf this.emptySemesters hinzu
			for (let i = 1; i <= this.emptySemesters; i++) {
				const semesterNumber = Object.keys(this.groupedModules).length;
				this.groupedModules[semesterNumber] = [];
				this.$forceUpdate();
			}

			return groupedModules;
		},
	},
});
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
	margin-left: auto;
	margin-right: auto;
	margin-top: 30px;
}
.passed {
	--background: var(--ion-color-primary);
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

/* .drag-start:active {
	transform: rotate(5deg);
} */

.modulesRow {
	width: 100%;
	margin-left: 5px;
	margin-right: 5px;
}
.modulesContainer {
	height: auto;
	min-height: 50px;
	background-color: #d2d69e;
	width: 100%;
	margin-left: 5px;
	margin-right: 5px;
	border-radius: 10px;
}

.pflichtModuleElement {
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
	background-color: var(--ion-color-primary);
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

#removeSemesterIconUnabled {
	background-color: var(--ion-color-primary);
	text-align: center;
	margin-top: 23px;
	border-radius: 15px;
	width: 30px;
	margin-left: 10px;
	--ionicon-stroke-width: 80px;
	padding: 3px;
	color: var(--ion-color-light);
	box-shadow: 1px 1px 7px grey;
	opacity: 0.5;
}

ion-toast {
	--background: var(--ion-color-warning);
	--box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
	--color: #000000;
}

#addSemester {
	margin-left: 0px;
	background-color: transparent;
}

#addSemesterIcon {
	background-color: var(--ion-color-primary);
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
.list-item {
	margin: 10px;
	padding: 40px;
	cursor: pointer;
	font-size: 18px;
	border-radius: 5px;
	background: #f44336;
	display: inline-block;
}

.emptySemesterRow {
	height: 50px;
	background: #d2d69e;
}
</style>
