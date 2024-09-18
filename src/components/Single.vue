<template>
	<tile type="article" :article="post" :cardItems="tileCardItems">
		<template #content>
			<v-card class="mx-auto ma-2">
				<!-- <testspeech /> -->
				<article v-if="post">
					<v-card-actions class="float-left story-actions">
						<v-btn v-for="(action, i) in actions" :key="i" elevation="2" small :color="action.color"
							class="ma-2" @click="handle(action)">
							<v-icon left> {{ action.icon }} </v-icon>
							{{ action.text }}
						</v-btn>
					</v-card-actions>
					<v-card-text class="">
						<header class="w-100">
							<p class="text-h4 text-center" v-html="post.title.rendered"></p>
						</header>
						<post-meta :post="post" />
						<div class="text-caption pr-4 d-flex justify-space-between">
							<post-taxonomies :post="post" />
						</div>
						<!-- <responsive-image v-if="post.featured_media" :media-id="post.featured_media"
							:sizes="'(max-width: 1200px) 100vw, 1200px'" /> -->
						<div ref="textToRead" class="paragraphs" v-html="post.content.rendered" @dblclick="getSelText"></div>
						<brief-definition :item="briefDefinition" @show="toggleDefinition" />
						<div class="text-caption pt-4 d-flex justify-space-between">
							<post-taxonomies :post="post" />
						</div>
					</v-card-text>
				</article>
			</v-card>
		</template>
	</tile>
</template>
<script>
import ResponsiveImage from "@/components/utility/ResponsiveImage";
import PostMeta from "@/components/utility/PostMeta";
import PostTaxonomies from "@/components/utility/PostTaxonomies";
import BriefDefinition from "@/components/utility/BriefDefinition";
import testspeech from "@/components/utility/testspeech";
import tile from "./template-parts/Tile.vue";
import defaultMixin from "@/components/mixins/default";
import speechMixin from "@/components/mixins/speech";

export default {
	name: "Single",
	mixins: [defaultMixin,speechMixin],
	components: {
		ResponsiveImage,
		PostMeta,
		PostTaxonomies,
		BriefDefinition,
		testspeech,
		tile
	},
	props: {
		slug: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			request: {
				type: "posts",
				slug: this.slug,
				showLoading: true,
			},
			briefDefinition: null,
			postsRequest: {
				type: "posts",
				params: {
					per_page: 10, // this.$store.state.site.posts_per_page,
					page: this.page,
				},
				showLoading: true,
			},
			catRequest: {
				type: "categories",
				params: {
					per_page: 20,
					page: 1
				}

			}
		};
	},
	computed: {
		categories() {
			const categories = this.$store.getters.requestedItems(this.catRequest);
			// Helper function to recursively find children of a category
			const buildCategoryTree = (parentId) => {
				// Get the direct children of the current parentId
				return categories
					.filter(c => c.parent === parentId)
					.map(c => {
						const subs = buildCategoryTree(c.id);
						if (subs.length == 0 && c.count == 0) return;
						return {
							name: `${c.name} (${c.count})`,
							link: c.link,
							// Recursively find children of the current category
							subs: buildCategoryTree(c.id)
						}
					}).filter(Boolean);
			};

			// Start building the tree from the root categories (parent = 0)
			return buildCategoryTree(0);
		},
		speechText() {
			return this.post.content.rendered.replace(/<[^>]+>/g, "");
		},
		post() {
			return this.$store.getters.singleBySlug(this.request);
		},
		posts() {
			return this.$store.getters.requestedItems(this.postsRequest).filter(p => p.id != this.post.id);
		},
		text() {
			return "The Internet is a series of tubes!";
		},
		title() {
			return `${this.post ? this.post.title.rendered : ""}`;
		},
		tileCardItems() {
			const posts = this.posts.map(p => {
				return {
					name: p.title.rendered,
					link: p.link
				}
			})
			return {
				right: [{
					title: "Related Stories",
					items: posts
				}, {
					title: "Categories",
					items: this.categories
				}]
			}
		}
	},
	methods: {
		toggleDefinition() {
			// this.briefDefinition.isOpen = !this.briefDefinition.isOpen;
			this.briefDefinition = null;
		},
		getPost() {
			return this.$store.dispatch("getSingleBySlug", this.request).then(() => {
				this.$store.dispatch("updateDocTitle", {
					parts: [this.post.title.rendered, this.$store.state.site.name],
				});
			});
		},
		getPosts() {
			this.postsRequest.params.categories = this.post.categories;
			return this.$store.dispatch("getItems", this.postsRequest);
		},
		getCategories() {
			return this.$store.dispatch("getItems", this.catRequest);
		},
		handle(action) {
			if (action.text == 'Listen') action.handle(this.post.content.rendered)
			else action.handle();
		},
		getSelText() {
			const selObj = window.getSelection();
			const range = selObj.getRangeAt(0);

			const wholeParagraph = selObj.anchorNode.data;
			const text = wholeParagraph
				.slice(range.startOffset, range.endOffset)
				.trim();
			const clientRect = range.getClientRects()[0];
			const hasDefiniton = this.briefDefinition != null && this.briefDefinition.word == text;
			if (hasDefiniton) {
				this.briefDefinition.isOpen = true;
			} else {
				this.$store.dispatch("getBriefDefinition", text).then((response) => {
					if (response.brief !== "" && response.brief != null) {
						this.briefDefinition = {
							content: response,
							word: text,
							isOpen: true,
							coordinates: {
								x: clientRect.x,
								y: clientRect.y + clientRect.height,
							},
						};
					} else {
						this.briefDefinition = null;
					}

				});
			}
		},

	},
	created() {
		this.getPost().then(() => this.getPosts()).then(() => this.getCategories());
	},
	mounted() {
		this.addAction(this.actionList.play);
	},
	beforeUnmount() {
		this.clear();
	},
	watch: {
		"speech.isStopped": {
			handler(newValue) {
				if (newValue) {
					const textContainer = this.$refs.textToRead;
					textContainer.innerHTML = this.post.content.rendered;
				}
			},
			deep: true
		}
	},
};
</script>