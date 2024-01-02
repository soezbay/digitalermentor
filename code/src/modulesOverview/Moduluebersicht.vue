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
			<!--UTILITYS FOR SEARCHING AND CHANGING ----------------------------------------------------------------------------------->
			<!-- ion-grid for "Studiengang and Listenansicht" in one line -->
			<ion-grid style="margin: 0; padding-bottom: 0; padding-top: 0;">
				<ion-row style="margin-bottom: 7px">
					<!-- ion-col for Studiengang -->
					<ion-col class="studiengang" size="12" size-sm="6">
						<ion-item lines="none">
							<!-- choice between "Studiengängen" -->
							<ion-select v-model="selectedStudiengang" interface="popover" label="Studiengang:"
								placeholder="Studiengang auswählen" :interface-options="{ cssClass: 'courseSelect' }"
								slot="start" style="width: 100%;">
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
			<!--Searching Modules -->
			<div style="padding: 0; margin-left: 15px; margin-right: 15px;">
				<ion-searchbar v-model="searchText" animated="true" placeholder="Modulhandbuch durchsuchen"
					@ionInput="handleInput($event)" color="light" style="padding: 0;" id="open-loading">
				</ion-searchbar>
			</div>
			<ion-grid v-if="showAsList === false" class="searchGrid">
				<ion-row v-if="results.length > 0">
					<ion-col size="1.7" v-for="result in results">
						<ion-item lines="none" @click="openModal(result)">
							<ion-label>{{ result.Kuerzel }}</ion-label>
						</ion-item>
					</ion-col>
				</ion-row>
				<ion-row v-else-if="searched">
					<ion-col size="12" class="ion-text-center">
						<p style="color: slategrey;">
							Keine Module für {{ this.selectedStudiengang }} in der Suche gefunden
						</p>
					</ion-col>
				</ion-row>
				<ion-row v-if="!searched">
				</ion-row>
			</ion-grid>
			<ion-list v-else>
				<ion-item v-if="results.length > 0" v-for="result in results" @click="openModal(result)" class="searchList">
					<ion-label>{{ result.Name }}</ion-label>
				</ion-item>
				<div v-else-if="searched" class="ion-text-center">
					<p style="color: slategrey;">
						Keine Module für {{ this.selectedStudiengang }} in der Suche gefunden
					</p>
				</div>
				<div v-if="!searched">
				</div>
			</ion-list>

			<!-- LIST OF MODULES ------------------------------------------------------------------------------------------------------>
			<!-- Ion Grid for Semester -->
			<div v-if="showAsList === false" class="ion-padding" style="padding-top: 0;">
				<hr class="solid">
				<ion-grid style="padding-top: 0; margin-top: 0; margin-bottom: 200px;">
					<ion-col v-for="(semester, index) in getselectedCourseModules()" :key="index">
						<ion-row style="padding-left: 10px;">
							<label>
								{{ semester.semestercount }}
							</label>
						</ion-row>
						<ion-row style="max-width: 750px;">
							<ion-col size="1.7" v-for="(modul, moduleIndex) in semester.faecher" :key="moduleIndex"
								style="width: 100px; max-width: 100px; min-width: 68px;">
								<ion-card class="modulBlock" @click="openModal(modul)">
									<ion-label style="color: #000000; font-weight: bolder">
										{{ modul.Kuerzel }}
									</ion-label>
								</ion-card>
							</ion-col>
						</ion-row>
					</ion-col>
				</ion-grid>
			</div>
			<!--Show modules as List when showAsList=true-->
			<ion-list v-else style="padding: 0; padding-top: 10px;">
				<div v-for="(semester, index) in getselectedCourseModules()" :key="index">
					<ion-list-header class="semesterHeaderList">
						<ion-label>{{ semester.semestercount }}</ion-label>
					</ion-list-header>
					<ion-item v-for="(modul, moduleIndex) in semester.faecher" :key="moduleIndex" @click="openModal(modul)"
						class="ModulItemsInList">
						<ion-label>{{ modul.Name }} ({{ modul.Kuerzel }})</ion-label>
						<ion-note slot="end">{{ modul.Leistungspunkte }} LP</ion-note>
					</ion-item>
				</div>
				<div style="height: 200px"></div>
			</ion-list>

			<!-- MODALS -------------------------------------------------------------------------------------------------------------->
			<!-- Modal for changing Courses to display -->
			<ion-modal ref="coursesModal">
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
			<ion-modal class="info-modal" ref="modal_info" trigger="open-info-modal">
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
import axios from 'axios';
import Modal from "./Modulbeschreibung.vue";

