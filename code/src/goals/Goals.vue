<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button router-link="/menu/dashboard">
						<ion-icon style="font-size: 45px" src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title>{{ texts.titel.studienziele }}</ion-title>
				<ion-buttons slot="end" style="display: flex; align-items: center">
					<ion-button class="infoButton" color="primary" id="open-info-modal" expand="block">
						<ion-icon :icon="helpCircleOutline"></ion-icon>
					</ion-button>
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<ion-grid class="grid">
				<ion-row>
					<ion-col size="12" size-md="6" class="col">
						<div class="goals-container headerText">
							<ion-label>{{ texts.ziele.deineZiele }}</ion-label>
						</div>
						<div class="semesterHeader">
							<ion-label class="labelHeader">{{
								texts.studium.sommersemester
							}}</ion-label>
							<ion-buttons slot="end">
								<ion-button style="padding-right: 15px" color="primary" id="open-SS-modal"
									@click="openSSModal()" expand="block">
									<ion-icon :icon="add"></ion-icon>
								</ion-button>
							</ion-buttons>
						</div>
						<!-- Getting Sommersemester-Goals-Array out of vuex Store and displaying all elements -->
						<ion-list class="drag-drop-containers" v-if="goals_ss.length > 0">
							<ion-reorder-group :disabled="false" @ionItemReorder="handleReorderForSS($event)">
								<ion-item-sliding v-for="goal in goals_ss" :key="goal.id" class="drag-drop-box-item">
									<ion-item-options side="start">
										<ion-item-option color="success" @click="switchToWS(goal.id)">
											<ion-label>{{ texts.ziele.nachUnten }}</ion-label>
										</ion-item-option>
									</ion-item-options>
									<!--Displayin Goal-Element properties-->
									<ion-item color="#d2d69e" class="item-container" lines="none">
										<ion-label class="card-label">
											<h2>{{ goal.titel }}</h2>
											<p>{{ goal.info }}</p>
										</ion-label>
										<ion-label slot="end" class="card-label">
											<h5>{{ goal.date }}</h5>
										</ion-label>
										<ion-reorder slot="end" style="
												color: #000000;
												margin: 0px;
												padding-left: 5px;
											"></ion-reorder>
									</ion-item>
									<!--Slide-Options, first one Deleting Goals, second one moving it into checkedGoals.vue-->
									<ion-item-options side="end">
										<ion-item-option color="none" id="open-edit-modal" @click="openEditModal(goal.id)">
											<ion-icon slot="icon-only" :icon="create"></ion-icon>
										</ion-item-option>
										<ion-item-option color="danger" @click="deleteGoalHandler(goal.id)">
											<ion-icon slot="icon-only" :icon="trash"></ion-icon>
										</ion-item-option>
										<ion-item-option color="success" @click="checkGoal(goal.id)">
											<ion-icon slot="icon-only" :icon="checkmarkDone"></ion-icon>
										</ion-item-option>
									</ion-item-options>
								</ion-item-sliding>
							</ion-reorder-group>
						</ion-list>
						<!--Only getting displayed when Array is empty-->
						<div v-else class="ion-padding">
							<div class="explanatory-text">
								<ion-label style="font-size: large">{{
									texts.ziele.keineZieleDefiniert
								}}</ion-label>
							</div>
						</div>

						<div class="semesterHeader">
							<ion-label class="labelHeader">{{ texts.studium.wintersemester }}</ion-label>
							<ion-buttons slot="end">
								<ion-button style="padding-right: 15px" color="primary" id="open-WS-modal"
									@click="openWSModal()" expand="block">
									<ion-icon :icon="add"></ion-icon>
								</ion-button>
							</ion-buttons>
						</div>
						<!-- Getting Sommersemester-Array of vuex and displaying all elements -->
						<ion-list class="drag-drop-containers" v-if="goals_ws.length > 0">
							<ion-reorder-group :disabled="false" @ionItemReorder="handleReorderForWS($event)">
								<ion-item-sliding v-for="goal in goals_ws" :key="goal.id" class="drag-drop-box-item">
									<ion-item-options side="start">
										<ion-item-option color="success" @click="switchToSS(goal.id)">
											<ion-label>{{ texts.ziele.nachOben }}</ion-label>
										</ion-item-option>
									</ion-item-options>
									<!--Displaying Goal-Element properties-->
									<ion-item color="#d2d69e" class="item-container" lines="none">
										<ion-label class="card-label">
											<h2>{{ goal.titel }}</h2>
											<p>{{ goal.info }}</p>
										</ion-label>
										<ion-label slot="end" class="card-label">
											<h5>{{ goal.date }}</h5>
										</ion-label>
										<ion-reorder slot="end" style="
												color: #000000;
												margin: 0px;
												padding-left: 5px;
											"></ion-reorder>
									</ion-item>
									<!--Slide-Options, first one Deleting Goals, second one moving it into checkedGoals.vue-->
									<ion-item-options side="end">
										<ion-item-option color="none" id="open-edit-modal" @click="openEditModal(goal.id)">
											<ion-icon slot="icon-only" :icon="create"></ion-icon>
										</ion-item-option>
										<ion-item-option color="danger" @click="deleteGoalHandler(goal.id)">
											<ion-icon slot="icon-only" :icon="trash"></ion-icon>
										</ion-item-option>
										<ion-item-option color="success" @click="checkGoal(goal.id)">
											<ion-icon slot="icon-only" :icon="checkmarkDone"></ion-icon>
										</ion-item-option>
									</ion-item-options>
								</ion-item-sliding>
							</ion-reorder-group>
						</ion-list>
						<!--Only getting displayed when Array is empty-->
						<div v-else class="ion-padding">
							<div class="explanatory-text">
								<ion-label style="font-size: large">{{ texts.ziele.keineZieleDefiniert }}</ion-label>
							</div>
						</div>
					</ion-col>

					<!--Item-Elements routing to checked Goals and deleted Goals-->
					<ion-col class="col">
						<ion-item class="background header" color="primary" router-link="/menu/studienziele/checked"
							detail="true" lines="none" id="reachedGoalsButton">
							<ion-label class="labelHeader headerText">{{ texts.ziele.erreichteZiele }}</ion-label>
						</ion-item>
						<ion-item-divider class="spacer"></ion-item-divider>
						<ion-item class="background headerText" color="medium" router-link="/menu/studienziele/deleted"
							detail="true" lines="none" id="deletedGoalsButton">
							<ion-label class="labelHeader headerText">{{ texts.ziele.geloeschteZiele }}</ion-label>
						</ion-item>

						<ion-item-divider class="spacer"></ion-item-divider>

						<ion-row class="klausuren-title">
							<ion-label class="underline">{{ texts.ziele.zuBestehendeModule }}
							</ion-label>
						</ion-row>

						<!-- List of Semester and modules -->
						<ion-col v-for="(semester, index) in ModuleList" :key="index">
							<ion-row>
								<label>
									{{ semester.semestercount }}
								</label>
							</ion-row>
							<ion-row>
								<ion-col size-xs="2.3" size-sm="2.6" size-md="4" size-lg="4" size-xl="2"
									v-for="(modul, moduleIndex) in semester.faecher" :key="moduleIndex"
									style="padding: 1px;">
									<!-- <div v-if="modul.tryCount === 1"> -->
									<ion-card :class="getModuleClass(modul.tryCount, modul.Status)">
										<ion-label style="color: #000000; font-weight: bolder">
											{{ modul.Kuerzel }}
										</ion-label>
									</ion-card>
									<!-- </div> -->
									<!-- <div v-else-if="modul.tryCount === 2">
										<ion-card class="secondTry">
											<ion-label style="color: #000000; font-weight: bolder">
												{{ modul.kuerzel }}
											</ion-label>
										</ion-card>
									</div>
									<div v-else-if="modul.tryCount === 3">
										<ion-card  class="thirdTry">
											<ion-label style="color: #000000; font-weight: bolder">
												{{ modul.kuerzel }}
											</ion-label>
										</ion-card>
									</div> -->
								</ion-col>
							</ion-row>
						</ion-col>

						<!-- Legende -->
						<div id="legend">
							<ion-badge id="legendBadge" color="warning">&nbsp;</ion-badge>
							<span>{{ texts.studium.klausurStatus.zweiterVersuch }}</span>
							<ion-badge id="legendBadge" color="danger">&nbsp;</ion-badge>
							<span>{{ texts.studium.klausurStatus.dritterVersuch }}</span>
							<ion-badge id="legendBadge" style="background-color: grey;">&nbsp;</ion-badge>
							<span>Nicht mehr ablegbar</span>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>

		<!-- Modals for adding a goal (Sommersemester)-->
		<ion-modal ref="modal_SS" trigger="open-SS-modal" :presenting-element="presentingElement">
			<ion-header>
				<ion-toolbar>
					<ion-title>{{ texts.ziele.erstelleZiel }}</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="saveGoal" :disabled="!goal_name" style="color: white">{{
							texts.allgemein.speichern }}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<ion-item>
					<ion-label position="floating">{{ texts.ziele.zielname }}</ion-label>
					<ion-input v-model="goal_name"></ion-input>
				</ion-item>
				<ion-item>
					<ion-select ref="semesterSelect" label="Semester" placeholder="Semesterseason" value="Sommersemester">
						<ion-select-option value="Sommersemester">{{ texts.studium.sommersemester }}</ion-select-option>
						<ion-select-option value="Wintersemester">{{ texts.studium.wintersemester }}</ion-select-option>
					</ion-select>
				</ion-item>
				<ion-item>
					<ion-label position="floating">{{ texts.allgemein.info }}</ion-label>
					<ion-input v-model="info"></ion-input>
				</ion-item>
			</ion-content>
		</ion-modal>

		<!-- Modals for adding a goal (Wintersemester)-->
		<ion-modal ref="modal_WS" trigger="open-WS-modal" :presenting-element="presentingElement">
			<ion-header>
				<ion-toolbar>
					<ion-title>{{ texts.ziele.erstelleZiel }}</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="saveGoal" :disabled="!goal_name" style="color: white">{{
							texts.allgemein.speichern }}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<ion-item>
					<ion-label position="floating">{{ texts.ziele.zielname }}</ion-label>
					<ion-input v-model="goal_name"></ion-input>
				</ion-item>
				<ion-item>
					<ion-select ref="semesterSelect" label="Semester" placeholder="Semesterseason" value="Wintersemester">
						<ion-select-option value="Sommersemester">{{
							texts.studium.sommersemester
						}}</ion-select-option>
						<ion-select-option value="Wintersemester">{{
							texts.studium.wintersemester
						}}</ion-select-option>
					</ion-select>
				</ion-item>
				<ion-item>
					<ion-label position="floating">{{ texts.allgemein.info }}</ion-label>
					<ion-input v-model="info"></ion-input>
				</ion-item>
			</ion-content>
		</ion-modal>

		<!-- Modals for editing a goal-->
		<ion-modal ref="modal_edit" trigger="open-edit-modal" :presenting-element="presentingElement">
			<ion-header>
				<ion-toolbar>
					<ion-title>{{ texts.ziele.bearbeiteZiel }}</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="saveEditedGoal" :disabled="!goal_name" style="color: white">{{
							texts.allgemein.speichern }}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<ion-item>
					<ion-label position="floating">{{ texts.ziele.zielname }}</ion-label>
					<ion-input v-model="goal_name"></ion-input>
				</ion-item>
				<ion-item>
					<ion-select ref="semesterSelect" v-model="semesterSeason" label="Semester" placeholder="Semesterseason">
						<ion-select-option value="Sommersemester">{{
							texts.studium.sommersemester
						}}</ion-select-option>
						<ion-select-option value="Wintersemester">{{
							texts.studium.wintersemester
						}}</ion-select-option>
					</ion-select>
				</ion-item>
				<ion-item>
					<ion-label position="floating">{{ texts.allgemein.info }}</ion-label>
					<ion-input v-model="info"></ion-input>
				</ion-item>
			</ion-content>
		</ion-modal>

		<!--Help-Modal-option for user-->
		<ion-modal class="info-modal" ref="modal_info" trigger="open-info-modal" :presenting-element="presentingElement">
			<ion-content>
				<ion-grid>
					<ion-row justify-content-center align-items-center>
						<ion-col size="12">
							<div class="ion-text-center">
								<p style="font-size: 22px">
									<strong>{{ texts.ziele.erklaerung.p1strong }}</strong>
								</p>
								<p>
									<ion-button color="primary" shape="round">
										<ion-icon :icon="add" style="font-size: 20px; color: white"></ion-icon>
									</ion-button>
								</p>
								<p>
									<strong>{{ texts.ziele.erklaerung.p2strong }}</strong>
								</p>
								<p>{{ texts.ziele.erklaerung.p2 }}</p>
								<p>
									<ion-icon :icon="trash" style="font-size: 35px; color: #f07181"></ion-icon>
								</p>
								<p>
									<strong>{{ texts.ziele.erklaerung.p3strong }}</strong>
								</p>
								<p>{{ texts.ziele.erklaerung.p3 }}</p>
								<p>
									<ion-icon :icon="checkmarkDone" style="font-size: 35px; color: #bbcc00"></ion-icon>
								</p>
								<p>
									<strong>{{ texts.ziele.erklaerung.p4strong }}</strong>
								</p>
								<p>{{ texts.ziele.erklaerung.p4 }}</p>
								<p>
									<ion-icon :icon="create" style="font-size: 35px; color: grey"></ion-icon>
								</p>
								<p>
									<strong>{{ texts.ziele.erklaerung.p5strong }}</strong>
								</p>
								<p>{{ texts.ziele.erklaerung.p5 }}</p>
								<p>
									<strong>{{ texts.ziele.erklaerung.p6strong }}</strong>
								</p>
								<p>{{ texts.ziele.erklaerung.p6 }}</p>
								<p>{{ texts.ziele.erklaerung.p7 }}</p>
							</div>
						</ion-col>
					</ion-row>
				</ion-grid>
			</ion-content>
		</ion-modal>
	</ion-page>
