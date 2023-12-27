<template>
	<ion-page>
		<HeaderComponent :title="texts.titel.dashboard" :hasInfo="false" />
		<ion-content>
			<ion-header id="displayUsername">
				{{ getGreeting() }}, {{ getUsername() }}
			</ion-header>
			<ion-grid>
				<ion-row>
					<ion-col
						size="12"
						size-md="6"
						class="ion-padding-horizontal ion-padding-top">
						<ion-item
							color="primary"
							router-link="/menu/studienziele"
							id="header"
							detail="true"
							lines="none"
							class="rounded-item ion-margin-horizontal">
							<ion-label class="custom-label"> {{ texts.ziele.deineZiele }} </ion-label>
						</ion-item>
						<div class="semester-container ion-padding-bottom">
							<ion-label class="semester-label" style="font-size: larger"
								>{{ texts.studium.sommersemester }}</ion-label
							>
							<ion-label class="semester-label" style="font-size: larger"
								>{{ texts.studium.wintersemester }}</ion-label
							>
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
									<ion-item
										v-if="goals_ss.length > 1"
										lines="none"
										color="#d2d69e"
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
									<ion-item
										v-if="goals_ws.length > 1"
										lines="none"
										color="#d2d69e"
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
						<div><img src="/resources/DigitalerMentor-Koala.png" alt="Digitaler Mentor Koala" class="koala-image"></div>	
					</ion-col>
					<ion-header style="height: 0.3%"></ion-header>

					<ion-col
						size="12"
						size-md="6"
						class="ion-padding-horizontal ion-padding-top">
						<ion-item
							color="primary"
							router-link="/termine"
							id="header"
							detail="true"
							lines="none"
							class="rounded-item ion-margin-horizontal">
							<ion-label class="custom-label">{{ texts.dashboard.deineTermine }}</ion-label>
						</ion-item>
						<div v-if="kommendeTermine.length > 0">
							<ion-list
								v-for="termin in kommendeTermine"
								:router-link="`/termine/${termin.id}`"
								style="padding: 0%"
                                :key="termin">
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
							<ion-datetime
								presentation="date"
								v-model="selectedDate"
								:highlighted-dates="highlightedDates"
								size="cover"
								max="2100-01-01T00:00:00">
							</ion-datetime>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script>
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
} from '@ionic/vue'

import axios from 'axios'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { texts } from '../texts.js'
import HeaderComponent from '../views/Components/HeaderComponent.vue'


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
			Adress : import.meta.env.VITE_API_URL,
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
	},
	mounted() {
		this.getData()
	},
	computed: {
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
	font-size: 45px;
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
