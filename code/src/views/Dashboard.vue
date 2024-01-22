<template>
	<ion-page>
		<HeaderComponent :title="texts.titel.dashboard" :hasInfo="false" />
		<ion-content>
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<ion-header id="displayUsername">
				{{ getGreeting() }}, {{ getUsername() }}
			</ion-header>

			<ion-grid>
				<ion-row>
					<ion-col size="12" size-md="6" class="ion-padding-horizontal ion-padding-top">
						<ion-item color="primary" router-link="/menu/studienverlauf" id="header" detail="true" lines="none"
							class="rounded-item ion-margin-horizontal">
							<ion-label class="custom-label"> Aktuelle Module und LP </ion-label>
						</ion-item>
						<div>
							<div style="text-align: center;">
								<h5 style="margin-bottom: 0; padding-bottom: 0;">
									{{ this.currentSemester }}. {{ texts.studium.semester }}
									<ion-label color="primary">{{ calculateAverageGrade().toFixed(2).replace('.', ',') + "⌀"
									}}</ion-label>
								</h5>
							</div>
							<ion-progress-bar :value="progress" :buffer="1"></ion-progress-bar>
							<div style="text-align: center; padding-top: 5px;">
								<ion-label>
									{{ reachedCreditPoints + '\/' + fullCreditPoints + ' ' +
										texts.studium.leistungspunkteKurz }}
								</ion-label>
							</div>
						</div>
						<ion-grid>
							<ion-row>
								<ion-col size="10">
									<ion-row class="modulesRow">
										<ion-row class="modulesContainer">
											<ion-col size="4"
												v-for="(module, index) in groupedModules[this.currentSemester]"
												:key="index">
												<!-- Bestandene Module können nicht verschoben werden -->
												<ion-card :class="getModuleClass(module)">
													<ion-label style="color: #000000; font-weight: bolder;">
														{{ module.Kuerzel }}
													</ion-label>
													<br>
													<ion-label style="color: #000000; font-weight: bolder;">
														{{ getGradeOfModule(module) }}
													</ion-label>
												</ion-card>
											</ion-col>
										</ion-row>
									</ion-row>
								</ion-col>
							</ion-row>
						</ion-grid>
						<!-- Legende -->
						<LegendComponent :hasPassed="true" />

						<br>
						<ion-item color="primary" router-link="/menu/studienziele" id="header" detail="true" lines="none"
							class="rounded-item ion-margin-horizontal">
							<ion-label class="custom-label"> {{ texts.ziele.deineZiele }} </ion-label>
						</ion-item>
						<div class="semester-container ion-padding-bottom">
							<ion-label class="semester-label">
								{{ texts.studium.sommersemester }}
							</ion-label>
							<ion-label class="semester-label">
								{{ texts.studium.wintersemester }}
							</ion-label>
						</div>
						<div class="ziel-container">
							<ion-list class="drag-drop-containers">
								<div v-if="goals_ss.length >= 1" class="drag-drop-box-item">
									<ion-item lines="none" color="#d2d69e" class="item-container">
										<ion-label class="card-label">
											<h2>{{ goals_ss[0].titel }}</h2>
											<p>{{ goals_ss[0].beschreibung }}</p>
										</ion-label>
									</ion-item>
									<ion-item v-if="goals_ss.length > 1" lines="none" color="#d2d69e"
										class="item-container">
										<ion-label class="card-label">
											<h2>{{ goals_ss[1].titel }}</h2>
											<p>{{ goals_ss[1].beschreibung }}</p>
										</ion-label>
									</ion-item>
								</div>
							</ion-list>
							<div class="ziel-separator"></div>
							<ion-list class="drag-drop-containers">
								<div v-if="goals_ws.length >= 1" class="drag-drop-box-item">
									<ion-item lines="none" color="#d2d69e" class="item-container">
										<ion-label class="card-label">
											<h2>{{ goals_ws[0].titel }}</h2>
											<p>{{ goals_ws[0].beschreibung }}</p>
										</ion-label>
									</ion-item>
									<ion-item v-if="goals_ws.length > 1" lines="none" color="#d2d69e"
										class="item-container">
										<ion-label class="card-label">
											<h2>{{ goals_ws[1].titel }}</h2>
											<p>{{ goals_ws[1].beschreibung }}</p>
										</ion-label>
									</ion-item>
								</div>
							</ion-list>
						</div>
					</ion-col>
					<ion-header style="height: 0.3%"></ion-header>

					<ion-col size="12" size-md="6" class="ion-padding-horizontal ion-padding-top">
						<ion-item color="primary" router-link="/menu/termine" id="header" detail="true" lines="none"
							class="rounded-item ion-margin-horizontal">
							<ion-label class="custom-label">{{ texts.dashboard.deineTermine }}</ion-label>
						</ion-item>
						<div v-if="kommendeTermine.length > 0">
							<ion-list v-for="termin in kommendeTermine" :router-link="`/termine/${termin.id}`"
								style="padding: 0%" :key="termin">
								<ion-item class="ktlab" lines="none">
									<ion-label>
										<h2>{{ termin.titel }}</h2>
										<h3>{{ termin.ort }}</h3>
									</ion-label>
									<ion-label slot="end">
										<h2>{{ formatDate(termin.datum) }} - {{ termin.zeit }}</h2>
									</ion-label>
								</ion-item>
							</ion-list>
						</div>
						<div v-else>
							<ion-item style="text-align: center">
								<ion-label class="custom-text ion-padding">
									<h2>{{ texts.dashboard.keineTermine }}</h2>
								</ion-label>
							</ion-item>
						</div>
						<br />
						<div class="dateDiv">
							<ion-datetime presentation="date" v-model="selectedDate" :highlighted-dates="highlightedDates"
								size="cover" max="2100-01-01T00:00:00" first-day-of-week="1">
							</ion-datetime>
						</div>
						<div><img src="/resources/DigitalerMentor_Koala_Sprechblase.png" alt="Digitaler Mentor Koala"
								class="koala-image">
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script>

