<template>
	<ion-page>
		<HeaderComponent :title="texts.titel.dashboard" :hasInfo="false" />
		<ion-content>
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
						<div><img src="/resources/Sprechblase.png" alt="Sprechblase" class="speechbubble"></div>
						<div><img src="/resources/DigitalerMentor-Koala.png" alt="Digitaler Mentor Koala"
								class="koala-image"></div>
					</ion-col>
					<ion-header style="height: 0.3%"></ion-header>

					<ion-col size="12" size-md="6" class="ion-padding-horizontal ion-padding-top">
						<ion-item color="primary" router-link="/termine" id="header" detail="true" lines="none"
							class="rounded-item ion-margin-horizontal">
							<ion-label class="custom-label">{{ texts.dashboard.deineTermine }}</ion-label>
						</ion-item>
						<div v-if="kommendeTermine.length > 0">
							<ion-list v-for="termin in kommendeTermine" :router-link="`/termine/${termin.id}`"
								style="padding: 0%" :key="termin">
								<ion-item style="background-color: #3d3e40">
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
								size="cover" max="2100-01-01T00:00:00">
							</ion-datetime>
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
	IonCard
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
		IonCard
	},
	setup() {
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
					backgroundColor: '#D7D5D5', // Customize as needed
				}
			})
		})

		const formatDate = dateString => {
			const parts = dateString.split('-')
			if (parts.length === 3) {
				const [year, month, day] = parts
				return `${day}.${month}.${year}`
			}
			return dateString // Rückgabe des ursprünglichen Datums, falls das Format ungültig ist
		}

		return {
			highlightedDates,
			formatDate,
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
		},
		getModuleClass(module) {
			const succededModule = this.studentProgress.find(smodule => smodule.Kuerzel === module.Kuerzel);
			console.log("SUCCEDEDMODULES: ", succededModule);
			if (succededModule.Status === 'Bestanden') {
				return 'moduleElementSuccess';
			} else if (succededModule.Versuch === 1 && succededModule.Status === 'Nicht Bestanden') {
				return 'moduleElement2';
			} else if (succededModule.Versuch === 2 && succededModule.Status === 'Nicht Bestanden') {
				return 'moduleElement3';
			} else if (succededModule.Versuch === 3 && succededModule.Status === 'Nicht Bestanden') {
				return 'moduleElementFailed';
			} else {
				return 'moduleElement1'; // Fallback, wenn keine spezifische Klasse gefunden wird
			}
		},

		getGradeOfModule(module) {
			const grade = this.studentProgress.find(smodule => smodule.Kuerzel === module.Kuerzel).Note
			if(grade) {
				return "Note: " + grade;
			} else {
				return " ";
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
			const currentDate = new Date()
			const kommendeTermine = this.$store.getters.termine.filter(termin => {
				const terminDate = new Date(termin.datum)
				return terminDate >= currentDate
			})

			return kommendeTermine.slice(0, 4)
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
	--background: var(--ion-color-light);
	--progress-background: var(--ion-color-primary);
	height: 20px;
	width: 70%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
}

.modulesRow {
	width: 100%;
	margin-left: 33px;
	margin-right: 5px;
	background-color: var(--ion-color-secondary);
	border-radius: 10px;
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
	box-shadow: 5px 5px 10px grey;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
}

.moduleElement2 {
	height: 50px;
	margin: 0px;
	box-shadow: 5px 5px 10px grey;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
	background-color: var(--ion-color-warning);
}

.moduleElement3 {
	height: 50px;
	margin: 0px;
	box-shadow: 5px 5px 10px grey;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
	background-color: var(--ion-color-danger);
}

.moduleElementSuccess {
	height: 50px;
	margin: 0px;
	box-shadow: 5px 5px 10px grey;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
	background-color: var(--ion-color-primary);
}

.moduleElementFailed {
	height: 50px;
	margin: 0px;
	box-shadow: 5px 5px 10px grey;
	transition: 0.8s;
	text-align: center;
	border-radius: 15px;
	background-color: #555;
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
	}
}

@media (min-width: 1035px) {
	.dateDiv {
		max-width: 1400px;
		padding-left: 20px;
		padding-right: 20px;
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

ion-datetime {
	background: var(--ion-item-background, var(--ion-background-color, #d2d69e));
	color: var(--ion-color #fff);
	border-radius: 16px;
}

@media only screen and (min-width: 768px) {
	.koala-image {
		margin-top: -90px;
		display: inline;
		height: 300px;
		margin-left: -20px;
	}
}

@media only screen and (max-width: 767px) {
	.koala-image {
		display: none;
	}
}

@media only screen and (min-width: 768px) {
	.speechbubble {
		margin-left: 200px;
		margin-top: 100px;
		display: inline;
		height: 90px;
	}
}

@media only screen and (max-width: 767px) {
	.speechbubble {
		display: none;
	}
}

.hidden {
	opacity: 0;
	pointer-events: none;
}
</style>
