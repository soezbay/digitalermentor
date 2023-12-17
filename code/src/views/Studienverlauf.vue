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
				<ion-title>{{ texts.titel.studienverlauf }}</ion-title>
				<ion-buttons slot="end" style="display: flex; align-items: center">
					<ion-button class="infoButton" color="primary" id="open-info-modal" expand="block">
						<ion-icon :icon="helpCircleOutline"></ion-icon>
					</ion-button>
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<!-- CP Progress bar mit Notendurchschnitt -->
			<ion-progress-bar :value="progress" :buffer="1"></ion-progress-bar>
			<div id="cpInfo">
				{{
					reachedCreditPoints +
					'\/' +
					fullCreditPoints +
					' ' +
					texts.studium.leistungspunkteKurz
				}}
			</div>
			<div id="averageGrade">
				{{ texts.studienverlauf.deinNotendurchschnitt }}
				{{ calculateAverageGrade().toFixed(2).replace('.', ',') }} <br />
			</div>
			<!-- Modulsuche -->
			<ion-grid>
				<ion-row class="ion-justify-content-center">
					<ion-searchbar
						show-clear-button="always"
						placeholder="Modulsuche"
						style="width: 50%"
						type="text"
						v-model="query"
						@ionChange="handleSearchChange"></ion-searchbar>
				</ion-row>
			</ion-grid>
			<!-- Pflichtmodule -->
			<ion-grid
				:fixed="true"
				v-for="(semesterModules, semester) in groupedModules"
				:key="semester">
				<ion-row :key="semester">
					<!-- Semester Überschriften -->
					<ion-col size="12">
						<!-- Zeige nur Semester ab 1. Semester (da 0. Semester Wahlmodule sind)-->
						<ion-row v-if="semester >= 1">
							<h2>{{ semester }}. {{ texts.studium.semester }}</h2>
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
								:message="texts.studienverlauf.toastSemesterEntfernen"
								:duration="1500"
								@didDismiss="setOpen(false)"></ion-toast>
						</ion-row>
						<ion-row class="modulesRow" @drop="drop" @dragover="dragOver">
							<!-- Zeige nur Semester ab 1. Semester (da 0. Semester Wahlmodule sind)-->
							<ion-row
								class="modulesContainer"
								:key="`modules-${semester}`"
								v-if="semester >= 1"
								:data-semester="semester"
								@dragenter="dragEnter"
								@dragleave="dragLeave">
								<ion-col
									size="4"
									v-for="(module, index) in semesterModules"
									:key="index"
									:data-semester="semester">
									<!-- Bestandene Module können nicht verschoben werden -->
									<ion-card
										v-if="module === 'empty'"
										class="moduleElement empty-card"
										:draggable="false"
										:data-semester="semester"
										:id="'empty-' + semester"
										@dragstart="e => dragStart(e, 'empty', semester)">
										<span :data-semester="semester"></span>
									</ion-card>
									<ion-card
										v-else
										class="moduleElement"
										:draggable="!isPassedModules(module)"
										:data-semester="semester"
										:id="module.Kuerzel"
										@dragstart="e => dragStart(e, module.Kuerzel, semester)"
										:class="getModuleStatusClass(module)">
										<span
											data-semester="semester"
											v-html="highlight(module.Kuerzel, query)"></span>
										<br />
										<span id="note" :data-semester="semester">
											{{ getStudentModuleNoteForPass(module) }}
										</span>
									</ion-card>
								</ion-col>
							</ion-row>
						</ion-row>
					</ion-col>
				</ion-row>
			</ion-grid>
			<!-- Semester hinzufügen -->
			<ion-grid :fixed="true">
				<ion-col size="12">
					<ion-buttons>
						<ion-button @click="addEmptySemester">
							<ion-icon :icon="add" id="addSemesterIcon"></ion-icon>
							<h5>{{ texts.studienverlauf.semesterHinzufuegen }}</h5>
						</ion-button>
					</ion-buttons>
				</ion-col>
			</ion-grid>
			<!-- Wahlpflichtmodule -->
			<ion-grid :fixed="true">
  <ion-row v-for="(semesterModules, semester) in groupedModules" :key="semester">
    <!-- Nur das Semester mit Index 0 anzeigen -->
    <ion-col size="12" v-if="semester === 0">
      <ion-row>
        <h2>{{ texts.studium.wahlpflichtmodule }}</h2>
      </ion-row>
      <ion-row class="modulesRow" @drop="drop" @dragover="dragOver">
        <ion-row
          :key="`modules-${semester}`"
          class="modulesContainer"
          :data-semester="semester"
          @dragenter="dragEnter"
          @dragleave="dragLeave"
        >
          <ion-col
            size="4"
            v-for="(module, index) in semesterModules"
            :key="index"
            :data-semester="semester"
          >
            <ion-card
              v-if="module === 'empty'"
              class="moduleElement empty-card"
              :draggable="false"
              :data-semester="semester"
              :id="'empty-' + semester"
              @dragstart="e => dragStart(e, 'empty', semester)"
            >
              <span :data-semester="semester"></span>
            </ion-card>
            <ion-card
              v-else
              class="moduleElement"
              draggable="true"
              :data-semester="semester"
              @dragstart="e => dragStart(e, module.Kuerzel, semester)"
              :id="module.Kuerzel"
              :class="getModuleStatusClass(module)"
            >
              <span
                :data-semester="semester"
                v-html="highlight(module.Kuerzel, query)"
              ></span>
              <br />
              <span id="note" :data-semester="semester">
                {{ getStudentModuleNoteForPass(module) }}
              </span>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-row>
    </ion-col>
  </ion-row>
