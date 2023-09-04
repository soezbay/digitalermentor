<template>
    <ion-page>
        <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-title>Studienverlauf</ion-title>
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
        <ion-content>
            Hallo
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
	IonLabel,
	IonList,
	IonMenuButton,
	IonBackButton,
	IonModal,
    IonButton,
} from "@ionic/vue";

import { defineComponent, ref } from "vue";
import axios from "axios";

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
		IonList,
		IonBackButton,
		IonModal,
        IonButton,
	},
	data() {
		return {
		};
	}
}
</script>

<style scoped>

</style>