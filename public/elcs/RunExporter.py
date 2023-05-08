import json

class RunExporter:
	def export(self, o, nextStep, currentStep):
		s = json.dumps({
			"classifier-set": o.toGenericObject(),
			"next-step": nextStep,
			"current-step": currentStep
		})
		return s

	def exportEmpty(self, o):
		return json.dumps({
			"classifier-set": {
				"popSet": [],
				"matchSet": [],
				"correctSet": [],
				"microPopSize": 0,
				"aveGenerality": 0,
				"expRules": 0,
				"attributeSpecList": 0,
				"attributeAccList": 0,
				"avePhenotypeRange": 0,
				"ga": {}
			},
			"next-step": None,
			"current-step": None
		})