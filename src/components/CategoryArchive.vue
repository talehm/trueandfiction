<template>
	<main>
		<section>
			<v-container class="bg-surface-variant">
				<v-skeleton-loader v-if="!title" v-bind="attrs" class="pa-2" type="list-item"></v-skeleton-loader>
				<p v-else class="text-h5 pa-2 text-center font-weight-black">{{ title }}</p>
				<v-row no-gutters class="">
					<v-col md="3" sm="3" cols="12">
						<v-card class="d-flex align-center justify-center pa-3 ma-2" height="200" width="auto"
							@click="open(item.link)">
							<span>Ads</span>
						</v-card>
						<v-card class="d-flex align-center justify-center pa-3 ma-2" height="200" width="auto"
							@click="open(item.link)">
							<span>Ads</span>
						</v-card>
					</v-col>
					<v-col md="6" sm="6" cols="12">
						<div v-if="!posts || posts.length == 0">
							<v-skeleton-loader v-for="n in 2" class="ma-8" v-bind="attrs"
								type="article"></v-skeleton-loader>
						</div>
						<v-row v-else>
							<v-col v-for="(post, i) in posts" :key="i" cols="12" sm="12">
								<v-card v-if="i == 1" class="d-flex align-center justify-center pa-3 mx-2 mb-2" height="100"
									width="auto">
									<span>Ads</span>
								</v-card>
								<post-item :key="post.id" :post="post" />
							</v-col>
						</v-row>
					</v-col>
					<v-col md="3" sm="3" cols="12">
						<v-card class="pa-3 ma-2" width="auto" @click="open(item.link)">
							<span class="header">Other categories</span>
							<v-skeleton-loader v-bind="attrs" v-if="subcategories.length == 0"
								type="list-item-three-line"></v-skeleton-loader>
							<v-list dense v-else>
								<v-list-item-group>
									<v-list-item v-for="(item, i) in subcategories" :key="i">
										<v-list-item-content>
											<v-list-item-title v-text="item.name"></v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-card>
						<v-card class="pa-3 ma-2" width="auto" @click="open(item.link)">
							<span class="header">Recently Added Stories</span>
							<v-skeleton-loader v-bind="attrs" v-if="subcategories.length == 0"
								type="list-item-three-line"></v-skeleton-loader>
							<v-list dense v-else>
								<v-list-item-group>
									<v-list-item v-for="(item, i) in 10" :key="i">
										<v-list-item-content>
											<v-list-item-title v-text="item"></v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
			<pagination v-if="totalPages > 1" :total="totalPages" :current="page" />
		</section>
		<!-- <section v-else>

			<v-container class="grey lighten-5 d-flex align-center justify-center">
				<v-row>
					<v-col cols="12" md="3" sm="4">
						<v-sheet class="d-flex align-center justify-center pa-3 ma-2" color="grey lighten-3"
							width="auto" @click="open(item.link)">
						</v-sheet>
					</v-col>
					<v-col cols="12" md="3" sm="6">
						<v-row>
							<v-col cols="12" md="3" sm="12" v-for="(item, i) in subcategories" :key="i">
								<v-sheet class="d-flex align-center justify-center pa-3 ma-2" color="grey lighten-3"
									width="auto" @click="open(item.link)">
									<div class="pl-1 font-weight-black h3"> {{ item.name }}</div>
									<span></span>
									<div></div>
								</v-sheet></v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</section> -->
	</main>
</template>
<script>
import PostItem from "@/components/template-parts/PostItem";
import Pagination from "@/components/template-parts/Pagination";

export default {
	name: "CategoryArchive",
	components: {
		PostItem,
		Pagination,
	},
	props: {
		page: {
			type: Number,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			subcategories: [],
			postsRequest: {
				type: "posts",
				params: {
					per_page: 10, // this.$store.state.site.posts_per_page,
					page: this.page,
					categories: null,
				},
				showLoading: true,
			},
			categoryRequest: {
				type: "categories",
				slug: this.slug,
			},
			subcatRequest: null,
			totalPages: 0,
		};
	},
	computed: {
		category() {
			return this.$store.getters.singleBySlug(this.categoryRequest);
		},

		posts() {
			if (this.category) {
				return this.$store.getters.requestedItems(this.postsRequest);
			}
		},
		title() {
			return `${this.category ? this.category.name : ""}`;
		},
		isModePost() {
			return this.posts && this.posts.length;
		}
	},
	methods: {
		getCategory() {
			return this.$store
				.dispatch("getSingleBySlug", this.categoryRequest)
				.then(() => {
					this.setPostsRequestParams();
					this.$store.dispatch("updateDocTitle", {
						parts: [this.category.name, this.$store.state.site.name],
					});
				});
		},
		getPosts() {
			return this.$store.dispatch("getItems", this.postsRequest);
		},
		setPostsRequestParams() {
			this.postsRequest.params.categories = this.category.id;
		},
		setTotalPages() {
			this.totalPages = this.$store.getters.totalPages(this.postsRequest);
		},
		getSubCategories() {
			console.log(this.isModePost);
			this.subcatRequest = {
				type: "categories",
				params: {
					parent: this.isModePost ? 3 : this.category.id
				}
			}

			return this.$store.dispatch("getItems", this.subcatRequest);

		},
		open(url) {
			window.open(url);
		}
	},
	created() {
		this.getCategory()
			.then(() => this.getPosts())
			.then(() => this.getSubCategories())
			.then(() => {
				this.subcategories = this.$store.getters.requestedItems(this.subcatRequest).filter(s => s.id != this.category.id)

			})
			.then(() => this.getPosts())
			.then(() => this.setTotalPages())
	},
	watch: {
		"category": {
			handler(category) {
				if (category) {
					const request = {
						type: "categories",
						parent: category.id
					}
					this.subcategories = this.$store.getters.requestedItems(request);

				}
			}
		}
	}
};
</script>