<template>
	<div class="count-indicator">
		<div class="numerator text-align-center">{{ numerator }}</div>
		<hr />
		<div class="denominator text-align-center">{{ denominator }}</div>
	</div>
</template>

<script>
export default {
	props: {
		numerator: {
			type: Number,
			default: 0
		},
		denominator: {
			type: Number,
			default: 0
		}
	}
}
</script>