</ion-grid>
			

			<!-- Legende -->
			<div id="legend">
				<ion-badge id="legendBadge" color="primary">&nbsp;</ion-badge>
				<span>{{ texts.studium.klausurStatus.bestanden }}</span>
				<ion-badge id="legendBadge" color="warning">&nbsp;</ion-badge>
				<span>{{ texts.studium.klausurStatus.zweiterVersuch }}</span>
				<ion-badge id="legendBadge" color="danger">&nbsp;</ion-badge>
				<span>{{ texts.studium.klausurStatus.dritterVersuch }}</span>
			</div>

			<!--Help-Modal-option for user-->
			<ion-modal class="info-modal" ref="modal_info" trigger="open-info-modal" :presenting-element="presentingElement">
			<ion-content>
				<ion-grid>
					<ion-row justify-content-center align-items-center>
						<ion-col size="12">
							<div class="ion-text-center">
							<p><ion-icon :icon="school" style="font-size: 40px; color:#BBCC00"></ion-icon></p>
								<p style="font-size: 22px;">
									<strong>{{ texts.studienverlauf.erklaerung.p1strong }}</strong>
								</p>
								<p> {{ texts.studienverlauf.erklaerung.p1 }}</p>
								<p><strong>{{ texts.studienverlauf.erklaerung.p2strong }}</strong></p>
								<p> {{ texts.studienverlauf.erklaerung.p2 }}</p>
								<p><strong>{{ texts.studienverlauf.erklaerung.p3strong }}</strong></p>
								<p> {{ texts.studienverlauf.erklaerung.p3 }}</p>
								<p><strong>{{ texts.studienverlauf.erklaerung.p4strong }}</strong></p>
								<p> {{ texts.studienverlauf.erklaerung.p4 }}</p>
								<p><strong>{{ texts.studienverlauf.erklaerung.p5strong }}</strong></p>
								<p> {{ texts.studienverlauf.erklaerung.p5 }}</p>

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
	toastController,
	IonSearchbar,
} from '@ionic/vue'
import { remove, add, ellipse, helpCircleOutline, school } from 'ionicons/icons'
import { texts } from '../texts.js'
import { defineComponent, ref } from 'vue'
import axios from 'axios'

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
		IonSearchbar,
	},

	setup() {
		const isOpen = ref(false)

		const setOpen = state => {
			isOpen.value = state
		}

		const showToast = () => {
			isOpen.value = true
		}

		return {
			remove,
			add,
			ellipse,
			helpCircleOutline,
			school,
			isOpen,
			setOpen,
			showToast,
		}
	},
	data() {
		return {
			Adress : import.meta.env.VITE_API_URL,
			modules: [], // Alle Module aus der Datenbank
			groupedModules: [], // Neues Datenattribut für gruppierte Module
			electiveModules: [], // Wahlpflichtmodule
			fullCreditPoints: 180, // Zu erreichenden Credit Points
			studentID: 'test123',
			studentProgress: [], // Teilgenommene Module des Studierenden
			emptySemesters: 0, // Anzahl der leeren Semester
			enabled: true,
			targetSemesterModules: [],
			texts,
			query: '',
		}
	},
	methods: {
		log(event) {
			console.log(event)
		},
		getData() {
			axios
				.get(`${this.Adress}/studiengang/pflicht/pi`)
				.then(Response => {
					console.log(Response.data)
					this.modules = Response.data.pflicht
					this.groupModules()
				})
				.catch(err => {
					console.log(err)
				})
			axios
				.get(`${this.Adress}/modul/status/${this.studentID}`)
				.then(Response => {
					console.log(Response.data)
					this.studentProgress = Response.data.modul
				})
				.catch(err => {
					console.log(err)
				})
			axios
				.get(`${this.Adress}/studiengang/wahlpflicht/pi`)
				.then(Response => {
					console.log(Response.data)
					this.electiveModules = Response.data.wahlpflicht
					this.groupModules()
				})
				.catch(err => {
					console.log(err)
				})
		},

		// Methode, um ein leeres Semester hinzuzufügen
		addEmptySemester() {
			this.emptySemesters++
			// Fügen Sie dann ein leeres Array für das neue Semester hinzu
			this.groupedModules.push([])
		},

		// Methode, um ein leeres Semester zu entfernen
		removeEmptySemester() {
			if (this.emptySemesters > 0) {
				this.emptySemesters--
				this.groupedModules.pop([])
			}
		},

		// Funktion zum Gruppieren der Module nach Semestern
		groupModulesBySemester(modules) {
			const groupedObliModules = []

			modules.forEach(module => {
				const semester = module.Semester

				if (!groupedObliModules[semester]) {
					groupedObliModules[semester] = []
				}

				groupedObliModules[semester].push(module)
				groupedObliModules[semester].sort()
			})

			return groupedObliModules
		},

		// Rufen Sie diese Methode auf, um die Module zu gruppieren
		groupModules() {
			// Erstellen Sie eine tiefe Kopie von electiveModules
			const clonedElectiveModules = JSON.parse(
				JSON.stringify(this.electiveModules)
			)
			this.groupedModules = [
				clonedElectiveModules,
				...this.groupModulesBySemester(this.modules).filter(Array),
			]
		},

		// Status des Moduls herausfinden (Bestanden oder nicht Bestanden)
		getModuleStatusClass(module) {
			// Einträge aus studentProgress mit dem übergebenen Modul werden zu enteredModules hinzugefügt
			const enteredModules = this.studentProgress.filter(
				progressModule => progressModule.Kuerzel === module.Kuerzel
			)
			// Wenn enteredModules leer ist, ist das Modul noch nicht angetreten worden
			if (enteredModules.length === 0) {
				return 'gray'
			}

			// Berechnen des Notendurchschnitts
			const averageGrade =
				enteredModules.reduce(
					(total, progressModule) => total + parseFloat(progressModule.Note),
					0
				) / enteredModules.length

			if (averageGrade >= 5 && enteredModules.length == 1) {
				return 'firstTry' // Modul ein mal nicht bestanden, gelbe Farbe
			} else if (averageGrade >= 5 && enteredModules.length == 2) {
				return 'secondTry' // Modul zwei mal nicht bestanden, rote Farbe
			} else {
				return 'passed' // Modul bestanden, grüne Farbe
			}
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

		// Diese Methode gibt die Note zurück, mit der der Student das Modul bestanden hat
		getStudentModuleNoteForPass(module) {
			const passedModules = this.studentProgress.filter(
				progressModule =>
					progressModule.Kuerzel === module.Kuerzel &&
					progressModule.Status === 'Bestanden'
			)

			// Wenn es mindestens einen bestandenen Versuch gibt, gib die Note des ersten bestandenen Versuchs zurück
			if (passedModules.length > 0) {
				return 'Note: ' + passedModules[0].Note
			}
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

		dragStart(event, moduleKuerzel, semester) {
			// Überprüft, ob das ausgewählte Modul Bestanden ist
			const passedCheck = this.studentProgress.some(
				module =>
					module.Kuerzel === moduleKuerzel && module.Status === 'Bestanden'
			)

			// Wenn ja, dann soll es nicht draggable sein
			if (!passedCheck) {
				event.dataTransfer.setData(
					'text/plain',
					JSON.stringify({ moduleKuerzel, semester })
				)
				event.target.classList.add('drag-start')
				console.log('dragStart')
			} else {
				event.target.setAttribute('draggable', false)
			}
		},

		dragEnter(e) {
			e.preventDefault()
			e.target.classList.add('drag-enter')
			console.log('dragEnter')

			// Holen Sie sich die gezogenen Daten
			const data = e.dataTransfer.getData('text/plain')
			const { moduleKuerzel, semester } = JSON.parse(data)
			const targetSemester = e.target.dataset.semester
			const targetSemesterArray = this.groupedModules[targetSemester]
			if (targetSemester != semester) {
				targetSemesterArray.push('empty')
			}
		},

		dragOver(e) {
			e.preventDefault()
			e.target.classList.add('drag-over')
			console.log('dragOver')
		},

		dragLeave(e) {
			e.target.classList.remove('drag-enter')
			console.log('dragLeave')

			const targetSemester = e.target.dataset.semester
			console.log('dragLeave targetSemester: ' + targetSemester)

			const targetSemesterArray = this.groupedModules[targetSemester]

			// Entfernen des leeren Elements ('empty') aus dem Array
			const index = targetSemesterArray.indexOf('empty')
			if (index !== -1) {
				targetSemesterArray.splice(index, 1)
			}

			console.log(targetSemesterArray)
		},

		async drop(e) {
			e.target.classList.remove('drag-over')
			e.target.classList.remove('drag-start')
			e.target.classList.remove('drag-enter')
			// Selektiere alle Elemente mit der Klasse 'moduleElement'
			const moduleElements = document.querySelectorAll('.moduleElement')

			// Iteriere durch jedes Element und entferne die Klasse 'drag-start'
			moduleElements.forEach(element => {
				element.classList.remove('drag-start')
			})

			// Holen Sie sich die gezogenen Daten
			const data = e.dataTransfer.getData('text/plain')
			const { moduleKuerzel, semester } = JSON.parse(data)

			const targetSemester = e.target.dataset.semester
			let electiveModuleCheck = this.electiveModules.some(
				electiveModule => electiveModule.Kuerzel === moduleKuerzel
			)

			if (targetSemester != 0) {
				electiveModuleCheck = true
			}

			if (!electiveModuleCheck) {
				const toast = await toastController.create({
					message: texts.studienverlauf.toastWahlmodule,
					duration: 1500,
					position: 'bottom',
					color: 'warning',
				})
				const targetSemesterArray = this.groupedModules[targetSemester]
				// Entfernen des leeren Elements ('empty') aus dem Array
				const index = targetSemesterArray.indexOf('empty')
				if (index !== -1) {
					targetSemesterArray.splice(index, 1)
				}

				toast.present()
			}

			console.log(
				'target semester: ' + targetSemester + 'semester: ' + semester
			)
			console.log(electiveModuleCheck)

			if (targetSemester != semester && electiveModuleCheck) {
				// Zugriff auf die Semester-Arrays
				const sourceSemesterArray = this.groupedModules[semester]
				const targetSemesterArray = this.groupedModules[targetSemester]

				// Finde das Index des Moduls im Quellsemester-Array
				const moduleIndex = sourceSemesterArray.findIndex(
					module => module.Kuerzel === moduleKuerzel
				)

				// Entfernen des leeren Elements ('empty') aus dem Array
				const index = targetSemesterArray.indexOf('empty')
				if (index !== -1) {
					targetSemesterArray.splice(index, 1)
				}

				if (moduleIndex !== -1) {
					// Entferne das Modul aus dem Quellsemester-Array
					const removedModule = sourceSemesterArray.splice(moduleIndex, 1)[0]

					// Füge das Modul zum Zielsemester-Array hinzu
					targetSemesterArray.push(removedModule)

					// Führe eine Aktualisierung der Vue.js-Ansicht durch
					this.$forceUpdate()
				}
			}
		},

		isPassedModules(module) {
			return this.getModuleStatusClass(module) === 'passed'
		},

		highlight(text, query) {
			console.log('Highlighting:', text, 'with query:', query)
			if (text.toLowerCase() === query.toLowerCase()) {
				return (
					'<span id="highlightText" style="background-color:yellow;">' +
					text +
					'</span>'
				)
			}

			return text.replace(new RegExp(query, 'gi'), match => {
				return (
					'<span id="highlightText" style="background-color:yellow;">' +
					match +
					'</span>'
				)
			})
		},
		handleSearchChange() {},
	},

	mounted() {
		this.getData()
		// this.sortModulesAlphabetically()
	},

	computed: {
		// Berechnung der erreichten Credit Points des Studenten
		reachedCreditPoints() {
			return this.calculateCreditPoints()
		},

		// Berechne Prozent der erreichten Credit Points für den Progress Bar
		progress() {
			return this.reachedCreditPoints / this.fullCreditPoints
		},

		// Berechnete Eigenschaft, die die Semester einschließlich der leeren Semester zurückgibt
		addEmptySemesters() {
			// Füge leere Semester basierend auf this.emptySemesters hinzu
			for (let i = 1; i <= this.emptySemesters; i++) {
				const semesterNumber = Object.keys(this.groupedModules).length
				this.groupedModules[semesterNumber] = []
				this.$forceUpdate()
			}

			return groupedModules
		},
	},
})
</script>

<style scoped>

.infoButton {
	font-size: 28px;
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

#highlightText {
	background-color: yellow;
}

#cpInfo {
	text-align: center;
}

.drag-start:active {
	opacity: 0.7;
}

.modulesRow {
	width: 100%;
	margin-left: 5px;
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

.moduleElement {
	height: 50px;
	margin: 0px;
	box-shadow: 5px 5px 10px grey;
}

.empty-card {
	opacity: 0.5;
}

#note {
	color: white;
}

#averageGrade {
	color: var(--ion-color-primary);
	text-align: center;
	margin-top: px;
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
	margin-bottom: 10px;


}

#legendBadge {
	box-shadow: 1px 1px 7px grey;
	margin-right: 7px;
	margin-left: 7px;
}

.emptySemesterRow {
	height: 50px;
	background: #d2d69e;
}

ion-grid{
	padding-right: 15px;
}

@media (max-width:950px) {
	.info-modal {
		--height: 75%;
		--width: 75%;
		--border-radius: 16px;
		--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
}

@media (min-width:950px) {
	.info-modal {
		--height: 80%;
		--width: 45%;
		--border-radius: 16px;
		--box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1)
	}
}

</style>
