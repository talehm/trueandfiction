<template>
	<v-footer
	  padless
	>
	<v-card
      flat
      tile
      class="white--text text-center w-100"
    > <v-card-text >
	  <v-row
		justify="center"
		no-gutters
		v-if="pages"
	  >

		<v-col
		v-for="page in pages"
		  :key="page.id"
		  class="text-center white--text"
		  cols="12"
		  md="3"
		>
		<a

		  color="white text-caption"
		  class="my-2"
		  @click="helpers.fn.open(page.link)"
		>
		  {{ page.title.rendered }}
	</a>
		  <!-- {{ new Date().getFullYear() }} — <strong>Vuetify</strong> -->
		</v-col>
	  </v-row>
	  <div >
		<!-- :class="{ 'd-flex align-center justify-space-between': !this.isMobile}"> -->
	  <div>
		<!-- <strong class="text-caption w-100">Get connected with us on social networks!</strong> -->
		<!-- <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-1 "
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn> -->
	  </div>
	  <span>{{ new Date().getFullYear() }} — <strong>trueandfiction.com</strong></span>

	</div>
      </v-card-text>
	  </v-card>
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
			params:{},
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