<template>
	<div class="home">
		<div class="flex flex-column">
			<MenuBar
				@runNextStep="runNextStep"
				@runCycle="runCycle"
				@run10Cycles="run10Cycles"
				@run100Cycles="run100Cycles"
			></MenuBar>

			<div class="grid grid-ccc mt-10 width-100p height-100p">
				<div class="column-a pt-4 pr-0 pb-4 pl-4">
					<LearningCycleTemplate
						title="Data"
						:explanatoryText="text['c08components']['dataEntries']"
					>
						<template #icon>
							<CarbonIcon
								name="earth"
								:size="40"
								color="blue"
							></CarbonIcon>
						</template>

						<template #content>
							<div class="flex flex-row flex-center">
								<LCSRule
									:condition="
										currentEntry
											? currentEntry['condition']
											: []
									"
									:action="
										currentEntry
											? currentEntry['action']
											: ''
									"
									:isPlaceholder="!currentEntry"
									:conditionSize="6"
									:blurAction="true"
								></LCSRule>
							</div>
						</template>
					</LearningCycleTemplate>

					<LearningCycleTemplate
						title="Matching"
						:explanatoryText="text['c08components']['matching']"
					>
						<template #icon>
							<CarbonIcon
								name="compare"
								:size="40"
								color="blue"
							></CarbonIcon>
						</template>

						<template #content>
							<BoxContainer :height="4 * 44" :width="700"
								><LCSRule
									v-for="el in matchSet"
									:key="el.key"
									:condition="el['condition']"
									:action="el['action']"
								></LCSRule
							></BoxContainer>
						</template>
					</LearningCycleTemplate>

					<LearningCycleTemplate
						title="Param. Update"
						:explanatoryText="
							text['c08components']['parameterUpdate']
						"
					>
						<template #icon>
							<CarbonIcon
								name="calibrate"
								:size="40"
								color="blue"
							></CarbonIcon>
						</template>

						<template #content>
							<div class="grid-cc">
								<div class="column-a">
									<div
										class="
											header
											flex flex-row flex-center
											mb-4
										"
									>
										<h3 class="mr-4">[C] — Action:</h3>
										<LCSBit
											:isPlaceholder="
												matchingActionCorrect == null
											"
											:value="matchingActionCorrect"
										></LCSBit>
									</div>

									<DataParamStack
										:dataEntries="[...correctMatchSet]"
										:showCorrectPrediction="true"
									></DataParamStack>
								</div>

								<div class="column-b">
									<div
										class="
											header
											flex flex-row flex-center
											mb-4
										"
									>
										<h3 class="mr-4">[I] — Action:</h3>
										<LCSBit
											:isPlaceholder="
												matchingActionIncorrect == null
											"
											:value="matchingActionIncorrect"
										></LCSBit>
									</div>

									<DataParamStack
										:dataEntries="[...incorrectMatchSet]"
										:showIncorrectPrediction="true"
									></DataParamStack>
								</div>
							</div>
						</template>
					</LearningCycleTemplate>

					<LearningCycleTemplate
						title="GA"
						:explanatoryText="
							text['c08components']['geneticAlgorithm']
						"
					>
						<template #icon>
							<CarbonIcon
								name="dna"
								:size="40"
								color="blue"
							></CarbonIcon>
						</template>

						<template #content>
							<BoxContainer class="grid-cc-cc-cc-cc-cc">
								<div
									class="
										title
										flex flex-row flex-align-center
										mr-6
									"
								>
									<CarbonIcon
										name="partnership"
										:size="24"
										color="black"
										class="mr-1"
									></CarbonIcon>
									<h3>Parents</h3>
								</div>

								<div class="parents flex flex-row">
									<LCSRule
										v-if="!ga['parents'][0]"
										:isPlaceholder="true"
										:conditionSize="6"
									></LCSRule>
									<LCSRule
										v-if="ga['parents'][0]"
										:condition="
											ga['parents'][0]['condition']
										"
										:action="ga['parents'][0]['phenotype']"
									></LCSRule>

									<LCSRule
										v-if="!ga['parents'][1]"
										:isPlaceholder="true"
										:conditionSize="6"
									></LCSRule>
									<LCSRule
										v-if="ga['parents'][1]"
										:condition="
											ga['parents'][1]['condition']
										"
										:action="ga['parents'][1]['phenotype']"
									></LCSRule>
								</div>

								<div
									class="
										title
										flex flex-row flex-align-center
									"
								>
									<CarbonIcon
										name="sprout"
										:size="24"
										color="black"
										class="mr-1"
									></CarbonIcon>
									<h3>Children</h3>
								</div>

								<div class="empty"></div>

								<div
									class="
										title
										flex flex-row flex-align-center
									"
								>
									<h3 class="ml-8">Crossover</h3>
								</div>

								<div class="parameter flex flex-row">
									<LCSRule
										v-if="!ga['offspring-parameter'][0]"
										:isPlaceholder="true"
										:conditionSize="6"
									></LCSRule>
									<LCSRule
										v-if="ga['offspring-parameter'][0]"
										:condition="
											ga['offspring-parameter'][0][
												'condition'
											]
										"
										:action="
											ga['offspring-parameter'][0][
												'phenotype'
											]
										"
									></LCSRule>

									<LCSRule
										v-if="!ga['offspring-parameter'][1]"
										:isPlaceholder="true"
										:conditionSize="6"
									></LCSRule>
									<LCSRule
										v-if="ga['offspring-parameter'][1]"
										:condition="
											ga['offspring-parameter'][1][
												'condition'
											]
										"
										:action="
											ga['offspring-parameter'][1][
												'phenotype'
											]
										"
									></LCSRule>
								</div>

								<div
									class="
										title
										flex flex-row flex-align-center
									"
								>
									<h3 class="ml-8">Mutation</h3>
								</div>

								<div class="mutation flex flex-row">
									<LCSRule
										v-if="!ga['offspring-mutation'][0]"
										:isPlaceholder="true"
										:conditionSize="6"
									></LCSRule>
									<LCSRule
										v-if="ga['offspring-mutation'][0]"
										:condition="
											ga['offspring-mutation'][0][
												'condition'
											]
										"
										:action="
											ga['offspring-mutation'][0][
												'phenotype'
											]
										"
									></LCSRule>

									<LCSRule
										v-if="!ga['offspring-mutation'][1]"
										:isPlaceholder="true"
										:conditionSize="6"
									></LCSRule>
									<LCSRule
										v-if="ga['offspring-mutation'][1]"
										:condition="
											ga['offspring-mutation'][1][
												'condition'
											]
										"
										:action="
											ga['offspring-mutation'][1][
												'phenotype'
											]
										"
									></LCSRule>
								</div>
							</BoxContainer>
						</template>
					</LearningCycleTemplate>
				</div>

				<div class="column-b pt-4 pr-4 pb-4 pl-0">
					<LearningCycleTemplate
						title="Rule Population"
						:horizontalHeader="true"
						:explanatoryText="text['c08components']['population']"
					>
						<template #icon>
							<CarbonIcon
								name="database"
								:size="40"
								color="blue"
							></CarbonIcon>
						</template>

						<template #content>
							<BoxContainer :height="4 * 155" :width="4 * 140">
								<table class="text-align-center">
									<tr>
										<th class="text-align-left">Rule</th>
										<th>Total <br />Matches</th>
										<th>Fitness</th>
										<th>Numerosity</th>
									</tr>

									<tr
										v-for="r in rulePopulation"
										:key="r.key"
									>
										<td>
											<LCSRule
												:condition="r['condition']"
												:action="r['action']"
												:isClassifier="true"
												@click="
													(el) =>
														importRulePopulationToPython(
															el,
															r['id']
														)
												"
											></LCSRule>
										</td>
										<td>
											{{
												r["params"]["total-predictions"]
											}}
										</td>
										<td>
											{{ r["params"]["accuracy"] }}
										</td>
										<td>{{ r["params"]["numerosity"] }}</td>
									</tr>
								</table>
							</BoxContainer>
						</template>
					</LearningCycleTemplate>

					<LearningCycleTemplate
						title="Deletion"
						:explanatoryText="text['c08components']['deletion']"
					>
						<template #icon>
							<CarbonIcon
								name="trash-can"
								:size="40"
								color="blue"
							></CarbonIcon>
						</template>

						<template #content>
							<BoxContainer
								class="flex flex-column"
								:width="126 * 4"
							>
								<p>
									If micro population size
									<b>> {{ maxPopSize }}</b> then excess is
									probabilistically removed based on
									prediction fitness..
								</p>

								<br />

								<p>
									Current micro population size:
									{{ getMicroPopSize() }}
								</p>

								<div class="flex flex-row">
									<p><b>Deleted rule(s): </b></p>

									<div class="flex flex-column">
										<LCSRule
											v-if="
												!deletedRules ||
												deletedRules.length == 0
											"
											:isPlaceholder="true"
											:conditionSize="6"
										></LCSRule>

										<LCSRule
											v-for="cl in deletedRules"
											:key="cl.key"
											:condition="cl['condition']"
											:action="cl['action']"
										></LCSRule>
									</div>
								</div>
							</BoxContainer>
						</template>
					</LearningCycleTemplate>
				</div>

				<div class="column-c">
					<DetailBox :content="detailBoxText"></DetailBox>
				</div>
			</div>

			<div
				v-if="stillLoading"
				class="
					loading-indicator
					absolute
					height-100p
					width-100p
					bg-black-a90
					z-index-9
					flex flex-center flex-column
				"
			>
				<LoadingIndicator></LoadingIndicator>
				<p class="font-white">Loading . . .</p>
			</div>

			<ModalPopup
				v-if="showIntroText"
				title="Introduction"
				:text="
					text['c01misc']['t01appExplanation'] +
					text['c01misc']['t02lcsIntro'] +
					text['c01misc']['t03multiplexerProblem']
				"
				@close="closeIntroPopup"
			></ModalPopup>

			<ModalPopup
				v-if="showFirstCycleEndText"
				title="What now?"
				:text="text['c07startOver']['t01furtherLearning']"
				@close="closeFirstCycleEndPopup"
			></ModalPopup>
		</div>
	</div>
