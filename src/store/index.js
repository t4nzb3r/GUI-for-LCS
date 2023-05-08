import { createStore } from 'vuex'

import PythonModule from './modules/python'
import TextModule from './modules/text'

export default createStore({
	state: {
		color: {
			"white": "#ffffff",
			"black": "#323031",
			"black40": "#323031",
			"black20": "#d6d6d6",
			"black10": "#ebeaea",
			"green": "#4da167",
			"red": "#d83a34",
			"yellow": "#ffc857",
			"blue": "#084c61"
		}
	},
	getters: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		python: PythonModule,
		text: TextModule,
	}
})
