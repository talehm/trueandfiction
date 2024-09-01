<template>
	<v-btn fab

      small @click="toggleTheme" >
		<v-icon class="" v-if="$vuetify.theme.dark">fa4 fa-solid fa-sun</v-icon>
		<v-icon class="" v-else>fa4 fa-solid fa-moon</v-icon>

	</v-btn>

  </template>

  <script>
  export default {
	methods: {
	  toggleTheme() {
		const currentTheme = this.$vuetify.theme.dark;
			this.$vuetify.theme.dark = !currentTheme;
			document.documentElement.setAttribute('data-theme', this.$vuetify.theme.dark ? 'dark' : 'light');
			console.log(document.documentElement);

		localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light');
	  }
	},


  }
  </script>

  <style scoped>
  /* Add any styles specific to the theme switcher button here */
  </style>
