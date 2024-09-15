<template>
  <div class="responsive-image">
    <transition
      name="fade"
      :duration="1000"
    >
        <img
          v-if="image"
          :src="image.source_url"
          :srcset="srcset"
          :sizes="sizes"
          :alt="image.alt_text"
          :title="image.title.rendered"
        />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ResponsiveImage',
  props: {
    mediaId: {
      type: Number,
      required: true
    },
    sizes: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      request: {
        type: 'media',
        id: this.mediaId,
        batch: true
      }
    }
  },
  computed: {
    image() {
      return this.$store.getters.singleById(this.request)
    },
    srcset() {
      if (this.image) {
        let sizes = this.image.media_details.sizes
        return Object.keys(sizes)
          .reduce((srcset, size) => {
            srcset.push(`${sizes[size].source_url} ${sizes[size].width}w`)
            return srcset
          }, [])
          .join(', ')
      }
    }
  },
  methods: {
    getMedia() {
      if (this.mediaId) {
        this.$store.dispatch('getSingleById', this.request)
      }
    }
  },
  created() {
    this.getMedia()
  }
}
</script>

<style>

.responsive-image {
  float:left;
  padding-right:10px;
  padding-bottom: 10px;
}

.responsive-image > img {
  display: block;
  height: 200px;
  /* max-width: 20%; */
}

</style>
