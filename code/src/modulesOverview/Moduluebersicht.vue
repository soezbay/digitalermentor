<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button router-link="/menu/dashboard">
						<ion-icon style="font-size: 45px;" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title>Modulübersicht</ion-title>
				<ion-buttons slot="end" style="display: flex; align-items: center">
					<ion-button class="infoButton" color="primary" id="open-info-modal" expand="block">
						<ion-icon :icon="helpCircleOutline"></ion-icon>
					</ion-button>
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<!-- ion-grid for "Studiengang and Listenansicht" in one line -->
			<ion-grid>
				<ion-row style="margin-bottom: 7px">
					<!-- ion-col for Studiengang -->
					<ion-col class="studiengang" size="12" size-sm="6">
						<ion-item lines="none">
							<!-- choice between "Studiengängen" -->
							<ion-select v-model="selectedStudiengang" interface="popover" label="Studiengang:"
								placeholder="Studiengang auswählen" :interface-options="{ cssClass: 'custom-ion-select' }"
								slot="start">
								<ion-select-option v-for="studiengang in studiengaenge" :key="studiengang.Kuerzel"
									:value="studiengang.Kuerzel">
									{{ studiengang.Name }}
								</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>

					<!-- ion-col for Listenansicht -->
					<ion-col class="listenansicht" size="12" size-sm="6">
						<ion-item lines="none">
							<!-- ion-toggle for "Listenansicht" -->
							<ion-toggle v-model="showAsList" @click="onToggleChange()" slot="end">Listenansicht</ion-toggle>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-grid>

			<!-- Divider between Semester and Studiengang/Listenansicht -->
			<ion-item-divider></ion-item-divider>

			<!-- Ion Grid for Semester -->
			<div v-if="showAsList === false" class="ion-padding">
				<ion-grid :fixed="true">
					<ion-row v-for="semester in uniqueSemesters" :key="semester">
						<ion-col size="12" size-md="10" style="width: 100%">
							<ion-label class="modulfont">{{ `${semester}. Semester ` }}</ion-label>
							<ion-col size="5">
								<ion-row>
									<ion-card class="modulBlock" v-for="module in getModulesForSemester(semester)"
										:key="module.Kuerzel" @click="openModal(module)">
										<ion-label class="modulLabel">
											{{ module.Kuerzel }}</ion-label>
									</ion-card>
								</ion-row>
							</ion-col>
						</ion-col>
					</ion-row>
					
					<ion-row v-if="modules.wahlpflicht != 0">
						<ion-col size-md="9" size-xs="12" style="width: 100%">
							<ion-label class="modulfont">Wahlpflichtflichtmodule</ion-label>
							<ion-col size="5">
								<ion-row>
									<ion-card class="modulBlock" v-for="module in modules.wahlpflicht" :key="module.Kuerzel"
										@click="openModal(module)">
										<ion-label class="modulLabel">{{
											module.Kuerzel
										}}</ion-label>
									</ion-card>
								</ion-row>
							</ion-col>
						</ion-col>
					</ion-row>
					<div style="height: 300px"></div>
				</ion-grid>
			</div>

			<!--Show modules as List when showAsList=true-->
			<ion-list v-else style="padding: 0">
				<div v-for="semester in uniqueSemesters" :key="semester">
					<ion-list-header class="semesterHeaderList">
						<ion-label>{{ `Semester ${semester}` }}</ion-label>
					</ion-list-header>
					<ion-item v-for="module in getModulesForSemester(semester)" :key="module.Kuerzel"
						@click="openModal(module)">
						<ion-label>{{ module.Name }} ({{ module.Kuerzel }})</ion-label>
						<ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
					</ion-item>
				</div>
				<!-- Show elective Modules after obligatory Modules-->
				<div v-if="modules.wahlpflicht != 0">
					<ion-list-header class="semesterHeaderList">
						<ion-label>Wahlpflichtflichtmodule</ion-label>
					</ion-list-header>
					<ion-item v-for="module in modules.wahlpflicht" :key="module.Kuerzel" @click="openModal(module)">
						<ion-label>{{ module.Name }} ({{ module.Kuerzel }})</ion-label>
						<ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
					</ion-item>
				</div>
				<div style="height: 200px"></div>
			</ion-list>

			<!-- Modal for changing Courses to display -->
			<ion-modal ref="coursesModal" trigger="open-courses-modal">
				<ion-header>
					<ion-toolbar>
						<ion-title>Wähle einen Studiengang aus</ion-title>
					</ion-toolbar>
				</ion-header>
				<ion-content>
					<ion-list>
						<ion-item button v-for="studiengang in studiengaenge" :key="studiengang.Kuerzel"
							:value="studiengang.Kuerzel">
							<ion-label>{{ studiengang.Name }}</ion-label>
						</ion-item>
					</ion-list>
				</ion-content>
			</ion-modal>

			<!--Help-Modal-option for user-->
			<ion-modal class="info-modal" ref="modal_info" trigger="open-info-modal"
				:presenting-element="presentingElement">
				<ion-content>
					<ion-grid>
						<ion-row justify-content-center align-items-center>
							<ion-col size="12">
								<div class="ion-text-center">
									<p><ion-icon :icon="book" style="font-size: 40px; color:#BBCC00"></ion-icon></p>
									<p style="font-size: 22px;">
										<strong>{{ texts.moduluebersicht.erklaerung.p1strong }}</strong>
									</p>
									<p> {{ texts.moduluebersicht.erklaerung.p1 }}</p>
									<p><strong>{{ texts.moduluebersicht.erklaerung.p2strong }}</strong></p>
									<p> {{ texts.moduluebersicht.erklaerung.p2 }}</p>
									<p><strong>{{ texts.moduluebersicht.erklaerung.p3strong }}</strong></p>
									<p> {{ texts.moduluebersicht.erklaerung.p3 }}</p>
									<p><strong>{{ texts.moduluebersicht.erklaerung.p4strong }}</strong></p>
									<p> {{ texts.moduluebersicht.erklaerung.p4 }}</p>
									<p><strong>{{ texts.moduluebersicht.erklaerung.p5strong }}</strong></p>
									<p>{{ texts.moduluebersicht.erklaerung.p5 }}</p>
								</div>
							</ion-col>
						</ion-row>
					</ion-grid>
				</ion-content>
			</ion-modal>

		</ion-content>
	</ion-page>
