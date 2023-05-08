<template>
	<button
		class="
			ic-button
			flex flex-center
			height-8
			width-8
			no-border
			hover-pointer
		"
		:class="classes"
	>
		<CarbonIcon
			:name="name"
			:size="24"
			:rotate="rotate"
			:color="icColor"
		></CarbonIcon>
	</button>
</template>

<script>
import CarbonIcon from "@/components/icons/CarbonIcon.vue"

export default {
	props: {
		name: {
			type: String,
			default: "placeholder"
		},
		rotate: {
			type: Number,
			default: 0,
			validator(el) {
				const opts = [0, 90, 180, 270]
				return opts.includes(el)
			}
		},
		isToggle: {
			type: Boolean,
			default: false
		},
		setInitiallyOn: {
			type: Boolean,
			default: false
		},
		isMinimal: {
			type: Boolean,
			default: false
		}
	},
	components: {
		CarbonIcon
	},
	computed: {
		classes: function () {
			const classes = []
			classes.push(this.isMinimal ? "bg-none" : this.isToggle ? this.setInitiallyOn ? "bg-blue" : "bg-blue20" : "bg-blue")
			return classes
		},
		icColor() {
			return this.isMinimal ? "black" : "white"
		}
	}
}
</script>