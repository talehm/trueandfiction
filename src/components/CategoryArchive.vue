<template>
  <main>
    <v-card>
      <p class="text-h5 pa-6 text-center font-weight-black">{{ title }}</p>
    </v-card>

    <section v-if="isModePost">
		<v-container class="bg-surface-variant">

		<v-row no-gutters>
			<v-col
        v-for="(post, i) in posts"
        :key="i"
        cols="12"
        sm="12"
      >
      <post-item :key="post.id" :post="post" />
	  </v-col>
	</v-row>
  </v-container>
      <pagination v-if="totalPages > 1" :total="totalPages" :current="page" />
    </section>
	<section v-else>

		<v-container class="grey lighten-5 d-flex align-center justify-center">
			<v-row>
				<v-col col="12" md="3" v-for="(item,i) in subcategories" :key="i">
				<v-sheet
          class="d-flex align-center justify-center pa-3 ma-2"
          color="grey lighten-3"
		  width="auto"
		  @click="open(item.link)"
        >
          <div class="pl-1 font-weight-black h3"> {{item.name}}</div>

		 <span></span>
          <div></div>
        </v-sheet>

			</v-col>
			</v-row>
		</v-container>
	</section>
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
		subcategories:[],
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
	  subcatRequest:null,
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
		 return this.posts.length && this.subcategories.length <= 1;
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
	getSubCategories(){},
    setPostsRequestParams() {
      this.postsRequest.params.categories = this.category.id;
    },
    setTotalPages() {
      this.totalPages = this.$store.getters.totalPages(this.postsRequest);
	  },
	  getSubCategories() {
		this.subcatRequest = {
				type: "categories",
				params: {
					parent: this.category.id
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
		  .then(() => this.getSubCategories())
		  .then(() => {
			this.subcategories =  this.$store.getters.requestedItems(this.subcatRequest)

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
					console.log(request, "SS");
					console.log(this.$store.getters.requestedItems(request));
					this.subcategories = this.$store.getters.requestedItems(request);

			}
		}
	}
  }
};
</script>
