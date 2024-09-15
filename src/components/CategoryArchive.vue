<template>
	<tile type="list" :items="posts" :title="title" :cardItems="tileCardItems">
		<template #list="{ item }">
			<post-item :key="item.id" :post="item" />
		</template>
	</tile>
</template>
<script>
import PostItem from "@/components/template-parts/PostItem";
import Pagination from "@/components/template-parts/Pagination";
import tile from "./template-parts/Tile.vue";

export default {
	name: "CategoryArchive",
	components: {
		PostItem,
		Pagination,
		tile
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
		},
		tileCardItems() {
			return {
				right: [{
					title: "Other Categories",
					items: this.subcategories
				},{
					title: "Other Categories",
					items: this.subcategories
				}]
			}
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