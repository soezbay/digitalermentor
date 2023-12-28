<template>
	<ion-page>
		<HeaderComponent :title="texts.titel.moduluebersicht" :hasInfo="true" />
		<InfoModalComponent />
		<ion-content>
			<!-- ion-grid for "Studiengang and Listenansicht" in one line -->
			<ion-grid style="margin: 0; padding-bottom: 0; padding-top: 0;">
				<ion-row style="margin-bottom: 7px">
					<!-- ion-col for Studiengang -->
					<ion-col class="studiengang" size="12" size-sm="6">
						<ion-item lines="none">
							<!-- choice between "Studiengängen" -->
							<ion-select
								v-model="selectedStudiengang"
								interface="popover"
								label="Studiengang:"
								placeholder="Studiengang auswählen"
								:interface-options="{ cssClass: 'custom-ion-select' }"
								slot="start">
								<ion-select-option
									v-for="studiengang in studiengaenge"
									:key="studiengang.Kuerzel"
									:value="studiengang.Kuerzel">
									{{ studiengang.Name }}
								</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>

					<!-- <ion-item id="open-courses-modal">
			<ion-label slot="start">Studiengang</ion-label>
			<ion-button slot="end" color="light" id="open-courses-modal">Studiengang</ion-button>
		  </ion-item> -->

					<!-- ion-col for Listenansicht -->
					<ion-col class="listenansicht" size="12" size-sm="6">
						<ion-item lines="none">
							<!-- ion-toggle for "Listenansicht" -->
							<ion-toggle
								v-model="showAsList"
								@click="onToggleChange()"
								slot="end"
								>Listenansicht</ion-toggle
							>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-grid>

			<!-- Ion Grid for Semester -->
			<div v-if="showAsList === false" class="ion-padding" style="padding-top: 0;">
				<hr class="solid">
				<ion-grid style="padding-top: 0; margin-top: 0;">
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
							<!-- </ion-list> -->
						</ion-col>
					</ion-row>

					<ion-row v-if="modules.wahlpflicht != 0">
						<ion-col size-md="9" size-xs="12" style="width: 100%">
							<!-- <ion-list class="moduleList"> -->
							<ion-label class="modulfont">Wahlpflichtflichtmodule</ion-label>
							<ion-col size="5">
								<ion-row>
									<ion-card
										class="modulBlock"
										v-for="module in modules.wahlpflicht"
										:key="module.Kuerzel"
										@click="openModal(module)">
										<ion-label class="modulLabel">{{
											module.Kuerzel
										}}</ion-label>
									</ion-card>
								</ion-row>
							</ion-col>
							<!-- </ion-list> -->
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
					<ion-item
						v-for="module in getModulesForSemester(semester)"
						:key="module.Kuerzel"
						@click="openModal(module)">
						<ion-label>{{ module.Name }} ({{ module.Kuerzel }})</ion-label>
						<ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
					</ion-item>
				</div>

				<div v-if="modules.wahlpflicht != 0">
					<ion-list-header class="semesterHeaderList">
						<ion-label>Wahlpflichtflichtmodule</ion-label>
					</ion-list-header>
					<ion-item
						v-for="module in modules.wahlpflicht"
						:key="module.Kuerzel"
						@click="openModal(module)">
						<ion-label>{{ module.Name }} ({{ module.Kuerzel }})</ion-label>
						<ion-note slot="end">{{ module.Leistungspunkte }} LP</ion-note>
					</ion-item>
				</div>

				<div style="height: 200px"></div>
			</ion-list>

			<ion-modal ref="coursesModal" trigger="open-courses-modal">
				<ion-header>
					<ion-toolbar>
						<ion-title>Wähle einen Studiengang aus</ion-title>
					</ion-toolbar>
				</ion-header>
				<ion-content>
					<ion-list>
						<ion-item
							button
							v-for="studiengang in studiengaenge"
							:key="studiengang.Kuerzel"
							:value="studiengang.Kuerzel">
							<ion-label>{{ studiengang.Name }}</ion-label>
						</ion-item>
					</ion-list>
				</ion-content>
			</ion-modal>
		</ion-content>
	</ion-page>
</template>

<script>
import { helpCircleOutline, book } from 'ionicons/icons'
import { texts } from '../texts.js'
import {
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
	modalController,
	IonNote,
} from '@ionic/vue'
import axios from 'axios'
import Modal from './Modulbeschreibung.vue'
import HeaderComponent from '../views/Components/HeaderComponent.vue'
import InfoModalComponent from '../views/Components/InfoModalModuluebersicht.vue'

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
		HeaderComponent,
		InfoModalComponent,
	},

	name: 'ModulUebersicht',
	data() {
		return {
			helpCircleOutline,
			book,
			Adress: import.meta.env.VITE_API_URL,
			showAsList: false,
			selectedStudiengang: null,
			studiengaenge: [],
			texts,
			modules: {
				pflicht: [], // initialize "Pflichtmodule"
				wahlpflicht: [],
			},
		}
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
				this.$store.dispatch('saveCourses', this.studiengaenge);
			} catch (error) {
				console.error('Error fetching studiengaenge:', error)
			}
		},

		async getModuleData(selectedStudiengang) {


			try {
				console.log("ur here2");

				// check if the data is existing in the response
				if (data.pflicht) {
					this.modules.pflicht = data.pflicht
					console.log('Pflichtmodule geladen:', this.modules.pflicht)
				} else {
					console.error('Fehler beim Laden der Pflichtmodule.')
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
				console.error('Fehler beim Abrufen der Daten:', error)
			}
		},

		getselectedCourseModules() {
			this.getDataOfStore;
			console.log("-----------DIE modulesBook MIT MODULEN:", this.modulesBook);
			const array = this.modulesBook.filter(arr => arr.course === this.selectedStudiengang);
			console.log("________DIE GEFILTERTE LISTE", array);
			return array;
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
	margin-top: 5px;
}

/* modal for desktop */
@media (max-width: 950px) {
	.info-modal {
		--height: 75%;
		--width: 75%;
		--border-radius: 16px;
		--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
}

/* modal for mobile devices */
@media (min-width: 950px) {
	.info-modal {
		--height: 80%;
		--width: 45%;
		--border-radius: 16px;
		--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
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
		width: calc(20% - 10px); /* Adjust the width as needed */
	}
}

/* move to the left */
ion-title {
	margin-left: -5px;
}
</style>