</template>

<script>

import { helpCircleOutline, book } from 'ionicons/icons'
import { texts } from '../texts.js'
import {
	IonPage, IonContent, IonHeader, IonTitle, IonToolbar,
	IonButtons, IonMenuButton, IonButton,
	IonGrid, IonRow, IonCol,
	IonSearchbar, IonToggle,
	IonSelectOption, IonSelect,
	IonList, IonListHeader, IonItem, IonLabel, IonIcon,
	IonCard, IonCardTitle,
	IonModal, modalController, IonNote
} from '@ionic/vue';
import axios from 'axios';
import Modal from "../Modulbeschreibung.vue";

export default {
	components: {
		IonPage,
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonButton,
		IonGrid,
		IonRow,
		IonCol,
		IonSearchbar,
		IonToggle,
		IonSelectOption,
		IonSelect,
		IonList,
		IonListHeader,
		IonItem,
		IonLabel,
		IonIcon,
		IonCard,
		IonCardTitle,
		IonModal,
		IonNote,
	},

	name: "ModulUebersicht",
	data() {
		return {
			helpCircleOutline, book,
			Adress: import.meta.env.VITE_API_URL,
			showAsList: false,
			selectedStudiengang: null,
			studiengaenge: [],
			texts,
			modules: {
				pflicht: [],// initialize "Pflichtmodule"
				wahlpflicht: []
			}
		};
	},

	computed: {
		uniqueSemesters() {
			// check, if this.modules.pflicht is available, before they are accessed
			if (this.modules.pflicht) {
				const uniqueSemesters = [
					...new Set(this.modules.pflicht.map(module => module.Semester)),
				]

				// sort the unique semesters in ascending order
				uniqueSemesters.sort((a, b) => a - b)

				console.log('Einzigartige Semester:', uniqueSemesters)
				return uniqueSemesters
			} else {
				return []
			}
		},
		settings() {
			console.log('Getting settings:')
			return this.$store.getters.getModuleOverviewData
		},
	},

	created() {
		// console.log("Wir sind hier");
		this.fetchStudiengaenge()
		// console.log("Studiengang= ", this.selectedStudiengang)
		if (this.selectedStudiengang != null) {
			this.fetchPflichtModule(this.selectedStudiengang)
			this.fetchWahplfichtModule(this.selectedStudiengang)
		}
	},

	mounted() {
		this.fetchStudiengaenge()
		console.log('Mounte Settings:')
		console.log(this.settings)
		const lastSetup = this.settings

		if (
			lastSetup.selectedStudiengang !== undefined &&
			lastSetup.selectedStudiengang !== null
		) {
			this.selectedStudiengang = lastSetup.selectedStudiengang
		}
		if (lastSetup.showAsList !== undefined && lastSetup.showAsList !== null) {
			this.showAsList = lastSetup.showAsList
			console.log('Settings Geladen')
		}
	},

	watch: {
		selectedStudiengang(newStudiengang) {
			this.fetchPflichtModule(newStudiengang)
			this.fetchWahplfichtModule(newStudiengang)
			this.onStudiengangChange()
		},
	},

	methods: {
		async fetchStudiengaenge() {
			try {
				console.log(this.Adress)
				const response = await axios.get(`${this.Adress}/studiengang`)
				this.studiengaenge = response.data.studiengaenge
				console.log('Test')
				console.log(this.studiengaenge)
			} catch (error) {
				console.error('Error fetching studiengaenge:', error)
			}
		},

		async fetchPflichtModule() {
			try {
				const response = await fetch(
					`${this.Adress}/studiengang/pflicht/${this.selectedStudiengang}`
				)
				const data = await response.json()
				console.log(data)

				// check if the data is existing in the response
				if (data.pflicht) {
					this.modules.pflicht = data.pflicht
					console.log('Pflichtmodule geladen:', this.modules.pflicht)
				} else {
					console.error('Fehler beim Laden der Pflichtmodule.')
				}
			} catch (error) {
				console.error('Fehler beim Abrufen der Daten:', error)
			}
		},

		async fetchWahplfichtModule(selectedStudiengang) {
			try {
				const response = await axios.get(
					`${this.Adress}/studiengang/wahlpflicht/${this.selectedStudiengang}`
				)
				const data = await response.data
				if (data.wahlpflicht) {
					this.modules.wahlpflicht = data.wahlpflicht
					console.log('Wahlplichtmodule geladen:', this.modules.wahlpflicht)
				} else {
					console.error('Fehler beim Laden der Wahlpflichtflichtmodule.')
				}
			} catch (error) {
				console.error('Fehler beim Abrufen der Daten:', error)
			}
		},
		toggleDescription(semesterIndex, moduleIndex) {
			this.moduleSemesters[semesterIndex][moduleIndex].showDescription =
				!this.moduleSemesters[semesterIndex][moduleIndex].showDescription
		},

		async openModal(selectedModul) {
			console.log('selectedModul:', selectedModul)
			const modal = await modalController
				.create({
					component: Modal,
					componentProps: {
						selectedModul: selectedModul,
					},
				})
				.then(modal => {
					modal.present()
				})
		},

		async openCourses(selectedModul) {
			console.log('selectedModul:', selectedModul)
			const modal = await modalController
				.create({
					component: Modal,
					componentProps: {
						selectedModul: selectedModul,
					},
				})
				.then(modal => {
					modal.present()
				})
		},

		getModulesForSemester(semester) {
			// filter the "Pflichtmodule" based on the selected semester
			return this.modules.pflicht.filter(module => module.Semester === semester)
		},

		// istEinWahlpflichtmodulImSemester(semester) {
		//   const filteredModules = this.modules.wahlpflicht.filter((module) => module.Semester === semester);
		//   return filteredModules.length > 0;
		// },

		// AnzahlPflichtmoduleImSemester(semester) {
		//   const filteredModules = this.modules.pflicht.filter((module) => module.Semester === semester);
		//   return filteredModules.length;
		// },

		maxWahlpflichtCols(semester) {
			const maxCols = 5
			const numPflichtModules = this.getModulesForSemester(semester).length
			const remainingCols = maxCols - numPflichtModules
			return Math.max(0, remainingCols)
		},

		onToggleChange() {
			if (this.showAsList === true) {
				const settingsArr = {
					selectedStudiengang: this.selectedStudiengang,
					showAsList: false,
				}
				this.$store.commit('saveSettingsModuleOverview', settingsArr)
			}
			if (this.showAsList === false) {
				const settingsArr = {
					selectedStudiengang: this.selectedStudiengang,
					showAsList: true,
				}
				this.$store.commit('saveSettingsModuleOverview', settingsArr)
			}
		},

		onStudiengangChange() {
			// update the store when "selectedStudiengang" is changed
			const settingsArr = {
				selectedStudiengang: this.selectedStudiengang,
				showAsList: this.showAsList,
			}
			this.$store.commit('saveSettingsModuleOverview', settingsArr)
		},
	},
}
</script>

