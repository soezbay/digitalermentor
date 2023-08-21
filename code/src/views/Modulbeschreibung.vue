<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button color="medium" @click="cancel">Cancel</ion-button>
				</ion-buttons>
				<ion-title>Modal</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="confirm" :strong="true">Confirm</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-item>
				<ion-input
					label-placement="stacked"
					label="Enter your name"
					v-model="name"
					placeholder="Your name"></ion-input>
			</ion-item>
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
	IonButton,
	IonItem,
	IonInput,
	modalController,
IonDatetime,
IonLabel,
IonList,
IonMenuButton,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import axios from 'axios';


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
        IonMenuButton,
        IonLabel,
        IonList
    },
    data() {
        return {
            usersList: []
        }
    },
    methods: {
        getData() {
            axios.get('http://localhost:8000/bewertung').then(Response => {
                console.log(Response.data)
                this.usersList = Response.data.bewertungen;
            }).catch(err => {
                console.log(err);
            })
        },
    },
    mounted() {
        this.getData();
    },

cancel() { modalController.dismiss(null, "cancel")},
confirm() {modalController.dismiss(name.value, "confirm")}
}


</script>