</template>

<script>
import MenuBar from "@/components/MenuBar.vue"
import LCSBit from '@/components/LCSBit.vue'
import LCSRule from '@/components/LCSRule.vue'
import DataParamStack from '@/components/DataParamStack.vue'
import LearningCycleTemplate from '@/components/LearningCycleTemplate.vue'
import BoxContainer from '@/components/BoxContainer.vue'
import DetailBox from '@/components/DetailBox.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ModalPopup from '@/components/ModalPopup.vue'

import CarbonIcon from "@/components/icons/CarbonIcon.vue"
import { mapActions, mapState } from 'vuex'

export default {
	name: 'HomeView',
	components: {
		MenuBar,
		LCSBit,
		LCSRule,
		DataParamStack,
		LearningCycleTemplate,
		BoxContainer,
		DetailBox,
		LoadingIndicator,
		ModalPopup,

		CarbonIcon
	},
	data: function () {
		return {
			detailBoxText: "",
			stillLoading: false,
			entries: [],
			currentEntry: null,
			entriesParam: [],
			rulePopulation: [],
			matchSet: [],
			correctMatchSet: [],
			incorrectMatchSet: [],
			matchingActionCorrect: null,
			matchingActionIncorrect: null,
			maxPopSize: 100,
			ga: {
				"step": null,
				"parents": [],
				"offsprings-init": [],
				"offspring-parameter": [],
				"offspring-mutation": []
			},
			deletedRules: [],
			showIntroText: true,
			showFirstCycleEndText: false,
			isFirstCycle: true
		};
	},
	computed: {
		...mapState({
			lcs: state => state.python.lcs,
			text: state => state.text
		})
	},
	methods: {
		sleep(milliseconds) {
			return new Promise(resolve => setTimeout(resolve, milliseconds));
		},

		init() {
			this.setRulePopulation()
			this.setCurrentEntry()
			this.setRuleMatchSet()
			this.setParamSets()
			this.setGA()

			if (this.currentStep() == "next-cycle") {
				this.detailBoxText = this.text["c02data"]["t01explanation"]
			} else if (this.currentStep() == "match-set") {
				this.detailBoxText = this.text["c03matching"]["t01explanation"]
			} else if (this.currentStep() == "update-params") {
				this.detailBoxText = this.text["c04parameterUpdate"]["t01explanation"]
				// } else if (this.currentStep() == "ga" || this.ga["step"]) { // done via "this.setGA()"
			} else if (this.currentStep() == "deletion") {
				this.detailBoxText = this.text["c06deletion"]["t01explanation"]
			}
		},
		classifierSet() {
			if (this.lcs)
				return JSON.parse(this.lcs.getLastPopulation())["classifier-set"]
		},
		getMicroPopSize() {
			if (this.lcs)
				return this.classifierSet()["microPopSize"]
			return 0
		},
		params() {
			return JSON.parse(this.lcs.getLastLearningParams())
		},
		currentStep() {
			if (this.lcs)
				return JSON.parse(this.lcs.getLastPopulation())["current-step"].substring(4)
			return ""
		},
		nextStep() {
			return JSON.parse(this.lcs.getLastPopulation())["next-step"].substring(4)
		},
		setRulePopulation() {
			if (this.lcs) {
				let set = this.classifierSet()["popSet"]
				let setO = []
				for (let i in set) {
					let el = set[i]
					setO.push({
						"id": el["id"],
						"condition": this.convertCondition(el),
						"action": el["phenotype"],
						"params": {
							"correct-predictions": el["correctCount"],
							"total-predictions": el["matchCount"],
							"accuracy": Math.round(el["accuracy"] * 100) / 100,
							"numerosity": el["numerosity"]
						}
					})
				}
				this.rulePopulation = setO
			}
		},
		setRuleMatchSet() {
			this.matchSet = []
			for (let i in this.classifierSet()["matchSet"]) {
				let el = this.classifierSet()["matchSet"][i]
				this.matchSet.push(this.rulePopulation[el])
			}
		},
		setCurrentEntry() {
			this.currentEntry =
			{
				"condition": this.params()["state_phenotype"][0],
				"action": this.params()["state_phenotype"][1]
			}
		},
		setPhenotype() {
			if (this.lcs) {
				if (this.params()["state_phenotype"][1]) {
					this.matchingActionCorrect = this.params()["state_phenotype"][1]
					this.matchingActionIncorrect = this.params()["state_phenotype"][1] == "1" ? "0" : "1"
				} else {
					this.matchingActionCorrect = null
					this.matchingActionIncorrect = null
				}
			}
		},
		setParamSets() {
			this.correctMatchSet = []
			this.incorrectMatchSet = []
			for (let i in this.classifierSet()["matchSet"]) {
				let el = this.classifierSet()["matchSet"][i]
				if (this.classifierSet()["correctSet"].includes(el)) {
					this.correctMatchSet.push(this.rulePopulation[el])
				} else {
					this.incorrectMatchSet.push(this.rulePopulation[el])
				}
			}
		},
		setGA() {
			if (this.lcs) {
				let ga = JSON.parse(this.lcs.getLastPopulation())["classifier-set"]["ga"]
				if (ga["ga-run"]) {
					if (!this.ga["step"]) {
						this.detailBoxText = this.text["c05geneticAlgorithm"]["t01parentSelection"]

						this.ga["step"] = "crossover"
						this.ga["parents"] = [
							{
								"condition": this.convertCondition(ga["parents"][0]),
								"phenotype": ga["parents"][0]["phenotype"]
							},
							{
								"condition": this.convertCondition(ga["parents"][1]),
								"phenotype": ga["parents"][1]["phenotype"]
							}
						]
					} else if (this.ga["step"] == "crossover") {
						this.detailBoxText = this.text["c05geneticAlgorithm"]["t02crossover"]

						this.ga["step"] = "mutation"
						this.ga["offspring-parameter"] = [
							ga["offspring-parameter"][0] ?
								{
									"condition": this.convertCondition(ga["offspring-parameter"][0]),
									"phenotype": ga["offspring-parameter"][0]["phenotype"]
								} : null,
							ga["offspring-parameter"][1] ?
								{
									"condition": this.convertCondition(ga["offspring-parameter"][1]),
									"phenotype": ga["offspring-parameter"][1]["phenotype"]
								} : null
						]
					} else if (this.ga["step"] == "mutation") {
						this.detailBoxText = this.text["c05geneticAlgorithm"]["t03mutation"]

						this.ga["step"] = null
						this.ga["offspring-mutation"] = [
							ga["offspring-mutation"][0] ?
								{
									"condition": this.convertCondition(ga["offspring-mutation"][0]),
									"phenotype": ga["offspring-mutation"][0]["phenotype"]
								} : null,
							ga["offspring-mutation"][1] ?
								{
									"condition": this.convertCondition(ga["offspring-mutation"][1]),
									"phenotype": ga["offspring-mutation"][1]["phenotype"]
								} : null
						]
						this.setRulePopulation()
					} else {
						this.ga["step"] = null
					}

					console.log("ga: " + this.ga["step"]);
				}
			}
		},
		setDeletionValues() {
			if (this.lcs) {
				this.deletedRules = []

				let delCls = JSON.parse(this.lcs.getDeletionValues())
				for (let i in delCls) {
					let cl = delCls[i]["deleted-classifier"]
					this.deletedRules.push({
						"condition": this.convertCondition(cl),
						"action": cl["phenotype"]
					})
				}
				if (delCls.length > 0) {
					console.log(this.deletedRules[0]);
				}
			}
		},
		run100Cycles() {
			for (let i = 0; i < 100; i++) {
				this.runCycle(false)
			}
			this.resetPresentationValues()
		},
		run10Cycles() {
			for (let i = 0; i < 10; i++) {
				this.runCycle(false)
			}
			this.resetPresentationValues()
		},
		runCycle(isExactlyOneCycle = true) {
			if (this.lcs) {
				this.lcs.runOneCycle()

				this.setRulePopulation()
				this.setCurrentEntry()
				this.setRuleMatchSet()
				this.setParamSets()

				if (isExactlyOneCycle) {
					this.resetPresentationValues()
				}
			}
		},
		importRulePopulationToPython(params, id) {
			if (this.lcs && params["new"]) {
				let popSet2 = [...this.classifierSet()["popSet"]]
				popSet2 = popSet2.map(el => {
					let el2 = JSON.parse(JSON.stringify(el))
					if (el["id"] == id) {
						el2["special-condition"] = params["new"]["condition"]
						el2["phenotype"] = params["new"]["action"]
					} else {
						el2["special-condition"] = this.convertCondition(el2)
					}
					return el2
				})
				this.lcs.importRulePopulation(JSON.stringify(popSet2))
				this.setRulePopulation()
			}
		},
		resetPresentationValues() {
			this.matchingActionCorrect = null
			this.matchingActionIncorrect = null
			this.matchSet = null
			this.correctMatchSet = []
			this.incorrectMatchSet = []
			this.ga = {
				"step": null,
				"parents": [],
				"offsprings-init": [],
				"offspring-parameter": [],
				"offspring-mutation": []
			}
			this.deletedRules = []
		},
		runNextStep() {
			if (this.lcs) {
				if (this.nextStep() == "next-cycle") {
					if (this.isFirstCycle) {
						this.showFirstCycleEndText = true
						this.isFirstCycle = false
					}

					console.log("next-cycle");
					this.detailBoxText = this.text["c02data"]["t01explanation"]
					this.lcsRunNextStep()

					this.setRulePopulation()
					this.setCurrentEntry()
					this.setRuleMatchSet()

					this.resetPresentationValues()
				} else if (this.nextStep() == "match-set") {
					console.log("match-set");
					this.detailBoxText = this.text["c03matching"]["t01explanation"]
					this.lcsRunNextStep()
					this.lcsRunNextStep() // skip "make-prediction"
					this.lcsRunNextStep() // skip "prediction-possible?"
					this.lcsRunNextStep() // skip "form-correct-set"

					this.setRulePopulation()
					this.setRuleMatchSet()
				} else if (this.nextStep() == "update-params") {
					console.log("update-params");
					this.detailBoxText = this.text["c04parameterUpdate"]["t01explanation"]
					this.lcsRunNextStep()
					this.lcsRunNextStep() // skip "subsumption"

					this.setRulePopulation()
					this.setParamSets()
					this.setPhenotype()
				} else if (this.nextStep() == "ga" || this.ga["step"]) {
					if (!this.ga["step"])
						this.lcsRunNextStep()

					this.setGA()
				} else if (this.nextStep() == "deletion") {
					console.log("deletion");
					this.detailBoxText = this.text["c06deletion"]["t01explanation"]
					this.lcsRunNextStep()

					this.setDeletionValues()
				}
				else {
					console.log("else: " + this.nextStep());
					this.lcsRunNextStep()
				}
			}
		},
		closeIntroPopup() {
			this.showIntroText = false
		},
		closeFirstCycleEndPopup() {
			this.showFirstCycleEndText = false
		},
		convertCondition(cond) {
			let o = ["#", "#", "#", "#", "#", "#"]
			for (let i in cond["specifiedAttList"]) {
				let specifiedAtt = cond["specifiedAttList"][i]
				o[specifiedAtt] = cond["condition"][i]
			}
			return o
		},
		conditionToPythonFormat(cond) {
			let condition = []
			let specifiedAttList = []
			for (let i in cond) {
				if (cond[i] != "#") {
					condition.push(cond[i])
					specifiedAttList.push(i)
				}
			}
			return { "condition": condition, "specifiedAttList": specifiedAttList }
		},
		classifierEquals(a, b) {
			return (this.arrayEquals(a["condition"], b["condition"])
				&& this.arrayEquals(a["specifiedAttList"], b["specifiedAttList"])
				&& a["phenotype"] == b["phenotype"])
		},
		arrayEquals(a, b) {
			return Array.isArray(a) &&
				Array.isArray(b) &&
				a.length === b.length &&
				a.every((val, index) => val === b[index]);
		},
		getRulePopulationCondition() { },
		getRulePopulationAction() { },

		...mapActions({
			lcsRunNextStep: 'python/runNextStep' // map `this.add()` to `this.$store.dispatch('increment')`
		})
	},
	async mounted() {
		this.stillLoading = true
		while (!this.lcs) {
			await this.sleep(1000)
		}
		this.stillLoading = false

		this.init()
	}
}
</script>