</template>

<script>
import {
	add,
	trash,
	checkmarkDone,
	create,
	helpCircleOutline,
} from 'ionicons/icons'
import axios, { formToJSON } from 'axios'
import { texts } from '../texts.js'

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButtons,
	IonMenuButton,
	IonButton,
	IonItem,
	IonLabel,
	IonInput,
	IonList,
	IonListHeader,
	IonCard,
	IonIcon,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	IonModal,
	IonSelect,
	IonSelectOption,
	IonReorder,
	IonReorderGroup,
	IonGrid,
	IonRow,
	IonCol,
	IonItemDivider,
	IonBadge,
	modalController,
} from '@ionic/vue'
import { toHandlers } from 'vue'

export default {
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonButtons,
		IonMenuButton,
		IonButton,
		IonItem,
		IonLabel,
		IonInput,
		IonList,
		IonListHeader,
		IonCard,
		IonIcon,
		IonItemSliding,
		IonItemOptions,
		IonItemOption,
		IonModal,
		IonSelect,
		IonSelectOption,
		IonReorder,
		IonReorderGroup,
		IonGrid,
		IonRow,
		IonCol,
		IonItemDivider,
		IonBadge,
	},
	data() {
		return {
			Adress: import.meta.env.VITE_API_URL,
			texts,
			add,
			trash,
			checkmarkDone,
			create,
			helpCircleOutline, //Icons
			presentingElement: undefined,
			//Goal properties
			goal_name: '',
			semesterSeason: '',
			info: '',
			goal_id: '',
			studentID: 'test123',
			studiengang: 'PI',
			ModuleList: [],
		}
	},

	methods: {
		//Reorder Handler which commits to Vuex-Store
		handleReorderForWS(event) {
			const updatedGoalsWS = event.detail.complete(this.goals_ws)
			console.log(updatedGoalsWS)
			this.$store.commit('updateGoalsOrderForWS', updatedGoalsWS)
		},
		handleReorderForSS(event) {
			const updatedGoalsSS = event.detail.complete(this.goals_ss)
			console.log(updatedGoalsSS)
			this.$store.commit('updateGoalsOrderForSS', updatedGoalsSS)
		},
		//Dissmis-Methode for Modals
		dismiss() {
			this.$refs.modal_SS.$el.dismiss()
			this.$refs.modal_WS.$el.dismiss()
			this.$refs.modal_edit.$el.dismiss()
		},
		//Logik for saving a new Goal to Vuex-Store
		saveGoal() {
			const selectedOption = this.$refs.semesterSelect.value //get selected Semester in Modal
			if (this.goal_name && selectedOption) {
				console.log('Erstelle Ziel Daten')
				//Set Properties from input
				const goal_data = {
					id: Date.now(),
					date: new Date().toLocaleDateString(),
					titel: this.goal_name,
					semesterSeason: selectedOption,
					info: this.info,
				}
				console.log('Dispatche Ziel Daten')
				this.$store.dispatch('addGoal', goal_data)
				console.log('Schließe Modal')
				//Set propeties to Default
				this.goal_name = ''
				this.semesterSeason = ''
				this.info = ''
				this.dismiss()
			} else {
				console.log('Fehlgeschlagen Daten zu generienen')
			}
		},
		saveEditedGoal() {
			const selectedOption = this.semesterSeason
			console.log(selectedOption)
			const goal_data = {
				id: this.goal_id,
				date: new Date().toLocaleDateString(),
				titel: this.goal_name,
				semesterSeason: selectedOption,
				info: this.info,
			}
			this.goal_name = ''
			this.semesterSeason = ''
			this.info = ''
			this.goal_id = ''
			this.$store.dispatch('editGoal', goal_data)
			this.dismiss()
		},
		//Handler for deleting and checking goals and commiting it to the store
		deleteGoalHandler(goal_ID) {
			this.$store.dispatch('deleteGoal', goal_ID)
			console.log('Gelöschte Ziele:', this.deletedGoals)
		},
		checkGoal(goal_ID) {
			this.$store.dispatch('checkGoal', goal_ID)
		},
		//Methodes moves goals from one to another array in vuex store
		switchToWS(goal_ID) {
			this.$store.dispatch('switchToWS', goal_ID)
		},
		switchToSS(goal_ID) {
			this.$store.dispatch('switchToSS', goal_ID)
		},
		openSSModal() {
			this.goal_name = ''
			this.semesterSeason = ''
			this.info = ''
			this.goal_id = ''
			this.$refs.modal_SS.$el.present()
		},
		openWSModal() {
			this.goal_name = ''
			this.semesterSeason = ''
			this.info = ''
			this.goal_id = ''
			this.$refs.modal_WS.$el.present()
		},
		openEditModal(goal_ID) {
			const editModal = this.$refs.modal_edit.$el
			this.goal_id = goal_ID
			this.goal_name = this.$store.getters.getGoal(goal_ID).titel
			this.semesterSeason = this.$store.getters.getGoal(goal_ID).semesterSeason
			this.info = this.$store.getters.getGoal(goal_ID).info

			if (editModal) {
				editModal.present()
			}
		},

		async getData() {

			try {

				const studiengaengeResponse = await axios.get(`${this.Adress}/studiengang`);
				const regelstudienzeit = studiengaengeResponse.data.studiengaenge.find(studiengang => studiengang.Kuerzel === this.studiengang).Regelstudienzeit;
				console.log("--------Die regelstudienzeit:", regelstudienzeit);
				console.log("u are here3");

				if (regelstudienzeit) {
					console.log("u are here");

					const pflichtModuleResponse = await axios.get(`${this.Adress}/studiengang/pflicht/${this.studiengang} `);
					const wahlpflichtmoduleResponse = await axios.get(`${this.Adress}/studiengang/wahlpflicht/${this.studiengang}`);
					const studentProgressResponse = await axios.get(`${this.Adress}/modul/status/${this.studentID}`);

					const studentProgress = studentProgressResponse.data.modul;
					this.$store.dispatch('saveStudentProgress', this.studentProgress);

					const pflichtModule = pflichtModuleResponse.data.pflicht;
					const wahlpflichtmodule = wahlpflichtmoduleResponse.data.wahlpflicht;
					console.log(studentProgress.find(spModule => spModule.Kuerzel === "LDS").Versuch);

					// Sort mandatory modules by semester
					pflichtModule.sort((a, b) => a.Semester - b.Semester);
					console.log("------Pflichtmodule getData---------", pflichtModule);

					// Retrieve all modules where the student has passed the exam/module
					const passedModuleKuerzel = studentProgress
						.filter(modul => modul.Status === 'Bestanden')
						.map(modul => modul.Kuerzel);

					this.ModuleList = [];
					// Inline getModulesForSemester function
					for (let semester = 1; semester <= regelstudienzeit; semester++) {
						this.ModuleList.push({
							semestercount: `${semester}. Semester`,
							faecher: pflichtModule
								.filter(modul => modul.Semester === semester && !passedModuleKuerzel.includes(modul.Kuerzel))
								.map(modul => ({
									Name: modul.Name,
									Kuerzel: modul.Kuerzel,
									Status: studentProgress.find(spModule => spModule.Kuerzel === modul.Kuerzel)?.Status || '',
									tryCount: studentProgress.find(spModule => spModule.Kuerzel === modul.Kuerzel)?.Versuch || 0,
								}))
						});
					}

					// Add the elective modules to the semester list
					this.ModuleList.push({
						semestercount: 'Wahlpflichtmodule',
						faecher: wahlpflichtmodule
							.filter(modul => !passedModuleKuerzel.includes(modul.Kuerzel))
							.map(modul => ({
								Name: modul.Name,
								Kuerzel: modul.Kuerzel,
								Status: studentProgress.find(spModule => spModule.Kuerzel === modul.Kuerzel)?.Status || '',
								tryCount: studentProgress.find(spModule => spModule.Kuerzel === modul.Kuerzel)?.Versuch || 0,
							}))
					});
					this.$store.dispatch('updateCurrentModules', this.ModuleList)

				} 

			} catch (error) {
				console.log(error);
			}
		},

		getModuleClass(tryCount, status) {
			// console.log("trycount:", tryCount);
			// console.log("status:", status);
			if (tryCount === 1 && status !== 'Nicht Bestande') {
				return 'secondTry';
			} else if (tryCount === 2 && status === 'Nicht Bestanden') {
				return 'thirdTry';
			} else if (tryCount === 3 && status === 'Nicht Bestanden') {
				return 'moduleFailed';
			} else {
				return 'modules'; // Fallback, wenn keine spezifische Klasse gefunden wird
			}
		},
	},

	//Display when data is fetched
	async mounted() {
		this.ModuleList = this.$store.getters.getCurrentModules;
		console.log("currentMODULES: ", this.ModuleList);
		this.getData();
	},

	computed: {
		//Vuex-Getters
		goals() {
			return this.$store.getters.getGoal
		},
		goals_ss() {
			return this.$store.getters.getGoals_ss
		},
		goals_ws() {
			return this.$store.getters.getGoals_ws
		},
		deletedGoals() {
			return this.$store.getters.getDeletedGoals
		},
	},
}
</script>

