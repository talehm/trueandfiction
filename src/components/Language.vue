<template>
	<main>
		<section v-if="menu.length">

		<v-container class="grey lighten-5 d-flex align-center justify-center">
				<v-sheet v-for="(item,i) in menu" :key="i"
          class="d-flex align-center justify-center pa-3 ma-2"
          color="grey lighten-3"
		  width="auto"
		  @click="open(item.url)"
        >
		<img :src="item.content" height="40"
            width="40"/>
          <div class="pl-1 font-weight-black h3">Learn {{item.title}}</div>

		 <span></span>
          <div></div>
        </v-sheet>

			<!-- </v-col>
			</v-row> -->
		</v-container>


    </section>
	</main>
  </template>

  <script>
  export default {
	name: "Language",
	props: {
	  slug: {
		type: String,
		required: false,
	  },
	},
	data() {
		return{}
	},
	computed: {
	    menu() {
      		return this.$store.getters.menu({ name: "languages" });
    	}
	},
	methods: {
		open(url) {
			window.open(url);
		}
	}
  };
  </script>
