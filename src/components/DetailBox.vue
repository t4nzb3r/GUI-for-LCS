<template>
	<div class="detail-box bg-black10 height-100p width-100p p-4">
		<div class="header flex flex-row flex-align-center">
			<CarbonIcon name="machine-learning" class="mr-2"></CarbonIcon>
			<h4 class="m-0">Detail Box</h4>
		</div>

		<div v-html="content"></div>
	</div>
</template>

<script>
import CarbonIcon from "@/components/icons/CarbonIcon.vue"

export default {
	components: { CarbonIcon },
	props: {
		content: {
			type: String,
			default: "[placeholder]"
		}
	}
}
</script>