<style scoped>
.infoButton {
	font-size: 28px;
}

.goals-container {
	background-color: #8c9900;
	border-radius: 15px;
	height: 50px;
	text-align: center;
	font-size: larger;
	padding: 15px;
}

.explanatory-text {
	color: grey;
	text-align: center;
}

.grid {
	padding: 25px;
}


.background {
	border-radius: 15px;
	height: 50px;
}

.spacer {
	margin: 1px;
	border: none;
	background-color: var(--ion-background);
}

.semesterHeader {
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	padding-top: 30px;
	padding-bottom: 20px;
	border-radius: 15px;
}

.labelHeader {
	text-align: center;
	padding: 5px;
	font-size: larger;
}

.headerText {
	color: var(--ion-color-light);
}

.semesterHeader ion-icon {
	width: 45px;
	height: 25px;
	border-radius: 30px;
	background-color: var(--ion-color-primary);
	color: white;
}

.drag-drop-containers {
	display: block;
	justify-content: space-between;
	padding-top: 5px;
	padding-left: 8px;
	padding-right: 25px;
	padding-bottom: 5px;
}

.drag-drop-box-item {
	height: 45px;
	margin: 10px;
	border-radius: 30px;
	text-align: left;
	background-color: #d2d69e;
}

.drag-drop-box-item ion-icon {
	color: white;
}