import axios from 'axios'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { texts } from '../texts.js'
import HeaderComponent from '../views/Components/HeaderComponent.vue'
import Studienverlauf from './Studienverlauf.vue'
import LegendComponent from '../views/Components/LegendComponent.vue'

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonButtons,
	IonButton,
	IonMenuButton,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonIcon,
	IonDatetime,
	IonProgressBar,
	IonCard,
	IonRefresher,
	IonRefresherContent
} from '@ionic/vue'

export default {
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonGrid,
		IonRow,
		IonCol,
		IonButtons,
		IonButton,
		IonMenuButton,
		IonItem,
		IonLabel,
		IonList,
		IonListHeader,
		IonIcon,
		IonDatetime,
		HeaderComponent,
		IonProgressBar,
		Studienverlauf,
		IonCard,
		IonRefresher,
		IonRefresherContent,
		LegendComponent,
	},
	setup() {

		const handleRefresh = (event) => {
			setTimeout(() => {
				// Any calls to load data go here
				event.target.complete();
				// Reload the page
				window.location.reload();
			}, 1000);
		};

		const store = useStore()

		const termine = computed(() => {
			const terminArr = store.getters.termine
			return terminArr
		})

		const highlightedDates = computed(() => {
			// Generate highlightedDates from your Vuex store data
			return termine.value.map(termine => {
				return {
					date: termine.datum, // Use the appropriate property from your termine data
					textColor: '#000000', // Customize as needed
					backgroundColor: '#d2d69e', // Customize as needed
				}
			})
		})

		const formatDate = dateString => {
			// Show date as dd-mm-yyyy on dashboard
			const date = new Date(dateString);
			const day = date.getDate();
			const month = date.getMonth() + 1; // Monate in JavaScript sind 0-basiert
			const year = date.getFullYear();

			return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
		}

		return {
			highlightedDates,
			formatDate,
			handleRefresh
		}
	},
	data() {
		return {
			Adress: import.meta.env.VITE_API_URL,
			studentID: 'test123',
			currentSemester: 1,
			modules: [], // Alle Module aus der Datenbank
			groupedModules: [], // Neues Datenattribut für gruppierte Module
			electiveModules: [], // Wahlpflichtmodule
			studentProgress: [], // Teilgenommene Module des Studierenden
			fullCreditPoints: 180,
			usersList: [],
			selectedDate: new Date().toISOString(),
			texts,
		}
	},
	methods: {
		getData() {
			axios
				.get(`${this.Adress}/bewertung`)
				.then(Response => {
					console.log(Response.data)
					this.usersList = Response.data.bewertungen
				})
				.catch(err => {
					console.log(err)
				})
			axios
				.get(`${this.Adress}/modul/status/${this.studentID}`)
				.then(Response => {
					console.log(Response.data);
					this.studentProgress = Response.data.modul;
					this.$store.dispatch('updateStudentProgress', this.studentProgress);
				})
				.catch(err => {
					console.log(err)
				})
			axios
				.get(`${this.Adress}/studiengang/pflicht/pi`)
				.then(Response => {
					console.log(Response.data);
					this.modules = Response.data.pflicht;
					this.$store.dispatch('updateObligatoryModules', this.modules);
				})
				.catch(err => {
					console.log(err)
				})
			axios
				.get(`${this.Adress}/studiengang/wahlpflicht/pi`)
				.then(Response => {
					console.log(Response.data);
					this.electiveModules = Response.data.wahlpflicht;
					this.$store.dispatch('updateElectiveModules', this.electiveModules);
				})
				.catch(err => {
					console.log(err)
				})
		},
		getGreeting() {
			const currentTime = new Date()
			const currentHour = currentTime.getHours()

			if (currentHour >= 5 && currentHour < 12) {
				return 'Guten Morgen'
			} else if (currentHour >= 12 && currentHour < 18) {
				return 'Hallo'
			} else {
				return 'Guten Abend'
			}
		},
		getUsername() {
			return 'Username' + '!'
		},

		// Funktion zur Berechnung der erreichten Credit Points
		calculateCreditPoints() {
			let totalCreditPoints = 0

			for (const progressModule of this.studentProgress) {
				if (progressModule.Status === 'Bestanden') {
					// Findet das entsprechende Modul im Array 'modules' und fügt die Credit Points hinzu
					const matchingModule = this.modules.find(
						module => module.Kuerzel === progressModule.Kuerzel
					)
					if (matchingModule) {
						totalCreditPoints += matchingModule.Leistungspunkte
					}
				}
			}

			return totalCreditPoints
		},

		// Durchschnittsnote berechnen
		calculateAverageGrade() {
			try {
				let totalGrade = 0
				let totalModules = 0
				let totalCreditPoints = 0

				for (const progressModule of this.studentProgress) {
					if (progressModule.Status === 'Bestanden') {
						// Findet das entsprechende Modul im Array 'modules' und fügt die Credit Points hinzu
						const matchingModule = this.modules.find(
							module => module.Kuerzel === progressModule.Kuerzel
						)
						if (matchingModule) {
							totalCreditPoints += matchingModule.Leistungspunkte
						}

						totalGrade +=
							parseFloat(progressModule.Note) * matchingModule.Leistungspunkte
						totalModules++
					}
				}

				if (totalModules === 0) {
					return 0 // Keine bestandenen Module, Durchschnittsnote ist 0
				}

				return totalGrade / totalCreditPoints
			} catch (err) {
				console.log(err);
				return 0;
			}
		},
		getModuleClass(module) {
			try {
				//Check if module is passed
				const succededModule = this.studentProgress.find(
					smodule => smodule.Kuerzel === module.Kuerzel && smodule.Status === 'Bestanden');
				if (succededModule) {
					return 'moduleElementSuccess';
				}

				//if succededArray is empty then continue finding exam-trys
				const foundModules = this.studentProgress.find(smodule => smodule.Kuerzel === module.Kuerzel);
				if (foundModules.Versuch === 1 && foundModules.Status === 'Nicht Bestanden') {
					return 'moduleElement moduleElement2';
				} else if (foundModules.Versuch === 2 && foundModules.Status === 'Nicht Bestanden') {
					return 'moduleElement moduleElement3';
				} else if (foundModules.Versuch === 3 && foundModules.Status === 'Nicht Bestanden') {
					return 'moduleElement moduleElementFailed';
				} else {
					return 'moduleElement moduleElement1'; // Fallback, wenn keine spezifische Klasse gefunden wird
				}
			} catch (err) {
				return 'moduleElement moduleElement1';
			}
		},

		getGradeOfModule(module) {
			try {
				const grade = this.studentProgress.find(smodule => smodule.Kuerzel === module.Kuerzel).Note
				if (grade) {
					return "Note: " + grade;
				} else {
					return " ";
				}
			} catch (err) {
				return ' ';
			}

		},
	},

	mounted() {
		this.groupedModules = this.$store.getters.getGroupedModules;
		this.studentProgress = this.$store.getters.getStudentProgress;
		this.modules = this.$store.getters.getObligatoryModules;
		this.electiveModules = this.$store.getters.getElectiveModules;
		this.getData()
	},
	computed: {
		// Berechnung der erreichten Credit Points des Studenten
		reachedCreditPoints() {
			const rcp = this.calculateCreditPoints();
			console.log("Dein RCP: ", rcp);
			return rcp;
		},

		// Berechne Prozent der erreichten Credit Points für den Progress Bar
		progress() {
			const progress = this.reachedCreditPoints / this.fullCreditPoints;
			console.log("Dein Progress", progress);
			return progress //volle creditpunkte sind 180
		},

		// Only the first four appointments are taken to dashbaord
		kommendeTermine() {
			const heute = new Date();
			heute.setHours(0, 0, 0, 0); // Setzt die Zeit auf Mitternacht

			// Filtert Termine, die ab dem heutigen Datum oder später stattfinden
			const kommendeTermine = this.$store.getters.termine.filter((termin) => {
				const terminDatum = new Date(termin.datum);
				return terminDatum >= heute;
			});

			// Return the first four upcoming appointments
			return kommendeTermine.slice(0, 4);
		},

		goals_ss() {
			return this.$store.getters.getGoals_ss
		},
		goals_ws() {
			return this.$store.getters.getGoals_ws
		},
	},
}


