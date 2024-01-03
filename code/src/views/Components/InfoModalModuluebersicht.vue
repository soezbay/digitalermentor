<script setup>
import {
	IonModal,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonIcon,
} from '@ionic/vue'
import { ref } from 'vue'
import { texts } from '../../texts.js'
import { book } from 'ionicons/icons'

const data = ref({
	book,
	texts,
})

</script>

<template>
	<!-- Modulübersicht -->
	<ion-modal
		class="info-modal"
		ref="modal_info"
		trigger="open-info-modal-modulübersicht">
		<ion-content>
			<ion-grid>
				<ion-row justify-content-center align-items-center>
					<ion-col size="12">
						<div class="ion-text-center">
							<p>
								<ion-icon
									:icon="book"
									style="font-size: 40px; color: #bbcc00"></ion-icon>
							</p>
							<p style="font-size: 22px">
								<strong>{{ texts.moduluebersicht.erklaerung.p1strong }}</strong>
							</p>
							<p>{{ texts.moduluebersicht.erklaerung.p1 }}</p>
							<p>
								<strong>{{ texts.moduluebersicht.erklaerung.p2strong }}</strong>
							</p>
							<p>{{ texts.moduluebersicht.erklaerung.p2 }}</p>
							<p>
								<strong>{{ texts.moduluebersicht.erklaerung.p3strong }}</strong>
							</p>
							<p>{{ texts.moduluebersicht.erklaerung.p3 }}</p>
							<p>
								<strong>{{ texts.moduluebersicht.erklaerung.p4strong }}</strong>
							</p>
							<p>{{ texts.moduluebersicht.erklaerung.p4 }}</p>
							<p>
								<strong>{{ texts.moduluebersicht.erklaerung.p5strong }}</strong>
							</p>
							<p>{{ texts.moduluebersicht.erklaerung.p5 }}</p>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-modal>
</template>

<style scoped></style>
