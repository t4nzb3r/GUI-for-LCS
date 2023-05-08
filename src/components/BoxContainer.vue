<template>
	<div
		class="
			box-container
			bg-black10
			p-2
			width-fit
			height-fit
			flex flex-column flex-wrap
			overflow-scroll
		"
		:style="style"
	>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		minHeight: {
			type: Number,
			default: 32
		},
		height: {
			type: Number,
			default: null
		},
		width: {
			type: Number,
			default: null
		}
	},
	computed: {
		style: function () {
			const style = []
			style.push("min-height: " + this.minHeight + "px")
			style.push(this.height ? "height: " + this.height + "px" : "")
			style.push(this.width ? "width: " + this.width + "px" : "")
			return style
		}
	}
}
</script>