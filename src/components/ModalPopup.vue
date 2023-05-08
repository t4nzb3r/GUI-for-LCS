<template>
	<div
		class="
			popup
			absolute
			top-0
			right-0
			bottom-0
			left-0
			bg-black-a70
			z-index-9
			flex flex-center
		"
	>
		<div
			class="
				container
				bg-black20
				p-6
				max-width-80p max-height-90p
				overflow-scroll
				relative
			"
		>
			<h3 class="text-align-center">
				<b>{{ title }}</b>
			</h3>
			<div class="text" v-html="text"></div>

			<IcButton
				class="absolute absolute-t-0 absolute-r-0 z-index-10"
				name="close"
				:isMinimal="true"
				@click="closePopup"
			></IcButton>
		</div>
	</div>
</template>

<script>
import IcButton from "@/components/IcButton.vue"

export default {
	components: { IcButton },
	props: {
		title: {
			type: String,
			default: "Dummy Title"
		},
		text: {
			type: String,
			default: "Placeholder"
		}
	},
	methods: {
		closePopup() {
			this.$emit("close")
		}
	}
}
</script>