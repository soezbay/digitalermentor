<template>
	<ion-page>
		<HeaderComponent :title="texts.titel.profil" :hasInfo="false" />
		<ion-content>
			<div id="userDropdown">
        <ion-item v-if="this.selectedBenutzer && this.Benutzer">
          <ion-label>Ausgewählter Benutzer:</ion-label>
          <ion-select v-model="this.selectedBenutzer">
            <ion-select-option v-for="benutzer in Benutzer" :key="benutzer" :value="benutzer">
              {{ benutzer.Vorname }} {{ benutzer.Nachname }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </div>
			<div id="imageContainer">
				<!-- <img
					style="
						border-bottom-left-radius: 25px;
						border-bottom-right-radius: 25px;
					"
					alt=""
					src="resources/Tafel.jpg"
					class="platzhalter" /> -->
				<div id="pb">
					<ion-avatar>
						<!-- <img alt="" src="resources/Platzhalter_Digitaler_Mentor.jpg" /> -->
					</ion-avatar>
				</div>
			</div>
			<div style="height: 70px"></div>
			<template v-if="selectedBenutzer">
			<div style="text-align: center">
				<h1>{{ texts.profil.name }}</h1>
				<!-- <h4>{{ userdata.profile.firstname }} {{ userdata.lastname }} </h4> -->
				<h4>{{ this.selectedBenutzer.Vorname }} {{ this.selectedBenutzer.Nachname }}</h4>

				<h1>{{ texts.profil.matrikel }}</h1>
				<!-- <h4>{{ userdata.profile.matrikelnumber }}</h4> -->
				<h4>{{ this.selectedBenutzer.Martrikelnummer }}</h4>

				<h1>{{ texts.profil.studiengang }}</h1>
				<!-- <h4>{{ userdata.profile.course }}</h4> -->
				<h4>{{ this.selectedBenutzer.Kuerzel }}</h4>

				<h1>{{ texts.profil.fachsemester }}</h1>
				<!-- <h4 style="margin-bottom: 0px"> {{ userdata.profile.semester }}</h4> -->
				<h4 style="margin-bottom: 0px">{{  this.selectedBenutzer.Fachsemester }}</h4>

				<h1>{{ texts.profil.email }}</h1>
				<!-- <h4>{{ userdata.profile.email }}</h4> -->
				<h4>{{ this.selectedBenutzer.EMail }}</h4>
			</div>
		</template>
		</ion-content>
	</ion-page>
</template>

<script>
import { userdata } from '../userdata.js';
import { texts } from '../texts.js'
import { create } from 'ionicons/icons'
import axios from 'axios'
import HeaderComponent from '../views/Components/HeaderComponent.vue'

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonDatetime,
	IonButtons,
	IonBackButton,
	IonMenuButton,
	IonButton,
	IonItem,
	IonLabel,
	IonList,
	IonFab,
	IonFabButton,
	IonIcon,
	IonAvatar,
	IonSelect,
	IonSelectOption,
} from '@ionic/vue'
export default {
	components: {
		IonPage,
		IonHeader,
		IonSelect,
  		IonSelectOption,
		IonToolbar,
		IonTitle,
		IonContent,
		IonDatetime,
		IonItem,
		IonButtons,
		IonBackButton,
		IonMenuButton,
		IonButton,
		IonLabel,
		IonList,
		IonFab,
		IonFabButton,
		IonIcon,
		IonAvatar,
		HeaderComponent,
	},

	data() {
		return {
			Adress: import.meta.env.VITE_API_URL,
			texts,
			userdata,
			selectedBenutzer: null,
			Benutzer: [],
		}
	},

	setup() {
		return { create }	
	},
	created() {
		this.fetchAlleBenutzerUndsetzeSelectedBenutzer();
	},
	watch: {
  		selectedBenutzer: function (newVal, oldVal) {
			console.info("newVal")
			console.info(newVal)
			console.info("oldVal")
			console.info(oldVal)
			if(newVal && oldVal) {
				console.info(newVal.BenutzerID +" "+ oldVal.BenutzerID)
    		if (newVal.BenutzerID != oldVal.BenutzerID) {
				this.selectedBenutzer = newVal;
				this.$store.dispatch('fetchCacheFromAPIForUser', newVal.BenutzerID);
      			console.info("User Change");
    		}
		}
  		}
	},
	methods: {
		async fetchAlleBenutzerUndsetzeSelectedBenutzer() {
			try {
				const response = await axios.get(`${this.Adress}/benutzer`)
				this.Benutzer = response.data.benutzer
				await this.fetchBenutzer();
			} catch (error) {
				console.error('Error fetching Benutzer:', error)
			}
		},
		async fetchBenutzer() {
			console.info(this.Benutzer);
			const userIndex = this.Benutzer.findIndex((benutzer) => benutzer.BenutzerID === this.$store.getters.getTestBenutzer);

			if (userIndex !== -1) {
			this.selectedBenutzer = this.Benutzer[userIndex];
			console.info(this.selectedBenutzer);
			} else {
  			this.selectedBenutzer = {};
			}
		},
	
		async handleUserChange() {
      		if (this.selectedBenutzer && this.selectedBenutzer.BenutzerID) {
        		this.$store.commit('fetchCacheFromAPIForUser', this.selectedBenutzer.BenutzerID);
        		console.info("User Change");
      		}
    	},
	}
}
</script>

<style scoped>

#imageContainer {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

#pb {
	position: absolute;
	bottom: -80px;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	padding: 10px;
}

ion-content ion-header {
	font-size: 150%;
	padding: 10px;
}

ion-avatar {
	width: 200px;
	height: 200px;
	border: 5px solid white;
}

h1 {
	color: #8c9900;
}

h4 {
	margin: -7px;
	margin-bottom: 30px;
}

@media screen and (min-width: 768px) {
	.platzhalter {
		width: 760px;
		height: 300px;
	}
}

/* move to the left */
ion-title {
	margin-left: -5px;
}

</style>