<style scoped>
.infoButton {
	font-size: 28px;
}

/* .custom-ion-select .alert-wrapper
  {
	background-color: #000000;
	  color: var(--ion-color-success-contrast);
  } */

/* 
  ion-alert.custom-alert {
	  --backdrop-opacity: 0.7;
	} */

/* adjust properties */
.modulBlock {
	width: 100px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 5px;
	border-radius: 20px;
	cursor: pointer;
	background-color: var(--ion-color-secondary);
	transition: 0.8s;
}

.modulBlock:hover {
	opacity: 0.7;
}

/* adjust font */
.modulLabel {
	color: #000000;
	font-weight: bolder;
}

/* adjust grid */
ion-grid {
	padding: 0;
	margin: 0;
}

/* adjust margin/padding of column */
ion-col {
	margin: 0;
	padding: 0.1px;
}

/* adjust semester headers */
.modulfont {
	text-align: left;
	padding-left: 10px;
	padding-top: 10px;
}

/* header of "Listenansicht" */
.semesterHeaderList {
	background-color: var(--ion-color-secondary);
	color: #000000;
	font-size: 18px;
	height: 45px;
	text-align: center;
	padding: 0;
}

/* divider "Studiengang/Listenansicht" */
ion-item-divider {
	margin-bottom: 20px;
	margin-top: -30px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* padding "Studiengang" */
.studiengang {
	margin-top: 0px;
}

/* padding "Listenansicht" */
.listenansicht {
	margin-top: 5px;
}

/* modal for desktop */
@media (max-width:950px) {
	.info-modal {
		--height: 75%;
		--width: 75%;
		--border-radius: 16px;
		--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
}

/* modal for mobile devices */
@media (min-width:950px) {
	.info-modal {
		--height: 80%;
		--width: 45%;
		--border-radius: 16px;
		--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1)
	}
}

/* for mobile devices, columns of Studiengang/Listenansicht aligned on the left*/
@media (max-width: 767px) {

	.studiengang,
	.listenansicht {

		display: flex;
		align-items: left;
		justify-content: left;
	}

	.modulBlock {
		width: calc(20% - 10px);
		/* Adjust the width as needed */
	}
}
</style>
