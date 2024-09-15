export default {
	computed: {
		helpers() {
			return this.$root.helpers;
		},
		isMobile() {
			return this.$root.isMobile;
		},
		isTablet() { return this.$root.isTablet; }
	}
}