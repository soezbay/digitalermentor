<script setup>
import { ref } from 'vue'
import { texts } from '../../texts.js'
import { school } from 'ionicons/icons'

const data = ref({
	texts,
	school,

})
</script>

<template>
	<!--Studienverlauf-->
	<ion-modal
		class="info-modal"
		ref="modal_info"
		trigger="open-info-modal"
		:presenting-element="presentingElement">
		<ion-content>
			<ion-grid>
				<ion-row justify-content-center align-items-center>
					<ion-col size="12">
						<div class="ion-text-center">
							<p>
								<ion-icon
									:icon="school"
									style="font-size: 40px; color: #bbcc00"></ion-icon>
							</p>
							<p style="font-size: 22px">
								<strong>{{ texts.studienverlauf.erklaerung.p1strong }}</strong>
							</p>
							<p>{{ texts.studienverlauf.erklaerung.p1 }}</p>
							<p>
								<strong>{{ texts.studienverlauf.erklaerung.p2strong }}</strong>
							</p>
							<p>{{ texts.studienverlauf.erklaerung.p2 }}</p>
							<p>
								<strong>{{ texts.studienverlauf.erklaerung.p3strong }}</strong>
							</p>
							<p>{{ texts.studienverlauf.erklaerung.p3 }}</p>
							<p>
								<strong>{{ texts.studienverlauf.erklaerung.p4strong }}</strong>
							</p>
							<p>{{ texts.studienverlauf.erklaerung.p4 }}</p>
							<p>
								<strong>{{ texts.studienverlauf.erklaerung.p5strong }}</strong>
							</p>
							<p>{{ texts.studienverlauf.erklaerung.p5 }}</p>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-modal>
</template>

<style scoped></style>
