<template>
	<div class="caret-button flex flex-column width-8">
		<button
			class="
				height-4
				m-0
				p-0
				no-border
				bg-none
				hover-pointer hover_bg-black10-50
				active-bg-black10
			"
			@click="clickUp"
			:class="btnClasses"
			:disabled="isDisabled"
		>
			<CarbonIcon
				name="caret-up"
				:size="16"
				:color="icColorTop"
			></CarbonIcon>
		</button>

		<button
			class="
				height-4
				m-0
				p-0
				no-border
				bg-none
				hover-pointer hover_bg-black10-50
				active-bg-black10
			"
			@click="clickDown"
			:disabled="!!isDisabled"
			:class="btnClasses"
		>
			<CarbonIcon
				name="caret-down"
				:size="16"
				:color="icColorBottom"
			></CarbonIcon>
		</button>
	</div>
</template>

<script>
import CarbonIcon from "@/components/icons/CarbonIcon.vue"

export default {
	components: { CarbonIcon },
	props: {
		isDisabled: {
			type: Boolean,
			default: false
		},
		isTopDisabled: {
			type: Boolean,
			default: false
		},
		isBottomDisabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		btnClasses: function () {
			const classes = []
			// classes.push(this.isDisabled ? "disabled" : "")
			return classes
		},
		icColorTop: function () {
			return this.isDisabled || this.isTopDisabled ? "black20" : "black"
		},
		icColorBottom: function () {
			return this.isDisabled || this.isBottomDisabled ? "black20" : "black"
		}
	},
	methods: {
		clickUp: function () {
			this.$emit("clickUp")
		},
		clickDown: function () {
			this.$emit("clickDown")
		}
	}
}
</script>