</script>

<style scoped>
.cpInfo {
	text-align: center;
}

.averageGrade {
	color: var(--ion-color-primary);
	text-align: center;
	margin-top: px;
}

ion-progress-bar {
	border-radius: 10px;
	--background: #d3d3d3;
	--progress-background: var(--ion-color-primary);
	box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
	height: 20px;
	width: 70%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	margin-bottom: 10px;
}

.modulesRow {
	width: 100%;
	padding-top: 5px;
	padding-bottom: 5px;
	margin-left: 33px;
	margin-right: 5px;
	background-color: var(--ion-color-secondary);
	border-radius: 10px;

	@media (prefers-color-scheme: dark) {
		/* Hintergrundfarbe für Dark Mode */
		background-color: transparent;
		border: 2px solid;
		border-color: var(--ion-color-secondary);
	}
}

.modulesContainer {
	height: auto;
	min-height: 50px;
	background-color: transparent;
	width: 100%;
	margin-left: 5px;
	margin-right: 5px;
}

.moduleElement1 {
	height: 50px;
	margin: 0px;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
}

.moduleElement2 {
	height: 50px;
	margin: 0px;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
	background-color: var(--ion-color-warning);
}

.moduleElement3 {
	height: 50px;
	margin: 0px;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
	background-color: var(--ion-color-danger);
}

