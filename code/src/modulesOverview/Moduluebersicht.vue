<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button router-link="/menu/dashboard">
						<ion-icon style="font-size: 45px;" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title>Modulhandbuch</ion-title>
				<ion-buttons slot="end" style="display: flex; align-items: center">
					<ion-button class="infoButton" color="primary" id="open-info-modal" expand="block">
						<ion-icon :icon="helpCircleOutline"></ion-icon>
					</ion-button>
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>

			<!--UTILITIES FOR SEARCHING AND CHANGING ----------------------------------------------------------------------------------->
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
					@ionInput="handleInput($event)">
				</ion-searchbar>
			</div>

			<!-- SHOW MODULES ------------------------------------------------------------------------------------------------------>
			<!-- Ion Grid for Semester -->
			<ion-grid style="margin: 0; padding: 0px;">
				<ion-row>
					<ion-col v-if="showAsList === false" size="12" size-md="6" style="padding: 5px; padding-top: 0;">
						<ion-grid class="searchGrid">
							<ion-row v-if="results.length > 0">
								<ion-col size="4" size-md="3" size-lg="2" v-for="result in results">
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
					</ion-col>

					<!--Show modules as List when showAsList=true-->
					<ion-col v-else size="12" size-md="6" style="margin: 0; padding: 0;" class="divider">
						<ion-list>
							<ion-item v-if="results.length > 0" v-for="result in results" @click="openModal(result)"
								class="searchList">
								<ion-label>{{ result.Name + " (" + result.Kuerzel + ")" }}</ion-label>
							</ion-item>
							<div v-else-if="searched" class="ion-text-center">
								<p style="color: slategrey;">
									Keine Module für {{ this.selectedStudiengang }} in der Suche gefunden
								</p>
							</div>
							<div v-if="!searched">
							</div>
						</ion-list>
						<ion-list style="padding: 0; padding-top: 10px;">
							<div v-for="(semester, index) in getselectedCourseModules()" :key="index">
								<ion-list-header class="semesterHeaderList">
									<ion-label>{{ semester.semestercount }}</ion-label>
								</ion-list-header>
								<ion-item v-for="(modul, moduleIndex) in semester.faecher" :key="moduleIndex"
									@click="openModal(modul)" class="ModulItemsInList">
									<ion-label>{{ modul.Name }} ({{ modul.Kuerzel }})</ion-label>
									<ion-note slot="end">{{ modul.Leistungspunkte }} LP</ion-note>
								</ion-item>
							</div>
							<div style="height: 200px"></div>
						</ion-list>
					</ion-col>

					<!--Show Module Description and Divide Screen into two Screens-->
					<ion-col size="12" size-md="6" class="modulinfo-col">
						<div class="ion-text-center">
							<h4 class="modalheader">
								{{ texts.titel.modulbeschreibung }}
							</h4>
							<h5 style=" text-align: center; font-size: 1.3em;">
								{{ this.selectedModul.Name }}
							</h5>
							<h6 style=" text-align: center; font-size: 1.3em;">
								{{ this.selectedModul.Kuerzel }}
							</h6>
							<ion-button v-if="this.selectedModul !== ''" @click="openModalReviews"
								class="weitereBewertungenButton">{{
									texts.modulbeschreibung.weitereBewertungen }}</ion-button>
						</div>
						<div>
							<div v-if="this.selectedModul !== ''">
								<ion-list>
									<ion-item v-for="(item, key) in filteredList()" :key="key">
										<ion-label class="ion-text-wrap" style="font-weight: 800;">
											{{ insertSpaceBetweenLowerAndUpper(key) }}:</ion-label>
										<ion-label class="ion-text-wrap">{{ item }}</ion-label>
									</ion-item>
								</ion-list>
							</div>
							<div v-else class="ion-text-center">
								<br>
								<ion-label> -Wähle links ein Modul aus-</ion-label>
							</div>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>

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
	loadingController,
	IonRefresher,
	IonRefresherContent,
} from '@ionic/vue';

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
		IonItemDivider,
		IonRefresher,
		IonRefresherContent,
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
		return { handleRefresh }
	},
	data() {
		return {
			helpCircleOutline, book, texts,
			Adress: import.meta.env.VITE_API_URL,
			showAsList: false,
			selectedModul: '',
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
			console.log("", this.modulesBook);
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

				// Retrieve the regular study duration for the specific study program
				const studiengaengeResponse = await axios.get(`${this.Adress}/studiengang`);

				const pflichtModuleResponse = await axios.get(`${this.Adress}/studiengang/pflicht/${selectedStudiengang}`);
				const wahlpflichtmoduleResponse = await axios.get(`${this.Adress}/studiengang/wahlpflicht/${selectedStudiengang}`);

				const pflichtModule = pflichtModuleResponse.data.pflicht;
				const wahlpflichtmodule = wahlpflichtmoduleResponse.data.wahlpflicht;
				const studiengang = studiengaengeResponse.data.studiengaenge.find(studiengang => studiengang.Kuerzel === selectedStudiengang);

				const regelstudienzeit = studiengang.Regelstudienzeit;

				// Sort mandatory modules by semester
				pflichtModule.sort((a, b) => a.Semester - b.Semester);

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
				console.error('Fehler beim Abrufen oder Verarbeiten der Daten:', error.message);
				if (error.message.includes('Network Error')) {
					console.error('Keine Internetverbindung!');
				}
			}

		},

		getselectedCourseModules() {
			console.log("--------DIE modulesBook MIT MODULEN:", this.modulesBook);
			const filteredBook = this.modulesBook.filter(arr => arr.course === this.selectedStudiengang);
			console.log("--------DIE GEFILTERTE LISTE", filteredBook);
			return filteredBook;
		},

		async openModal(selectedModul) {
			if (window.innerWidth < 767) {
				const modal = await modalController
					.create({
						component: Modal,
						componentProps: {
							selectedModul: selectedModul,
						},
					})
					.then(modal => {
						modal.present();
					});
			} else {
				this.selectedModul = selectedModul;
			}
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

		filteredList() {
			const filtered = {};
			for (const key in this.selectedModul) {
				if (this.selectedModul[key] !== null) {
					filtered[key] = this.selectedModul[key];
				}
			}
			return filtered;
		},

		insertSpaceBetweenLowerAndUpper(text) {
			return text.replace(/([a-z])([A-Z])/g, "$1 $2");
		},
	},

	async mounted() {
		this.studiengaenge = this.$store.getters.getCourses;
		this.modulesBook = this.$store.getters.getModulesBook;
		this.fetchStudiengaenge();
		this.getModuleData(this.selectedStudiengang);
		// this.selectedModul = 

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

ion-searchbar {
	padding: 0;
	--background: #d3d3d3;
	--color: #000000;
	--placeholder-color: #000000;
	--icon-color: #000000;
	--clear-button-color: #000000;
	--border-radius: 20px;
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
	transition: 0.1s;
}

.modulBlock:hover {
	opacity: 0.8;
	transform: translate(0px, -2px);
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
	color: #000000;
	--background: var(--ion-color-secondary);
}

.searchGrid {
	padding: 15px;
}

.searchGrid ion-item {
	text-align: center;
	border: 2px solid var(--ion-color-secondary);
	border-radius: 10px;
	padding: 1px;
}

.searchGrid ion-item:hover {
	--background: var(--ion-color-secondary);
	cursor: pointer;
}

.searchList:hover {
	cursor: pointer;
	color: #000000;
	--background: var(--ion-color-secondary);
}

.modalheader {
	text-align: center;
	background-color: var(--ion-color-primary);
	border-radius: 20px;
	padding: 10px;
	margin-left: 70px;
	margin-right: 70px;
	color: #fff;
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

@media (max-width: 767px) {
	.modulinfo-col {
		display: none;
		overflow-y: auto;
		max-height: 100vh;
	}
}
.modulinfo-col {
	overflow-y: auto;
	max-height: 100vh;
}

ion-content {
	height: 100vh;
}

.divider {
	overflow-y: auto;
	max-height: 100vh;
}

</style>
