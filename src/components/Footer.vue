<template>
	<v-footer padless>
		<v-row no-gutters align="center" justify="center" class="white--text text-center w-100 pa-4">
			<!-- <v-row justify="center" no-gutters v-if="pages"> -->
			<!-- <v-col v-for="page in pages" :key="page.id" class="text-center white--text" cols="12" md="3"> -->
			<!-- {{ new Date().getFullYear() }} — <strong>Vuetify</strong> -->
			<!-- </v-col> -->
			<!-- </v-row> -->
			<!-- :class="{ 'd-flex align-center justify-space-between': !this.isMobile}"> -->
			<v-col cols="6" md="6">
				<span class="copyright">{{ new Date().getFullYear() }} — <strong>trueandfiction.com</strong></span>
			</v-col>
			<v-col cols="6" xs="12" sm="6">
				<a color="white text-caption" class="" v-for="page in pages" :key="page.id"
					@click="helpers.fn.open(page.link)">
					{{ page.title.rendered }}
				</a>
			</v-col>
		</v-row>
	</v-footer>
</template>
<script>
import defaultMixin from "@/components/mixins/default";

export default {
	mixins: [defaultMixin],
	data: () => ({
		links: [
			'Home',
			'About Us',
			'Team',
			'Services',
		],
		icons: [
			'mdi-facebook',
			'mdi-twitter',
			'mdi-linkedin',
			'mdi-instagram',
		],
		request: {
			type: "pages",
			params: {},
			showLoading: true,
		},
	}),
	computed: {
		pages() {
			return this.$store.getters.requestedItems(this.request);
		},
	},
	methods: {
		getPages() {
			return this.$store.dispatch("getItems", this.request);
		},
	},
	created() {
		this.getPages();
	}
}
</script>