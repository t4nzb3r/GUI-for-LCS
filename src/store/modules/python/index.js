// import actions from './actions.js'
// import mutations from './mutations.js'
// import getters from './getters.js'

export default {
	namespaced: true,
	state: {
		baseUrl: "http://localhost:8080",
		loadedPackages: false,
		pyodide: null,
		pyodideLoading: false,
		lcs: null
	},
	actions: {
		initPyiodide: function ({ state }) {
			return new Promise((resolve, reject) => {
				if (!state.pyodideLoading && !state.pyodide) {
					console.log("Loading Pyodide");
					state.pyodideLoading = true

					// eslint-disable-next-line
					loadPyodide().then(el => {
						state.pyodideLoading = false
						state.pyodide = el
						resolve()
					}).catch(err => {
						state.pyodideLoading = false
						reject(err)
					})
				} else {
					console.log("Pyodide already loaded");
					resolve()
				}
			})
		},
		isPyiodideReady({ state }) {
			return new Promise((resolve, reject) => {
				if (state.pyodide) {
					resolve()
				} else {
					reject
				}
			})
		},
		test({ dispatch, state }) {
			return new Promise((resolve,) => {
				dispatch("isPyiodideReady").then(() => resolve(state.pyodide.runPython("1 + 2") == "3"))
			})
		},
		async loadPythonFile({ state }, { filename, moduleName }) {
			await state.pyodide.runPythonAsync(`
			    from pyodide.http import pyfetch
			    response = await pyfetch("${state.baseUrl}/elcs/${filename}")
			    with open("${filename}", "wb") as f:
			    	f.write(await response.bytes())
			`)
			state.pyodide.pyimport(moduleName)
			// return Promise.resolve(state.pyodide.pyimport(moduleName)[moduleName])
		},
		async loadPythonPackage({ state }, moduleList) {
			await state.pyodide.runPythonAsync(`
			    from pyodide.http import pyfetch
			    response = await pyfetch("${state.baseUrl}/elcs.zip")
			    await response.unpack_archive()
			`)
			let e = {}
			for (let i in moduleList) {
				let c = moduleList[i]
				e[c] = state.pyodide.pyimport(c)[c]
			}
			return e
		},
		loadLCS({ dispatch, state }) {
			return dispatch("loadPythonPackage", [
				"ClassAccuracy",
				"Classifier",
				"ClassifierSet",
				"ConfigParser",
				"Constants",
				"DataManagement",
				"eLCS",
				"Offline_Environment",
				"OutputFileManager",
				"Prediction",
				"Run",
				"Timer"
			]).then(el => {
				state.loadedPackages = true
				state.lcs = el["Run"]()
			})
		},
		runNextStep({ state }) {
			if (state.lcs) {
				state.lcs.runOneStep()
				// console.log(JSON.parse(state.lcs.getLastPopulation()))
			}
		},
		runLCS({ dispatch, state }) {
			return dispatch("loadLCS").then(() => {
				state.lcs.runOneStep()
			})
		}
	}
	// mutations,
	// getters
}