<script setup>
import { ref } from 'vue'
import { texts } from '../../texts.js'
import { add, checkmarkDone, trash, create } from 'ionicons/icons'

const data = ref({
	texts,
	add,
    checkmarkDone,
    trash,
    create,
})
</script>

<template>
	<!--Studienziele-->
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
							<p style="font-size: 22px">
								<strong>{{ texts.ziele.erklaerung.p1strong }}</strong>
							</p>
							<p>
								<ion-button color="primary" shape="round">
									<ion-icon
										:icon="add"
										style="font-size: 20px; color: white"></ion-icon>
								</ion-button>
							</p>
							<p>
								<strong>{{ texts.ziele.erklaerung.p2strong }}</strong>
							</p>
							<p>{{ texts.ziele.erklaerung.p2 }}</p>
							<p>
								<ion-icon
									:icon="trash"
									style="font-size: 35px; color: #f07181"></ion-icon>
							</p>
							<p>
								<strong>{{ texts.ziele.erklaerung.p3strong }}</strong>
							</p>
							<p>{{ texts.ziele.erklaerung.p3 }}</p>
							<p>
								<ion-icon
									:icon="checkmarkDone"
									style="font-size: 35px; color: #bbcc00"></ion-icon>
							</p>
							<p>
								<strong>{{ texts.ziele.erklaerung.p4strong }}</strong>
							</p>
							<p>{{ texts.ziele.erklaerung.p4 }}</p>
							<p>
								<ion-icon
									:icon="create"
									style="font-size: 35px; color: grey"></ion-icon>
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
</template>

<style scoped></style>
