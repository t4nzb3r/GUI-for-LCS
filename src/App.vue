<template>
	<router-view />
</template>

<script>
import { mapActions } from 'vuex'
// import Constants from "@/store/modules/e-lcs/Classifier"

export default {
	methods: {
		...mapActions({
			init: "python/initPyiodide",
			test: "python/test",
			runLCS: "python/runLCS"
		})
	},
	mounted: function () {
		this.init().then(() => {
			this.test().then(console.log)
			this.runLCS()
		})
	}
}
</script>

<style lang="scss">
@import "@/scss/index.scss";
@import "https://use.typekit.net/ejh3cme.css";
</style>
