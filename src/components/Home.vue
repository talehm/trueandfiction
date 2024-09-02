<template>
	<section class="section--home">
		<div class="page" no-gutters>
			<div class="pa-2 page-left align-center justify-center" color="white">
				<div class="content ma-6">
					<span class="description">Where Every Story Becomes an Adventure, and Every Life Finds Its
						Voice.</span>
				</div>
				<div v-if="isReady" class="">

					<v-row justify="center">
						<!-- <v-col cols="1">
								<v-btn icon @click="scroll('back')">
									<i class="fa-solid fa-arrow-left"></i>
								</v-btn>
							</v-col>
							<v-col cols="8"> -->
						<!-- <div ref="scrollContainer" class="d-flex" -->
						<!-- style="scroll-behavior: smooth;"> -->
						<v-col cols="12" xs="12" sm="4" v-for="n in storyCategories" class="ma-2 story-card" :key="n" @click="helpers.fn.open(n.link)">
							<v-sheet color="transparent" class=" align-center justify-center  " outline>
								<v-card-title class="story--title pa-0">{{ n.name }} </v-card-title>
								<v-card-text class="story--description pa-0"> {{ n.description }}</v-card-text>
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
							<v-btn :loading="loading" class="mt-4" variant="tonal" @click="load"> See All </v-btn>
						</v-col>
					</v-row>
				</div>
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
import defaultMixin from "@/components/mixins/default";

export default {
	name: "Home",
	mixins:[defaultMixin],
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
		return {
			categoryRequest: {
				type: "categories",
				params: {
					parent: 3
				}
			},
		}
	},
	computed: {
		storyCategories() {
			return this.$store.getters.requestedItems(this.categoryRequest);
		},
		isReady() {
			if (this.storyCategories == undefined) return [];
			return this.storyCategories.length > 0;
		}
	},
	methods: {
		getStoryCategories() {
			return this.$store.dispatch("getItems", this.categoryRequest);
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
		this.getStoryCategories();
	}
};
</script>