<script setup>
import { ref } from 'vue'
import { texts } from '../../texts.js'
import { helpCircleOutline, create } from 'ionicons/icons'

const props = defineProps({
  title: String,
  hasInfo: Boolean,
})

const data = ref({
  helpCircleOutline,
  create
})
</script>

<template>
  <ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button router-link="/menu/dashboard">
						<ion-icon
							style="font-size: 45px"
							src="/resources/Logo_DigitalerMentor.svg"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title>{{ title }}</ion-title>
				<ion-buttons v-if="title === 'Profil'" slot="end">
					<ion-button color="primary" router-link="/menu/profil/changeProfile">
						<ion-icon slot="icon-only" :icon="create"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-buttons v-if="hasInfo" slot="end" style="display: flex; align-items: center">
					<ion-button class="infoButton" color="primary" id="open-info-modal" expand="block">
						<ion-icon :icon="helpCircleOutline"></ion-icon>
					</ion-button>
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
				<ion-buttons v-else slot="end">
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
</template>

<style scoped>
.infoButton {
	font-size: 28px;
}
</style>