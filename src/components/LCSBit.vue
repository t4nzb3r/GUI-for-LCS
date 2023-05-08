<template>
	<div
		class="
			lcs-bit
			flex flex-center
			height-10
			width-10
			font-size-20
			no-select
		"
		:class="classes"
		@click="click"
	>
		<div v-if="!isPlaceholder" class="value">
			{{ shownValue }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'LCSBit',
	props: {
		value: {
			type: String,
			default: "#",
			validator(el) {
				return el == "0" || el == "1" || el == "#"
			}
		},
		isPlaceholder: {
			type: Boolean,
			default: false
		},
		isClassifier: {
			type: Boolean,
			default: false
		},
		isBlured: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		classes() {
			let classes = []
			classes.push(this.isBlured ? "bg-black10" : this.value == "0" ? "bg-red" : this.value == "1" ? "bg-green" : "bg-yellow")
			classes.push(this.isBlured ? "font-black" : "font-white")
			classes.push(this.isPlaceholder ? "placeholder" : "")
			classes.push(this.isClassifier ? "hover-pointer" : "")
			return classes
		},
		shownValue() {
			return this.isBlured ? "?" : this.value
		}
	},
	methods: {
		click() {
			if (this.isClassifier) {
				this.$emit("click")
			}
		}
	}
}
</script>