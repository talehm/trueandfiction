<template>
  <v-sheet rounded="lg" min-height="268">
    <!--  -->
    <v-card
      class="mx-auto"
      max-width="300"
      min-height="268"
      tile
      v-if="categories.length"
    >
      <v-list flat>
        <v-subheader>Categories</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(category, i) in categories" :key="i">
            <!-- <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title>
                <a :href="category.link">
                  {{ category.name }}</a
                ></v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                v-text="category.count"
              ></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <!-- <section v-if="categories.length">
        <div v-for="category in categories" :key="category.id">

        </div>
        </section> -->
  </v-sheet>
</template>

<script>
export default {
  name: "category-list",
  components: {},
  props: {
    page: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      request: {
        type: "categories",
        params: {
          per_page: 10, //this.$store.state.site.posts_per_page,
          page: this.page,
        },
        showLoading: true,
      },
      totalPages: 0,
    };
  },
	computed: {
		categories() {
			const categories = this.$store.getters.requestedItems(this.request).filter(c => c.count > 0);
			// Step 1: Identify all first-level categories (parent is 0)
			const firstLevelCategories = categories.filter(category => category.parent === 0);

			// Step 2: Filter second-level categories (parent is a first-level category)
			const secondLevelCategories = categories.filter(category =>
				firstLevelCategories.map(cat => cat.id).includes(category.parent)
			);

			// Combine first-level and second-level categories
			const combinedCategories = [...firstLevelCategories, ...secondLevelCategories];
			return combinedCategories;
		}
	},
  methods: {
    getPosts() {
      return this.$store.dispatch("getItems", this.request);
    },
    setTotalPages() {
      this.totalPages = this.$store.getters.totalPages(this.request);
    },
  },
  created() {
    this.getPosts().then(() => this.setTotalPages());
  },
};
</script>
