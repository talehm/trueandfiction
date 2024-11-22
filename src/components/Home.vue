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
						<v-col cols="10" xs="12" sm="2" v-for="n in storyCategories" class="" :key="n.id">
							<v-card class="mx-auto" max-width="250">
								<v-img height="250px"><responsive-image v-if="n.acf.media" :media-id="n.acf.media"
										:sizes="'(max-width: 250px) 100% 100%'" /></v-img>
							</v-card>
							<v-card class="mx-auto story-card" max-width="200">
								<v-card-text>
									<!-- <div>Horror Stories </div> -->
									<span class="text-h6 text--primary">{{ n.name }} </span><br>
									<span>{{ n.count }} stories</span>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</div>
				<!-- <div v-if="isReady" class="">
					<v-row justify="center">
						<v-col cols="12" xs="12" sm="4" v-for="n in storyCategories" class="ma-2 story-card" :key="n"
							@click="helpers.fn.open(n.link)">
							<v-sheet color="transparent" class=" align-center justify-center  " outline>
								<v-card-title class="story--title pa-0"> </v-card-title>
								<v-card-text class="story--description pa-0"> {{ n.description }}</v-card-text>
							</v-sheet>
						</v-col>
					</v-row>
					<v-row align="center" justify="center">
						<v-col cols="4" sm="2">
							<v-btn :loading="loading" class="mt-4" variant="tonal" @click="load"> See All </v-btn>
						</v-col>
					</v-row>
				</div> -->
			</div>
		</div>
	</section>
</template>
<script>
import PostItem from "@/components/template-parts/PostItem";
import Pagination from "@/components/template-parts/Pagination";
import defaultMixin from "@/components/mixins/default";
import ResponsiveImage from "@/components/utility/ResponsiveImage";

export default {
	name: "Home",
	mixins:[defaultMixin],
	components: {
		PostItem,
		Pagination,
		ResponsiveImage
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
					parent: null
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