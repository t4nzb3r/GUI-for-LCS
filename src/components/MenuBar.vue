<template>
	<div
		class="
			menu-bar
			height-8
			width-100p
			height-12
			bg-black10
			pt-2
			pr-2
			pb-2
			pl-6
			flex flex-align-center
			fixed
			z-index-9
		"
	>
		<button @click="runNextStep">Next</button>
		<button @click="runCycle">Run Cycle</button>
		<button @click="run10Cycles">Run 10 Cycles</button>
		<button @click="run100Cycles">Run 100 Cycles</button>
		<!-- <button @click="doSubsumption" class="ml-4">Subsume</button> -->
	</div>
</template>

<script>
export default {
	methods: {
		runNextStep() {
			this.$emit("runNextStep")
		},
		runCycle() {
			this.$emit("runCycle")
		},
		run10Cycles() {
			this.$emit("run10Cycles")
		},
		run100Cycles() {
			this.$emit("run100Cycles")
		},
		doSubsumption() {
			this.$emit("doSubsumption")
		}
	}
}
</script>