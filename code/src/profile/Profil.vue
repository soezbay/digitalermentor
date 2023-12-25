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
				<ion-title>{{ texts.titel.profil }}</ion-title>
				<ion-buttons slot="end">
					<ion-button color="primary" router-link="/menu/profil/changeProfile">
						<ion-icon slot="icon-only" :icon="create"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-buttons slot="end">
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<div id="imageContainer">
				<img
					style="
						border-bottom-left-radius: 25px;
						border-bottom-right-radius: 25px;
					"
					alt=""
					src="resources/Tafel.png"
					class="platzhalter" />
				<div id="pb">
					<ion-avatar>
						<img alt="" src="resources/Platzhalter_Digitaler_Mentor.png" />
					</ion-avatar>
				</div>
			</div>
			<div style="height: 70px"></div>
			<template v-if="Benutzer[0]">
			<div style="text-align: center">
				<h1>{{ texts.profil.name }}</h1>
				<!-- <h4>{{ userdata.profile.firstname }} {{ userdata.lastname }} </h4> -->
				<h4>{{ this.Benutzer[0].Vorname }} {{ this.Benutzer[0].Nachname }}</h4>

				<h1>{{ texts.profil.matrikel }}</h1>
				<!-- <h4>{{ userdata.profile.matrikelnumber }}</h4> -->
				<h4>{{ this.Benutzer[0].Martrikelnummer }}</h4>

				<h1>{{ texts.profil.studiengang }}</h1>
				<!-- <h4>{{ userdata.profile.course }}</h4> -->
				<h4>{{ this.Benutzer[0].Kuerzel }}</h4>

				<h1>{{ texts.profil.fachsemester }}</h1>
				<!-- <h4 style="margin-bottom: 0px"> {{ userdata.profile.semester }}</h4> -->
				<h4 style="margin-bottom: 0px">{{  this.Benutzer[0].Fachsemester }}</h4>

				<h1>{{ texts.profil.email }}</h1>
				<!-- <h4>{{ userdata.profile.email }}</h4> -->
				<h4>{{ this.Benutzer[0].EMail }}</h4>
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
} from '@ionic/vue'
export default {
	components: {
		IonPage,
		IonHeader,
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
	},

	data() {
		return {
			Adress: import.meta.env.VITE_API_URL,
			texts,
			userdata,
			Benutzer: {}
		}
	},

	setup() {
		return { create }
	},
	created() {
		this.fetchBenutzer();
	},
	methods: {
		async fetchBenutzer() {
			try {
				const response = await axios.get(`${this.Adress}/benutzer/${this.$store.getters.getTestBenutzer}`)
				this.Benutzer = response.data.benutzer
				console.info(this.Benutzer);
			} catch (error) {
				console.error('Error fetching Benutzer:', error)
			}
		}
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
