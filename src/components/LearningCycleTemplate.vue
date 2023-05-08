<template>
	<div
		class="learning-cycle-area height-fit width-fit flex mb-8 no-select"
		:class="classes"
	>
		<div
			class="header flex flex-center width-fit mr-4 hover-help relative"
			:class="headerContainerClasses"
			@click="toggleHelpText"
		>
			<slot name="icon"></slot>
			<h2 class="mt-2" :class="headerClasses">
				{{ title }}
			</h2>

			<div
				v-if="showHelpText"
				class="
					help-tex
					absolute
					bg-black20
					p-5
					z-index-9
					hover-default
					flex flex-row
					relative
					width-100
				"
				:class="helpTextClasses"
				@click="noPropagation"
			>
				<div v-html="explanatoryText"></div>
				<IcButton
					class="absolute absolute-t-0 absolute-r-0 z-index-10"
					name="close"
					:isMinimal="true"
					@click="toggleHelpText"
				></IcButton>
			</div>
		</div>

		<slot name="content"></slot>
	</div>
</template>

<script>
import IcButton from "@/components/IcButton.vue"

export default {
	components: { IcButton },
	props: {
		title: {
			type: String,
			default: "[placeholder]"
		},
		horizontalHeader: {
			type: Boolean,
			default: false
		},
		explanatoryText: {
			type: String,
			default: "[Placeholder Text]"
		}
	},
	data: function () {
		return {
			showHelpText: false
		}
	},
	computed: {
		classes: function () {
			const classes = []
			classes.push(this.horizontalHeader ? "flex-column" : "flex-row")
			return classes
		},
		headerContainerClasses: function () {
			const classes = []
			classes.push(this.horizontalHeader ? "" : "flex-column")
			return classes
		},
		headerClasses: function () {
			const classes = []
			classes.push(this.horizontalHeader ? "" : "text-vertical rotate-180")
			return classes
		},
		helpTextClasses() {
			const classes = []
			classes.push(this.horizontalHeader ? "absolute-l-0 absolute-t-11" : "absolute-l-12 absolute-t-0")
			return classes
		}
	},
	methods: {
		toggleHelpText() {
			this.showHelpText = !this.showHelpText
		},
		noPropagation(e) {
			e.stopPropagation();
		}
	}
}
</script>