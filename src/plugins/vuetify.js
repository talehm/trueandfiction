import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons

Vue.use(Vuetify)

const vuetify = new Vuetify({
	theme: {
		themes: {
			light: {
				primary: 'steelblue', // Customize these colors as needed
				secondary: '#424242',
				accent: '#82B1FF',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
			},
			dark: {
				primary: '#406a23',
				secondary: '#757575',
				accent: '#FF4081',
				error: '#CF6679',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFEB3B',
			},
		},
	},
	icons: {
    iconfont: 'fa4', // default - only for display purposes
  },
  });
export default vuetify;