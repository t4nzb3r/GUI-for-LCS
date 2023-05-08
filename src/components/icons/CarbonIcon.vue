<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		:fill="actualColor"
		:width="size"
		:height="size"
		:class="classes"
	>
		<IcCalibrate v-if="name == 'calibrate'"></IcCalibrate>
		<IcCaretDown v-if="name == 'caret-down'"></IcCaretDown>
		<IcCaretUp v-if="name == 'caret-up'"></IcCaretUp>
		<IcClose v-if="name == 'close'"></IcClose>
		<IcCompare v-if="name == 'compare'"></IcCompare>
		<IcDatabase v-if="name == 'database'"></IcDatabase>
		<IcDirectionMerge v-if="name == 'direction-merge'"></IcDirectionMerge>
		<IcDNA v-if="name == 'dna'"></IcDNA>
		<IcEarth v-if="name == 'earth'"></IcEarth>
		<IcMachineLearning
			v-if="name == 'machine-learning'"
		></IcMachineLearning>
		<IcPartnership v-if="name == 'partnership'"></IcPartnership>
		<IcSprout v-if="name == 'sprout'"></IcSprout>
		<IcShuffle v-if="name == 'shuffle'"></IcShuffle>
		<IcTrashCan v-if="name == 'trash-can'"></IcTrashCan>
	</svg>
</template>

<script>
import IcCalibrate from "@/components/icons/IcCalibrate.vue"
import IcCaretDown from "@/components/icons/IcCaretDown.vue"
import IcCaretUp from "@/components/icons/IcCaretUp.vue"
import IcClose from "@/components/icons/IcClose.vue"
import IcCompare from "@/components/icons/IcCompare.vue"
import IcDatabase from "@/components/icons/IcDatabase.vue"
import IcDirectionMerge from "@/components/icons/IcDirectionMerge.vue"
import IcDNA from "@/components/icons/IcDNA.vue"
import IcEarth from "@/components/icons/IcEarth.vue"
import IcMachineLearning from "@/components/icons/IcMachineLearning.vue"
import IcPartnership from "@/components/icons/IcPartnership.vue"
import IcSprout from "@/components/icons/IcSprout.vue"
import IcShuffle from "@/components/icons/IcShuffle.vue"
import IcTrashCan from "@/components/icons/IcTrashCan.vue"

export default {
	props: {
		name: {
			type: String,
			default: "placeholder",
			validator(el) {
				const names = ["calibrate", "caret-down", "caret-up", "close", "compare", "database", "direction-merge", "dna", "earth", "machine-learning", "partnership", "sprout", "shuffle", "trash-can"]
				return names.includes(el)
			}
		},
		size: {
			type: Number,
			default: 32
		},
		color: {
			type: String,
			default: "black",
			validator(el) {
				const colors = ["black", "black40", "black20", "black10", "blue", "red", "green", "yellow", "white"];
				return colors.includes(el)
			}
		},
		rotate: {
			type: Number,
			default: 0,
			validator(el) {
				const opts = [0, 90, 180, 270]
				return opts.includes(el)
			}
		}
	},
	components: {
		IcCalibrate,
		IcCaretDown,
		IcCaretUp,
		IcClose,
		IcCompare,
		IcDatabase,
		IcDirectionMerge,
		IcDNA,
		IcEarth,
		IcMachineLearning,
		IcPartnership,
		IcSprout,
		IcShuffle,
		IcTrashCan
	},
	computed: {
		actualColor: function () {
			return this.$store.state.color[this.color]
		},
		classes: function () {
			const classes = []
			classes.push(this.rotate == 0 ? "" : "rotate-" + this.rotate)
			return classes
		}
	}
}
</script>