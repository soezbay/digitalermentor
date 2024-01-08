<template>
	<!-- Legende -->
	<div id="legend">
		<ion-badge id="legendBadge" color="warning">&nbsp;</ion-badge>
		<span>{{ texts.studium.klausurStatus.zweiterVersuch }}</span>
		<ion-badge id="legendBadge" color="danger">&nbsp;</ion-badge>
		<span>{{ texts.studium.klausurStatus.dritterVersuch }}</span>
		<ion-badge id="legendBadge" style="background-color: grey"
			>&nbsp;</ion-badge
		>
		<span>{{ texts.studium.klausurStatus.durchgefallen }}</span>
	</div>
</template>

<script>
import { texts } from '../../texts.js'
export default {
	data() {
		return {
			texts,
		}
	},
}
</script>

<style>
#legend {
	text-align: center;
	font-size: large;
	margin-top: 25px;
}

#legendBadge {
	margin-right: 5px;
	margin-left: 5px;
}
</style>