.moduleElementSuccess {
	height: 50px;
	margin: 0px;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
	background-color: var(--ion-color-primary);
}

.moduleElementFailed {
	height: 50px;
	margin: 0px;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
	background-color: var(--ion-color-medium);
}

.custom-text {
	color: #555;
}

.custom-label {
	color: white;
	font-size: 20px;
}

@media screen and (min-width: 992px) {
	.ion-padding-horizontal {
		padding: 20px;
	}
}

.rounded-item {
	border-radius: 15px;
	overflow: hidden;
	width: auto;
	justify-content: center;
}

@media screen and (min-width: 992px) {
	.ion-margin-horizontal {
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 5px;
	}
}

@media (min-width: 1035px) {
	.dateDiv {
		max-width: 1400px;
		padding-left: 20px;
		padding-right: 20px;
		margin-bottom: 5px;
	}
}

.drag-drop-containers {
	width: 50%;
}

.semester-container {
	display: flex;
	padding-top: 25px;
	background: var(--ion-item-background, var(--ion-background-color, #fff));
}

.semester-label {
	width: 50%;
	font-size: larger;
	text-align: center;
	display: inline-block;
	font-size: larger;
}

.ziel-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.ziel-separator {
	border-left: 2px solid #ccc;
	height: 130px;
	margin: 0 3px;
}

.drag-drop-box-item {
	margin: 5px;
	border-radius: 30px;
	text-align: left;
}

.item-container {
	margin: 5px;
	border-radius: 30px;
	text-align: left;
	background-color: #d2d69e;
	text-align: center;
	color: black;
}

#flexbox1 {
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 2%;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}

#flexbox1 ion-item {
	margin: 1%;
	width: 85px;
	text-align: center;
	border-radius: 20px;
}

#displayUsername {
	font-family: 'Blessing', sans-serif;
	padding: 20px;
	padding-bottom: 5px;
	font-size: 35px;
	text-align: center;
}

#header {
	font-size: larger;
	text-align: center;
	transition: 0.8s;
}

#header:hover {
	opacity: 0.5;
}

#header ion-label {
	padding-left: 10px;
}

.dateDiv {
	margin: 10px;
}

.ktlab {
	--background: var(--ion-color-secondary);
	border-radius: 20px;
	margin: 3px;
	margin-left: 35px;
	margin-right: 30px;
	color: black;
	transition: 0.3s
}

ion-datetime {
	/* background: var(--ion-item-background, var(--ion-background-color, #d2d69e)); */
	margin-top: -20px;
	border: 2px solid var(--ion-color-secondary);
	color: var(--ion-color #fff);
	border-radius: 16px;
}

@media only screen and (min-width: 768px) {
	.koala-image {
		margin-top: 20px;
		height: 230px;
		float: right;
		margin-right: 25px;
	}
}

@media only screen and (max-width: 767px) {
	.koala-image {
		display: none;
	}
}


.hidden {
	opacity: 0;
	pointer-events: none;
}

/* label for modules and lp, goals and appointments */
.custom-label {
	color: var(--ion-color-light);
	font-weight: bold;
}

/* move to the left */
ion-title {
	margin-left: -5px;
}

#legend {
	text-align: center;
	font-size: medium;
	margin-top: 25px;
}

#legendBadge {
	margin-right: 5px;
	margin-left: 5px;
}
</style>
