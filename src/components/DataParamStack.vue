<template>
	<div
		class="data-stack mt-0 ml-14 mb-2 mr-2 width-fit flex flex-row"
		:class="'size-' + amountShownEntries"
	>
		<div class="buttons flex flex-row">
			<CountIndicator
				:numerator="dataEntries.length > 0 ? shiftCount + 1 : 0"
				:denominator="dataEntries.length"
				class="absolute absolute-l-m10 absolute-t-m1"
			></CountIndicator>
			<CaretButton
				@clickUp="clickUp"
				@clickDown="clickDown"
				class="absolute absolute-l-m8"
				:isDisabled="dataEntries.length == 0"
				:isTopDisabled="shiftCount + 1 >= dataEntries.length"
				:isBottomDisabled="shiftCount == 0"
			></CaretButton>
		</div>

		<div class="stack">
			<LCSRule
				v-if="amountShownEntries == 0"
				:isPlaceholder="true"
				:conditionSize="6"
				:removeMargin="true"
				:showParameter="true"
			></LCSRule>
			<LCSRule
				v-for="k in [...Array(amountShownEntries).keys()]"
				:key="k.key"
				:removeMargin="true"
				:conditionSize="6"
				:condition="getCondition(k)"
				:action="getAction(k)"
				:parameterValues="getParams(k)"
				:class="'stack-' + k"
				:showParameter="true"
				:showCorrectPrediction="showCorrectPrediction"
				:showIncorrectPrediction="showIncorrectPrediction"
			></LCSRule>
		</div>
	</div>
</template>

<script>
import LCSRule from "@/components/LCSRule.vue"
import CaretButton from './CaretButton.vue'
import CountIndicator from './CountIndicator.vue'

export default {
	components: { LCSRule, CaretButton, CountIndicator },
	props: {
		dataEntries: {
			type: Array,
			default() {
				return []
			}
		},
		showCorrectPrediction: {
			type: Boolean,
			default: false
		},
		showIncorrectPrediction: {
			type: Boolean,
			default: false
		}
	},
	data: function () {
		return {
			maxSize: 3,
			shiftCount: 0
		}
	},
	computed: {
		amountShownEntries: function () {
			return Math.min(this.maxSize, this.rearrangedEntries.length)
		},
		rearrangedEntries: function () {
			let newEntries = [...this.dataEntries]
			for (let i = 0; i < this.shiftCount; i++) {
				let el = newEntries.shift()
				newEntries.push(el)
			}
			return newEntries
		}
	},
	methods: {
		showRule: function (index) {
			return this.rearrangedEntries.length > index
		},
		getCondition: function (index) {
			if (this.rearrangedEntries.length > index)
				return this.rearrangedEntries[index]["condition"]
			else
				return []
		},
		getAction: function (index) {
			if (this.rearrangedEntries.length > index)
				return this.rearrangedEntries[index]["action"]
			else
				return ""
		},
		getParams: function (index) {
			if (this.rearrangedEntries.length > index)
				return this.rearrangedEntries[index]["params"]
			else
				return {
					"correct-predictions": 0,
					"total-predictions": 0
				}
		},
		clickUp: function () {
			this.shiftCount++
			this.shiftCount = Math.min(this.shiftCount, this.rearrangedEntries.length - 1)
		},
		clickDown: function () {
			this.shiftCount--
			this.shiftCount = Math.max(this.shiftCount, 0)
		}
	}
}
</script>

<style lang="scss" scoped>
.data-stack {
	position: relative;

	&.size-2 {
		margin-left: calc(12px + 40px);
		margin-top: 4px;
	}
	&.size-3 {
		margin-left: calc(16px + 40px);
		margin-top: 8px;
	}

	.stack-1 {
		position: absolute;
		top: -4px;
		left: -4px;
		z-index: -1;
	}
	.stack-2 {
		position: absolute;
		top: -8px;
		left: -8px;
		z-index: -2;
	}
}
</style>