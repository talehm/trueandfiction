<template>

	<v-card v-if="page" class="mx-auto ma-2">
				<!-- <testspeech /> -->
					<v-card-text class="">
						<header class="w-100">
							<p class="text-h4 text-center" v-html="page.title.rendered"></p>
						</header>
						<div ref="textToRead" class="paragraphs" v-html="page.content.rendered"></div>
						<div class="text-caption pt-4 d-flex justify-space-between">
						</div>
					</v-card-text>
			</v-card>
</template>

<script>
export default {
  name: "Page",
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      request: {
        type: "pages",
        slug: this.slug,
        showLoading: true,
      },
    };
  },
  computed: {
    page() {
      return this.$store.getters.singleBySlug(this.request);
    },
  },
  methods: {
    getPage() {
      this.$store.dispatch("getSingleBySlug", this.request).then(() => {
        if (this.page) {
          this.$store.dispatch("updateDocTitle", {
            parts: [this.page.title.rendered, this.$store.state.site.name],
          });
        } else {
          // this.$router.replace('/404')
        }
      });
    },
  },
  created() {
    this.getPage();
  },
};
</script>
