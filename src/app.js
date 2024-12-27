import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import tools from './tools'
import vuetify from './plugins/vuetify' // path to vuetify export
// import './styles/popup.css';
import './styles/styles.less';
import Theme from './components/Theme.vue'; // Path to your theme switcher component
import helpers from "./_helpers";


new Vue({
  el: '#app',
	vuetify,
  render: h => h(App),
  router,
	store,
	compontent: {
	Theme
  },
  data() {
		return {
			tools,
			helpers,
			screenWidth: window.innerWidth,
      		screenHeight: window.innerHeight,
		};
	},
	methods: {
		toggleTheme() {
			const currentTheme = this.$vuetify.theme.dark;
			this.$vuetify.theme.dark = !currentTheme;
			document.documentElement.setAttribute('data-theme', this.$vuetify.theme.dark ? 'dark' : 'light');
			localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light');
		},
		updateWindowSize() {
			this.screenWidth = window.innerWidth;
			this.screenHeight = window.innerHeight;
		}
	},
	computed: {
		isMobile() {
			return this.screenWidth < 768; // Define your breakpoints
		  },
		  isTablet() {
			return this.screenWidth >= 768 && this.screenWidth <= 1024;
		  },
	},
	  mounted() {
		 // Set initial theme based on localStorage
		 const savedTheme = localStorage.getItem('theme') || 'light';
		 this.$vuetify.theme.dark = savedTheme === 'dark';
		  document.documentElement.setAttribute('data-theme', savedTheme);
		  window.addEventListener('resize', this.updateWindowSize);

	},
	beforeDestroy() {
		window.removeEventListener('resize', this.updateWindowSize);
	  },

})