.item-container {
	background-color: #d2d69e;
}

.card-label {
	margin: 0;
	padding-left: 15px;
	font-weight: normal;
	color: black;
}

.card-label h2 {
	font-weight: bold;
}

.löschenButton {
	height: 27px;
	width: 27px;
	margin-left: 8px;
	margin-top: 4px;
	border: 2px solid #ccc;
	border-radius: 0px;
}

.klausuren-title {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
}

.underline {
	border-bottom: 2px solid #8c9900;
	padding-bottom: 5px;
	margin-bottom: 10px;
}

.drag-item {
	width: 100px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 5px;
	border-radius: 20px;
	cursor: pointer;
}

@media (max-width: 950px) {
	.info-modal {
		--height: 75%;
		--width: 75%;
		--border-radius: 16px;
		--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
}

@media (min-width: 950px) {
	.info-modal {
		--height: 80%;
		--width: 45%;
		--border-radius: 16px;
		--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
}

ion-modal {
	--height: 35%;
	--width: 90%;
	--border-radius: 16px;
	--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
		0 4px 6px -4px rgb(0 0 0 / 0.1);
}

@media (min-width: 768px) {
	ion-modal {
		--width: 50%;
		/* Breite für breitere Bildschirme anpassen */
	}
}

ion-modal::part(backdrop) {
	background: rgba(209, 213, 219);
	opacity: 1;
}

ion-modal ion-toolbar {
	--background: #8c9900;
	--color: white;
}

#legend {
	text-align: center;
	font-size: large;
	margin-top: 25px;
}

#legendBadge {
	box-shadow: 1px 1px 7px grey;
	margin-right: 5px;
	margin-left: 5px;
}

.modules {
	height: 30px;
	width: 100%;
	margin: 2px;
	text-align: center;
	padding: 6px;
	border-radius: 15px;
	background-color: #fff;
}

.secondTry {
	height: 30px;
	width: 100%;
	margin: 2px;
	text-align: center;
	padding: 6px;
	border-radius: 15px;
	background-color: var(--ion-color-warning);
}

.thirdTry {
	height: 30px;
	width: 100%;
	margin: 2px;
	text-align: center;
	padding: 6px;
	border-radius: 15px;
	background-color: var(--ion-color-danger);
}

.moduleFailed {
	height: 30px;
	width: 100%;
	margin: 2px;
	text-align: center;
	padding: 6px;
	border-radius: 15px;
	background-color: grey;
}

#reachedGoalsButton {
	transition: 0.8s;
}

#reachedGoalsButton:hover {
	opacity: 0.5;
}

#deletedGoalsButton {
	transition: 0.8s;
}

#deletedGoalsButton:hover {
	filter: brightness(0.7);
}

@media (max-width: 767px) {
	.modules {
		width: 100%;
		/* Adjust the width as needed */
	}
}

/* move to the left */
ion-title {
	margin-left: -5px;
}
</style>
