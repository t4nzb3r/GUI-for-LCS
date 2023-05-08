<template>
	<div
		class="rule flex flex-column width-fit"
		:class="classes"
		:style="style"
	>
		<div
			v-if="!isPlaceholder"
			class="flex flex-row bg-black shadow width-fit"
		>
			<div class="condition flex flex-row">
				<LCSBit
					v-for="i in condition.length"
					:key="i - 1"
					:value="condition[i - 1]"
					@click="conditionClick(i - 1)"
					:isClassifier="isClassifier"
				></LCSBit>
			</div>

			<div class="action pl-2">
				<LCSBit
					:value="action"
					@click="actionClick"
					:isClassifier="isClassifier"
					:isBlured="blurAction"
				></LCSBit>
			</div>
		</div>

		<div
			v-if="showParameter && !isPlaceholder"
			class="parameter p-3 bg-black10 shadow"
		>
			<div
				v-if="!showCorrectPrediction && !showIncorrectPrediction"
				class="grid-cc-cc"
			>
				<div class="mr-2">Correct predictions:</div>
				<div>{{ parameterValues["correct-predictions"] }}</div>

				<div class="mr-2">Total predictions:</div>
				<div>{{ parameterValues["total-predictions"] }}</div>
			</div>

			<div
				v-if="showCorrectPrediction || showIncorrectPrediction"
				class="grid-ccc-ccc"
			>
				<div class="mr-2">Correct predictions:</div>
				<div class="mr-2">
					{{ parameterValues["correct-predictions"] }}
				</div>
				<div class="font-blue font-bold">
					{{ showCorrectPrediction ? "+1" : "" }}
				</div>

				<div class="mr-2">Total predictions:</div>
				<div class="mr-2">
					{{ parameterValues["total-predictions"] }}
				</div>
				<div class="font-blue font-bold">+1</div>
			</div>
		</div>
	</div>
</template>

<script>
import LCSBit from '@/components/LCSBit.vue'

export default {
	name: 'LCSRule',
	components: { LCSBit },
	props: {
		condition: {
			type: Array,
			default() {
				return ["0", "1", "0"]
			}
		},
		action: {
			type: String,
			default: "0"
		},
		parameterValues: {
			type: Object,
			default() {
				return {
					"correct-predictions": 0,
					"total-predictions": 0
				}
			}
		},
		showParameter: {
			type: Boolean,
			default: false
		},
		showCorrectPrediction: {
			type: Boolean,
			default: false
		},
		showIncorrectPrediction: {
			type: Boolean,
			default: false
		},
		isPlaceholder: {
			type: Boolean,
			default: false
		},
		conditionSize: {
			type: Number,
			default: 3
		},
		removeMargin: {
			type: Boolean,
			default: false
		},
		isClassifier: {
			type: Boolean,
			default: false
		},
		blurAction: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		classes: function () {
			let classes = []
			classes.push(this.isPlaceholder ? "placeholder" : "")
			classes.push(this.showParameter ? "height-contain" : "height-10")
			classes.push(this.removeMargin ? "m-0" : "m-2")
			return classes
		},
		style: function () {
			let style = []
			style.push(this.isPlaceholder ? "width: " + ((this.conditionSize * 40) + 44) + "px" : "")
			style.push(this.isPlaceholder && this.showParameter ? "height: 105px" : "")
			return style
		}
	},
	methods: {
		conditionClick(k) {
			let newC = [...this.condition]
			newC[k] = this.nextValue(newC[k])
			this.$emit("click",
				{
					"old": { "condition": [...this.condition], "action": this.action },
					"new": { "condition": [...newC], "action": this.action }
				})
		},
		actionClick() {
			this.$emit("click",
				{
					"old": { "condition": [...this.condition], "action": this.action },
					"new": { "condition": [...this.condition], "action": this.nextValueAction(this.action) }
				})
		},
		nextValue(cv) {
			if (this.isClassifier)
				return cv == "#" ? "1" : cv == "1" ? "0" : "#"
			else
				return cv == "0" ? "1" : "0"
		},
		nextValueAction(cv) {
			return cv == "0" ? "1" : "0"
		}
	}
}
</script>
