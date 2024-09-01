<template>
	<section v-if="menu.length" class="section--home">
		<!-- <div v-for="(item,i) in menu" :key="i"> -->
		<!-- {{ link }} -->
		<!-- {{ item.content }} -->
		<!-- <a
        :href="item.url"
        :target="item.target"
        :title="item.title"
        v-html="item.content"
      ></a> -->
		<!-- <v-container class="grey lighten-5"> -->
		<div class="page" no-gutters>
				<div class="pa-2 page-left align-center justify-center" color="white" >
					<div class="content ma-6">
						<span class="description">Where Every Story Becomes an Adventure, and Every Life Finds Its
							Voice.</span>
					</div>
					<v-container class="">
						<v-row align="center" justify="center">
							<!-- <v-col cols="1">
								<v-btn icon @click="scroll('back')">
									<i class="fa-solid fa-arrow-left"></i>
								</v-btn>
							</v-col>
							<v-col cols="8"> -->
								<!-- <div ref="scrollContainer" class="d-flex" -->
									<!-- style="scroll-behavior: smooth;"> -->
									<v-col cols="12" xs="12" sm="4" v-for="n in stories" class="ma-2 story-card" :key="n" >
									<v-sheet color="transparent"
										class=" align-center justify-center  "  outline>
										<v-card-title class="story--title pa-0">{{ n.title }} </v-card-title>
										<v-card-text class="story--description pa-0"> {{ n.desc }}</v-card-text>
									</v-sheet>
									</v-col>
								<!-- </div> -->
							<!-- </v-col>
							<v-col cols="1">
								<v-btn icon @click="scroll('forward')">
									<i class="fa-solid fa-arrow-right"></i>
								</v-btn>
							</v-col> -->
						</v-row>
						<v-row align="center" justify="center">
							<v-col cols="4" sm="2">

								<v-btn  :loading="loading" class="mt-4" variant="tonal" @click="load"> See All </v-btn>

							</v-col>

						</v-row>

					</v-container>
			</div>
			<!--  <v-col
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
2        </v-card>
      </v-col> -->
	</div>
		<!-- </v-container> -->
		<!-- </div> -->
	</section>
</template>
<script>
import PostItem from "@/components/template-parts/PostItem";
import Pagination from "@/components/template-parts/Pagination";

export default {
	name: "Home",
	components: {
		PostItem,
		Pagination,
	},
	props: {
		page: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {}
	},
	computed: {

		menu() {
			console.log(this.$store.getters.menu({ name: "main" }));
			return this.$store.getters.menu({ name: "main" });
		},
		stories() {
			return [
				{ title: "True Crime", desc: "Stories based on real-life criminal cases, investigations, and trials.", color: "#90323D" },
				{ title: "Mystery/Thriller", desc: "Fictional stories involving suspense, investigation, and plot twists", color: "#26547C" },
				{ title: "Adventure Stories", desc: "hooooo", color: "#06D6A0" },
				{ title: "Historical Stories", desc: " Fictional stories set in historical periods.", color: "#119DA4" },
				{ title: "Eastern Stories", desc: "hooooo" },
				{ title: "Reallife Stories", desc: "hooooo" },


			]
		}
	},
	methods: {
		getPosts() {
			return this.$store.dispatch("getItems", this.request);
		},
		scroll(direction) {
			const scrollAmount = 200;
			if (direction === 'forward') {
				this.$refs.scrollContainer.scrollLeft += scrollAmount;
			} else {
				this.$refs.scrollContainer.scrollLeft -= scrollAmount;
			}
		},

	},
	created() {
	}
};
</script>