import {
	IonPage, IonContent, IonHeader, IonTitle, IonToolbar,
	IonButtons, IonMenuButton, IonButton,
	IonGrid, IonRow, IonCol,
	IonSearchbar, IonToggle,
	IonSelectOption, IonSelect,
	IonList, IonListHeader, IonItem, IonLabel, IonIcon,
	IonCard, IonCardTitle,
	IonModal, modalController, IonNote, IonItemDivider,
	loadingController
} from '@ionic/vue';
import { toHandlers } from 'vue';

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
		IonItemDivider
	},

	// setup() {
	// 	const store = useStore();
	// 	const modulesToFilter = store.getters.getModulesBook;
	// 	const filteredModules = modulesToFilter.map(course =>
	// 		course.faecher
	// 	);
	// 	const results = ref(filteredModules);

	// 	return { modulesToFilter, filteredModules, results };
	// },

	data() {
		return {
			helpCircleOutline, book, texts,
			Adress: import.meta.env.VITE_API_URL,
			showAsList: false,
			selectedStudiengang: null,
			studiengaenge: [],
			modulesBook: [],
			results: [],
			searched: false,
		};
	},

	methods: {
		handleInput(event) {
			this.searched = true;
			const query = event.target.value.toLowerCase();
			console.log("B1-----------", this.modulesBook);
			console.log("B1-----------", this.modulesBook);
			const courseFilter = this.modulesBook.filter(c => c.course === this.selectedStudiengang);
			console.log(courseFilter);
			const allSubjects = courseFilter.flatMap(c => c.faecher);
			console.log(allSubjects);
			console.log(query);
			if (query !== '') {
				this.results = allSubjects.filter(subject =>
					subject.Name.toLowerCase().includes(query)
					|| subject.Kuerzel.toLowerCase().includes(query)
					|| subject.Verantwortlicher.toLowerCase().includes(query)
					|| subject.Turnus.toLowerCase().includes(query));
				console.log(this.results);
			} else {
				this.searched = false;
				this.results = [];
			}
		},

		async fetchStudiengaenge() {
			try {
				const response = await axios.get(`${this.Adress}/studiengang`)
				this.studiengaenge = response.data.studiengaenge
				this.$store.dispatch('updateCourses', this.studiengaenge);
			} catch (error) {
				console.error('Error fetching studiengaenge:', error)
			}
		},

		async getModuleData(selectedStudiengang) {

			try {
				console.log("ur here2");

				if (selectedStudiengang === null || selectedStudiengang === undefined) {
					throw new Error('selectedStudiengang ist null oder undefined');
				}

				// Überprüfen, ob der Studiengang bereits in der modulesBook vorhanden ist
				const studiengangExists = this.modulesBook.some(item => item.course === selectedStudiengang);
				console.log(studiengangExists);
				if (studiengangExists) {
					console.log(`Studiengang ${selectedStudiengang} ist bereits in der modulesBook vorhanden.`);
					return;
				}
				console.log("ur here3");

				// Retrieve the regular study duration for the specific study program
				const studiengaengeResponse = await axios.get(`${this.Adress}/studiengang`);
				console.log("ur here4");

				const pflichtModuleResponse = await axios.get(`${this.Adress}/studiengang/pflicht/${selectedStudiengang}`);
				const wahlpflichtmoduleResponse = await axios.get(`${this.Adress}/studiengang/wahlpflicht/${selectedStudiengang}`);

				const pflichtModule = pflichtModuleResponse.data.pflicht;
				const wahlpflichtmodule = wahlpflichtmoduleResponse.data.wahlpflicht;
				const studiengang = studiengaengeResponse.data.studiengaenge.find(studiengang => studiengang.Kuerzel === selectedStudiengang);

				const regelstudienzeit = studiengang.Regelstudienzeit;

				console.log("--------Die regelstudienzeit:", regelstudienzeit);
				// Sort mandatory modules by semester
				pflichtModule.sort((a, b) => a.Semester - b.Semester);
				console.log("------Pflichtmodule getData---------", pflichtModule);

				// Inline getModulesForSemester function
				for (let semester = 1; semester <= regelstudienzeit; semester++) {
					this.modulesBook.push({
						course: selectedStudiengang,
						semestercount: `${semester}. Semester`,
						faecher: pflichtModule
							.filter(modul => modul.Semester === semester)
					});
				}
				// Add the elective modules to the semester list
				this.modulesBook.push({
					course: selectedStudiengang,
					semestercount: 'Wahlpflichtmodule',
					faecher: wahlpflichtmodule
				});

				this.$store.dispatch('updateModulesBook', this.modulesBook);

			} catch (error) {
				// Fehlerbehandlung: Gib den Fehler aus
				console.error('Fehler beim Abrufen oder Verarbeiten der Daten:', error.message);
				if (error.message.includes('Network Error')) {
					console.error('Keine Internetverbindung!');
					// Hier könntest du zusätzliche Maßnahmen ergreifen oder eine Meldung an den Benutzer anzeigen
				}
			}

		},

		getselectedCourseModules() {
			this.getDataOfStore;
			console.log("-----------DIE modulesBook MIT MODULEN:", this.modulesBook);
			const array = this.modulesBook.filter(arr => arr.course === this.selectedStudiengang);
			console.log("________DIE GEFILTERTE LISTE", array);
			return array;
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

	async mounted() {
		this.studiengaenge = this.$store.getters.getCourses;
		this.modulesBook = this.$store.getters.getModulesBook;
		this.fetchStudiengaenge();
		// console.log("VUEX MODULESBOOK", this.$store.getters.getModulesBook);
		// console.log("MODULESBOOK", this.modulesBook);
		// console.log("-----STUDIENGANG:", this.selectedStudiengang);
		this.getModuleData(this.selectedStudiengang);

		const lastSetup = this.settings;
		if (lastSetup.selectedStudiengang !== undefined && lastSetup.selectedStudiengang !== null) {
			this.selectedStudiengang = lastSetup.selectedStudiengang
		}
		if (lastSetup.showAsList !== undefined && lastSetup.showAsList !== null) {
			this.showAsList = lastSetup.showAsList
			console.log('Settings Geladen')
		};
	},

	watch: {
		selectedStudiengang(newStudiengang) {
			this.getModuleData(newStudiengang);
			this.onStudiengangChange()
		},
	},

	computed: {
		// getDataOfStore() {
		// 	this.studiengaenge = this.$store.getters.getCourses;
		// 	this.modulesBook = this.$store.getters.getModulesBook;
		// },
		settings() {
			console.log('Getting settings')
			return this.$store.getters.getModuleOverviewData
		},
	},
}
</script>

<style scoped>
.infoButton {
	font-size: 28px;
}

.solid {
	border-top: 1px solid grey;
	/* Breite der Trennstriche angepasst */
	width: 100%;

	margin: 0;
	padding: 0;
}

.courseSelect {
	width: 100%;
}

.modulBlock {
	height: 30px;
	width: 100%;
	max-width: 100px;
	margin: 2px;
	text-align: center;
	padding: 6px;
	border-radius: 20px;
	cursor: pointer;
	background-color: var(--ion-color-secondary);
	transition: 0.8s;
}

.modulBlock:hover {
	opacity: 0.7;
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
	margin-bottom: -20px;
	margin-top: -35px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* padding "Studiengang" */
.studiengang {
	padding: 0;

}

/* padding "Listenansicht" */
.listenansicht {
	padding: 0;
}

.ModulItemsInList:hover {
	cursor: pointer;
	opacity: 0.9;
	--background: var(--ion-color-light);
}

.searchGrid {
	padding: 15px;
}

.searchGrid ion-item {
	text-align: center;
	border: 2px solid var(--ion-color-light);
	border-radius: 10px;
	padding: 1px;
}

.searchList:hover {
	cursor: pointer;
	opacity: 0.9;
	--background: var(--ion-color-light);
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
}
</style>
